import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextArea } from '../FormField'
import StyleSelector from '../StyleSelector'
import NavRow from '../NavRow'

const sectionOptions = [
  { id: 'hero', label: 'Hero / Header', required: true, placeholder: 'e.g., Main headline: "Transform Your Space". Subheadline: "Professional landscaping services for homes and businesses". CTA: "Get a Free Quote"' },
  { id: 'services', label: 'Services', placeholder: 'e.g., Lawn Mowing - Weekly maintenance, Tree Trimming - Keep your trees healthy, Seasonal Cleanup - Spring and fall services' },
  { id: 'about', label: 'About Us', placeholder: 'e.g., Family-owned since 2010, serving the Baton Rouge area. We take pride in quality work and customer satisfaction.' },
  { id: 'gallery', label: 'Gallery / Portfolio', placeholder: 'e.g., Before/after photos of recent projects, showcase our best work' },
  { id: 'testimonials', label: 'Testimonials', placeholder: 'e.g., "Best landscaping company in town!" - John D. | "They transformed our backyard completely" - Sarah M.' },
  { id: 'team', label: 'Team Members', placeholder: 'e.g., John Smith - Owner/Operator, Mike Johnson - Lead Technician, Sarah Williams - Office Manager' },
  { id: 'pricing', label: 'Pricing', placeholder: 'e.g., Basic Package $99/mo - lawn care only, Premium $199/mo - includes trimming, Full Service $299/mo - everything included' },
  { id: 'faq', label: 'FAQ', placeholder: 'e.g., Q: Do you offer free estimates? A: Yes! | Q: What areas do you serve? A: All of East Baton Rouge Parish' },
  { id: 'contact', label: 'Contact', placeholder: 'e.g., Include contact form, phone number prominently displayed, business hours: Mon-Fri 8am-6pm' },
]

const headerOptions = [
  {
    id: 'standard',
    title: 'Standard',
    desc: 'Sticky header with glass blur effect',
  },
  {
    id: 'centered',
    title: 'Centered',
    desc: 'Floating glass header, centered nav',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    desc: 'Transparent, appears on scroll',
  },
  {
    id: 'floating',
    title: 'Floating Pill',
    desc: 'Modern SaaS-style floating nav bar',
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
    desc: 'Bold full-viewport hero with large text',
  },
  {
    id: 'split',
    title: 'Split Layout',
    desc: 'Two columns: text left, image right',
  },
  {
    id: 'minimal',
    title: 'Minimal',
    desc: 'Clean, centered, typography-focused',
  },
  {
    id: 'gradient',
    title: 'Gradient',
    desc: 'Animated gradient or mesh background',
  },
  {
    id: 'bento',
    title: 'Bento Grid',
    desc: 'Hero integrated with feature cards below',
  },
  {
    id: 'custom',
    title: 'Custom',
    desc: 'Describe your own hero style',
  },
]

const featureOptions = [
  { id: 'cta-sticky', label: 'Sticky CTA' },
  { id: 'back-to-top', label: 'Back to Top' },
  { id: 'social-float', label: 'Floating Social Icons' },
  { id: 'newsletter', label: 'Newsletter Signup' },
  { id: 'map', label: 'Embedded Map' },
  { id: 'chat-widget', label: 'Chat Widget' },
  { id: 'dark-sections', label: 'Dark Sections' },
  { id: 'testimonial-carousel', label: 'Testimonial Carousel' },
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
  updateSectionContent,
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
      <div className="mt-4 mb-8">
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

      {/* Section Content */}
      <FormField
        label="What content goes in each section?"
        hint="Describe the content you want in each section. Be specific — include actual text, services, prices, testimonials, etc."
      >
        <div className="space-y-4">
          {formData.sections.map((sectionId) => {
            const section = sectionOptions.find(s => s.id === sectionId)
            if (!section) return null
            return (
              <div key={sectionId} className="bg-surface border border-border rounded-xl p-4">
                <label className="block text-sm font-medium text-white mb-2">
                  {section.label}
                </label>
                <textarea
                  value={formData.sectionContent[sectionId] || ''}
                  onChange={(e) => updateSectionContent(sectionId, e.target.value)}
                  placeholder={section.placeholder}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
                />
              </div>
            )
          })}
          {formData.customSections.filter(s => s.name).map((section, index) => (
            <div key={`custom-${index}`} className="bg-surface border border-border rounded-xl p-4">
              <label className="block text-sm font-medium text-white mb-2">
                {section.name}
                <span className="ml-2 text-xs text-muted">(Custom)</span>
              </label>
              <textarea
                value={formData.sectionContent[section.name] || ''}
                onChange={(e) => updateSectionContent(section.name, e.target.value)}
                placeholder={`Describe what content should appear in your ${section.name} section...`}
                rows={3}
                className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
              />
            </div>
          ))}
        </div>
      </FormField>

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
