export default function StyleSelector({ label, options, value, onChange }) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-3 text-white/80">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
              name={label}
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
            <div className="font-medium text-sm mb-1 text-white">
              {option.title}
            </div>
            <div className="text-xs text-muted leading-relaxed">
              {option.desc}
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}

export function EffectToggles({ label, options, selected, onToggle }) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-medium mb-3 text-white/80">
        {label}
        <span className="text-muted font-normal ml-1">(click to toggle)</span>
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-accent text-black border-accent'
                  : 'bg-surface text-white/60 border-border hover:border-white/30 hover:text-white'
              }`}
            >
              {isSelected && (
                <span className="mr-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="inline">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
