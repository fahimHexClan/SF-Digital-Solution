import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Courses', path: '/courses' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.98)',
        borderBottom: '1px solid rgba(37,99,235,0.08)',
        boxShadow: scrolled ? '0 2px 20px rgba(37,99,235,0.08)' : 'none',
        padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
        transition: 'box-shadow 0.3s ease',
      }}>
        {/* Left: Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px', height: '32px', background: '#2563eb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: '#ffffff', fontFamily: 'Bebas Neue, sans-serif', fontSize: '17px', letterSpacing: '1px' }}>SF</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', color: '#0a0f2e', letterSpacing: '3px', lineHeight: 1 }}>Digital Solutions</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#9ca3af', letterSpacing: '2px', marginTop: '2px' }}>Sri Lanka</div>
          </div>
        </Link>

        {/* Center: Nav links */}
        <div className="nav-links-desktop hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map(link => {
            const isActive = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '10px',
                letterSpacing: '3px', textTransform: 'uppercase',
                color: isActive ? '#2563eb' : '#4b5563',
                textDecoration: 'none', transition: 'color 0.2s ease',
                borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                paddingBottom: '2px',
              }}
                onMouseEnter={e => { if (!isActive) e.target.style.color = '#2563eb' }}
                onMouseLeave={e => { if (!isActive) e.target.style.color = '#4b5563' }}
              >{link.label}</Link>
            )
          })}
        </div>

        {/* Right: CTA + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/contact" className="btn-primary-glass hidden md:inline-flex" style={{ fontSize: '10px', padding: '10px 24px' }}>
            Get Started
          </Link>
          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'transparent', border: '1px solid rgba(37,99,235,0.2)',
              padding: '8px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '18px', height: '1.5px', background: '#2563eb',
                transition: 'all 0.3s ease', transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(3.5px, 3.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(3.5px, -3.5px)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 999,
              background: '#ffffff',
              borderBottom: '1px solid rgba(37,99,235,0.1)',
              boxShadow: '0 8px 30px rgba(37,99,235,0.08)',
              padding: '2rem 5vw 2.5rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={link.path} style={{
                  display: 'block',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2.5rem', fontWeight: 400,
                  color: location.pathname === link.path ? '#2563eb' : '#0a0f2e',
                  textDecoration: 'none',
                  padding: '0.4rem 0',
                  borderBottom: '1px solid rgba(37,99,235,0.08)',
                  letterSpacing: '2px',
                  transition: 'color 0.2s',
                }}>{link.label}</Link>
              </motion.div>
            ))}
            <Link to="/contact" className="btn-primary-glass" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
