import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import ReviewSection from '../ReviewSection'
import Button from '../Button'

const designStyleLabels = {
  minimal: 'Clean & Minimal',
  modern: 'Modern & Professional',
  bold: 'Bold & Creative',
}

const animationLabels = {
  minimal: 'Minimal',
  moderate: 'Moderate',
  dynamic: 'Dynamic',
}

const effectLabels = {
  shadows: 'Drop Shadows',
  rounded: 'Rounded Corners',
  gradients: 'Gradients',
  glassmorphism: 'Glass Effects',
  patterns: 'Background Patterns',
  animations: 'Floating Elements',
}

const sectionLabels = {
  hero: 'Hero',
  services: 'Services',
  about: 'About',
  gallery: 'Gallery',
  testimonials: 'Testimonials',
  team: 'Team',
  pricing: 'Pricing',
  faq: 'FAQ',
  contact: 'Contact',
}

const fontLabels = {
  modern: 'Modern (Inter)',
  classic: 'Classic (Playfair + Lato)',
  bold: 'Bold (Oswald + Open Sans)',
  friendly: 'Friendly (Nunito)',
  professional: 'Professional (Montserrat)',
  elegant: 'Elegant (Cormorant)',
}

const headerLabels = {
  standard: 'Standard (Logo left)',
  centered: 'Centered',
  minimal: 'Minimal',
}

const heroLabels = {
  fullscreen: 'Full Screen',
  half: 'Half Screen',
  split: 'Split Layout',
  simple: 'Simple',
}

const featureLabels = {
  'cta-sticky': 'Sticky CTA',
  'back-to-top': 'Back to Top',
  'social-float': 'Floating Social',
  'newsletter': 'Newsletter',
  'map': 'Map',
  'chat-widget': 'Chat Widget',
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
          ['Logo', formData.logoFile?.name || null],
          ['Photos', formData.photoFiles.length > 0 ? `${formData.photoFiles.length} photo(s)` : null],
        ]}
      />

      <ReviewSection
        title="Design"
        rows={[
          ['Style keywords', formData.styleKeywords],
          ['Design style', designStyleLabels[formData.designStyle]],
          ['Animations', animationLabels[formData.animationLevel]],
          ['Effects', formData.visualEffects?.map(e => effectLabels[e]).join(', ')],
          ['Primary color', formData.colorPrimary],
          ['Accent color', formData.colorAccent],
          ['Background', formData.colorBg],
          ['Inspiration 1', formData.inspo1],
          ['Inspiration 2', formData.inspo2],
        ]}
      />

      <ReviewSection
        title="Structure"
        rows={[
          ['Sections', formData.sections?.map(s => sectionLabels[s]).join(', ')],
          ['Custom sections', formData.customSections?.filter(s => s.name).length > 0
            ? formData.customSections.filter(s => s.name).map(s => s.name).join(', ')
            : null],
          ['Font', formData.fontPairing === 'custom'
            ? `Custom: ${formData.customFont || '(not specified)'}`
            : fontLabels[formData.fontPairing]],
          ['Header', formData.headerStyle === 'custom'
            ? `Custom: ${formData.customHeaderStyle || '(not specified)'}`
            : headerLabels[formData.headerStyle]],
          ['Hero', formData.heroStyle === 'custom'
            ? `Custom: ${formData.customHeroStyle || '(not specified)'}`
            : heroLabels[formData.heroStyle]],
          ['Features', formData.includeFeatures?.length > 0
            ? formData.includeFeatures.map(f => featureLabels[f]).join(', ')
            : null],
          ['Custom features', formData.customFeatures?.filter(Boolean).length > 0
            ? formData.customFeatures.filter(Boolean).join(', ')
            : null],
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
