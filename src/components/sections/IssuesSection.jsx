import { ChevronRight } from 'lucide-react';
import Badge from '../ui/Badge';
import Section from './Section';
import { KIND } from '../../constants/config';

function IssueItem({ issue: i, onClick }) {
  const [label, tone] = KIND[i.kind];
  return (
    <button className="issue" onClick={onClick}>
      <span><small>{label} · {i.area}</small><b>{i.title}</b><span>{i.text}</span></span>
      <Badge tone={tone}>{label}</Badge><ChevronRight size={16} />
    </button>
  );
}

export default function IssuesSection({ items, total, open, onToggle, onOpenIssue }) {
  return (
    <Section id="issues" count={total} open={open} onToggle={onToggle}>
      {items.length
        ? items.map((i) => <IssueItem key={`${i.kind}-${i.id}`} issue={i} onClick={() => onOpenIssue(i)} />)
        : <p className="empty">{total ? 'No issues match your search.' : 'No issues — everything looks good.'}</p>}
    </Section>
  );
}
