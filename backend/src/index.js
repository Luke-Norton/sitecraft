// Load env first - must be before other imports
import './config.js'

import express from 'express'
import cors from 'cors'
import submitRoute from './routes/submit.js'
import { requireAuth } from './middleware/auth.js'
import buildRoute from './routes/build.js'
import reviseRoute from './routes/revise.js'
import deployRoute from './routes/deploy.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json({ limit: '50mb' }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes (all protected — require a valid Supabase JWT)
app.use('/api/submit', requireAuth, submitRoute)
app.use('/api/build', requireAuth, buildRoute)
app.use('/api/revise', requireAuth, reviseRoute)
app.use('/api/deploy', requireAuth, deployRoute)

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`Bespoke backend running on port ${PORT}`)
})
