import { Link } from 'react-router-dom'

const steps = [
  { number: 1, label: 'Business' },
  { number: 2, label: 'Goals' },
  { number: 3, label: 'Content' },
  { number: 4, label: 'Style' },
  { number: 5, label: 'Structure' },
  { number: 6, label: 'Review' },
]

export default function Sidebar({ currentStep, onStepClick }) {
  return (
    <aside className="bg-surface border-r border-border sticky top-0 h-screen hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="font-syne font-extrabold text-[22px] text-accent tracking-tight hover:opacity-80 transition-opacity">
          Bespoke
        </Link>
      </div>

      {/* Steps */}
      <nav className="flex-1 p-6">
        <div className="space-y-1">
          {steps.map((step) => {
            const isActive = step.number === currentStep
            const isDone = step.number < currentStep

            return (
              <button
                key={step.number}
                onClick={() => onStepClick(step.number)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/10 text-white'
                    : isDone
                    ? 'text-white/70 hover:bg-white/5'
                    : 'text-white/30 hover:bg-white/5 hover:text-white/50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-accent text-black'
                      : isDone
                      ? 'bg-accent/20 text-accent border border-accent/30'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {isDone ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                  {step.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <div className="text-xs text-muted leading-relaxed">
          Need help?{' '}
          <button className="text-accent hover:underline">Get support</button>
        </div>
      </div>
    </aside>
  )
}
