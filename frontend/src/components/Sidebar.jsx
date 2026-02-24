const steps = [
  { number: 1, label: 'Your Business' },
  { number: 2, label: 'Your Goal' },
  { number: 3, label: 'Your Content' },
  { number: 4, label: 'Your Style' },
  { number: 5, label: 'Structure' },
  { number: 6, label: 'Review & Build' },
]

export default function Sidebar({ currentStep, onStepClick }) {
  return (
    <aside className="bg-surface border-r border-border p-6 md:p-10 sticky top-0 h-screen flex flex-col w-[260px] hidden md:flex">
      <div className="font-syne font-extrabold text-[22px] text-accent tracking-tight mb-12">
        site<span className="text-muted font-normal">craft</span>
      </div>

      <nav className="flex-1">
        {steps.map((step) => {
          const isActive = step.number === currentStep
          const isDone = step.number < currentStep

          return (
            <div
              key={step.number}
              onClick={() => onStepClick(step.number)}
              className={`flex items-center gap-3.5 py-2.5 cursor-pointer transition-opacity duration-200 ${
                isActive ? 'opacity-100' : isDone ? 'opacity-70' : 'opacity-40'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center text-[11px] font-syne font-bold shrink-0 transition-all duration-200 ${
                  isActive
                    ? 'border-accent bg-accent text-black'
                    : isDone
                    ? 'border-accent bg-transparent text-accent'
                    : 'border-border text-muted'
                }`}
              >
                {step.number}
              </div>
              <div
                className={`text-[13px] tracking-wide ${
                  isActive ? 'text-white font-medium' : ''
                }`}
              >
                {step.label}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="text-[11px] text-muted leading-relaxed border-t border-border pt-5">
        Fill this out completely.<br />
        The more detail, the better your site.
      </div>
    </aside>
  )
}
