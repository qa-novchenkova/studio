import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AgroQuiz from './pages/AgroQuiz.tsx'

// при смене страницы — наверх
function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quiz-agro" element={<AgroQuiz />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
