import { ChevronRight, Info, Link2 } from 'lucide-react';
import SourceList from '../ui/SourceList';
import { cx } from '../../utils/helpers';
import { isBadLink } from '../../profileData';

// Text on the left, and ONE right-aligned column (status badge + ⓘ, then source) so every list lines up.
export default function Row({ title, meta, desc, link, tags = [], badge, info, sources, onClick }) {
  const bad = isBadLink(link);
  return (
    <div className="row" role="button" tabIndex={0} onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div>
        <h3>{title}</h3>
        {meta && <p className="meta">{meta}</p>}
        {desc && <p>{desc}</p>}
        {link && <span className={cx('lnk', bad && 'bad')}><Link2 size={14} />{link}{bad && ' · invalid link'}</span>}
        {!!tags.length && <div className="tags sm">{tags.map((t) => <span key={t}>{t}</span>)}</div>}
      </div>
      <div className="row-side">
        <div className="row-top">
          {badge}
          <button className="ib sm" title={info} aria-label={`Details: ${info}`} onClick={(e) => e.stopPropagation()}><Info size={15} /></button>
        </div>
        <SourceList ids={sources} />
      </div>
      <ChevronRight className="chev" size={16} />
    </div>
  );
}
