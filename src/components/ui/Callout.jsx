import { cx } from '../../utils/helpers';

export default function Callout({ tone = 'blue', children }) {
  return <div className={cx('callout', tone)}>{children}</div>;
}
