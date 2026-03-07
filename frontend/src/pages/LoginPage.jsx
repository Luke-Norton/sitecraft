import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Button from '../components/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate(searchParams.get('redirect') || '/create', { replace: true })
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setSuccess('Account created! You can now sign in.')
        setMode('signin')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      } else {
        navigate(searchParams.get('redirect') || '/create', { replace: true })
      }
    }

    setLoading(false)
  }

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin')
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <Link to="/" className="font-syne font-extrabold text-xl text-accent">Bespoke</Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="font-syne text-2xl font-bold text-white mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-muted text-sm">
              {mode === 'signin'
                ? 'Sign in to continue building.'
                : "It's free. Get started in seconds."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:border-accent focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm text-muted mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:border-accent focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={switchMode} className="text-accent hover:underline">
              {mode === 'signin' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
