import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextInput, TextArea } from '../FormField'
import ColorPicker from '../ColorPicker'
import StyleSelector, { EffectToggles } from '../StyleSelector'
import FontSelector from '../FontSelector'
import NavRow from '../NavRow'

const fontOptions = [
  {
    id: 'modern',
    title: 'Modern',
    desc: 'Clean and highly readable',
    fontFamily: "'Inter', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'classic',
    title: 'Classic',
    desc: 'Elegant serif headers',
    fontFamily: "'Playfair Display', serif",
    bodyFont: "'Lato', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'bold',
    title: 'Bold',
    desc: 'Strong and impactful',
    fontFamily: "'Oswald', sans-serif",
    bodyFont: "'Open Sans', sans-serif",
    sampleText: 'THE QUICK BROWN FOX',
  },
  {
    id: 'friendly',
    title: 'Friendly',
    desc: 'Rounded and approachable',
    fontFamily: "'Nunito', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'professional',
    title: 'Professional',
    desc: 'Business-ready',
    fontFamily: "'Montserrat', sans-serif",
    bodyFont: "'Open Sans', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'elegant',
    title: 'Elegant',
    desc: 'Sophisticated',
    fontFamily: "'Cormorant Garamond', serif",
    bodyFont: "'Proza Libre', sans-serif",
    sampleText: 'The quick brown fox',
  },
  {
    id: 'custom',
    title: 'Custom',
    desc: 'Use your own Google Fonts',
    fontFamily: "'DM Sans', sans-serif",
    sampleText: 'Your custom font',
  },
]

const animationOptions = [
  {
    id: 'minimal',
    title: 'Minimal',
    desc: 'Clean and simple. Subtle transitions only, no flashy effects.',
  },
  {
    id: 'moderate',
    title: 'Moderate',
    desc: 'Smooth hover effects, gentle transitions, professional feel.',
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    desc: 'Animated backgrounds, scroll effects, eye-catching interactions.',
  },
]

const designOptions = [
  {
    id: 'minimal',
    title: 'Clean & Minimal',
    desc: 'Lots of whitespace, simple layouts, understated elegance.',
  },
  {
    id: 'modern',
    title: 'Modern & Professional',
    desc: 'Contemporary design, balanced visuals, trustworthy feel.',
  },
  {
    id: 'bold',
    title: 'Bold & Creative',
    desc: 'Strong visuals, unique layouts, makes a statement.',
  },
]

const effectOptions = [
  { id: 'shadows', label: 'Drop Shadows' },
  { id: 'rounded', label: 'Rounded Corners' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'glassmorphism', label: 'Glass Effects' },
  { id: 'patterns', label: 'Background Patterns' },
  { id: 'animations', label: 'Floating Elements' },
]

export default function Step4Style({ formData, updateField, toggleVisualEffect, onBack, onNext }) {
  return (
    <div className="animate-fade-up">
      <ProgressBar step={4} />
      <StepHeader
        stepNumber={4}
        title="Your Style"
        description="Help us understand the look and feel you're going for."
      />

      <FormField
        label="Describe how you want your site to look and feel"
        hint="Use words that come naturally — clean, bold, warm, minimal, colorful, serious, friendly, modern, rustic, etc."
      >
        <TextArea
          value={formData.styleKeywords}
          onChange={(value) => updateField('styleKeywords', value)}
          placeholder="e.g. Clean, professional, trustworthy. Not too flashy. Simple and easy to read. I want it to feel like a local family business, not a big corporation."
          rows={4}
        />
      </FormField>

      <StyleSelector
        label="Design Style"
        options={designOptions}
        value={formData.designStyle}
        onChange={(value) => updateField('designStyle', value)}
      />

      <FontSelector
        options={fontOptions}
        value={formData.fontPairing}
        onChange={(value) => updateField('fontPairing', value)}
      />
      {formData.fontPairing === 'custom' && (
        <div className="-mt-4 mb-8 space-y-3">
          <input
            type="text"
            value={formData.customFont}
            onChange={(e) => updateField('customFont', e.target.value)}
            placeholder="Google Fonts name or URL (e.g., 'Roboto' or 'https://fonts.googleapis.com/css2?family=Roboto')"
            className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <p className="text-xs text-muted">
            Enter a Google Font name, or paste a full Google Fonts embed URL. Browse fonts at{' '}
            <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              fonts.google.com
            </a>
          </p>
        </div>
      )}

      <StyleSelector
        label="Animation Level"
        options={animationOptions}
        value={formData.animationLevel}
        onChange={(value) => updateField('animationLevel', value)}
      />

      <EffectToggles
        label="Visual Effects"
        options={effectOptions}
        selected={formData.visualEffects}
        onToggle={toggleVisualEffect}
      />

      <FormField
        label="Colors"
        hint="Not sure? Leave these as-is and describe your vibe above."
        optional
      >
        <div className="flex flex-col gap-3">
          <ColorPicker
            label="Primary Color"
            description="Your main brand color. Used for buttons, headings, and key elements."
            value={formData.colorPrimary}
            onChange={(value) => updateField('colorPrimary', value)}
          />
          <ColorPicker
            label="Accent Color"
            description="A secondary pop of color for highlights, hover effects, and details."
            value={formData.colorAccent}
            onChange={(value) => updateField('colorAccent', value)}
          />
          <ColorPicker
            label="Background Color"
            description="The main background of your site. Usually white, cream, or very light."
            value={formData.colorBg}
            onChange={(value) => updateField('colorBg', value)}
          />
        </div>
      </FormField>

      <FormField
        label="Share a website you like the look of"
        hint="We'll use this as a style reference, not copy it."
        optional
      >
        <TextInput
          type="url"
          value={formData.inspo1}
          onChange={(value) => updateField('inspo1', value)}
          placeholder="https://example.com"
        />
      </FormField>

      <FormField label="Another website for inspiration" optional>
        <TextInput
          type="url"
          value={formData.inspo2}
          onChange={(value) => updateField('inspo2', value)}
          placeholder="https://example.com"
        />
      </FormField>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  )
}
