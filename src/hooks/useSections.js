import { useState } from 'react';
import { TABS } from '../constants/config';

// Open / closed state of the collapsible section cards + scroll-to-section.
export default function useSections() {
  const [open, setOpen] = useState(() => Object.fromEntries(TABS.map(([id]) => [id, true])));

  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));
  const openCount = TABS.filter(([id]) => open[id]).length;
  const allOpen = openCount === TABS.length;
  const toggleAll = () => setOpen(Object.fromEntries(TABS.map(([id]) => [id, !allOpen])));
  const go = (id) => {
    setOpen((o) => ({ ...o, [id]: true }));
    setTimeout(() => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  return { open, toggle, toggleAll, go, openCount, allOpen };
}
