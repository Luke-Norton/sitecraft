# Sitecraft

A full-stack web application that guides non-technical users through a structured intake form and uses Claude AI to generate and deploy complete static websites.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database + Storage**: Supabase (Postgres + file storage)
- **AI**: Anthropic Claude API (claude-sonnet-4-6)
- **Deployment**: Vercel API

## Setup Instructions

### Prerequisites

- Node.js 18+
- A Supabase account
- An Anthropic API key
- A Vercel account with API token

### 1. Clone and Install

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Supabase Setup

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and keys from Settings > API

#### Create the Database Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create submissions table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  biz_name TEXT,
  biz_desc TEXT,
  biz_location TEXT,
  site_goal TEXT,
  biz_about TEXT,
  services JSONB DEFAULT '[]',
  phone TEXT,
  email TEXT,
  address TEXT,
  facebook TEXT,
  instagram TEXT,
  other_social TEXT,
  style_keywords TEXT,
  inspo_1 TEXT,
  inspo_2 TEXT,
  color_primary TEXT DEFAULT '#1a73e8',
  color_accent TEXT DEFAULT '#f4a61d',
  color_bg TEXT DEFAULT '#ffffff',
  structure TEXT DEFAULT 'standard',
  extra_notes TEXT,
  logo_url TEXT,
  photo_urls JSONB DEFAULT '[]',
  generated_html TEXT,
  deployed_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  generated_at TIMESTAMPTZ,
  deployed_at TIMESTAMPTZ
);

-- Create index for faster lookups
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (adjust as needed for production)
CREATE POLICY "Allow all operations" ON submissions
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

#### Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `assets`
3. Set it to **Public** (so images can be embedded in generated sites)
4. Under Policies, add a policy to allow uploads:

```sql
-- Allow public uploads to assets bucket
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'assets');

-- Allow public reads from assets bucket
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'assets');
```

### 3. Vercel API Token

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token with appropriate scopes
3. Optionally, note your Team ID if deploying to a team

### 4. Environment Variables

Copy `.env.example` to `.env` in both frontend and backend directories:

```bash
# In project root
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-...

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# Vercel API
VERCEL_API_TOKEN=...
VERCEL_TEAM_ID=team_... (optional)

# Backend
PORT=3001
FRONTEND_URL=http://localhost:5173

# Frontend (prefix with VITE_ for Vite to expose)
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 5. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to use the app.

## Project Structure

```
sitecraft/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── steps/          # Form step components
│   │   │   ├── Button.jsx
│   │   │   ├── ColorPicker.jsx
│   │   │   ├── DynamicList.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── NavRow.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ReviewSection.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StepHeader.jsx
│   │   │   ├── StructureCards.jsx
│   │   │   └── UploadZone.jsx
│   │   ├── hooks/
│   │   │   └── useFormState.js
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   └── supabase.js
│   │   ├── pages/
│   │   │   ├── BuildPage.jsx
│   │   │   └── IntakeForm.jsx
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── upload.js
│   │   ├── routes/
│   │   │   ├── build.js
│   │   │   ├── deploy.js
│   │   │   ├── revise.js
│   │   │   └── submit.js
│   │   ├── services/
│   │   │   ├── claude.js
│   │   │   ├── promptBuilder.js
│   │   │   ├── supabase.js
│   │   │   └── vercel.js
│   │   └── index.js
│   └── package.json
│
├── .env.example
└── README.md
```

## API Endpoints

### POST /api/submit
Receives form data and file uploads, saves to Supabase, returns submission ID.

### GET /api/build/:id
Streams the Claude-generated website using Server-Sent Events (SSE).

### POST /api/revise
Receives current code + change request, streams updated code from Claude.

### POST /api/deploy
Deploys the approved HTML to Vercel, returns live URL.

## Deployment

### Frontend (Vercel)

1. Connect your GitHub repo to Vercel
2. Set the root directory to `frontend`
3. Add environment variables (VITE_* prefixed)
4. Deploy

### Backend (Railway)

1. Connect your GitHub repo to Railway
2. Set the root directory to `backend`
3. Add environment variables
4. Deploy

## License

MIT
