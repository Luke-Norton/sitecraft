import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextArea } from '../FormField'
import StructureCards from '../StructureCards'
import NavRow from '../NavRow'

export default function Step5Structure({ formData, updateField, onBack, onNext }) {
  return (
    <div className="animate-fade-up">
      <ProgressBar step={5} />
      <StepHeader
        stepNumber={5}
        title="Structure"
        description="How much do you want to share on your site?"
      />

      <FormField>
        <StructureCards
          value={formData.structure}
          onChange={(value) => updateField('structure', value)}
        />
      </FormField>

      <FormField
        label="Anything else you want on the site?"
        optional
        className="mt-7"
      >
        <TextArea
          value={formData.extraNotes}
          onChange={(value) => updateField('extraNotes', value)}
          placeholder="e.g. I want a FAQ section, a map showing my location, a before & after photo gallery, customer reviews..."
        />
      </FormField>

      <NavRow onBack={onBack} onNext={onNext} nextLabel="Review →" />
    </div>
  )
}
