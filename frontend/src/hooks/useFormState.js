import { useState, useCallback } from 'react'

const initialState = {
  // Step 1 - Business
  bizName: '',
  bizDesc: '',
  bizLocation: '',

  // Step 2 - Goal
  siteGoal: '',

  // Step 3 - Assets
  logoFile: null,
  photoFiles: [],
  photoAssignments: {}, // { [photoIndex]: sectionId }
  phone: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
  otherSocial: '',

  // Step 4 - Style
  designStyle: 'modern',
  fontPairing: 'auto', // 'auto' = let AI decide
  customFont: '',
  colorPrimary: '#6366f1',
  colorAccent: '#f59e0b',
  colorBg: '#ffffff',

  // Granular animation controls
  animations: {
    scrollReveal: true,      // Elements fade in as you scroll
    hoverCards: true,        // Cards lift/scale on hover
    hoverButtons: true,      // Buttons scale/glow on hover
    heroAnimations: false,   // Animated hero background/elements
    floatingElements: false, // Decorative floating shapes
  },

  // Granular visual effect controls
  effects: {
    roundedCorners: true,    // Rounded corners on cards, buttons, images
    shadows: true,           // Drop shadows on cards and elements
    gradients: false,        // Gradient backgrounds and buttons
    glassBlur: false,        // Glass/blur effect on navigation
    decorativeBorders: false, // Accent borders and dividers
  },

  // Step 5 - Structure
  sections: ['hero', 'services', 'about', 'contact'],
  sectionContent: {}, // { [sectionId]: "free-form content description" }
  customSections: [], // Array of { name, description }
  headerStyle: 'standard',
  customHeaderStyle: '',
  heroStyle: 'split',
  customHeroStyle: '',
  includeFeatures: [],
  customFeatures: [],
  extraNotes: '',
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
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter(s => s !== section)
        : [...prev.sections, section],
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
