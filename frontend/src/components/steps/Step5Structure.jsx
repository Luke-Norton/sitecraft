import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextArea } from '../FormField'
import StyleSelector from '../StyleSelector'
import NavRow from '../NavRow'

const sectionOptions = [
  { id: 'hero', label: 'Hero / Header', required: true },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About Us' },
  { id: 'gallery', label: 'Gallery / Portfolio' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'team', label: 'Team Members' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

const headerOptions = [
  {
    id: 'standard',
    title: 'Standard',
    desc: 'Logo left, navigation right',
  },
  {
    id: 'centered',
    title: 'Centered',
    desc: 'Logo centered above navigation',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    desc: 'Clean and simple, less prominent',
  },
  {
    id: 'custom',
    title: 'Custom',
    desc: 'Describe your own header style',
  },
]

const heroOptions = [
  {
    id: 'fullscreen',
    title: 'Full Screen',
    desc: 'Hero takes up the entire viewport',
  },
  {
    id: 'half',
    title: 'Half Screen',
    desc: 'Shorter hero, content visible above fold',
  },
  {
    id: 'split',
    title: 'Split Layout',
    desc: 'Text on one side, image on the other',
  },
  {
    id: 'simple',
    title: 'Simple',
    desc: 'Text-focused, minimal hero section',
  },
  {
    id: 'custom',
    title: 'Custom',
    desc: 'Describe your own hero style',
  },
]

const featureOptions = [
  { id: 'cta-sticky', label: 'Sticky CTA Button' },
  { id: 'back-to-top', label: 'Back to Top Button' },
  { id: 'social-float', label: 'Floating Social Icons' },
  { id: 'newsletter', label: 'Newsletter Signup' },
  { id: 'map', label: 'Embedded Map' },
  { id: 'chat-widget', label: 'Chat Widget Placeholder' },
]

// Get section label for display
const getSectionLabel = (sectionId, customSections = []) => {
  const preset = sectionOptions.find(s => s.id === sectionId)
  if (preset) return preset.label
  const custom = customSections.find(s => s.name === sectionId)
  if (custom) return custom.name
  return sectionId
}

export default function Step5Structure({
  formData,
  updateField,
  toggleSection,
  toggleFeature,
  addCustomSection,
  updateCustomSection,
  removeCustomSection,
  addCustomFeature,
  updateCustomFeature,
  removeCustomFeature,
  assignPhotoToSection,
  onBack,
  onNext,
}) {
  // Get all available sections for image assignment
  const availableSections = [
    ...formData.sections,
    ...formData.customSections.filter(s => s.name).map(s => s.name),
  ]

  // Create object URLs for photo previews
  const photoUrls = formData.photoFiles.map(file => URL.createObjectURL(file))
  return (
    <div className="animate-fade-up">
      <ProgressBar step={5} />
      <StepHeader
        stepNumber={5}
        title="Structure & Layout"
        description="Customize exactly how your site is built."
      />

      {/* Sections */}
      <FormField label="Which sections do you want on your site?">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {sectionOptions.map((section) => {
            const isSelected = formData.sections.includes(section.id)
            const isRequired = section.required
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => !isRequired && toggleSection(section.id)}
                disabled={isRequired}
                className={`px-4 py-3 rounded-sc text-sm font-medium transition-all duration-200 border text-left ${
                  isSelected
                    ? 'bg-accent text-black border-accent'
                    : 'bg-surface text-muted border-border hover:border-[#555] hover:text-white'
                } ${isRequired ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {section.label}
                {isRequired && <span className="text-xs ml-1">(required)</span>}
              </button>
            )
          })}
        </div>
      </FormField>

      {/* Custom Sections */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Custom Sections</span>
          <button
            type="button"
            onClick={addCustomSection}
            className="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            + Add Custom Section
          </button>
        </div>
        {formData.customSections.map((section, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={section.name}
              onChange={(e) => updateCustomSection(index, 'name', e.target.value)}
              placeholder="Section name (e.g., 'Partners')"
              className="flex-1 bg-surface border border-border rounded-sc px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              value={section.description}
              onChange={(e) => updateCustomSection(index, 'description', e.target.value)}
              placeholder="What should it include?"
              className="flex-[2] bg-surface border border-border rounded-sc px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => removeCustomSection(index)}
              className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sc transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Image Assignment */}
      {formData.photoFiles.length > 0 && (
        <FormField
          label="Assign your images to sections"
          hint="Tell us where each image should appear on your site."
          className="mt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.photoFiles.map((file, index) => (
              <div
                key={index}
                className="bg-surface border border-border rounded-sc overflow-hidden"
              >
                <div className="aspect-square relative">
                  <img
                    src={photoUrls[index]}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted truncate mb-2" title={file.name}>
                    {file.name}
                  </p>
                  <select
                    value={formData.photoAssignments[index] || ''}
                    onChange={(e) => assignPhotoToSection(index, e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-border rounded-sc px-2 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                  >
                    <option value="">Auto (AI decides)</option>
                    {availableSections.map((sectionId) => (
                      <option key={sectionId} value={sectionId}>
                        {getSectionLabel(sectionId, formData.customSections)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </FormField>
      )}

      {/* Header Style */}
      <StyleSelector
        label="Header Layout"
        options={headerOptions}
        value={formData.headerStyle}
        onChange={(value) => updateField('headerStyle', value)}
      />
      {formData.headerStyle === 'custom' && (
        <div className="mt-3">
          <textarea
            value={formData.customHeaderStyle}
            onChange={(e) => updateField('customHeaderStyle', e.target.value)}
            placeholder="Describe your ideal header layout (e.g., 'Logo on the left with a mega menu dropdown, search icon, and a colorful CTA button on the right')"
            rows={2}
            className="w-full bg-surface border border-border rounded-sc px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>
      )}

      {/* Hero Style */}
      <StyleSelector
        label="Hero Style"
        options={heroOptions}
        value={formData.heroStyle}
        onChange={(value) => updateField('heroStyle', value)}
      />
      {formData.heroStyle === 'custom' && (
        <div className="mt-3">
          <textarea
            value={formData.customHeroStyle}
            onChange={(e) => updateField('customHeroStyle', e.target.value)}
            placeholder="Describe your ideal hero section (e.g., 'Video background with centered text overlay, animated headline, and two CTA buttons side by side')"
            rows={2}
            className="w-full bg-surface border border-border rounded-sc px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>
      )}

      {/* Additional Features */}
      <FormField label="Additional Features" optional>
        <div className="flex flex-wrap gap-2">
          {featureOptions.map((feature) => {
            const isSelected = formData.includeFeatures.includes(feature.id)
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => toggleFeature(feature.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-accent text-black border-accent'
                    : 'bg-surface text-muted border-border hover:border-[#555] hover:text-white'
                }`}
              >
                {feature.label}
              </button>
            )
          })}
        </div>
      </FormField>

      {/* Custom Features */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Custom Features</span>
          <button
            type="button"
            onClick={addCustomFeature}
            className="text-sm text-accent hover:text-accent/80 transition-colors"
          >
            + Add Custom Feature
          </button>
        </div>
        {formData.customFeatures.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => updateCustomFeature(index, e.target.value)}
              placeholder="Describe a custom feature (e.g., 'Animated counter showing years in business')"
              className="flex-1 bg-surface border border-border rounded-sc px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => removeCustomFeature(index)}
              className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-sc transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Extra Notes */}
      <FormField
        label="Anything else?"
        hint="Any other specific requests or details you want to include."
        optional
        className="mt-6"
      >
        <TextArea
          value={formData.extraNotes}
          onChange={(value) => updateField('extraNotes', value)}
          placeholder="e.g. I want the contact form to be really prominent, include my business hours, add a special offer banner..."
        />
      </FormField>

      <NavRow onBack={onBack} onNext={onNext} nextLabel="Review →" />
    </div>
  )
}
