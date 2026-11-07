"""Pilotta Plus from Stripe payments (runs every hour, before the category job, in the public repo pilotta-pantou-site).
Secrets: STRIPE_KEY = restricted key with read access to Checkout Sessions only; FIREBASE_SA = service account.
The Payment Links of the app carry the account: client_reference_id = Firebase uid.
A completed and paid Checkout Session of 2.99 EUR or more gives users/UID/plus = true; a smaller amount is a donation.
Every session is handled once (stripe/s/SESSION_ID). Only numbers are printed: the logs of a public repo are public."""
import json, os, re, sys, time, urllib.parse, urllib.request

KEY = os.environ.get('STRIPE_KEY', '').strip()
SA = os.environ.get('FIREBASE_SA', '').strip()
DB_URL = 'https://pilotta-anywhere-default-rtdb.europe-west1.firebasedatabase.app'
PLUS_MIN = 299            # euro cents
LOOKBACK = 3 * 86400      # first run, and overlap on every run: sessions of the last 3 days are looked at again
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
newest, plus_n, gifts, skipped = int(last or 0), 0, 0, 0
for s in sessions:
    newest = max(newest, int(s.get('created') or 0))
    sid = s.get('id')
    if not sid or sid in done:
        continue
    if s.get('payment_status') != 'paid':
        continue                       # e.g. a bank payment still on its way: looked at again next hour
    uid = s.get('client_reference_id') or ''
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
    if ok_uid and cur == 'eur' and amount >= PLUS_MIN:
        root.update({'users/%s/plus' % uid: True})
        rec['plus'] = True
        plus_n += 1
    elif cur == 'eur' and amount < PLUS_MIN:
        gifts += 1
    else:
        skipped += 1                   # no account on the link, deleted account or another currency: look at it by hand
    root.update({'stripe/%s/s/%s' % (mode, sid): rec})
root.update({'stripe/%s/last' % mode: newest})
print('stripe (%s): paid sessions looked at %d, Plus given %d, donations %d, to check by hand %d'
      % (mode, len(sessions), plus_n, gifts, skipped))
