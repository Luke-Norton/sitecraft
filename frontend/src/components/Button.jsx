export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const baseClasses =
    'px-7 py-3.5 rounded-lg font-syne text-sm font-bold tracking-wide cursor-pointer transition-all duration-200 border-none disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-accent text-black hover:bg-[#d4f545] hover:-translate-y-px disabled:hover:translate-y-0 disabled:hover:bg-accent',
    ghost:
      'bg-transparent border border-border text-muted hover:border-[#555] hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
