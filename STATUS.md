# STATUS.md

This file is the source of truth for current project state.
**Update this file at the end of every Claude Code session.**
Claude Code should read this before starting any work.

---

## Last Updated
2026-03-07 (GitHub repo selector)

---

## What Is Working

- [x] Multi-step intake form (6 steps: Business, Goal, Content, Style, Structure, Review)
- [x] Form data submission to Supabase
- [x] File uploads (logo, photos) to Supabase assets bucket
- [x] Single-page HTML generation via Claude API
- [x] Multi-page HTML generation — delimiter-based output, dynamic page/section assignment
- [x] Photos (uploaded + assigned) correctly injected into both single-page and multi-page prompts
- [x] SSE streaming on BuildPage (real-time generation preview)
- [x] Basic revision loop — AI plan message in chat, iframe updates only on completion (no streaming flash)
- [x] Basic Vercel deployment
- [x] Auth & login — Supabase email/password auth; protected routes; JWT verification on all API endpoints
- [x] GitHub integration — OAuth connect, push to GitHub; repo dropdown selects from actual repos; existing repo overwrite support; last-used repo remembered per site
- [x] Test suite (134 tests: 62 backend, 72 frontend)

---

## In Progress / Partially Working

- [ ] **Deployment pipeline** — basic deploy works but needs error handling, status tracking, retry logic
- [ ] **Intake form** — functional but still being refined; field structure may change

---

## Known Broken / Not Yet Built

- [ ] Site management dashboard — users cannot currently view or manage past sites
- [ ] Version history — no versioning system exists yet
- [ ] Redeploy from dashboard — not built
- [ ] Integrated tools (forms, calendars, booking widgets) — not started

---

## Current Focus

> Auth is live. Users must sign in to access /create and /build/:id. Generation loop, revisions, and deployment all work end-to-end with auth.

---

## Recent Decisions

| Date | Decision | Reason |
|------|----------|--------|
| 2026-03-07 | Auth via Supabase (email/password) | Free, no new packages, JWT verification on backend via supabase.auth.getUser() |
| 2026-03-07 | GitHub repo dropdown instead of text input | Users select from their actual repos; avoids typos/conflicts; matches Bolt/Base44 UX; existing repos supported via file SHA lookup |
| 2026-03-07 | EventSource passes token as ?token= query param | Native EventSource cannot set Authorization headers |
| 2026-03-06 | AI plan message in revision chat | Claude emits a PLAN: line first so user sees intent immediately; iframe no longer flashes partial HTML during revision |
| 2026-03-06 | Photo section added to buildMultiPagePrompt() | Photos were silently omitted from multi-page prompts; now mirrors single-page logic |
| 2026-03-05 | Multi-page output uses delimiter format (===PAGE_START===, etc.) | Enables reliable parsing after SSE stream completes |
| 2026-03-05 | Pages use relative paths (./about.html) for nav links | Works correctly when deployed to Vercel |
| 2026-03-05 | Single-page flow untouched, multi-page is additive | Preserves existing functionality |
| 2026-03-05 | Dynamic page creation instead of predefined pages | Users can create any pages they want and assign sections freely |

---

## Fragile Areas — Be Careful

- `promptBuilder.js` — 1000+ lines, central to everything, easy to break silently
- SSE streaming in `build.js` — error handling is minimal, don't restructure without care
- Form field chain — adding fields requires 4 simultaneous file changes (see CLAUDE.md)
- Supabase submissions schema — columns map directly to form fields, changing one breaks the other

---

## Next Planned Tasks

> Ordered by priority.

1. Deployment pipeline hardening — error states, retry, deployment status polling
2. Site management UI — dashboard to view past submissions, versions, deployed URLs
3. Version control system — save snapshots of generated_html with timestamps
4. Intake form iteration — ongoing UX refinement
5. Integrated tools — forms, calendars, booking widgets in generated output
