import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import ReviewSection from '../ReviewSection'
import Button from '../Button'

const structureLabels = {
  simple: 'Single page (basics only)',
  standard: 'Multi-page (Home, Services, About, Contact)',
  full: 'Full site (multiple pages, gallery, team, etc.)',
}

export default function Step6Review({ formData, onBack, onSubmit, isSubmitting }) {
  const filteredServices = formData.services.filter(Boolean).join(', ')

  return (
    <div className="animate-fade-up">
      <ProgressBar step={6} />
      <StepHeader
        stepNumber={6}
        title="Review & Build"
        description="Here's everything we collected. Review it, then click the button below to build your site."
      />

      <ReviewSection
        title="Business"
        rows={[
          ['Name', formData.bizName],
          ['Description', formData.bizDesc],
          ['Location', formData.bizLocation],
        ]}
      />

      <ReviewSection
        title="Goal"
        rows={[['Primary goal', formData.siteGoal]]}
      />

      <ReviewSection
        title="Content"
        rows={[
          ['About', formData.bizAbout],
          ['Services', filteredServices],
          ['Phone', formData.phone],
          ['Email', formData.email],
          ['Address', formData.address],
          ['Facebook', formData.facebook],
          ['Instagram', formData.instagram],
          ['Other link', formData.otherSocial],
          ['Logo uploaded', formData.logoFile?.name || null],
          [
            'Photos uploaded',
            formData.photoFiles.length > 0
              ? formData.photoFiles.map((f) => f.name).join(', ')
              : null,
          ],
        ]}
      />

      <ReviewSection
        title="Style"
        rows={[
          ['Keywords', formData.styleKeywords],
          ['Primary color', formData.colorPrimary],
          ['Accent color', formData.colorAccent],
          ['Background color', formData.colorBg],
          ['Inspiration 1', formData.inspo1],
          ['Inspiration 2', formData.inspo2],
        ]}
      />

      <ReviewSection
        title="Structure"
        rows={[
          ['Layout', structureLabels[formData.structure] || 'Not selected'],
          ['Extra notes', formData.extraNotes],
        ]}
      />

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Button variant="ghost" onClick={onBack}>
          ← Back
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-10"
        >
          {isSubmitting ? 'Submitting...' : 'Build My Site →'}
        </Button>
      </div>
    </div>
  )
}
