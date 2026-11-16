import { useState } from 'react';
import Drawer from './Drawer';
import DrawerFooter from './DrawerFooter';
import Badge from '../ui/Badge';
import Callout from '../ui/Callout';
import Option from '../ui/Option';
import { SOURCES, fmtMonth } from '../../profileData';

export default function ConflictDrawer({ e, onClose, onResolve }) {
  const [pick, setPick] = useState(null); // option index | 'custom'
  const [custom, setCustom] = useState('');
  const [note, setNote] = useState('');
  const value = pick === 'custom' ? custom : pick === null ? '' : e.conflict[pick].value;
  return (
    <Drawer title="Resolve conflict" sub={`${e.title} · ${e.employer} · end date`} badge={<Badge tone="red">Conflict</Badge>} onClose={onClose}
      footer={<DrawerFooter ok="Confirm" disabled={!value} onCancel={onClose} onOk={() => onResolve(value, note.trim())} />}>
      <Callout tone="red"><b>Why a person must decide:</b> the two sources disagree about when you left <b>{e.employer}</b>, and no rule can pick a winner for this field.</Callout>
      {e.conflict.map((o, i) => (
        <Option key={o.value} checked={pick === i} onChange={() => setPick(i)} title={fmtMonth(o.value)} sub={`${SOURCES[o.source].label} · ${o.conf} confidence`} />
      ))}
      <Option checked={pick === 'custom'} onChange={() => setPick('custom')} title="Enter a different date">
        <input className="in" type="month" value={custom} onChange={(ev) => { setCustom(ev.target.value); setPick('custom'); }} />
      </Option>
      <label className="fld"><span>Note (optional)</span>
        <textarea className="in" rows={3} placeholder="Why this date?" value={note} onChange={(ev) => setNote(ev.target.value)} />
      </label>
      <dl className="kv"><dt>Role</dt><dd>{e.title}</dd><dt>Started</dt><dd>{fmtMonth(e.start)}</dd></dl>
    </Drawer>
  );
}
