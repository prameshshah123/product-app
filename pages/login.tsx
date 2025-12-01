
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
export default function Login(){ const [email,setEmail]=useState(''); const [msg,setMsg]=useState('');
  async function send(e:any){ e.preventDefault(); const { error } = await supabase.auth.signInWithOtp({ email }); if(error) setMsg(error.message); else setMsg('Magic link sent'); }
  return (<div className="container"><h2>Sign in</h2><div className="card"><form onSubmit={send}><input className="search-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" /><div style={{marginTop:8}}><button className="add-btn" type="submit">Send magic link</button></div></form><div style={{marginTop:8}}>{msg}</div></div></div>);
}
