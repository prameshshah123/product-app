
import { useState,useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Typeahead from '../components/Typeahead';

export default function Products(){
  const [user,setUser]=useState(null);
  const [products,setProducts]=useState([]);
  const [form,setForm]=useState({product_name:'',category_id:null,customer_id:null});

  useEffect(()=>{
    supabase.auth.getSession().then(r=>setUser(r.data.session?.user || null));
    fetchProducts();
    const sub = supabase.auth.onAuthStateChange((_e,s)=>{ setUser(s?.user||null) });
    return ()=> sub.data?.subscription?.unsubscribe();
  },[]);

  async function fetchProducts(){
    const { data, error } = await supabase.from('products').select('id,product_name').limit(100);
    if (error) { console.error(error); return; }
    setProducts(data||[]);
  }

  async function create(e){
    e.preventDefault();
    const payload = { product_name: form.product_name, category_id: form.category_id, customer_id: form.customer_id };
    const { error } = await supabase.from('products').insert([payload]);
    if (error) { alert('Save failed'); console.error(error); return; }
    setForm({ product_name:'', category_id:null, customer_id:null });
    fetchProducts();
  }

  return (
    <div className="container">
      <h2>Products</h2>
      <div className="card" style={{marginBottom:12}}>
        <form onSubmit={create}>
          <div><label>Product name</label><input className="input" value={form.product_name} onChange={e=>setForm({...form,product_name:e.target.value})} /></div>
          <div style={{marginTop:8}}><label>Category</label><Typeahead table="categories" onSelect={v=>setForm({...form,category_id:v.id})} /></div>
          <div style={{marginTop:8}}><label>Customer</label><Typeahead table="customers" onSelect={v=>setForm({...form,customer_id:v.id})} /></div>
          <div style={{marginTop:8}}><button className="button" type="submit">Create</button></div>
        </form>
      </div>

      <div className="card">
        <h3>List</h3>
        <div>
          {products.map(p=> <div key={p.id} style={{padding:8,borderBottom:'1px solid #eee'}}>{p.product_name}</div>)}
        </div>
      </div>
    </div>
  );
}
