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

  // Step 5 - Structure
  structure: '',
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
    setFormData(prev => ({ ...prev, photoFiles: Array.from(files) }))
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
    resetForm,
  }
}
