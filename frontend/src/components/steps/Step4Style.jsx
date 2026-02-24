import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextInput, TextArea } from '../FormField'
import ColorPicker from '../ColorPicker'
import NavRow from '../NavRow'

export default function Step4Style({ formData, updateField, onBack, onNext }) {
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
          rows={5}
        />
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

      <FormField
        label="Colors"
        hint="Not sure? Leave these as-is and just describe your vibe in the keywords field above — we'll figure it out."
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

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  )
}
