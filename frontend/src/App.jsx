import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import IntakeForm from './pages/IntakeForm'
import BuildPage from './pages/BuildPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<IntakeForm />} />
      <Route path="/build/:submissionId" element={<BuildPage />} />
    </Routes>
  )
}

export default App
