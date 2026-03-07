import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const API_URL = import.meta.env.VITE_API_URL || ''

function StatusBadge({ status }) {
  const styles = {
    generated: 'bg-accent/10 text-accent border-accent/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  }
  const label = status === 'generated' ? 'Ready' : 'Pending'
  const cls = styles[status] || 'bg-white/5 text-muted border-white/10'
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border ${cls}`}>{label}</span>
  )
}

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DashboardPage() {
  const { session, signOut } = useAuth()
  const navigate = useNavigate()
  const user = session?.user

  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSites() {
      try {
        const res = await fetch(`${API_URL}/api/submissions`, {
          headers: { Authorization: 'Bearer ' + (session?.access_token || '') },
        })
        if (!res.ok) throw new Error('Failed to load sites')
        const data = await res.json()
        setSites(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchSites()
  }, [session])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-syne font-extrabold text-xl text-accent">Bespoke</Link>
        <button onClick={handleSignOut} className="text-xs text-muted hover:text-white transition-colors">
          Sign out
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* User info */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-black font-bold text-lg">
            {(user?.email || 'U')[0].toUpperCase()}
          </div>
          <div>
            <p className="text-white font-medium">{user?.email}</p>
            <p className="text-muted text-sm">Your Bespoke account</p>
          </div>
          <Link
            to="/create"
            className="ml-auto bg-accent hover:bg-accent/90 text-black font-semibold px-5 py-2.5 rounded-full text-sm transition-all"
          >
            + New Site
          </Link>
        </div>

        {/* Sites list */}
        <div>
          <h2 className="font-syne font-bold text-lg mb-4">Your Sites</h2>

          {loading && (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-surface border border-border rounded-xl animate-pulse" />
              ))}
            </div>
          )}

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {!loading && !error && sites.length === 0 && (
            <div className="border border-dashed border-border rounded-xl p-12 text-center">
              <p className="text-muted mb-4">No sites yet.</p>
              <Link
                to="/create"
                className="bg-accent hover:bg-accent/90 text-black font-semibold px-6 py-3 rounded-full text-sm transition-all"
              >
                Build Your First Site
              </Link>
            </div>
          )}

          {!loading && !error && sites.length > 0 && (
            <div className="space-y-3">
              {sites.map(site => (
                <div
                  key={site.id}
                  className="bg-surface border border-border rounded-xl px-5 py-4 flex items-center gap-4 hover:border-accent/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">
                      {site.biz_name || 'Untitled Site'}
                    </p>
                    <p className="text-muted text-xs mt-0.5">{formatDate(site.created_at)}</p>
                  </div>
                  <StatusBadge status={site.status} />
                  {site.status === 'generated' && (
                    <Link
                      to={`/build/${site.id}`}
                      className="text-sm text-accent hover:underline flex-shrink-0"
                    >
                      Open
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
