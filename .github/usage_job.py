"""Usage report (runs only when the job is started by hand). Prints counts only: the logs of a public repo are public.
Counts the anonymous round log (log/BUCKET/ID, kept about 15 days) from SINCE on: rounds, games started (round 1) and
games finished (a team reached the target), split by offline against bots and online with 1 to 4 real players."""
import json, os, sys, time, calendar
SA = os.environ.get('FIREBASE_SA', '').strip()
if not SA:
    print('Secret FIREBASE_SA is not set.'); sys.exit(0)
SINCE = os.environ.get('SINCE') or '2026-11-07T19:43:00'
since_ms = calendar.timegm(time.strptime(SINCE, '%Y-%m-%dT%H:%M:%S')) * 1000
import firebase_admin
from firebase_admin import credentials, db
firebase_admin.initialize_app(credentials.Certificate(json.loads(SA)), {'databaseURL': 'https://pilotta-anywhere-default-rtdb.europe-west1.firebasedatabase.app'})
b0 = since_ms // 21600000
rows = {}
for b in sorted(int(k) for k in (db.reference('log').get(shallow=True) or {})):
    if b < b0:
        continue
    for rec in (db.reference('log/%d' % b).get() or {}).values():
        if not isinstance(rec, dict) or int(rec.get('ts') or 0) < since_ms:
            continue
        humans = sum(1 for c in (rec.get('ctl') or []) if c) if rec.get('mp') else 0
        key = 'online, %d real players' % humans if rec.get('mp') else 'offline against bots'
        r = rows.setdefault(key, [0, 0, 0])
        r[0] += 1
        if int(rec.get('round') or 0) == 1:
            r[1] += 1
        sc, tg = rec.get('scoresAfter') or [0, 0], int(rec.get('target') or 0)
        if tg and max(sc) >= tg and sc[0] != sc[1]:
            r[2] += 1
print('Since %s UTC (rounds / games started / games finished):' % SINCE)
for k in sorted(rows):
    print('  %-26s %5d / %4d / %4d' % (k, rows[k][0], rows[k][1], rows[k][2]))
if not rows:
    print('  no rounds')
