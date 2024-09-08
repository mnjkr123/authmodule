## Xisen React Next js template

themeforest profile link

```bash
https://themeforest.net/user/theme_pure/portfolio
```

Database Information:
C:\Webapp-Development\authentication-module\src\pages\api\supabaseCleint.js

AuthProvider
AuthContext.jsx - You add this also.

# Register

Connected with Supabase. It also loads the Profiles table in Supabase.
Email server - admin@pluggai.com - password - Irvine123%
The Id column in Profiles table doesn't have the foreign Key constraint with the - https://supabase.com/dashboard/project/owkohxbrbejjwqfzxqzu/editor/30080?schema=public
User authentication table - id field. But Both have same values. - https://supabase.com/dashboard/project/owkohxbrbejjwqfzxqzu/auth/users
This action is being performed by auth-callback.jsx function.

So, the user registers into the website and authentication table in supabase gets updated witgh waiing for verification
User goes and bverifies the email
authentication table gets updated and user id gets generatedc( user id gets generated only when the user verifies his email) and os technically you will not have a user id until the user has verified his email id.
Profile table is still not updated.

Now when the user logs in with the email id and password then loggin in happens and then auth-callback.jsx gets triggered whcih updates the Profiels table in Supabase
with the same user id as what is there in the authentication table.
Once profile tables gets updated then the latest profile information gets picked up and shows up on the profile tab.

npm run uuid
npm run dev

You can also install database and not use Supabase by installing - npx install init
Generates a new folder in the project and add database_url in the .env file.
This database_url can come from Planet Scale Database. Or you can aslo use neon.tech database - It is serverless Postgres database.
npx prisma db push
npx prisma generate
