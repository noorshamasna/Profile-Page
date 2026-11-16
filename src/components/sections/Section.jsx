import { ChevronDown, ChevronUp } from 'lucide-react';
import { TABS } from '../../constants/config';
import { cx } from '../../utils/helpers';

// Collapsible card. The right side (actions) lives outside the toggle button so "+" / edit never collapse it.
export default function Section({ id, count, open, onToggle, actions, children }) {
  const [, title, Icon] = TABS.find(([t]) => t === id);
  const tone = id === 'issues' ? 'warn' : '';
  return (
    <section id={`sec-${id}`} className={cx('card sec', !open && 'shut')}>
      <header className="sec-h">
        <button className="sec-t" onClick={onToggle} aria-expanded={open}>
          <span className={cx('sec-ic', tone)}><Icon size={20} /></span>
          <h2>{title}</h2>
          {count != null && <span className={cx('cnt', tone)}>{count}</span>}
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <div className="sec-a">{actions}</div>
      </header>
      {open && <div className="sec-b">{children}</div>}
    </section>
  );
}
