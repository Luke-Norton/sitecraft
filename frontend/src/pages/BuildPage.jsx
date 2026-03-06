import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'

const API_URL = import.meta.env.VITE_API_URL || ''

// SVG Icons for building animation
const BuildIcons = {
  code: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  layout: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
    </svg>
  ),
  palette: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="13.5" cy="6.5" r="2.5" /><circle cx="6.5" cy="12.5" r="2.5" /><circle cx="8.5" cy="18.5" r="2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.1-.7-.4-1-.3-.3-.4-.6-.4-1 0-.8.7-1.5 1.5-1.5H16c3.3 0 6-2.7 6-6 0-5.5-4.5-9-10-9z" />
    </svg>
  ),
  type: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  grid: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  phone: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
      <path d="M5 19l.5 1.5L7 21l-1.5.5L5 23l-.5-1.5L3 21l1.5-.5L5 19z" />
      <path d="M19 11l.5 1.5L21 13l-1.5.5L19 15l-.5-1.5L17 13l1.5-.5L19 11z" />
    </svg>
  ),
  wand: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8l1.4 1.4M17.8 6.2l1.4-1.4M3 21l9-9M12.2 6.2l-1.4-1.4" />
    </svg>
  ),
  layers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  sliders: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  ),
  zap: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  check: (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
}

// Fun building messages with icon keys
const buildingMessages = [
  { text: "Warming up the design engines...", icon: "zap" },
  { text: "Picking the perfect pixels...", icon: "grid" },
  { text: "Arranging the layout...", icon: "layout" },
  { text: "Crafting the components...", icon: "layers" },
  { text: "Mixing the color palette...", icon: "palette" },
  { text: "Making everything responsive...", icon: "phone" },
  { text: "Adding some polish...", icon: "sparkles" },
  { text: "Perfecting the typography...", icon: "type" },
  { text: "Fine-tuning the spacing...", icon: "sliders" },
  { text: "Weaving in the styles...", icon: "wand" },
  { text: "Optimizing the code...", icon: "code" },
  { text: "Almost there...", icon: "check" },
]

export default function BuildPage() {
  const { submissionId } = useParams()
  const navigate = useNavigate()

  const [phase, setPhase] = useState('building') // building, preview, deploying, success
  const [streamedCode, setStreamedCode] = useState('')
  const [finalCode, setFinalCode] = useState('')
  const [deployedUrl, setDeployedUrl] = useState('')
  const [error, setError] = useState(null)
  const [changeRequest, setChangeRequest] = useState('')
  const [isRevising, setIsRevising] = useState(false)
  const [copied, setCopied] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)

  // Multi-page state
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState('index')

  // Chat state
  const [chatMessages, setChatMessages] = useState([])
  const chatBottomRef = useRef(null)

  const iframeRef = useRef(null)

  // Cycle through fun messages during build
  useEffect(() => {
    if (phase !== 'building') return

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % buildingMessages.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [phase])


  // Auto-scroll chat on new message or typing indicator
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages, isRevising])

  // Show welcome message when build completes
  useEffect(() => {
    if (phase === 'preview' && chatMessages.length === 0) {
      setChatMessages([{
        role: 'assistant',
        text: "Your site is ready! Describe any changes you'd like and I'll update it instantly."
      }])
    }
  }, [phase])

  // Listen for postMessage navigation from the iframe (multi-page preview)
  useEffect(() => {
    const handler = (event) => {
      if (event.data?.type === 'navigate') {
        const target = pages.find((p) => p.name === event.data.page)
        if (target) {
          setCurrentPage(target.name)
          setFinalCode(target.html)
        }
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [pages])

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
          console.log('=== SSE Complete received ===')
          console.log('data.multiPage:', data.multiPage)
          console.log('data.pages:', data.pages?.length || 0)

          // Handle multi-page response from backend
          if (data.multiPage && data.pages?.length > 0) {
            console.log('Using backend-parsed multi-page data')
            setPages(data.pages)
            setCurrentPage(data.pages[0].name)
            setFinalCode(data.pages[0].html)
          } else {
            // Try frontend parsing as fallback
            const content = data.content || ''
            console.log('Content preview:', content.substring(0, 200))

            // Try delimiter format first
            if (content.includes('===PAGE_START===') && content.includes('===HTML_START===')) {
              console.log('Trying delimiter format parsing...')
              const parsedPages = []
              const pageBlocks = content.split('===PAGE_START===').filter(b => b.trim())

              for (const block of pageBlocks) {
                if (!block.includes('===PAGE_END===')) continue
                const pageContent = block.split('===PAGE_END===')[0]
                const nameMatch = pageContent.match(/name:\s*(\S+)/)
                const titleMatch = pageContent.match(/title:\s*(.+?)(?:\n|===)/)
                const htmlMatch = pageContent.match(/===HTML_START===\s*([\s\S]*?)\s*===HTML_END===/)

                if (nameMatch && htmlMatch) {
                  parsedPages.push({
                    name: nameMatch[1].trim(),
                    title: titleMatch ? titleMatch[1].trim() : nameMatch[1].trim(),
                    html: htmlMatch[1].trim()
                  })
                }
              }

              if (parsedPages.length > 0) {
                console.log('SUCCESS: Frontend parsed', parsedPages.length, 'pages via delimiters')
                setPages(parsedPages)
                setCurrentPage(parsedPages[0].name)
                setFinalCode(parsedPages[0].html)
                setPhase('preview')
                eventSource.close()
                return
              }
            }

            // Fallback to JSON parsing
            if (content.includes('"pages"') && content.includes('"html"')) {
              console.log('Trying JSON format parsing...')
              try {
                let cleanContent = content.trim()
                  .replace(/^```(?:json)?\s*\n?/i, '')
                  .replace(/\n?```\s*$/i, '')
                  .trim()

                const parsed = JSON.parse(cleanContent)
                if (parsed.pages?.length > 0) {
                  const validPages = parsed.pages.filter(p => p.name && p.html)
                  if (validPages.length > 0) {
                    console.log('SUCCESS: Frontend parsed', validPages.length, 'pages via JSON')
                    setPages(validPages)
                    setCurrentPage(validPages[0].name)
                    setFinalCode(validPages[0].html)
                    setPhase('preview')
                    eventSource.close()
                    return
                  }
                }
              } catch (e) {
                console.error('Frontend JSON parse failed:', e.message)
              }
            }

            setFinalCode(content)
          }
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

    const userText = changeRequest
    setChatMessages(prev => [...prev, { role: 'user', text: userText }])
    setChangeRequest('')
    setIsRevising(true)
    setError(null)

    try {
      const response = await fetch(`${API_URL}/api/revise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: finalCode, changes: userText }),
      })

      if (!response.ok) throw new Error('Failed to start revision')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split(String.fromCharCode(10))
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.type === 'plan') {
                // Show the AI's plan in chat — replaces typing dots
                setChatMessages(prev => [...prev, { role: 'assistant', text: data.content }])
              } else if (data.type === 'complete') {
                if (pages.length > 0) {
                  setPages(prev => prev.map(p =>
                    p.name === currentPage ? { ...p, html: data.content } : p
                  ))
                }
                setFinalCode(data.content)
                setChatMessages(prev => [...prev, {
                  role: 'assistant',
                  text: "Done! Your site has been updated."
                }])
              } else if (data.type === 'error') {
                setError(data.message)
              }
              // data.type === 'chunk' — ignored, no streaming preview
            } catch (e) { /* skip malformed JSON */ }
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to revise. Please try again.')
    } finally {
      setIsRevising(false)
    }
  }, [changeRequest, finalCode, pages, currentPage])

    // Handle deploy
  const handleDeploy = useCallback(async () => {
    setPhase('deploying')
    setError(null)

    try {
      // Build deploy payload - multi-page or single page
      const payload = pages.length > 0
        ? { pages }
        : { html: finalCode }

      const response = await fetch(`${API_URL}/api/deploy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
  }, [finalCode, pages])

  // Copy URL to clipboard
  const copyUrl = () => {
    navigator.clipboard.writeText(deployedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get the current page's HTML
  const getCurrentPageHtml = () => {
    if (pages.length > 0) {
      const page = pages.find(p => p.name === currentPage)
      return page?.html || ''
    }
    return finalCode || streamedCode
  }

  // Render the preview iframe
  const renderPreview = () => {
    const htmlContent = getCurrentPageHtml()
    if (!htmlContent) return null

    // Inject script to handle navigation within iframe only
    const navScript = `
<script>
document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link) {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
      e.preventDefault();
      var pageName = href.replace('./', '').replace('.html', '');
      window.parent.postMessage({ type: 'navigate', page: pageName }, '*');
    }
  }
});
</script>
</body>`

    // Insert navigation script before closing body tag
    const processedHtml = htmlContent.replace('</body>', navScript)

    return (
      <iframe
        ref={iframeRef}
        srcDoc={processedHtml}
        title="Site Preview"
        className="w-full h-full bg-white border-0"
        sandbox="allow-scripts"
      />
    )
  }

  // Building phase
  if (phase === 'building') {
    const currentMessage = buildingMessages[messageIndex % buildingMessages.length]

    return (
      <div className="min-h-screen bg-bg">
        {/* Header */}
        <header className="border-b border-border px-6 py-4">
          <Link to="/" className="font-syne font-extrabold text-xl text-accent">
            Bespoke
          </Link>
        </header>

        <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-65px)]">
          <div className="w-full max-w-md text-center">
            {/* Animated Logo */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-spin-slow" />
              {/* Middle pulsing ring */}
              <div className="absolute inset-3 rounded-full border-2 border-accent/30 animate-pulse" />
              {/* Inner ring */}
              <div className="absolute inset-6 rounded-full border-2 border-accent/40" />
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center text-accent animate-pulse-subtle">
                {BuildIcons[currentMessage.icon]}
              </div>
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-sm font-medium">
                Building
              </span>
            </div>

            {/* Main heading */}
            <h1 className="font-syne text-2xl md:text-3xl font-bold text-white mb-3">
              Building your website
            </h1>

            {/* Animated message */}
            <p className="text-muted text-lg mb-8 h-8 transition-all duration-300">
              {currentMessage.text}
            </p>


            {/* Fun footer text */}
            <p className="text-xs text-muted/50 mt-8">
              Good things take time... but not too much time
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Deploying phase
  if (phase === 'deploying') {
    return (
      <div className="min-h-screen bg-bg">
        <header className="border-b border-border px-6 py-4">
          <Link to="/" className="font-syne font-extrabold text-xl text-accent">
            Bespoke
          </Link>
        </header>

        <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-65px)]">
          <div className="text-center max-w-md">
            {/* Deploy animation */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full bg-accent/5 animate-ping" />
              <div className="absolute inset-4 rounded-full bg-accent/10 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center text-accent animate-bounce-subtle">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-accent text-sm font-medium">Deploying</span>
            </div>

            <h1 className="font-syne text-2xl md:text-3xl font-bold text-white mb-3">
              Launching to the web...
            </h1>
            <p className="text-muted">
              Your site is being deployed to a live URL
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Success phase
  if (phase === 'success') {
    return (
      <div className="min-h-screen bg-bg">
        <header className="border-b border-border px-6 py-4">
          <Link to="/" className="font-syne font-extrabold text-xl text-accent">
            Bespoke
          </Link>
        </header>

        <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-65px)]">
          <div className="text-center max-w-lg">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c8f135" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="font-syne text-3xl font-bold text-white mb-3">
              Your site is live!
            </h1>
            <p className="text-muted mb-8 leading-relaxed">
              Your website has been deployed and is now accessible to the world.
            </p>

            <div className="bg-surface border border-border rounded-xl p-5 mb-8">
              <div className="text-xs text-muted mb-2 uppercase tracking-wide">Your live URL</div>
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
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    Copy URL
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(deployedUrl, '_blank')}
              >
                Visit Site
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </Button>
            </div>

            <Link
              to="/create"
              className="inline-block mt-8 text-sm text-muted hover:text-accent transition-colors"
            >
              Build another site
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Preview phase — split-pane layout
  return (
    <div className="h-screen bg-bg flex flex-col">
      {/* Header — full width */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between flex-shrink-0">
        <Link to="/" className="font-syne font-extrabold text-xl text-accent">Bespoke</Link>
        <Button onClick={handleDeploy} disabled={isRevising}>
          Publish Site
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </Button>
      </header>

      {/* Body — two columns */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: Chat panel */}
        <div className="w-80 flex flex-col border-r border-border bg-surface flex-shrink-0">
          {/* Message list — scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-black'
                    : 'bg-bg border border-border text-white'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator while revising */}
            {isRevising && (
              <div className="flex gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                  </svg>
                </div>
                <div className="bg-bg border border-border rounded-xl px-3 py-2">
                  <div className="flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-border flex-shrink-0">
            {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
            <div className="flex gap-2 items-end">
              <textarea
                value={changeRequest}
                onChange={(e) => setChangeRequest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleRevision()
                  }
                }}
                disabled={isRevising}
                placeholder="Describe a change..."
                className="flex-1 bg-bg border border-border rounded-xl px-3 py-2 text-white text-sm placeholder:text-white/30 focus:border-accent focus:outline-none resize-none h-20"
              />
              <Button
                onClick={handleRevision}
                disabled={!changeRequest.trim() || isRevising}
                className="flex-shrink-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: Preview panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Browser chrome */}
          <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-border flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 text-xs text-muted">Preview</span>

            {/* Page Switcher (multi-page only) */}
            {pages.length > 1 && (
              <div className="ml-auto flex items-center gap-1">
                {pages.map((page) => (
                  <button
                    key={page.name}
                    onClick={() => setCurrentPage(page.name)}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${
                      currentPage === page.name
                        ? 'bg-accent text-black font-medium'
                        : 'text-muted hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {page.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* iframe — fills remaining height */}
          <div className="flex-1 overflow-hidden">
            {renderPreview()}
          </div>
        </div>

      </div>
    </div>
  )
}
