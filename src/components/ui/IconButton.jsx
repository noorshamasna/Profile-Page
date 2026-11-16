export default function IconButton({ label, onClick, children }) {
  return <button className="ib" aria-label={label} title={label} onClick={onClick}>{children}</button>;
}
