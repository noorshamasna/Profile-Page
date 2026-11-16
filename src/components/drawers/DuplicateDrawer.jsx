import { useState } from 'react';
import Drawer from './Drawer';
import DrawerFooter from './DrawerFooter';
import Badge from '../ui/Badge';
import Callout from '../ui/Callout';
import Option from '../ui/Option';
import SourceList from '../ui/SourceList';
import { fmtMonth } from '../../profileData';

function DuplicateCard({ x, tag }) {
  return (
    <div className="dupc"><small>{tag}</small><SourceList ids={x.sources} /><b>{x.name}</b><span>{x.issuer} · {fmtMonth(x.date)}</span></div>
  );
}

export default function DuplicateDrawer({ a, b, onClose, onDone }) {
  const [pick, setPick] = useState(null);
  return (
    <Drawer title="Review possible duplicate" sub="Certifications" badge={<Badge tone="blue">Possible duplicate</Badge>} onClose={onClose}
      footer={<DrawerFooter ok="Confirm" disabled={!pick} onCancel={onClose} onOk={() => onDone(pick === 'merge')} />}>
      <Callout tone="blue"><b>Why we flagged it:</b> these two entries have almost the same name, issuer and date. We never merge records on similarity alone.</Callout>
      <div className="g2"><DuplicateCard x={a} tag="Entry A" /><DuplicateCard x={b} tag="Entry B" /></div>
      <Option checked={pick === 'merge'} onChange={() => setPick('merge')} title="They are the same. Merge them" sub="Keep one name and combine the sources." />
      <Option checked={pick === 'keep'} onChange={() => setPick('keep')} title="They are different. Keep both" sub="We won’t suggest this match again." />
    </Drawer>
  );
}
