
-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id serial PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  created_at timestamptz DEFAULT now()
);
