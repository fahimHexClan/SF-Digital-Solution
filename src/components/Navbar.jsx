import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import SFLogo from '../assets/SF Logo.png'

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
  const [glitching, setGlitching] = useState(false)
  const location = useLocation()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Logo glitch on mount */
  useEffect(() => {
    const t1 = setTimeout(() => setGlitching(true), 400)
    const t2 = setTimeout(() => setGlitching(false), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: 'rgba(7,16,32,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(30,111,255,0.12)',
        boxShadow: scrolled ? '0 4px 30px rgba(30,111,255,0.08), 0 0 60px rgba(30,111,255,0.03)' : 'none',
        padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
        transition: 'box-shadow 0.3s ease',
      }}>
        {/* Left: Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={SFLogo}
            alt="SF Digital Solutions Logo"
            style={{
              width: '48px',
              height: '48px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 8px rgba(30,111,255,0.5))',
              transition: 'filter 0.3s ease',
            }}
            onMouseEnter={e => e.target.style.filter = 'drop-shadow(0 0 16px rgba(77,159,255,0.8))'}
            onMouseLeave={e => e.target.style.filter = 'drop-shadow(0 0 8px rgba(30,111,255,0.5))'}
          />
          <div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: '#e8f4ff',
              letterSpacing: '3px',
              lineHeight: 1,
            }}>DIGITAL SOLUTIONS</div>
            <div style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(30,111,255,0.6)',
              letterSpacing: '4px',
              marginTop: '2px',
            }}>SRI LANKA</div>
          </div>
        </Link>

        {/* Center: Nav links */}
        <div className="nav-links-desktop hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map(link => {
            const isActive = location.pathname === link.path
            return (
              <Link key={link.path} to={link.path} style={{
                fontFamily: 'Rajdhani, sans-serif', fontSize: '12px', fontWeight: 600,
                letterSpacing: '3px', textTransform: 'uppercase',
                color: isActive ? '#4d9fff' : 'rgba(107,159,212,0.7)',
                textDecoration: 'none', transition: 'color 0.2s ease, text-shadow 0.2s ease',
                borderBottom: isActive ? '1px solid rgba(77,159,255,0.5)' : '1px solid transparent',
                paddingBottom: '2px',
                textShadow: isActive ? '0 0 12px rgba(77,159,255,0.6)' : 'none',
              }}
                onMouseEnter={e => { if (!isActive) { e.target.style.color = '#4d9fff'; e.target.style.textShadow = '0 0 10px rgba(77,159,255,0.5)' } }}
                onMouseLeave={e => { if (!isActive) { e.target.style.color = 'rgba(107,159,212,0.7)'; e.target.style.textShadow = 'none' } }}
              >{link.label}</Link>
            )
          })}
        </div>

        {/* Right: CTA + burger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/contact" className="btn-primary-glass hidden md:inline-flex" style={{ fontSize: '11px', padding: '10px 24px', minHeight: '40px' }}>
            Get Started
          </Link>
          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            style={{
              background: 'rgba(30,111,255,0.06)', border: '1px solid rgba(30,111,255,0.25)',
              padding: '8px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '4px',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: '18px', height: '1.5px', background: '#4d9fff',
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
              background: 'rgba(7,16,32,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(30,111,255,0.15)',
              boxShadow: '0 8px 40px rgba(30,111,255,0.1)',
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
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.8rem', fontWeight: 700,
                  color: location.pathname === link.path ? '#4d9fff' : 'rgba(232,244,255,0.8)',
                  textDecoration: 'none',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(30,111,255,0.1)',
                  letterSpacing: '2px',
                  textShadow: location.pathname === link.path ? '0 0 20px rgba(77,159,255,0.5)' : 'none',
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
