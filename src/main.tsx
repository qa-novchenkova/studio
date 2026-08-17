import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AgroQuiz from './pages/AgroQuiz.tsx'
import MenuCalc from './pages/MenuCalc.tsx'
import PetGame from './pages/PetGame.tsx'
import AutoGame from './pages/AutoGame.tsx'
import RealtyGame from './pages/RealtyGame.tsx'

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
        <Route path="/calc-horeca" element={<MenuCalc />} />
        <Route path="/game-petfood" element={<PetGame />} />
        <Route path="/game-auto" element={<AutoGame />} />
        <Route path="/game-realty" element={<RealtyGame />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
