import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField from '../FormField'
import ColorPicker from '../ColorPicker'
import ToneSelector from '../ToneSelector'
import NavRow from '../NavRow'

const fontOptions = [
  {
    id: 'auto',
    title: 'Let AI Decide',
    desc: 'Best match for your business',
    fontFamily: "'Inter', sans-serif",
    sampleText: 'Automatic',
    isAuto: true,
  },
  {
    id: 'modern',
    title: 'Inter',
    desc: 'Clean and versatile',
    fontFamily: "'Inter', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'geometric',
    title: 'Plus Jakarta Sans',
    desc: 'Sharp and contemporary',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'clean',
    title: 'DM Sans',
    desc: 'Simple and readable',
    fontFamily: "'DM Sans', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'technical',
    title: 'Space Grotesk',
    desc: 'Techy and modern',
    fontFamily: "'Space Grotesk', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'friendly',
    title: 'Outfit',
    desc: 'Rounded and warm',
    fontFamily: "'Outfit', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'elegant',
    title: 'Sora',
    desc: 'Refined and premium',
    fontFamily: "'Sora', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'editorial',
    title: 'Fraunces',
    desc: 'Magazine-style serif',
    fontFamily: "'Fraunces', serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'luxury',
    title: 'Cormorant',
    desc: 'High-end serif',
    fontFamily: "'Cormorant', serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'custom',
    title: 'Custom Font',
    desc: 'Use your own',
    fontFamily: "'DM Sans', sans-serif",
    sampleText: 'Your custom font',
  },
]

const designOptions = [
  {
    id: 'minimal',
    title: 'Minimal',
    desc: 'Clean whitespace, typography-focused',
    visual: 'Apple, Linear',
  },
  {
    id: 'modern',
    title: 'Modern',
    desc: 'Clean with depth, bento grids',
    visual: 'Stripe, Vercel',
  },
  {
    id: 'bold',
    title: 'Bold',
    desc: 'Oversized type, creative layouts',
    visual: 'Framer, Webflow',
  },
  {
    id: 'playful',
    title: 'Playful',
    desc: 'Rounded, colorful, friendly',
    visual: 'Notion, Slack',
  },
  {
    id: 'luxury',
    title: 'Luxury',
    desc: 'Dark themes, serif fonts',
    visual: 'Premium brands',
  },
]

const animationOptions = [
  {
    key: 'scrollReveal',
    label: 'Scroll Reveal',
    desc: 'Elements fade in as you scroll down',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
  },
  {
    key: 'hoverCards',
    label: 'Card Hover Effects',
    desc: 'Cards lift and scale when hovered',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9h8M8 13h4" />
      </svg>
    ),
  },
  {
    key: 'hoverButtons',
    label: 'Button Hover Effects',
    desc: 'Buttons scale and glow on hover',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  {
    key: 'heroAnimations',
    label: 'Animated Hero',
    desc: 'Moving gradients or shapes in hero section',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    key: 'floatingElements',
    label: 'Floating Elements',
    desc: 'Decorative shapes that gently float',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
]

const effectOptions = [
  {
    key: 'roundedCorners',
    label: 'Rounded Corners',
    desc: 'Applied to cards, buttons, and images',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m0 8v2a2 2 0 01-2 2h-2" />
      </svg>
    ),
  },
  {
    key: 'shadows',
    label: 'Drop Shadows',
    desc: 'Adds depth to cards and elements',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    key: 'gradients',
    label: 'Gradients',
    desc: 'Gradient backgrounds and buttons',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    key: 'glassBlur',
    label: 'Glass Blur',
    desc: 'Frosted glass effect on navigation',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'decorativeBorders',
    label: 'Accent Borders',
    desc: 'Colored borders and dividers',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
]

function ToggleCard({ item, isActive, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${
        isActive
          ? 'bg-accent/10 border-accent text-white'
          : 'bg-surface border-border text-muted hover:border-[#444] hover:text-white'
      }`}
    >
      <div className={`mt-0.5 ${isActive ? 'text-accent' : 'text-muted'}`}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm">{item.label}</span>
          <div
            className={`w-8 h-5 rounded-full transition-colors duration-200 flex items-center ${
              isActive ? 'bg-accent justify-end' : 'bg-[#333] justify-start'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-white mx-0.5 shadow-sm" />
          </div>
        </div>
        <p className="text-xs text-muted mt-0.5">{item.desc}</p>
      </div>
    </button>
  )
}

export default function Step4Style({ formData, updateField, toggleAnimation, toggleEffect, onBack, onNext }) {
  return (
    <div className="animate-fade-up">
      <ProgressBar step={4} />
      <StepHeader
        stepNumber={4}
        title="Design & Style"
        description="Choose the look and feel of your website."
      />

      {/* Tone / Voice */}
      <FormField label="How should your website sound?">
        <ToneSelector
          value={formData.tone}
          onChange={(value) => updateField('tone', value)}
        />
      </FormField>

      {/* Design Style */}
      <FormField label="Visual Style">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {designOptions.map((option) => {
            const isSelected = formData.designStyle === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => updateField('designStyle', option.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-accent/10 border-accent ring-1 ring-accent'
                    : 'bg-surface border-border hover:border-[#444]'
                }`}
              >
                <div className="font-semibold text-white">{option.title}</div>
                <div className="text-sm text-muted mt-1">{option.desc}</div>
                <div className="text-xs text-accent mt-2">Like: {option.visual}</div>
              </button>
            )
          })}
        </div>
      </FormField>

      {/* Font Selection */}
      <FormField label="Font">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {fontOptions.map((option) => {
            const isSelected = formData.fontPairing === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => updateField('fontPairing', option.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-accent/10 border-accent ring-1 ring-accent'
                    : 'bg-surface border-border hover:border-[#444]'
                }`}
              >
                {option.isAuto ? (
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-medium text-white text-sm">{option.title}</span>
                  </div>
                ) : (
                  <div
                    className="text-lg text-white mb-1 truncate"
                    style={{ fontFamily: option.fontFamily }}
                  >
                    {option.title}
                  </div>
                )}
                <div className="text-xs text-muted">{option.desc}</div>
              </button>
            )
          })}
        </div>
      </FormField>

      {formData.fontPairing === 'custom' && (
        <div className="-mt-4 mb-8 space-y-3">
          <input
            type="text"
            value={formData.customFont}
            onChange={(e) => updateField('customFont', e.target.value)}
            placeholder="Google Fonts name or URL (e.g., 'Roboto')"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <p className="text-xs text-muted">
            Browse fonts at{' '}
            <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              fonts.google.com
            </a>
          </p>
        </div>
      )}

      {/* Colors */}
      <FormField
        label="Colors"
        hint="Pick your brand colors or leave defaults."
        optional
      >
        <div className="flex flex-col gap-3">
          <ColorPicker
            label="Primary Color"
            description="Main brand color for buttons and headings"
            value={formData.colorPrimary}
            onChange={(value) => updateField('colorPrimary', value)}
          />
          <ColorPicker
            label="Accent Color"
            description="Secondary color for highlights"
            value={formData.colorAccent}
            onChange={(value) => updateField('colorAccent', value)}
          />
          <ColorPicker
            label="Background"
            description="Main page background"
            value={formData.colorBg}
            onChange={(value) => updateField('colorBg', value)}
          />
        </div>
      </FormField>

      {/* Animations */}
      <FormField label="Animations">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {animationOptions.map((option) => (
            <ToggleCard
              key={option.key}
              item={option}
              isActive={formData.animations[option.key]}
              onToggle={() => toggleAnimation(option.key)}
            />
          ))}
        </div>
      </FormField>

      {/* Visual Effects */}
      <FormField label="Visual Effects">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {effectOptions.map((option) => (
            <ToggleCard
              key={option.key}
              item={option}
              isActive={formData.effects[option.key]}
              onToggle={() => toggleEffect(option.key)}
            />
          ))}
        </div>
      </FormField>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  )
}
