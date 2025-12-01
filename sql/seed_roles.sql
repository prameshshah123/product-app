
WITH u AS (
  SELECT id, email FROM auth.users WHERE email IN ('creativepackaging2@gmail.com','saahilshah123@gmail.com','prameshshah@gmail.com','saahiljg@gmail.com')
)
INSERT INTO user_roles (user_id, role)
SELECT id, CASE WHEN email='creativepackaging2@gmail.com' THEN 'admin' ELSE 'user' END FROM u;
