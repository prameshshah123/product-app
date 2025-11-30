
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login(){
  const [email,setEmail]=useState('');
  const [msg,setMsg]=useState('');

  async function sendLink(e){
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setMsg('Error: ' + error.message);
    else setMsg('Magic link sent — check your email');
  }

  return (
    <div className="container">
      <h2>Sign in</h2>
      <div className="card">
        <form onSubmit={sendLink}>
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
          <div style={{marginTop:8}}><button className="button" type="submit">Send magic link</button></div>
        </form>
        <div style={{marginTop:8,color:'#333'}}>{msg}</div>
      </div>
    </div>
  );
}
