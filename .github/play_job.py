"""Themes bought in the Android app with Google Play Billing (runs every hour, after the Stripe job, in the public repo pilotta-pantou-site).
Secrets: PLAY_SA = service account (JSON) with access to the app in Play Console (view financial data + manage orders); FIREBASE_SA = Firebase service account.
The app writes every purchase to buy/UID/KEY = {p: productId, t: purchase token, ts}. This job asks Google Play about the token and, when the purchase is real,
paid, made by the same account (obfuscated account id = uid) and the right price tier, writes users/UID/themes/<theme> = true.
The result is kept in buy/UID/KEY/r: 1 = given, 0 = rejected, 2 = to check by hand. Only numbers are printed: the logs of a public repo are public."""
import json, os, sys, urllib.error, urllib.request

SA = os.environ.get('FIREBASE_SA', '').strip()
PSA = os.environ.get('PLAY_SA', '').strip()
DB_URL = 'https://pilotta-anywhere-default-rtdb.europe-west1.firebasedatabase.app'
PKG = 'app.pilotta.pantou'
# product id -> (theme, needs Plus)
PRODUCTS = {'theme_cafe': ('cafe', False), 'theme_cafe_plus': ('cafe', True)}

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

import urllib.parse
buy = root.child('buy').get() or {}
given = rejected = hand = 0
for uid, items in buy.items():
    for k, it in (items or {}).items():
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
