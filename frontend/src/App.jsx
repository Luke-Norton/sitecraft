import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import LandingPage from './pages/LandingPage'
import IntakeForm from './pages/IntakeForm'
import BuildPage from './pages/BuildPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create' element={<ProtectedRoute><IntakeForm /></ProtectedRoute>} />
        <Route path='/build/:submissionId' element={<ProtectedRoute><BuildPage /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App
