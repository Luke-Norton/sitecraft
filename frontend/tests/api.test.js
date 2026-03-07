import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock supabase to avoid env var requirement
vi.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: null } }),
    },
  },
}))

// Import after mocking
import { submitForm, deployToVercel } from '../src/lib/api'

describe('API functions', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('submitForm', () => {
    it('sends form data to correct endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, submissionId: '123' }),
      })

      const formData = new FormData()
      formData.append('bizName', 'Test Business')

      await submitForm(formData)

      expect(mockFetch).toHaveBeenCalledWith('/api/submit', expect.objectContaining({
        method: 'POST',
        body: formData,
      }))
    })

    it('returns submission data on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true, submissionId: 'abc-123' }),
      })

      const result = await submitForm(new FormData())

      expect(result.success).toBe(true)
      expect(result.submissionId).toBe('abc-123')
    })

    it('throws error on failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid data' }),
      })

      await expect(submitForm(new FormData())).rejects.toThrow('Invalid data')
    })

    it('uses default error message when none provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      })

      await expect(submitForm(new FormData())).rejects.toThrow('Failed to submit form')
    })
  })

  describe('deployToVercel', () => {
    it('sends HTML to deploy endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ url: 'https://example.vercel.app' }),
      })

      const html = '<!DOCTYPE html><html></html>'
      await deployToVercel(html)

      expect(mockFetch).toHaveBeenCalledWith('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html }),
      })
    })

    it('returns deployment URL on success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ url: 'https://test.vercel.app' }),
      })

      const result = await deployToVercel('<html></html>')

      expect(result.url).toBe('https://test.vercel.app')
    })

    it('throws error on deployment failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Deployment failed' }),
      })

      await expect(deployToVercel('<html></html>')).rejects.toThrow('Deployment failed')
    })
  })
})
