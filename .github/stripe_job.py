"""Pilotta Plus from Stripe payments (runs every hour, before the category job, in the public repo pilotta-pantou-site).
Secrets: STRIPE_KEY = restricted key with read access to Checkout Sessions only; FIREBASE_SA = service account.
The Payment Links of the app carry the account: client_reference_id = Firebase uid.
A completed and paid Checkout Session of 2.99 EUR or more gives users/UID/plus = true; a smaller amount is a donation.
The Payment Links of the themes (THEME_LINKS) give users/UID/themes/<theme> = true instead (the Plus-price link only when the account has Plus).
Every session is handled once (stripe/s/SESSION_ID). Only numbers are printed: the logs of a public repo are public."""
import json, os, re, sys, time, urllib.parse, urllib.request

KEY = os.environ.get('STRIPE_KEY', '').strip()
SA = os.environ.get('FIREBASE_SA', '').strip()
DB_URL = 'https://pilotta-anywhere-default-rtdb.europe-west1.firebasedatabase.app'
PLUS_MIN = 299            # euro cents
LOOKBACK = 3 * 86400      # first run, and overlap on every run: sessions of the last 3 days are looked at again
THEMES = ('cafe', 'neon', 'med', 'gold', 'fbgw', 'fbyb', 'fbbw', 'fbyg', 'fbgk', 'fbrw')
# Payment Links of the themes (live mode): payment link id -> (default theme, price in euro cents, needs Plus).
# One link per price serves every theme: the app sends client_reference_id = <uid>__<theme>; a link without the suffix gives the default theme
THEME_LINKS = {
    'plink_1Ubn6YBz82ezmpqsfHXhNTsu': ('cafe', 199, False),
    'plink_1UbnAlBz82ezmpqs7q40mtnI': ('cafe', 99, True),     # the Plus price: only for accounts that have Pilotta Plus
}
# Payment Links of the Pilotta Plus subscriptions (live mode): monthly 1.99 EUR and yearly 14.99 EUR
SUB_LINKS = {
    'plink_1UbnHjBz82ezmpqsWQbluwGZ': ('month', 199),
    'plink_1UbnKDBz82ezmpqs7A56vUP3': ('year', 1499),
}
UID_RE = re.compile(r'^[A-Za-z0-9]{20,64}$')

if not KEY or not SA:
    print('Secret STRIPE_KEY or FIREBASE_SA is not set: nothing to do.')
    sys.exit(0)
mode = 'test' if KEY.startswith(('rk_test_', 'sk_test_')) else 'live'

import firebase_admin
from firebase_admin import auth, credentials, db

firebase_admin.initialize_app(credentials.Certificate(json.loads(SA)), {'databaseURL': DB_URL})
root = db.reference('/')


def stripe_get(path, params):
    req = urllib.request.Request('https://api.stripe.com/v1/' + path + '?' + urllib.parse.urlencode(params),
                                 headers={'Authorization': 'Bearer ' + KEY})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


last = db.reference('stripe/%s/last' % mode).get() or 0
since = max(0, int(last) - LOOKBACK) if last else int(time.time()) - LOOKBACK
sessions, after = [], None
while True:
    p = {'status': 'complete', 'created[gte]': since, 'limit': 100}
    if after:
        p['starting_after'] = after
    page = stripe_get('checkout/sessions', p)
    sessions += page.get('data') or []
    if not page.get('has_more') or not page.get('data'):
        break
    after = page['data'][-1]['id']

done = db.reference('stripe/%s/s' % mode).get(shallow=True) or {}
subs_before = db.reference('stripe/%s/sub' % mode).get() or {}
newest, plus_n, gifts, skipped, themes_n, subs_n = int(last or 0), 0, 0, 0, 0, 0
for s in sessions:
    newest = max(newest, int(s.get('created') or 0))
    sid = s.get('id')
    if not sid or sid in done:
        continue
    if s.get('payment_status') != 'paid':
        continue                       # e.g. a bank payment still on its way: looked at again next hour
    uid = s.get('client_reference_id') or ''
    theme_ref = ''
    if '__' in uid:
        uid, theme_ref = uid.split('__', 1)
    cc = s.get('currency_conversion')  # Adaptive Pricing: the buyer paid in his currency, the price is in euro
    amount = int((cc or s).get('amount_total') or 0)
    cur = ((cc or {}).get('source_currency') or s.get('currency') or '').lower()
    rec = {'a': amount, 'c': cur, 'ts': int(s.get('created') or 0)}
    ok_uid = bool(UID_RE.match(uid))
    if ok_uid:
        try:
            auth.get_user(uid)
        except auth.UserNotFoundError:
            ok_uid = False
    if ok_uid:
        rec['u'] = uid
    sl = SUB_LINKS.get(s.get('payment_link') or '')
    if sl:                             # a Plus subscription: Plus now; the check below takes it away again when the subscription ends
        kind, price = sl
        sub = s.get('subscription')
        if isinstance(sub, dict):
            sub = sub.get('id')
        rec['sub'] = kind
        if ok_uid and cur == 'eur' and amount >= price and sub:
            has_sub = any(isinstance(r, dict) and r.get('u') == uid and not r.get('end') for r in subs_before.values())
            if root.child('users/%s/plus' % uid).get() and not has_sub and not root.child('users/%s/plusLife' % uid).get():
                root.update({'users/%s/plusLife' % uid: True})   # had Plus before (one payment or by hand): the subscription must never take it away
            root.update({'users/%s/plus' % uid: True, 'stripe/%s/sub/%s' % (mode, sub): {'u': uid, 'k': kind, 'ts': int(s.get('created') or 0)}})
            rec['plus'] = True
            subs_n += 1
        else:
            skipped += 1
        root.update({'stripe/%s/s/%s' % (mode, sid): rec})
        continue
    tl = THEME_LINKS.get(s.get('payment_link') or '')
    if tl:                             # a theme: never Plus, never a donation
        theme, price, needs_plus = tl
        if theme_ref:
            if theme_ref in THEMES:
                theme = theme_ref
            else:
                ok_uid = False         # an unknown theme in the link: look at it by hand
        rec['th'] = theme
        if ok_uid and cur == 'eur' and amount >= price and (not needs_plus or root.child('users/%s/plus' % uid).get()):
            root.update({'users/%s/themes/%s' % (uid, theme): True})
            rec['given'] = True
            themes_n += 1
        else:
            skipped += 1               # no account, another currency, too little paid, or the Plus price without Plus: look at it by hand
        root.update({'stripe/%s/s/%s' % (mode, sid): rec})
        continue
    if ok_uid and cur == 'eur' and amount >= PLUS_MIN:
        root.update({'users/%s/plus' % uid: True, 'users/%s/plusLife' % uid: True})   # one payment: for ever
        rec['plus'] = True
        plus_n += 1
    elif cur == 'eur' and amount < PLUS_MIN:
        gifts += 1
    else:
        skipped += 1                   # no account on the link, deleted account or another currency: look at it by hand
    root.update({'stripe/%s/s/%s' % (mode, sid): rec})
root.update({'stripe/%s/last' % mode: newest})

# Subscriptions: every hour each known subscription is asked about. An ended one (canceled, unpaid, expired) takes Plus away,
# unless the account has plusLife (a one-time payment or Plus before the subscription) or another subscription is still active.
# This needs the Stripe key to be allowed to read Subscriptions; without that nobody loses Plus (nothing is removed on an error).
subs = db.reference('stripe/%s/sub' % mode).get() or {}
active_by_uid, ended_now, sub_err = {}, [], 0
for sid2, rec2 in subs.items():
    if not isinstance(rec2, dict):
        continue
    try:
        st = stripe_get('subscriptions/' + sid2, {}).get('status')
    except Exception:
        sub_err += 1
        continue
    if st in ('active', 'trialing', 'past_due'):      # past_due: Stripe is still retrying the payment
        active_by_uid[rec2.get('u')] = True
        if rec2.get('end'):
            root.update({'stripe/%s/sub/%s/end' % (mode, sid2): None})
    elif st in ('canceled', 'unpaid', 'incomplete_expired') and not rec2.get('end'):
        ended_now.append((sid2, rec2.get('u')))
plus_off = 0
if not sub_err:
    for sid2, u in ended_now:
        root.update({'stripe/%s/sub/%s/end' % (mode, sid2): int(time.time())})
        if u and not active_by_uid.get(u) and not db.reference('users/%s/plusLife' % u).get() and not db.reference('users/%s/plusPlay' % u).get():   # plusPlay: an active Google Play subscription (jobs/play_job.py)
            root.update({'users/%s/plus' % u: False})
            plus_off += 1
print('subscriptions: known %d, ended now %d, Plus removed %d, errors %d' % (len(subs), len(ended_now), plus_off, sub_err))
print('stripe (%s): paid sessions looked at %d, Plus given %d, subscriptions started %d, themes given %d, donations %d, to check by hand %d'
      % (mode, len(sessions), plus_n, subs_n, themes_n, gifts, skipped))

# only numbers (the logs of a public repo are public): how many accounts have Plus now
try:
    ukeys = list((db.reference('users').get(shallow=True) or {}).keys())
    n_plus = sum(1 for u in ukeys if db.reference('users/%s/plus' % u).get() is True)
    n_life = sum(1 for u in ukeys if db.reference('users/%s/plusLife' % u).get() is True)
    n_th = sum(1 for u in ukeys if db.reference('users/%s/themes' % u).get())
    print('accounts: %d, with Plus %d (for ever %d), with a bought theme %d' % (len(ukeys), n_plus, n_life, n_th))
except Exception:
    print('accounts: count failed')
