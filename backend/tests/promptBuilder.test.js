import { describe, it, expect } from 'vitest'
import { buildPrompt, buildMultiPagePrompt, buildRevisionPrompt } from '../src/services/promptBuilder.js'

describe('promptBuilder', () => {
  describe('buildPrompt', () => {
    it('generates prompt with business info', () => {
      const submission = {
        biz_name: 'Acme Corp',
        biz_desc: 'Software company',
        biz_location: 'New York',
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Acme Corp')
      expect(prompt).toContain('Software company')
      expect(prompt).toContain('New York')
    })

    it('includes Tailwind CDN configuration', () => {
      const submission = {
        color_primary: '#ff0000',
        color_accent: '#00ff00',
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('cdn.tailwindcss.com')
      expect(prompt).toContain('#ff0000')
      expect(prompt).toContain('#00ff00')
    })

    it('uses default colors when not provided', () => {
      const submission = {}

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('#6366f1') // default primary
      expect(prompt).toContain('#f59e0b') // default accent
    })

    it('includes contact info when provided', () => {
      const submission = {
        phone: '555-1234',
        email: 'test@example.com',
        address: '123 Main St',
        facebook: 'facebook.com/acme',
        instagram: '@acme',
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('555-1234')
      expect(prompt).toContain('test@example.com')
      expect(prompt).toContain('123 Main St')
      expect(prompt).toContain('facebook.com/acme')
      expect(prompt).toContain('@acme')
    })

    it('includes sections in correct order', () => {
      const submission = {
        sections: ['hero', 'about', 'contact'],
        section_order: ['hero', 'contact', 'about'],
      }

      const prompt = buildPrompt(submission)

      // Verify sections appear in section_order
      const heroIndex = prompt.indexOf('### HERO')
      const contactIndex = prompt.indexOf('### CONTACT')
      const aboutIndex = prompt.indexOf('### ABOUT')

      expect(heroIndex).toBeLessThan(contactIndex)
      expect(contactIndex).toBeLessThan(aboutIndex)
    })

    it('includes section variants when specified', () => {
      const submission = {
        sections: ['services'],
        section_order: ['services'],
        section_variants: { services: 'bento' },
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Bento-style grid')
    })

    it('includes section content for services', () => {
      const submission = {
        sections: ['services'],
        section_order: ['services'],
        section_content: {
          services: {
            items: [
              { name: 'Web Design', description: 'Beautiful websites' },
              { name: 'SEO', description: 'Search optimization' },
            ],
          },
        },
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Web Design')
      expect(prompt).toContain('Beautiful websites')
      expect(prompt).toContain('SEO')
    })

    it('includes hero content when provided', () => {
      const submission = {
        sections: ['hero'],
        section_order: ['hero'],
        section_content: {
          hero: {
            headline: 'Welcome to Acme',
            subheadline: 'We build great things',
            cta: 'Get Started',
          },
        },
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Welcome to Acme')
      expect(prompt).toContain('We build great things')
      expect(prompt).toContain('Get Started')
    })

    it('applies correct tone description', () => {
      const tones = ['professional', 'friendly', 'bold', 'playful', 'luxurious']

      tones.forEach(tone => {
        const submission = { tone }
        const prompt = buildPrompt(submission)

        expect(prompt).toContain(`${tone.toUpperCase()} TONE`)
      })
    })

    it('applies design style instructions', () => {
      const submission = { design_style: 'minimal' }
      const prompt = buildPrompt(submission)

      expect(prompt).toContain('MINIMAL & REFINED DESIGN')
    })

    it('always includes default animation instructions', () => {
      const prompt = buildPrompt({})

      expect(prompt).toContain('SCROLL REVEAL')
      expect(prompt).toContain('CARD HOVER')
    })

    it('always includes default effect instructions', () => {
      const prompt = buildPrompt({})

      expect(prompt).toContain('ROUNDED CORNERS')
      expect(prompt).toContain('SHADOWS')
      expect(prompt).toContain('GLASS')
    })

    it('includes custom sections', () => {
      const submission = {
        sections: ['hero'],
        section_order: ['hero'],
        custom_sections: [
          { name: 'Portfolio', description: 'Showcase our work' },
        ],
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('PORTFOLIO (Custom Section)')
      expect(prompt).toContain('Showcase our work')
    })

    it('includes additional features', () => {
      const submission = {
        include_features: ['newsletter', 'back-to-top'],
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Newsletter section')
      expect(prompt).toContain('Back to top')
    })

    it('includes custom features', () => {
      const submission = {
        custom_features: ['Live chat integration', 'Booking calendar'],
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Live chat integration')
      expect(prompt).toContain('Booking calendar')
    })

    it('includes extra notes when provided', () => {
      const submission = {
        extra_notes: 'Please use blue as the main color theme',
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Please use blue as the main color theme')
    })

    it('includes photo assignments in prompt', () => {
      const submission = {
        photo_urls: ['http://example.com/photo1.jpg', 'http://example.com/photo2.jpg'],
        photo_assignments: { 0: 'hero', 1: 'about' },
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('FOR HERO SECTION')
      expect(prompt).toContain('FOR ABOUT SECTION')
    })

    it('handles auto font pairing based on design style', () => {
      const submission = {
        font_pairing: 'auto',
        design_style: 'luxury',
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Cormorant')
    })

    it('handles custom font input', () => {
      const submission = {
        font_pairing: 'custom',
        custom_font: 'Roboto',
      }

      const prompt = buildPrompt(submission)

      expect(prompt).toContain('Roboto')
    })
  })

  describe('buildMultiPagePrompt', () => {
    it('generates JSON output format instructions', () => {
      const submission = {
        site_pages: [
          { id: 'index', name: 'index', title: 'Home', sections: ['hero'] },
          { id: 'about', name: 'about', title: 'About', sections: ['about'] },
        ],
        sections: ['hero', 'about'],
      }

      const prompt = buildMultiPagePrompt(submission)

      expect(prompt).toContain('===PAGE_START===')
      expect(prompt).toContain('===HTML_START===')
      expect(prompt).toContain('===HTML_END===')
      expect(prompt).toContain('===PAGE_END===')
    })

    it('includes page descriptions with sections', () => {
      const submission = {
        site_pages: [
          { id: 'index', name: 'index', title: 'Home', sections: ['hero', 'services'] },
          { id: 'about', name: 'about', title: 'About Us', sections: ['about', 'team'] },
        ],
        sections: ['hero', 'services', 'about', 'team'],
      }

      const prompt = buildMultiPagePrompt(submission)

      expect(prompt).toContain('index.html (Home)')
      expect(prompt).toContain('about.html (About Us)')
    })

    it('requires relative paths for navigation', () => {
      const submission = {
        site_pages: [
          { id: 'index', name: 'index', title: 'Home', sections: ['hero'] },
        ],
        sections: ['hero'],
      }

      const prompt = buildMultiPagePrompt(submission)

      expect(prompt).toContain('./index.html')
      expect(prompt).toContain('./about.html')
    })

    it('includes business info', () => {
      const submission = {
        biz_name: 'Test Business',
        biz_desc: 'Test description',
        site_pages: [{ id: 'index', name: 'index', title: 'Home', sections: [] }],
        sections: [],
      }

      const prompt = buildMultiPagePrompt(submission)

      expect(prompt).toContain('Test Business')
      expect(prompt).toContain('Test description')
    })

    it('applies styling configuration', () => {
      const submission = {
        color_primary: '#123456',
        design_style: 'bold',
        tone: 'playful',
        site_pages: [{ id: 'index', name: 'index', title: 'Home', sections: [] }],
        sections: [],
      }

      const prompt = buildMultiPagePrompt(submission)

      expect(prompt).toContain('#123456')
      expect(prompt).toContain('BOLD & EXPRESSIVE DESIGN')
      expect(prompt).toContain('PLAYFUL TONE')
    })
  })

  describe('buildRevisionPrompt', () => {
    it('includes current code and change request', () => {
      const currentCode = '<!DOCTYPE html><html><body>Hello</body></html>'
      const changeRequest = 'Make the background blue'

      const prompt = buildRevisionPrompt(currentCode, changeRequest)

      expect(prompt).toContain(currentCode)
      expect(prompt).toContain('Make the background blue')
    })

    it('specifies HTML output requirements', () => {
      const prompt = buildRevisionPrompt('<html></html>', 'Change colors')

      expect(prompt).toContain('<!DOCTYPE html>')
      expect(prompt).toContain('end with </html>')
    })

    it('maintains Tailwind CSS requirement', () => {
      const prompt = buildRevisionPrompt('<html></html>', 'Add features')

      expect(prompt).toContain('Tailwind CSS')
    })
  })
})
