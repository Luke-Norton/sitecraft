# TASK 001 — Multi-Page Generation

## Goal
Extend the generation pipeline to support multi-page websites. Instead of outputting
a single HTML string, Claude should output multiple named pages with a shared navigation
component that links them together.

## Background
Currently `promptBuilder.js` constructs a prompt that results in one self-contained
HTML file. The `build.js` route streams this directly and saves it as `generated_html`
in Supabase. Multi-page support requires a structured output format, a way to store
multiple pages, and a way to preview/navigate between them on the BuildPage.

## Acceptance Criteria
- [x] User can indicate they want a multi-page site (e.g. Home, About, Services, Contact)
- [x] Claude outputs structured JSON containing each page as a named HTML string
- [x] All pages share a consistent nav component with working internal links
- [x] Each page is self-contained HTML (Tailwind CSS inline, no external dependencies)
- [x] Pages are stored in Supabase — either as a JSONB column or separate rows
- [x] BuildPage can preview each page with a tab or dropdown to switch between them
- [x] Existing single-page flow is not broken

## Approach

### Step 1 — Output format
Modify `promptBuilder.js` to instruct Claude to return structured JSON in this shape:
```json
{
  "pages": [
    { "name": "index", "title": "Home", "html": "<!DOCTYPE html>..." },
    { "name": "about", "title": "About", "html": "<!DOCTYPE html>..." }
  ]
}
```
Wrap the JSON in a clear delimiter so the SSE stream can be parsed reliably.

### Step 2 — Backend parsing
Modify `build.js` to:
- Accumulate the full SSE stream
- Parse the JSON structure on completion
- Save pages to Supabase (add a `pages` JSONB column to submissions)
- Keep `generated_html` populated with the index page for backwards compatibility

### Step 3 — Supabase schema
Add column to submissions table:
```sql
ALTER TABLE submissions ADD COLUMN pages JSONB DEFAULT '[]';
```

### Step 4 — Frontend preview
Modify `BuildPage.jsx` to:
- Detect if response contains multiple pages
- Render a page switcher (tabs or dropdown)
- Preview each page in the iframe

## Files to Touch
- `backend/services/promptBuilder.js` ← highest risk, be surgical
- `backend/routes/build.js`
- `backend/services/supabase.js` — update save logic
- `frontend/src/pages/BuildPage.jsx`
- `frontend/src/hooks/useFormState.js` — add page selection fields if needed
- Supabase migration (write SQL, do not run automatically)

## Gotchas
- Do NOT refactor promptBuilder.js — make targeted additions only
- The SSE stream is raw text — JSON parsing must happen after stream completes, not mid-stream
- Internal links between pages must use relative paths (e.g. `./about.html`) so they work on Vercel
- Single-page mode must still work exactly as before — this is additive, not a replacement

## Definition of Done
A user can generate a 3-page site (Home, About, Contact), switch between page previews
on the BuildPage, and each page has a working nav linking to the others.

## Implementation Status (2026-03-05)
**COMPLETE** - All acceptance criteria met.

Files modified:
- `useFormState.js`: Added `multiPage` and `pages` fields with dynamic page management functions (`addPage`, `removePage`, `moveSectionToPage`)
- `IntakeForm.jsx`: Submits multi-page settings with section assignments, auto-assigns unassigned sections to Home
- `submit.js`: Parses and saves multi_page, site_pages, generated_pages
- `promptBuilder.js`: Added `buildMultiPagePrompt()` for JSON output with per-page section assignments
- `build.js`: Parses JSON response, stores pages array
- `BuildPage.jsx`: Page switcher tabs in preview header
- `deploy.js` + `vercel.js`: Multi-page deployment support
- `Step5Structure.jsx`: Dynamic page creation UI with section-to-page assignment dropdowns

**Key Features:**
- Users can add any number of custom pages (not limited to predefined options)
- Each section has a dropdown to assign it to a specific page
- Unassigned sections automatically go to the Home page
- Pages can be removed (sections move back to Home)

**To deploy:**
Run SQL migration: `backend/migrations/001_add_multipage_columns.sql`
