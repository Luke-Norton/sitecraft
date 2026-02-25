import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormState } from '../hooks/useFormState'
import { submitForm } from '../lib/api'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import {
  Step1Business,
  Step2Goal,
  Step3Content,
  Step4Style,
  Step5Structure,
  Step6Review,
} from '../components/steps'

export default function IntakeForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const {
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
  } = useFormState()

  const goTo = (step) => {
    setCurrentStep(step)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Build FormData for multipart upload
      const data = new FormData()

      // Add text fields
      data.append('bizName', formData.bizName)
      data.append('bizDesc', formData.bizDesc)
      data.append('bizLocation', formData.bizLocation)
      data.append('siteGoal', formData.siteGoal)
      data.append('bizAbout', formData.bizAbout)
      data.append('services', JSON.stringify(formData.services.filter(Boolean)))
      data.append('phone', formData.phone)
      data.append('email', formData.email)
      data.append('address', formData.address)
      data.append('facebook', formData.facebook)
      data.append('instagram', formData.instagram)
      data.append('otherSocial', formData.otherSocial)
      data.append('styleKeywords', formData.styleKeywords)
      data.append('inspo1', formData.inspo1)
      data.append('inspo2', formData.inspo2)
      data.append('colorPrimary', formData.colorPrimary)
      data.append('colorAccent', formData.colorAccent)
      data.append('colorBg', formData.colorBg)
      data.append('animationLevel', formData.animationLevel)
      data.append('designStyle', formData.designStyle)
      data.append('visualEffects', JSON.stringify(formData.visualEffects))
      data.append('sections', JSON.stringify(formData.sections))
      data.append('customSections', JSON.stringify(formData.customSections.filter(s => s.name)))
      data.append('fontPairing', formData.fontPairing)
      data.append('customFont', formData.customFont)
      data.append('headerStyle', formData.headerStyle)
      data.append('customHeaderStyle', formData.customHeaderStyle)
      data.append('heroStyle', formData.heroStyle)
      data.append('customHeroStyle', formData.customHeroStyle)
      data.append('includeFeatures', JSON.stringify(formData.includeFeatures))
      data.append('customFeatures', JSON.stringify(formData.customFeatures.filter(Boolean)))
      data.append('extraNotes', formData.extraNotes)

      // Add files
      if (formData.logoFile) {
        data.append('logo', formData.logoFile)
      }
      formData.photoFiles.forEach((file) => {
        data.append('photos', file)
      })

      // Add photo assignments
      data.append('photoAssignments', JSON.stringify(formData.photoAssignments))

      const result = await submitForm(data)
      navigate(`/build/${result.submissionId}`)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    const commonProps = { formData, updateField }

    switch (currentStep) {
      case 1:
        return <Step1Business {...commonProps} onNext={() => goTo(2)} />
      case 2:
        return (
          <Step2Goal
            {...commonProps}
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
          />
        )
      case 3:
        return (
          <Step3Content
            {...commonProps}
            addService={addService}
            updateService={updateService}
            removeService={removeService}
            setLogoFile={setLogoFile}
            setPhotoFiles={setPhotoFiles}
            onBack={() => goTo(2)}
            onNext={() => goTo(4)}
          />
        )
      case 4:
        return (
          <Step4Style
            {...commonProps}
            toggleVisualEffect={toggleVisualEffect}
            onBack={() => goTo(3)}
            onNext={() => goTo(5)}
          />
        )
      case 5:
        return (
          <Step5Structure
            {...commonProps}
            toggleSection={toggleSection}
            toggleFeature={toggleFeature}
            addCustomSection={addCustomSection}
            updateCustomSection={updateCustomSection}
            removeCustomSection={removeCustomSection}
            addCustomFeature={addCustomFeature}
            updateCustomFeature={updateCustomFeature}
            removeCustomFeature={removeCustomFeature}
            assignPhotoToSection={assignPhotoToSection}
            onBack={() => goTo(4)}
            onNext={() => goTo(6)}
          />
        )
      case 6:
        return (
          <Step6Review
            formData={formData}
            onBack={() => goTo(5)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <MobileNav currentStep={currentStep} onStepClick={goTo} />

      <div className="flex">
        <Sidebar currentStep={currentStep} onStepClick={goTo} />

        <main className="flex-1 min-h-screen">
          <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-8 text-sm flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
            {renderStep()}
          </div>
        </main>
      </div>
    </div>
  )
}
