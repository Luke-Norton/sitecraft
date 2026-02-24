import { Routes, Route } from 'react-router-dom'
import IntakeForm from './pages/IntakeForm'
import BuildPage from './pages/BuildPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntakeForm />} />
      <Route path="/build/:submissionId" element={<BuildPage />} />
    </Routes>
  )
}

export default App
