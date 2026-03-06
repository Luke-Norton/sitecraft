# TASK 004 — Intake Form Evolution

## Goal
Continuously refine the intake form to collect better signal from users, reduce
friction, and produce higher quality generated sites. This is an ongoing task —
use this file as a template each time you want to iterate on the form.

## Background
The intake form is the primary UX of Bespoke. The quality of what users input
directly determines the quality of what Claude generates. The form is functional
but not yet optimized. This task covers the next planned iteration.

## IMPORTANT — The Form Field Chain
Any field change must be made in ALL FOUR places or it silently breaks:
1. `frontend/src/hooks/useFormState.js` — initialState
2. `frontend/src/pages/IntakeForm.jsx` — submit payload
3. `backend/routes/submit.js` — parsing and saving
4. `backend/services/promptBuilder.js` — prompt construction

Do not add or remove a field without touching all four files.

## Acceptance Criteria for Current Iteration
> [FILL THIS IN — describe exactly what you want to change about the form]

Examples to choose from or replace:
- [ ] Add a "target audience" field so Claude knows who the site is for
- [ ] Add an "existing website URL" field for competitive reference
- [ ] Simplify Step 2 (Goals) — current options are too complex for non-technical users
- [ ] Add a "tone of voice" selector (professional, friendly, bold, minimal)
- [ ] Add the ability to preview a rough style before committing to generation
- [ ] Replace free-text style keywords with a curated visual style picker

## Approach

### Before making any changes
1. Identify exactly which step(s) are changing
2. List every field being added, removed, or renamed
3. Confirm the prompt impact — will this change improve generation quality?

### Adding a new field (checklist)
- [ ] Add to `useFormState.js` initialState with a sensible default
- [ ] Add UI component to the relevant Step component in `src/components/steps/`
- [ ] Add to the submit payload in `IntakeForm.jsx`
- [ ] Add parsing in `backend/routes/submit.js`
- [ ] Add corresponding column to Supabase submissions table (write migration SQL)
- [ ] Add to `promptBuilder.js` in a way that meaningfully affects the output

### Removing a field (checklist)
- [ ] Remove from `useFormState.js` initialState
- [ ] Remove UI from Step component
- [ ] Remove from submit payload in `IntakeForm.jsx`
- [ ] Remove from `backend/routes/submit.js`
- [ ] Remove from `promptBuilder.js`
- [ ] Keep the Supabase column (don't drop columns — just stop writing to them)

## Files to Touch
- `frontend/src/hooks/useFormState.js`
- `frontend/src/pages/IntakeForm.jsx`
- `frontend/src/components/steps/[relevant step]`
- `backend/routes/submit.js`
- `backend/services/promptBuilder.js` ← surgical changes only
- Supabase migration SQL (write it, don't run it automatically)

## Gotchas
- Never refactor promptBuilder.js wholesale — add new field handling at the end
  of the relevant section, clearly commented
- Changing a field name is the same as removing + adding — follow both checklists
- Test the full pipeline after any form change: submit → generate → check that
  the new field appears in the generated site as expected
- Step UX should stay simple — if a step is getting complex, consider splitting it

## Definition of Done
The new/changed fields appear in the form, submit correctly, and produce
a measurably better prompt that results in higher quality generated output.
