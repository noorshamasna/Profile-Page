import { useState } from 'react';
import { TABS } from '../constants/config';
import { isBadLink } from '../profileData';

// search + "Needs review" filter. Returns the filtered lists for every section plus totals / flags.
export default function useProfileFilters(d, issues) {
  const [q, setQ] = useState('');
  const [onlyReview, setOnlyReview] = useState(false);

  const qq = q.trim().toLowerCase();
  const filtering = !!qq || onlyReview;
  const hay = (x) => Object.entries(x).filter(([k]) => k !== 'id').flatMap(([, v]) => v).filter((v) => typeof v === 'string').join(' ').toLowerCase();
  const hit = (x, review) => (!onlyReview || review) && (!qq || hay(x).includes(qq));

  const list = {
    issues: issues.filter((i) => hit(i, true)),
    summary: [d.summary].filter((s) => hit(s, s.cut)),
    skills: d.skills.filter((s) => hit(s, s.low)),
    exp: d.experience.filter((e) => hit(e, !!e.conflict)),
    edu: d.education.filter((e) => hit(e, false)),
    proj: d.projects.filter((p) => hit(p, isBadLink(p.link))),
    cert: d.certifications.filter((c) => hit(c, !!c.dup)),
  };
  const total = { issues: issues.length, skills: d.skills.length, exp: d.experience.length, edu: d.education.length, proj: d.projects.length, cert: d.certifications.length };
  const flagged = {
    summary: d.summary.cut, skills: d.skills.some((s) => s.low), exp: d.experience.some((e) => e.conflict),
    proj: d.projects.some((p) => isBadLink(p.link)), cert: d.certifications.some((c) => c.dup),
  };
  const visible = (id) => !filtering || list[id].length > 0;
  const anyVisible = TABS.some(([id]) => visible(id));

  const reset = () => { setQ(''); setOnlyReview(false); };

  return { q, setQ, onlyReview, setOnlyReview, filtering, list, total, flagged, visible, anyVisible, reset };
}
