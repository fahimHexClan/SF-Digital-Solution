import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import SFLogo from '../assets/SF Logo.png'

// ─────────────────────────────────────
// Data
// ─────────────────────────────────────
const tickerItems = [
  'CUSTOM SYSTEMS', 'WEB DESIGN', 'SEO GROWTH', 'SOCIAL MEDIA',
  'PERSONAL BRANDING', 'DIGITAL COURSES', 'SRI LANKA', 'DIGITAL INNOVATION',
]

const navLinks = [
  { label: 'Home',      path: '/'          },
  { label: 'Services',  path: '/services'  },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Courses',   path: '/courses'   },
  { label: 'Contact',   path: '/contact'   },
]

const serviceLinks = [
  'Custom Management Systems',
  'Web Design & SEO',
  'Social Media Campaigns',
  'Personal Branding',
  'Digital Courses',
]

// ─────────────────────────────────────
// Sub-components
// ─────────────────────────────────────
function FooterLink({ to, children }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      to={to}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '13px',
        color: hov ? '#d6eaff' : 'rgba(107,159,212,0.45)',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        paddingLeft: hov ? '4px' : '0',
      }}
    >
      <span style={{
        color: hov ? '#4d9fff' : 'rgba(30,111,255,0.3)',
        fontSize: '14px',
        display: 'inline-block',
        transition: 'transform 0.2s ease, color 0.2s ease',
        transform: hov ? 'translateX(4px)' : 'translateX(0)',
        flexShrink: 0,
        lineHeight: 1,
      }}>›</span>
      {children}
    </Link>
  )
}

function SocialBox({ abbr }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '34px', height: '34px',
        background: hov ? 'rgba(30,111,255,0.2)' : 'rgba(30,111,255,0.06)',
        border: `1px solid ${hov ? 'rgba(77,159,255,0.5)' : 'rgba(30,111,255,0.15)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: hov ? '0 0 12px rgba(30,111,255,0.25)' : 'none',
        flexShrink: 0,
      }}
    >
      <span style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '10px', fontWeight: 700,
        color: hov ? '#fff' : 'rgba(77,159,255,0.6)',
        transition: 'color 0.2s ease',
        letterSpacing: '0.5px',
      }}>{abbr}</span>
    </div>
  )
}

function ContactRow({ icon, label, value, href }) {
  const [hov, setHov] = useState(false)

  const inner = (
    <div style={{
      display: 'flex', gap: '12px', alignItems: 'center',
      marginBottom: '0.6rem',
    }}>
      <div style={{
        width: '32px', height: '32px', flexShrink: 0,
        background: hov ? 'rgba(30,111,255,0.2)' : 'rgba(30,111,255,0.08)',
        border: '1px solid rgba(30,111,255,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s ease',
      }}>
        <span style={{
          color: hov ? '#fff' : '#4d9fff',
          fontSize: '13px',
          transition: 'color 0.2s ease',
        }}>{icon}</span>
      </div>
      <div>
        <div style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontSize: '9px', fontWeight: 700,
          color: 'rgba(30,111,255,0.5)',
          letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '2px',
        }}>{label}</div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '12px',
          color: 'rgba(107,159,212,0.6)',
        }}>{value}</div>
      </div>
    </div>
  )

  if (href) return (
    <a href={href} style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >{inner}</a>
  )

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {inner}
    </div>
  )
}

// ─────────────────────────────────────
// Main Footer
// ─────────────────────────────────────
export default function Footer() {
  const year          = new Date().getFullYear()
  const [tickerHover, setTickerHover] = useState(false)

  const gridRef    = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })
  const canvasRef  = useRef(null)

  // ── Static background canvas (drawn once) ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width  = canvas.parentElement?.offsetWidth  || 1400
    canvas.height = canvas.parentElement?.offsetHeight || 600

    const ctx = canvas.getContext('2d')
    const w = canvas.width, h = canvas.height

    // Dot grid every 30px
    for (let x = 0; x <= w; x += 30) {
      for (let y = 0; y <= h; y += 30) {
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(30,111,255,0.08)'
        ctx.fill()
      }
    }

    // 2 large faint circles — bottom-right
    const cx = w * 0.95, cy = h * 0.9
    ;[[200, 'rgba(30,111,255,0.04)'], [350, 'rgba(30,111,255,0.025)']].forEach(([r, color]) => {
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.stroke()
    })

    // Top border glow line
    const grad = ctx.createLinearGradient(0, 0, w, 0)
    grad.addColorStop(0,   'rgba(30,111,255,0)')
    grad.addColorStop(0.5, 'rgba(30,111,255,0.3)')
    grad.addColorStop(1,   'rgba(30,111,255,0)')
    ctx.beginPath()
    ctx.moveTo(0, 0.5)
    ctx.lineTo(w, 0.5)
    ctx.strokeStyle = grad
    ctx.lineWidth = 1
    ctx.stroke()
  }, [])

  // Column entrance animation factory
  const col = (i) => ({
    initial: { opacity: 0, y: 25 },
    animate: gridInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  })

  // Column header row
  const ColHeader = ({ text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
      <div style={{
        width: '20px', height: '2px',
        background: '#1e6fff',
        boxShadow: '0 0 8px #1e6fff',
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '10px', fontWeight: 700,
        color: '#4d9fff', letterSpacing: '3px', textTransform: 'uppercase',
      }}>{text}</span>
    </div>
  )

  return (
    <footer style={{ background: 'rgba(2,5,16,1)' }}>
      <style>{`
        @keyframes ftr-pulse {
          0%,100% { transform: scale(1);   opacity: 1;   }
          50%      { transform: scale(1.4); opacity: 0.5; }
        }
        .ftr-dot { animation: ftr-pulse 2s ease-in-out infinite; }

        @media (max-width: 639px) {
          .ftr-grid         { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .ftr-social-wrap  { display: none !important; }
          .ftr-trust        { display: none !important; }
          .ftr-bottom-bar   { flex-direction: column !important; align-items: center !important; text-align: center !important; }
          .ftr-center-links { display: none !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .ftr-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 2.5rem !important; }
        }
      `}</style>

      {/* ════════════════════════════════
          1. TICKER STRIP
      ════════════════════════════════ */}
      <div
        onMouseEnter={() => setTickerHover(true)}
        onMouseLeave={() => setTickerHover(false)}
        style={{
          height: '40px',
          padding: '0.6rem 0',
          background: 'rgba(4,10,28,1)',
          borderTop:    '1px solid rgba(30,111,255,0.15)',
          borderBottom: '1px solid rgba(30,111,255,0.08)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left fade mask */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(90deg, rgba(4,10,28,1), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        {/* Right fade mask */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(270deg, rgba(4,10,28,1), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        <div className={`ticker-track${tickerHover ? ' ticker-slow' : ''}`}>
          {[...Array(2)].map((_, gi) => (
            <div key={gi} style={{ display: 'inline-flex', gap: '3rem', paddingRight: '3rem' }}>
              {tickerItems.map(item => (
                <span key={item} style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontWeight: 700, fontSize: '11px',
                  color: 'rgba(30,111,255,0.45)',
                  letterSpacing: '4px', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
                }}>
                  {item}
                  <span style={{
                    color: '#1e6fff', fontSize: '5px',
                    display: 'inline-block',
                    boxShadow: '0 0 6px rgba(30,111,255,0.6)',
                  }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════
          2. MAIN FOOTER BODY
      ════════════════════════════════ */}
      <div style={{ background: 'rgba(3,7,20,1)', position: 'relative', overflow: 'hidden' }}>

        {/* Background canvas */}
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          zIndex: 0, pointerEvents: 'none',
        }} />

        {/* 4-column grid */}
        <div
          ref={gridRef}
          className="ftr-grid"
          style={{
            position: 'relative', zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '2.5fr 1fr 1fr 1.8fr',
            gap: '4rem',
            padding: '3.5rem 5vw 0',
          }}
        >

          {/* ─────────────────────────
              COL 1 — BRAND
          ───────────────────────── */}
          <motion.div {...col(0)}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <img
                src={SFLogo}
                alt="SF Digital Solutions"
                style={{
                  width: '52px',
                  height: '52px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 10px rgba(30,111,255,0.5))',
                }}
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
                  color: 'rgba(30,111,255,0.5)',
                  letterSpacing: '4px',
                  marginTop: '2px',
                }}>SRI LANKA</div>
              </div>
            </Link>

            {/* Status indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: 0, marginBottom: '0.75rem' }}>
              <div className="ftr-dot" style={{
                width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16,185,129,0.7)',
              }} />
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '10px', fontWeight: 700,
                color: 'rgba(16,185,129,0.7)',
                letterSpacing: '3px', textTransform: 'uppercase',
              }}>AVAILABLE FOR PROJECTS</span>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 300, fontSize: '13px',
              color: 'rgba(107,159,212,0.45)',
              lineHeight: 1.75, marginBottom: '1.25rem',
            }}>
              Empowering Sri Lankan businesses through digital innovation.
            </p>

            {/* Contact rows */}
            <ContactRow icon="◉" label="Phone"    value="070 1988 102"               href="tel:+94701988102" />
            <ContactRow icon="✉" label="Email"    value="sfdigitalsolution1@gmail.com"  href="mailto:sfdigitalsolution1@gmail.com" />
            <ContactRow icon="◎" label="Location" value="Sri Lanka" />

            {/* Social row */}
            <div className="ftr-social-wrap" style={{ marginTop: '1.25rem' }}>
              <div style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '9px', fontWeight: 700,
                color: 'rgba(30,111,255,0.4)',
                letterSpacing: '3px', textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>FOLLOW US</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <SocialBox abbr="FB" />
                <SocialBox abbr="IG" />
                <SocialBox abbr="TK" />
              </div>
            </div>
          </motion.div>

          {/* ─────────────────────────
              COL 2 — NAVIGATION
          ───────────────────────── */}
          <motion.div {...col(1)}>
            <ColHeader text="NAVIGATION" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {navLinks.map(link => (
                <FooterLink key={link.path} to={link.path}>{link.label}</FooterLink>
              ))}
            </div>
          </motion.div>

          {/* ─────────────────────────
              COL 3 — SERVICES
          ───────────────────────── */}
          <motion.div {...col(2)}>
            <ColHeader text="SERVICES" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {serviceLinks.map(s => (
                <FooterLink key={s} to="/services">{s}</FooterLink>
              ))}
            </div>
          </motion.div>

          {/* ─────────────────────────
              COL 4 — GET STARTED
          ───────────────────────── */}
          <motion.div {...col(3)}>
            <ColHeader text="GET STARTED" />

            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 300, fontSize: '13px',
              color: 'rgba(107,159,212,0.45)',
              lineHeight: 1.75, marginBottom: '1.5rem',
            }}>
              Let's transform your business together.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <div>
                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '22px', fontWeight: 700,
                  color: '#4d9fff',
                  textShadow: '0 0 15px rgba(77,159,255,0.4)',
                }}>50+</div>
                <span style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '10px', fontWeight: 600,
                  color: 'rgba(107,159,212,0.4)',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  display: 'block', marginTop: '2px',
                }}>Projects</span>
              </div>
              <div style={{
                width: '1px', height: '40px', flexShrink: 0,
                background: 'rgba(30,111,255,0.15)',
              }} />
              <div>
                <div style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '22px', fontWeight: 700,
                  color: '#4d9fff',
                  textShadow: '0 0 15px rgba(77,159,255,0.4)',
                }}>100%</div>
                <span style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '10px', fontWeight: 600,
                  color: 'rgba(107,159,212,0.4)',
                  letterSpacing: '2px', textTransform: 'uppercase',
                  display: 'block', marginTop: '2px',
                }}>Satisfaction</span>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="btn-primary-glass"
              style={{ display: 'inline-flex', width: 'auto', alignSelf: 'flex-start', fontSize: '11px', padding: '12px 28px', minHeight: '44px', marginBottom: '1rem' }}
            >
              START YOUR PROJECT →
            </Link>

            {/* Trust badges */}
            <div className="ftr-trust" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              {['✓ FREE CONSULT', '✓ FAST DELIVERY', '✓ LOCAL EXPERT'].map(badge => (
                <span key={badge} style={{
                  padding: '3px 8px',
                  background: 'rgba(30,111,255,0.06)',
                  border: '1px solid rgba(30,111,255,0.15)',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '9px', fontWeight: 700,
                  color: 'rgba(77,159,255,0.45)',
                  letterSpacing: '2px',
                }}>{badge}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Grid → bottom-bar separator */}
        <div style={{
          position: 'relative', zIndex: 1,
          margin: '2.5rem 5vw 0',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(30,111,255,0.2) 30%, rgba(0,200,255,0.15) 60%, transparent 100%)',
          boxShadow: '0 0 10px rgba(30,111,255,0.08)',
        }} />
      </div>

      {/* ════════════════════════════════
          3. BOTTOM BAR
      ════════════════════════════════ */}
      <div
        className="ftr-bottom-bar"
        style={{
          padding: '1.25rem 5vw 1.5rem',
          background: 'rgba(2,5,16,1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Left */}
        <p style={{
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 600, fontSize: '11px',
          color: 'rgba(107,159,212,0.2)',
          letterSpacing: '1px',
        }}>
          © {year} SF Digital Solutions. All rights reserved.
        </p>

        {/* Center links */}
        <div className="ftr-center-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {['Privacy', 'Terms', 'Sitemap'].map((item, i, arr) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '10px', fontWeight: 600,
                  color: 'rgba(30,111,255,0.25)',
                  letterSpacing: '1px', cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { e.target.style.color = 'rgba(77,159,255,0.6)' }}
                onMouseLeave={e => { e.target.style.color = 'rgba(30,111,255,0.25)' }}
              >{item}</span>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(30,111,255,0.15)', fontSize: '9px' }}>·</span>
              )}
            </span>
          ))}
        </div>

        {/* Right */}
        <p
          style={{
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: 600, fontSize: '11px',
            color: 'rgba(30,111,255,0.25)',
            letterSpacing: '1px',
            cursor: 'default',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(77,159,255,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(30,111,255,0.25)' }}
        >
          Crafted with precision in Sri Lanka 🇱🇰
        </p>
      </div>
    </footer>
  )
}
