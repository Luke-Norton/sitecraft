import { Router } from 'express'
import { supabase } from '../services/supabase.js'

const router = Router()

// GET /api/submissions — list the current user's submissions, newest first
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('submissions')
    .select('id, biz_name, created_at, status, generated_at')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Submissions fetch error:', error)
    return res.status(500).json({ message: 'Failed to load submissions' })
  }

  res.json(data)
})

export default router
