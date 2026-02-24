export default function FormField({
  label,
  hint,
  optional,
  children,
  className = '',
}) {
  return (
    <div className={`mb-7 ${className}`}>
      {label && (
        <label className="block text-[13px] font-medium mb-2 text-[#aaa] tracking-wide">
          {label}
          {optional && (
            <span className="text-muted font-light"> (optional)</span>
          )}
        </label>
      )}
      {children}
      {hint && (
        <div className="text-xs text-muted mt-1.5 leading-relaxed">{hint}</div>
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
      className={`w-full bg-surface border border-border rounded-sc px-4 py-3.5 text-white font-dm-sans text-[15px] font-light placeholder:text-[#444] focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,241,53,0.12)] transition-all duration-200 ${className}`}
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
      className={`w-full bg-surface border border-border rounded-sc px-4 py-3.5 text-white font-dm-sans text-[15px] font-light placeholder:text-[#444] focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,241,53,0.12)] transition-all duration-200 resize-none leading-relaxed ${className}`}
    />
  )
}
