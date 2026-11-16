import { AlertTriangle, Award, Briefcase, Code2, FileText, GraduationCap, Rocket } from 'lucide-react';

// [id, label, icon] — drives the section nav bar and the section cards
export const TABS = [
  ['issues', 'Issues', AlertTriangle], ['summary', 'Professional Summary', FileText], ['skills', 'Skills', Code2],
  ['exp', 'Work Experience', Briefcase], ['edu', 'Education', GraduationCap], ['proj', 'Projects', Rocket],
  ['cert', 'Certifications', Award],
];

// issue kind -> [label, badge tone]
export const KIND = {
  conflict: ['Conflict', 'red'], duplicate: ['Possible duplicate', 'blue'], link: ['Invalid link', 'red'],
  skill: ['Low confidence', 'amber'], extract: ['Extraction issue', 'amber'], phone: ['Missing information', 'plain'],
};

// Forms are config-driven: field = [key, label, type, required, extra]; a row with two fields renders side by side.
export const F = {
  profile: [
    [['fullName', 'Full name', 'text', 1]], [['title', 'Job title', 'text', 1]], [['email', 'Email', 'email', 1]],
    [['phone', 'Phone number (optional)', 'tel']], [['location', 'Location', 'text']], [['linkedin', 'LinkedIn link', 'text']],
    [['employment', 'Employment type', 'select', 0, ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship']]],
    [['tags', 'Highlighted skills (comma separated)', 'list']],
  ],
  summary: [[['text', 'Summary', 'area', 1, 700]]],
  exp: [
    [['title', 'Job title', 'text', 1]], [['employer', 'Employer', 'text', 1]],
    [['start', 'Start date', 'month', 1], ['end', 'End date', 'month']], [['current', 'I currently work here', 'check']],
    [['location', 'Location or work type (optional)', 'text']], [['description', 'Description (optional)', 'area']],
    [['skills', 'Skills used (optional)', 'list']],
  ],
  proj: [
    [['name', 'Project name', 'text', 1]], [['org', 'Organization or role (optional)', 'text']],
    [['start', 'Start date (optional)', 'month'], ['end', 'End date (optional)', 'month']], [['current', 'This project is ongoing', 'check']],
    [['link', 'Project link (optional)', 'text']], [['description', 'Description (optional)', 'area']],
    [['skills', 'Skills used (optional)', 'list']],
  ],
  edu: [
    [['degree', 'Degree', 'text', 1]], [['field', 'Field of study', 'text', 1]], [['school', 'Institution (optional)', 'text']],
    [['start', 'Start year (optional)', 'year'], ['end', 'End year', 'year', 1]],
  ],
  cert: [
    [['name', 'Certification name', 'text', 1]], [['issuer', 'Issuing organization', 'text', 1]],
    [['date', 'Issue date (optional)', 'month']], [['link', 'Credential link (optional)', 'text']],
  ],
};

// collections that share the generic edit drawer
export const COLL = {
  exp: { key: 'experience', noun: 'work experience', sub: (x) => `${x.title} · ${x.employer}` },
  proj: { key: 'projects', noun: 'project', sub: (x) => x.name },
  edu: { key: 'education', noun: 'education', sub: (x) => `${x.degree} in ${x.field}` },
  cert: { key: 'certifications', noun: 'certification', sub: (x) => x.name },
};
