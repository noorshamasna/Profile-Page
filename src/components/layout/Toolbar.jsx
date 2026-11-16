import { Search, X } from 'lucide-react';
import { cx } from '../../utils/helpers';

// Search box + "All / Needs review" filter
export default function Toolbar({ q, onQueryChange, onlyReview, onOnlyReviewChange, issuesCount }) {
  return (
    <div className="tools">
      <label className="search">
        <Search size={18} />
        <input value={q} onChange={(e) => onQueryChange(e.target.value)} placeholder="Search your skills, experience, projects and more" aria-label="Search profile" />
        <button onClick={() => onQueryChange('')} aria-label="Clear search"><X size={16} /></button>
      </label>
      <div className="seg">
        <button className={cx(!onlyReview && 'on')} onClick={() => onOnlyReviewChange(false)}>All</button>
        <button className={cx(onlyReview && 'on')} onClick={() => onOnlyReviewChange(true)}>Needs review ({issuesCount})</button>
      </div>
    </div>
  );
}
