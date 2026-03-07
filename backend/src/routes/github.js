import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { supabase } from '../services/supabase.js'
import {
  getGithubAuthUrl,
  exchangeCodeForToken,
  getGithubUser,
  listRepos,
  createRepo,
  pushFile,
  getFileSha,
} from '../services/github.js'

const router = Router()

// GET /api/github/status
router.get('/status', requireAuth, (req, res) => {
  const { github_token, github_username } = req.user.user_metadata || {}
  res.json({ connected: !!github_token, username: github_username || null })
})

// GET /api/github/connect?token=...&next=...
// Initiates GitHub OAuth — no requireAuth middleware (browser flow, no headers)
router.get('/connect', async (req, res) => {
  const { token, next } = req.query
  if (!token) return res.status(400).send('Missing token')

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return res.status(401).send('Invalid token')

  const state = Buffer.from(JSON.stringify({ userId: user.id, next: next || '/' })).toString('base64')
  res.redirect(getGithubAuthUrl(state))
})

// GET /api/github/callback?code=...&state=...
// GitHub redirects here after user authorizes
router.get('/callback', async (req, res) => {
  const { code, state } = req.query
  if (!code || !state) return res.status(400).send('Missing code or state')

  let userId, next
  try {
    const decoded = JSON.parse(Buffer.from(state, 'base64').toString('utf8'))
    userId = decoded.userId
    next = decoded.next || '/'
  } catch {
    return res.status(400).send('Invalid state')
  }

  try {
    const githubToken = await exchangeCodeForToken(code)
    const githubUser = await getGithubUser(githubToken)

    await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { github_token: githubToken, github_username: githubUser.login },
    })

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
    res.redirect(`${frontendUrl}${next}`)
  } catch (err) {
    console.error('GitHub callback error:', err)
    res.status(500).send('GitHub authentication failed')
  }
})

// GET /api/github/repos
router.get('/repos', requireAuth, async (req, res) => {
  const { github_token } = req.user.user_metadata || {}
  if (!github_token) return res.status(401).json({ message: 'GitHub not connected' })
  try {
    const repos = await listRepos(github_token)
    res.json(repos.map(r => ({ name: r.name, fullName: r.full_name, url: r.html_url, private: r.private })))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/github/push
router.post('/push', requireAuth, async (req, res) => {
  const { html, pages, repoName, createNew } = req.body
  const { github_token, github_username } = req.user.user_metadata || {}

  if (!github_token) return res.status(401).json({ message: 'GitHub not connected' })
  if (!repoName) return res.status(400).json({ message: 'repoName is required' })

  try {
    if (createNew) {
      await createRepo(github_token, repoName)
    }

    const filesToPush = []
    if (pages && pages.length > 0) {
      for (const page of pages) {
        const fileName = page.name === 'index' ? 'index.html' : `${page.name}.html`
        filesToPush.push({ path: fileName, content: Buffer.from(page.html).toString('base64') })
      }
    } else if (html) {
      filesToPush.push({ path: 'index.html', content: Buffer.from(html).toString('base64') })
    } else {
      return res.status(400).json({ message: 'No HTML content provided' })
    }

    for (const file of filesToPush) {
      const sha = createNew ? null : await getFileSha(github_token, github_username, repoName, file.path)
      await pushFile(github_token, github_username, repoName, file.path, file.content, sha)
    }

    res.json({ repoUrl: `https://github.com/${github_username}/${repoName}` })
  } catch (err) {
    console.error('GitHub push error:', err)
    res.status(500).json({ message: err.message || 'Failed to push to GitHub' })
  }
})

export default router
