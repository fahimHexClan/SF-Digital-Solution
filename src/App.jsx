import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import CoursesPage from './pages/CoursesPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handle = () => {
      const total = document.body.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return <div className="scroll-progress" style={{ width: `${progress}%` }} />
}

/* ── Custom cursor — rendered at root level, outside any stacking context ── */
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const ring  = useRef({ x: -100, y: -100 })

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    let raf
    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12)

      if (dotRef.current) {
        // Use left/top directly — avoids any parent-transform issues
        dotRef.current.style.left = `${mouse.current.x - 4}px`
        dotRef.current.style.top  = `${mouse.current.y - 4}px`
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x - 16}px`
        ringRef.current.style.top  = `${ring.current.y - 16}px`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

function ParticleCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 60 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.28 + 0.06,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(30,111,255,${p.alpha})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x
          const dy   = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(30,111,255,${(1 - dist / 110) * 0.06})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/"          element={<Home />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/courses"   element={<CoursesPage />} />
          <Route path="/contact"   element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function AppLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', position: 'relative', zIndex: 1 }}>
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      {/* These render outside AppLayout to avoid any stacking-context interference */}
      <ParticleCanvas />
      <CustomCursor />
      <AppLayout />
    </Router>
  )
}
