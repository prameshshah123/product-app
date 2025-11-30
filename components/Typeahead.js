
import { useState, useEffect, useRef } from 'react';

export default function Typeahead({ apiPath='/api/search', table='categories', onSelect, placeholder='Type to search...' }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const timer = useRef(null);

  useEffect(() => {
    if (!q || q.length < 2) { setResults([]); return; }
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${apiPath}?q=${encodeURIComponent(q)}&table=${table}`);
        const json = await res.json();
        setResults(json.results || []);
      } catch (e) { console.error(e); }
    }, 250);
    return () => clearTimeout(timer.current);
  }, [q, apiPath, table]);

  return (
    <div style={{position:'relative'}}>
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder={placeholder} />
      {results.length > 0 && (
        <div style={{position:'absolute',background:'#fff',border:'1px solid #ddd',width:'100%',zIndex:50}}>
          {results.map(r => <div key={r.id} style={{padding:8,cursor:'pointer'}} onClick={() => { onSelect && onSelect(r); setQ(r.name); setResults([]); }}>{r.name}</div>)}
        </div>
      )}
    </div>
  );
}
