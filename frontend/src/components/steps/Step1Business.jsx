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
        title="Your Business"
        description="Let's start with the basics. Tell us who you are."
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

      <NavRow showBack={false} onNext={onNext} />
    </div>
  )
}
