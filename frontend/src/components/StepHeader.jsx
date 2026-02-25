export default function StepHeader({ stepNumber, title, description }) {
  return (
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-4">
        <span className="text-accent text-xs font-medium">Step {stepNumber} of 6</span>
      </div>
      <h1 className="font-syne text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-3">
        {title}
      </h1>
      <p className="text-muted text-base leading-relaxed max-w-lg">{description}</p>
    </div>
  )
}
