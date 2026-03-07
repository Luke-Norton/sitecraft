import { supabase } from '../services/supabase.js'

export async function requireAuth(req, res, next) {
  // Accept token from Authorization header or ?token= query param (EventSource can't set headers)
  const authHeader = req.headers.authorization
  const token = (authHeader && authHeader.startsWith('Bearer '))
    ? authHeader.slice(7)
    : req.query.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }

  req.user = user
  next()
}
