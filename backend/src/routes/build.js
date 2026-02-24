import { Router } from 'express'
import { getSubmission, updateSubmission } from '../services/supabase.js'
import { buildPrompt } from '../services/promptBuilder.js'
import { streamGeneration } from '../services/claude.js'

const router = Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params

  // Set up SSE headers
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*')
  res.flushHeaders()

  try {
    // Get submission from database
    const submission = await getSubmission(id)

    if (!submission) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'Submission not found' })}\n\n`)
      res.end()
      return
    }

    // Build the prompt
    const prompt = buildPrompt(submission)

    // Stream the response from Claude
    const fullContent = await streamGeneration(prompt, (chunk) => {
      res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`)
    })

    // Update submission with generated code
    await updateSubmission(id, {
      generated_html: fullContent,
      status: 'generated',
      generated_at: new Date().toISOString(),
    })

    // Send completion message
    res.write(`data: ${JSON.stringify({ type: 'complete', content: fullContent })}\n\n`)
    res.end()
  } catch (error) {
    console.error('Build error:', error)
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message || 'Build failed' })}\n\n`)
    res.end()
  }
})

export default router
