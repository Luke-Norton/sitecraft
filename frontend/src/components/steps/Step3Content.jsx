import ProgressBar from '../ProgressBar'
import StepHeader from '../StepHeader'
import FormField, { TextInput, TextArea } from '../FormField'
import UploadZone from '../UploadZone'
import DynamicList from '../DynamicList'
import NavRow from '../NavRow'

export default function Step3Content({
  formData,
  updateField,
  addService,
  updateService,
  removeService,
  setLogoFile,
  setPhotoFiles,
  onBack,
  onNext,
}) {
  return (
    <div className="animate-fade-up">
      <ProgressBar step={3} />
      <StepHeader
        stepNumber={3}
        title="Your Content"
        description="This is the raw material your site is built from. The more you give, the better it'll be."
      />

      <FormField label="Upload your logo" optional>
        <UploadZone
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          }
          label="Drop your logo here or click to browse"
          sublabel="Don't have one? No worries — we'll use your business name as text."
          files={formData.logoFile}
          onFilesChange={setLogoFile}
        />
      </FormField>

      <FormField label="Upload photos for your site" optional hint="Phone photos are totally fine. Upload as many as you have.">
        <UploadZone
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          }
          label="Drop your photos here or click to browse"
          sublabel="Phone photos are totally fine. Upload as many as you have."
          multiple
          files={formData.photoFiles}
          onFilesChange={setPhotoFiles}
        />
      </FormField>

      <FormField
        label="Tell us about your business in a few sentences"
        hint='This will appear as your "About" section. Write it in your own voice.'
      >
        <TextArea
          value={formData.bizAbout}
          onChange={(value) => updateField('bizAbout', value)}
          placeholder="e.g. We've been serving the Baton Rouge area since 2010. Family owned and operated, we take pride in showing up on time and doing the job right the first time. No job is too big or too small."
          rows={5}
        />
      </FormField>

      <FormField label="What are your main services or products?">
        <DynamicList
          items={formData.services}
          onAdd={addService}
          onUpdate={updateService}
          onRemove={removeService}
          placeholder="e.g. Lawn mowing"
          addLabel="+ Add another service"
        />
      </FormField>

      <FormField label="Contact info">
        <div className="flex flex-col gap-2.5">
          <TextInput
            type="tel"
            value={formData.phone}
            onChange={(value) => updateField('phone', value)}
            placeholder="Phone number"
          />
          <TextInput
            type="email"
            value={formData.email}
            onChange={(value) => updateField('email', value)}
            placeholder="Email address"
          />
          <TextInput
            value={formData.address}
            onChange={(value) => updateField('address', value)}
            placeholder="Business address (if applicable)"
          />
        </div>
      </FormField>

      <FormField label="Social media links" optional>
        <div className="flex flex-col gap-2.5">
          <TextInput
            type="url"
            value={formData.facebook}
            onChange={(value) => updateField('facebook', value)}
            placeholder="Facebook URL"
          />
          <TextInput
            type="url"
            value={formData.instagram}
            onChange={(value) => updateField('instagram', value)}
            placeholder="Instagram URL"
          />
          <TextInput
            type="url"
            value={formData.otherSocial}
            onChange={(value) => updateField('otherSocial', value)}
            placeholder="Any other link"
          />
        </div>
      </FormField>

      <NavRow onBack={onBack} onNext={onNext} />
    </div>
  )
}
