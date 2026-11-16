import { cx } from '../../utils/helpers';

export default function Option({ checked, onChange, title, sub, children }) {
  return (
    <div className={cx('opt', checked && 'on')} onClick={onChange}>
      <input type="radio" checked={checked} onChange={onChange} aria-label={title} />
      <div><b>{title}</b>{sub && <small>{sub}</small>}{children}</div>
    </div>
  );
}
