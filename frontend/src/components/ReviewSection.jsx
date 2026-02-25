export default function ReviewSection({ title, rows }) {
  const filteredRows = rows.filter(([, value]) => value)

  if (filteredRows.length === 0) return null

  return (
    <div className="bg-surface border border-border rounded-xl p-5 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        <div className="text-xs font-medium tracking-wide uppercase text-accent">
          {title}
        </div>
      </div>
      <div className="space-y-3">
        {filteredRows.map(([key, value], index) => (
          <div key={index} className="flex gap-4 text-sm">
            <div className="text-muted w-[140px] shrink-0">{key}</div>
            <div className="text-white flex-1 break-words">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
