# TODOS — Next.js + Supabase

A modern Todo application built with **Next.js (App router)** and **Supabase** for authentication and data persistence. This README reflects the updated app: users can sign up / sign in with Supabase Auth, then create and view their todos stored in a Supabase Postgres table. The frontend uses Tailwind CSS and Shadcn UI components.

---

## 🚀 What’s included (high level)

* ✅ **User Authentication** — Sign up / Sign in / Sign out using Supabase Auth (email + magic link / password)
* ✅ **Create & View Todos** — CRUD operations for todos stored in Supabase Postgres
* ✅ **Row-level Security (RLS)** — Todos are private to each user via Supabase RLS policies
* ✅ **Realtime updates** — UI auto-updates when todos change (Supabase Realtime)
* ✅ **Next.js App Router** — Server components + client components where appropriate
* ✅ **Tailwind CSS & Shadcn UI** — Fast, accessible UI primitives
* ✅ **TypeScript** — Type-safe codebase

---

## 🧭 Features (user-facing)

* Register / login with email
* Create, read, and mark todos as complete/incomplete
* View a list of your todos and individual todo detail pages
* Real-time sync across browser tabs/devices
* Pagination / infinite scroll (optional, configurable)
* Basic search and filter by completion status

---

## 🛠️ Tech Stack

**Frontend**

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Shadcn UI components
* React Query / TanStack Query (optional; caching)
* supabase-js (Supabase client)

**Backend / Database (hosted by Supabase)**

* Postgres (Supabase)
* Supabase Auth (email/password & magic link)
* Realtime (via Supabase)
* Row-Level Security (RLS) policies for data protection

---

## 📦 Installation & Setup

### Prerequisites

* Node.js 18+ (recommended)
* npm (or yarn / pnpm)
* Supabase account ([https://supabase.com](https://supabase.com))

### 1) Clone & install

```bash
git clone https://github.com/AJ1732/altSchool-tinyuka-2024--2nd-semester-exam.git
cd altSchool-tinyuka-2024--2nd-semester-exam
npm install
```

### 2) Create a Supabase project

1. Go to [https://app.supabase.com](https://app.supabase.com) and create a new project.
2. Create a new database (default settings are fine for dev).

### 3) Add environment variables

Create a `.env.local` file in the project root with the following (replace values from your Supabase project settings):

```
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key  # only if you run server-side privileged tasks (keep secret)
NEXTAUTH_SECRET=some-secret-if-using-nextauth (optional)
```

> **Security note:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` is intended to be public (the `NEXT_PUBLIC_` prefix), while `SUPABASE_SERVICE_ROLE_KEY` must remain secret and should **never** be exposed to the browser. Configure access carefully.

### 4) Database schema (create `todos` table)

Use Supabase SQL Editor (or run via psql) and create the `todos` table:

```sql
create table public.todos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  description text,
  completed boolean default false not null,
  priority smallint default 0,
  due_date timestamptz,
  inserted_at timestamptz default now()
);
```

Enable Row-Level Security and add policies so users can only manage their own todos.

```sql
-- enable rls
alter table public.todos enable row level security;

-- allow authenticated users to insert todos where they are the owner
create policy "insert_own_todos" on public.todos
  for insert using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- allow authenticated users to select their own todos
create policy "select_own_todos" on public.todos
  for select using (auth.uid() = user_id);

-- allow update/delete only by owner
create policy "modify_own_todos" on public.todos
  for update, delete using (auth.uid() = user_id);
```

> If you want to let server-side code (using service role) bypass RLS for administrative tasks, use the `SUPABASE_SERVICE_ROLE_KEY` only on the server.

### 5) Run dev server

```bash
npm run dev
# or if you use next's default port
# open http://localhost:3000
```

---

## 🔧 Supabase client usage (example)

Install supabase client:

```bash
npm install @supabase/supabase-js
```

**Create a simple client helper** (`/lib/supabaseClient.ts`):

```ts
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anonKey);
```

**Example: fetching todos in a server component** (`app/todos/page.tsx` — server component):

```tsx
import { supabase } from '@/lib/supabaseClient';

export default async function TodosPage() {
  // For server components, you can fetch public data, but private data should be
  // fetched with server-side auth helpers or in client components after sign-in.
  const { data, error } = await supabase.from('todos').select('*').order('inserted_at', { ascending: false }).limit(50);

  if (error) throw new Error(error.message);

  return (
    <div>
      {/* render todos */}
    </div>
  );
}
```

**Example: creating a todo from a client component**:

```tsx
'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const user = supabase.auth.user(); // client-side currently logged in user
    const { error } = await supabase.from('todos').insert({ title, user_id: user?.id });
    setLoading(false);
    if (error) return alert(error.message);
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add todo" />
      <button disabled={loading}>Add</button>
    </form>
  );
}
```

> Note: The above `supabase.auth.user()` pattern is for older `supabase-js` versions. Consider using the realtime auth hooks or server-side auth helpers provided by Supabase/Next.js adapter for the latest approach.

---

## 🔐 Protecting routes & server actions

* Use Supabase client on the server (with `server` environment and `SUPABASE_SERVICE_ROLE_KEY` if needed) for privileged operations.
* For the App Router, use server actions or `cookies()` to read session tokens on the server and render protected pages server-side.
* Use client-side `useEffect` listeners or Supabase auth state change listeners to update UI after sign-in/sign-out.

---

## 🧩 Realtime subscriptions

To receive live updates across tabs/devices, use Supabase Realtime subscriptions in a client component:

```ts
useEffect(() => {
  const sub = supabase
    .from(`todos:user_id=eq.${userId}`)
    .on('*', payload => {
      // update local state / refetch
    })
    .subscribe();

  return () => { supabase.removeSubscription(sub); };
}, [userId]);
```

---

## 🧪 Testing & Debugging tips

* Use Supabase SQL editor to check rows and policies.
* Useful CLI queries:

  * `supabase projects list` (if using supabase CLI)
* When RLS blocks access, check logs and try a query from Supabase SQL editor to confirm behavior.

---

## ✅ Deployment

**Vercel** (recommended for Next.js):

1. Push repo to GitHub.
2. Create a new Vercel project and connect the repo.
3. Add the environment variables in the Vercel dashboard (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` if used on server).
4. Deploy — Vercel will build and serve the Next.js app.

**Supabase Edge Functions** (optional): use for server-side operations needing the service role key while avoiding exposing it to the browser.

---

## 🗂️ Project structure (recommended)

```
app/
├── layout.tsx
├── page.tsx
├── todos/
│   ├── page.tsx         # /todos — server component listing todos
│   ├── [id]/page.tsx    # /todos/:id — todo detail
│   └── components/      # AddTodo, TodoItem, TodoList (client components)
lib/
├── supabaseClient.ts
├── supabaseServer.ts    # server-only supabase client (uses service role)
components/
├── ui/                  # shadcn UI primitives & buttons
styles/
├── globals.css
```

---

## 🐛 Known Issues & Gotchas

* If you accidentally use the service role on the client, you will expose secrets — never do this.
* Make sure RLS policies are configured; otherwise users may see other users' todos.
* Realtime subscriptions can produce a lot of events on large datasets — consider filtering.

---

## 🔮 Future Improvements

* Add due-date reminders & notifications
* Bulk actions (select/delete)
* Drag & drop reordering
* Offline support (IndexedDB + background sync)
* Webhooks or server-side processing for more complex workflows

---

## ❤️ Credits

Built and maintained by **Ejemen (AJ1732)**.

---

If you want, I can also:

* Add the exact SQL migration file (SQL + pwned RLS policies)
* Provide ready-to-drop-in `supabaseClient.ts` and an example `AddTodo` component using the latest `supabase-js` patterns
* Generate a `postcss/tailwind` setup snippet and sample page demonstrating protected server rendering

Tell me which of the above you want next and I'll add it into the repo README file.
