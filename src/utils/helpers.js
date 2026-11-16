import { SOURCES, isBadLink } from '../profileData';

export const cx = (...a) => a.filter(Boolean).join(' ');
export const uid = () => Math.random().toString(36).slice(2, 8);
export const infoText = (x) => `${x.sources.map((s) => SOURCES[s].label).join(' + ')} · ${x.conf} confidence`;

// which "issue drawer" an item can be sent to from its edit drawer
export const reviewOf = (t, x) => x && ({
  exp: x.conflict && ['conflict', 'The two sources disagree about the end date.'],
  cert: x.dup && ['duplicate', 'Two certifications look like the same credential from different sources.'],
  proj: isBadLink(x.link) && ['link', 'The link can’t be opened as written.'],
}[t] || null);

// editing the end date by hand also settles a conflict
export const patchFor = (t, x, v) => (t === 'exp' && x.conflict && v.end !== x.end ? { ...v, conflict: null, resolved: true } : v);
