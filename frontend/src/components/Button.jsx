export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
}) {
  const baseClasses =
    'px-6 py-3 rounded-full font-medium text-sm cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2'

  const variants = {
    primary:
      'bg-accent text-black hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(200,241,53,0.3)] disabled:hover:shadow-none',
    secondary:
      'bg-white/10 text-white hover:bg-white/20',
    ghost:
      'bg-transparent text-muted hover:text-white hover:bg-white/5',
    outline:
      'bg-transparent border border-border text-white hover:border-accent hover:text-accent',
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
