import { useState } from 'react'

// Section definitions with wireframe previews
const sectionDefinitions = {
  hero: {
    id: 'hero',
    label: 'Hero',
    description: 'Main banner with headline and CTA',
    required: true,
    wireframe: (
      <div className="space-y-1.5">
        <div className="h-1 w-8 bg-current rounded opacity-30" />
        <div className="h-2 w-16 bg-current rounded" />
        <div className="h-1 w-12 bg-current rounded opacity-50" />
        <div className="h-2 w-6 bg-current rounded mt-2" />
      </div>
    ),
    variants: [
      { id: 'split', label: 'Split', desc: 'Text left, image right' },
      { id: 'centered', label: 'Centered', desc: 'Centered text, full width' },
      { id: 'fullscreen', label: 'Full Screen', desc: 'Takes entire viewport' },
      { id: 'minimal', label: 'Minimal', desc: 'Simple, text-focused' },
    ],
  },
  services: {
    id: 'services',
    label: 'Services',
    description: 'Showcase what you offer',
    wireframe: (
      <div className="grid grid-cols-3 gap-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="space-y-0.5">
            <div className="h-3 w-3 bg-current rounded opacity-30 mx-auto" />
            <div className="h-1 w-full bg-current rounded opacity-50" />
          </div>
        ))}
      </div>
    ),
    variants: [
      { id: 'grid', label: 'Grid', desc: 'Cards in a grid layout' },
      { id: 'list', label: 'List', desc: 'Vertical list with icons' },
      { id: 'bento', label: 'Bento', desc: 'Mixed size cards' },
    ],
  },
  about: {
    id: 'about',
    label: 'About',
    description: 'Tell your story',
    wireframe: (
      <div className="flex gap-2">
        <div className="w-8 h-6 bg-current rounded opacity-30" />
        <div className="flex-1 space-y-1">
          <div className="h-1 w-full bg-current rounded opacity-50" />
          <div className="h-1 w-3/4 bg-current rounded opacity-50" />
          <div className="h-1 w-1/2 bg-current rounded opacity-50" />
        </div>
      </div>
    ),
    variants: [
      { id: 'split', label: 'Split', desc: 'Image + text side by side' },
      { id: 'centered', label: 'Centered', desc: 'Text centered, image above' },
      { id: 'timeline', label: 'Timeline', desc: 'Story as a timeline' },
    ],
  },
  gallery: {
    id: 'gallery',
    label: 'Gallery',
    description: 'Show off your work',
    wireframe: (
      <div className="grid grid-cols-3 gap-0.5">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="h-2 bg-current rounded-sm opacity-30" />
        ))}
      </div>
    ),
    variants: [
      { id: 'grid', label: 'Grid', desc: 'Equal-size image grid' },
      { id: 'masonry', label: 'Masonry', desc: 'Pinterest-style layout' },
      { id: 'carousel', label: 'Carousel', desc: 'Scrollable gallery' },
    ],
  },
  testimonials: {
    id: 'testimonials',
    label: 'Testimonials',
    description: 'Customer reviews & quotes',
    wireframe: (
      <div className="space-y-1">
        <div className="text-[8px] opacity-30">"</div>
        <div className="h-1 w-full bg-current rounded opacity-50" />
        <div className="h-1 w-2/3 bg-current rounded opacity-50" />
        <div className="flex items-center gap-1 mt-1">
          <div className="w-2 h-2 bg-current rounded-full opacity-30" />
          <div className="h-1 w-6 bg-current rounded opacity-50" />
        </div>
      </div>
    ),
    variants: [
      { id: 'cards', label: 'Cards', desc: 'Testimonial cards grid' },
      { id: 'carousel', label: 'Carousel', desc: 'Scrollable testimonials' },
      { id: 'single', label: 'Featured', desc: 'One large testimonial' },
    ],
  },
  team: {
    id: 'team',
    label: 'Team',
    description: 'Introduce your people',
    wireframe: (
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="text-center space-y-0.5">
            <div className="w-3 h-3 bg-current rounded-full opacity-30 mx-auto" />
            <div className="h-0.5 w-3 bg-current rounded opacity-50 mx-auto" />
          </div>
        ))}
      </div>
    ),
    variants: [
      { id: 'grid', label: 'Grid', desc: 'Team member cards' },
      { id: 'list', label: 'List', desc: 'Horizontal list' },
    ],
  },
  pricing: {
    id: 'pricing',
    label: 'Pricing',
    description: 'Plans and packages',
    wireframe: (
      <div className="flex gap-1">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 p-1 border border-current rounded ${i === 2 ? 'opacity-80' : 'opacity-30'}`}>
            <div className="h-1 w-full bg-current rounded mb-1" />
            <div className="h-0.5 w-2/3 bg-current rounded opacity-50" />
          </div>
        ))}
      </div>
    ),
    variants: [
      { id: 'cards', label: 'Cards', desc: 'Side-by-side pricing cards' },
      { id: 'table', label: 'Table', desc: 'Comparison table' },
    ],
  },
  faq: {
    id: 'faq',
    label: 'FAQ',
    description: 'Common questions',
    wireframe: (
      <div className="space-y-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 border border-current rounded-sm opacity-50" />
            <div className="h-1 flex-1 bg-current rounded opacity-30" />
          </div>
        ))}
      </div>
    ),
    variants: [
      { id: 'accordion', label: 'Accordion', desc: 'Expandable questions' },
      { id: 'grid', label: 'Grid', desc: 'Q&A cards in grid' },
    ],
  },
  contact: {
    id: 'contact',
    label: 'Contact',
    description: 'Get in touch form',
    wireframe: (
      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <div className="h-1.5 w-full bg-current rounded opacity-20" />
          <div className="h-1.5 w-full bg-current rounded opacity-20" />
          <div className="h-3 w-full bg-current rounded opacity-20" />
          <div className="h-2 w-8 bg-current rounded" />
        </div>
        <div className="w-8 space-y-1">
          <div className="h-1 w-full bg-current rounded opacity-30" />
          <div className="h-1 w-full bg-current rounded opacity-30" />
        </div>
      </div>
    ),
    variants: [
      { id: 'split', label: 'Split', desc: 'Form + contact info' },
      { id: 'centered', label: 'Centered', desc: 'Centered form' },
      { id: 'minimal', label: 'Minimal', desc: 'Just the essentials' },
    ],
  },
}

export const sectionList = Object.values(sectionDefinitions)

function SectionCard({ section, isSelected, onToggle, variant, onVariantChange }) {
  const [showVariants, setShowVariants] = useState(false)

  return (
    <div className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => !section.required && onToggle(section.id)}
        onKeyDown={(e) => e.key === 'Enter' && !section.required && onToggle(section.id)}
        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
          isSelected
            ? 'bg-accent/10 border-accent'
            : 'bg-surface border-border hover:border-[#444]'
        } ${section.required ? 'cursor-default' : 'cursor-pointer'}`}
      >
        {/* Wireframe preview */}
        <div className={`h-12 mb-3 flex items-center justify-center ${isSelected ? 'text-accent' : 'text-muted'}`}>
          {section.wireframe}
        </div>

        {/* Label and description */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="font-medium text-white text-sm flex items-center gap-2">
              {section.label}
              {section.required && (
                <span className="text-[10px] text-muted bg-white/5 px-1.5 py-0.5 rounded">Required</span>
              )}
            </div>
            <div className="text-xs text-muted mt-0.5">{section.description}</div>
          </div>
          {isSelected && (
            <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center shrink-0">
              <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Variant selector (if selected and has variants) */}
        {isSelected && section.variants && section.variants.length > 1 && (
          <div className="mt-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowVariants(!showVariants)
              }}
              className="text-xs text-accent hover:text-accent/80 flex items-center gap-1"
            >
              Layout: {section.variants.find(v => v.id === variant)?.label || section.variants[0].label}
              <svg className={`w-3 h-3 transition-transform ${showVariants ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Variant dropdown */}
      {showVariants && isSelected && section.variants && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-xl z-10 overflow-hidden">
          {section.variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                onVariantChange(section.id, v.id)
                setShowVariants(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-white/5 transition-colors ${
                variant === v.id ? 'bg-accent/10 text-accent' : 'text-white'
              }`}
            >
              <div className="font-medium">{v.label}</div>
              <div className="text-xs text-muted">{v.desc}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SectionPicker({ sections, sectionVariants, onToggle, onVariantChange }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {sectionList.map((section) => (
        <SectionCard
          key={section.id}
          section={section}
          isSelected={sections.includes(section.id)}
          onToggle={onToggle}
          variant={sectionVariants[section.id]}
          onVariantChange={onVariantChange}
        />
      ))}
    </div>
  )
}
