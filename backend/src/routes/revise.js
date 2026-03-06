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
    const prompt = buildRevisionPrompt(code, changes)

    let planExtracted = false
    let planBuffer = ''
    let planText = ''

    const fullContent = await streamGeneration(prompt, (chunk) => {
      if (!planExtracted) {
        planBuffer += chunk
        const newlineIdx = planBuffer.indexOf(String.fromCharCode(10))
        if (newlineIdx !== -1) {
          planExtracted = true
          const firstLine = planBuffer.slice(0, newlineIdx).trim()
          if (firstLine.startsWith('PLAN:')) {
            planText = firstLine.slice(5).trim()
            res.write(`data: ${JSON.stringify({ type: 'plan', content: planText })}${String.fromCharCode(10)}${String.fromCharCode(10)}`)
            const rest = planBuffer.slice(newlineIdx + 1)
            if (rest) res.write(`data: ${JSON.stringify({ type: 'chunk', content: rest })}${String.fromCharCode(10)}${String.fromCharCode(10)}`)
          } else {
            // No PLAN line - emit everything buffered so far as a chunk
            res.write(`data: ${JSON.stringify({ type: 'chunk', content: planBuffer })}${String.fromCharCode(10)}${String.fromCharCode(10)}`)
          }
        }
        // If no newline yet, keep buffering
      } else {
        res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}${String.fromCharCode(10)}${String.fromCharCode(10)}`)
      }
    })

    // Strip the PLAN line from the complete content before sending
    let htmlContent = fullContent
    if (planText) {
      const planLineEnd = htmlContent.indexOf(String.fromCharCode(10))
      if (planLineEnd !== -1) htmlContent = htmlContent.slice(planLineEnd + 1).trim()
    }

    res.write(`data: ${JSON.stringify({ type: 'complete', content: htmlContent })}${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    res.end()
  } catch (error) {
    console.error('Revision error:', error)
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message || 'Revision failed' })}${String.fromCharCode(10)}${String.fromCharCode(10)}`)
    res.end()
  }
})

export default router
