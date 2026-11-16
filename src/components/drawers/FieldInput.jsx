export default function FieldInput({ f, v, set, disabled }) {
  const [k, label, type, req, extra] = f;
  if (type === 'check') {
    return <label className="chk"><input type="checkbox" checked={!!v[k]} onChange={(e) => set(k, e.target.checked)} />{label}</label>;
  }
  const common = { className: 'in', value: v[k], disabled, onChange: (e) => set(k, e.target.value) };
  return (
    <label className="fld">
      <span>{label}{!!req && <b> *</b>}</span>
      {type === 'area' ? <textarea rows={5} maxLength={extra} {...common} />
        : type === 'select' ? <select {...common}>{extra.map((o) => <option key={o}>{o}</option>)}</select>
        : <input type={type === 'list' ? 'text' : type === 'year' ? 'number' : type} {...common} />}
      {type === 'area' && !!extra && <small>{v[k].length}/{extra} characters</small>}
    </label>
  );
}
