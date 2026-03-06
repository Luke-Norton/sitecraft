# TASK 003 — Site Management & Version Control

## Goal
Give users a dashboard where they can see all their generated sites, view version
history, restore a previous version, and redeploy — all without filling out the
intake form again.

## Background
Currently there is no way for a user to return to a site they built. Every session
is stateless from the user's perspective. This task adds the "management" layer
that turns Bespoke from a one-shot generator into an ongoing platform.

## Acceptance Criteria
- [ ] A "My Sites" dashboard page lists all past submissions with name, status, and deployed URL
- [ ] Each site has a detail page showing current version and version history
- [ ] Users can view any past version of the generated HTML
- [ ] Users can restore a previous version (makes it the current version)
- [ ] Users can redeploy the current version without regenerating
- [ ] Users can request a new revision from the site detail page
- [ ] Version history is stored in Supabase

## Approach

### Step 1 — Versions table
Create a `versions` table to store snapshots of generated HTML:
```sql
CREATE TABLE versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id),
  version_number INTEGER NOT NULL,
  generated_html TEXT,
  pages JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  label TEXT -- optional user label e.g. "before color change"
);

CREATE INDEX idx_versions_submission ON versions(submission_id, version_number DESC);
```

### Step 2 — Auto-save versions
Modify `build.js` and `revise.js` to write a new version row every time
HTML is generated or revised. Increment version_number automatically.

### Step 3 — My Sites dashboard
Create `frontend/src/pages/Dashboard.jsx`:
- Fetch all submissions from `/api/sites`
- Show cards: business name, status badge, deployed URL, "Manage" button
- Add route in React Router

### Step 4 — Site detail page
Create `frontend/src/pages/SiteDetail.jsx`:
- Show current generated HTML in preview iframe
- Show version history list (version number, date, label)
- "View" button per version — loads that version's HTML into preview
- "Restore" button — sets that version as current in submissions table
- "Redeploy" button — calls `/api/deploy` with current version
- "Request Revision" — opens revision input, calls `/api/revise`

### Step 5 — New backend routes
- `GET /api/sites` — returns all submissions (paginated)
- `GET /api/sites/:id` — returns single submission with versions
- `POST /api/sites/:id/restore` — sets a version as current
- `GET /api/sites/:id/versions` — returns version list

## Files to Touch
- `backend/routes/build.js` — save version on generate
- `backend/routes/revise.js` — save version on revise
- `backend/routes/deploy.js` — update to use current version
- `backend/src/index.js` — register new routes
- `frontend/src/pages/Dashboard.jsx` ← new file
- `frontend/src/pages/SiteDetail.jsx` ← new file
- `frontend/src/lib/api.js` — add new API calls
- Supabase migration (versions table above)

## Gotchas
- Version numbers should be per-submission, not global — use a subquery or sequence
- Don't delete old versions when restoring — just update `submissions.generated_html`
- The preview iframe needs `srcdoc` attribute to render raw HTML without a URL
- Keep Dashboard and SiteDetail as separate routes — don't cram into existing pages
- Auth is not in scope for this task — no login required yet

## Definition of Done
User can visit `/dashboard`, see their past sites, click into one, see 3 past
versions, restore version 1, and redeploy — all without touching the intake form.
