import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './foundation/providers/AppProvider'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import CustomCursor from './components/motion/CustomCursor'
import HomePage from './pages/HomePage'
import OffersPage from './pages/OffersPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import GalleryPage from './pages/GalleryPage'

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
  <>
  <ScrollToTop />
  <CustomCursor />
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: "linear-gradient(135deg, #08080a 0%, #0d0d10 40%, #131318 70%, #0d0d10 100%)",
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%',
        backgroundRepeat: 'no-repeat',
      }}
    />
      <div className="relative z-10 min-h-screen text-ink-100">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div>
      <main>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/nabidka" element={<OffersPage />} />
         <Route path="/o-nas" element={<AboutPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/galerie" element={<GalleryPage />} />
           <Route path="/rezervace" element={<Navigate to="/kontakt" replace />} />
         <Route path="*" element={<HomePage />} />
       </Routes>
     </main>
     <Footer />
    </div>
   </div>
  </>
  )
}

export default function App() {
  return (
  <BrowserRouter>
  <AppProvider>
  <AppShell />
  </AppProvider>
  </BrowserRouter>
  )
}
