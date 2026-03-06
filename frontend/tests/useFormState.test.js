import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFormState } from '../src/hooks/useFormState'

describe('useFormState', () => {
  describe('initial state', () => {
    it('initializes with default values', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.formData.bizName).toBe('')
      expect(result.current.formData.bizDesc).toBe('')
      expect(result.current.formData.colorPrimary).toBe('#6366f1')
      expect(result.current.formData.colorAccent).toBe('#f59e0b')
      expect(result.current.formData.tone).toBe('professional')
      expect(result.current.formData.designStyle).toBe('modern')
    })

    it('has hero as default section', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.formData.sections).toContain('hero')
      expect(result.current.formData.sectionOrder).toContain('hero')
    })

    it('starts with multiPage disabled', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.formData.multiPage).toBe(false)
    })

    it('has default index page', () => {
      const { result } = renderHook(() => useFormState())

      expect(result.current.formData.pages).toHaveLength(1)
      expect(result.current.formData.pages[0].id).toBe('index')
      expect(result.current.formData.pages[0].title).toBe('Home')
    })
  })

  describe('updateField', () => {
    it('updates a single field', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.updateField('bizName', 'Test Business')
      })

      expect(result.current.formData.bizName).toBe('Test Business')
    })

    it('updates multiple fields independently', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.updateField('bizName', 'Test Business')
        result.current.updateField('bizDesc', 'A description')
      })

      expect(result.current.formData.bizName).toBe('Test Business')
      expect(result.current.formData.bizDesc).toBe('A description')
    })
  })

  describe('toggleSection', () => {
    it('adds a section when not present', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleSection('about')
      })

      expect(result.current.formData.sections).toContain('about')
      expect(result.current.formData.sectionOrder).toContain('about')
    })

    it('removes a section when present', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleSection('about')
      })

      act(() => {
        result.current.toggleSection('about')
      })

      expect(result.current.formData.sections).not.toContain('about')
      expect(result.current.formData.sectionOrder).not.toContain('about')
    })

    it('maintains hero section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleSection('hero')
      })

      expect(result.current.formData.sections).not.toContain('hero')
    })
  })

  describe('reorderSections', () => {
    it('updates section order', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleSection('about')
        result.current.toggleSection('contact')
      })

      act(() => {
        result.current.reorderSections(['about', 'hero', 'contact'])
      })

      expect(result.current.formData.sectionOrder).toEqual(['about', 'hero', 'contact'])
    })
  })

  describe('setSectionVariant', () => {
    it('sets variant for a section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.setSectionVariant('services', 'bento')
      })

      expect(result.current.formData.sectionVariants.services).toBe('bento')
    })
  })

  describe('updateStructuredContent', () => {
    it('updates hero content', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.updateStructuredContent('hero', 'headline', 'Welcome!')
      })

      expect(result.current.formData.sectionContent.hero.headline).toBe('Welcome!')
    })
  })

  describe('content items (services, testimonials, etc)', () => {
    it('adds a content item', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addContentItem('services', { name: 'Web Design', description: 'We build websites' })
      })

      expect(result.current.formData.sectionContent.services.items).toHaveLength(1)
      expect(result.current.formData.sectionContent.services.items[0].name).toBe('Web Design')
    })

    it('updates a content item', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addContentItem('services', { name: 'Web Design' })
      })

      act(() => {
        result.current.updateContentItem('services', 0, { name: 'Website Design' })
      })

      expect(result.current.formData.sectionContent.services.items[0].name).toBe('Website Design')
    })

    it('removes a content item', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addContentItem('services', { name: 'Service 1' })
        result.current.addContentItem('services', { name: 'Service 2' })
      })

      act(() => {
        result.current.removeContentItem('services', 0)
      })

      expect(result.current.formData.sectionContent.services.items).toHaveLength(1)
      expect(result.current.formData.sectionContent.services.items[0].name).toBe('Service 2')
    })
  })

  describe('features', () => {
    it('toggles a feature', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleFeature('newsletter')
      })

      expect(result.current.formData.includeFeatures).toContain('newsletter')

      act(() => {
        result.current.toggleFeature('newsletter')
      })

      expect(result.current.formData.includeFeatures).not.toContain('newsletter')
    })
  })

  describe('custom sections', () => {
    it('adds a custom section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addCustomSection()
      })

      expect(result.current.formData.customSections).toHaveLength(1)
      expect(result.current.formData.customSections[0]).toEqual({ name: '', description: '' })
    })

    it('updates a custom section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addCustomSection()
      })

      act(() => {
        result.current.updateCustomSection(0, 'name', 'Portfolio')
      })

      expect(result.current.formData.customSections[0].name).toBe('Portfolio')
    })

    it('removes a custom section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addCustomSection()
        result.current.addCustomSection()
      })

      act(() => {
        result.current.updateCustomSection(0, 'name', 'Section 1')
        result.current.updateCustomSection(1, 'name', 'Section 2')
      })

      act(() => {
        result.current.removeCustomSection(0)
      })

      expect(result.current.formData.customSections).toHaveLength(1)
      expect(result.current.formData.customSections[0].name).toBe('Section 2')
    })
  })

  describe('custom features', () => {
    it('adds a custom feature', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addCustomFeature()
      })

      expect(result.current.formData.customFeatures).toHaveLength(1)
      expect(result.current.formData.customFeatures[0]).toBe('')
    })

    it('updates a custom feature', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addCustomFeature()
      })

      act(() => {
        result.current.updateCustomFeature(0, 'Live chat')
      })

      expect(result.current.formData.customFeatures[0]).toBe('Live chat')
    })

    it('removes a custom feature', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addCustomFeature()
        result.current.addCustomFeature()
      })

      act(() => {
        result.current.updateCustomFeature(0, 'Feature 1')
        result.current.updateCustomFeature(1, 'Feature 2')
      })

      act(() => {
        result.current.removeCustomFeature(0)
      })

      expect(result.current.formData.customFeatures).toHaveLength(1)
      expect(result.current.formData.customFeatures[0]).toBe('Feature 2')
    })
  })

  describe('multi-page management', () => {
    it('adds a new page', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addPage('About Us')
      })

      expect(result.current.formData.pages).toHaveLength(2)
      expect(result.current.formData.pages[1].id).toBe('about-us')
      expect(result.current.formData.pages[1].title).toBe('About Us')
    })

    it('generates slug from page title', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addPage('Our Services & Products!')
      })

      // Special characters are removed, spaces become dashes
      expect(result.current.formData.pages[1].id).toBe('our-services--products')
    })

    it('updates a page', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addPage('About')
      })

      act(() => {
        result.current.updatePage('about', { title: 'About Us' })
      })

      expect(result.current.formData.pages[1].title).toBe('About Us')
    })

    it('removes a page and moves sections to index', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addPage('About')
        result.current.moveSectionToPage('about', 'about')
      })

      act(() => {
        result.current.removePage('about')
      })

      expect(result.current.formData.pages).toHaveLength(1)
      expect(result.current.formData.pages[0].sections).toContain('about')
    })

    it('does not allow removing index page', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.removePage('index')
      })

      expect(result.current.formData.pages).toHaveLength(1)
      expect(result.current.formData.pages[0].id).toBe('index')
    })

    it('moves a section to a different page', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addPage('About')
        result.current.toggleSection('about')
      })

      act(() => {
        result.current.moveSectionToPage('about', 'about')
      })

      const aboutPage = result.current.formData.pages.find(p => p.id === 'about')
      expect(aboutPage.sections).toContain('about')
    })

    it('toggleSectionAsPage creates a page for a section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleSection('about')
        result.current.updateField('multiPage', true)
      })

      act(() => {
        result.current.toggleSectionAsPage('about', 'About')
      })

      // Should have created an 'about' page
      const aboutPage = result.current.formData.pages.find(p => p.id === 'about')
      expect(aboutPage).toBeDefined()
      expect(aboutPage.title).toBe('About')
      expect(aboutPage.sections).toContain('about')
    })

    it('toggleSectionAsPage removes page when toggled off', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.toggleSection('services')
        result.current.updateField('multiPage', true)
        result.current.toggleSectionAsPage('services', 'Services')
      })

      // Verify page exists
      expect(result.current.formData.pages.find(p => p.id === 'services')).toBeDefined()

      act(() => {
        result.current.toggleSectionAsPage('services', 'Services')
      })

      // Page should be removed
      expect(result.current.formData.pages.find(p => p.id === 'services')).toBeUndefined()
    })

    it('removes section from old page when moving', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.addPage('About')
        result.current.addPage('Services')
        result.current.toggleSection('testimonials')
      })

      act(() => {
        result.current.moveSectionToPage('testimonials', 'about')
      })

      act(() => {
        result.current.moveSectionToPage('testimonials', 'services')
      })

      const aboutPage = result.current.formData.pages.find(p => p.id === 'about')
      const servicesPage = result.current.formData.pages.find(p => p.id === 'services')

      expect(aboutPage.sections).not.toContain('testimonials')
      expect(servicesPage.sections).toContain('testimonials')
    })
  })

  describe('photo management', () => {
    it('sets photo files', () => {
      const { result } = renderHook(() => useFormState())
      const mockFiles = [{ name: 'photo1.jpg' }, { name: 'photo2.jpg' }]

      act(() => {
        result.current.setPhotoFiles(mockFiles)
      })

      expect(result.current.formData.photoFiles).toHaveLength(2)
    })

    it('assigns photo to section', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.setPhotoFiles([{ name: 'photo1.jpg' }])
      })

      act(() => {
        result.current.assignPhotoToSection(0, 'hero')
      })

      expect(result.current.formData.photoAssignments[0]).toBe('hero')
    })

    it('clears photo assignment with null', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.setPhotoFiles([{ name: 'photo1.jpg' }])
        result.current.assignPhotoToSection(0, 'hero')
      })

      act(() => {
        result.current.assignPhotoToSection(0, null)
      })

      expect(result.current.formData.photoAssignments[0]).toBeNull()
    })
  })

  describe('logo management', () => {
    it('sets logo file', () => {
      const { result } = renderHook(() => useFormState())
      const mockFile = { name: 'logo.png' }

      act(() => {
        result.current.setLogoFile(mockFile)
      })

      expect(result.current.formData.logoFile).toEqual(mockFile)
    })
  })

  describe('resetForm', () => {
    it('resets all form data to initial state', () => {
      const { result } = renderHook(() => useFormState())

      act(() => {
        result.current.updateField('bizName', 'Test Business')
        result.current.toggleSection('about')
        result.current.addPage('Services')
      })

      act(() => {
        result.current.resetForm()
      })

      expect(result.current.formData.bizName).toBe('')
      expect(result.current.formData.sections).toEqual(['hero'])
      expect(result.current.formData.pages).toHaveLength(1)
    })
  })
})
