
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabaseClient';
import Typeahead from '../components/Typeahead';
import { PdfIcon, CdrIcon, EyeIcon, EditIcon, HistoryIcon } from '../components/Icons';

type Product = any;

export default function Products(){
  const [products,setProducts] = useState<Product[]>([]);
  const [q,setQ] = useState('');
  useEffect(()=>{ fetchProducts(); },[]);
  async function fetchProducts(){ const { data, error } = await supabase.from('products').select('*').limit(500); if(error){ console.error(error); return; } setProducts(data||[]); }
  const filtered = products.filter(p=> { if(!q) return true; const s = `${p.product_name||''} ${p.artwork_code||''} ${p.dimension||''} ${p.ink||''}`; return s.toLowerCase().includes(q.toLowerCase()); });
  return (<Layout active="products">
    <div className="topbar"><input className="search-input" placeholder="Search by name, code, size, gsm, paper..." value={q} onChange={e=>setQ(e.target.value)} /><div><button className="add-btn">+ Add Product</button></div></div>
    <div className="card"><table className="table"><thead><tr><th>Product name</th><th>Category</th><th>Specifications</th><th>Artwork</th><th>Actions</th></tr></thead><tbody>{filtered.map(p=>(<tr key={p.id}><td><div className="product-name">{p.product_name}</div><div className="artwork-code">{p.artwork_code||''}</div></td><td>{p.category_id}</td><td><div className="spec-row"><div className="pill">{p.actual_gsm_used||''}</div><div className="pill">{p.paper_type_id||''}</div><div className="pill">{p.dimension||''}</div><div className="pill">{p.ups||''}</div><div className="pill">{p.coating||''}</div></div><div style={{height:8}}></div><div className="spec-row"><div className="pill">{p.folding_dim||''}</div><div className="pill">{p.pasting||''}</div><div className="pill">{p.special_effects||''}</div></div></td><td style={{width:120}}>{p.artwork_pdf? <PdfIcon/>:null} {p.artwork_cdr? <CdrIcon/>:null}</td><td style={{whiteSpace:'nowrap'}}><button className="icon-btn"><EyeIcon/></button><button className="icon-btn"><EditIcon/></button><button className="icon-btn"><HistoryIcon/></button></td></tr>))}</tbody></table></div></Layout>);
}
