## Emmet System

This repository contains a generated Node App using ExpressJS, Emmet and NextJS.

All Code is generated, nothing is written manually.

### Get started

First start supabase ( which is the backend used for persistence and authentication / authorization )

```
npx supabase start 
```

Copy the ANON Key from the output and put it into .env.local in the root of the project.

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
```

Start the app

```
npm run dev
```

It will listen on port 3000

Access the app at http://localhost:3000/

All pages except "/" require authentication.

Create a new User at /auth/login

```
http://localhost:3000/auth/login
```
