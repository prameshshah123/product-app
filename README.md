CPack — Next.js + Supabase app (Magic link auth)
===============================================

This project is a ready-to-deploy Next.js + Supabase scaffold.
It uses Supabase Auth (magic link), searchable lookups, multi-select special effects, image upload to Supabase Storage,
and a small user_roles table for admin/user roles.

---
Quick deploy (web-only, no terminal)
1. Create a new GitHub repo and upload the contents of this project (drag & drop in GitHub web UI).
2. Go to Vercel -> New Project -> Import from GitHub -> select this repo.
3. Set environment variables in Vercel (Project Settings → Environment Variables):
   - NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   - SUPABASE_SERVICE_ROLE_KEY = your-service-role-key  (server-side secret)
4. Deploy. After first deploy, set Supabase Auth Site URL to your Vercel URL under Supabase → Authentication → Settings.
5. Ask each user to sign in once (magic link). After they sign in, run the SQL in `/sql/seed_roles.sql` to assign roles.

Notes
- Do NOT put the service role key into client-side code or public repos.
- The API route `/api/search` uses the service role key (server-side) for secure lookups.
- Admin email (to be made admin): creativepackaging2@gmail.com
- Other users: saahilshah123@gmail.com, prameshshah@gmail.com, saahiljg@gmail.com

If you want me to finish deploy steps interactively, tell me and I'll walk you through each click.