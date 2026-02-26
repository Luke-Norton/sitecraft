import { Link } from 'react-router-dom'

const steps = [
  { number: 1, label: 'Business' },
  { number: 2, label: 'Goals' },
  { number: 3, label: 'Assets' },
  { number: 4, label: 'Design' },
  { number: 5, label: 'Content' },
  { number: 6, label: 'Review' },
]

export default function MobileNav({ currentStep, onStepClick }) {
  return (
    <div className="md:hidden bg-surface border-b border-border px-4 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between mb-3">
        <Link to="/" className="font-syne font-extrabold text-lg text-accent tracking-tight">
          Bespoke
        </Link>
        <div className="text-xs text-muted">
          Step {currentStep} of 6
        </div>
      </div>

      <div className="flex gap-1">
        {steps.map((step) => {
          const isActive = step.number === currentStep
          const isDone = step.number < currentStep

          return (
            <button
              key={step.number}
              onClick={() => onStepClick(step.number)}
              className={`flex-1 h-1.5 rounded-full transition-all duration-200 ${
                isActive
                  ? 'bg-accent'
                  : isDone
                  ? 'bg-accent/50'
                  : 'bg-border'
              }`}
              aria-label={`Go to step ${step.number}: ${step.label}`}
            />
          )
        })}
      </div>
    </div>
  )
}
