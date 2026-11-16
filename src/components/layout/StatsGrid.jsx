import { ArrowUpRight, Briefcase, Code2, GraduationCap } from 'lucide-react';
import { DOCS } from '../../profileData';

// The Sources card goes to the project's Sources page.
export default function StatsGrid({ education, skillsCount, totalExperience: tx, onOpenSources }) {
  const edu = [...education].sort((a, b) => b.end - a.end)[0];
  const stats = [
    ['Total Experience', Briefcase, `${tx.y} ${tx.y === 1 ? 'yr' : 'yrs'} ${tx.m} ${tx.m === 1 ? 'mo' : 'mos'}`, 'Based on non-overlapping roles'],
    ['Education', GraduationCap, edu?.degree || '—', edu ? `${edu.field} · ${edu.end}` : 'Not added yet'],
    ['Skills', Code2, skillsCount, `Normalized from ${DOCS.length} documents`],
  ];

  return (
    <div className="stats">
      {stats.map(([label, Icon, value, cap]) => (
        <div className="card stat" key={label}><div><small>{label}</small><Icon size={18} /></div><strong>{value}</strong><small>{cap}</small></div>
      ))}
      <button className="card stat link" onClick={() => onOpenSources()}>
        <div><small>Sources</small><ArrowUpRight size={18} /></div>
        <strong>{DOCS.length} documents</strong><small>{'PDF, DOCX & LinkedIn export'}</small>
      </button>
    </div>
  );
}
