-- Migration: Add multi-page support columns
-- Run this in your Supabase SQL editor

-- Add multi-page settings
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS multi_page boolean DEFAULT false;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS site_pages JSONB DEFAULT '[]';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS generated_pages JSONB DEFAULT '[]';

-- Comment explaining the columns
COMMENT ON COLUMN submissions.multi_page IS 'Whether this is a multi-page site';
COMMENT ON COLUMN submissions.site_pages IS 'Array of { name, title, enabled } page definitions from intake form';
COMMENT ON COLUMN submissions.generated_pages IS 'Array of { name, title, html } generated pages from Claude';
