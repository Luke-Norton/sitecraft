import { Router } from 'express'
import { getSubmission, updateSubmission } from '../services/supabase.js'
import { buildPrompt, buildMultiPagePrompt } from '../services/promptBuilder.js'
import { streamGeneration } from '../services/claude.js'

const router = Router()

// Parse multi-page response from Claude using delimiter format
function parseMultiPageResponse(content) {
  console.log('=== parseMultiPageResponse called ===')
  console.log('Content length:', content?.length)

  if (!content || typeof content !== 'string') {
    console.error('parseMultiPageResponse: Invalid content - null or not a string')
    return null
  }

  const pages = []

  // Split by page delimiters
  const pageBlocks = content.split('===PAGE_START===').filter(block => block.trim())

  console.log(`Found ${pageBlocks.length} page blocks`)

  for (const block of pageBlocks) {
    // Check if this block has the end delimiter
    if (!block.includes('===PAGE_END===')) {
      console.log('Skipping block without PAGE_END')
      continue
    }

    // Extract page content (everything before PAGE_END)
    const pageContent = block.split('===PAGE_END===')[0]

    // Extract name
    const nameMatch = pageContent.match(/name:\s*(\S+)/)
    const name = nameMatch ? nameMatch[1].trim() : null

    // Extract title
    const titleMatch = pageContent.match(/title:\s*(.+?)(?:\n|===)/)
    const title = titleMatch ? titleMatch[1].trim() : name

    // Extract HTML between HTML_START and HTML_END
    const htmlMatch = pageContent.match(/===HTML_START===\s*([\s\S]*?)\s*===HTML_END===/)
    const html = htmlMatch ? htmlMatch[1].trim() : null

    if (name && html) {
      console.log(`Parsed page: ${name} (${title}), HTML length: ${html.length}`)
      pages.push({ name, title: title || name, html })
    } else {
      console.log(`Incomplete page block - name: ${name}, html: ${html ? 'yes' : 'no'}`)
    }
  }

  if (pages.length > 0) {
    console.log(`SUCCESS: Parsed ${pages.length} pages using delimiter format`)
    return pages
  }

  // Fallback: try legacy JSON format for backwards compatibility
  console.log('No delimiter format found, trying JSON fallback...')
  try {
    let cleanContent = content.trim()
      .replace(/^```(?:json)?\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(cleanContent)
    if (parsed.pages && Array.isArray(parsed.pages)) {
      const validPages = parsed.pages.filter(p => p.name && p.html)
      if (validPages.length > 0) {
        console.log(`SUCCESS: Parsed ${validPages.length} pages using JSON fallback`)
        return validPages
      }
    }
  } catch (e) {
    console.log('JSON fallback also failed:', e.message)
  }

  console.error('=== Multi-page parsing failed completely ===')
  return null
}

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

    // Return cached result if already generated
        if (submission.generated_html) {
      const hasPages = submission.generated_pages && submission.generated_pages.length > 0
      const payload = hasPages
        ? { type: 'complete', multiPage: true, pages: submission.generated_pages, content: submission.generated_html }
        : { type: 'complete', content: submission.generated_html }
      res.write('data: ' + JSON.stringify(payload) + '\n\n')
      res.end()
      return
    }

    if (!submission) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'Submission not found' })}\n\n`)
      res.end()
      return
    }

    // Check if multi-page mode
    const isMultiPage = submission.multi_page === true && Array.isArray(submission.site_pages) && submission.site_pages.length > 0
    console.log('Build mode:', isMultiPage ? 'multi-page' : 'single-page', '| Pages:', submission.site_pages?.length || 0)

    // Build the appropriate prompt
    const prompt = isMultiPage
      ? buildMultiPagePrompt(submission)
      : buildPrompt(submission)

    // Stream the response from Claude
    const fullContent = await streamGeneration(prompt, (chunk) => {
      res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`)
    })

    // Process the response based on mode
    let updateData = {
      status: 'generated',
      generated_at: new Date().toISOString(),
    }

    if (isMultiPage) {
      // Parse multi-page JSON response
      const pages = parseMultiPageResponse(fullContent)

      if (pages && pages.length > 0) {
        updateData.generated_pages = pages
        // Use index page for backwards compatibility
        const indexPage = pages.find(p => p.name === 'index') || pages[0]
        updateData.generated_html = indexPage.html
      } else {
        // Fallback: treat as single page if parsing fails
        console.warn('Multi-page parsing failed, falling back to single page')
        updateData.generated_html = fullContent
        updateData.generated_pages = []
      }
    } else {
      // Single page mode
      updateData.generated_html = fullContent
    }

    // Update submission
    await updateSubmission(id, updateData)

    // Send completion message with appropriate data
    if (isMultiPage && updateData.generated_pages?.length > 0) {
      res.write(`data: ${JSON.stringify({
        type: 'complete',
        multiPage: true,
        pages: updateData.generated_pages,
        content: updateData.generated_html,
      })}\n\n`)
    } else {
      res.write(`data: ${JSON.stringify({ type: 'complete', content: updateData.generated_html })}\n\n`)
    }
    res.end()
  } catch (error) {
    console.error('Build error:', error)
    res.write(`data: ${JSON.stringify({ type: 'error', message: error.message || 'Build failed' })}\n\n`)
    res.end()
  }
})

export default router
