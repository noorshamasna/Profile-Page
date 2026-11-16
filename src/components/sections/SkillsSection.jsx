import { Check, Pencil, Plus } from 'lucide-react';
import IconButton from '../ui/IconButton';
import Section from './Section';
import SkillChip from './SkillChip';

export default function SkillsSection({ items, total, open, onToggle, editing, onStartEdit, onStopEdit, onAdd, onReview, onRemove }) {
  return (
    <Section id="skills" count={total} open={open} onToggle={onToggle}
      actions={editing ? (
        <>
          <button className="btn pri sm" onClick={onStopEdit}><Check size={15} /> Done</button>
          <IconButton label="Add skill" onClick={onAdd}><Plus size={16} /></IconButton>
        </>
      ) : <IconButton label="Edit skills" onClick={onStartEdit}><Pencil size={16} /></IconButton>}>
      {items.length ? (
        <div className="chips">
          {items.map((s) => (
            <SkillChip key={s.id} skill={s} editing={editing} onReview={() => onReview(s.id)} onRemove={() => onRemove(s.id)} />
          ))}
        </div>
      ) : <p className="empty">{total ? 'Nothing matches your filters.' : 'No skills yet — use + to add one.'}</p>}
    </Section>
  );
}
