import { useState } from 'react';
import Drawer from './Drawer';
import DrawerFooter from './DrawerFooter';
import Badge from '../ui/Badge';
import Callout from '../ui/Callout';

export default function PhoneDrawer({ onClose, onSave, onSkip }) {
  const [v, setV] = useState('');
  return (
    <Drawer title="Add phone number" sub="Contact details" badge={<Badge tone="blue">Missing information</Badge>} onClose={onClose}
      footer={<DrawerFooter ok="Save phone number" disabled={!/^\+?[\d\s()-]{7,}$/.test(v.trim())} onCancel={onClose} onOk={() => onSave(v.trim())}
        left={<button className="btn ghost" onClick={onSkip}>Not applicable</button>} />}>
      <Callout tone="blue"><b>Optional:</b> a phone number helps recruiters reach you faster. You can skip it if it doesn’t apply to you.</Callout>
      <label className="fld"><span>Phone number</span>
        <input className="in" type="tel" autoFocus placeholder="+971 50 123 4567" value={v} onChange={(ev) => setV(ev.target.value)} />
      </label>
    </Drawer>
  );
}
