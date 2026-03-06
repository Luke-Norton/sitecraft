import { Router } from 'express'
import { deployToVercel, submitToGoogleIndexing } from '../services/vercel.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { html, projectName, pages } = req.body

    // Require either html or pages
    if (!html && (!pages || pages.length === 0)) {
      return res.status(400).json({
        message: 'HTML content or pages array is required',
      })
    }

    // Deploy to Vercel (multi-page or single page)
    const { url, deploymentId } = await deployToVercel(html, projectName, pages)

    // Submit to Google Indexing (fire and forget)
    submitToGoogleIndexing(url).catch((err) => {
      console.error('Failed to submit to Google Indexing:', err)
    })

    res.json({
      success: true,
      url,
      deploymentId,
      message: 'Site deployed successfully',
    })
  } catch (error) {
    console.error('Deploy error:', error)
    next(error)
  }
})

export default router
