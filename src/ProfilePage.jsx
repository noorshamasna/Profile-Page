import { useCallback, useMemo, useState } from 'react';
import { completion, getIssues, totalExperience } from './profileData';
import useProfileData from './hooks/useProfileData';
import useProfileFilters from './hooks/useProfileFilters';
import useSections from './hooks/useSections';
import ProfileHeader from './components/layout/ProfileHeader';
import StatsGrid from './components/layout/StatsGrid';
import SectionNav from './components/layout/SectionNav';
import Toolbar from './components/layout/Toolbar';
import IssuesSection from './components/sections/IssuesSection';
import SummarySection from './components/sections/SummarySection';
import SkillsSection from './components/sections/SkillsSection';
import CollectionSection from './components/sections/CollectionSection';
import ActiveDrawer from './components/drawers/ActiveDrawer';
import SkillDialog from './components/drawers/SkillDialog';
import './profile.css';

/*
  <ProfilePage sourcesPath="/sources" onNavigate={(path) => navigate(path)} />
  Data lives in local state (hooks/useProfileData.js). Replace INITIAL (profileData.js) and the upd/add/del/merge helpers with your API calls.
*/

export default function ProfilePage({ sourcesPath = '/sources', onNavigate = (p) => window.location.assign(p) }) {
  const store = useProfileData();
  const { d, add, del, resetData } = store;
  const [dr, setDr] = useState(null); // { type, id } — a single state decides which drawer is open
  const [skillDlg, setSkillDlg] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const sections = useSections();

  // Issues are derived from the data, never stored — badges, red dots and counts can't drift apart.
  const issues = useMemo(() => getIssues(d), [d]);
  const comp = useMemo(() => completion(d, issues), [d, issues]);
  const tx = useMemo(() => totalExperience(d.experience), [d.experience]);
  const filters = useProfileFilters(d, issues);
  const { list, total, flagged, visible, setOnlyReview } = filters;

  const close = useCallback(() => setDr(null), []);
  const closeSkill = useCallback(() => setSkillDlg(false), []);
  const goSources = (id) => onNavigate(id ? `${sourcesPath}?source=${id}` : sourcesPath);
  const reset = () => { resetData(); setEditSkills(false); filters.reset(); close(); };

  // "Next step" in the completion card
  const act = (a) => ({
    phone: () => setDr({ type: 'phone' }), profile: () => setDr({ type: 'profile' }), summary: () => setDr({ type: 'summary' }),
    skills: () => setSkillDlg(true), exp: () => setDr({ type: 'exp', id: 'new' }), edu: () => setDr({ type: 'edu', id: 'new' }),
    issues: () => { setOnlyReview(true); sections.go('issues'); },
  }[a]());

  const sec = (id) => ({ open: sections.open[id], onToggle: () => sections.toggle(id) });
  const collection = (type, label) => visible(type) && (
    <CollectionSection type={type} label={label} items={list[type]} total={total[type]} {...sec(type)}
      onAdd={() => setDr({ type, id: 'new' })} onOpenItem={(id) => setDr({ type, id })} />
  );

  return (
    <div className="pf">
      <div className="wrap">
        <ProfileHeader profile={d.profile} hasIssues={!!issues.length} comp={comp} onEdit={() => setDr({ type: 'profile' })} onAct={act} />

        <StatsGrid education={d.education} skillsCount={d.skills.length} totalExperience={tx} onOpenSources={goSources} />

        <SectionNav total={total} flagged={flagged} visible={visible} onGo={sections.go}
          allOpen={sections.allOpen} openCount={sections.openCount} onToggleAll={sections.toggleAll} />

        <Toolbar q={filters.q} onQueryChange={filters.setQ} onlyReview={filters.onlyReview}
          onOnlyReviewChange={setOnlyReview} issuesCount={issues.length} />

        <main className="secs">
          {visible('issues') && (
            <IssuesSection items={list.issues} total={total.issues} {...sec('issues')}
              onOpenIssue={(i) => setDr({ type: i.kind, id: i.id })} />
          )}

          {visible('summary') && (
            <SummarySection summary={d.summary} {...sec('summary')} onEdit={() => setDr({ type: 'summary' })} />
          )}

          {visible('skills') && (
            <SkillsSection items={list.skills} total={total.skills} {...sec('skills')}
              editing={editSkills} onStartEdit={() => setEditSkills(true)} onStopEdit={() => setEditSkills(false)}
              onAdd={() => setSkillDlg(true)} onReview={(id) => setDr({ type: 'skill', id })} onRemove={(id) => del('skills', id)} />
          )}

          {collection('exp', 'work experience')}
          {collection('edu', 'education')}
          {collection('proj', 'project')}
          {collection('cert', 'certification')}

          {filters.filtering && !filters.anyVisible && <p className="empty">No results match your filters.</p>}
        </main>

        <p className="foot">Prototype with sample data · <button onClick={reset}>Reset demo data</button></p>
      </div>

      <ActiveDrawer dr={dr} setDr={setDr} close={close} store={store} goSources={goSources} />
      {skillDlg && <SkillDialog onClose={closeSkill} taken={(n) => d.skills.some((s) => s.name.toLowerCase() === n.toLowerCase())}
        onAdd={(name, level) => { add('skills', { name, level }); closeSkill(); }} />}
    </div>
  );
}
