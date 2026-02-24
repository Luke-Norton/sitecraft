import { Router } from 'express'
import { deployToVercel, submitToGoogleIndexing } from '../services/vercel.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { html, projectName } = req.body

    if (!html) {
      return res.status(400).json({
        message: 'HTML content is required',
      })
    }

    // Deploy to Vercel
    const { url, deploymentId } = await deployToVercel(html, projectName)

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
