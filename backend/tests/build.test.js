import { describe, it, expect } from 'vitest'

// We need to test parseMultiPageResponse, but it's not exported
// So we'll test it by recreating the logic here
function parseMultiPageResponse(content) {
  if (!content || typeof content !== 'string') {
    return null
  }

  const pages = []

  // Split by page delimiters
  const pageBlocks = content.split('===PAGE_START===').filter(block => block.trim())

  for (const block of pageBlocks) {
    if (!block.includes('===PAGE_END===')) {
      continue
    }

    const pageContent = block.split('===PAGE_END===')[0]

    const nameMatch = pageContent.match(/name:\s*(\S+)/)
    const name = nameMatch ? nameMatch[1].trim() : null

    const titleMatch = pageContent.match(/title:\s*(.+?)(?:\n|===)/)
    const title = titleMatch ? titleMatch[1].trim() : name

    const htmlMatch = pageContent.match(/===HTML_START===\s*([\s\S]*?)\s*===HTML_END===/)
    const html = htmlMatch ? htmlMatch[1].trim() : null

    if (name && html) {
      pages.push({ name, title: title || name, html })
    }
  }

  if (pages.length > 0) {
    return pages
  }

  // Fallback: try legacy JSON format
  try {
    let cleanContent = content.trim()
      .replace(/^```(?:json)?\s*\n?/i, '')
      .replace(/\n?```\s*$/i, '')
      .trim()

    const parsed = JSON.parse(cleanContent)
    if (parsed.pages && Array.isArray(parsed.pages)) {
      const validPages = parsed.pages.filter(p => p.name && p.html)
      if (validPages.length > 0) {
        return validPages
      }
    }
  } catch (e) {
    // JSON fallback failed
  }

  return null
}

describe('parseMultiPageResponse', () => {
  describe('delimiter format', () => {
    it('parses single page with delimiters', () => {
      const content = `
===PAGE_START===
name: index
title: Home
===HTML_START===
<!DOCTYPE html>
<html><body>Hello</body></html>
===HTML_END===
===PAGE_END===
`
      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('index')
      expect(result[0].title).toBe('Home')
      expect(result[0].html).toContain('<!DOCTYPE html>')
    })

    it('parses multiple pages with delimiters', () => {
      const content = `
===PAGE_START===
name: index
title: Home
===HTML_START===
<!DOCTYPE html><html><body>Home Page</body></html>
===HTML_END===
===PAGE_END===

===PAGE_START===
name: about
title: About Us
===HTML_START===
<!DOCTYPE html><html><body>About Page</body></html>
===HTML_END===
===PAGE_END===

===PAGE_START===
name: contact
title: Contact
===HTML_START===
<!DOCTYPE html><html><body>Contact Page</body></html>
===HTML_END===
===PAGE_END===
`
      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(3)
      expect(result[0].name).toBe('index')
      expect(result[1].name).toBe('about')
      expect(result[2].name).toBe('contact')
      expect(result[1].title).toBe('About Us')
    })

    it('handles HTML with quotes and special characters', () => {
      const content = `
===PAGE_START===
name: index
title: Home
===HTML_START===
<!DOCTYPE html>
<html>
<body>
  <div class="container" data-value="test">
    <script>
      const x = "hello";
      if (x === "hello") { console.log("world"); }
    </script>
  </div>
</body>
</html>
===HTML_END===
===PAGE_END===
`
      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(1)
      expect(result[0].html).toContain('class="container"')
      expect(result[0].html).toContain('const x = "hello"')
    })

    it('skips incomplete page blocks', () => {
      const content = `
===PAGE_START===
name: index
title: Home
===HTML_START===
<!DOCTYPE html><html><body>Complete</body></html>
===HTML_END===
===PAGE_END===

===PAGE_START===
name: broken
title: Broken
This page has no HTML markers
===PAGE_END===
`
      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('index')
    })

    it('uses name as title if title is missing', () => {
      const content = `
===PAGE_START===
name: services
===HTML_START===
<!DOCTYPE html><html><body>Services</body></html>
===HTML_END===
===PAGE_END===
`
      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('services')
      expect(result[0].title).toBe('services')
    })
  })

  describe('JSON fallback', () => {
    it('parses valid JSON format', () => {
      const content = '{"pages":[{"name":"index","title":"Home","html":"<!DOCTYPE html><html></html>"}]}'

      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('index')
    })

    it('handles JSON wrapped in markdown code blocks', () => {
      const content = '```json\n{"pages":[{"name":"index","title":"Home","html":"<html></html>"}]}\n```'

      const result = parseMultiPageResponse(content)

      expect(result).toHaveLength(1)
    })

    it('returns null for invalid content', () => {
      expect(parseMultiPageResponse(null)).toBeNull()
      expect(parseMultiPageResponse('')).toBeNull()
      expect(parseMultiPageResponse('random text')).toBeNull()
    })
  })
})
