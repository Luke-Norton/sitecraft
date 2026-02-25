import Button from './Button'

export default function NavRow({ onBack, onNext, nextLabel = 'Continue', showBack = true }) {
  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
      <div>
        {showBack && (
          <Button variant="ghost" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Button>
        )}
      </div>
      <Button variant="primary" onClick={onNext}>
        {nextLabel}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Button>
    </div>
  )
}
