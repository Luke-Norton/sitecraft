import { useState, useCallback } from 'react'

const initialState = {
  // Step 1 - Business
  bizName: '',
  bizDesc: '',
  bizLocation: '',

  // Step 2 - Goal
  siteGoal: '',

  // Step 3 - Content
  logoFile: null,
  photoFiles: [],
  photoAssignments: {}, // { [photoIndex]: sectionId }
  bizAbout: '',
  services: [''],
  phone: '',
  email: '',
  address: '',
  facebook: '',
  instagram: '',
  otherSocial: '',

  // Step 4 - Style
  styleKeywords: '',
  inspo1: '',
  inspo2: '',
  colorPrimary: '#1a73e8',
  colorAccent: '#f4a61d',
  colorBg: '#ffffff',
  animationLevel: 'moderate',
  designStyle: 'modern',
  visualEffects: ['shadows', 'rounded'],

  // Step 5 - Structure
  sections: ['hero', 'services', 'about', 'contact'],
  customSections: [], // Array of { name, description }
  fontPairing: 'modern',
  customFont: '', // Custom Google Fonts URL or font name
  headerStyle: 'standard',
  customHeaderStyle: '', // Custom header description
  heroStyle: 'fullscreen',
  customHeroStyle: '', // Custom hero description
  includeFeatures: [],
  customFeatures: [], // Array of custom feature descriptions
  extraNotes: '',
}

export function useFormState() {
  const [formData, setFormData] = useState(initialState)

  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const addService = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, ''],
    }))
  }, [])

  const updateService = useCallback((index, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((s, i) => (i === index ? value : s)),
    }))
  }, [])

  const removeService = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
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

  const toggleVisualEffect = useCallback((effect) => {
    setFormData(prev => ({
      ...prev,
      visualEffects: prev.visualEffects.includes(effect)
        ? prev.visualEffects.filter(e => e !== effect)
        : [...prev.visualEffects, effect],
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
    addService,
    updateService,
    removeService,
    setLogoFile,
    setPhotoFiles,
    assignPhotoToSection,
    toggleVisualEffect,
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
