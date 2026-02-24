import { Router } from 'express'
import { buildRevisionPrompt } from '../services/promptBuilder.js'
import { streamGeneration } from '../services/claude.js'

const router = Router()

router.post('/', async (req, res) => {
  const { code, changes } = req.body

  if (!code || !changes) {
    return res.status(400).json({
      message: 'Both code and changes are required',
    })
  }

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*')
  res.flushHeaders()

  try {
    // Build the revision prompt
    const prompt = buildRevisionPrompt(code, changes)

    // Stream the response from Claude
    const fullContent = await streamGeneration(prompt, (chunk) => {
      res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`)
    })

    // Send completion message
    res.write(`data: ${JSON.stringify({ type: 'complete', content: fullContent })}\n\n`)
    res.end()
  } catch (error) {
    console.error('Revision error:', error)
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message || 'Revision failed' })}\n\n`)
    res.end()
  }
})

export default router
