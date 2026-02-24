import Button from './Button'

export default function NavRow({ onBack, onNext, nextLabel = 'Next →', showBack = true }) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
      <div>
        {showBack && (
          <Button variant="ghost" onClick={onBack}>
            ← Back
          </Button>
        )}
      </div>
      <Button variant="primary" onClick={onNext}>
        {nextLabel}
      </Button>
    </div>
  )
}
