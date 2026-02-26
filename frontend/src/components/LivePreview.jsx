// Live wireframe preview that shows the site structure as user builds it

const sectionWireframes = {
  hero: ({ variant }) => (
    <div className={`p-3 ${variant === 'fullscreen' ? 'min-h-[80px]' : 'min-h-[50px]'} flex items-center justify-center`}>
      <div className={`${variant === 'split' ? 'flex items-center gap-4 w-full' : 'text-center'}`}>
        <div className={variant === 'split' ? 'flex-1' : ''}>
          <div className="h-1 w-6 bg-accent/30 rounded mb-1 mx-auto" />
          <div className="h-2 w-20 bg-white rounded mb-1" />
          <div className="h-1 w-16 bg-white/50 rounded mb-2" />
          <div className="h-2 w-8 bg-accent rounded" />
        </div>
        {variant === 'split' && (
          <div className="w-16 h-12 bg-white/10 rounded-lg" />
        )}
      </div>
    </div>
  ),

  services: ({ variant }) => (
    <div className="p-3">
      <div className="h-1.5 w-12 bg-white rounded mb-2 mx-auto" />
      <div className={`${variant === 'list' ? 'space-y-1' : 'grid grid-cols-3 gap-1'}`}>
        {[1, 2, 3].map(i => (
          <div key={i} className={`${variant === 'list' ? 'flex items-center gap-2' : 'text-center'}`}>
            <div className={`${variant === 'list' ? 'w-4 h-4' : 'w-6 h-6 mx-auto mb-1'} bg-accent/30 rounded`} />
            <div className={variant === 'list' ? 'flex-1' : ''}>
              <div className="h-1 w-full bg-white/50 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  about: ({ variant }) => (
    <div className="p-3">
      <div className={`${variant === 'split' ? 'flex gap-3' : 'text-center'}`}>
        {variant === 'split' && <div className="w-12 h-10 bg-white/10 rounded" />}
        <div className="flex-1">
          <div className="h-1.5 w-10 bg-white rounded mb-1" />
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-white/30 rounded" />
            <div className="h-1 w-4/5 bg-white/30 rounded" />
            <div className="h-1 w-3/5 bg-white/30 rounded" />
          </div>
        </div>
      </div>
    </div>
  ),

  gallery: () => (
    <div className="p-3">
      <div className="h-1.5 w-10 bg-white rounded mb-2 mx-auto" />
      <div className="grid grid-cols-4 gap-0.5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="aspect-square bg-white/10 rounded-sm" />
        ))}
      </div>
    </div>
  ),

  testimonials: () => (
    <div className="p-3">
      <div className="h-1.5 w-14 bg-white rounded mb-2 mx-auto" />
      <div className="flex gap-1">
        {[1, 2].map(i => (
          <div key={i} className="flex-1 bg-white/5 rounded p-1.5">
            <div className="text-[6px] text-accent/50">"</div>
            <div className="h-1 w-full bg-white/30 rounded mb-0.5" />
            <div className="h-1 w-3/4 bg-white/30 rounded" />
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-white/20 rounded-full" />
              <div className="h-0.5 w-6 bg-white/30 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  team: () => (
    <div className="p-3">
      <div className="h-1.5 w-8 bg-white rounded mb-2 mx-auto" />
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="text-center">
            <div className="w-6 h-6 bg-white/10 rounded-full mx-auto mb-1" />
            <div className="h-0.5 w-6 bg-white/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),

  pricing: () => (
    <div className="p-3">
      <div className="h-1.5 w-10 bg-white rounded mb-2 mx-auto" />
      <div className="flex gap-1">
        {[1, 2, 3].map(i => (
          <div key={i} className={`flex-1 p-1 rounded border ${i === 2 ? 'border-accent bg-accent/5' : 'border-white/10'}`}>
            <div className="h-1 w-full bg-white/50 rounded mb-0.5" />
            <div className="h-0.5 w-2/3 bg-white/30 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),

  faq: () => (
    <div className="p-3">
      <div className="h-1.5 w-6 bg-white rounded mb-2 mx-auto" />
      <div className="space-y-1">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-2 h-2 border border-white/30 rounded-sm" />
            <div className="h-1 flex-1 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  ),

  contact: () => (
    <div className="p-3">
      <div className="h-1.5 w-10 bg-white rounded mb-2 mx-auto" />
      <div className="flex gap-2">
        <div className="flex-1 space-y-1">
          <div className="h-2 w-full bg-white/10 rounded" />
          <div className="h-2 w-full bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-2 w-10 bg-accent rounded" />
        </div>
        <div className="w-12 space-y-1">
          <div className="h-1 w-full bg-white/20 rounded" />
          <div className="h-1 w-full bg-white/20 rounded" />
        </div>
      </div>
    </div>
  ),
}

export default function LivePreview({ sections, sectionOrder, sectionVariants, colorPrimary }) {
  // Use sectionOrder to display in correct order, fallback to sections
  const orderedSections = sectionOrder.length > 0
    ? sectionOrder.filter(s => sections.includes(s))
    : sections

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-[#1a1a1a] px-3 py-2 flex items-center gap-2 border-b border-border">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 bg-white/5 rounded px-2 py-0.5 text-[10px] text-muted text-center">
          yoursite.com
        </div>
      </div>

      {/* Preview content */}
      <div
        className="bg-bg min-h-[300px] max-h-[500px] overflow-y-auto"
        style={{ '--preview-accent': colorPrimary }}
      >
        {/* Nav placeholder */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
          <div className="h-2 w-10 bg-white rounded" />
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-1 w-6 bg-white/30 rounded" />
            ))}
          </div>
        </div>

        {/* Sections */}
        {orderedSections.length === 0 ? (
          <div className="p-8 text-center text-muted text-sm">
            Add sections to see preview
          </div>
        ) : (
          orderedSections.map((sectionId, index) => {
            const WireframeComponent = sectionWireframes[sectionId]
            if (!WireframeComponent) return null

            return (
              <div
                key={sectionId}
                className={`border-b border-white/5 last:border-b-0 ${
                  index % 2 === 1 ? 'bg-white/[0.02]' : ''
                }`}
              >
                <WireframeComponent variant={sectionVariants[sectionId]} />
              </div>
            )
          })
        )}

        {/* Footer placeholder */}
        <div className="px-3 py-2 bg-white/[0.02] border-t border-white/5">
          <div className="flex justify-between items-center">
            <div className="h-1 w-8 bg-white/20 rounded" />
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-2 h-2 bg-white/10 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section list */}
      <div className="bg-[#1a1a1a] px-3 py-2 border-t border-border">
        <div className="text-[10px] text-muted mb-1">Sections ({orderedSections.length})</div>
        <div className="flex flex-wrap gap-1">
          {orderedSections.map((sectionId) => (
            <span
              key={sectionId}
              className="px-1.5 py-0.5 bg-accent/20 text-accent text-[10px] rounded"
            >
              {sectionId}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
