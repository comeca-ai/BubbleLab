import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './components/LandingPage'
import { SignupPage } from './components/SignupPage'
import { OnboardingPage } from './components/OnboardingPage'
import { ChatPage } from './components/ChatPage'
import { DashboardPage } from './components/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - sem layout */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth - sem layout */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<SignupPage />} />

        {/* Onboarding - sem layout */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* App com layout */}
        <Route element={<Layout />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
