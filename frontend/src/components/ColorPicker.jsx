export default function ColorPicker({
  label,
  description,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center gap-4 bg-surface border border-border rounded-sc p-4 transition-colors duration-200 hover:border-[#444]">
      <div className="relative w-[52px] h-[52px] shrink-0 cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer border-none p-0"
        />
        <div
          className="w-[52px] h-[52px] rounded-[10px] pointer-events-none transition-colors duration-100"
          style={{
            background: value,
            border: value.toLowerCase() === '#ffffff' ? '1px solid #333' : 'none',
          }}
        />
      </div>
      <div className="flex-1">
        <div className="font-syne text-[13px] font-bold mb-0.5">{label}</div>
        <div className="text-xs text-muted leading-snug mb-1">
          {description}
        </div>
        <div className="font-mono text-xs text-accent tracking-wider">
          {value.toUpperCase()}
        </div>
      </div>
    </div>
  )
}
