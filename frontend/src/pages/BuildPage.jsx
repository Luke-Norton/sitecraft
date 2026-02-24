import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function BuildPage() {
  const { submissionId } = useParams()
  const navigate = useNavigate()

  const [phase, setPhase] = useState('building') // building, preview, revising, deploying, success
  const [streamedCode, setStreamedCode] = useState('')
  const [finalCode, setFinalCode] = useState('')
  const [deployedUrl, setDeployedUrl] = useState('')
  const [error, setError] = useState(null)
  const [changeRequest, setChangeRequest] = useState('')
  const [isRevising, setIsRevising] = useState(false)
  const [copied, setCopied] = useState(false)

  const codeRef = useRef(null)
  const iframeRef = useRef(null)

  // Auto-scroll code view
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight
    }
  }, [streamedCode])

  // Start the build process
  useEffect(() => {
    if (!submissionId) return

    const eventSource = new EventSource(`${API_URL}/api/build/${submissionId}`)

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'chunk') {
          setStreamedCode((prev) => prev + data.content)
        } else if (data.type === 'complete') {
          setFinalCode(data.content)
          setPhase('preview')
          eventSource.close()
        } else if (data.type === 'error') {
          setError(data.message)
          eventSource.close()
        }
      } catch (e) {
        console.error('Failed to parse SSE message:', e)
      }
    }

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) return
      setError('Connection lost. Please refresh and try again.')
      eventSource.close()
    }

    return () => eventSource.close()
  }, [submissionId])

  // Handle revision request
  const handleRevision = useCallback(async () => {
    if (!changeRequest.trim()) return

    setIsRevising(true)
    setPhase('revising')
    setStreamedCode('')
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/revise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: finalCode,
          changes: changeRequest,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start revision')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === 'chunk') {
                setStreamedCode((prev) => prev + data.content)
              } else if (data.type === 'complete') {
                setFinalCode(data.content)
                setPhase('preview')
                setChangeRequest('')
              } else if (data.type === 'error') {
                setError(data.message)
                setPhase('preview')
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to revise. Please try again.')
      setPhase('preview')
    } finally {
      setIsRevising(false)
    }
  }, [changeRequest, finalCode])

  // Handle deploy
  const handleDeploy = useCallback(async () => {
    setPhase('deploying')
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: finalCode }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Deployment failed')
      }

      const data = await response.json()
      setDeployedUrl(data.url)
      setPhase('success')
    } catch (err) {
      setError(err.message || 'Deployment failed. Please try again.')
      setPhase('preview')
    }
  }, [finalCode])

  // Copy URL to clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(deployedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Render the preview iframe
  const renderPreview = () => {
    const htmlContent = finalCode || streamedCode
    if (!htmlContent) return null

    return (
      <iframe
        ref={iframeRef}
        srcDoc={htmlContent}
        title="Site Preview"
        className="w-full min-h-[600px] bg-white border-0 rounded-sc"
        sandbox="allow-scripts"
      />
    )
  }

  // Building phase
  if (phase === 'building' || phase === 'revising') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse-subtle" />
              <span className="font-syne text-xl font-bold text-white">
                {phase === 'revising'
                  ? 'Claude is updating your site...'
                  : 'Claude is building your site...'}
              </span>
            </div>
            <p className="text-muted text-sm">
              Watch as your website comes to life in real time
            </p>
          </div>

          <div
            ref={codeRef}
            className="bg-[#0d1117] border border-border rounded-sc p-6 font-mono text-xs leading-relaxed text-[#8b949e] max-h-[500px] overflow-y-auto whitespace-pre-wrap break-words"
          >
            {streamedCode}
            <span className="cursor-blink" />
          </div>
        </div>
      </div>
    )
  }

  // Deploying phase
  if (phase === 'deploying') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-accent rounded-full animate-pulse-subtle" />
            <span className="font-syne text-xl font-bold text-white">
              Deploying your site...
            </span>
          </div>
          <p className="text-muted text-sm">
            This will only take a moment
          </p>
        </div>
      </div>
    )
  }

  // Success phase
  if (phase === 'success') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-syne text-3xl font-extrabold text-white mb-4">
            Your site is live!
          </h1>
          <p className="text-muted text-base mb-8 leading-relaxed">
            Your website has been deployed and is now accessible to the world.
            We've submitted it to Google — it will appear in search results
            within a few days.
          </p>

          <div className="bg-surface border border-border rounded-sc p-6 mb-6">
            <div className="text-sm text-muted mb-2">Your live URL</div>
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent text-lg font-medium hover:underline break-all"
            >
              {deployedUrl}
            </a>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={copyUrl}>
              {copied ? '✓ Copied!' : 'Copy URL'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open(deployedUrl, '_blank')}
            >
              Visit Site →
            </Button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-8 text-sm text-muted hover:text-accent transition-colors"
          >
            Build another site
          </button>
        </div>
      </div>
    )
  }

  // Preview phase
  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-syne text-2xl font-extrabold text-white mb-2">
            Preview Your Site
          </h1>
          <p className="text-muted text-sm">
            Review your generated website below. You can publish it or request
            changes.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sc mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <div className="bg-surface border border-border rounded-sc overflow-hidden mb-8">
          <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 text-xs text-muted">Preview</span>
          </div>
          {renderPreview()}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Button onClick={handleDeploy} className="px-8">
            Looks good, publish it →
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              const el = document.getElementById('revision-section')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            I want to change something
          </Button>
        </div>

        <div
          id="revision-section"
          className="bg-surface border border-border rounded-sc p-6"
        >
          <h2 className="font-syne text-lg font-bold text-white mb-2">
            Request Changes
          </h2>
          <p className="text-muted text-sm mb-4">
            Describe what you'd like to change in plain English, and Claude will
            update your site.
          </p>

          <textarea
            value={changeRequest}
            onChange={(e) => setChangeRequest(e.target.value)}
            placeholder="e.g. Make the header background darker, increase the font size of the hero text, add a testimonials section..."
            className="w-full bg-bg border border-border rounded-sc px-4 py-3 text-white text-sm placeholder:text-[#444] focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,241,53,0.12)] transition-all duration-200 resize-none h-32 mb-4"
          />

          <Button
            onClick={handleRevision}
            disabled={!changeRequest.trim() || isRevising}
          >
            {isRevising ? 'Updating...' : 'Apply Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
