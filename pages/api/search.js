
import { createClient } from '@supabase/supabase-js';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabase = createClient(url, serviceRole);

export default async function handler(req, res) {
  const q = (req.query.q || '').trim();
  const table = (req.query.table || 'categories').trim();
  if (!q) return res.json({ results: [] });

  const allowed = ['categories','customers','paper_types','gsm','sizes','constructions','specifications','delivery_addresses','printers','paperwala','pasting','special_effects'];
  if (!allowed.includes(table)) return res.status(400).json({ error: 'invalid_table' });

  try {
    const { data, error } = await supabase.from(table).select('id,name').ilike('name', `${q}%`).limit(15);
    if (error) throw error;
    res.json({ results: data || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'search_failed' });
  }
}
