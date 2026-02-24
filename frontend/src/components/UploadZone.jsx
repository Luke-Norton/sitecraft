import { useRef } from 'react'

export default function UploadZone({
  icon,
  label,
  sublabel,
  accept = 'image/*',
  multiple = false,
  files,
  onFilesChange,
}) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    if (multiple) {
      onFilesChange(Array.from(e.target.files))
    } else {
      onFilesChange(e.target.files[0] || null)
    }
  }

  const fileList = multiple
    ? files || []
    : files
    ? [files]
    : []

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        className="border-[1.5px] border-dashed border-border rounded-sc p-8 text-center cursor-pointer transition-all duration-200 bg-surface hover:border-accent hover:bg-accent-dim relative"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
        <div className="text-[28px] mb-2.5">{icon}</div>
        <div className="text-[14px] font-medium text-white mb-1">{label}</div>
        <div className="text-xs text-muted">{sublabel}</div>
      </div>

      {fileList.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {fileList.map((file, index) => (
            <div
              key={index}
              className="bg-accent-dim border border-[rgba(200,241,53,0.3)] text-accent px-2.5 py-1 rounded-full text-xs font-medium"
            >
              {file.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
