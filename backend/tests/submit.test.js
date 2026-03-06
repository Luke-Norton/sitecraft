import { describe, it, expect, vi, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'

// Mock Supabase before importing the route
vi.mock('../src/services/supabase.js', () => ({
  supabase: {},
  uploadFile: vi.fn().mockResolvedValue('https://example.com/uploaded-file.jpg'),
  saveSubmission: vi.fn().mockResolvedValue({ id: 'test-id' }),
}))

// Import after mocking
import submitRouter from '../src/routes/submit.js'
import { saveSubmission, uploadFile } from '../src/services/supabase.js'

describe('Submit Route', () => {
  let app

  beforeEach(() => {
    vi.clearAllMocks()
    app = express()
    app.use(express.json())
    app.use('/api/submit', submitRouter)
  })

  it('returns submission ID on success', async () => {
    const response = await request(app)
      .post('/api/submit')
      .field('bizName', 'Test Business')
      .field('bizDesc', 'A test description')

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    expect(response.body.submissionId).toBeDefined()
  })

  it('saves submission with correct business data', async () => {
    await request(app)
      .post('/api/submit')
      .field('bizName', 'Acme Corp')
      .field('bizDesc', 'Software company')
      .field('bizLocation', 'New York')

    expect(saveSubmission).toHaveBeenCalled()
    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.biz_name).toBe('Acme Corp')
    expect(savedData.biz_desc).toBe('Software company')
    expect(savedData.biz_location).toBe('New York')
  })

  it('saves submission with style settings', async () => {
    await request(app)
      .post('/api/submit')
      .field('colorPrimary', '#ff0000')
      .field('colorAccent', '#00ff00')
      .field('tone', 'friendly')
      .field('designStyle', 'bold')

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.color_primary).toBe('#ff0000')
    expect(savedData.color_accent).toBe('#00ff00')
    expect(savedData.tone).toBe('friendly')
    expect(savedData.design_style).toBe('bold')
  })

  it('parses JSON sections correctly', async () => {
    await request(app)
      .post('/api/submit')
      .field('sections', JSON.stringify(['hero', 'about', 'contact']))
      .field('sectionOrder', JSON.stringify(['hero', 'contact', 'about']))

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.sections).toEqual(['hero', 'about', 'contact'])
    expect(savedData.section_order).toEqual(['hero', 'contact', 'about'])
  })



  it('parses section content correctly', async () => {
    const sectionContent = {
      hero: { headline: 'Welcome', cta: 'Get Started' },
      services: { items: [{ name: 'Service 1' }] },
    }

    await request(app)
      .post('/api/submit')
      .field('sectionContent', JSON.stringify(sectionContent))

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.section_content).toEqual(sectionContent)
  })

  it('handles multi-page settings', async () => {
    const pages = [
      { id: 'index', name: 'index', title: 'Home', sections: ['hero'] },
      { id: 'about', name: 'about', title: 'About', sections: ['about'] },
    ]

    await request(app)
      .post('/api/submit')
      .field('multiPage', 'true')
      .field('pages', JSON.stringify(pages))

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.multi_page).toBe(true)
    expect(savedData.site_pages).toEqual(pages)
  })

  it('handles single-page mode', async () => {
    await request(app)
      .post('/api/submit')
      .field('multiPage', 'false')

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.multi_page).toBe(false)
  })

  it('parses custom sections correctly', async () => {
    const customSections = [
      { name: 'Portfolio', description: 'Our work' },
    ]

    await request(app)
      .post('/api/submit')
      .field('customSections', JSON.stringify(customSections))

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.custom_sections).toEqual(customSections)
  })

  it('parses custom features correctly', async () => {
    const customFeatures = ['Live chat', 'Booking system']

    await request(app)
      .post('/api/submit')
      .field('customFeatures', JSON.stringify(customFeatures))

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.custom_features).toEqual(customFeatures)
  })

  it('parses photo assignments correctly', async () => {
    const photoAssignments = { 0: 'hero', 1: 'about' }

    await request(app)
      .post('/api/submit')
      .field('photoAssignments', JSON.stringify(photoAssignments))

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.photo_assignments).toEqual(photoAssignments)
  })

  it('uses default values for missing fields', async () => {
    await request(app)
      .post('/api/submit')

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.biz_name).toBe('')
    expect(savedData.color_primary).toBe('#6366f1')
    expect(savedData.color_accent).toBe('#f59e0b')
    expect(savedData.tone).toBe('professional')
    expect(savedData.design_style).toBe('modern')
    expect(savedData.header_style).toBe('standard')
    expect(savedData.hero_style).toBe('split')
  })

  it('handles invalid JSON gracefully', async () => {
    await request(app)
      .post('/api/submit')
      .field('sections', 'not valid json')

    const savedData = saveSubmission.mock.calls[0][0]
    // Should fall back to defaults
    expect(savedData.sections).toEqual(['hero'])
  })

  it('sets status to pending', async () => {
    await request(app)
      .post('/api/submit')

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.status).toBe('pending')
  })

  it('initializes generated_pages as empty array', async () => {
    await request(app)
      .post('/api/submit')

    const savedData = saveSubmission.mock.calls[0][0]
    expect(savedData.generated_pages).toEqual([])
  })
})
