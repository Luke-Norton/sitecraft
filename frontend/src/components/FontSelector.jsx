export default function FontSelector({ options, value, onChange }) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-3 text-white/80">
        Font Style
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`relative border rounded-xl p-4 cursor-pointer transition-all duration-200 bg-surface group ${
              value === option.id
                ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                : 'border-border hover:border-white/20'
            }`}
          >
            <input
              type="radio"
              name="fontPairing"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
              className="hidden"
            />
            {value === option.id && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}

            {/* Font preview */}
            <div
              className="text-2xl text-white mb-2 leading-tight"
              style={{ fontFamily: option.fontFamily }}
            >
              {option.sampleText}
            </div>

            {/* Font name and description */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white/80">{option.title}</span>
              <span className="text-xs text-muted">—</span>
              <span className="text-xs text-muted">{option.desc}</span>
            </div>

            {/* Show body font preview if different */}
            {option.bodyFont && (
              <div
                className="text-xs text-muted mt-2"
                style={{ fontFamily: option.bodyFont }}
              >
                Body text in {option.bodyFont.split("'")[1]}
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
