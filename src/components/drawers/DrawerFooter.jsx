export default function DrawerFooter({ left, ok = 'Save changes', disabled, onOk, onCancel }) {
  return (
    <>
      <div>{left}</div>
      <div className="dr-f-r">
        <button className="btn ghost" onClick={onCancel}>Cancel</button>
        <button className="btn pri" disabled={disabled} onClick={onOk}>{ok}</button>
      </div>
    </>
  );
}
