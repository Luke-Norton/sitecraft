import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextArea } from '../FormField'
import SectionPicker from '../SectionPicker'
import DraggableSectionList from '../DraggableSectionList'
import SectionContentEditor from '../SectionContentEditor'
import LivePreview from '../LivePreview'
import StyleSelector from '../StyleSelector'
import NavRow from '../NavRow'

const headerOptions = [
  { id: 'standard', title: 'Standard', desc: 'Sticky with glass blur' },
  { id: 'centered', title: 'Centered', desc: 'Floating, centered nav' },
  { id: 'minimal', title: 'Minimal', desc: 'Transparent, appears on scroll' },
  { id: 'floating', title: 'Floating Pill', desc: 'Modern SaaS-style' },
  { id: 'custom', title: 'Custom', desc: 'Describe your own' },
]

const featureOptions = [
  { id: 'cta-sticky', label: 'Sticky CTA' },
  { id: 'back-to-top', label: 'Back to Top' },
  { id: 'social-float', label: 'Floating Social' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'map', label: 'Map' },
  { id: 'chat-widget', label: 'Chat Widget' },
  { id: 'dark-sections', label: 'Dark Sections' },
]

export default function Step5Structure({
  formData,
  updateField,
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
  assignPhotoToSection,
  onBack,
  onNext,
}) {
  const [activeTab, setActiveTab] = useState('sections') // 'sections' | 'content' | 'layout'
  const [collapsedSections, setCollapsedSections] = useState({})

  const toggleCollapse = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleAIHelp = (sectionId, field) => {
    // TODO: Implement AI help - for now just show a placeholder
    console.log('AI Help requested for:', sectionId, field)
    alert('AI content generation coming soon!')
  }

  // Get available sections for image assignment
  const availableSections = [
    ...formData.sections,
    ...formData.customSections.filter(s => s.name).map(s => s.name),
  ]

  // Create object URLs for photo previews
  const photoUrls = formData.photoFiles.map(file =>
    typeof file === 'string' ? file : URL.createObjectURL(file)
  )

  return (
    <div className="animate-fade-up">
      <ProgressBar step={5} />
      <StepHeader
        stepNumber={5}
        title="Build Your Site"
        description="Choose your sections, arrange them, and add your content."
      />

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 bg-surface p-1 rounded-xl">
        {[
          { id: 'sections', label: 'Sections', icon: '◫' },
          { id: 'content', label: 'Content', icon: '✎' },
          { id: 'layout', label: 'Layout', icon: '⚙' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-accent text-black'
                : 'text-muted hover:text-white'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Main content area */}
        <div className="flex-1 min-w-0">
          {/* SECTIONS TAB */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              <FormField label="What sections do you want on your site?">
                <SectionPicker
                  sections={formData.sections}
                  sectionVariants={formData.sectionVariants}
                  onToggle={toggleSection}
                  onVariantChange={setSectionVariant}
                />
              </FormField>

              {/* Custom Sections */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">Custom Sections</span>
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
                      placeholder="Section name"
                      className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
                    />
                    <input
                      type="text"
                      value={section.description}
                      onChange={(e) => updateCustomSection(index, 'description', e.target.value)}
                      placeholder="What should it include?"
                      className="flex-[2] bg-surface border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomSection(index)}
                      className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Section Order */}
              {formData.sections.length > 1 && (
                <FormField label="Section Order">
                  <DraggableSectionList
                    sections={formData.sections}
                    sectionOrder={formData.sectionOrder}
                    onReorder={reorderSections}
                  />
                </FormField>
              )}
            </div>
          )}

          {/* CONTENT TAB */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              {formData.sectionOrder.filter(s => formData.sections.includes(s)).length === 0 ? (
                <div className="text-center py-12 text-muted">
                  <p>No sections selected yet.</p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('sections')}
                    className="mt-2 text-accent hover:text-accent/80"
                  >
                    Go to Sections tab →
                  </button>
                </div>
              ) : (
                formData.sectionOrder
                  .filter(s => formData.sections.includes(s))
                  .map((sectionId) => (
                    <SectionContentEditor
                      key={sectionId}
                      sectionId={sectionId}
                      content={formData.sectionContent[sectionId]}
                      onChange={updateStructuredContent}
                      onAIHelp={handleAIHelp}
                      collapsed={collapsedSections[sectionId]}
                      onToggleCollapse={() => toggleCollapse(sectionId)}
                    />
                  ))
              )}

              {/* Photo Assignment */}
              {formData.photoFiles.length > 0 && (
                <FormField label="Assign photos to sections" className="mt-8">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.photoFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-surface border border-border rounded-xl overflow-hidden"
                      >
                        <div className="aspect-square relative">
                          <img
                            src={photoUrls[index]}
                            alt={file.name || `Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <select
                            value={formData.photoAssignments[index] || ''}
                            onChange={(e) => assignPhotoToSection(index, e.target.value)}
                            className="w-full bg-[#1a1a1a] border border-border rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                          >
                            <option value="">Auto (AI decides)</option>
                            {availableSections.map((sectionId) => (
                              <option key={sectionId} value={sectionId}>
                                {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormField>
              )}
            </div>
          )}

          {/* LAYOUT TAB */}
          {activeTab === 'layout' && (
            <div className="space-y-6">
              {/* Header Style */}
              <StyleSelector
                label="Header Style"
                options={headerOptions}
                value={formData.headerStyle}
                onChange={(value) => updateField('headerStyle', value)}
              />
              {formData.headerStyle === 'custom' && (
                <textarea
                  value={formData.customHeaderStyle}
                  onChange={(e) => updateField('customHeaderStyle', e.target.value)}
                  placeholder="Describe your ideal header..."
                  rows={2}
                  className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
                />
              )}

              {/* Additional Features */}
              <FormField label="Extra Features" optional>
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
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Custom Features</span>
                  <button
                    type="button"
                    onClick={addCustomFeature}
                    className="text-sm text-accent hover:text-accent/80"
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
                      placeholder="Describe a feature..."
                      className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => removeCustomFeature(index)}
                      className="px-3 py-2 text-red-400 hover:text-red-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Extra Notes */}
              <FormField label="Anything else?" optional>
                <TextArea
                  value={formData.extraNotes}
                  onChange={(value) => updateField('extraNotes', value)}
                  placeholder="Any other specific requests..."
                />
              </FormField>
            </div>
          )}
        </div>

        {/* Live Preview sidebar - only show on larger screens */}
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-4">
            <div className="text-sm font-medium text-white mb-3">Live Preview</div>
            <LivePreview
              sections={formData.sections}
              sectionOrder={formData.sectionOrder}
              sectionVariants={formData.sectionVariants}
              colorPrimary={formData.colorPrimary}
            />
          </div>
        </div>
      </div>

      <NavRow onBack={onBack} onNext={onNext} nextLabel="Review →" />
    </div>
  )
}
