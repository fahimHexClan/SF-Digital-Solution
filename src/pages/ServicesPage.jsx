import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Services from '../components/Services'

function PageHero() {
  const canvasRef = useRef(null)
  const [typewriterText, setTypewriterText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const labelText = '.01 — OUR SERVICES'

  // Typewriter effect
  useEffect(() => {
    let i = 0
    const tw = setInterval(() => {
      if (i <= labelText.length) {
        setTypewriterText(labelText.slice(0, i++))
      } else {
        clearInterval(tw)
      }
    }, 40)
    const ct = setTimeout(() => setShowCursor(false), 4000)
    return () => { clearInterval(tw); clearTimeout(ct) }
  }, [])

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 520
    }
    resize()
    window.addEventListener('resize', resize)

    const hexR = 40

    // Data streams — yi is fraction of canvas height
    const streams = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * (800) - 200,
      width: 120 + Math.random() * 80,
      speed: 2 + Math.random() * 3,
      yi: (i + 1) / 7,
    }))

    // Particles — normalized 0-1 coords
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
      size: 2 + Math.random() * 2,
    }))

    const drawHex = (cx, cy, r, opacity) => {
      ctx.beginPath()
      for (let a = 0; a < 6; a++) {
        const angle = (Math.PI / 3) * a - Math.PI / 6
        if (a === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
        else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
      }
      ctx.closePath()
      ctx.strokeStyle = `rgba(30,111,255,${opacity.toFixed(3)})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      // ── Hexagon grid ──
      const hexW = hexR * Math.sqrt(3)
      const cols = Math.ceil(canvas.width / hexW) + 2
      const rows = Math.ceil(canvas.height / (hexR * 1.5)) + 2
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hexW + (row % 2 !== 0 ? hexW / 2 : 0)
          const cy = row * hexR * 1.5
          const hash = Math.abs(row * 73 + col * 37) % 100
          const isBright = hash < 10
          const opacity = isBright
            ? 0.175 + 0.075 * Math.sin(t * 0.08 + (row + col) * 0.5)
            : 0.065 + 0.035 * Math.sin(t * 0.015 + (row + col) * 0.3)
          drawHex(cx, cy, hexR - 2, opacity)
        }
      }

      // ── Data streams ──
      streams.forEach(s => {
        s.x += s.speed
        if (s.x > canvas.width + s.width) s.x = -s.width
        const y = s.yi * canvas.height
        const grad = ctx.createLinearGradient(s.x, y, s.x + s.width, y)
        grad.addColorStop(0, 'rgba(77,159,255,0)')
        grad.addColorStop(0.5, 'rgba(77,159,255,0.4)')
        grad.addColorStop(1, 'rgba(77,159,255,0)')
        ctx.fillStyle = grad
        ctx.fillRect(s.x, y, s.width, 1)
      })

      // ── Particle drift ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0
      }

      // ── Particle connections ──
      for (let i = 0; i < particles.length; i++) {
        const ax1 = particles[i].x * canvas.width
        const ay1 = particles[i].y * canvas.height
        for (let j = i + 1; j < particles.length; j++) {
          const ax2 = particles[j].x * canvas.width
          const ay2 = particles[j].y * canvas.height
          const dx = ax1 - ax2, dy = ay1 - ay2
          if (dx * dx + dy * dy < 10000) {
            ctx.beginPath()
            ctx.moveTo(ax1, ay1)
            ctx.lineTo(ax2, ay2)
            ctx.strokeStyle = 'rgba(30,111,255,0.08)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
        ctx.beginPath()
        ctx.arc(ax1, ay1, particles[i].size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(30,111,255,0.5)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const line1 = 'DIGITAL SERVICES'
  const line2 = 'BUILT FOR GROWTH'
  const badges = [
    { text: 'WEB DESIGN',     right: '8%',  top: '25%' },
    { text: 'SEO GROWTH',     right: '18%', top: '50%' },
    { text: 'SOCIAL MEDIA',   right: '6%',  top: '72%' },
    { text: 'CUSTOM SYSTEMS', right: '20%', top: '85%' },
  ]

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '420px',
      paddingTop: '130px',
      paddingBottom: '4rem',
      paddingLeft: '5vw',
      paddingRight: '5vw',
      borderBottom: '1px solid rgba(30,111,255,0.1)',
      background: 'linear-gradient(135deg, rgba(7,16,32,1) 0%, rgba(10,24,54,0.9) 50%, rgba(7,16,32,1) 100%)',
    }}>
      {/* Mobile hide rule for badges */}
      <style>{`.sfds-badge{display:block}@media(max-width:767px){.sfds-badge{display:none!important}}`}</style>

      {/* ── Canvas ── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Text content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span className="section-number">.01</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              width: '40px',
              height: '1px',
              background: 'rgba(30,111,255,0.3)',
              transformOrigin: 'left',
            }}
          />
          <span className="section-label">{typewriterText}</span>
        </motion.div>

        {/* Headline with per-character animation + glitch */}
        <motion.h1
          animate={{ x: [0, 3, -3, 2, 0] }}
          transition={{ delay: 1.6, duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '2px',
            marginBottom: '2rem',
            perspective: '800px',
          }}
        >
          {/* Line 1 — DIGITAL SERVICES */}
          <div style={{ display: 'block' }}>
            {line1.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: '#d6eaff', transformOrigin: 'bottom' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Line 2 — BUILT FOR GROWTH (outline) */}
          <div style={{ display: 'block' }}>
            {line2.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  WebkitTextStroke: '1.5px rgba(77,159,255,0.8)',
                  color: 'transparent',
                  textShadow: '0 0 30px rgba(30,111,255,0.3)',
                  transformOrigin: 'bottom',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Description with blinking cursor */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(107,159,212,0.85)',
            maxWidth: '500px',
            lineHeight: 1.75,
          }}
        >
          From custom software to social media campaigns — comprehensive digital solutions that move the needle for Sri Lankan businesses.
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              style={{ marginLeft: '2px', color: 'rgba(77,159,255,0.8)' }}
            >▋</motion.span>
          )}
        </motion.p>
      </div>

      {/* ── Floating tech badges ── */}
      {badges.map((badge, i) => (
        <motion.div
          key={badge.text}
          className="sfds-badge"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
          style={{ position: 'absolute', right: badge.right, top: badge.top, zIndex: 1 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              padding: '6px 14px',
              background: 'rgba(13,33,71,0.8)',
              border: '1px solid rgba(30,111,255,0.3)',
              borderRadius: '2px',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(77,159,255,0.8)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              boxShadow: '0 0 12px rgba(30,111,255,0.15)',
              whiteSpace: 'nowrap',
            }}
          >
            {badge.text}
          </motion.div>
        </motion.div>
      ))}

      {/* ── Bottom glow line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(30,111,255,0.6) 30%, rgba(0,200,255,0.4) 60%, transparent 100%)',
          boxShadow: '0 0 20px rgba(30,111,255,0.3)',
          transformOrigin: 'left',
          zIndex: 2,
        }}
      />
    </section>
  )
}

function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We dive deep into your business, goals, and challenges to understand what digital solutions will have the highest impact.' },
    { num: '02', title: 'Strategy', desc: 'A custom digital roadmap is crafted — from tech stack to campaign channels — designed specifically for your business.' },
    { num: '03', title: 'Execution', desc: 'Our team builds, designs, and launches with precision, keeping you in the loop at every milestone.' },
    { num: '04', title: 'Growth', desc: 'Post-launch, we monitor, optimize, and iterate to ensure your digital presence keeps growing.' },
  ]

  return (
    <section ref={ref} style={{ padding: '4rem 0', borderBottom: '1px solid rgba(30,111,255,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.03</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
          <span className="section-label">How We Work</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px', marginBottom: '3rem' }}
        >
          OUR PROCESS
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(30,111,255,0.06)' }}>
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ background: 'rgba(8,20,48,0.9)', padding: '2.5rem 2rem', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(12,28,60,0.95)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(30,111,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(8,20,48,0.9)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '4rem', fontWeight: 900, color: 'rgba(30,111,255,0.07)', lineHeight: 1, marginBottom: '1rem', letterSpacing: '2px' }}>{step.num}</div>
              <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '15px', fontWeight: 700, letterSpacing: '1px', color: '#d6eaff', marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(107,159,212,0.6)', lineHeight: 1.8 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} style={{ padding: '4rem 0', background: 'rgba(7,16,32,0.95)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', padding: '3rem 2.5rem',
            background: 'rgba(30,111,255,0.04)',
            border: '1px solid rgba(30,111,255,0.15)',
            borderTop: '2px solid #1e6fff',
            boxShadow: '0 0 40px rgba(30,111,255,0.08)',
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '28px', fontWeight: 700, letterSpacing: '2px', color: '#d6eaff', marginBottom: '0.5rem' }}>
              READY TO GET STARTED?
            </h2>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(107,159,212,0.6)' }}>
              Book a free 30-minute consultation — no commitments.
            </p>
          </div>
          <Link to="/contact" className="btn-primary-glass">Book Free Consultation</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHero />
      <Services />
      <ProcessSection />
      <CTABanner />
    </>
  )
}
