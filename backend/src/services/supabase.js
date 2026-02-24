import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Warning: Supabase credentials not configured')
}

export const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '')

export async function uploadFile(bucket, path, buffer, contentType) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType,
      upsert: true,
    })

  if (error) throw error

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return urlData.publicUrl
}

export async function saveSubmission(submissionData) {
  const { data, error } = await supabase
    .from('submissions')
    .insert(submissionData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getSubmission(id) {
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function updateSubmission(id, updates) {
  const { data, error } = await supabase
    .from('submissions')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}
