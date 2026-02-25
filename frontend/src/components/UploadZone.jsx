import { useRef, useState, useEffect } from 'react'

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
  const [previews, setPreviews] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  // Generate preview URLs for images
  useEffect(() => {
    const fileList = multiple ? (files || []) : (files ? [files] : [])
    const urls = fileList.map(file => URL.createObjectURL(file))
    setPreviews(urls)

    // Cleanup URLs on unmount
    return () => urls.forEach(url => URL.revokeObjectURL(url))
  }, [files, multiple])

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    if (selectedFiles.length === 0) return

    if (multiple) {
      // Append to existing files
      const existingFiles = files || []
      onFilesChange([...existingFiles, ...selectedFiles])
    } else {
      onFilesChange(selectedFiles[0])
    }
    // Reset input so the same file can be selected again
    e.target.value = ''
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files || []).filter(
      file => file.type.startsWith('image/')
    )
    if (droppedFiles.length === 0) return

    if (multiple) {
      const existingFiles = files || []
      onFilesChange([...existingFiles, ...droppedFiles])
    } else {
      onFilesChange(droppedFiles[0])
    }
  }

  const removeFile = (index) => {
    if (multiple) {
      const newFiles = [...(files || [])]
      newFiles.splice(index, 1)
      onFilesChange(newFiles)
    } else {
      onFilesChange(null)
    }
  }

  const fileList = multiple ? (files || []) : (files ? [files] : [])

  return (
    <div>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-[1.5px] border-dashed rounded-sc p-8 text-center cursor-pointer transition-all duration-200 bg-surface ${
          isDragging
            ? 'border-accent bg-accent-dim'
            : 'border-border hover:border-accent hover:bg-accent-dim'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <div className="text-[28px] mb-2.5">{icon}</div>
        <div className="text-[14px] font-medium text-white mb-1">{label}</div>
        <div className="text-xs text-muted">{sublabel}</div>
        {multiple && fileList.length > 0 && (
          <div className="text-xs text-accent mt-2">
            {fileList.length} file{fileList.length !== 1 ? 's' : ''} selected — click to add more
          </div>
        )}
      </div>

      {/* File previews */}
      {fileList.length > 0 && (
        <div className={`mt-3 ${multiple ? 'grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2' : ''}`}>
          {fileList.map((file, index) => (
            <div
              key={index}
              className={`relative group ${multiple ? '' : 'inline-block'}`}
            >
              {/* Thumbnail preview */}
              <div className={`relative overflow-hidden rounded-sc border border-border ${
                multiple ? 'aspect-square' : 'w-20 h-20'
              }`}>
                <img
                  src={previews[index]}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Filename */}
              <p className="text-xs text-muted mt-1 truncate max-w-full" title={file.name}>
                {file.name.length > 12 ? file.name.slice(0, 10) + '...' : file.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
