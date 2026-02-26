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
  fontPairing: 'auto',
  customFont: '',
  colorPrimary: '#6366f1',
  colorAccent: '#f59e0b',
  colorBg: '#ffffff',
  colorsFromLogo: false, // Whether to use extracted colors

  // Granular animation controls
  animations: {
    scrollReveal: true,
    hoverCards: true,
    hoverButtons: true,
    heroAnimations: false,
    floatingElements: false,
  },

  // Granular visual effect controls
  effects: {
    roundedCorners: true,
    shadows: true,
    gradients: false,
    glassBlur: false,
    decorativeBorders: false,
  },

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

  const toggleAnimation = useCallback((key) => {
    setFormData(prev => ({
      ...prev,
      animations: {
        ...prev.animations,
        [key]: !prev.animations[key],
      },
    }))
  }, [])

  const toggleEffect = useCallback((key) => {
    setFormData(prev => ({
      ...prev,
      effects: {
        ...prev.effects,
        [key]: !prev.effects[key],
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

  return {
    formData,
    updateField,
    setLogoFile,
    setPhotoFiles,
    assignPhotoToSection,
    toggleAnimation,
    toggleEffect,
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
  }
}
