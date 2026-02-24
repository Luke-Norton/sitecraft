const structures = [
  {
    id: 'simple',
    icon: '📄',
    title: 'Just the Basics',
    desc: 'One page. Who you are, what you do, how to reach you. Clean and fast.',
  },
  {
    id: 'standard',
    icon: '📋',
    title: 'A Bit More',
    desc: 'Home, Services, About, and Contact. The full picture without going overboard.',
  },
  {
    id: 'full',
    icon: '🗂',
    title: 'The Full Picture',
    desc: 'Multiple pages, gallery, team section, the works.',
  },
]

export default function StructureCards({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {structures.map((structure) => (
        <label
          key={structure.id}
          className={`border-[1.5px] rounded-sc p-5 cursor-pointer transition-all duration-200 bg-surface ${
            value === structure.id
              ? 'border-accent bg-accent-dim'
              : 'border-border hover:border-[#555]'
          }`}
        >
          <input
            type="radio"
            name="structure"
            value={structure.id}
            checked={value === structure.id}
            onChange={() => onChange(structure.id)}
            className="hidden"
          />
          <div className="text-2xl mb-2.5">{structure.icon}</div>
          <div className="font-syne text-sm font-bold mb-1.5">
            {structure.title}
          </div>
          <div className="text-xs text-muted leading-relaxed">
            {structure.desc}
          </div>
        </label>
      ))}
    </div>
  )
}
