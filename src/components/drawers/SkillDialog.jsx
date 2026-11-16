import { useState } from 'react';
import useModal from '../../hooks/useModal';

export default function SkillDialog({ onClose, onAdd, taken }) {
  useModal(onClose);
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const n = name.trim();
  const dup = taken(n);
  const submit = () => n && !dup && onAdd(n, level);
  return (
    <div className="ov mid" onMouseDown={onClose}>
      <div className="dlg" role="dialog" aria-modal="true" aria-label="Add skill" onMouseDown={(e) => e.stopPropagation()}>
        <h2>Add skill</h2>
        <label className="fld"><span>Skill name <b>*</b></span>
          <input className="in" autoFocus placeholder="e.g. GraphQL" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} />
        </label>
        {dup && <p className="err">This skill is already on your profile.</p>}
        <label className="fld"><span>Proficiency (optional)</span>
          <select className="in" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">Select level</option>
            {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
        <div className="dr-f-r">
          <button className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn pri" disabled={!n || dup} onClick={submit}>Add</button>
        </div>
      </div>
    </div>
  );
}
