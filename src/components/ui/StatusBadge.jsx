import Badge from './Badge';

export default function StatusBadge({ review, resolved }) {
  return review ? <Badge>Needs review</Badge> : resolved ? <Badge tone="green">Resolved</Badge> : null;
}
