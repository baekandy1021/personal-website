// ─────────────────────────────────────────────────────────────
//  Everything personal lives here. Edit this file first.
//  Content below comes from AndyBaekResume.pdf. Rewrite anything in your own voice.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Andy Baek',
  title: 'Andy Baek — data science & software',
  description:
    'Andy Baek is a Data Science student at Boston University building machine learning projects and full-stack research tools.',

  // Hero. The word in `highlight` gets the hand-drawn squiggle underline.
  headline: { before: 'I build models that learn to watch, play, and', highlight: 'decide', after: '.' },
  intro:
    'Data Science student at Boston University. Lately: computer vision on tennis footage, reinforcement learning agents, fair bandit algorithms, and a research platform that captures behavior down to the millisecond.',

  // Leave a value as '' to hide that link.
  email: 'baek.andy1021@gmail.com',
  github: 'https://github.com/baekandy1021',
  linkedin: 'https://www.linkedin.com/in/andy-baek',
  resume: '/resume.pdf',

  about: [
    "I'm studying Data Science at Boston University (class of 2028). I'm most interested in the space where machine learning meets messy reality: noisy video, sparse rewards, and guarantees that hold on paper but drift in practice.",
    "Right now I'm a software engineer on a three-person team building an experimental platform for a media psychology lab, and a course assistant for DS120, Foundations of Data Science. Away from the keyboard, I've been addicted to jiu-jitsu for the past two years. ",
  ],

  experience: [
    { when: '2026 — now', what: 'Software Engineer', where: 'BU Psychology Lab' },
    { when: '2026 — now', what: 'Course Assistant, DS120', where: 'Boston University' },
    { when: 'Summer 2024', what: 'Inventory Auditor', where: 'Hyundai Motor Manufacturing Alabama' },
    { when: '2024 — 2028', what: 'B.S. Data Science · Dean’s List', where: 'Boston University' },
  ],

  // The "Now" section. Keep it short and update it every month or two.
  now: {
    updated: 'November 2026',
    items: [
      { label: 'Building', text: 'A Reels-style tablet app and researcher dashboard for a short-form video study' },
      { label: 'Teaching', text: 'Office hours for DS120: proofs, linear algebra, probability' },
      { label: 'Playing', text: 'Guitar, probably more than I should' },
    ],
  },
};
