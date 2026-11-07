"""Hourly job (runs in the public repo pilotta-pantou-site, secret FIREBASE_SA = key of the service account tiers-job).
1. Category limits: among active players with an account (at least 1 rated game, not hibernating), the Elo of the
   top 50% / 25% / 10% / 3% -> tiers/cut = {c:[top50, top25, top10, top3], n, ts}. Each player's category -> users/UID/profile/tr.
2. Inactivity: 60 days without signing in -> hibernation (users/UID/hib, out of the leaderboard and the friend lists),
   180 days -> the account and all its data are deleted.
Only numbers are printed: the logs of a public repo are public. Hibernation and deletion run only when LIVE=1."""
import json, math, os, sys, time, unicodedata

LIVE = os.environ.get('LIVE') == '1'
SA = os.environ.get('FIREBASE_SA', '').strip()
DB_URL = 'https://pilotta-anywhere-default-rtdb.europe-west1.firebasedatabase.app'
DAY = 86400000
HIB_AFTER, DEL_AFTER = 60 * DAY, 180 * DAY
PCT = [0.50, 0.25, 0.10, 0.03]
MARGIN = 50
MAX_DEL = 200

if not SA:
    print('Secret FIREBASE_SA is not set: nothing to do.')
    sys.exit(0)

import firebase_admin
from firebase_admin import auth, credentials, db

firebase_admin.initialize_app(credentials.Certificate(json.loads(SA)), {'databaseURL': DB_URL})
root = db.reference('/')
now = int(time.time() * 1000)


def key(name):
    """same as acctKey() in the app"""
    n = str(name).lower().replace('ς', 'σ')
    return ''.join(ch for ch in unicodedata.normalize('NFD', n) if not ('̀' <= ch <= 'ͯ'))


def tier_of(elo, held, cuts):
    t = held or 0
    th = lambda k: 0 if k <= 0 else cuts[k - 1]
    while t + 1 < 5 and elo >= th(t + 1):
        t += 1
    while t > 0 and elo < th(t) - MARGIN:
        t -= 1
    return t


users = db.reference('users').get() or {}
stats = db.reference('stats').get() or {}

# accounts that no longer exist in Authentication (e.g. deleted before the rules allowed removing the profile):
# their leftovers in the database are removed
live = set()
page = auth.list_users()
while page:
    for u in page.users:
        live.add(u.uid)
    page = page.get_next_page()
orphans = [uid for uid, u in users.items() if isinstance(u, dict) and uid not in live]
names = db.reference('usernames').get() or {}
orphan_names = [k for k, v in names.items() if v not in live]

accounts, active, hib_new, to_del = 0, [], [], []
for uid, u in users.items():
    if not isinstance(u, dict) or not isinstance(u.get('profile'), dict) or uid not in live:
        continue
    accounts += 1
    pr, st = u['profile'], stats.get(uid) or {}
    last = max(int(u.get('seen') or 0), int(pr.get('ts') or 0), int(st.get('ts') or 0))
    if last == 0:
        last = now
    idle = now - last
    if idle >= DEL_AFTER:
        to_del.append((uid, pr.get('username')))
    elif idle >= HIB_AFTER:
        if not u.get('hib'):
            hib_new.append(uid)
    elif not u.get('hib') and int(st.get('g') or 0) >= 1:
        active.append(uid)

# 1. limits and categories
elos = sorted((int(stats[u].get('elo') or 1000) for u in active), reverse=True)
n = len(elos)
upd = {}
if n:
    cuts = [elos[max(1, math.ceil(p * n)) - 1] for p in PCT]
    upd['tiers/cut'] = {'c': cuts, 'n': n, 'ts': now}
    for uid in active:
        st = stats[uid]
        t = tier_of(int(st.get('elo') or 1000), int(st.get('tr') or 0), cuts)
        if users[uid]['profile'].get('tr') != t:
            upd['users/%s/profile/tr' % uid] = t
else:
    cuts = None
    upd['tiers/cut'] = {'n': 0, 'ts': now}
root.update(upd)
print('accounts %d, active with rated games %d, limits (top50/25/10/3) %s, categories changed %d'
      % (accounts, n, cuts, len(upd) - 1))

# 2. inactivity
print('to hibernate %d, to delete %d, leftovers of deleted accounts %d (usernames %d)%s'
      % (len(hib_new), len(to_del), len(orphans), len(orphan_names), '' if LIVE else ' (test mode: nothing changed)'))
if not LIVE:
    sys.exit(0)
if accounts and len(to_del) > max(10, accounts // 2):
    print('::error::More than half of the accounts would be deleted. Stopped, nothing deleted.')
    sys.exit(1)

for uid in hib_new:
    root.update({'users/%s/hib' % uid: now, 'lb/%s' % uid: None})

to_del += [(uid, ((users.get(uid) or {}).get('profile') or {}).get('username')) for uid in orphans]
for k in orphan_names:
    root.update({'usernames/' + k: None})
if to_del:
    lbw = db.reference('lbw').get(shallow=True) or {}
    lbm = db.reference('lbm').get(shallow=True) or {}
    fr_req = db.reference('friendReq').get() or {}
done = 0
for uid, name in to_del[:MAX_DEL]:
    try:
        auth.delete_user(uid)
    except auth.UserNotFoundError:
        pass
    rm = {'users/' + uid: None, 'stats/' + uid: None, 'lb/' + uid: None, 'friends/' + uid: None, 'friendReq/' + uid: None,
          'pres/' + uid: None, 'inv/' + uid: None}
    if name:
        rm['usernames/' + key(name)] = None
    for f in (db.reference('friends/' + uid).get(shallow=True) or {}):
        rm['friends/%s/%s' % (f, uid)] = None
    for to, frm in fr_req.items():
        if isinstance(frm, dict) and uid in frm:
            rm['friendReq/%s/%s' % (to, uid)] = None
    for k in lbw:
        rm['lbw/%s/%s' % (k, uid)] = None
    for k in lbm:
        rm['lbm/%s/%s' % (k, uid)] = None
    root.update(rm)
    done += 1
print('hibernated %d, deleted %d' % (len(hib_new), done))
