export default function StyleSelector({ label, options, value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-[13px] font-medium mb-3 text-[#aaa] tracking-wide">
        {label}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <label
            key={option.id}
            className={`border-[1.5px] rounded-sc p-4 cursor-pointer transition-all duration-200 bg-surface ${
              value === option.id
                ? 'border-accent bg-accent-dim'
                : 'border-border hover:border-[#555]'
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
            <div className="font-syne text-sm font-bold mb-1">
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
    <div className="mb-6">
      <label className="block text-[13px] font-medium mb-3 text-[#aaa] tracking-wide">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option.id)
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onToggle(option.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-accent text-black border-accent'
                  : 'bg-surface text-muted border-border hover:border-[#555] hover:text-white'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
      <div className="text-xs text-muted mt-2">Click to toggle on/off</div>
    </div>
  )
}
