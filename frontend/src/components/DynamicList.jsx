export default function DynamicList({
  items,
  onAdd,
  onUpdate,
  onRemove,
  placeholder,
  addLabel,
}) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={item}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-surface border border-border rounded-sc px-4 py-3.5 text-white font-dm-sans text-[15px] font-light placeholder:text-[#444] focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,241,53,0.12)] transition-all duration-200"
            />
            <button
              onClick={() => onRemove(index)}
              disabled={items.length === 1}
              className="bg-transparent border border-border text-muted w-9 h-[46px] rounded-lg cursor-pointer text-[18px] flex items-center justify-center shrink-0 transition-all duration-200 hover:border-[#e55] hover:text-[#e55] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-muted"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onAdd}
        className="bg-transparent border border-dashed border-border text-muted px-4 py-2.5 rounded-lg cursor-pointer text-[13px] font-dm-sans transition-all duration-200 text-left mt-1 hover:border-accent hover:text-accent"
      >
        {addLabel}
      </button>
    </div>
  )
}
