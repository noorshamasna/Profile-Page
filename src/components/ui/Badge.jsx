import { cx } from '../../utils/helpers';

export default function Badge({ tone = 'amber', icon, children }) {
  return <span className={cx('bd', tone)}>{icon}{children}</span>;
}
