import { useState } from 'react';
import { INITIAL } from '../profileData';
import { uid } from '../utils/helpers';

// Data lives in local state here. Replace INITIAL (profileData.js) and the upd/add/del/merge helpers with your API calls.
export default function useProfileData() {
  const [d, setD] = useState(INITIAL);

  const upd = (key, id, ch) => setD((s) => ({ ...s, [key]: s[key].map((x) => (x.id === id ? { ...x, ...ch } : x)) }));
  const add = (key, item) => setD((s) => ({ ...s, [key]: [...s[key], { ...item, id: uid() }] }));
  const del = (key, id) => setD((s) => ({ ...s, [key]: s[key].filter((x) => x.id !== id) }));
  const merge = (key, ch) => setD((s) => ({ ...s, [key]: { ...s[key], ...ch } }));
  const resetData = () => setD(INITIAL);

  return { d, setD, upd, add, del, merge, resetData };
}
