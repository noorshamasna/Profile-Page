import { Check, ChevronRight } from 'lucide-react';

export default function CompletionCard({ comp, onAct }) {
  return (
    <div className="comp">
      <div className="comp-h"><b>Complete Profile</b><span>{comp.n} of {comp.steps.length} steps</span></div>
      <div className="comp-p"><strong>{comp.pct}%</strong><div className="bar"><i style={{ width: `${comp.pct}%` }} /></div></div>
      {comp.next
        ? <button className="next" onClick={() => onAct(comp.next.act)}><span>Next step</span><b>{comp.next.label}</b><ChevronRight size={16} /></button>
        : <div className="next"><Check size={16} /><b>Your profile is complete</b></div>}
    </div>
  );
}
