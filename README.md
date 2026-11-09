# TEACH YOU — Full Starter Website

A responsive Arabic/English learning platform starter built with React, Vite, Supabase and Framer Motion.

## Included
- Responsive dark/purple interface with optional light theme.
- Arabic / English switch with RTL / LTR layout.
- Home dashboard, course library, learning paths, course details and lesson pages.
- Demo lessons for HTML, CSS and JavaScript.
- Lesson completion and progress tracking.
- Interactive HTML/CSS/JS playground.
- Supabase email/password signup and login.
- Student profile and owner dashboard.
- Add courses from the owner dashboard.
- SQL schema with RLS policies in `supabase/schema.sql`.

## 1. Install
Install Node.js 20+ then run:

```bash
npm install
```

## 2. Configure Supabase
Copy `.env.example` to `.env` and fill:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Use the Project URL and Publishable (anon/public) key. Never put a `service_role` key or database password in frontend code.

## 3. Create database tables
Open Supabase Dashboard → SQL Editor → New query.
Run the contents of `supabase/schema.sql`.

The script only creates `ty_*` tables and policies. It does not delete or rename your existing tables.

## 4. Make your account the owner
Create an account in the website first. Then run this in SQL Editor, replacing the email:

```sql
update public.ty_profiles
set role = 'owner'
where email = 'YOUR_EMAIL';
```

Sign out and sign back in if the owner menu does not appear immediately.

## 5. Run locally

```bash
npm run dev
```

## 6. Build for deployment

```bash
npm run build
```

Deploy the `dist` directory to Vercel or another static hosting provider. Add the same environment variables in your hosting dashboard.

## Important current V1 limitations
- The sample lesson content is bundled in `src/data.js`. Courses created in the owner dashboard are saved in Supabase, but the student course catalogue still uses the bundled sample courses. Dynamic course/lesson authoring and display are the next integration step.
- Quiz UI currently checks the sample HTML question locally; quiz attempt history is not yet wired to Supabase.
- Learning progress for bundled sample lessons is saved to Supabase after login; in demo mode it stays in browser localStorage only if added in a future enhancement (currently in-memory).
- The owner dashboard can list profiles and add courses, but does not yet include full lesson editor, user moderation or analytics exports.
- Run `npm run build` and test signup/login in your own Supabase project before publishing.
