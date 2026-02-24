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
      data.append('structure', formData.structure)
      data.append('extraNotes', formData.extraNotes)

      // Add files
      if (formData.logoFile) {
        data.append('logo', formData.logoFile)
      }
      formData.photoFiles.forEach((file) => {
        data.append('photos', file)
      })

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
            onBack={() => goTo(3)}
            onNext={() => goTo(5)}
          />
        )
      case 5:
        return (
          <Step5Structure
            {...commonProps}
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
    <div className="min-h-screen">
      <MobileNav currentStep={currentStep} onStepClick={goTo} />

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
        <Sidebar currentStep={currentStep} onStepClick={goTo} />

        <main className="p-6 md:p-16 max-w-[760px]">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sc mb-6 text-sm">
              {error}
            </div>
          )}
          {renderStep()}
        </main>
      </div>
    </div>
  )
}
