// =====================================================================
// OU GUIDANCE: ALL DATA LIVES HERE. Update dates in this file only.
// Times are UK local time (Europe/London). Shared by the app and the
// reminder engine (Supabase edge function), so both always agree.
// Last checked against StudentHome and the TM112 website: 27 Oct 2026.
// =====================================================================

export const LAST_CHECKED = '2026-10-27';

export const PROFILE = {
  name: 'Bruno Faria',
  first: 'Bruno',
  pi: 'S2194998',
  qualification: 'BSc (Honours) Cyber Security (R60)',
  creditsNeeded: 360,
  completionDeadline: '2042-01-31',
  // School runs: never schedule anything that needs action in these windows.
  busy: [{ from: '00:00', to: '10:30', label: 'morning school run' }, { from: '15:00', to: '16:00', label: 'afternoon school run' }],
};

export const LINKS = {
  module: 'https://learn2.open.ac.uk/course/view.php?name=TM112-26J',
  assessment: 'https://learn2.open.ac.uk/course/view.php?id=248517&area=assessment',
  record: 'https://msds.open.ac.uk/students/module.aspx?c=TM112_2026J&cr=1',
  tutorials: 'https://msds.open.ac.uk/students/tutorials/index.aspx',
  recordings: 'https://learn2.open.ac.uk/mod/connecthosted/viewrecordings.php?id=2730040&group=482621',
  chooser: 'https://msds.open.ac.uk/module-chooser/index.aspx?q=R60&o=1',
  studentHome: 'https://msds.open.ac.uk/students/index.aspx',
  helpCentre: 'https://help.open.ac.uk/',
  fees: 'https://help.open.ac.uk/topic/fees-and-funding',
  tutorEmail: 'mailto:angus.walker@open.ac.uk',
};

export const RESULTS = [
  { code: 'MU123', title: 'Discovering mathematics', credits: 30, result: 'Distinction', score: 91 },
  { code: 'TM129', title: 'Technologies in practice', credits: 30, result: 'Distinction', score: 90 },
  { code: 'TM111', title: 'Introduction to computing and IT 1', credits: 30, result: 'Distinction', score: 96 },
];

export const MODULE = {
  code: 'TM112', pres: '26J', credits: 30, title: 'Introduction to computing and information technology 2',
  start: '2026-10-03', tutor: 'Angus Walker', tutorEmail: 'angus.walker@open.ac.uk',
  deferral: '2027-03-10', result: '2027-04-27',
};

// TM112 weekly study planner (from the module website).
export const WEEKS = [
  { n: 1, start: '2026-10-03', end: '2026-10-09', block: 1, title: 'Getting started and binary data representation and computation', note: 'Start TMA 01 Question 1.' },
  { n: 2, start: '2026-10-10', end: '2026-10-16', block: 1, title: 'Introduction to problem solving in Python' },
  { n: 3, start: '2026-10-17', end: '2026-10-23', block: 1, title: 'Hardware and software concepts' },
  { n: 4, start: '2026-10-24', end: '2026-10-30', block: 1, title: 'Patterns, algorithms and programs 1', note: 'Start TMA 01 Question 4. Question 5 needs evidence of all Block 1 quiz questions.' },
  { n: 5, start: '2026-10-31', end: '2026-11-06', block: 1, title: 'Assessment week (TMA 01)', assess: 'tma01' },
  { n: 6, start: '2026-11-07', end: '2026-11-13', block: 2, title: 'Cloud computing', note: 'Block 2 starts.' },
  { n: 7, start: '2026-11-14', end: '2026-11-20', block: 2, title: 'Patterns, algorithms and programs 2' },
  { n: 8, start: '2026-11-21', end: '2026-11-27', block: 2, title: 'Mobile phones and how we use them' },
  { n: 9, start: '2026-11-28', end: '2026-12-04', block: 2, title: 'Organising your Python code and data' },
  { n: 10, start: '2026-12-05', end: '2026-12-11', block: 2, title: 'Diving into data' },
  { n: 11, start: '2026-12-12', end: '2026-12-18', block: 2, title: 'Location based computing' },
  { n: 12, start: '2027-01-02', end: '2027-01-08', block: 2, title: 'Dangerous data' },
  { n: 13, start: '2027-01-09', end: '2027-01-15', block: 2, title: 'Assessment week (TMA 02)', assess: 'tma02' },
  { n: 14, start: '2027-01-16', end: '2027-01-22', block: 3, title: 'Data on your computer: a private investigation', note: 'Block 3 starts.' },
  { n: 15, start: '2027-01-23', end: '2027-01-29', block: 3, title: 'My Python project' },
  { n: 16, start: '2027-01-30', end: '2027-02-05', block: 3, title: 'Cryptography: the secret of keeping secret' },
  { n: 17, start: '2027-02-06', end: '2027-02-12', block: 3, title: 'Generative AI in a nutshell and time to work on TMA 03' },
  { n: 18, start: '2027-02-13', end: '2027-02-19', block: 3, title: 'Going dark' },
  { n: 19, start: '2027-02-20', end: '2027-02-26', block: 3, title: 'IT and the law' },
  { n: 20, start: '2027-02-27', end: '2027-03-05', block: 3, title: 'Free speech and the internet' },
  { n: 21, start: '2027-03-06', end: '2027-03-12', block: 3, title: 'Assessment week (TMA 03)', assess: 'tma03' },
];

export const TMAS = [
  { id: 'tma00', name: 'TMA 00', practice: true, target: '2026-10-28', title: 'Practice submission (not marked)', note: 'Do it before TMA 01 so you know the submit system works.' },
  { id: 'tma01', name: 'TMA 01', cutoff: '2026-11-05', cutoffTime: '12:00', target: '2026-11-03', block: 1, title: 'Block 1' },
  { id: 'tma02', name: 'TMA 02', cutoff: '2027-01-14', cutoffTime: '12:00', target: '2027-01-10', block: 2, title: 'Block 2' },
  { id: 'tma03', name: 'TMA 03', cutoff: '2027-03-11', cutoffTime: '12:00', target: '2027-03-08', block: 3, title: 'Block 3, final assignment', final: true },
];

// Day by day and week by week plans. Each item can be ticked.
export const PLANS = [
  {
    id: 'p1', tma: 'tma01', title: 'TMA 01 catch up plan', kind: 'days',
    note: 'The OU planner only links Questions 1, 4 and 5 to weeks. Questions 2 and 3 are matched to Parts 2 and 3 as a best guess: check them against the question paper.',
    items: [
      { id: 'c1', date: '2026-10-27', tasks: ['Read the Module Guide and the Assessment Guide', 'Read the "Use of GenAI for TM112" page on the Assessment tab', 'Read all TMA 01 questions', 'Do TMA 00 (practice submission)'] },
      { id: 'c2', date: '2026-10-28', tasks: ['Study Block 1 Part 1 and its quiz', 'Answer Question 1'] },
      { id: 'c3', date: '2026-10-29', tasks: ['Study Block 1 Part 2 and its quiz', 'Start Question 2'] },
      { id: 'c4', date: '2026-10-30', tasks: ['Finish Question 2', 'Study Block 1 Part 3 and its quiz'] },
      { id: 'c5', date: '2026-10-31', tasks: ['Answer Question 3', 'Study Block 1 Part 4'] },
      { id: 'c6', date: '2026-11-01', tasks: ['Answer Question 4 (the incorrect code file is on the Assessment tab)', 'Do the Block 1 Quiz and collect evidence for Question 5'] },
      { id: 'c7', date: '2026-11-02', tasks: ['Check word limits, references (MyBib), UK English and the AI declaration', 'Run the draft through the Turnitin draft checker on the Assessment tab', 'Live tutorial 18:30: Block 1 programming and TMA 01 prep'] },
      { id: 'c8', date: '2026-11-03', tasks: ['Submit TMA 01 (your target)'] },
    ],
  },
  {
    id: 'p2', tma: 'tma02', title: 'TMA 02 plan', kind: 'weeks',
    note: 'Answer each TMA 02 question as soon as you have studied the matching part. Check the question paper for which part each question uses.',
    items: [
      { id: 'q2w6', week: 6, tasks: ['Study Cloud computing', 'Read all TMA 02 questions and note which part each one needs'] },
      { id: 'q2w7', week: 7, tasks: ['Study Patterns, algorithms and programs 2', 'Answer any TMA 02 question that uses this part'] },
      { id: 'q2w8', week: 8, tasks: ['Study Mobile phones and how we use them', 'Answer the matching TMA 02 question'] },
      { id: 'q2w9', week: 9, tasks: ['Study Organising your Python code and data', 'Work on the TMA 02 Python question (files on the Assessment tab, Q5)'] },
      { id: 'q2w10', week: 10, tasks: ['Study Diving into data', 'Answer the matching TMA 02 question', 'Maths tutorial Mon 7 Dec 18:30'] },
      { id: 'q2w11', week: 11, tasks: ['Study Location based computing', 'Answer the matching TMA 02 question', 'Tutorial Mon 14 Dec 18:30', 'Finish weeks 6 to 11 so the Christmas break is fully off'] },
      { id: 'q2w12', week: 12, tasks: ['Study Dangerous data', 'Answer the last TMA 02 questions', 'Tutorials Thu 7 Jan 11:00 and 19:00'] },
      { id: 'q2d1', date: '2027-01-09', tasks: ['Check word limits, references, UK English and the AI declaration', 'Run the Turnitin draft checker'] },
      { id: 'q2d2', date: '2027-01-10', tasks: ['Submit TMA 02 (your target)'] },
    ],
  },
  {
    id: 'p3', tma: 'tma03', title: 'TMA 03 plan', kind: 'weeks',
    note: 'TMA 03 can use all three blocks and cannot be late: no extensions. Answer each question as soon as you have studied the matching part.',
    items: [
      { id: 'q3w14', week: 14, tasks: ['Study Data on your computer', 'Read all TMA 03 questions and note which part each one needs'] },
      { id: 'q3w15', week: 15, tasks: ['Study My Python project', 'Start the TMA 03 Python question'] },
      { id: 'q3w16', week: 16, tasks: ['Study Cryptography', 'Answer the matching TMA 03 question'] },
      { id: 'q3w17', week: 17, tasks: ['Study Generative AI in a nutshell', 'Use the TMA 03 time this week', 'Tutorials Mon 8 Feb 18:30 and Tue 9 Feb 19:00'] },
      { id: 'q3w18', week: 18, tasks: ['Study Going dark', 'Answer the matching TMA 03 question'] },
      { id: 'q3w19', week: 19, tasks: ['Study IT and the law', 'Answer the matching TMA 03 question', 'Expert lecture Tue 23 Feb 19:00'] },
      { id: 'q3w20', week: 20, tasks: ['Study Free speech and the internet', 'Answer the last TMA 03 questions'] },
      { id: 'q3d1', date: '2027-03-06', tasks: ['Check word limits, references, UK English and the AI declaration', 'Run the Turnitin draft checker'] },
      { id: 'q3d2', date: '2027-03-07', tasks: ['Final read through. Fix anything left.'] },
      { id: 'q3d3', date: '2027-03-08', tasks: ['Submit TMA 03 (your target). TM112 is then done.'] },
    ],
  },
];

export const TUTORIALS = [
  { id: 't1', date: '2026-11-02', start: '18:30', end: '20:00', title: 'Block 1 programming and preparation for TMA 01', recorded: true },
  { id: 't2', date: '2026-12-07', start: '18:30', end: '20:00', title: 'TM112 Maths', recorded: true },
  { id: 't3', date: '2026-12-14', start: '18:30', end: '20:00', title: 'Block 2 algorithmic thinking and programming, preparation for TMA 02', recorded: true },
  { id: 't4', date: '2027-01-07', start: '11:00', end: '12:00', title: 'Block 1 drop in session', recorded: false },
  { id: 't5', date: '2027-01-07', start: '19:00', end: '20:30', title: 'Block 2 essential information technologies, technologies in the wild, preparation for TMA 02', recorded: true },
  { id: 't6', date: '2027-01-13', start: '11:00', end: '12:00', title: 'Block 2 drop in session', recorded: false, note: 'Optional: you will already have submitted TMA 02.' },
  { id: 't7', date: '2027-02-08', start: '18:30', end: '20:00', title: 'Block 3 essential IT and IT in the wild, preparation for TMA 03', recorded: true },
  { id: 't8', date: '2027-02-09', start: '19:00', end: '20:30', title: 'Block 3 algorithmic thinking and programming, preparation for TMA 03', recorded: true },
  { id: 't9', date: '2027-02-23', start: '19:00', end: '20:30', title: 'Expert lecture tutorial', recorded: null },
  { id: 't10', date: '2027-03-09', start: '14:00', end: '15:00', title: 'Block 3 drop in session', recorded: false },
];
export const ATTENDED = [
  { date: '2026-10-20', title: 'Block 1 topics and TMA 01 preparation' },
  { date: '2026-10-21', title: 'General introduction, and introduction to algorithmic thinking' },
];

// Time off. needs = ids that must be ticked for the break to be real time off.
export const BREAKS = [
  { id: 'b1', start: '2026-11-04', end: '2026-11-06', title: 'After TMA 01', why: 'Submitted on the 3rd, Block 2 starts on the 7th.', needs: ['tma01'] },
  { id: 'b2', start: '2026-12-19', end: '2027-01-01', title: 'Christmas break', why: 'No OU study weeks. Fully off if weeks 6 to 11 are done.', needs: ['w6', 'w7', 'w8', 'w9', 'w10', 'w11'] },
  { id: 'b3', start: '2027-01-11', end: '2027-01-15', title: 'After TMA 02', why: 'Submitted on the 10th, Block 3 starts on the 16th. The 13 Jan drop in is optional.', needs: ['tma02'] },
  { id: 'b4', start: '2027-09-16', end: '2027-10-01', title: 'Between modules', why: 'After TM256 and TM252, before TM255 and TM257.', estimate: true, needs: [] },
  { id: 'b5', start: '2028-09-16', end: '2028-10-06', title: 'Between modules', why: 'After TM311 and TM359, before your Stage 3 option.', estimate: true, needs: [] },
];

// Registration windows. closes = OU enrolment close. target = your own date.
export const REGISTRATIONS = [
  { id: 'r1', modules: 'TM256 + TM252', start: '2027-02-06', closes: '2027-01-07', target: '2026-12-15', fee: '£2,044 each', status: 'open' },
  { id: 'r2', modules: 'TM255 + TM257', start: '2027-10', status: 'not open', note: 'October 2027 is the LAST ever start for TM255, so you must take it then.' },
  { id: 'r3', modules: 'TM311 + TM359', start: '2028-02', status: 'not open' },
  { id: 'r4', modules: 'TM352 or TM355', start: '2028-10', status: 'not open' },
  { id: 'r5', modules: 'TM470', start: '2029', status: 'not open', note: 'Must be your final module.' },
];
// Dates to recheck the module chooser for newly opened start dates.
export const RECHECKS = ['2027-01-04', '2027-03-01', '2027-05-04', '2027-07-01', '2027-09-01', '2027-11-01', '2028-01-04', '2028-03-01', '2028-05-02', '2028-07-03', '2028-09-01', '2028-11-01'];

export const MODULES = [
  { code: 'TM256', title: 'Cyber security', stage: 2, credits: 30, compulsory: true, next: '6 Feb 2027 (ends Sep 2027)', closes: '7 Jan 2027', fee: '£2,044', last: 'Feb 2030' },
  { code: 'TM252', title: 'Web technologies', stage: 2, credits: 30, compulsory: true, next: '6 Feb 2027 (ends Sep 2027)', closes: '7 Jan 2027', fee: '£2,044', last: 'Feb 2029' },
  { code: 'TM255', title: 'Communication and information technologies', stage: 2, credits: 30, compulsory: true, next: 'No date open yet', last: 'Oct 2027 (last ever start)' },
  { code: 'TM257', title: 'Cisco networking (CCNA) part 1', stage: 2, credits: 30, compulsory: true, next: 'No date open yet', last: 'Oct 2028' },
  { code: 'TM311', title: 'Information security', stage: 3, credits: 30, compulsory: true },
  { code: 'TM359', title: 'Systems penetration testing', stage: 3, credits: 30, compulsory: true, next: 'Feb 2027' },
  { code: 'TM352 / TM355', title: 'Web, mobile and cloud technologies, or Communications technology', stage: 3, credits: 30, option: true },
  { code: 'TM470', title: 'The computing and IT project', stage: 3, credits: 30, compulsory: true, next: 'Jan 2027', note: 'Must be your final module.' },
];

// Your fast route. Everything after TM112 is planned, not registered.
export const ROADMAP = [
  { when: '2024 to 2026', what: 'MU123, TM129, TM111', note: 'Stage 1, 90 credits. All Distinctions.', status: 'done', credits: 90 },
  { when: 'Oct 2026 to Mar 2027', what: 'TM112', note: 'Final Stage 1 module. Result 27 April 2027.', status: 'now', credits: 30 },
  { when: 'Feb 2027', what: 'TM256 + TM252', note: 'Register by 15 Dec 2026 (OU closes 7 Jan 2027).', status: 'plan', credits: 60, warn: 'Feb to Mar 2027: 90 credits at once (TM112 plus two new modules).' },
  { when: 'Oct 2027', what: 'TM255 + TM257', note: 'Last ever TM255 start.', status: 'plan', credits: 60 },
  { when: 'Feb 2028', what: 'TM311 + TM359', note: 'Stage 3 begins.', status: 'plan', credits: 60, warn: 'Feb to about Jun 2028: 120 credits at once if TM255 and TM257 are still running.' },
  { when: 'Oct 2028', what: 'TM352 or TM355', note: 'Your Stage 3 option.', status: 'plan', credits: 30, warn: 'TM470 must be your final module: check whether this can overlap with it.' },
  { when: 'Early 2029', what: 'TM470 project', note: 'Final module.', status: 'plan', credits: 30 },
  { when: 'About Sep 2029', what: 'Degree finished (estimate)', note: 'A graduation ceremony may follow in 2030 (not confirmed).', status: 'goal' },
];
export const DEGREE_FINISH = '2029-09-30';
export const ROADMAP_NOTE = 'The OU has not published 2028 or 2029 start dates for TM311, TM352, TM355 or TM470 yet, so the 2029 finish is an estimate. Recheck the module chooser every few months.';

export const ONE_OFFS = [
  { id: 'genai', date: '2026-10-28', type: 'study', title: 'Read "Use of GenAI for TM112"', body: 'On the Assessment tab. Declare any AI use the way it says.', url: LINKS.assessment },
  { id: 'defer', date: '2027-03-10', type: 'tma', title: 'Last day to defer TM112', body: 'Only if something goes badly wrong. Assessment banking is available.', url: LINKS.record },
  { id: 'result', date: '2027-04-27', type: 'tma', title: 'TM112 result released', body: 'Check StudentHome, Module result.', url: LINKS.record },
];

// =====================================================================
// TIME HELPERS (Europe/London, including clock changes)
// =====================================================================
const HOUR = 3600000, DAY = 86400000;
function lastSunday(y, m) { const d = new Date(Date.UTC(y, m + 1, 0)); return d.getUTCDate() - d.getUTCDay(); }
// True when UK clocks are on BST (UTC+1) at this instant.
export function isBST(ms) {
  const y = new Date(ms).getUTCFullYear();
  const s = Date.UTC(y, 2, lastSunday(y, 2), 1), e = Date.UTC(y, 9, lastSunday(y, 9), 1);
  return ms >= s && ms < e;
}
// UK wall clock date + time -> instant (ms).
export function uk(date, time = '00:00') {
  const [y, mo, d] = date.split('-').map(Number), [h, mi] = time.split(':').map(Number);
  const local = Date.UTC(y, mo - 1, d, h, mi);
  return isBST(local - HOUR) ? local - HOUR : local;
}
// Instant -> UK wall clock parts.
export function ukParts(ms) {
  const t = new Date(ms + (isBST(ms) ? HOUR : 0));
  const p = (n) => String(n).padStart(2, '0');
  return { date: `${t.getUTCFullYear()}-${p(t.getUTCMonth() + 1)}-${p(t.getUTCDate())}`, time: `${p(t.getUTCHours())}:${p(t.getUTCMinutes())}`, dow: t.getUTCDay(), mins: t.getUTCHours() * 60 + t.getUTCMinutes() };
}
export function addDays(date, n) { const d = new Date(date + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); }
export function daysBetween(a, b) { return Math.round((Date.parse(b + 'T12:00:00Z') - Date.parse(a + 'T12:00:00Z')) / DAY); }
const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

// Move a reminder out of the busy windows (before 10:30, 15:00 to 16:00).
export function quiet(ms) {
  const { date, mins } = ukParts(ms);
  if (mins < toMin('10:30')) return uk(date, '10:30');
  if (mins >= toMin('15:00') && mins < toMin('16:00')) return uk(date, '16:00');
  return ms;
}
// Does an event overlap a busy window? Returns the window label or null.
export function clash(date, start, end) {
  const s = toMin(start), e = toMin(end || start);
  for (const b of PROFILE.busy) {
    const bs = toMin(b.from), be = toMin(b.to);
    if (s < be && e > bs) return `Clashes with your ${b.label}`;
    if (e === bs) return `Ends right at your ${b.label} (${b.from})`;
  }
  return null;
}
export function fmtTime(t) { const [h, m] = t.split(':').map(Number); return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''}${h >= 12 ? 'pm' : 'am'}`; }
// Built by hand (not toLocaleDateString) so the phone, the desktop and the reminder server all print exactly the same text.
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function fmtDate(date, opts = { weekday: 'short', day: 'numeric', month: 'short' }) {
  const d = new Date(date + 'T12:00:00Z'), cut = (w, form) => (form === 'short' ? w.slice(0, 3) : w);
  const parts = [];
  if (opts.weekday) parts.push(cut(DAY_NAMES[d.getUTCDay()], opts.weekday));
  if (opts.day) parts.push(String(d.getUTCDate()));
  if (opts.month) parts.push(cut(MONTH_NAMES[d.getUTCMonth()], opts.month));
  if (opts.year) parts.push(String(d.getUTCFullYear()));
  return parts.join(' ');
}
// "today", "tomorrow", "in 5 days", "next week", "next month"...
export function relDays(n) {
  if (n === 0) return 'today'; if (n === 1) return 'tomorrow'; if (n === -1) return 'yesterday';
  if (n < 0) return `${-n} days ago`; if (n < 7) return `in ${n} days`; if (n < 14) return 'next week';
  if (n < 28) return `in ${Math.round(n / 7)} weeks`; if (n < 60) return 'next month'; return `in ${Math.round(n / 30.44)} months`;
}

// =====================================================================
// CALENDAR EVENTS. cat: deadline | tutorial | study | timeoff | registration
// =====================================================================
export function buildEvents() {
  const ev = [];
  for (const t of TMAS) {
    if (t.practice) { ev.push({ id: t.id, cat: 'deadline', date: t.target, title: `${t.name}: practice submission`, body: t.note, url: LINKS.record, tick: t.id }); continue; }
    ev.push({ id: t.id + '-target', cat: 'deadline', date: t.target, title: `Your target: submit ${t.name}`, body: `${t.title}. Push for this, not the OU cut-off.`, url: LINKS.record, tick: t.id, target: true });
    ev.push({ id: t.id, cat: 'deadline', date: t.cutoff, start: t.cutoffTime, title: `${t.name} OU cut-off`, body: `${t.title}. Shown as 12:00 UK time: confirm it on the TMA page.${t.final ? ' No extensions on TMA 03: late means fail.' : ''}`, url: LINKS.record, tick: t.id });
  }
  for (const o of ONE_OFFS) ev.push({ id: o.id, cat: o.type === 'tma' ? 'deadline' : 'study', date: o.date, title: o.title, body: o.body, url: o.url, tick: o.id });
  for (const t of TUTORIALS) ev.push({ id: t.id, cat: 'tutorial', date: t.date, start: t.start, end: t.end, title: t.title, body: [t.recorded === true ? 'Recorded' : t.recorded === false ? 'Not recorded: attend live' : 'Recording not stated', t.note].filter(Boolean).join('. '), url: LINKS.tutorials, tick: t.id, clash: clash(t.date, t.start, t.end) });
  for (const p of PLANS) for (const it of p.items) if (it.date) ev.push({ id: it.id, cat: 'study', date: it.date, title: `${p.title}: ${fmtDate(it.date, { weekday: 'long' })}`, body: it.tasks.join('. '), url: LINKS.assessment, tick: it.id });
  for (const w of WEEKS) ev.push({ id: 'w' + w.n, cat: 'study', date: w.start, endDate: w.end, title: `Week ${w.n}: ${w.title}`, body: w.note || '', url: LINKS.module, tick: w.assess ? null : 'w' + w.n });
  for (const b of BREAKS) ev.push({ id: b.id, cat: 'timeoff', date: b.start, endDate: b.end, title: `Time off: ${b.title}${b.estimate ? ' (estimate)' : ''}`, body: b.why });
  for (const r of REGISTRATIONS) if (r.closes) {
    ev.push({ id: r.id + '-target', cat: 'registration', date: r.target, title: `Your target: register for ${r.modules}`, body: `${r.fee}. Sort your funding first.`, url: LINKS.chooser, tick: r.id });
    ev.push({ id: r.id, cat: 'registration', date: r.closes, title: `Enrolment closes: ${r.modules}`, body: `Starts ${fmtDate(r.start, { day: 'numeric', month: 'long', year: 'numeric' })}.`, url: LINKS.chooser, tick: r.id });
  }
  for (const d of RECHECKS) ev.push({ id: 'rc' + d, cat: 'registration', date: d, title: 'Recheck the module chooser', body: 'Look for newly opened start dates (TM255, TM257, TM311, TM359, TM352, TM355, TM470) and update your plan.', url: LINKS.chooser });
  ev.push({ id: 'deg', cat: 'registration', date: DEGREE_FINISH, title: 'Degree finished (estimate)', body: '360 credits. BSc (Honours) Cyber Security.' });
  return ev.sort((a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || '')));
}

// =====================================================================
// REMINDERS (push + calendar alarms). Never before 10:30 or 15:00-16:00.
// type: tma | tutorial | target | break | registration | study
// =====================================================================
export const REMINDER_TYPES = {
  tma: 'TMA cut-offs (1 month, 1 week, 2 days, 1 day before)',
  target: 'Your own target dates (the morning of)',
  tutorial: 'Live tutorials (day before and 1 hour before)',
  study: 'Study plan (new week, catch up days)',
  break: 'Time off (5 days before and the start)',
  registration: 'Registration and funding',
};
export function buildReminders() {
  const out = [];
  const add = (ms, type, title, body, url, ev) => out.push({ at: quiet(ms), type, title, body, url, ev });
  for (const t of TMAS) {
    if (t.practice) { add(uk(t.target, '10:30'), 'target', 'Do TMA 00 today', t.note, LINKS.record, t.id); continue; }
    const steps = [[30, 'next month'], [7, 'next week'], [2, 'in 2 days'], [1, 'tomorrow']];
    for (const [d, label] of steps) add(uk(addDays(t.cutoff, -d), '10:30'), 'tma', `${t.name} due ${label}`, `OU cut-off ${fmtDate(t.cutoff)} at 12:00. Your target is ${fmtDate(t.target)}.`, LINKS.record, t.id);
    add(uk(t.target, '10:30'), 'target', `Submit ${t.name} today`, `Your own target. The OU cut-off is ${fmtDate(t.cutoff)} at 12:00.`, LINKS.record, t.id + '-target');
  }
  for (const t of TUTORIALS) {
    const s = uk(t.date, t.start);
    add(uk(addDays(t.date, -1), '18:00'), 'tutorial', `Tutorial tomorrow at ${fmtTime(t.start)}`, t.title, LINKS.tutorials, t.id);
    add(s - HOUR, 'tutorial', `Tutorial at ${fmtTime(t.start)}`, `${t.title}. Join from your tutorials page.`, LINKS.tutorials, t.id);
  }
  for (const w of WEEKS) add(uk(w.start, '10:30'), 'study', `Week ${w.n} starts`, w.title + (w.note ? '. ' + w.note : ''), LINKS.module, 'w' + w.n);
  for (const p of PLANS) for (const it of p.items) if (it.date) add(uk(it.date, '10:30'), 'study', `Today's plan`, it.tasks.join('. '), LINKS.module, it.id);
  for (const o of ONE_OFFS) add(uk(o.date, '10:30'), o.type === 'tma' ? 'tma' : 'study', o.title, o.body, o.url, o.id);
  for (const b of BREAKS) {
    const nice = b.title === 'Christmas break' ? 'Your Christmas break' : 'Your time off';
    add(uk(addDays(b.start, -5), '10:30'), 'break', `${nice} starts in 5 days`, `${fmtDate(b.start)} to ${fmtDate(b.end)}. ${b.why}`, '', b.id);
    add(uk(b.start, '10:30'), 'break', `${nice} starts today`, `Until ${fmtDate(b.end)}. If you're behind, use it to catch up.`, '', b.id);
  }
  for (const r of REGISTRATIONS) if (r.closes) {
    add(uk(addDays(r.target, -14), '10:30'), 'registration', 'Sort your module funding', `Before you register for ${r.modules} on ${fmtDate(r.target)}.`, LINKS.fees, r.id + '-target');
    add(uk(r.target, '10:30'), 'registration', `Register for ${r.modules} today`, `Your target. OU enrolment closes ${fmtDate(r.closes)}.`, LINKS.chooser, r.id + '-target');
    for (const [d, label] of [[30, 'next month'], [14, 'in 2 weeks'], [7, 'next week'], [1, 'tomorrow']]) add(uk(addDays(r.closes, -d), '10:30'), 'registration', `Enrolment for ${r.modules} closes ${label}`, `Closes ${fmtDate(r.closes)}. Register now if you haven't.`, LINKS.chooser, r.id);
  }
  for (const d of RECHECKS) add(uk(d, '10:30'), 'registration', 'Check the module chooser', 'New start dates may be open. Book them and update your plan.', LINKS.chooser, 'rc' + d);
  return out.sort((a, b) => a.at - b.at);
}

// =====================================================================
// CALENDAR FEED (.ics) with alarms at the same times as push reminders
// =====================================================================
const icsEsc = (s) => String(s ?? '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
const enc = (s) => new TextEncoder().encode(s).length;
const fold = (line) => { const out = []; let s = line; while (enc(s) > 73) { let n = 73; while (enc(s.slice(0, n)) > 73) n--; out.push(s.slice(0, n)); s = ' ' + s.slice(n); } out.push(s); return out.join('\r\n'); };
const zt = (ms) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const d8 = (d) => d.replace(/-/g, '');
export function buildICS(types = Object.keys(REMINDER_TYPES), now = Date.now()) {
  const byEv = {};
  for (const r of buildReminders()) if (types.includes(r.type)) (byEv[r.ev] ||= []).push(r);
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//OU Guidance//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:OU Guidance', 'X-WR-TIMEZONE:Europe/London', 'REFRESH-INTERVAL;VALUE=DURATION:PT12H', 'X-PUBLISHED-TTL:PT12H'];
  const stamp = zt(now);
  for (const e of buildEvents()) {
    L.push('BEGIN:VEVENT', `UID:${e.id}@ou-guidance`, `DTSTAMP:${stamp}`, `SUMMARY:${icsEsc(e.title)}`);
    if (e.start) L.push(`DTSTART:${zt(uk(e.date, e.start))}`, `DTEND:${zt(e.end ? uk(e.date, e.end) : uk(e.date, e.start) + 1800000)}`);
    else L.push(`DTSTART;VALUE=DATE:${d8(e.date)}`, `DTEND;VALUE=DATE:${d8(addDays(e.endDate || e.date, 1))}`, 'TRANSP:TRANSPARENT');
    if (e.body || e.url) L.push(`DESCRIPTION:${icsEsc([e.body, e.url].filter(Boolean).join('\n'))}`);
    if (e.url) L.push(`URL:${e.url}`);
    L.push(`CATEGORIES:${e.cat}`);
    for (const r of byEv[e.id] || []) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsEsc(r.title + '. ' + r.body)}`, `TRIGGER;VALUE=DATE-TIME:${zt(r.at)}`, 'END:VALARM');
    L.push('END:VEVENT');
  }
  L.push('END:VCALENDAR');
  return L.map(fold).join('\r\n') + '\r\n';
}
