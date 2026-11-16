// profileData.js — sample data + pure helpers (no React).
// Swap INITIAL for your API response; keep the shapes and everything else keeps working.

export const SOURCES = {
  resume: { label: 'Resume.pdf' },
  cv: { label: 'CV.docx' },
  linkedin: { label: 'LinkedIn' },
  manual: { label: 'Added by you' },
};
export const DOCS = ['resume', 'cv', 'linkedin']; // uploaded documents (drives the Sources card)

export const INITIAL = {
  profile: {
    fullName: 'Johan Doe', title: 'Software Engineer', email: 'Johan.Doe@gmail.com', phone: '', phoneNA: false,
    location: 'Dubai, United Arab Emirates', linkedin: 'linkedin.com/in/Johan', employment: 'Full Time',
    tags: ['React', 'TypeScript'],
  },
  summary: {
    text: 'Software engineer with over five years of experience building analytics services and customer-facing dashboards. Skilled in React, Node.js and Python, with hands-on cloud experience on AWS and a focus on clean, maintainable code. Led the migration of a legacy reporting tool to',
    cut: true, sources: ['resume'], conf: 'Medium',
  },
  skills: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes'].map((name, i) => ({
    id: `s${i}`, name,
    ...(name === 'Kubernetes' && { low: true, snippet: '…deployed services on Kubernetes clusters…' }),
  })),
  experience: [
    { id: 'e1', title: 'Software Engineer', employer: 'ABC Technologies', start: '2022-01', end: '2024-03', location: 'Remote',
      description: 'Built and maintained internal analytics services and customer-facing dashboards.',
      skills: ['Python', 'React', 'SQL'], sources: ['linkedin'], conf: 'High', resolved: true },
    { id: 'e2', title: 'Junior Developer', employer: 'Nova Labs', start: '2020-06', end: '2021-12',
      description: 'Developed REST endpoints and automated test suites for a logistics product.',
      skills: ['JavaScript', 'Node.js'], sources: ['resume'], conf: 'Medium',
      conflict: [{ value: '2021-12', source: 'resume', conf: 'Medium' }, { value: '2022-01', source: 'linkedin', conf: 'High' }] },
    { id: 'e3', title: 'Frontend Intern', employer: 'Bright Studio', start: '2019-01', end: '2020-05',
      description: 'Built responsive UI components for client marketing sites.',
      skills: ['JavaScript', 'HTML', 'CSS'], sources: ['cv'], conf: 'High', resolved: true },
  ],
  education: [
    { id: 'd1', degree: 'B.Sc.', field: 'Computer Science', school: 'Sample University', start: '2017', end: '2021', sources: ['resume'], conf: 'High' },
  ],
  projects: [
    { id: 'p1', name: 'TaskFlow Dashboard', org: 'Personal project', start: '2025-05', end: '2025-08',
      link: 'https://github.com/johandoe/taskflow', description: 'Lightweight dashboard for tracking team tasks and milestones.',
      skills: ['React', 'TypeScript'], sources: ['resume'], conf: 'High' },
    { id: 'p2', name: 'Portfolio Website', org: '', start: '2025-09', end: '', current: true, link: 'johan-doe.dev',
      description: 'Personal portfolio and project showcase.', skills: ['React'], sources: ['cv'], conf: 'Medium' },
  ],
  certifications: [
    { id: 'c1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025-06', link: '', sources: ['resume'], conf: 'High', dup: 'c2' },
    { id: 'c2', name: 'AWS Cloud Practitioner', issuer: 'AWS', date: '2025-06', link: '', sources: ['linkedin'], conf: 'High', dup: 'c1' },
    { id: 'c3', name: 'Google Data Analytics Professional', issuer: 'Google', date: '2025-03', link: '', sources: ['linkedin'], conf: 'High' },
  ],
};

/* ───────── formatting ───────── */
export const fmtMonth = (v) =>
  v ? new Date(`${v}-01T00:00:00`).toLocaleString('en-US', { month: 'long', year: 'numeric' }) : '';
export const range = (from, to, current) => [fmtMonth(from), current ? 'Present' : fmtMonth(to)].filter(Boolean).join(' – ');

const WELL_FORMED = /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]{2,}$/i;
export const isBadLink = (u) => !!u && !WELL_FORMED.test(u);

/* ───────── total experience: merges overlapping roles, counts months inclusively ───────── */
export function totalExperience(roles) {
  const idx = (m) => { const [y, mo] = m.split('-').map(Number); return y * 12 + mo - 1; };
  const now = new Date();
  const nowIdx = now.getFullYear() * 12 + now.getMonth();
  const spans = roles
    .filter((r) => r.start)
    .map((r) => [idx(r.start), r.current || !r.end ? nowIdx : idx(r.end)])
    .filter(([a, b]) => b >= a)
    .sort((x, y) => x[0] - y[0]);
  let months = 0;
  let cur = null;
  for (const [a, b] of spans) {
    if (cur && a <= cur[1]) cur[1] = Math.max(cur[1], b);
    else { if (cur) months += cur[1] - cur[0] + 1; cur = [a, b]; }
  }
  if (cur) months += cur[1] - cur[0] + 1;
  return { y: Math.floor(months / 12), m: months % 12 };
}

/* ───────── issues are DERIVED from the data (never stored) ───────── */
export function getIssues(d) {
  const out = [];
  const push = (kind, area, id, title, text) => out.push({ kind, area, id, title, text });

  d.experience.filter((e) => e.conflict).forEach((e) =>
    push('conflict', 'Work Experience', e.id, `${e.title} · end date`,
      `${e.conflict.map((o) => SOURCES[o.source].label).join(' and ')} give different end dates. A person has to choose.`));

  const seen = new Set();
  d.certifications.filter((c) => c.dup).forEach((c) => {
    if (seen.has(c.dup)) return; // report each duplicate pair once
    seen.add(c.id);
    push('duplicate', 'Certifications', c.id, c.name, 'Two certifications look like the same credential from different sources.');
  });

  d.projects.filter((p) => isBadLink(p.link)).forEach((p) =>
    push('link', 'Projects', p.id, `${p.name} · link`,
      /^https?:\/\//i.test(p.link) ? 'The link isn’t a valid web address.' : 'The link is missing “https://”, so it can’t be opened.'));

  d.skills.filter((s) => s.low).forEach((s) =>
    push('skill', 'Skills', s.id, s.name, 'Found once in your resume with low confidence. Confirm it is one of your skills.'));

  if (d.summary.cut) push('extract', 'Professional Summary', 'summary', 'Professional Summary', 'The last sentence was cut off in the scanned document.');
  if (!d.profile.phone && !d.profile.phoneNA) push('phone', 'Contact details', 'phone', 'Phone number', 'No phone number was found in your documents. This is optional.');
  return out;
}

/* ───────── profile completion: 10 steps, the first unfinished one is the "next step" ───────── */
export function completion(d, issues) {
  const p = d.profile;
  const steps = [
    ['Add your name and job title', p.fullName && p.title, 'profile'],
    ['Add your email', p.email, 'profile'],
    ['Add your location', p.location, 'profile'],
    ['Add your LinkedIn link', p.linkedin, 'profile'],
    ['Write a professional summary', d.summary.text, 'summary'],
    ['Add your skills', d.skills.length, 'skills'],
    ['Add your work experience', d.experience.length, 'exp'],
    ['Add your education', d.education.length, 'edu'],
    ['Add your phone number', p.phone || p.phoneNA, 'phone'],
    ['Resolve all review items', !issues.length, 'issues'],
  ].map(([label, done, act]) => ({ label, done: !!done, act }));
  const n = steps.filter((s) => s.done).length;
  return { steps, n, pct: Math.round((n / steps.length) * 100), next: steps.find((s) => !s.done) };
}
