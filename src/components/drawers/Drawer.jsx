import { X } from 'lucide-react';
import useModal from '../../hooks/useModal';

// Drawer shell: overlay + side panel with header / body / footer.
export default function Drawer({ title, sub, badge, onClose, footer, children }) {
  useModal(onClose);
  return (
    <div className="ov" onMouseDown={onClose}>
      <aside className="dr" role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => e.stopPropagation()}>
        <header className="dr-h">
          <div>
            <h2>{title}</h2>
            {sub && <p>{sub}</p>}
            {badge}
          </div>
          <button className="ib" aria-label="Close" onClick={onClose}><X size={18} /></button>
        </header>
        <div className="dr-b">{children}</div>
        <footer className="dr-f">{footer}</footer>
      </aside>
    </div>
  );
}
