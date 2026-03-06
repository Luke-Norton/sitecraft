import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextArea } from '../FormField'
import SectionPicker from '../SectionPicker'
import SectionContentEditor from '../SectionContentEditor'
import StyleSelector from '../StyleSelector'
import NavRow from '../NavRow'

const headerOptions = [
  { id: 'standard', title: 'Standard', desc: 'Sticky with glass blur' },
  { id: 'centered', title: 'Centered', desc: 'Floating, centered nav' },
  { id: 'minimal', title: 'Minimal', desc: 'Transparent, appears on scroll' },
  { id: 'floating', title: 'Floating Pill', desc: 'Modern SaaS-style' },
]


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
  addCustomSection,
  updateCustomSection,
  removeCustomSection,
  addCustomFeature,
  updateCustomFeature,
  removeCustomFeature,
  assignPhotoToSection,
  addPage,
  updatePage,
  removePage,
  moveSectionToPage,
  toggleSectionAsPage,
  onBack,
  onNext,
}) {
  const [activeTab, setActiveTab] = useState('sections')
  const [collapsedSections, setCollapsedSections] = useState({})
  const [newPageTitle, setNewPageTitle] = useState('')
  const [draggedSection, setDraggedSection] = useState(null)

  // Get all sections including custom ones
  const allSections = [
    ...formData.sections,
    ...formData.customSections.filter(s => s.name).map(s => s.name),
  ]

  // Get sections for a specific page
  const getPageSections = (pageId) => {
    const page = formData.pages.find(p => p.id === pageId)
    return (page?.sections || []).filter(s => allSections.includes(s))
  }

  // Get unassigned sections (will go to home)
  const getUnassignedSections = () => {
    const assigned = new Set()
    formData.pages.forEach(p => (p.sections || []).forEach(s => assigned.add(s)))
    return allSections.filter(s => !assigned.has(s))
  }

  // Handle adding a new page
  const handleAddPage = () => {
    if (!newPageTitle.trim()) return
    addPage(newPageTitle.trim())
    setNewPageTitle('')
  }

  // Handle drag start
  const handleDragStart = (e, sectionId, fromPageId) => {
    setDraggedSection({ sectionId, fromPageId })
    e.dataTransfer.effectAllowed = 'move'
  }

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  // Handle drop on a page
  const handleDrop = (e, toPageId) => {
    e.preventDefault()
    if (!draggedSection) return

    const { sectionId } = draggedSection
    moveSectionToPage(sectionId, toPageId)
    setDraggedSection(null)
  }

  // Handle reordering within a page
  const handleReorderInPage = (pageId, sectionId, direction) => {
    const page = formData.pages.find(p => p.id === pageId)
    if (!page) return

    const sections = [...(page.sections || [])]
    const currentIndex = sections.indexOf(sectionId)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= sections.length) return

    // Swap
    [sections[currentIndex], sections[newIndex]] = [sections[newIndex], sections[currentIndex]]
    updatePage(pageId, { sections })
  }

  const toggleCollapse = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Get section label
  const getSectionLabel = (sectionId) => {
    return sectionLabels[sectionId] ||
      formData.customSections.find(s => s.name === sectionId)?.name ||
      sectionId
  }

  // Photo URLs for assignment
  const photoUrls = formData.photoFiles.map(file =>
    typeof file === 'string' ? file : URL.createObjectURL(file)
  )

  return (
    <div className="animate-fade-up">
      <ProgressBar step={5} />
      <StepHeader
        stepNumber={5}
        title="Build Your Site"
        description="Choose sections, organize pages, and add your content."
      />

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 bg-surface p-1 rounded-xl">
        {[
          { id: 'sections', label: 'Sections' },
          { id: 'layout', label: 'Layout' },
          { id: 'content', label: 'Content' },
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
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== SECTIONS TAB ==================== */}
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
                + Add Custom
              </button>
            </div>
            {formData.customSections.length === 0 && (
              <p className="text-sm text-muted">Need something specific? Add a custom section.</p>
            )}
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

          {allSections.length > 0 && (
            <div className="bg-surface border border-border rounded-xl p-4">
              <div className="text-sm text-muted">
                <strong className="text-white">{allSections.length} sections selected.</strong>
                {' '}Go to the Layout tab to organize them into pages.
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== LAYOUT TAB ==================== */}
      {activeTab === 'layout' && (
        <div className="space-y-6">
          {/* Site Type Toggle */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => updateField('multiPage', false)}
              className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                !formData.multiPage
                  ? 'bg-accent/10 border-accent ring-1 ring-accent'
                  : 'bg-surface border-border hover:border-[#444]'
              }`}
            >
              <div className="font-medium text-white text-sm">Single Page</div>
              <div className="text-xs text-muted mt-1">All sections on one scrolling page</div>
            </button>
            <button
              type="button"
              onClick={() => updateField('multiPage', true)}
              className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                formData.multiPage
                  ? 'bg-accent/10 border-accent ring-1 ring-accent'
                  : 'bg-surface border-border hover:border-[#444]'
              }`}
            >
              <div className="font-medium text-white text-sm">Multi-Page</div>
              <div className="text-xs text-muted mt-1">Organize sections across multiple pages</div>
            </button>
          </div>

          {allSections.length === 0 ? (
            <div className="text-center py-12 bg-surface border border-border rounded-xl">
              <p className="text-muted mb-2">No sections selected yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className="text-accent hover:text-accent/80"
              >
                Go to Sections tab →
              </button>
            </div>
          ) : !formData.multiPage ? (
            /* Single Page Mode - Simple reorder */
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="text-sm font-medium text-white mb-3">Section Order</h3>
              <p className="text-xs text-muted mb-4">Drag to reorder how sections appear on your page.</p>
              <div className="space-y-2">
                {formData.sectionOrder
                  .filter(s => allSections.includes(s))
                  .map((sectionId, index) => (
                    <div
                      key={sectionId}
                      className="flex items-center gap-3 p-3 bg-bg rounded-lg"
                    >
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const order = [...formData.sectionOrder]
                            if (index > 0) {
                              [order[index], order[index - 1]] = [order[index - 1], order[index]]
                              reorderSections(order)
                            }
                          }}
                          disabled={index === 0}
                          className="text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const order = [...formData.sectionOrder]
                            const filteredOrder = order.filter(s => allSections.includes(s))
                            if (index < filteredOrder.length - 1) {
                              [order[index], order[index + 1]] = [order[index + 1], order[index]]
                              reorderSections(order)
                            }
                          }}
                          disabled={index === formData.sectionOrder.filter(s => allSections.includes(s)).length - 1}
                          className="text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      <span className="text-sm text-white flex-1">{getSectionLabel(sectionId)}</span>
                      <span className="text-xs text-muted">#{index + 1}</span>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Multi-Page Mode - Page organizer */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">Your Pages</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPageTitle}
                    onChange={(e) => setNewPageTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddPage()}
                    placeholder="New page name..."
                    className="bg-surface border border-border rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent w-40"
                  />
                  <button
                    type="button"
                    onClick={handleAddPage}
                    disabled={!newPageTitle.trim()}
                    className="px-3 py-1.5 bg-accent text-black text-sm font-medium rounded-lg disabled:opacity-50 hover:bg-accent/90 transition-colors"
                  >
                    + Add Page
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted">
                Drag sections between pages to organize your site. Each page will have its own URL and navigation link.
              </p>

              {/* Pages */}
              <div className="grid gap-4 md:grid-cols-2">
                {formData.pages.map((page) => {
                  const pageSections = getPageSections(page.id)
                  const isHome = page.id === 'index'
                  // For home, also include unassigned sections
                  const displaySections = isHome
                    ? [...pageSections, ...getUnassignedSections()]
                    : pageSections

                  return (
                    <div
                      key={page.id}
                      className={`bg-surface border rounded-xl overflow-hidden transition-all ${
                        draggedSection ? 'border-accent/50' : 'border-border'
                      }`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, page.id)}
                    >
                      {/* Page header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                            {page.title.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{page.title}</div>
                            <div className="text-xs text-muted">{page.name}.html</div>
                          </div>
                        </div>
                        {!isHome && (
                          <button
                            type="button"
                            onClick={() => removePage(page.id)}
                            className="p-1 text-muted hover:text-red-400 transition-colors"
                            title="Delete page"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Page sections */}
                      <div className="p-3 min-h-[100px]">
                        {displaySections.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-sm text-muted py-8">
                            Drag sections here
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {displaySections.map((sectionId, index) => (
                              <div
                                key={sectionId}
                                draggable
                                onDragStart={(e) => handleDragStart(e, sectionId, page.id)}
                                className="flex items-center gap-2 p-2 bg-bg rounded-lg cursor-move hover:bg-white/5 transition-colors group"
                              >
                                <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                                <span className="text-sm text-white flex-1">
                                  {getSectionLabel(sectionId)}
                                </span>
                                {/* Reorder buttons */}
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    type="button"
                                    onClick={() => handleReorderInPage(page.id, sectionId, 'up')}
                                    disabled={index === 0}
                                    className="p-1 text-muted hover:text-white disabled:opacity-30"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleReorderInPage(page.id, sectionId, 'down')}
                                    disabled={index === displaySections.length - 1}
                                    className="p-1 text-muted hover:text-white disabled:opacity-30"
                                  >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Header Style */}
          <div className="pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-white mb-3">Header Style</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {headerOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => updateField('headerStyle', option.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    formData.headerStyle === option.id
                      ? 'bg-accent/10 border-accent'
                      : 'bg-surface border-border hover:border-[#444]'
                  }`}
                >
                  <div className="text-sm font-medium text-white">{option.title}</div>
                  <div className="text-xs text-muted mt-0.5">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== CONTENT TAB ==================== */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {allSections.length === 0 ? (
            <div className="text-center py-12 bg-surface border border-border rounded-xl">
              <p className="text-muted mb-2">No sections selected yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab('sections')}
                className="text-accent hover:text-accent/80"
              >
                Go to Sections tab →
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted">
                Fill in your content below. Leave fields empty and AI will generate content for you.
              </p>

              {/* Section editors */}
              <div className="space-y-4">
                {formData.sectionOrder
                  .filter(s => allSections.includes(s))
                  .map((sectionId) => (
                    <SectionContentEditor
                      key={sectionId}
                      sectionId={sectionId}
                      content={formData.sectionContent[sectionId]}
                      onChange={updateStructuredContent}
                      onAIHelp={() => {}}
                      collapsed={collapsedSections[sectionId]}
                      onToggleCollapse={() => toggleCollapse(sectionId)}
                    />
                  ))}
              </div>

              {/* Photo Assignment */}
              {formData.photoFiles.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <h3 className="text-sm font-medium text-white mb-3">Photo Assignments</h3>
                  <p className="text-xs text-muted mb-4">Assign your uploaded photos to specific sections.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {formData.photoFiles.map((file, index) => (
                      <div key={index} className="bg-surface border border-border rounded-xl overflow-hidden">
                        <div className="aspect-square">
                          <img
                            src={photoUrls[index]}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-2">
                          <select
                            value={formData.photoAssignments[index] || ''}
                            onChange={(e) => assignPhotoToSection(index, e.target.value)}
                            className="w-full bg-bg border border-border rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                          >
                            <option value="">Auto</option>
                            {allSections.map((sectionId) => (
                              <option key={sectionId} value={sectionId}>
                                {getSectionLabel(sectionId)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Extra Notes */}
              <div className="pt-6 border-t border-border">
                <h3 className="text-sm font-medium text-white mb-3">Anything Else?</h3>
                <TextArea
                  value={formData.extraNotes}
                  onChange={(value) => updateField('extraNotes', value)}
                  placeholder="Any other requests or notes for your site..."
                />
              </div>
            </>
          )}
        </div>
      )}

      <NavRow onBack={onBack} onNext={onNext} nextLabel="Review →" />
    </div>
  )
}
