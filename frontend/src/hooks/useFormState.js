import { useState, useCallback } from 'react'

const initialState = {
  // Step 1 - Business
  bizName: '',
  bizDesc: '',
  bizLocation: '',

  // Step 2 - Goal
  siteGoal: '',
  inspirationUrl: '', // URL of a website they like
  inspirationAnalysis: null, // AI analysis of the URL

  // Step 3 - Assets
  logoFile: null,
  photoFiles: [],
  photoAssignments: {}, // { [photoIndex]: sectionId }
  extractedColors: null, // Colors extracted from logo
  phone: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
  otherSocial: '',

  // Step 4 - Style
  tone: 'professional', // professional, friendly, bold, playful, luxurious
  designStyle: 'modern',
  headingFont: 'auto',
  customHeadingFont: '',
  bodyFont: 'auto',
  customBodyFont: '',
  colorPrimary: '#6366f1',
  colorAccent: '#f59e0b',
  colorBg: '#ffffff',
  colorsFromLogo: false, // Whether to use extracted colors

  // Multi-page settings
  multiPage: false, // Enable multi-page generation
  // Pages array - each page has sections assigned to it
  // When multiPage is false, all sections go on index page
  pages: [
    { id: 'index', name: 'index', title: 'Home', sections: [] }, // sections filled dynamically
  ],

  // Step 5 - Structure & Content
  sections: ['hero'],
  sectionOrder: ['hero'], // For drag-and-drop ordering
  sectionVariants: {}, // { [sectionId]: 'grid' | 'list' | 'bento' | etc. }

  // Structured content per section
  sectionContent: {
    hero: { headline: '', subheadline: '', cta: '' },
    services: { items: [] }, // Array of { name, description }
    about: { story: '', founded: '', difference: '', audience: '' },
    gallery: { description: '' },
    testimonials: { items: [] }, // Array of { quote, name, role }
    team: { items: [] }, // Array of { name, role, bio }
    pricing: { items: [] }, // Array of { name, price, features, featured }
    faq: { items: [] }, // Array of { question, answer }
    contact: { heading: '', subheading: '', showForm: true, showMap: false },
  },

  customSections: [],
  headerStyle: 'standard',
  customHeaderStyle: '',
  heroStyle: 'split',
  customHeroStyle: '',
  includeFeatures: [],
  customFeatures: [],
  extraNotes: '',

  // AI suggestions
  suggestedSections: [], // AI-suggested sections based on business
  suggestionsAccepted: false,
}

export function useFormState() {
  const [formData, setFormData] = useState(initialState)

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const setLogoFile = useCallback((file) => {
    setFormData(prev => ({ ...prev, logoFile: file }))
  }, [])

  const setPhotoFiles = useCallback((files) => {
    const newFiles = Array.isArray(files) ? files : Array.from(files || [])
    setFormData(prev => {
      const prevLength = prev.photoFiles.length
      // If adding files (length increased), preserve all existing assignments
      // If removing files, we need to clear assignments since indices shift
      const newAssignments = newFiles.length >= prevLength ? { ...prev.photoAssignments } : {}
      return { ...prev, photoFiles: newFiles, photoAssignments: newAssignments }
    })
  }, [])

  const assignPhotoToSection = useCallback((photoIndex, sectionId) => {
    setFormData(prev => ({
      ...prev,
      photoAssignments: {
        ...prev.photoAssignments,
        [photoIndex]: sectionId || null, // null means "auto/unassigned"
      },
    }))
  }, [])

  const updateSectionContent = useCallback((sectionId, content) => {
    setFormData(prev => ({
      ...prev,
      sectionContent: {
        ...prev.sectionContent,
        [sectionId]: content,
      },
    }))
  }, [])

  const toggleSection = useCallback((section) => {
    setFormData(prev => {
      const isRemoving = prev.sections.includes(section)
      const newSections = isRemoving
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section]
      const newOrder = isRemoving
        ? prev.sectionOrder.filter(s => s !== section)
        : [...prev.sectionOrder, section]
      return {
        ...prev,
        sections: newSections,
        sectionOrder: newOrder,
      }
    })
  }, [])

  const reorderSections = useCallback((newOrder) => {
    setFormData(prev => ({
      ...prev,
      sectionOrder: newOrder,
    }))
  }, [])

  const setSectionVariant = useCallback((sectionId, variant) => {
    setFormData(prev => ({
      ...prev,
      sectionVariants: {
        ...prev.sectionVariants,
        [sectionId]: variant,
      },
    }))
  }, [])

  const updateStructuredContent = useCallback((sectionId, field, value) => {
    setFormData(prev => ({
      ...prev,
      sectionContent: {
        ...prev.sectionContent,
        [sectionId]: {
          ...prev.sectionContent[sectionId],
          [field]: value,
        },
      },
    }))
  }, [])

  const addContentItem = useCallback((sectionId, item) => {
    setFormData(prev => ({
      ...prev,
      sectionContent: {
        ...prev.sectionContent,
        [sectionId]: {
          ...prev.sectionContent[sectionId],
          items: [...(prev.sectionContent[sectionId]?.items || []), item],
        },
      },
    }))
  }, [])

  const updateContentItem = useCallback((sectionId, index, item) => {
    setFormData(prev => ({
      ...prev,
      sectionContent: {
        ...prev.sectionContent,
        [sectionId]: {
          ...prev.sectionContent[sectionId],
          items: prev.sectionContent[sectionId]?.items.map((it, i) =>
            i === index ? { ...it, ...item } : it
          ),
        },
      },
    }))
  }, [])

  const removeContentItem = useCallback((sectionId, index) => {
    setFormData(prev => ({
      ...prev,
      sectionContent: {
        ...prev.sectionContent,
        [sectionId]: {
          ...prev.sectionContent[sectionId],
          items: prev.sectionContent[sectionId]?.items.filter((_, i) => i !== index),
        },
      },
    }))
  }, [])

  const acceptSuggestions = useCallback((suggestions) => {
    setFormData(prev => ({
      ...prev,
      sections: ['hero', ...suggestions],
      sectionOrder: ['hero', ...suggestions],
      suggestedSections: suggestions,
      suggestionsAccepted: true,
    }))
  }, [])

  const setExtractedColors = useCallback((colors) => {
    setFormData(prev => ({
      ...prev,
      extractedColors: colors,
    }))
  }, [])

  const toggleFeature = useCallback((feature) => {
    setFormData(prev => ({
      ...prev,
      includeFeatures: prev.includeFeatures.includes(feature)
        ? prev.includeFeatures.filter(f => f !== feature)
        : [...prev.includeFeatures, feature],
    }))
  }, [])

  // Custom sections management
  const addCustomSection = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      customSections: [...prev.customSections, { name: '', description: '' }],
    }))
  }, [])

  const updateCustomSection = useCallback((index, field, value) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }))
  }, [])

  const removeCustomSection = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index),
    }))
  }, [])

  // Custom features management
  const addCustomFeature = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      customFeatures: [...prev.customFeatures, ''],
    }))
  }, [])

  const updateCustomFeature = useCallback((index, value) => {
    setFormData(prev => ({
      ...prev,
      customFeatures: prev.customFeatures.map((f, i) => (i === index ? value : f)),
    }))
  }, [])

  const removeCustomFeature = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      customFeatures: prev.customFeatures.filter((_, i) => i !== index),
    }))
  }, [])

  const resetForm = useCallback(() => {
    setFormData(initialState)
  }, [])

  // Multi-page management
  const addPage = useCallback((title) => {
    const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    setFormData(prev => ({
      ...prev,
      pages: [
        ...prev.pages,
        { id, name: id, title, sections: [] },
      ],
    }))
  }, [])

  const updatePage = useCallback((pageId, updates) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.map(p =>
        p.id === pageId ? { ...p, ...updates } : p
      ),
    }))
  }, [])

  const removePage = useCallback((pageId) => {
    // Don't allow removing the index page
    if (pageId === 'index') return
    setFormData(prev => {
      const pageToRemove = prev.pages.find(p => p.id === pageId)
      const sectionsToMove = pageToRemove?.sections || []
      return {
        ...prev,
        pages: prev.pages
          .filter(p => p.id !== pageId)
          .map(p => p.id === 'index'
            ? { ...p, sections: [...p.sections, ...sectionsToMove] }
            : p
          ),
      }
    })
  }, [])

  const moveSectionToPage = useCallback((sectionId, targetPageId) => {
    setFormData(prev => ({
      ...prev,
      pages: prev.pages.map(p => ({
        ...p,
        sections: p.id === targetPageId
          ? [...p.sections.filter(s => s !== sectionId), sectionId]
          : p.sections.filter(s => s !== sectionId),
      })),
    }))
  }, [])

  // Get sections that aren't assigned to any page (for initial assignment)
  const getUnassignedSections = useCallback(() => {
    const assignedSections = new Set()
    formData.pages.forEach(p => p.sections.forEach(s => assignedSections.add(s)))
    return formData.sections.filter(s => !assignedSections.has(s))
  }, [formData.pages, formData.sections])

  // Make a section its own page (or remove it from being a page)
  const toggleSectionAsPage = useCallback((sectionId, sectionLabel) => {
    setFormData(prev => {
      // Check if this section already has its own page
      const existingPage = prev.pages.find(p => p.id !== 'index' && p.sections?.includes(sectionId))

      if (existingPage) {
        // Remove the page - section goes back to being unassigned (will end up on home)
        return {
          ...prev,
          pages: prev.pages.filter(p => p.id !== existingPage.id),
        }
      } else {
        // Create a new page for this section
        const title = sectionLabel || sectionId.charAt(0).toUpperCase() + sectionId.slice(1)
        const id = sectionId // Use section ID as page ID for simplicity
        return {
          ...prev,
          pages: [
            ...prev.pages,
            { id, name: id, title, sections: [sectionId] },
          ],
        }
      }
    })
  }, [])

  return {
    formData,
    updateField,
    setLogoFile,
    setPhotoFiles,
    assignPhotoToSection,
    updateSectionContent,
    toggleSection,
    reorderSections,
    setSectionVariant,
    updateStructuredContent,
    addContentItem,
    updateContentItem,
    removeContentItem,
    acceptSuggestions,
    setExtractedColors,
    toggleFeature,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomFeature,
    updateCustomFeature,
    removeCustomFeature,
    resetForm,
    // Multi-page
    addPage,
    updatePage,
    removePage,
    moveSectionToPage,
    getUnassignedSections,
    toggleSectionAsPage,
  }
}
