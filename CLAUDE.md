# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.
Read this fully before making any changes.

## What Bespoke Is

Bespoke is an AI-powered website builder. Users describe their business through
a multi-step intake form, and Claude generates a complete, production-ready website
that can be deployed directly to Vercel. The core value proposition is that a
non-technical business owner can go from zero to a live website in minutes.

## What Bespoke Is NOT (do not drift into these)

- Not a drag-and-drop editor — users describe, AI builds
- Not a React/Vue site generator — output is always single-file HTML + Tailwind CSS
- Not a general purpose AI chat interface — the intake form is the primary UX
- Not a CMS — Bespoke manages versions and deployments, not ongoing content editing

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express (ES6 modules) |
| Database + Storage | Supabase (Postgres + file storage) |
| AI | Anthropic Claude API — always use `claude-sonnet-4-20250514` |
| Deployment target | Vercel API |

**Never switch or propose switching any of these without explicit instruction.**

---

## Architecture

### Monorepo Structure
```
/
├── CLAUDE.md
├── STATUS.md          ← read this every session
├── frontend/          ← React + Vite
├── backend/           ← Express
├── docs/              ← architecture, decisions, PRD
└── tasks/             ← units of work
```

### Frontend Key Paths
- `src/pages/IntakeForm.jsx` — Multi-step form (6 steps: Business, Goal, Content, Style, Structure, Review)
- `src/pages/BuildPage.jsx` — Real-time generation with live preview
- `src/hooks/useFormState.js` — Central form state, all field definitions live here
- `src/components/steps/` — Step1Business, Step2Goal, etc.
- `src/lib/api.js` — All backend API calls

### Backend Key Paths
- `src/index.js` — Express server entry point
- `src/routes/submit.js` — Form submission + file uploads to Supabase
- `src/routes/build.js` — Streams generated HTML via SSE
- `src/routes/revise.js` — Handles revision requests
- `src/routes/deploy.js` — Deploys to Vercel
- `src/services/promptBuilder.js` — Constructs Claude prompt from form data (~750 lines, HIGH RISK)
- `src/services/claude.js` — Claude API integration (streaming)
- `src/services/supabase.js` — DB and storage operations
- `src/services/vercel.js` — Vercel deployment API

### Critical Data Flow
```
IntakeForm (React state)
  → POST /api/submit       → Supabase submissions table + assets bucket
  → GET  /api/build/:id    → Claude API (SSE stream) → generated_html saved
  → POST /api/revise       → Claude API (SSE stream) → updated generated_html
  → POST /api/deploy       → Vercel API → deployed_url saved
```

### The Form Field Chain (NEVER break this)
When adding or modifying any form field, it must be updated in ALL of these:
1. `useFormState.js` — add to initialState
2. `IntakeForm.jsx` — add to submit payload
3. `backend/routes/submit.js` — add to parsing/saving logic
4. `backend/services/promptBuilder.js` — add to prompt construction

Missing any step silently breaks the pipeline. Always update all four.

### Database
- Main table: `submissions` — all form data as columns, JSONB for complex fields
- Storage bucket: `assets` (public) — logos and photos
- **Never create new tables without explicit instruction** — extend submissions first
- **Never modify the schema directly** — always write a migration comment first

---

## Non-Negotiables (never violate these)

- **SSE for streaming** — never replace with websockets or polling
- **Single-file HTML output** — generated sites are always one self-contained file
- **claude-sonnet-4-20250514** — never change the model without instruction
- **promptBuilder.js is the highest-risk file** — make surgical changes only, never refactor it wholesale
- **No new npm packages** without flagging it first — keep dependencies lean
- **Never touch .env files** — only reference `.env.example`

---

## Current Product Roadmap (in priority order)

1. **Multi-page generation** — extend beyond single-page HTML output
2. **Full deployment pipeline** — robust Vercel deploy with error handling and status tracking
3. **Site management / version control** — users can view history, restore versions, redeploy
4. **Intake form evolution** — ongoing refinement of form UX and fields
5. **Integrated website tools** — forms, calendars, booking widgets embedded in generated sites

See `STATUS.md` for what is currently built, in progress, or broken.

---

## Code Conventions

- ES6 modules throughout (import/export, not require)
- Async/await over promise chains
- Backend routes stay thin — logic lives in services
- Frontend components stay presentational where possible — logic in hooks
- Always handle SSE errors gracefully — the stream can drop

---

## Testing

Run all tests from root:
```bash
npm test
```

Run backend tests only:
```bash
npm run test:backend
```

Run frontend tests only:
```bash
npm run test:frontend
```

Watch mode (development):
```bash
cd backend && npm test
cd frontend && npm test
```

### Test Coverage
- **Backend (56 tests)**: promptBuilder, submit route, Vercel service
- **Frontend (72 tests)**: useFormState hook, API functions, Button, FormField components

### Test Files
- `backend/tests/` — Vitest tests for services and routes
- `frontend/tests/` — Vitest + React Testing Library for hooks and components

---

## Environment Variables

**Backend:** `ANTHROPIC_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `VERCEL_API_TOKEN`
**Frontend:** `VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

Reference `.env.example` only. Never hardcode credentials.

---

## Before Starting Any Task

1. Read `STATUS.md` to understand current state
2. Read the relevant task file in `/tasks` if one exists
3. Identify which files will be touched and check for ripple effects
4. If the task touches `promptBuilder.js`, plan changes carefully before writing any code
5. After completing work, update `STATUS.md`
