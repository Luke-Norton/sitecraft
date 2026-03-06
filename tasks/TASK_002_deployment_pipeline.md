# TASK 002 — Full Deployment Pipeline

## Goal
Harden the existing Vercel deployment into a reliable, observable pipeline. Users
should know exactly what's happening during deployment, see success/failure clearly,
and be able to retry without re-generating their site.

## Background
Basic deployment exists in `backend/routes/deploy.js` and `backend/services/vercel.js`
but it lacks error handling, status tracking, and user feedback. Deployment is a
critical moment for the user — it needs to feel solid.

## Acceptance Criteria
- [ ] Deployment status is tracked in Supabase (`status` column: pending → deploying → deployed → failed)
- [ ] Frontend shows real-time deployment status (not just a spinner)
- [ ] On success, the live URL is displayed prominently with a "Visit Site" button
- [ ] On failure, a clear error message is shown with a "Retry" option
- [ ] Retry works without re-generating the site — uses existing `generated_html`
- [ ] Multi-page sites deploy all pages correctly (each page as a separate file)
- [ ] Deployed URL is saved to `submissions.deployed_url` in Supabase

## Approach

### Step 1 — Status tracking
Update `deploy.js` to write status updates to Supabase at each stage:
- `deploying` — when deployment starts
- `deployed` — on success, save URL
- `failed` — on error, save error message to a new `deploy_error` column

### Step 2 — Frontend status polling
Add polling to `BuildPage.jsx` that checks deployment status every 2 seconds
and updates the UI accordingly. Stop polling on `deployed` or `failed`.

### Step 3 — Error handling
Wrap all Vercel API calls in try/catch. Handle common failure cases:
- Invalid token
- Project name collision (append random suffix if needed)
- Rate limiting (retry with backoff)

### Step 4 — Multi-page deploy
Modify `vercel.js` to handle the `pages` JSONB structure from TASK_001:
- If `pages` exists, deploy each page as a separate file
- If only `generated_html` exists, deploy as `index.html` (backwards compatible)

### Step 5 — Retry button
Add a "Retry Deployment" button on BuildPage that calls `/api/deploy` again
with the existing submission ID — no regeneration needed.

## Files to Touch
- `backend/routes/deploy.js`
- `backend/services/vercel.js`
- `backend/services/supabase.js` — add status update helpers
- `frontend/src/pages/BuildPage.jsx` — status UI, polling, retry button
- Supabase migration:
```sql
ALTER TABLE submissions ADD COLUMN deploy_error TEXT;
```

## Gotchas
- Vercel project names must be unique and URL-safe — sanitize business name before using it
- Don't block the UI thread during deployment — polling should be non-blocking
- The `status` column already exists in the schema — use it, don't add a duplicate
- If TASK_001 is not done yet, skip the multi-page deploy step and leave a TODO comment

## Definition of Done
User clicks deploy, sees status update from "Deploying..." to "Live", gets a
clickable URL. If it fails, they see why and can retry with one click.
