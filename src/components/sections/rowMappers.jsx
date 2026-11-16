import StatusBadge from '../ui/StatusBadge';
import { fmtMonth, isBadLink, range } from '../../profileData';

// Maps a data item to the props of <Row /> for each collection.
export const ROW = {
  exp: (e) => ({
    title: e.title, meta: [e.employer, range(e.start, e.end, e.current), e.location].filter(Boolean).join(' · '),
    desc: e.description, tags: e.skills, badge: <StatusBadge review={!!e.conflict} resolved={e.resolved} />,
  }),
  edu: (e) => ({ title: `${e.degree} in ${e.field}`, meta: [e.school, [e.start, e.end].filter(Boolean).join(' – ')].filter(Boolean).join(' · ') }),
  proj: (p) => ({
    title: p.name, meta: [p.org, range(p.start, p.end, p.current)].filter(Boolean).join(' · '),
    desc: p.description, link: p.link, tags: p.skills, badge: <StatusBadge review={isBadLink(p.link)} />,
  }),
  cert: (c) => ({ title: c.name, meta: [c.issuer, fmtMonth(c.date)].filter(Boolean).join(' · '), badge: <StatusBadge review={!!c.dup} /> }),
};
