import { useState } from 'react'
import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import { TextArea } from '../FormField'
import SectionContentEditor from '../SectionContentEditor'
import Button from '../Button'

const headerOptions = [
  { id: 'standard', title: 'Standard', desc: 'Sticky with glass blur' },
  { id: 'centered', title: 'Centered', desc: 'Floating, centered nav' },
  { id: 'minimal', title: 'Minimal', desc: 'Transparent, appears on scroll' },
  { id: 'floating', title: 'Floating Pill', desc: 'Modern SaaS-style' },
]

const sectionMeta = {
  hero:         { label: 'Hero',         desc: 'Main banner with headline and CTA',   required: true,  variants: [{ id: 'split', label: 'Split' }, { id: 'centered', label: 'Centered' }, { id: 'fullscreen', label: 'Full Screen' }, { id: 'minimal', label: 'Minimal' }] },
  services:     { label: 'Services',     desc: 'Showcase what you offer',             required: false, variants: [{ id: 'grid', label: 'Grid' }, { id: 'list', label: 'List' }, { id: 'bento', label: 'Bento' }] },
  about:        { label: 'About',        desc: 'Tell your story',                     required: false, variants: [{ id: 'split', label: 'Split' }, { id: 'centered', label: 'Centered' }, { id: 'timeline', label: 'Timeline' }] },
  gallery:      { label: 'Gallery',      desc: 'Show off your work',                  required: false, variants: [{ id: 'grid', label: 'Grid' }, { id: 'masonry', label: 'Masonry' }, { id: 'carousel', label: 'Carousel' }] },
  testimonials: { label: 'Testimonials', desc: 'Customer reviews & quotes',           required: false, variants: [{ id: 'cards', label: 'Cards' }, { id: 'carousel', label: 'Carousel' }, { id: 'single', label: 'Featured' }] },
  team:         { label: 'Team',         desc: 'Introduce your people',               required: false, variants: [{ id: 'grid', label: 'Grid' }, { id: 'list', label: 'List' }] },
  pricing:      { label: 'Pricing',      desc: 'Plans and packages',                  required: false, variants: [{ id: 'cards', label: 'Cards' }, { id: 'table', label: 'Table' }] },
  faq:          { label: 'FAQ',          desc: 'Common questions answered',           required: false, variants: [{ id: 'accordion', label: 'Accordion' }, { id: 'grid', label: 'Grid' }] },
  contact:      { label: 'Contact',      desc: 'Get in touch form',                   required: false, variants: [{ id: 'split', label: 'Split' }, { id: 'centered', label: 'Centered' }, { id: 'minimal', label: 'Minimal' }] },
  booking:      { label: 'Booking',      desc: 'Let visitors schedule appointments',  required: false, variants: [{ id: 'centered', label: 'Centered' }, { id: 'split', label: 'Split' }] },
}

const ALL_SECTION_IDS = ['hero', 'services', 'about', 'gallery', 'testimonials', 'team', 'pricing', 'faq', 'contact', 'booking']

// ── Inline integration panels ────────────────────────────────────────────────

function ContactIntegrationPanel({ integrations, updateIntegration }) {
  const cf = integrations?.contactForm || {}
  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="text-xs font-medium text-white">Contact Form Integration</div>
          <div className="text-xs text-muted mt-0.5">Powered by Formspree — submissions go to your email.</div>
        </div>
        <button
          type="button"
          onClick={() => updateIntegration('contactForm', 'enabled', !cf.enabled)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${cf.enabled ? 'bg-accent' : 'bg-border'}`}
        >
          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${cf.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
      </div>
      {cf.enabled && (
        <div className="mt-3 space-y-1.5">
          <input
            type="url"
            value={cf.endpoint || ''}
            onChange={(e) => updateIntegration('contactForm', 'endpoint', e.target.value)}
            placeholder="https://formspree.io/f/xabcdefg"
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
          />
          <p className="text-xs text-muted">
            Get your endpoint at{' '}
            <a href="https://formspree.io" target="_blank" rel="noreferrer" className="text-accent hover:underline">formspree.io</a>
          </p>
        </div>
      )}
    </div>
  )
}

function BookingIntegrationPanel({ integrations, updateIntegration }) {
  const bk = integrations?.booking || {}
  return (
    <div className="mt-4 pt-4 border-t border-border">
      <div className="flex items-center justify-between mb-1">
        <div>
          <div className="text-xs font-medium text-white">Calendly Integration</div>
          <div className="text-xs text-muted mt-0.5">Embed your calendar so visitors can book directly on the page.</div>
        </div>
        <button
          type="button"
          onClick={() => updateIntegration('booking', 'enabled', !bk.enabled)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors shrink-0 ${bk.enabled ? 'bg-accent' : 'bg-border'}`}
        >
          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${bk.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
        </button>
      </div>
      {bk.enabled && (
        <div className="mt-3 space-y-1.5">
          <input
            type="url"
            value={bk.url || ''}
            onChange={(e) => updateIntegration('booking', 'url', e.target.value)}
            placeholder="https://calendly.com/yourname/30min"
            className="w-full bg-bg border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
          />
          <p className="text-xs text-muted">
            Find your link in Calendly under <strong className="text-white">Event Types</strong>
          </p>
        </div>
      )}
    </div>
  )
}

// ── Section accordion row ────────────────────────────────────────────────────

function SectionRow({
  sectionId,
  index,
  total,
  isExpanded,
  onToggleExpand,
  onToggleOff,
  onMoveUp,
  onMoveDown,
  variant,
  onVariantChange,
  sectionContent,
  updateStructuredContent,
  integrations,
  updateIntegration,
}) {
  const meta = sectionMeta[sectionId] || { label: sectionId, desc: '', required: false, variants: [] }

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Row header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Toggle off (disabled for required) */}
        {meta.required ? (
          <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <button
            type="button"
            onClick={onToggleOff}
            className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0 hover:bg-accent/80 transition-colors"
            title="Remove section"
          >
            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}

        {/* Label + expand (click to expand) */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex-1 text-left"
        >
          <div className="text-sm font-medium text-white">{meta.label}</div>
        </button>

        {/* Reorder */}
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-1 text-muted hover:text-white disabled:opacity-20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="p-1 text-muted hover:text-white disabled:opacity-20 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Expand chevron */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="p-1 text-muted hover:text-white transition-colors"
        >
          <svg
            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border px-4 pt-4 pb-5 space-y-4">
          {/* Variant picker */}
          {meta.variants.length > 1 && (
            <div>
              <div className="text-xs font-medium text-muted mb-2">Layout</div>
              <div className="flex flex-wrap gap-1.5">
                {meta.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => onVariantChange(sectionId, v.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      (variant || meta.variants[0].id) === v.id
                        ? 'bg-accent text-black'
                        : 'bg-bg border border-border text-muted hover:text-white'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content editor */}
          <SectionContentEditor
            sectionId={sectionId}
            content={sectionContent || {}}
            onChange={(field, value) => updateStructuredContent(sectionId, field, value)}
            bare
          />

          {/* Integration panels */}
          {sectionId === 'contact' && (
            <ContactIntegrationPanel integrations={integrations} updateIntegration={updateIntegration} />
          )}
          {sectionId === 'booking' && (
            <BookingIntegrationPanel integrations={integrations} updateIntegration={updateIntegration} />
          )}
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

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
  integrations,
  updateIntegration,
  onBack,
  onSubmit,
  isSubmitting,
}) {
  const [activeTab, setActiveTab] = useState('sections')
  const [expandedSections, setExpandedSections] = useState({ hero: true })
  const [newPageTitle, setNewPageTitle] = useState('')
  const [draggedSection, setDraggedSection] = useState(null)

  // All active sections (standard + named custom)
  const allSections = [
    ...formData.sections,
    ...formData.customSections.filter(s => s.name).map(s => s.name),
  ]

  // Ordered selected standard sections
  const orderedSections = formData.sectionOrder.filter(s => formData.sections.includes(s))

  // Standard sections not yet selected
  const unselectedStandard = ALL_SECTION_IDS.filter(id => !formData.sections.includes(id))

  const toggleExpand = (sectionId) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
  }

  const handleToggleOn = (sectionId) => {
    toggleSection(sectionId)
    setExpandedSections(prev => ({ ...prev, [sectionId]: true }))
  }

  const handleToggleOff = (sectionId) => {
    toggleSection(sectionId)
    setExpandedSections(prev => ({ ...prev, [sectionId]: false }))
  }

  const handleMoveUp = (index) => {
    const order = [...formData.sectionOrder]
    if (index > 0) {
      ;[order[index], order[index - 1]] = [order[index - 1], order[index]]
      reorderSections(order)
    }
  }

  const handleMoveDown = (index) => {
    const order = [...formData.sectionOrder]
    const filtered = order.filter(s => allSections.includes(s))
    if (index < filtered.length - 1) {
      ;[order[index], order[index + 1]] = [order[index + 1], order[index]]
      reorderSections(order)
    }
  }

  // Pages tab helpers
  const getPageSections = (pageId) => {
    const page = formData.pages.find(p => p.id === pageId)
    return (page?.sections || []).filter(s => allSections.includes(s))
  }

  const getUnassignedSections = () => {
    const assigned = new Set()
    formData.pages.forEach(p => (p.sections || []).forEach(s => assigned.add(s)))
    return allSections.filter(s => !assigned.has(s))
  }

  const handleAddPage = () => {
    if (!newPageTitle.trim()) return
    addPage(newPageTitle.trim())
    setNewPageTitle('')
  }

  const handleDragStart = (e, sectionId) => {
    setDraggedSection(sectionId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, toPageId) => {
    e.preventDefault()
    if (!draggedSection) return
    moveSectionToPage(draggedSection, toPageId)
    setDraggedSection(null)
  }

  const handleReorderInPage = (pageId, sectionId, direction) => {
    const page = formData.pages.find(p => p.id === pageId)
    if (!page) return
    const sections = [...(page.sections || [])]
    const currentIndex = sections.indexOf(sectionId)
    if (currentIndex === -1) return
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= sections.length) return
    ;[sections[currentIndex], sections[newIndex]] = [sections[newIndex], sections[currentIndex]]
    updatePage(pageId, { sections })
  }

  const getSectionLabel = (sectionId) =>
    sectionMeta[sectionId]?.label ||
    formData.customSections.find(s => s.name === sectionId)?.name ||
    sectionId

  const photoUrls = formData.photoFiles.map(file =>
    typeof file === 'string' ? file : URL.createObjectURL(file)
  )

  return (
    <div className="animate-fade-up">
      <ProgressBar step={4} />
      <StepHeader
        stepNumber={4}
        title="Build Your Site"
        description="Choose sections, add your content, and configure integrations."
      />

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 bg-surface p-1 rounded-xl">
        {[
          { id: 'sections', label: 'Sections' },
          { id: 'pages', label: 'Pages' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-accent text-black' : 'text-muted hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== SECTIONS TAB ==================== */}
      {activeTab === 'sections' && (
        <div className="space-y-6">

          {/* Active sections accordion */}
          {orderedSections.length > 0 && (
            <div className="space-y-2">
              {orderedSections.map((sectionId, index) => (
                <SectionRow
                  key={sectionId}
                  sectionId={sectionId}
                  index={index}
                  total={orderedSections.length}
                  isExpanded={!!expandedSections[sectionId]}
                  onToggleExpand={() => toggleExpand(sectionId)}
                  onToggleOff={() => handleToggleOff(sectionId)}
                  onMoveUp={() => handleMoveUp(index)}
                  onMoveDown={() => handleMoveDown(index)}
                  variant={formData.sectionVariants[sectionId]}
                  onVariantChange={setSectionVariant}
                  sectionContent={formData.sectionContent[sectionId]}
                  updateStructuredContent={updateStructuredContent}
                  integrations={integrations}
                  updateIntegration={updateIntegration}
                />
              ))}
            </div>
          )}

          {/* Add a section */}
          {unselectedStandard.length > 0 && (
            <div>
              <div className="text-xs font-medium text-muted uppercase tracking-wider mb-3">
                Add a section
              </div>
              <div className="flex flex-wrap gap-2">
                {unselectedStandard.map((sectionId) => {
                  const meta = sectionMeta[sectionId]
                  return (
                    <button
                      key={sectionId}
                      type="button"
                      onClick={() => handleToggleOn(sectionId)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-surface border border-border rounded-xl text-sm text-muted hover:text-white hover:border-accent/50 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      {meta.label}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Custom sections */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-muted uppercase tracking-wider">Custom Sections</div>
              <button
                type="button"
                onClick={addCustomSection}
                className="text-sm text-accent hover:text-accent/80 transition-colors"
              >
                + Add
              </button>
            </div>
            {formData.customSections.length === 0 ? (
              <p className="text-sm text-muted">Need something specific? Add a custom section.</p>
            ) : (
              <div className="space-y-2">
                {formData.customSections.map((section, index) => (
                  <div key={index} className="flex gap-2">
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
            )}
          </div>

          {/* Photo assignments (only if photos uploaded) */}
          {formData.photoFiles.length > 0 && (
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-medium text-white mb-1">Photo Assignments</h3>
              <p className="text-xs text-muted mb-4">Assign photos to specific sections, or leave on Auto.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.photoFiles.map((file, index) => (
                  <div key={index} className="bg-surface border border-border rounded-xl overflow-hidden">
                    <div className="aspect-square">
                      <img src={photoUrls[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <select
                        value={formData.photoAssignments[index] || ''}
                        onChange={(e) => assignPhotoToSection(index, e.target.value)}
                        className="w-full bg-bg border border-border rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-accent"
                      >
                        <option value="">Auto</option>
                        {allSections.map((sectionId) => (
                          <option key={sectionId} value={sectionId}>{getSectionLabel(sectionId)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Extra notes */}
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-white mb-1">Anything Else?</h3>
            <TextArea
              value={formData.extraNotes}
              onChange={(value) => updateField('extraNotes', value)}
              placeholder="Any other requests or notes for your site..."
            />
          </div>
        </div>
      )}

      {/* ==================== PAGES TAB ==================== */}
      {activeTab === 'pages' && (
        <div className="space-y-6">

          {/* Single / Multi-page toggle */}
          <div>
            <h3 className="text-sm font-medium text-white mb-3">Site Type</h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => updateField('multiPage', false)}
                className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                  !formData.multiPage ? 'bg-accent/10 border-accent ring-1 ring-accent' : 'bg-surface border-border hover:border-[#444]'
                }`}
              >
                <div className="font-medium text-white text-sm">Single Page</div>
                <div className="text-xs text-muted mt-1">All sections on one scrolling page</div>
              </button>
              <button
                type="button"
                onClick={() => updateField('multiPage', true)}
                className={`flex-1 p-4 rounded-xl border text-left transition-all ${
                  formData.multiPage ? 'bg-accent/10 border-accent ring-1 ring-accent' : 'bg-surface border-border hover:border-[#444]'
                }`}
              >
                <div className="font-medium text-white text-sm">Multi-Page</div>
                <div className="text-xs text-muted mt-1">Organize sections across multiple pages</div>
              </button>
            </div>
          </div>

          {/* Section order (single-page) */}
          {!formData.multiPage && allSections.length > 0 && (
            <div className="bg-surface border border-border rounded-xl p-4">
              <h3 className="text-sm font-medium text-white mb-1">Section Order</h3>
              <p className="text-xs text-muted mb-4">Use the arrows to reorder how sections appear on your page.</p>
              <div className="space-y-2">
                {formData.sectionOrder
                  .filter(s => allSections.includes(s))
                  .map((sectionId, index, arr) => (
                    <div key={sectionId} className="flex items-center gap-3 p-3 bg-bg rounded-lg">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="text-muted hover:text-white disabled:opacity-30"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === arr.length - 1}
                          className="text-muted hover:text-white disabled:opacity-30"
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
          )}

          {/* Multi-page organizer */}
          {formData.multiPage && (
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

              <p className="text-xs text-muted">Drag sections between pages to organize your site.</p>

              <div className="grid gap-4 md:grid-cols-2">
                {formData.pages.map((page) => {
                  const pageSections = getPageSections(page.id)
                  const isHome = page.id === 'index'
                  const displaySections = isHome
                    ? [...pageSections, ...getUnassignedSections()]
                    : pageSections

                  return (
                    <div
                      key={page.id}
                      className={`bg-surface border rounded-xl overflow-hidden transition-all ${draggedSection ? 'border-accent/50' : 'border-border'}`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, page.id)}
                    >
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
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>

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
                                onDragStart={(e) => handleDragStart(e, sectionId)}
                                className="flex items-center gap-2 p-2 bg-bg rounded-lg cursor-move hover:bg-white/5 transition-colors group"
                              >
                                <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>
                                <span className="text-sm text-white flex-1">{getSectionLabel(sectionId)}</span>
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
          <div className="pt-4 border-t border-border">
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

      {/* Bottom nav */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
        <Button variant="ghost" onClick={onBack}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        <Button variant="primary" onClick={onSubmit} disabled={isSubmitting} className="px-8">
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
