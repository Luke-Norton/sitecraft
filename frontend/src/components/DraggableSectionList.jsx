import { useState } from 'react'

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

export default function DraggableSectionList({ sections, sectionOrder, onReorder }) {
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)

  // Use sectionOrder for display, filtered by what's in sections
  const orderedSections = sectionOrder.filter(s => sections.includes(s))

  const handleDragStart = (e, index) => {
    // Don't allow dragging the hero (index 0)
    if (index === 0) {
      e.preventDefault()
      return
    }
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    // Don't allow dropping at position 0 (hero must stay first)
    if (index === 0) return
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex === null || dropIndex === 0) return

    const newOrder = [...orderedSections]
    const [draggedItem] = newOrder.splice(draggedIndex, 1)
    newOrder.splice(dropIndex, 0, draggedItem)

    onReorder(newOrder)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const moveUp = (index) => {
    if (index <= 1) return // Can't move hero or first non-hero item above hero
    const newOrder = [...orderedSections]
    ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    onReorder(newOrder)
  }

  const moveDown = (index) => {
    if (index === 0 || index >= orderedSections.length - 1) return
    const newOrder = [...orderedSections]
    ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    onReorder(newOrder)
  }

  if (orderedSections.length === 0) {
    return (
      <div className="text-center py-8 text-muted">
        No sections selected yet
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted mb-2">Drag to reorder sections</div>
      {orderedSections.map((sectionId, index) => {
        const isHero = sectionId === 'hero'
        const isDragging = draggedIndex === index
        const isDragOver = dragOverIndex === index

        return (
          <div
            key={sectionId}
            draggable={!isHero}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
              ${isDragging ? 'opacity-50 border-accent bg-accent/10' : ''}
              ${isDragOver && !isHero ? 'border-accent border-dashed' : 'border-border'}
              ${isHero ? 'bg-surface cursor-default' : 'bg-surface cursor-grab active:cursor-grabbing hover:border-[#444]'}
            `}
          >
            {/* Drag handle */}
            <div className={`${isHero ? 'text-muted/30' : 'text-muted'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>

            {/* Section number */}
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isHero ? 'bg-accent text-black' : 'bg-white/10 text-white'
            }`}>
              {index + 1}
            </div>

            {/* Section name */}
            <div className="flex-1">
              <span className="font-medium text-white">{sectionLabels[sectionId] || sectionId}</span>
              {isHero && <span className="ml-2 text-xs text-muted">(fixed)</span>}
            </div>

            {/* Move buttons (for non-hero sections) */}
            {!isHero && (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  disabled={index <= 1}
                  className="p-1.5 text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index >= orderedSections.length - 1}
                  className="p-1.5 text-muted hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
