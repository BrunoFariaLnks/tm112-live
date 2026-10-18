// TM112 booked tutorials. Times are UK local time.
export const SESSIONS = [
  {
    id: 's1', date: '2026-10-20', start: '18:30', end: '20:00', tutor: 'Oliver Cosgrove', recorded: true,
    title: 'Block 1 IT and TMA 01 prep', block: 'Block 1',
    summary: 'A guided walk through the Block 1 information technology topics, aimed squarely at getting you ready for the quizzes and TMA 01.',
    steps: ['Tutor introduces key parts of the Block 1 material', 'Core Computing and IT ideas explained simply', 'Practice: break a small problem down and solve it with IT tools', 'Tips on what TMA 01 is really asking for', 'Short Q&A at the end']
  },
  {
    id: 's2', date: '2026-10-21', start: '11:00', end: '12:30', tutor: 'Angus Walker (your tutor)', recorded: false,
    title: 'General Introduction to TM112', block: 'Getting started',
    summary: 'Your own tutor shows you how TM112 is put together, how to study it and exactly what assessments you need to complete.',
    steps: ['Tour of the key resources: Software Get Going Guide and Python quick reference', 'How the module and its blocks are structured', 'What each assessment is and when it is due', 'Overview of how programming is taught in TM112', 'Questions for your tutor']
  },
  {
    id: 's3', date: '2026-10-21', start: '18:30', end: '20:00', tutor: 'Oliver Cosgrove', recorded: true,
    title: 'Intro to algorithmic thinking and programming', block: 'Getting started',
    summary: 'A gentle start to the problem solving and Python side of TM112, plus how the programming parts are assessed.',
    steps: ['What algorithmic thinking means, in plain terms', 'Walk through the Python quick reference guide', 'How the programming parts of the module fit together', 'How programming is marked in the TMAs', 'Q&A']
  },
  {
    id: 's4', date: '2026-11-02', start: '18:30', end: '20:00', tutor: 'Oliver Cosgrove', recorded: true,
    title: 'Block 1 programming and TMA 01 prep', block: 'Block 1',
    summary: 'Hands on help with the Block 1 programming, three days before TMA 01 is due.',
    steps: ['Recap of the Block 1 programming ideas', 'Analyse a simple problem together', 'Build a solution step by step in Python', 'Link it to the TMA 01 learning outcomes', 'Q&A before the 5 November deadline']
  },
  {
    id: 's5', date: '2026-12-07', start: '18:30', end: '20:00', tutor: 'Oliver Cosgrove', recorded: true,
    title: 'TM112 Maths', block: 'Maths',
    summary: 'A friendly maths help session covering the numeracy in TM112. Bring a list of topics you want covered.',
    steps: ['General approaches to solving maths problems', 'Binary, denary and hexadecimal numbers', 'Percentages, exponents and scientific notation', 'A little algebra', 'Your own questions (send your list to the tutor)']
  },
  {
    id: 's6', date: '2026-12-14', start: '18:30', end: '20:00', tutor: 'Oliver Cosgrove', recorded: true,
    title: 'Block 2 programming and TMA 02 prep', block: 'Block 2',
    summary: 'Algorithmic thinking and Python from Block 2, focused on getting you ready for TMA 02.',
    steps: ['Recap of the Block 2 programming ideas', 'Worked problem: from algorithm to code', 'Testing your program and fixing bugs', 'What TMA 02 expects for programming', 'Q&A']
  },
  {
    id: 's7', date: '2027-01-07', start: '11:00', end: '12:00', tutor: 'Angus Walker (your tutor)', recorded: false,
    title: 'Block 1 drop in', block: 'Drop in',
    summary: 'An informal session with your own tutor. No lesson, just your questions about Block 1.',
    steps: ['Join whenever you are ready', 'Ask anything about Block 1 material', 'Ask about programming or the assessment', 'Leave whenever you are done']
  },
  {
    id: 's8', date: '2027-01-07', start: '19:00', end: '20:30', tutor: 'Peter Langford', recorded: true,
    title: 'Block 2 IT and TMA 02 prep', block: 'Block 2',
    summary: 'The key ideas and skills from Block 2, essential IT and technologies in the wild, to help you complete TMA 02.',
    steps: ['Tour of the important Block 2 concepts', 'Essential information technologies explained', 'Technologies in the wild: real world examples', 'How it all links to TMA 02', 'Q&A']
  },
  {
    id: 's9', date: '2027-01-13', start: '11:00', end: '12:00', tutor: 'Angus Walker (your tutor)', recorded: false,
    title: 'Block 2 drop in', block: 'Drop in',
    summary: 'Informal questions session with your own tutor, the day before TMA 02 is due.',
    steps: ['Join whenever you are ready', 'Ask anything about Block 2 or TMA 02', 'Programming help if you are stuck', 'Final checks before the 14 January deadline']
  },
  {
    id: 's10', date: '2027-02-08', start: '18:30', end: '20:00', tutor: 'Oliver Cosgrove', recorded: true,
    title: 'Block 3 IT and TMA 03 prep', block: 'Block 3',
    summary: 'Help understanding the Block 3 essential IT and IT in the wild material, and getting ready for TMA 03.',
    steps: ['Key Computing and IT concepts from Block 3', 'Ethical issues in technology', 'Analysing problems and finding solutions', 'Using numerical and analytical tools', 'How to present ideas well in TMA 03']
  },
  {
    id: 's11', date: '2027-02-09', start: '19:00', end: '20:30', tutor: 'Peter Langford', recorded: true,
    title: 'Block 3 programming and TMA 03 prep', block: 'Block 3',
    summary: 'The Block 3 programming material, with a focus on solving problems, testing and debugging for TMA 03.',
    steps: ['Recap of the Block 3 programming ideas', 'Analyse a problem and plan a solution', 'Write the code together', 'Test and debug the program', 'Q&A']
  },
  {
    id: 's12', date: '2027-02-23', start: '19:00', end: '20:30', tutor: 'Cory Doctorow', recorded: null,
    title: 'Expert lecture', block: 'Special',
    summary: 'A guest expert talks about a TM112 topic in depth, then takes questions.',
    steps: ['Introduction of the guest expert', 'Lecture on a TM112 topic', 'Live Q&A with the expert']
  },
  {
    id: 's13', date: '2027-03-09', start: '14:00', end: '15:00', tutor: 'Angus Walker (your tutor)', recorded: false,
    title: 'Block 3 drop in', block: 'Drop in',
    summary: 'Informal questions session with your own tutor, two days before TMA 03 is due. Ends at 15:00, right on school run time.',
    steps: ['Join whenever you are ready', 'Ask anything about Block 3 or TMA 03', 'Final checks before the 11 March deadline', 'Leave by 15:00 for the school run']
  }
];

// UK offset: BST (+01:00) until 25 Oct 2026, then GMT until 28 Mar 2027.
export function ukISO(date, time) {
  const off = date < '2026-10-25' ? '+01:00' : '+00:00';
  return `${date}T${time}:00${off}`;
}

function addDays(date, n) {
  const d = new Date(date + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function minus30(time) {
  let [h, m] = time.split(':').map(Number);
  m -= 30; if (m < 0) { m += 60; h -= 1; }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const list = (s) => s.map((x) => `${x.start} ${x.title}`).join(' · ');

// Every reminder: { at: ISO, title, body, url }
export function buildReminders() {
  const byDay = {};
  for (const s of SESSIONS) (byDay[s.date] ||= []).push(s);
  const out = [];
  for (const [date, ss] of Object.entries(byDay)) {
    ss.sort((a, b) => a.start.localeCompare(b.start));
    const n = ss.length === 1 ? '1 live session' : `${ss.length} live sessions`;
    out.push({ at: ukISO(addDays(date, -1), '16:30'), title: `Tomorrow: ${n}`, body: list(ss), url: `./#${ss[0].id}` });
    out.push({ at: ukISO(date, '09:00'), title: `Today: ${n}`, body: list(ss), url: `./#${ss[0].id}` });
    ss.forEach((s, i) => {
      out.push({ at: ukISO(date, minus30(s.start)), title: `Starts in 30 min: ${s.start} to ${s.end}`, body: s.title, url: `./#${s.id}` });
      const next = ss[i + 1];
      if (next) out.push({ at: ukISO(date, s.end), title: `Another session today at ${next.start}`, body: `${next.title} · ${next.start} to ${next.end}`, url: `./#${next.id}` });
    });
  }
  return out.sort((a, b) => a.at.localeCompare(b.at));
}
