import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormState } from '../hooks/useFormState'
import { submitForm } from '../lib/api'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import {
  Step1Business,
  Step3Content,
  Step4Style,
  Step5Structure,
} from '../components/steps'

export default function IntakeForm() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const {
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
    toggleFeature,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomFeature,
    updateCustomFeature,
    removeCustomFeature,
    addPage,
    updatePage,
    removePage,
    moveSectionToPage,
    toggleSectionAsPage,
    updateIntegration,
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
      data.append('phone', formData.phone)
      data.append('email', formData.email)
      data.append('address', formData.address)
      data.append('facebook', formData.facebook)
      data.append('instagram', formData.instagram)
      data.append('otherSocial', formData.otherSocial)
      data.append('colorPrimary', formData.colorPrimary)
      data.append('colorAccent', formData.colorAccent)
      data.append('colorBg', formData.colorBg)
      data.append('tone', formData.tone)
      data.append('designStyle', formData.designStyle)
      data.append('headingFont', formData.headingFont)
      data.append('customHeadingFont', formData.customHeadingFont)
      data.append('bodyFont', formData.bodyFont)
      data.append('customBodyFont', formData.customBodyFont)
      data.append('sections', JSON.stringify(formData.sections))
      data.append('sectionOrder', JSON.stringify(formData.sectionOrder))
      data.append('sectionVariants', JSON.stringify(formData.sectionVariants))
      data.append('sectionContent', JSON.stringify(formData.sectionContent))
      data.append('customSections', JSON.stringify(formData.customSections.filter(s => s.name)))
      data.append('headerStyle', formData.headerStyle)
      data.append('customHeaderStyle', formData.customHeaderStyle)
      data.append('heroStyle', formData.heroStyle)
      data.append('customHeroStyle', formData.customHeroStyle)
      data.append('includeFeatures', JSON.stringify(formData.includeFeatures))
      data.append('customFeatures', JSON.stringify(formData.customFeatures.filter(Boolean)))
      data.append('integrations', JSON.stringify(formData.integrations))
      data.append('extraNotes', formData.extraNotes)

      // Multi-page settings
      data.append('multiPage', formData.multiPage)

      // Build pages with section assignments
      if (formData.multiPage) {
        // Get all assigned sections
        const assignedSections = new Set()
        formData.pages.forEach(p => p.sections?.forEach(s => assignedSections.add(s)))

        // Find unassigned sections (go to home page)
        const allSections = [
          ...formData.sections,
          ...formData.customSections.filter(s => s.name).map(s => s.name),
        ]
        const unassigned = allSections.filter(s => !assignedSections.has(s))

        // Build final pages array with index getting unassigned sections
        const pagesWithSections = formData.pages.map(p => ({
          ...p,
          sections: p.id === 'index'
            ? [...(p.sections || []), ...unassigned]
            : p.sections || [],
        }))
        data.append('pages', JSON.stringify(pagesWithSections))
      } else {
        // Single page - all sections on index
        const allSections = [
          ...formData.sections,
          ...formData.customSections.filter(s => s.name).map(s => s.name),
        ]
        data.append('pages', JSON.stringify([
          { id: 'index', name: 'index', title: 'Home', sections: allSections }
        ]))
      }

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
          <Step3Content
            {...commonProps}
            setLogoFile={setLogoFile}
            setPhotoFiles={setPhotoFiles}
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
          />
        )
      case 3:
        return (
          <Step4Style
            {...commonProps}
            onBack={() => goTo(2)}
            onNext={() => goTo(4)}
          />
        )
      case 4:
        return (
          <Step5Structure
            {...commonProps}
            toggleSection={toggleSection}
            reorderSections={reorderSections}
            setSectionVariant={setSectionVariant}
            updateStructuredContent={updateStructuredContent}
            addContentItem={addContentItem}
            updateContentItem={updateContentItem}
            removeContentItem={removeContentItem}
            toggleFeature={toggleFeature}
            addCustomSection={addCustomSection}
            updateCustomSection={updateCustomSection}
            removeCustomSection={removeCustomSection}
            addCustomFeature={addCustomFeature}
            updateCustomFeature={updateCustomFeature}
            removeCustomFeature={removeCustomFeature}
            assignPhotoToSection={assignPhotoToSection}
            addPage={addPage}
            updatePage={updatePage}
            removePage={removePage}
            moveSectionToPage={moveSectionToPage}
            toggleSectionAsPage={toggleSectionAsPage}
            integrations={formData.integrations}
            updateIntegration={updateIntegration}
            onBack={() => goTo(3)}
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
          <div className={`mx-auto px-6 py-12 md:py-16 ${currentStep === 4 ? 'max-w-5xl' : 'max-w-2xl'}`}>
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
