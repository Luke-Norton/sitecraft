# STATUS.md

This file is the source of truth for current project state.
**Update this file at the end of every Claude Code session.**
Claude Code should read this before starting any work.

---

## Last Updated
2026-03-07 (device preview, integrations, Google auth)

---

## What Is Working

- [x] Multi-step intake form (6 steps: Business, Goal, Content, Style, Structure, Review)
- [x] Form data submission to Supabase
- [x] File uploads (logo, photos) to Supabase assets bucket
- [x] Single-page HTML generation via Claude API
- [x] Multi-page HTML generation -- delimiter-based output, dynamic page/section assignment
- [x] Photos (uploaded + assigned) correctly injected into both single-page and multi-page prompts
- [x] SSE streaming on BuildPage (real-time generation preview)
- [x] Basic revision loop -- AI plan message in chat, iframe updates only on completion (no streaming flash)
- [x] Basic Vercel deployment
- [x] Auth & login -- Supabase email/password + Google OAuth; protected routes; JWT verification on all API endpoints
- [x] GitHub integration -- OAuth connect, push to GitHub; repo dropdown selects from actual repos; existing repo overwrite support; last-used repo remembered per site
- [x] Test suite (134 tests: 62 backend, 72 frontend)
- [x] Step 5 (Structure) overhaul -- inline section variant picker, per-section content editing, header style selector
- [x] Third-party integrations -- Formspree contact form (live form action) and Calendly booking widget injected into prompt and generated HTML
- [x] Device preview simulation -- Desktop / Tablet (768x1024) / Mobile (390x844) switcher on BuildPage; true viewport constraint via iframe width + fixed height

---

## In Progress / Partially Working

- [ ] **Deployment pipeline** -- basic deploy works but needs error handling, status tracking, retry logic
- [ ] **Intake form** -- functional but still being refined; field structure may change

---

## Known Broken / Not Yet Built

- [ ] Site management dashboard -- users cannot currently view or manage past sites
- [ ] Version history -- no versioning system exists yet
- [ ] Redeploy from dashboard -- not built
- [ ] Additional integrations -- Formspree + Calendly done; more TBD

---

## Pending DB Migration

```sql
-- Required for integrations field (not yet run in production)
ALTER TABLE submissions ADD COLUMN integrations jsonb DEFAULT '{}'::jsonb;
```

---

## Current Focus

> Auth is live (email + Google). Integrations (Formspree, Calendly) are wired through the full pipeline. Device preview on BuildPage is complete with true viewport simulation.

---

## Recent Decisions

| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-07 | Device preview uses fixed iframe dimensions (390x844, 768x1024) | True viewport simulation -- 100vh and media queries respond correctly inside the iframe |
| 2026-03-07 | Formspree + Calendly injected via promptBuilder | Real integrations embedded in generated HTML; no JS handling needed for Formspree (action attr handles it) |
| 2026-03-07 | Google OAuth on LoginPage via Supabase signInWithOAuth | No extra packages; Supabase handles the OAuth flow natively |
| 2026-03-07 | Step5 inline section editor replaces separate SectionPicker + SectionContentEditor | Reduces navigation steps; variant picker and content editor are co-located per section |
| 2026-03-07 | Auth via Supabase (email/password) | Free, no new packages, JWT verification on backend via supabase.auth.getUser() |
| 2026-03-07 | GitHub repo dropdown instead of text input | Users select from their actual repos; avoids typos/conflicts |
| 2026-03-07 | EventSource passes token as ?token= query param | Native EventSource cannot set Authorization headers |
| 2026-03-06 | AI plan message in revision chat | Claude emits a PLAN: line first so user sees intent immediately |
| 2026-03-06 | Photo section added to buildMultiPagePrompt() | Photos were silently omitted from multi-page prompts |
| 2026-03-05 | Multi-page output uses delimiter format (===PAGE_START===, etc.) | Enables reliable parsing after SSE stream completes |
| 2026-03-05 | Pages use relative paths (./about.html) for nav links | Works correctly when deployed to Vercel |
| 2026-03-05 | Dynamic page creation instead of predefined pages | Users can create any pages they want and assign sections freely |

---

## Fragile Areas -- Be Careful

- `promptBuilder.js` -- 1000+ lines, central to everything, easy to break silently
- SSE streaming in `build.js` -- error handling is minimal, don't restructure without care
- Form field chain -- adding fields requires 4 simultaneous file changes (see CLAUDE.md)
- Supabase submissions schema -- columns map directly to form fields; `integrations` column migration still needed in production

---

## Next Planned Tasks

> Ordered by priority.

1. Run `integrations` column migration in production Supabase
2. Deployment pipeline hardening -- error states, retry, deployment status polling
3. Site management UI -- dashboard to view past submissions, versions, deployed URLs
4. Version control system -- save snapshots of generated_html with timestamps
5. Intake form iteration -- ongoing UX refinement
