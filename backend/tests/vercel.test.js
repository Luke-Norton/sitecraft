import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { deployToVercel, submitToGoogleIndexing } from '../src/services/vercel.js'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('Vercel Service', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
    process.env.VERCEL_API_TOKEN = 'test-token'
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('deployToVercel', () => {
    it('throws error when token is not configured', async () => {
      delete process.env.VERCEL_API_TOKEN

      await expect(deployToVercel('<html></html>')).rejects.toThrow(
        'VERCEL_API_TOKEN is not configured'
      )
    })

    it('sends single page deployment request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test-abc123.vercel.app',
            alias: ['test.vercel.app'],
          }),
      })

      const html = '<!DOCTYPE html><html><body>Test</body></html>'
      await deployToVercel(html)

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.vercel.com/v13/deployments',
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          },
        })
      )

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.files).toHaveLength(1)
      expect(body.files[0].file).toBe('index.html')
    })

    it('sends multi-page deployment request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test-abc123.vercel.app',
          }),
      })

      const pages = [
        { name: 'index', title: 'Home', html: '<html>Home</html>' },
        { name: 'about', title: 'About', html: '<html>About</html>' },
      ]

      await deployToVercel(null, 'test-project', pages)

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.files).toHaveLength(2)
      expect(body.files[0].file).toBe('index.html')
      expect(body.files[1].file).toBe('about.html')
    })

    it('uses custom project name when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'custom-project.vercel.app',
          }),
      })

      await deployToVercel('<html></html>', 'custom-project')

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.name).toBe('custom-project')
    })

    it('generates project name when not provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test.vercel.app',
          }),
      })

      await deployToVercel('<html></html>')

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.name).toMatch(/^bespoke-\d+$/)
    })

    it('includes team ID when configured', async () => {
      process.env.VERCEL_TEAM_ID = 'team-123'

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test.vercel.app',
          }),
      })

      await deployToVercel('<html></html>')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.vercel.com/v13/deployments?teamId=team-123',
        expect.any(Object)
      )
    })

    it('returns deployment URL from alias', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test-abc123.vercel.app',
            alias: ['my-site.vercel.app'],
          }),
      })

      const result = await deployToVercel('<html></html>')

      expect(result.url).toBe('https://my-site.vercel.app')
      expect(result.deploymentId).toBe('deploy-123')
    })

    it('returns deployment URL when no alias', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test-abc123.vercel.app',
          }),
      })

      const result = await deployToVercel('<html></html>')

      expect(result.url).toBe('https://test-abc123.vercel.app')
    })

    it('throws error on deployment failure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () =>
          Promise.resolve({
            error: { message: 'Rate limit exceeded' },
          }),
      })

      await expect(deployToVercel('<html></html>')).rejects.toThrow(
        'Rate limit exceeded'
      )
    })

    it('throws generic error when no message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      })

      await expect(deployToVercel('<html></html>')).rejects.toThrow(
        'Failed to deploy to Vercel'
      )
    })

    it('encodes HTML as base64', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test.vercel.app',
          }),
      })

      const html = '<html><body>Test</body></html>'
      await deployToVercel(html)

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      const decoded = Buffer.from(body.files[0].data, 'base64').toString()
      expect(decoded).toBe(html)
    })

    it('sets target to production', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 'deploy-123',
            url: 'test.vercel.app',
          }),
      })

      await deployToVercel('<html></html>')

      const body = JSON.parse(mockFetch.mock.calls[0][1].body)
      expect(body.target).toBe('production')
    })
  })

  describe('submitToGoogleIndexing', () => {
    it('returns true (placeholder implementation)', async () => {
      const result = await submitToGoogleIndexing('https://example.com')

      expect(result).toBe(true)
    })
  })
})
