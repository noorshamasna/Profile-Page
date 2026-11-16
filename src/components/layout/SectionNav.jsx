import { ChevronsDown, ChevronsUp } from 'lucide-react';
import { TABS } from '../../constants/config';

// Sticky section bar
export default function SectionNav({ total, flagged, visible, onGo, allOpen, openCount, onToggleAll }) {
  return (
    <nav className="nav" aria-label="Profile sections">
      <div className="tabs">
        {TABS.map(([id, label, Icon]) => (
          <button key={id} className="tab" disabled={!visible(id)} onClick={() => onGo(id)}>
            <Icon size={16} />{label}
            {total[id] != null && <span>{total[id]}</span>}
            {flagged[id] && <i className="dot" aria-label="Needs review" />}
          </button>
        ))}
      </div>
      <button className="tgl" onClick={onToggleAll}>
        {allOpen ? <ChevronsUp size={16} /> : <ChevronsDown size={16} />}
        {allOpen ? 'Collapse all' : 'Expand all'}<em>{openCount}/{TABS.length} open</em>
      </button>
    </nav>
  );
}
