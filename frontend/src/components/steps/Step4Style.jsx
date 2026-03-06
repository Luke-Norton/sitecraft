import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField from '../FormField'
import ColorPicker from '../ColorPicker'
import NavRow from '../NavRow'

const personalityOptions = [
  { id: 'minimal', designStyle: 'minimal', tone: 'professional', title: 'Minimal', desc: 'Clean whitespace, typography-first. Clear and confident copy.', inspired: 'Apple, Linear' },
  { id: 'modern', designStyle: 'modern', tone: 'professional', title: 'Modern', desc: 'Sharp layouts, bento grids, purposeful depth. Polished and professional.', inspired: 'Stripe, Vercel' },
  { id: 'bold', designStyle: 'bold', tone: 'bold', title: 'Bold', desc: 'Oversized type, creative layouts, strong visual presence. Direct and punchy.', inspired: 'Framer, Webflow' },
  { id: 'friendly', designStyle: 'playful', tone: 'friendly', title: 'Friendly', desc: 'Rounded, warm, approachable. Conversational copy that feels human.', inspired: 'Notion, Slack' },
  { id: 'luxury', designStyle: 'luxury', tone: 'luxurious', title: 'Luxury', desc: 'Dark themes, refined serifs, premium feel. Elegant and exclusive language.', inspired: 'Premium brands' },
]

const headingFontOptions = [
  { id: 'auto', name: 'Auto', preview: 'Auto', desc: 'AI picks based on style', isAuto: true },
  { id: 'inter', name: 'Inter', preview: 'Inter', desc: 'Clean, versatile', fontFamily: "'Inter', sans-serif", serif: false },
  { id: 'geometric', name: 'Jakarta', preview: 'Plus Jakarta', desc: 'Sharp, modern', fontFamily: "'Plus Jakarta Sans', sans-serif", serif: false },
  { id: 'clean', name: 'DM Sans', preview: 'DM Sans', desc: 'Simple, readable', fontFamily: "'DM Sans', sans-serif", serif: false },
  { id: 'technical', name: 'Space', preview: 'Space Grotesk', desc: 'Techy, modern', fontFamily: "'Space Grotesk', sans-serif", serif: false },
  { id: 'friendly', name: 'Outfit', preview: 'Outfit', desc: 'Rounded, warm', fontFamily: "'Outfit', sans-serif", serif: false },
  { id: 'elegant', name: 'Sora', preview: 'Sora', desc: 'Refined, premium', fontFamily: "'Sora', sans-serif", serif: false },
  { id: 'editorial', name: 'Fraunces', preview: 'Fraunces', desc: 'Magazine serif', fontFamily: "'Fraunces', serif", serif: true },
  { id: 'luxury', name: 'Cormorant', preview: 'Cormorant', desc: 'Elegant serif', fontFamily: "'Cormorant', serif", serif: true },
  { id: 'custom', name: 'Custom', preview: 'Custom', desc: 'Your own font', isCustom: true },
]

const bodyFontOptions = [
  { id: 'auto', name: 'Auto', preview: 'Auto', desc: 'AI picks based on style', isAuto: true },
  { id: 'inter', name: 'Inter', preview: 'Inter', desc: 'Clean, versatile', fontFamily: "'Inter', sans-serif" },
  { id: 'geometric', name: 'Jakarta', preview: 'Plus Jakarta', desc: 'Sharp, modern', fontFamily: "'Plus Jakarta Sans', sans-serif" },
  { id: 'clean', name: 'DM Sans', preview: 'DM Sans', desc: 'Simple, readable', fontFamily: "'DM Sans', sans-serif" },
  { id: 'technical', name: 'Space', preview: 'Space Grotesk', desc: 'Techy, modern', fontFamily: "'Space Grotesk', sans-serif" },
  { id: 'friendly', name: 'Outfit', preview: 'Outfit', desc: 'Rounded, warm', fontFamily: "'Outfit', sans-serif" },
  { id: 'elegant', name: 'Sora', preview: 'Sora', desc: 'Refined, premium', fontFamily: "'Sora', sans-serif" },
  { id: 'custom', name: 'Custom', preview: 'Custom', desc: 'Your own font', isCustom: true },
]

function FontPicker({ label, hint, options, value, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-white mb-1">{label}</div>
      {hint && <div className="text-xs text-muted mb-3">{hint}</div>}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={'p-2.5 rounded-xl border text-left transition-all duration-200 ' + (isSelected ? 'bg-accent/10 border-accent ring-1 ring-accent' : 'bg-surface border-border hover:border-[#444]')}
            >
              {opt.isCustom ? (
                <div className="flex items-center gap-1 mb-0.5">
                  <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  <span className="text-xs font-medium text-white">Custom</span>
                </div>
              ) : opt.isAuto ? (
                <div className="flex items-center gap-1 mb-0.5">
                  <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-xs font-medium text-white">Auto</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="text-sm text-white truncate" style={{ fontFamily: opt.fontFamily }}>{opt.preview}</div>
                  {opt.serif && <span className="text-[10px] text-accent/70 shrink-0">serif</span>}
                </div>
              )}
              <div className="text-[10px] text-muted leading-tight">{opt.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Step4Style({ formData, updateField, onBack, onNext }) {
  const activePersonality = personalityOptions.find((p) => p.designStyle === formData.designStyle) || personalityOptions[1]

  const handlePersonalitySelect = (option) => {
    updateField('designStyle', option.designStyle)
    updateField('tone', option.tone)
  }

  return (
    <div className="animate-fade-up">
      <ProgressBar step={4} />
      <StepHeader stepNumber={4} title="Design & Style" description="Choose the look, feel, and voice of your website." />

      <FormField label="Site Personality">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {personalityOptions.map((option) => {
            const isSelected = activePersonality.id === option.id
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handlePersonalitySelect(option)}
                className={'p-4 rounded-xl border text-left transition-all duration-200 ' + (isSelected ? 'bg-accent/10 border-accent ring-1 ring-accent' : 'bg-surface border-border hover:border-[#444]')}
              >
                <div className="font-semibold text-white mb-1">{option.title}</div>
                <div className="text-sm text-muted">{option.desc}</div>
                <div className="text-xs text-accent/70 mt-2">Like: {option.inspired}</div>
              </button>
            )
          })}
        </div>
      </FormField>

      <FormField label="Fonts">
        <div className="space-y-5">
          <FontPicker label="Heading Font" hint="Used for titles and section headings" options={headingFontOptions} value={formData.headingFont} onChange={(v) => updateField('headingFont', v)} />
          {formData.headingFont === 'custom' && (
            <div className="-mt-2">
              <input
                type="text"
                value={formData.customHeadingFont}
                onChange={(e) => updateField('customHeadingFont', e.target.value)}
                placeholder="e.g. Playfair Display"
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <p className="text-xs text-muted mt-1.5">Enter a Google Fonts name or paste a fonts.google.com URL</p>
            </div>
          )}
          <FontPicker label="Body Font" hint="Used for paragraphs, nav, and buttons" options={bodyFontOptions} value={formData.bodyFont} onChange={(v) => updateField('bodyFont', v)} />
          {formData.bodyFont === 'custom' && (
            <div className="-mt-2">
              <input
                type="text"
                value={formData.customBodyFont}
                onChange={(e) => updateField('customBodyFont', e.target.value)}
                placeholder="e.g. Lato"
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <p className="text-xs text-muted mt-1.5">Enter a Google Fonts name or paste a fonts.google.com URL</p>
            </div>
          )}
        </div>
      </FormField>

      <FormField label="Colors" hint="Pick your brand colors or leave defaults." optional>
        <div className="flex flex-col gap-3">
          <ColorPicker label="Primary Color" description="Main brand color for buttons and headings" value={formData.colorPrimary} onChange={(value) => updateField('colorPrimary', value)} />
          <ColorPicker label="Accent Color" description="Secondary color for highlights" value={formData.colorAccent} onChange={(value) => updateField('colorAccent', value)} />
          <ColorPicker label="Background" description="Main page background" value={formData.colorBg} onChange={(value) => updateField('colorBg', value)} />
        </div>
      </FormField>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  )
}