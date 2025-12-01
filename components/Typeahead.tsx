
import React, { useState, useEffect, useRef } from 'react';
type Row = { id: string; name: string };
export default function Typeahead({ table='categories', onSelect }: { table?: string; onSelect?: (r: Row)=>void }){
  const [q,setQ]=useState(''); const [res,setRes]=useState<Row[]>([]); const t=useRef<number|undefined>(undefined);
  useEffect(()=>{ if(!q||q.length<2){ setRes([]); return; } window.clearTimeout(t.current); t.current = window.setTimeout(async ()=>{ try{ const r = await fetch(`/api/search?q=${encodeURIComponent(q)}&table=${table}`); const j = await r.json(); setRes(j.results||[]); }catch(e){ } }, 250); return ()=>window.clearTimeout(t.current); },[q,table]);
  return (<div style={{position:'relative'}}><input className="search-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Type to search..." /><div style={{position:'absolute'}}>{res.map(r=>(<div key={r.id} onClick={()=>{ onSelect && onSelect(r); setQ(''); setRes([]); }} style={{padding:8,cursor:'pointer',background:'#fff'}}>{r.name}</div>))}</div></div>);
}
