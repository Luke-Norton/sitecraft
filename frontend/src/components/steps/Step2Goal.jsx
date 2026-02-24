import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextArea } from '../FormField'
import NavRow from '../NavRow'

export default function Step2Goal({ formData, updateField, onBack, onNext }) {
  return (
    <div className="animate-fade-up">
      <ProgressBar step={2} />
      <StepHeader
        stepNumber={2}
        title="Your Goal"
        description="What do you want your website to actually do for you?"
      />

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

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  )
}
