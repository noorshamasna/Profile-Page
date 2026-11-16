import { useState } from 'react';
import { File as FileIcon } from 'lucide-react';
import Drawer from './Drawer';
import DrawerFooter from './DrawerFooter';
import Badge from '../ui/Badge';
import Callout from '../ui/Callout';
import Option from '../ui/Option';

export default function SkillDrawer({ s, onClose, onDone }) {
  const [pick, setPick] = useState(null);
  const [name, setName] = useState(s.name);
  return (
    <Drawer title="Confirm skill" sub={s.name} badge={<Badge>Low confidence</Badge>} onClose={onClose}
      footer={<DrawerFooter ok="Confirm" disabled={!pick || (pick === 'rename' && !name.trim())} onCancel={onClose} onOk={() => onDone(pick, name.trim())} />}>
      <Callout tone="red"><b>Why it needs review:</b> this skill appears only once, so we aren’t sure it is a professional skill of yours.</Callout>
      {s.snippet && <blockquote className="quote">“{s.snippet}”<small><FileIcon size={12} /> Resume.pdf · Low confidence</small></blockquote>}
      <Option checked={pick === 'keep'} onChange={() => setPick('keep')} title={`Keep “${s.name}”`} sub="Confirm it is one of your skills." />
      <Option checked={pick === 'rename'} onChange={() => setPick('rename')} title="Rename it">
        <input className="in" value={name} onChange={(ev) => { setName(ev.target.value); setPick('rename'); }} />
      </Option>
      <Option checked={pick === 'remove'} onChange={() => setPick('remove')} title="Remove it" sub="It won’t appear on your profile." />
    </Drawer>
  );
}
