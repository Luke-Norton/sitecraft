# TASK 005 — Integrated Website Tools (Forms, Calendars, Booking)

## Goal
Allow users to include functional tools — contact forms, booking widgets, calendars,
and other interactive elements — in their generated websites. These should be
embedded via third-party services so they work immediately without custom backend code.

## Background
Static generated HTML is great for presentation but users need their sites to actually
do things — collect leads, let customers book appointments, display availability.
The cleanest approach is to integrate with best-in-class third-party embed services
rather than building custom form/calendar backends.

## Acceptance Criteria
- [ ] User can opt into one or more tools during the intake form (Step: Tools/Features)
- [ ] Each tool has a simple setup — user provides minimal config (e.g. email address for forms)
- [ ] Generated HTML includes the correct embed code for selected tools
- [ ] Tools render and function correctly in the deployed Vercel site
- [ ] Tools are optional — sites without them are unaffected

## Supported Tools (Phase 1)

### Contact Form
- Provider: Formspree (https://formspree.io) — free tier available
- User provides: their email address
- Embed: `<form action="https://formspree.io/f/{id}" method="POST">`
- What Claude generates: a styled form that submits to Formspree

### Booking / Appointments
- Provider: Calendly embed
- User provides: their Calendly URL
- Embed: Calendly inline widget script
- What Claude generates: a booking section with the Calendly widget

### Calendar / Hours Display
- No third-party needed — Claude generates a static hours/availability display
- User provides: business hours in the intake form

### Live Chat (optional, Phase 2)
- Provider: Tawk.to
- User provides: Tawk.to property ID

## Approach

### Step 1 — Intake form additions (follow TASK_004 field chain)
Add a new step or expand an existing step with tool selections:
```
- [ ] Contact form (requires: email address)
- [ ] Booking widget (requires: Calendly URL)
- [ ] Business hours display (requires: hours input)
```

New fields needed:
- `include_contact_form` (boolean)
- `contact_form_email` (text)
- `include_booking` (boolean)
- `calendly_url` (text)
- `business_hours` (JSONB — days + open/close times)

### Step 2 — Prompt builder extensions
Add a section to `promptBuilder.js` that conditionally adds tool instructions:

```js
if (data.include_contact_form && data.contact_form_email) {
  prompt += `
    Include a contact form section using Formspree.
    Form action: https://formspree.io/f/[USER_CONFIGURES_THIS]
    The form should collect: name, email, message.
    Style it consistently with the rest of the site.
  `;
}

if (data.include_booking && data.calendly_url) {
  prompt += `
    Include a booking section with a Calendly inline widget.
    Calendly URL: ${data.calendly_url}
    Include the Calendly embed script and render the inline widget.
  `;
}
```

### Step 3 — Supabase schema additions
```sql
ALTER TABLE submissions ADD COLUMN include_contact_form BOOLEAN DEFAULT false;
ALTER TABLE submissions ADD COLUMN contact_form_email TEXT;
ALTER TABLE submissions ADD COLUMN include_booking BOOLEAN DEFAULT false;
ALTER TABLE submissions ADD COLUMN calendly_url TEXT;
ALTER TABLE submissions ADD COLUMN business_hours JSONB DEFAULT '{}';
```

### Step 4 — Validation
- If user selects contact form, `contact_form_email` is required before proceeding
- If user selects booking, `calendly_url` is required and must be a valid Calendly URL
- Add validation in the relevant Step component and in `submit.js`

## Files to Touch
- `frontend/src/hooks/useFormState.js`
- `frontend/src/pages/IntakeForm.jsx`
- `frontend/src/components/steps/` — add new step or extend existing
- `backend/routes/submit.js`
- `backend/services/promptBuilder.js` ← add tool sections at the end, clearly commented
- Supabase migration SQL

## Gotchas
- Formspree forms require the user to verify their email on Formspree's side — document
  this clearly in the UI so users know to do it after deploying
- Calendly URLs vary in format — accept both `https://calendly.com/user` and
  `https://calendly.com/user/30min` formats
- Do NOT build a custom form backend — always use Formspree or equivalent
- Test embeds in the deployed Vercel site, not just the local preview iframe —
  some embeds behave differently in iframes
- Keep Phase 2 tools (live chat) out of scope for this task

## Definition of Done
User selects "Contact Form" in the intake form, provides their email, generates
a site, and the deployed site has a working Formspree contact form that sends
emails to their address.
