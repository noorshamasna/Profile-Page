import Badge from '../ui/Badge';
import Callout from '../ui/Callout';
import EditDrawer from './EditDrawer';
import ConflictDrawer from './ConflictDrawer';
import DuplicateDrawer from './DuplicateDrawer';
import LinkDrawer from './LinkDrawer';
import SkillDrawer from './SkillDrawer';
import TextFixDrawer from './TextFixDrawer';
import PhoneDrawer from './PhoneDrawer';
import { COLL, F } from '../../constants/config';
import { patchFor, reviewOf } from '../../utils/helpers';
import { SOURCES } from '../../profileData';

// A single state ({ type, id }) decides which drawer is open.
export default function ActiveDrawer({ dr, setDr, close, store, goSources }) {
  const { d, setD, upd, add, del, merge } = store;
  if (!dr) return null;
  const { type, id } = dr;
  const pr = d.profile;

  const c = COLL[type];
  if (c) {
    const item = id === 'new' ? null : d[c.key].find((x) => x.id === id);
    if (id !== 'new' && !item) return null;
    const rv = reviewOf(type, item);
    return (
      <EditDrawer key={`${type}-${id}`} title={`${item ? 'Edit' : 'Add'} ${c.noun}`} sub={item && c.sub(item)}
        badge={rv && <Badge>Needs review</Badge>}
        note={rv && (
          <Callout tone="amber"><b>Needs review:</b> {rv[1]}{' '}
            <button className="lk" onClick={() => setDr({ type: rv[0], id })}>Resolve issue</button>
          </Callout>
        )}
        rows={F[type]} init={item || {}} item={item} onClose={close} onViewSource={goSources}
        onSave={(v) => {
          if (item) upd(c.key, id, patchFor(type, item, v)); else add(c.key, { ...v, sources: ['manual'], conf: 'High' });
          close();
        }}
        onDelete={item && (() => { if (window.confirm(`Delete this ${c.noun} entry?`)) { del(c.key, id); close(); } })} />
    );
  }

  switch (type) {
    case 'profile':
      return <EditDrawer key="profile" title="Edit profile" sub={pr.fullName} rows={F.profile} init={pr} onClose={close}
        onSave={(v) => { merge('profile', v); close(); }} />;
    case 'summary': {
      const s = d.summary;
      return (
        <EditDrawer key="summary" title="Edit professional summary" sub={SOURCES[s.sources[0]].label}
          badge={s.cut && <Badge>Needs review</Badge>}
          note={s.cut && <Callout tone="amber"><b>Needs review:</b> The last sentence was cut off in the scanned document.</Callout>}
          rows={F.summary} init={s} item={s} onClose={close} onViewSource={goSources}
          onSave={(v) => { merge('summary', { text: v.text, cut: v.text === s.text ? s.cut : false }); close(); }} />
      );
    }
    case 'conflict': {
      const e = d.experience.find((x) => x.id === id);
      return e && <ConflictDrawer key={id} e={e} onClose={close}
        onResolve={(value, note) => { upd('experience', id, { end: value, current: false, conflict: null, resolved: true, note }); close(); }} />;
    }
    case 'duplicate': {
      const x = d.certifications.find((z) => z.id === id);
      const y = x && d.certifications.find((z) => z.id === x.dup);
      if (!x || !y) return null;
      const [a, b] = d.certifications.indexOf(x) < d.certifications.indexOf(y) ? [x, y] : [y, x];
      return <DuplicateDrawer key={id} a={a} b={b} onClose={close} onDone={(merged) => {
        setD((s) => ({
          ...s,
          certifications: merged
            ? s.certifications.filter((z) => z.id !== b.id).map((z) => (z.id === a.id ? { ...z, dup: null, sources: [...new Set([...a.sources, ...b.sources])] } : z))
            : s.certifications.map((z) => (z.id === a.id || z.id === b.id ? { ...z, dup: null } : z)),
        }));
        close();
      }} />;
    }
    case 'link': {
      const p = d.projects.find((x) => x.id === id);
      return p && <LinkDrawer key={id} p={p} onClose={close}
        onSave={(link) => { upd('projects', id, { link }); close(); }} onRemove={() => { upd('projects', id, { link: '' }); close(); }} />;
    }
    case 'skill': {
      const s = d.skills.find((x) => x.id === id);
      return s && <SkillDrawer key={id} s={s} onClose={close} onDone={(mode, name) => {
        if (mode === 'remove') del('skills', id); else upd('skills', id, { low: false, ...(mode === 'rename' && { name }) });
        close();
      }} />;
    }
    case 'extract':
      return <TextFixDrawer key="extract" s={d.summary} onClose={close}
        onKeep={() => { merge('summary', { cut: false }); close(); }} onSave={(text) => { merge('summary', { text, cut: false }); close(); }} />;
    case 'phone':
      return <PhoneDrawer key="phone" onClose={close}
        onSave={(phone) => { merge('profile', { phone, phoneNA: false }); close(); }} onSkip={() => { merge('profile', { phoneNA: true }); close(); }} />;
    default:
      return null;
  }
}
