import { Pencil } from 'lucide-react';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';
import SourceList from '../ui/SourceList';
import Section from './Section';

export default function SummarySection({ summary, open, onToggle, onEdit }) {
  return (
    <Section id="summary" open={open} onToggle={onToggle}
      actions={<IconButton label="Edit summary" onClick={onEdit}><Pencil size={16} /></IconButton>}>
      <div className="sum" role="button" tabIndex={0} onClick={onEdit} onKeyDown={(e) => e.key === 'Enter' && onEdit()}>
        <p>{summary.text}</p>
        <div className="sum-m"><SourceList ids={summary.sources} />{summary.cut && <Badge>Needs review</Badge>}</div>
      </div>
    </Section>
  );
}
