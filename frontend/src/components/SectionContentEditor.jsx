import { useState } from 'react'

// Structured content editors for each section type

function HeroEditor({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Main Headline</label>
        <input
          type="text"
          value={content.headline || ''}
          onChange={(e) => onChange('headline', e.target.value)}
          placeholder="e.g., Transform Your Outdoor Space"
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Subheadline</label>
        <input
          type="text"
          value={content.subheadline || ''}
          onChange={(e) => onChange('subheadline', e.target.value)}
          placeholder="e.g., Professional landscaping services for homes and businesses"
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Button Text (CTA)</label>
        <input
          type="text"
          value={content.cta || ''}
          onChange={(e) => onChange('cta', e.target.value)}
          placeholder="e.g., Get a Free Quote"
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
        />
      </div>
    </div>
  )
}

function ServicesEditor({ content, onChange, onAIHelp }) {
  const items = content.items || []

  const addItem = () => {
    onChange('items', [...items, { name: '', description: '' }])
  }

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange('items', newItems)
  }

  const removeItem = (index) => {
    onChange('items', items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">Your Services</label>
        <button
          type="button"
          onClick={() => onAIHelp('services', 'items')}
          className="text-xs text-accent hover:text-accent/80 flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Suggest services
        </button>
      </div>

      {items.map((item, index) => (
        <div key={index} className="bg-[#1a1a1a] border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Service name"
              className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            value={item.description}
            onChange={(e) => updateItem(index, 'description', e.target.value)}
            placeholder="Brief description of this service"
            rows={2}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted hover:text-white hover:border-accent transition-colors"
      >
        + Add Service
      </button>
    </div>
  )
}

function AboutEditor({ content, onChange, onAIHelp }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted">Answer these questions to build your About section</span>
        <button
          type="button"
          onClick={() => onAIHelp('about', 'all')}
          className="text-xs text-accent hover:text-accent/80 flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Write for me
        </button>
      </div>
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Your Story</label>
        <textarea
          value={content.story || ''}
          onChange={(e) => onChange('story', e.target.value)}
          placeholder="Tell us about your business. How did it start? What drives you?"
          rows={3}
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-white mb-1 block">When did you start?</label>
          <input
            type="text"
            value={content.founded || ''}
            onChange={(e) => onChange('founded', e.target.value)}
            placeholder="e.g., 2010, 15 years ago"
            className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-white mb-1 block">Who do you serve?</label>
          <input
            type="text"
            value={content.audience || ''}
            onChange={(e) => onChange('audience', e.target.value)}
            placeholder="e.g., Homeowners in Baton Rouge"
            className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-white mb-1 block">What makes you different?</label>
        <textarea
          value={content.difference || ''}
          onChange={(e) => onChange('difference', e.target.value)}
          placeholder="What sets you apart from competitors?"
          rows={2}
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
        />
      </div>
    </div>
  )
}

function TestimonialsEditor({ content, onChange }) {
  const items = content.items || []

  const addItem = () => {
    onChange('items', [...items, { quote: '', name: '', role: '' }])
  }

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange('items', newItems)
  }

  const removeItem = (index) => {
    onChange('items', items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white block">Customer Testimonials</label>

      {items.map((item, index) => (
        <div key={index} className="bg-[#1a1a1a] border border-border rounded-lg p-3 space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-xs text-muted">Testimonial {index + 1}</span>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            value={item.quote}
            onChange={(e) => updateItem(index, 'quote', e.target.value)}
            placeholder="What did they say about you?"
            rows={2}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Customer name"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              value={item.role}
              onChange={(e) => updateItem(index, 'role', e.target.value)}
              placeholder="Title/Company (optional)"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted hover:text-white hover:border-accent transition-colors"
      >
        + Add Testimonial
      </button>
    </div>
  )
}

function PricingEditor({ content, onChange }) {
  const items = content.items || []

  const addItem = () => {
    onChange('items', [...items, { name: '', price: '', features: '', featured: false }])
  }

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange('items', newItems)
  }

  const removeItem = (index) => {
    onChange('items', items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white block">Pricing Plans</label>

      {items.map((item, index) => (
        <div key={index} className={`bg-[#1a1a1a] border rounded-lg p-3 space-y-2 ${item.featured ? 'border-accent' : 'border-border'}`}>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-muted">
              <input
                type="checkbox"
                checked={item.featured}
                onChange={(e) => updateItem(index, 'featured', e.target.checked)}
                className="rounded border-border"
              />
              Featured plan
            </label>
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-1 text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Plan name"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', e.target.value)}
              placeholder="$99/mo"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
          </div>
          <textarea
            value={item.features}
            onChange={(e) => updateItem(index, 'features', e.target.value)}
            placeholder="Features (one per line)"
            rows={3}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted hover:text-white hover:border-accent transition-colors"
      >
        + Add Pricing Plan
      </button>
    </div>
  )
}

function FAQEditor({ content, onChange }) {
  const items = content.items || []

  const addItem = () => {
    onChange('items', [...items, { question: '', answer: '' }])
  }

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange('items', newItems)
  }

  const removeItem = (index) => {
    onChange('items', items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white block">Frequently Asked Questions</label>

      {items.map((item, index) => (
        <div key={index} className="bg-[#1a1a1a] border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={item.question}
              onChange={(e) => updateItem(index, 'question', e.target.value)}
              placeholder="Question?"
              className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            value={item.answer}
            onChange={(e) => updateItem(index, 'answer', e.target.value)}
            placeholder="Answer"
            rows={2}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted hover:text-white hover:border-accent transition-colors"
      >
        + Add FAQ
      </button>
    </div>
  )
}

function ContactEditor({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Section Heading</label>
        <input
          type="text"
          value={content.heading || ''}
          onChange={(e) => onChange('heading', e.target.value)}
          placeholder="e.g., Get in Touch"
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Subheading</label>
        <input
          type="text"
          value={content.subheading || ''}
          onChange={(e) => onChange('subheading', e.target.value)}
          placeholder="e.g., We'd love to hear from you"
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
        />
      </div>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={content.showForm !== false}
            onChange={(e) => onChange('showForm', e.target.checked)}
            className="rounded border-border"
          />
          Include contact form
        </label>
        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            checked={content.showMap || false}
            onChange={(e) => onChange('showMap', e.target.checked)}
            className="rounded border-border"
          />
          Include map
        </label>
      </div>
    </div>
  )
}

function GalleryEditor({ content, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-white mb-1 block">Gallery Description (optional)</label>
        <textarea
          value={content.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Brief description of your gallery/portfolio"
          rows={2}
          className="w-full bg-[#1a1a1a] border border-border rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
        />
      </div>
      <p className="text-xs text-muted">
        Your uploaded photos will be displayed here. You can assign photos to this section in the Assets step.
      </p>
    </div>
  )
}

function TeamEditor({ content, onChange }) {
  const items = content.items || []

  const addItem = () => {
    onChange('items', [...items, { name: '', role: '', bio: '' }])
  }

  const updateItem = (index, field, value) => {
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange('items', newItems)
  }

  const removeItem = (index) => {
    onChange('items', items.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white block">Team Members</label>

      {items.map((item, index) => (
        <div key={index} className="bg-[#1a1a1a] border border-border rounded-lg p-3 space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              placeholder="Name"
              className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <input
              type="text"
              value={item.role}
              onChange={(e) => updateItem(index, 'role', e.target.value)}
              placeholder="Role/Title"
              className="flex-1 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            value={item.bio}
            onChange={(e) => updateItem(index, 'bio', e.target.value)}
            placeholder="Short bio (optional)"
            rows={2}
            className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-accent resize-none"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted hover:text-white hover:border-accent transition-colors"
      >
        + Add Team Member
      </button>
    </div>
  )
}

// Editor map
const editors = {
  hero: HeroEditor,
  services: ServicesEditor,
  about: AboutEditor,
  testimonials: TestimonialsEditor,
  pricing: PricingEditor,
  faq: FAQEditor,
  contact: ContactEditor,
  gallery: GalleryEditor,
  team: TeamEditor,
}

const sectionLabels = {
  hero: 'Hero Section',
  services: 'Services',
  about: 'About Us',
  gallery: 'Gallery',
  testimonials: 'Testimonials',
  team: 'Team',
  pricing: 'Pricing',
  faq: 'FAQ',
  contact: 'Contact',
}

export default function SectionContentEditor({
  sectionId,
  content,
  onChange,
  onAIHelp,
  collapsed = false,
  onToggleCollapse,
}) {
  const Editor = editors[sectionId]
  if (!Editor) return null

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={onToggleCollapse}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="font-medium text-white">{sectionLabels[sectionId] || sectionId}</span>
        <svg
          className={`w-5 h-5 text-muted transition-transform ${collapsed ? '' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {!collapsed && (
        <div className="px-4 pb-4">
          <Editor
            content={content || {}}
            onChange={(field, value) => onChange(sectionId, field, value)}
            onAIHelp={onAIHelp}
          />
        </div>
      )}
    </div>
  )
}
