import * as D from './data.js';

// ---------- Settings ----------
const API = 'https://tbajesdgqzbxbxmojcem.supabase.co/functions/v1/ou-guidance';
const VAPID = 'BAh2Vdi6MqPmL2HkTY18PYVvtlO5JVn1B_VTwDhFXm8OnUnGF7YDICPDKiU4xfT0pfjO7sUBJEChY5ycx_FEAUI';
const CATS = { deadline: 'Deadlines', tutorial: 'Tutorials', study: 'Study', timeoff: 'Time off', registration: 'Registration' };
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const icon = { arrow: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>', speak: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>', ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>' };

// Testing hook: ?now=2026-12-20T12:00 previews any date. Normal use ignores it.
const NOW_OVERRIDE = new URLSearchParams(location.search).get('now');
const nowMs = () => (NOW_OVERRIDE ? D.uk(NOW_OVERRIDE.slice(0, 10), NOW_OVERRIDE.slice(11, 16) || '12:00') : Date.now());
const today = () => D.ukParts(nowMs()).date;

// ---------- Saved progress (local first, synced to your other devices) ----------
const KEY = 'oug.v1';
let S = { done: {}, removed: {}, meta: {}, prefs: { theme: 'auto', filters: ['deadline', 'tutorial', 'timeoff', 'registration'], showPast: false, plan: null } };
try { const s = JSON.parse(localStorage.getItem(KEY)); if (s) S = { ...S, ...s, prefs: { ...S.prefs, ...s.prefs } }; } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
const isDone = (id) => !!S.done[id];
let syncT;
function setDone(id, on) {
  const t = Date.now();
  if (on) { S.done[id] = t; delete S.removed[id]; } else { delete S.done[id]; S.removed[id] = t; }
  save(); clearTimeout(syncT); syncT = setTimeout(sync, 800);
}
async function sync() {
  try {
    const r = await fetch(API + '?action=progress', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ done: S.done, removed: S.removed, meta: S.meta }) });
    const srv = await r.json();
    S.done = srv.done || S.done; S.removed = srv.removed || {}; S.meta = { ...srv.meta, ...S.meta }; save();
  } catch {}
}

// ---------- Plan task ids (some tasks are the same thing as a week, TMA or tutorial) ----------
const ALIAS = { 'c1.1': 'genai', 'c1.3': 'tma00', 'c2.0': 'w1', 'c3.0': 'w2', 'c4.1': 'w3', 'c5.1': 'w4', 'c7.2': 't1', 'c8.0': 'tma01', 'q2w10.2': 't2', 'q2w11.2': 't3', 'q2d2.0': 'tma02', 'q3w19.2': 't9', 'q3d3.0': 'tma03' };
const taskId = (it, i) => (it.week && i === 0 ? 'w' + it.week : ALIAS[`${it.id}.${i}`] || `${it.id}.${i}`);
const weekOf = (n) => D.WEEKS.find((w) => w.n === n);
const dueOf = (it) => it.date || weekOf(it.week).end;
const isTutId = (id) => /^t\d+$/.test(id);
function allTasks() {
  const out = [];
  for (const p of D.PLANS) for (const it of p.items) it.tasks.forEach((txt, i) => out.push({ id: taskId(it, i), txt, due: dueOf(it), plan: p, item: it }));
  out.push({ id: 'r1', txt: 'Register for TM256 + TM252', due: D.REGISTRATIONS[0].target, plan: null });
  return out;
}
function behind() { const t = today(); const seen = new Set(); return allTasks().filter((x) => x.due < t && !isTutId(x.id) && !isDone(x.id) && !seen.has(x.id) && seen.add(x.id)); }
const itemDone = (it) => it.tasks.every((_, i) => isDone(taskId(it, i)));
function currentWeek(t = today()) { return D.WEEKS.find((w) => t >= w.start && t <= w.end); }
function currentPlan() { return D.PLANS.find((p) => !isDone(p.tma)) || D.PLANS[D.PLANS.length - 1]; }
function breakState(b, t = today()) {
  const ready = b.needs.every(isDone);
  if (t > b.end) return 'past';
  if (t >= b.start) return ready ? 'on' : 'catchup';
  return ready ? 'ready' : 'needs';
}
const tutStart = (x) => D.uk(x.date, x.start), tutEnd = (x) => D.uk(x.date, x.end);
function nextTutorial() { const n = nowMs(); return D.TUTORIALS.find((x) => tutEnd(x) > n); }
function nextTMA() { const t = today(); return D.TMAS.find((x) => !x.practice && !isDone(x.id) && x.cutoff >= t); }
function nextBreak() { const t = today(); return D.BREAKS.find((b) => b.end >= t); }
function whenLabel(date, time) {
  const n = D.daysBetween(today(), date);
  const day = n === 0 ? 'Today' : n === 1 ? 'Tomorrow' : n > 1 && n < 7 ? D.fmtDate(date, { weekday: 'long' }) : D.fmtDate(date, { weekday: 'short', day: 'numeric', month: 'short' });
  return time ? `${day} at ${D.fmtTime(time)}` : day;
}
function countdown(ms) {
  let d = Math.max(0, ms - nowMs());
  const days = Math.floor(d / 864e5); d -= days * 864e5;
  const h = Math.floor(d / 36e5); d -= h * 36e5;
  const m = Math.floor(d / 6e4);
  return days > 0 ? `${days} day${days === 1 ? '' : 's'}, ${h} hr${h === 1 ? '' : 's'}` : `${h} hr${h === 1 ? '' : 's'}, ${m} min`;
}
// Free study windows today: 10:30 to 15:00 and 16:00 to 22:00, minus tutorials and time already gone.
function studyWindows(date = today()) {
  const toM = (s) => +s.slice(0, 2) * 60 + +s.slice(3, 5), fmt = (m) => D.fmtTime(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`);
  let wins = [[630, 900], [960, 1320]];
  for (const t of D.TUTORIALS.filter((x) => x.date === date)) {
    const s = toM(t.start), e = toM(t.end);
    wins = wins.flatMap(([a, b]) => (e <= a || s >= b ? [[a, b]] : [[a, s], [e, b]].filter(([x, y]) => y - x >= 30)));
  }
  if (date === today()) { const nm = D.ukParts(nowMs()).mins; wins = wins.map(([a, b]) => [Math.max(a, Math.ceil(nm / 15) * 15), b]).filter(([a, b]) => b - a >= 30); }
  return wins.map(([a, b]) => `${fmt(a)} to ${fmt(b)}`);
}

// ---------- Small render helpers ----------
const check = (id, txt, extra = '') => `<label class="check ${isDone(id) ? 'done' : ''}"><input type="checkbox" data-tick="${esc(id)}" ${isDone(id) ? 'checked' : ''}><span>${esc(txt)}${extra}</span></label>`;
const pill = (cat, txt) => `<span class="pill c-${cat}">${esc(txt)}</span>`;
const link = (url, txt, cls = 'btn small ghost') => (url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener">${esc(txt)} ${icon.ext}</a>` : '');
const greeting = () => { const h = +D.ukParts(nowMs()).time.slice(0, 2); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

// ---------- TODAY ----------
function renderToday() {
  const t = today(), late = behind(), wk = currentWeek(), plan = currentPlan();
  const items = plan.items.filter((it) => (it.date ? it.date === t : (wk && it.week === wk.n)));
  const tma = nextTMA(), tut = nextTutorial(), brk = nextBreak();
  const curBreak = D.BREAKS.find((b) => t >= b.start && t <= b.end);
  const status = late.length ? `<span class="pill bad">Behind: ${late.length} task${late.length > 1 ? 's' : ''}</span>` : `<span class="pill good">On track</span>`;
  let h = `<div class="head"><div><h1>${greeting()}, ${D.PROFILE.first}</h1><p class="sub">${D.fmtDate(t, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}${wk ? ` · TM112 week ${wk.n} of 21` : ''}</p></div>${status}</div>`;

  if (curBreak) {
    const st = breakState(curBreak);
    h += `<div class="card c-timeoff accent"><div class="label"><span class="dot"></span>${st === 'on' ? 'Time off' : 'Catch up time'}</div><h2>${st === 'on' ? `Enjoy your ${esc(curBreak.title.toLowerCase())}` : 'Use this break to catch up'}</h2><p class="muted">${st === 'on' ? `You're on track. Rest until ${D.fmtDate(curBreak.end, { weekday: 'long', day: 'numeric', month: 'long' })}.` : `You have unfinished tasks, so this counts as catch up time until ${D.fmtDate(curBreak.end, { day: 'numeric', month: 'long' })}.`}</p></div>`;
  }

  // What to study today
  h += `<div class="grid2"><div class="card c-study"><div class="label"><span class="dot"></span>Study today</div>`;
  if (items.length) {
    for (const it of items) h += `<h2>${it.date ? esc(plan.title) : `Week ${it.week}: ${esc(weekOf(it.week).title)}`}</h2><div>${it.tasks.map((x, i) => check(taskId(it, i), x)).join('')}</div>`;
  } else if (wk) {
    h += `<h2>Week ${wk.n}: ${esc(wk.title)}</h2>${wk.note ? `<p class="muted">${esc(wk.note)}</p>` : ''}`;
  } else {
    h += `<h2>No TM112 study set for today</h2><p class="muted">Nothing is scheduled. Rest, or get ahead on the next week.</p>`;
  }
  const wins = studyWindows();
  if (wins.length && !curBreak) h += `<p class="small muted"><b>Best times today:</b> ${wins.join(' and ')}. These avoid your school runs${D.TUTORIALS.some((x) => x.date === t) ? ' and today\'s tutorial' : ''}.</p>`;
  if (late.length) h += `<div class="note"><b>Catch up first (${late.length}):</b><div>${late.slice(0, 5).map((x) => check(x.id, x.txt, ` <span class="muted small">· was due ${D.fmtDate(x.due)}</span>`)).join('')}</div>${late.length > 5 ? `<p class="small">And ${late.length - 5} more in the Plan tab.</p>` : ''}</div>`;
  h += `</div>`;

  // Next deadline
  if (tma) {
    const tgtDays = D.daysBetween(t, tma.target), passed = tgtDays < 0;
    h += `<div class="card c-deadline"><div class="label"><span class="dot"></span>Next deadline</div><h2>${tma.name}${tma.final ? ' (final, no extensions)' : ''}</h2>
      <div><span class="big">${passed ? countdown(D.uk(tma.cutoff, tma.cutoffTime)).split(',')[0] : Math.max(0, tgtDays)}</span><span class="unit">${passed ? 'to the OU cut-off' : tgtDays === 1 ? 'day to your target' : 'days to your target'}</span></div>
      <p><b>Your target:</b> ${D.fmtDate(tma.target, { weekday: 'long', day: 'numeric', month: 'long' })}${passed ? ' <span class="pill bad">passed</span>' : ''}</p>
      <p><b>OU cut-off:</b> ${D.fmtDate(tma.cutoff, { weekday: 'long', day: 'numeric', month: 'long' })} at 12:00 <span class="muted small">(${countdown(D.uk(tma.cutoff, tma.cutoffTime))} left · confirm the time on the TMA page)</span></p>
      <div class="row">${link(D.LINKS.assessment, 'Questions')}${link(D.LINKS.record, 'Submit')}</div></div>`;
  }
  h += `</div><div class="grid2">`;

  // Next tutorial
  if (tut) {
    const live = nowMs() >= tutStart(tut), cl = D.clash(tut.date, tut.start, tut.end);
    h += `<div class="card c-tutorial"><div class="label"><span class="dot"></span>${live ? 'Live now' : 'Next live tutorial'}</div><h2>${whenLabel(tut.date, tut.start)}</h2><p>${esc(tut.title)}</p>
      <div class="row">${pill('tutorial', `${D.fmtTime(tut.start)} to ${D.fmtTime(tut.end)}`)}${tut.recorded === true ? pill('timeoff', 'Recorded') : tut.recorded === false ? pill('deadline', 'Not recorded: attend live') : ''}</div>
      ${cl ? `<p class="warn">⚠ ${esc(cl)}</p>` : ''}
      <div class="row">${link(D.LINKS.tutorials, 'Join or view booking', 'btn small')}${link(D.LINKS.recordings, 'Recordings')}</div></div>`;
  }
  // Tiles: time off + registration
  const reg = D.REGISTRATIONS[0];
  h += `<div class="tiles">`;
  if (brk) {
    const n = D.daysBetween(t, brk.start), st = breakState(brk);
    h += `<button class="tile c-timeoff" data-goto="calendar"><span class="label">Next time off</span><b>${n <= 0 ? (st === 'on' ? 'Now' : 'Catch up') : n}</b><span>${n > 0 ? `day${n === 1 ? '' : 's'} until your break: ` : ''}${esc(brk.title)}${brk.estimate ? ' (estimate)' : ''}</span><span class="muted small">${st === 'needs' ? 'Only if you finish what\'s due first' : `${D.fmtDate(brk.start)} to ${D.fmtDate(brk.end)}`}</span></button>`;
  }
  if (!isDone('r1') && t <= reg.closes) {
    const n = D.daysBetween(t, reg.target);
    h += `<button class="tile c-registration" data-goto="degree"><span class="label">Register</span><b>${n >= 0 ? n : D.daysBetween(t, reg.closes)}</b><span>${n >= 0 ? 'days to your target' : 'days until enrolment closes'}: ${reg.modules}</span><span class="muted small">OU closes ${D.fmtDate(reg.closes)}</span></button>`;
  }
  h += `</div></div>`;

  // Talk me through it
  h += `<div class="card"><div class="row between"><h3>Talk me through it</h3><div class="row"><button class="btn" id="speak">${icon.speak} Play</button><button class="btn ghost" id="stop" hidden>Stop</button></div></div><p class="say" id="say">${esc(summary())}</p></div>`;

  // Coming up: smart reminders
  const soon = upcomingReminders(14);
  h += `<div class="card"><div class="label">Coming up in the next 2 weeks</div>${soon.length ? `<div class="list">${soon.map((r) => `<div class="feed"><span class="dot c-${r.cat}"></span><div><b>${esc(r.title)}</b><p class="small muted">${esc(D.fmtDate(D.ukParts(r.at).date, { weekday: 'short', day: 'numeric', month: 'short' }))} · ${esc(r.body)}</p></div></div>`).join('')}</div>` : '<p class="empty">Nothing in the next two weeks.</p>'}</div>`;
  $('#today').innerHTML = h;
}
const REM_CAT = { tma: 'deadline', target: 'deadline', tutorial: 'tutorial', study: 'study', break: 'timeoff', registration: 'registration' };
function upcomingReminders(days) {
  const n = nowMs(), end = n + days * 864e5, tickOf = Object.fromEntries(D.buildEvents().map((e) => [e.id, e.tick]));
  const seen = new Set();
  return D.buildReminders().filter((r) => r.at >= n && r.at <= end && r.type !== 'study' && !isDone(tickOf[r.ev]) && !seen.has(r.title) && seen.add(r.title)).slice(0, 8).map((r) => ({ ...r, cat: REM_CAT[r.type] }));
}

// Spoken and written summary.
function summary() {
  const t = today(), late = behind(), wk = currentWeek(), tma = nextTMA(), tut = nextTutorial(), brk = nextBreak(), plan = currentPlan();
  const parts = [`Hi ${D.PROFILE.first}. It's ${D.fmtDate(t, { weekday: 'long', day: 'numeric', month: 'long' })}.`];
  parts.push(late.length ? `You're behind by ${late.length} task${late.length > 1 ? 's' : ''}. Start with: ${late[0].txt}.` : `You're on track.`);
  const items = plan.items.filter((it) => it.date === t || (wk && it.week === wk.n));
  if (items.length) parts.push(`Today's plan: ${items[0].tasks.filter((_, i) => !isDone(taskId(items[0], i))).join('. ') || 'all done. Nice work'}.`);
  else if (wk) parts.push(`This is week ${wk.n}: ${wk.title}.`);
  if (tma) { const n = D.daysBetween(t, tma.target); parts.push(n >= 0 ? `${tma.name} target is ${D.relDays(n)}, ${D.fmtDate(tma.target, { weekday: 'long', day: 'numeric', month: 'long' })}. The OU cut-off is ${D.fmtDate(tma.cutoff, { weekday: 'long', day: 'numeric', month: 'long' })} at midday.` : `You've passed your ${tma.name} target. Submit before ${D.fmtDate(tma.cutoff, { weekday: 'long', day: 'numeric', month: 'long' })} at midday.`); }
  if (tut) { const w = whenLabel(tut.date, tut.start); parts.push(`Your next live tutorial is ${/^(Today|Tomorrow)/.test(w) ? w.toLowerCase() : 'on ' + w}: ${tut.title}.`); }
  if (brk) { const n = D.daysBetween(t, brk.start); if (n > 0) parts.push(`Your next time off (${brk.title.replace('After', 'after')}) starts ${D.relDays(n)}.`); }
  if (!isDone('r1') && t <= D.REGISTRATIONS[0].closes) parts.push(`Remember to register for TM256 and TM252 by ${D.fmtDate(D.REGISTRATIONS[0].target, { day: 'numeric', month: 'long' })}.`);
  return parts.join(' ');
}
function speak() {
  const text = summary(); $('#say').textContent = text;
  if (!('speechSynthesis' in window)) return toast('Reading aloud is not supported here');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'en-GB'; u.rate = 0.98;
  const v = speechSynthesis.getVoices().filter((x) => /en[-_]GB/i.test(x.lang));
  u.voice = v.find((x) => /Daniel|Serena|Kate|Arthur|Martha|Google UK|Libby|Sonia|Ryan/i.test(x.name)) || v[0] || null;
  u.onend = () => { const s = $('#stop'); if (s) s.hidden = true; };
  $('#stop').hidden = false; speechSynthesis.speak(u);
}

// ---------- PLAN ----------
function renderPlan() {
  const tabs = [...D.PLANS.map((p) => [p.id, p.tma.replace('tma0', 'TMA 0')]), ['weeks', 'All weeks']];
  const sel = S.prefs.plan || currentPlan().id;
  let h = `<div class="head"><div><h1>Plan</h1><p class="sub">Tick things off as you go. Your ticks sync to your other devices.</p></div></div><div class="seg" role="group">${tabs.map(([id, l]) => `<button data-plan="${id}" aria-pressed="${id === sel}">${l}</button>`).join('')}</div>`;
  if (sel === 'weeks') {
    const t = today(), done = D.WEEKS.filter((w) => !w.assess && isDone('w' + w.n)).length, total = D.WEEKS.filter((w) => !w.assess).length;
    h += `<div class="card c-study"><div class="row between"><h3>${done} of ${total} study weeks done</h3><span class="muted small">${Math.round((done / total) * 100)}%</span></div><div class="progress"><i style="width:${(done / total) * 100}%"></i></div>`;
    let lastBlock = 0;
    for (const w of D.WEEKS) {
      if (w.block !== lastBlock) { h += `<div class="month">Block ${w.block}</div>`; lastBlock = w.block; }
      if (w.n === 12) h += `<p class="note">19 Dec to 1 Jan: no study weeks (Christmas break).</p>`;
      const cur = t >= w.start && t <= w.end, late = !w.assess && w.end < t && !isDone('w' + w.n);
      const lbl = `Week ${w.n} · ${D.fmtDate(w.start)} to ${D.fmtDate(w.end)}${cur ? ' · THIS WEEK' : ''}`;
      h += w.assess ? `<div class="check"><span style="width:26px;text-align:center">✎</span><span><b>${esc(w.title)}</b><br><span class="small muted">${lbl}</span></span></div>` : check('w' + w.n, w.title, `<br><span class="small ${late ? '' : 'muted'}" style="${late ? 'color:var(--warn);font-weight:700' : ''}">${lbl}${late ? ' · behind' : ''}</span>${w.note ? `<br><span class="small muted">${esc(w.note)}</span>` : ''}`);
    }
    h += `</div>`;
  } else {
    const p = D.PLANS.find((x) => x.id === sel), tma = D.TMAS.find((x) => x.id === p.tma), t = today();
    const ids = [...new Set(p.items.flatMap((it) => it.tasks.map((_, i) => taskId(it, i))))], dn = ids.filter(isDone).length;
    h += `<div class="card c-deadline accent"><div class="row between"><h2>${tma.name}</h2>${isDone(tma.id) ? '<span class="pill good">Submitted</span>' : ''}</div>
      <p><b>Your target:</b> ${D.fmtDate(tma.target, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}<br><b>OU cut-off:</b> ${D.fmtDate(tma.cutoff, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at 12:00 <span class="small muted">(confirm on the TMA page)</span></p>
      ${tma.final ? '<p class="warn">⚠ No extensions for TMA 03. Late means you fail the module, even with great TMA 01 and 02 scores.</p>' : ''}
      <div class="row">${link(D.LINKS.assessment, 'Questions and Turnitin')}${link(D.LINKS.record, 'Submit and calculator')}</div>
      <div class="row between"><span class="small muted">${dn} of ${ids.length} tasks done</span></div><div class="progress"><i style="width:${(dn / ids.length) * 100}%"></i></div></div>`;
    h += `<p class="note">${esc(p.note)}</p>`;
    for (const it of p.items) {
      const due = dueOf(it), isToday = it.date ? it.date === t : (t >= weekOf(it.week).start && t <= weekOf(it.week).end), late = due < t && !itemDone(it);
      const title = it.date ? D.fmtDate(it.date, { weekday: 'long', day: 'numeric', month: 'long' }) : `Week ${it.week} · ${D.fmtDate(weekOf(it.week).start)} to ${D.fmtDate(weekOf(it.week).end)}`;
      h += `<div class="card tight ${isToday ? 'c-study accent' : ''}"><div class="row between"><h3>${title}</h3>${isToday ? pill('study', 'Today') : itemDone(it) ? '<span class="pill good">Done</span>' : late ? '<span class="pill bad">Behind</span>' : ''}</div><div>${it.tasks.map((x, i) => check(taskId(it, i), x)).join('')}</div></div>`;
    }
  }
  $('#plan').innerHTML = h;
}

// ---------- CALENDAR ----------
const EXTRA = [
  { id: 'start-r1', cat: 'registration', date: '2027-02-06', title: 'Planned start: TM256 + TM252', body: 'Planned, not registered until you book it.' },
  { id: 'start-r2', cat: 'registration', date: '2027-10-01', title: 'Planned start: TM255 + TM257 (October, estimate)', body: 'Planned, not registered. October 2027 is the last ever TM255 start.' },
  { id: 'start-r3', cat: 'registration', date: '2028-02-01', title: 'Planned start: TM311 + TM359 (February, estimate)', body: 'Planned, not registered.' },
  { id: 'start-r4', cat: 'registration', date: '2028-10-01', title: 'Planned start: TM352 or TM355 (October, estimate)', body: 'Planned, not registered.' },
  { id: 'start-r5', cat: 'registration', date: '2029-01-01', title: 'Planned start: TM470 (early 2029, estimate)', body: 'Planned, not registered. Must be your final module.' },
  ...D.ATTENDED.map((a, i) => ({ id: 'att' + i, cat: 'tutorial', date: a.date, start: '18:30', title: a.title, body: 'Attended.', attended: true })),
];
function renderCalendar() {
  const t = today(), f = S.prefs.filters;
  const all = [...D.buildEvents(), ...EXTRA].sort((a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || '')));
  const shown = all.filter((e) => f.includes(e.cat) && (S.prefs.showPast || (e.endDate || e.date) >= t));
  let h = `<div class="head"><div><h1>Calendar</h1><p class="sub">Everything from now to 2029. Tap a filter to hide or show it.</p></div></div>`;
  // Time off strip
  h += `<div class="card c-timeoff"><div class="label"><span class="dot"></span>Your time off</div><div class="list">${D.BREAKS.map((b) => {
    const st = breakState(b), n = D.daysBetween(t, b.start), len = D.daysBetween(b.start, b.end) + 1;
    const lab = st === 'past' ? 'Done' : st === 'on' ? 'Now' : st === 'catchup' ? 'Catch up time' : n === 0 ? 'Today' : `In ${n} day${n === 1 ? '' : 's'}`;
    return `<div class="li" style="${st === 'past' ? 'opacity:.5' : ''}"><div><b>${esc(b.title)}${b.estimate ? ' <span class="small muted">(estimate)</span>' : ''}</b><p class="small muted">${D.fmtDate(b.start, { day: 'numeric', month: 'short', year: 'numeric' })} to ${D.fmtDate(b.end, { day: 'numeric', month: 'short', year: 'numeric' })} · ${len} days${st === 'needs' ? ' · real time off only if you finish what\'s due first' : ''}</p></div>${pill(st === 'catchup' ? 'deadline' : 'timeoff', lab)}</div>`;
  }).join('')}</div></div>`;
  h += `<div class="chips">${Object.entries(CATS).map(([k, l]) => `<button class="chip c-${k}" data-filter="${k}" aria-pressed="${f.includes(k)}"><span class="dot"></span>${l}</button>`).join('')}<button class="chip" data-past aria-pressed="${S.prefs.showPast}">Show past</button></div>`;
  let month = '';
  h += `<div class="list">`;
  for (const e of shown) {
    const m = D.fmtDate(e.date, { month: 'long', year: 'numeric' });
    if (m !== month) { h += `<div class="month">${m}</div>`; month = m; }
    const past = (e.endDate || e.date) < t, dn = e.tick && isDone(e.tick);
    const time = e.start ? `${D.fmtTime(e.start)}${e.end ? ' to ' + D.fmtTime(e.end) : ''}` : e.endDate ? `${D.fmtDate(e.date)} to ${D.fmtDate(e.endDate)}` : '';
    const rel = past ? '' : D.relDays(D.daysBetween(t, e.date));
    h += `<div class="ev c-${e.cat} ${past ? 'past' : ''} ${dn ? 'done' : ''}"><div class="d"><small>${D.fmtDate(e.date, { weekday: 'short' })}</small><b>${D.fmtDate(e.date, { day: 'numeric' })}</b></div><div class="t"><h3>${esc(e.title)}</h3><p>${[rel, time].filter(Boolean).map(esc).join(' · ')}</p>${e.body ? `<p>${esc(e.body)}</p>` : ''}${e.clash ? `<p class="warn">⚠ ${esc(e.clash)}</p>` : ''}${e.tick ? `<label class="check" style="border:0;padding:4px 0 0"><input type="checkbox" data-tick="${esc(e.tick)}" ${dn ? 'checked' : ''}><span class="small">${dn ? 'Done' : 'Mark as done'}</span></label>` : ''}</div>${e.url ? `<a class="go" href="${esc(e.url)}" target="_blank" rel="noopener" aria-label="Open">${icon.arrow}</a>` : '<span></span>'}</div>`;
  }
  h += shown.length ? '' : '<p class="empty">Nothing matches these filters.</p>';
  h += `</div>`;
  $('#calendar').innerHTML = h;
}

// ---------- DEGREE ----------
function renderDegree() {
  const banked = D.RESULTS.reduce((a, r) => a + r.credits, 0), tm112 = isDone('tma03') ? 30 : 0, inProg = 30 - tm112;
  const C = 2 * Math.PI * 52, pct = (banked + tm112) / D.PROFILE.creditsNeeded, pct2 = (banked + 30) / D.PROFILE.creditsNeeded;
  const reg = D.REGISTRATIONS[0], t = today();
  let h = `<div class="head"><div><h1>Degree</h1><p class="sub">${esc(D.PROFILE.qualification)} · ${esc(D.PROFILE.pi)}</p></div></div>`;
  h += `<div class="card"><div class="row" style="gap:18px;flex-wrap:nowrap"><svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" fill="none" stroke="var(--soft)" stroke-width="14"/><circle cx="60" cy="60" r="52" fill="none" stroke="var(--study)" stroke-opacity=".35" stroke-width="14" stroke-dasharray="${C * pct2} ${C}" transform="rotate(-90 60 60)" stroke-linecap="round"/><circle cx="60" cy="60" r="52" fill="none" stroke="var(--good)" stroke-width="14" stroke-dasharray="${C * pct} ${C}" transform="rotate(-90 60 60)" stroke-linecap="round"/><text x="60" y="58" text-anchor="middle" font-size="26" font-weight="800" fill="var(--ink)">${banked + tm112}</text><text x="60" y="78" text-anchor="middle" font-size="12" fill="var(--muted)">of 360</text></svg>
    <div><h2>${banked + tm112} credits done</h2><p class="muted">${inProg ? `${banked + 30} once TM112 is done. ` : ''}Finish: about <b>September 2029</b> (estimate). Deadline to complete: 31 Jan 2042.</p></div></div></div>`;
  // Registration
  h += `<div class="card c-registration accent"><div class="label"><span class="dot"></span>Registration: you are not registered yet</div>`;
  if (!isDone('r1') && t <= reg.closes) h += `<h2>Register for ${reg.modules}</h2><p><b>Your target:</b> ${D.fmtDate(reg.target, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} (${D.relDays(D.daysBetween(t, reg.target))})<br><b>OU enrolment closes:</b> ${D.fmtDate(reg.closes, { day: 'numeric', month: 'long', year: 'numeric' })}<br><b>Starts:</b> 6 February 2027 · ${reg.fee}</p><p class="note">Sort out how you're paying (funding) before you register.</p><div class="row">${link(D.LINKS.chooser, 'Register', 'btn small')}${link(D.LINKS.fees, 'Fees and funding')}</div>`;
  h += check('r1', `I've registered for ${reg.modules}`);
  h += `<p class="small muted">Not open yet: TM255 + TM257 (Oct 2027, last ever TM255 start), TM311 + TM359 (Feb 2028), TM352 or TM355 (Oct 2028), TM470 (2029). You'll get a reminder to check the module chooser every couple of months.</p></div>`;
  // Roadmap
  const cat = { done: 'timeoff', now: 'tutorial', plan: 'registration', goal: 'study' };
  h += `<div class="card"><h2>Roadmap</h2><div class="road">${D.ROADMAP.map((r) => `<div class="stop ${r.status === 'done' ? 'done' : ''} c-${cat[r.status]}"><div class="rail"><i></i><s></s></div><div class="body"><span class="small muted">${esc(r.when)}</span><h3>${esc(r.what)} ${r.status === 'plan' ? pill('registration', 'Planned, not registered') : r.status === 'now' ? pill('tutorial', 'Studying now') : r.status === 'done' ? '<span class="pill good">Done</span>' : ''}</h3><p class="small muted">${esc(r.note)}${r.credits ? ` · ${r.credits} credits` : ''}</p>${r.warn ? `<p class="warn">⚠ ${esc(r.warn)}</p>` : ''}</div></div>`).join('')}</div><p class="note">${esc(D.ROADMAP_NOTE)}</p></div>`;
  // Results
  h += `<div class="card"><h2>Stage 1 results</h2><table><tr><th>Module</th><th>Result</th><th>Score</th></tr>${D.RESULTS.map((r) => `<tr><td><b>${r.code}</b> <span class="muted small">${esc(r.title)}</span></td><td>${r.result}</td><td class="num">${r.score}</td></tr>`).join('')}<tr><td><b>TM112</b> <span class="muted small">result ${D.fmtDate(D.MODULE.result, { day: 'numeric', month: 'short', year: 'numeric' })}</span></td><td colspan="2" class="muted">In progress</td></tr></table></div>`;
  // Module list
  h += `<div class="card"><h2>Stages 2 and 3</h2><table><tr><th>Module</th><th>Next start</th></tr>${D.MODULES.map((m) => `<tr><td><b>${esc(m.code)}</b> <span class="muted small">${esc(m.title)}${m.option ? ' (choose one)' : ''}</span>${m.note ? `<br><span class="small muted">${esc(m.note)}</span>` : ''}</td><td class="small">${esc(m.next || 'Not published')}${m.last ? `<br><span class="muted">Last start: ${esc(m.last)}</span>` : ''}</td></tr>`).join('')}</table></div>`;
  $('#degree').innerHTML = h;
}

// ---------- MORE ----------
const HOWTO = [
  ['Submit a TMA', ['Open your TM112 module record (button below).', 'Find the TMA in the Assessment section.', 'Tap "Submit for TMA 0X".', 'Upload ONE Word document (not a PDF). Python files go in a zip with it.', 'Submit, then check you get the confirmation receipt.', 'Submit early: it is the arrival time that counts.'], 'record'],
  ['Find my result', ['Open StudentHome.', 'Open TM112, then "Module result" or the module record.', 'TMA scores appear about 10 working days after the cut-off.', 'The TM112 result is released on 27 April 2027.'], 'record'],
  ['Book or join a tutorial', ['Open "Your tutorials and study events".', 'To book: pick TM112, choose a date, tap "Book now".', 'To join: open "View/print" next to the booked session and use the online room link.', 'Can\'t go? Tap "Cancel". No penalty.', 'Missed one? Recorded sessions appear on the recordings page.'], 'tutorials'],
  ['Register for a module', ['Sort out funding first (student loan or how you\'ll pay).', 'Open the module chooser for R60.', 'Pick the module and the start date.', 'Follow the steps and pay or confirm funding.', 'Come back here and tick "I\'ve registered".'], 'chooser'],
  ['Defer TM112', ['Only if something serious happens. Talk to your tutor or Student Support first.', 'The final deferral date is 10 March 2027.', 'Open the module record and find the deferral information.', 'Assessment banking can keep marks you already have.'], 'record'],
  ['Ask for an extension (TMA 01 or 02 only)', ['Email your tutor as early as possible, not on the cut-off date.', 'Explain the serious, unforeseen reason.', 'There are NO extensions for TMA 03.'], 'tutorEmail'],
];
function renderMore() {
  const types = S.prefs.types || Object.keys(D.REMINDER_TYPES);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iPhone|iPad/.test(navigator.userAgent);
  const webcal = API.replace('https://', 'webcal://') + '?action=ics&types=' + types.join(',');
  let h = `<div class="head"><div><h1>More</h1><p class="sub">Reminders, help and settings.</p></div></div>`;
  h += `<div class="card"><h2>Notifications</h2><p class="muted small">Reminders never arrive before 10:30 or between 15:00 and 16:00.</p><div id="pushbox"></div>
    <h3 style="margin-top:6px">Which reminders</h3><div>${Object.entries(D.REMINDER_TYPES).map(([k, l]) => `<label class="switch"><span>${esc(l)}</span><input type="checkbox" data-type="${k}" ${types.includes(k) ? 'checked' : ''}></label>`).join('')}</div></div>`;
  h += `<div class="card"><h2>Backup: add to your calendar</h2><p class="muted small">Puts every date, with alerts at the same times, into your phone's Calendar app. It updates itself. Use it as well as notifications.</p>
    <div class="row"><a class="btn small" href="${esc(webcal)}">Subscribe in Calendar</a><button class="btn small ghost" data-copy="${esc(webcal.replace('webcal://', 'https://'))}">Copy link</button></div>
    <details><summary>Steps on iPhone</summary><ol><li>Tap "Subscribe in Calendar", then "Subscribe".</li><li>Turn <b>off</b> "Remove Alerts", otherwise you get no alerts.</li><li>Tap "Add". The calendar is called OU Guidance.</li><li>If alerts don't show: Settings, Calendar, Accounts, Subscribed Calendars, OU Guidance, check "Remove Alerts" is off.</li></ol></details>
    <details><summary>Steps on desktop</summary><ol><li>Tap "Copy link".</li><li>Outlook: Add calendar, From internet, paste.</li><li>Google Calendar: Other calendars, +, From URL, paste. Google ignores alerts in subscribed calendars, so rely on push notifications there.</li></ol></details></div>`;
  h += `<div class="card"><h2>How to</h2>${HOWTO.map(([q, steps, l]) => `<details><summary>${esc(q)}</summary><ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol><div class="row" style="margin-top:10px">${link(D.LINKS[l], 'Open the page')}</div></details>`).join('')}</div>`;
  h += `<div class="card"><h2>Quick links</h2><div class="row">${[['Module website', 'module'], ['Assessment tab', 'assessment'], ['Module record', 'record'], ['Tutorials', 'tutorials'], ['Recordings', 'recordings'], ['Module chooser', 'chooser'], ['StudentHome', 'studentHome'], ['Help Centre', 'helpCentre'], ['Email Angus Walker', 'tutorEmail']].map(([l, k]) => link(D.LINKS[k], l)).join('')}</div></div>`;
  h += `<div class="card"><h2>Appearance</h2><div class="seg">${['auto', 'light', 'dark'].map((m) => `<button data-theme="${m}" aria-pressed="${S.prefs.theme === m}">${m === 'auto' ? 'Match phone' : m[0].toUpperCase() + m.slice(1)}</button>`).join('')}</div></div>`;
  h += `<div class="card"><h2>Your progress</h2><p class="small muted">${Object.keys(S.done).length} items ticked. Saved on this device and synced to your other devices.</p><div class="row"><button class="btn small ghost" data-setup>Redo the first time questions</button></div><p class="small muted">Dates last checked on StudentHome: ${D.fmtDate(D.LAST_CHECKED, { day: 'numeric', month: 'long', year: 'numeric' })}. Cut-off times are shown as 12:00: confirm them on each TMA page.</p></div>`;
  $('#more').innerHTML = h;
  pushUI(standalone, ios);
}

// ---------- Push notifications ----------
const b64 = (s) => Uint8Array.from(atob((s + '='.repeat((4 - (s.length % 4)) % 4)).replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
async function pushUI(standalone, ios) {
  const el = $('#pushbox'); if (!el) return;
  if (ios && !standalone) { el.innerHTML = `<p class="note"><b>To get notifications on iPhone:</b><br>1. Open this page in Safari.<br>2. Tap Share, then "Add to Home Screen" (keep "Open as Web App" on).<br>3. Open OU Guidance from your home screen and come back here.</p>`; return; }
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) { el.innerHTML = `<p class="note">This browser can't receive push notifications. Use the calendar subscription below instead.</p>`; return; }
  const reg = await navigator.serviceWorker.ready, sub = await reg.pushManager.getSubscription();
  if (sub && Notification.permission === 'granted') {
    el.innerHTML = `<p class="pill good">Notifications are on for this device</p><div class="row"><button class="btn small ghost" data-push-test>Send a test</button></div>`;
    fetch(API + '?action=subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sub }) }).catch(() => {});
  } else if (Notification.permission === 'denied') {
    el.innerHTML = `<p class="note">Notifications are blocked. iPhone: Settings, Notifications, OU Guidance, Allow. Desktop: allow notifications for this site in the browser's site settings.</p>`;
  } else el.innerHTML = `<button class="btn" data-push-on>Turn on notifications</button>`;
}
async function pushOn() {
  if ((await Notification.requestPermission()) !== 'granted') return toast('Notifications were not allowed');
  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(VAPID) });
  await fetch(API + '?action=subscribe', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ sub }) });
  await fetch(API + '?action=test'); toast('Done. A test notification is on its way'); render();
}

// ---------- First open: catch up questions ----------
function setup() {
  const dlg = $('#dlg');
  dlg.innerHTML = `<form method="dialog" style="display:flex;flex-direction:column;gap:14px"><h2>Quick question</h2><p>Have you already studied any of TM112 weeks 1 to 4 from the printed books? Tick the ones you've done. Leave them all empty if none.</p>
    <div>${D.WEEKS.slice(0, 4).map((w) => `<label class="check"><input type="checkbox" name="w" value="w${w.n}" ${isDone('w' + w.n) ? 'checked' : ''}><span><b>Week ${w.n}</b> · ${esc(w.title)}</span></label>`).join('')}</div>
    <p class="small muted">I'll set your TMA 01 catch up plan from your answer.</p><button class="btn" value="ok">Save my answer</button></form>`;
  dlg.querySelector('form').addEventListener('submit', () => {
    const picked = [...dlg.querySelectorAll('input[name=w]')].map((x) => [x.value, x.checked]);
    for (const [id, on] of picked) if (on !== isDone(id)) setDone(id, on);
    S.meta.setup = Date.now(); save(); sync();
    const n = picked.filter((x) => x[1]).length;
    toast(n ? `Got it: ${n} week${n > 1 ? 's' : ''} marked done. Your plan skips them.` : 'Got it: your catch up plan covers all of weeks 1 to 4.');
    render();
  }, { once: true });
  dlg.showModal();
}

// ---------- Wiring ----------
let tab = (location.hash || '#today').slice(1);
function render() {
  document.documentElement.dataset.theme = S.prefs.theme === 'auto' ? '' : S.prefs.theme;
  if (!document.documentElement.dataset.theme) delete document.documentElement.dataset.theme;
  if (!CATS || !['today', 'plan', 'calendar', 'degree', 'more'].includes(tab)) tab = 'today';
  document.querySelectorAll('.screen').forEach((s) => s.classList.toggle('on', s.id === tab));
  document.querySelectorAll('nav.tabs button').forEach((b) => b.setAttribute('aria-current', b.dataset.tab === tab ? 'page' : 'false'));
  ({ today: renderToday, plan: renderPlan, calendar: renderCalendar, degree: renderDegree, more: renderMore })[tab]();
}
function go(t) { tab = t; history.replaceState(null, '', '#' + t); render(); scrollTo(0, 0); }
let toastT;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), 2600); }

document.addEventListener('click', async (e) => {
  const b = e.target.closest('button, a'); if (!b) return;
  if (b.dataset.tab) return go(b.dataset.tab);
  if (b.dataset.goto) return go(b.dataset.goto);
  if (b.dataset.plan) { S.prefs.plan = b.dataset.plan; save(); return render(); }
  if (b.dataset.filter) { const f = S.prefs.filters, k = b.dataset.filter; S.prefs.filters = f.includes(k) ? f.filter((x) => x !== k) : [...f, k]; save(); return render(); }
  if (b.hasAttribute('data-past')) { S.prefs.showPast = !S.prefs.showPast; save(); return render(); }
  if (b.dataset.theme) { S.prefs.theme = b.dataset.theme; save(); return render(); }
  if (b.id === 'speak') return speak();
  if (b.id === 'stop') { speechSynthesis.cancel(); b.hidden = true; return; }
  if (b.hasAttribute('data-push-on')) return pushOn().catch((err) => toast('Could not turn on: ' + err.message));
  if (b.hasAttribute('data-push-test')) { const r = await fetch(API + '?action=test').then((x) => x.json()).catch(() => ({})); return toast(r.sent ? 'Test sent' : 'Could not send a test'); }
  if (b.dataset.copy) { try { await navigator.clipboard.writeText(b.dataset.copy); toast('Link copied'); } catch { prompt('Copy this link', b.dataset.copy); } return; }
  if (b.hasAttribute('data-setup')) return setup();
});
document.addEventListener('change', (e) => {
  const x = e.target;
  if (x.dataset.tick) { setDone(x.dataset.tick, x.checked); toast(x.checked ? 'Done ✓' : 'Unticked'); return render(); }
  if (x.dataset.type) {
    const types = new Set(S.prefs.types || Object.keys(D.REMINDER_TYPES)); x.checked ? types.add(x.dataset.type) : types.delete(x.dataset.type);
    S.prefs.types = [...types]; save();
    fetch(API + '?action=prefs', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ types: S.prefs.types }) }).catch(() => {});
    return render();
  }
});

if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(() => {});
render();
// Pull ticks from your other devices, then ask the first time question if never answered.
(async () => {
  try { const srv = await fetch(API + '?action=progress').then((r) => r.json()); const merged = { ...srv.done }; for (const [k, v] of Object.entries(S.done)) if (!srv.removed?.[k] || srv.removed[k] < v) merged[k] = Math.max(v, merged[k] || 0); for (const [k, v] of Object.entries(srv.removed || {})) if (merged[k] && merged[k] < v) delete merged[k]; S.done = merged; S.removed = { ...srv.removed, ...S.removed }; S.meta = { ...srv.meta, ...S.meta }; save(); render(); sync(); } catch {}
  try { const p = await fetch(API + '?action=prefs').then((r) => r.json()); if (p.types && !S.prefs.types) { S.prefs.types = p.types; save(); } } catch {}
  if (!S.meta.setup && !NOW_OVERRIDE) setup();
})();
setInterval(() => { if (tab === 'today' && !document.hidden && !(window.speechSynthesis && speechSynthesis.speaking)) render(); }, 60000);
document.addEventListener('visibilitychange', () => { if (!document.hidden) render(); });
