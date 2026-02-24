export default function ProgressBar({ step, totalSteps = 6 }) {
  const percentage = Math.round((step / totalSteps) * 100)

  return (
    <div className="h-0.5 bg-border mb-12 rounded-sm overflow-hidden">
      <div
        className="h-full bg-accent rounded-sm transition-all duration-400"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
