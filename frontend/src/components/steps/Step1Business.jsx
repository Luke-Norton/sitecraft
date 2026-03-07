import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextInput, TextArea } from '../FormField'
import NavRow from '../NavRow'

export default function Step1Business({ formData, updateField, onNext }) {
  return (
    <div className="animate-fade-up">
      <ProgressBar step={1} />
      <StepHeader
        stepNumber={1}
        title="About Your Business"
        description="Tell us who you are and what you want your website to do."
      />

      <FormField label="Business name">
        <TextInput
          value={formData.bizName}
          onChange={(value) => updateField('bizName', value)}
          placeholder="e.g. Green Thumb Landscaping"
        />
      </FormField>

      <FormField label="What do you do? Describe it like you're telling a friend.">
        <TextArea
          value={formData.bizDesc}
          onChange={(value) => updateField('bizDesc', value)}
          placeholder="e.g. I run a small landscaping company in Baton Rouge. We do lawn care, tree trimming, and seasonal cleanups for homeowners and small businesses."
        />
      </FormField>

      <FormField
        label="Where are you located?"
        hint="Leave blank if you're remote or serve customers online."
        optional
      >
        <TextInput
          value={formData.bizLocation}
          onChange={(value) => updateField('bizLocation', value)}
          placeholder="e.g. Denham Springs, Louisiana"
        />
      </FormField>

      <FormField
        label="When someone visits your website, what's the most important thing you want them to do?"
        hint='Examples: "Book an appointment", "Call me", "Learn about my services and then contact me", "Buy my products online"'
      >
        <TextArea
          value={formData.siteGoal}
          onChange={(value) => updateField('siteGoal', value)}
          placeholder="e.g. Call me for a free quote. I want my phone number to be the first thing they see."
          rows={5}
        />
      </FormField>

      <NavRow showBack={false} onNext={onNext} />
    </div>
  )
}
