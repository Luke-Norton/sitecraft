import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { upload } from '../middleware/upload.js'
import { supabase, uploadFile, saveSubmission } from '../services/supabase.js'

const router = Router()

router.post(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'photos', maxCount: 20 },
  ]),
  async (req, res, next) => {
    try {
      const submissionId = uuidv4()
      const files = req.files || {}

      // Upload logo if provided
      let logoUrl = null
      if (files.logo && files.logo[0]) {
        const logo = files.logo[0]
        const ext = logo.originalname.split('.').pop()
        const path = `${submissionId}/logo.${ext}`
        logoUrl = await uploadFile('assets', path, logo.buffer, logo.mimetype)
      }

      // Upload photos if provided
      const photoUrls = []
      if (files.photos) {
        for (let i = 0; i < files.photos.length; i++) {
          const photo = files.photos[i]
          const ext = photo.originalname.split('.').pop()
          const path = `${submissionId}/photo-${i + 1}.${ext}`
          const url = await uploadFile('assets', path, photo.buffer, photo.mimetype)
          photoUrls.push(url)
        }
      }

      // Parse services array
      let services = []
      try {
        services = JSON.parse(req.body.services || '[]')
      } catch {
        services = []
      }

      // Save submission to database
      const submissionData = {
        id: submissionId,
        biz_name: req.body.bizName || '',
        biz_desc: req.body.bizDesc || '',
        biz_location: req.body.bizLocation || '',
        site_goal: req.body.siteGoal || '',
        biz_about: req.body.bizAbout || '',
        services,
        phone: req.body.phone || '',
        email: req.body.email || '',
        address: req.body.address || '',
        facebook: req.body.facebook || '',
        instagram: req.body.instagram || '',
        other_social: req.body.otherSocial || '',
        style_keywords: req.body.styleKeywords || '',
        inspo_1: req.body.inspo1 || '',
        inspo_2: req.body.inspo2 || '',
        color_primary: req.body.colorPrimary || '#1a73e8',
        color_accent: req.body.colorAccent || '#f4a61d',
        color_bg: req.body.colorBg || '#ffffff',
        structure: req.body.structure || 'standard',
        extra_notes: req.body.extraNotes || '',
        logo_url: logoUrl,
        photo_urls: photoUrls,
        status: 'pending',
        created_at: new Date().toISOString(),
      }

      await saveSubmission(submissionData)

      res.json({
        success: true,
        submissionId,
        message: 'Submission saved successfully',
      })
    } catch (error) {
      console.error('Submit error:', error)
      next(error)
    }
  }
)

export default router
