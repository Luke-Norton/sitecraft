export default function StepHeader({ stepNumber, title, description }) {
  return (
    <div className="mb-10">
      <div className="text-[11px] font-syne font-bold tracking-[2px] text-accent uppercase mb-2.5">
        Step {String(stepNumber).padStart(2, '0')}
      </div>
      <h1 className="font-syne text-[32px] font-extrabold tracking-tight leading-tight mb-2.5">
        {title}
      </h1>
      <p className="text-muted text-[15px] leading-relaxed">{description}</p>
    </div>
  )
}
