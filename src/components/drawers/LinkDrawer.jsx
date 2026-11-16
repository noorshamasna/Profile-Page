import { useState } from 'react';
import Drawer from './Drawer';
import DrawerFooter from './DrawerFooter';
import Badge from '../ui/Badge';
import Callout from '../ui/Callout';
import { isBadLink } from '../../profileData';

export default function LinkDrawer({ p, onClose, onSave, onRemove }) {
  const [v, setV] = useState(p.link);
  const t = v.trim();
  const fixed = /^https?:\/\//i.test(t) ? t : `https://${t}`;
  const bad = isBadLink(t);
  return (
    <Drawer title="Fix link" sub={p.name} badge={<Badge tone="red">Invalid link</Badge>} onClose={onClose}
      footer={<DrawerFooter ok="Save link" disabled={!t || bad} onCancel={onClose} onOk={() => onSave(t)}
        left={<button className="btn danger" onClick={onRemove}>Remove link</button>} />}>
      <Callout tone="red"><b>What’s wrong:</b> “{p.link}” is missing “https://”, so it can’t be opened.</Callout>
      <label className="fld"><span>Project link</span><input className="in" autoFocus value={v} onChange={(ev) => setV(ev.target.value)} /></label>
      {bad && !isBadLink(fixed) && <button className="btn ghost sm" onClick={() => setV(fixed)}>Use {fixed}</button>}
      <p className="hint">We only check that a link is well-formed. We never open it for you.</p>
    </Drawer>
  );
}
