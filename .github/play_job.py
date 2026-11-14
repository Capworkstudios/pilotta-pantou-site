"""Themes bought in the Android app with Google Play Billing (runs every hour, after the Stripe job, in the public repo pilotta-pantou-site).
Secrets: PLAY_SA = service account (JSON) with access to the app in Play Console (view financial data + manage orders); FIREBASE_SA = Firebase service account.
The app writes every purchase to buy/UID/KEY = {p: productId, t: purchase token, ts}. This job asks Google Play about the token and, when the purchase is real,
paid, made by the same account (obfuscated account id = uid) and the right price tier, writes users/UID/themes/<theme> = true.
The result is kept in buy/UID/KEY/r: 1 = given, 0 = rejected, 2 = to check by hand. Only numbers are printed: the logs of a public repo are public.
The Pilotta Plus subscription (product pilotta_plus, base plans monthly / yearly) uses the same buy/UID/KEY records, but is asked about again every hour:
while it is active (or cancelled but not yet expired, or in grace period) users/UID/plus = true and users/UID/plusPlay = true; when it has ended (expired, on hold)
Plus is taken away, unless the account has plusLife (a one-time payment or Plus before) or an active Stripe subscription."""
import json, os, sys, time, urllib.error, urllib.request

SA = os.environ.get('FIREBASE_SA', '').strip()
PSA = os.environ.get('PLAY_SA', '').strip()
DB_URL = 'https://pilotta-anywhere-default-rtdb.europe-west1.firebasedatabase.app'
PKG = 'app.pilotta.pantou'
SUB_PID = 'pilotta_plus'
# product id -> (theme, needs Plus)
PRODUCTS = {}
for _t in ('cafe', 'neon', 'med', 'gold'):
    PRODUCTS['theme_' + _t] = (_t, False)
    PRODUCTS['theme_' + _t + '_plus'] = (_t, True)

if not SA or not PSA:
    print('Secret PLAY_SA or FIREBASE_SA is not set: nothing to do.')
    sys.exit(0)

import firebase_admin
from firebase_admin import credentials, db
from google.oauth2 import service_account
from google.auth.transport.requests import Request

firebase_admin.initialize_app(credentials.Certificate(json.loads(SA)), {'databaseURL': DB_URL})
root = db.reference('/')
cred = service_account.Credentials.from_service_account_info(json.loads(PSA), scopes=['https://www.googleapis.com/auth/androidpublisher'])
cred.refresh(Request())


def play_get(pid, token):
    url = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/%s/purchases/products/%s/tokens/%s' % (PKG, pid, urllib.parse.quote(token, safe=''))
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + cred.token})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        if e.code in (400, 404, 410):
            return None            # not a real purchase
        raise

def sub_get(token):
    url = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications/%s/purchases/subscriptionsv2/tokens/%s' % (PKG, urllib.parse.quote(token, safe=''))
    req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + cred.token})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        if e.code in (400, 404, 410):
            return None            # not a real purchase
        raise

import urllib.parse
buy = root.child('buy').get() or {}
given = rejected = hand = 0
for uid, items in buy.items():
    for k, it in (items or {}).items():
        if isinstance(it, dict) and it.get('p') == SUB_PID:
            continue               # the subscription: handled below
        if not isinstance(it, dict) or 'r' in it:
            continue
        pid, token = it.get('p'), it.get('t')
        if pid not in PRODUCTS or not token:
            root.update({'buy/%s/%s/r' % (uid, k): 0}); rejected += 1; continue
        theme, needs_plus = PRODUCTS[pid]
        try:
            r = play_get(pid, token)
        except Exception:
            continue               # Google not reachable: looked at again next hour
        if not r or r.get('purchaseState') != 0:
            if r and r.get('purchaseState') == 2:
                continue           # pending payment: looked at again later
            root.update({'buy/%s/%s/r' % (uid, k): 0}); rejected += 1; continue
        if (r.get('obfuscatedExternalAccountId') or '') != uid:
            root.update({'buy/%s/%s/r' % (uid, k): 2}); hand += 1; continue
        if needs_plus and not db.reference('users/%s/plus' % uid).get():
            root.update({'buy/%s/%s/r' % (uid, k): 2}); hand += 1; continue
        root.update({'users/%s/themes/%s' % (uid, theme): True, 'buy/%s/%s/r' % (uid, k): 1})
        given += 1
print('play: themes given %d, rejected %d, to check by hand %d' % (given, rejected, hand))

# ---- the Plus subscription: every known purchase token is asked about every hour ----
ACTIVE = ('SUBSCRIPTION_STATE_ACTIVE', 'SUBSCRIPTION_STATE_IN_GRACE_PERIOD')
ENDED = ('SUBSCRIPTION_STATE_EXPIRED', 'SUBSCRIPTION_STATE_ON_HOLD', 'SUBSCRIPTION_STATE_PAUSED')
now_s = time.time()
sub_active, sub_seen, sub_unsure = {}, set(), set()
sub_new = sub_rej = sub_hand = 0
for uid, items in buy.items():
    for k, it in (items or {}).items():
        if not isinstance(it, dict) or it.get('p') != SUB_PID or it.get('end') or not it.get('t'):
            continue
        sub_seen.add(uid)
        try:
            r = sub_get(it['t'])
        except Exception:
            sub_unsure.add(uid)     # Google not reachable: nothing is changed this hour
            continue
        if not r:
            if 'r' not in it:
                root.update({'buy/%s/%s/r' % (uid, k): 0}); sub_rej += 1
            else:
                root.update({'buy/%s/%s/end' % (uid, k): int(now_s)})
            continue
        items_l = r.get('lineItems') or []
        li = items_l[0] if items_l else {}
        if li.get('productId') != SUB_PID or ((r.get('externalAccountIdentifiers') or {}).get('obfuscatedExternalAccountId') or '') != uid:
            if 'r' not in it:
                root.update({'buy/%s/%s/r' % (uid, k): 2}); sub_hand += 1
            continue
        st = r.get('subscriptionState')
        exp = 0
        try:
            exp = time.mktime(time.strptime((li.get('expiryTime') or '')[:19], '%Y-%m-%dT%H:%M:%S')) - time.timezone
        except Exception:
            pass
        if st in ACTIVE or (st == 'SUBSCRIPTION_STATE_CANCELED' and exp > now_s):
            sub_active[uid] = True
            if it.get('r') != 1:
                root.update({'buy/%s/%s/r' % (uid, k): 1}); sub_new += 1
        elif st in ENDED or st == 'SUBSCRIPTION_STATE_CANCELED':
            root.update({'buy/%s/%s/end' % (uid, k): int(now_s)})
            if 'r' not in it:
                root.update({'buy/%s/%s/r' % (uid, k): 0}); sub_rej += 1
        # pending (payment not finished): looked at again next hour
stripe_subs = db.reference('stripe/live/sub').get() or {}
plus_on = plus_off = 0
for uid in sub_seen:
    if uid in sub_unsure:
        continue
    if sub_active.get(uid):
        cur = db.reference('users/%s' % uid).get() or {}
        upd = {'users/%s/plus' % uid: True, 'users/%s/plusPlay' % uid: True}
        stripe_on = any(isinstance(x, dict) and x.get('u') == uid and not x.get('end') for x in stripe_subs.values())
        if cur.get('plus') and not cur.get('plusPlay') and not cur.get('plusLife') and not stripe_on:
            upd['users/%s/plusLife' % uid] = True      # had Plus before (one payment or by hand): the subscription must never take it away
        if not cur.get('plus'):
            plus_on += 1
        root.update(upd)
    else:
        cur = db.reference('users/%s' % uid).get() or {}
        stripe_on = any(isinstance(x, dict) and x.get('u') == uid and not x.get('end') for x in stripe_subs.values())
        if cur.get('plusPlay'):
            upd = {'users/%s/plusPlay' % uid: False}
            if not cur.get('plusLife') and not stripe_on:
                upd['users/%s/plus' % uid] = False
                plus_off += 1
            root.update(upd)
print('play subscriptions: accounts %d, started %d, Plus on %d, Plus removed %d, rejected %d, to check by hand %d, not reachable %d' % (len(sub_seen), sub_new, plus_on, plus_off, sub_rej, sub_hand, len(sub_unsure)))
