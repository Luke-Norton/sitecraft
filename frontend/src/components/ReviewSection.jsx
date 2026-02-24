export default function ReviewSection({ title, rows }) {
  const filteredRows = rows.filter(([, value]) => value)

  if (filteredRows.length === 0) return null

  return (
    <div className="bg-surface border border-border rounded-sc p-6 mb-4">
      <div className="font-syne text-[11px] font-bold tracking-[2px] uppercase text-accent mb-4">
        {title}
      </div>
      {filteredRows.map(([key, value], index) => (
        <div key={index} className="flex gap-4 mb-2.5 text-sm leading-relaxed">
          <div className="text-muted w-[140px] shrink-0">{key}</div>
          <div className="text-white flex-1 break-words">{value}</div>
        </div>
      ))}
    </div>
  )
}
