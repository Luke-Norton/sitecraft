export default function FormField({
  label,
  hint,
  optional,
  children,
  className = '',
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2.5 text-white/80">
          {label}
          {optional && (
            <span className="text-muted font-normal ml-1">(optional)</span>
          )}
        </label>
      )}
      {children}
      {hint && (
        <div className="text-xs text-muted mt-2 leading-relaxed">{hint}</div>
      )}
    </div>
  )
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  className = '',
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white text-[15px] placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200 ${className}`}
    />
  )
}

export function TextArea({
  value,
  onChange,
  placeholder,
  rows = 4,
  className = '',
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-surface border border-border rounded-xl px-4 py-3.5 text-white text-[15px] placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none leading-relaxed ${className}`}
    />
  )
}
