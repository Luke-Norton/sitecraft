-- Migration: Add all missing columns to submissions table
-- Run this in your Supabase SQL editor
-- This brings the schema up to date with the current codebase

-- Basic business info (may already exist)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS biz_name text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS biz_desc text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS biz_location text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS site_goal text DEFAULT '';

-- Contact info (may already exist)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS phone text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS email text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS address text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS facebook text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS instagram text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS other_social text DEFAULT '';

-- Style settings
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS color_primary text DEFAULT '#6366f1';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS color_accent text DEFAULT '#f59e0b';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS color_bg text DEFAULT '#ffffff';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS tone text DEFAULT 'professional';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS design_style text DEFAULT 'modern';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS font_pairing text DEFAULT 'auto';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS custom_font text DEFAULT '';

-- Animations and effects (JSONB)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS animations JSONB DEFAULT '{}';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS effects JSONB DEFAULT '{}';

-- Sections (JSONB arrays and objects)
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS sections JSONB DEFAULT '["hero"]';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS section_order JSONB DEFAULT '["hero"]';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS section_variants JSONB DEFAULT '{}';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS section_content JSONB DEFAULT '{}';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS custom_sections JSONB DEFAULT '[]';

-- Header and hero styles
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS header_style text DEFAULT 'standard';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS custom_header_style text DEFAULT '';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS hero_style text DEFAULT 'split';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS custom_hero_style text DEFAULT '';

-- Features
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS include_features JSONB DEFAULT '[]';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS custom_features JSONB DEFAULT '[]';

-- Extra notes
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS extra_notes text DEFAULT '';

-- Assets
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS photo_urls JSONB DEFAULT '[]';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS photo_assignments JSONB DEFAULT '{}';

-- Multi-page support
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS multi_page boolean DEFAULT false;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS site_pages JSONB DEFAULT '[]';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS generated_pages JSONB DEFAULT '[]';

-- Generated output and status
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS generated_html text;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS deployed_url text;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();

-- Add comments for documentation
COMMENT ON COLUMN submissions.custom_font IS 'Custom Google Font name or URL when font_pairing is "custom"';
COMMENT ON COLUMN submissions.multi_page IS 'Whether this is a multi-page site';
COMMENT ON COLUMN submissions.site_pages IS 'Array of { id, name, title, sections } page definitions';
COMMENT ON COLUMN submissions.generated_pages IS 'Array of { name, title, html } generated pages from Claude';
COMMENT ON COLUMN submissions.photo_assignments IS 'Map of photo index to section name for photo placement';
