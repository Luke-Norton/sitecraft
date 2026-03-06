import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import ReviewSection from '../ReviewSection'
import Button from '../Button'

const toneLabels = {
  professional: 'Professional',
  friendly: 'Friendly & Warm',
  bold: 'Bold & Direct',
  playful: 'Playful & Fun',
  luxurious: 'Luxurious & Premium',
}

const designStyleLabels = {
  minimal: 'Minimal & Refined',
  modern: 'Modern Professional',
  bold: 'Bold & Expressive',
  playful: 'Playful & Friendly',
  luxury: 'Luxury & Premium',
}

const animationLabels = {
  scrollReveal: 'Scroll Reveal',
  hoverCards: 'Card Hover Effects',
  hoverButtons: 'Button Hover Effects',
  heroAnimations: 'Animated Hero',
  floatingElements: 'Floating Elements',
}

const effectLabels = {
  roundedCorners: 'Rounded Corners',
  shadows: 'Drop Shadows',
  gradients: 'Gradients',
  glassBlur: 'Glass Blur',
  decorativeBorders: 'Accent Borders',
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
  auto: 'Auto (AI decides)',
  modern: 'Inter',
  geometric: 'Plus Jakarta Sans',
  clean: 'DM Sans',
  technical: 'Space Grotesk',
  friendly: 'Outfit',
  elegant: 'Sora',
  editorial: 'Fraunces',
  luxury: 'Cormorant',
}

const headerLabels = {
  standard: 'Standard (Glass blur)',
  centered: 'Centered Floating',
  minimal: 'Minimal',
  floating: 'Floating Pill',
}

const heroLabels = {
  fullscreen: 'Full Screen',
  split: 'Split Layout',
  minimal: 'Minimal',
  gradient: 'Gradient',
  bento: 'Bento Grid',
}

const featureLabels = {
  'cta-sticky': 'Sticky CTA',
  'back-to-top': 'Back to Top',
  'social-float': 'Floating Social',
  'newsletter': 'Newsletter',
  'map': 'Map',
  'chat-widget': 'Chat Widget',
  'dark-sections': 'Dark Sections',
  'testimonial-carousel': 'Testimonial Carousel',
}

export default function Step6Review({ formData, onBack, onSubmit, isSubmitting }) {
  // Get enabled animations
  const enabledAnimations = Object.entries(formData.animations || {})
    .filter(([_, enabled]) => enabled)
    .map(([key]) => animationLabels[key])
    .join(', ')

  // Get enabled effects
  const enabledEffects = Object.entries(formData.effects || {})
    .filter(([_, enabled]) => enabled)
    .map(([key]) => effectLabels[key])
    .join(', ')

  // Count sections with content (now objects, not strings)
  const sectionsWithContent = Object.entries(formData.sectionContent || {}).filter(([key, content]) => {
    if (!content || typeof content !== 'object') return false
    // Check if any field has content
    return Object.values(content).some(val => {
      if (Array.isArray(val)) return val.length > 0
      if (typeof val === 'string') return val.trim().length > 0
      return Boolean(val)
    })
  }).length

  // Get ordered sections display
  const orderedSections = (formData.sectionOrder || formData.sections || [])
    .filter(s => formData.sections?.includes(s))
    .map(s => sectionLabels[s] || s)
    .join(' → ')

  // Get all sections including custom
  const allSections = [
    ...formData.sections,
    ...(formData.customSections || []).filter(s => s.name).map(s => s.name),
  ]

  // Get page summary for multi-page sites
  const getPageStructure = () => {
    if (!formData.multiPage) return null

    const pages = formData.pages || []
    const assigned = new Set()
    pages.forEach(p => (p.sections || []).forEach(s => assigned.add(s)))
    const unassigned = allSections.filter(s => !assigned.has(s))

    return pages.map(p => {
      const sections = p.id === 'index'
        ? [...(p.sections || []), ...unassigned]
        : (p.sections || [])

      if (sections.length === 0 && p.id !== 'index') return null

      const sectionNames = sections
        .map(s => sectionLabels[s] || s)
        .join(', ')

      return `${p.title}: ${sectionNames || 'Empty'}`
    }).filter(Boolean)
  }

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
          ['Location', formData.bizLocation || 'Remote / Online'],
        ]}
      />

      <ReviewSection
        title="Goal"
        rows={[['Primary goal', formData.siteGoal]]}
      />

      <ReviewSection
        title="Assets & Contact"
        rows={[
          ['Logo', formData.logoFile?.name || 'None (will use text)'],
          ['Photos', formData.photoFiles.length > 0 ? `${formData.photoFiles.length} photo(s)` : 'None'],
          ['Phone', formData.phone],
          ['Email', formData.email],
          ['Address', formData.address],
          ['Facebook', formData.facebook],
          ['Instagram', formData.instagram],
          ['Other link', formData.otherSocial],
        ]}
      />

      <ReviewSection
        title="Design"
        rows={[
          ['Tone', toneLabels[formData.tone] || 'Professional'],
          ['Design style', designStyleLabels[formData.designStyle]],
          ['Font', formData.fontPairing === 'custom'
            ? `Custom: ${formData.customFont || '(not specified)'}`
            : fontLabels[formData.fontPairing]],
          ['Animations', enabledAnimations || 'None'],
          ['Effects', enabledEffects || 'None'],
          ['Primary color', formData.colorPrimary],
          ['Accent color', formData.colorAccent],
          ['Background', formData.colorBg],
        ]}
      />

      <ReviewSection
        title="Structure"
        rows={[
          ['Site type', formData.multiPage ? 'Multi-page website' : 'Single page website'],
          ...(formData.multiPage && getPageStructure()
            ? getPageStructure().map((pageInfo, i) => [`Page ${i + 1}`, pageInfo])
            : [['Sections', orderedSections || 'Hero only']]
          ),
          ['Section content', sectionsWithContent > 0 ? `${sectionsWithContent} section(s) with custom content` : 'AI will generate content'],
          formData.customSections?.filter(s => s.name).length > 0
            ? ['Custom sections', formData.customSections.filter(s => s.name).map(s => s.name).join(', ')]
            : null,
          ['Header', headerLabels[formData.headerStyle] || formData.headerStyle],
          formData.includeFeatures?.length > 0
            ? ['Features', formData.includeFeatures.map(f => featureLabels[f] || f).join(', ')]
            : null,
          formData.extraNotes ? ['Extra notes', formData.extraNotes] : null,
        ].filter(Boolean)}
      />

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Button variant="ghost" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-8"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Building...
            </>
          ) : (
            <>
              Build My Site
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
