
import { createClient } from '@supabase/supabase-js';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabase = createClient(url, serviceRole);

export default async function handler(req:any, res:any){
  const q = (req.query.q||'').trim(); const table = (req.query.table||'categories');
  if(!q) return res.json({ results: [] });
  const allowed = ['categories','customers','paper_types','gsm','sizes','constructions','specifications','delivery_addresses','printers','paperwala','pasting','special_effects'];
  if(!allowed.includes(table)) return res.status(400).json({ error: 'invalid_table' });
  const { data, error } = await supabase.from(table).select('id,name').ilike('name', `${q}%`).limit(15);
  if(error) return res.status(500).json({ error: 'search_failed' });
  res.json({ results: data || [] });
}
