const toneOptions = [
  {
    id: 'professional',
    label: 'Professional',
    description: 'Formal, trustworthy, corporate',
    example: '"We deliver excellence in every project."',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'friendly',
    label: 'Friendly',
    description: 'Warm, approachable, conversational',
    example: '"Hey! We\'d love to help you out."',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'bold',
    label: 'Bold',
    description: 'Confident, direct, energetic',
    example: '"Transform your space. Start today."',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'playful',
    label: 'Playful',
    description: 'Fun, creative, casual',
    example: '"Let\'s make something awesome together!"',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
      </svg>
    ),
  },
  {
    id: 'luxurious',
    label: 'Luxurious',
    description: 'Refined, exclusive, premium',
    example: '"Experience unparalleled elegance."',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

export default function ToneSelector({ value, onChange }) {
  return (
    <div className="space-y-3">
      {toneOptions.map((tone) => {
        const isSelected = value === tone.id
        return (
          <button
            key={tone.id}
            type="button"
            onClick={() => onChange(tone.id)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              isSelected
                ? 'bg-accent/10 border-accent'
                : 'bg-surface border-border hover:border-[#444]'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${isSelected ? 'bg-accent/20 text-accent' : 'bg-white/5 text-muted'}`}>
                {tone.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-white">{tone.label}</div>
                  {isSelected && (
                    <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted mt-0.5">{tone.description}</div>
                <div className="text-sm text-white/60 mt-2 italic">{tone.example}</div>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
