import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Portfolio from '../components/Portfolio'

function PageHero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let spotAngle = 0

    const resize = () => {
      canvas.width  = canvas.parentElement?.offsetWidth  || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 500
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Film strip lines (3, drift rightward at 15°) ──
    const tanA = Math.tan(15 * Math.PI / 180)
    const filmLines = [0, 0.33, 0.66].map(frac => ({
      offset: frac * canvas.width,
    }))

    // ── Ghost project cards ──
    const ghostCards = Array.from({ length: 6 }, (_, i) => ({
      x: canvas.width * (0.55 + Math.random() * 0.35),
      y: (canvas.height / 6) * i,
      w: 80,
      h: 50,
      speed: 0.2,
      hasLines: Math.random() > 0.4,
    }))

    // ── Corner circuit helpers ──
    const drawCircuitTR = () => {
      const w = canvas.width
      const junctions = [[w - 200, 20], [w - 200, 80], [w - 120, 80]]
      ctx.strokeStyle = 'rgba(30,111,255,0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w, 20)
      ctx.lineTo(w - 200, 20)
      ctx.lineTo(w - 200, 80)
      ctx.lineTo(w - 120, 80)
      ctx.lineTo(w - 120, 110)
      ctx.stroke()
      ctx.fillStyle = 'rgba(77,159,255,0.3)'
      junctions.forEach(([jx, jy]) => ctx.fillRect(jx - 2, jy - 2, 4, 4))
    }

    const drawCircuitBL = () => {
      const h = canvas.height
      const junctions = [[200, h - 20], [200, h - 80], [120, h - 80]]
      ctx.strokeStyle = 'rgba(30,111,255,0.12)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, h - 20)
      ctx.lineTo(200, h - 20)
      ctx.lineTo(200, h - 80)
      ctx.lineTo(120, h - 80)
      ctx.lineTo(120, h - 110)
      ctx.stroke()
      ctx.fillStyle = 'rgba(77,159,255,0.3)'
      junctions.forEach(([jx, jy]) => ctx.fillRect(jx - 2, jy - 2, 4, 4))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Film strip diagonal lines
      filmLines.forEach(line => {
        line.offset += 0.3
        const maxOff = canvas.width + canvas.height * tanA
        if (line.offset > maxOff) line.offset -= maxOff
        ctx.beginPath()
        ctx.moveTo(line.offset, 0)
        ctx.lineTo(line.offset - canvas.height * tanA, canvas.height)
        ctx.strokeStyle = 'rgba(30,111,255,0.06)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Ghost cards floating up
      ghostCards.forEach(card => {
        card.y -= card.speed
        if (card.y + card.h < 0) {
          card.y = canvas.height + 20
          card.x = canvas.width * (0.55 + Math.random() * 0.35)
        }
        ctx.strokeStyle = 'rgba(30,111,255,0.06)'
        ctx.lineWidth = 1
        ctx.strokeRect(card.x, card.y, card.w, card.h)
        if (card.hasLines) {
          ctx.beginPath()
          ctx.moveTo(card.x + 8, card.y + 15)
          ctx.lineTo(card.x + card.w - 8, card.y + 15)
          ctx.strokeStyle = 'rgba(30,111,255,0.04)'
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(card.x + 8, card.y + 28)
          ctx.lineTo(card.x + card.w - 18, card.y + 28)
          ctx.strokeStyle = 'rgba(30,111,255,0.03)'
          ctx.stroke()
        }
      })

      // Spotlight — slow elliptical drift
      spotAngle += 0.005
      const sCx = canvas.width  * 0.8 + Math.cos(spotAngle) * canvas.width  * 0.08
      const sCy = canvas.height * 0.4 + Math.sin(spotAngle) * canvas.height * 0.06
      const spotGrad = ctx.createRadialGradient(sCx, sCy, 0, sCx, sCy, 200)
      spotGrad.addColorStop(0, 'rgba(30,111,255,0.08)')
      spotGrad.addColorStop(1, 'rgba(30,111,255,0)')
      ctx.fillStyle = spotGrad
      ctx.beginPath()
      ctx.arc(sCx, sCy, 200, 0, Math.PI * 2)
      ctx.fill()

      // Static corner circuits
      drawCircuitTR()
      drawCircuitBL()

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const line1 = 'WORK THAT'
  const line2 = 'SPEAKS FOR ITSELF'
  const portfolioChars = 'PORTFOLIO'.split('')

  const stats = [
    { num: '6+',   label: 'Projects Delivered'  },
    { num: '100%', label: 'Client Satisfaction'  },
    { num: '3',    label: 'Project Types'        },
  ]

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '400px',
      paddingTop: '130px',
      paddingBottom: '4rem',
      paddingLeft: '5vw',
      paddingRight: '5vw',
      borderBottom: '1px solid rgba(30,111,255,0.1)',
      background: 'linear-gradient(135deg, rgba(7,16,32,1) 0%, rgba(8,20,50,0.95) 40%, rgba(12,28,64,0.8) 70%, rgba(7,16,32,1) 100%)',
    }}>
      {/* Injected keyframes + responsive hide */}
      <style>{`
        @keyframes outline-shimmer {
          0%,100% { -webkit-text-stroke-color: rgba(77,159,255,0.8); }
          50%      { -webkit-text-stroke-color: rgba(0,200,255,1);    }
        }
        .pfp-shimmer { animation: outline-shimmer 3s ease-in-out infinite; }
        @media (max-width: 899px) { .pfp-stats { display: none !important; } }
      `}</style>

      {/* ── Canvas ── */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Text content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span className="section-number">.01</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)', transformOrigin: 'left' }}
          />
          <div style={{ display: 'flex' }}>
            {portfolioChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
                className="section-label"
                style={{ display: 'inline-block' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Headline with camera-shake keyframe */}
        <motion.h1
          animate={{ x: [0, -2, 2, -1, 0] }}
          transition={{ delay: 1.8, duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '2px',
            marginBottom: '2rem',
          }}
        >
          {/* Line 1 — WORK THAT */}
          <div style={{ display: 'block' }}>
            {line1.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, skewX: -5 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: '#d6eaff' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Line 2 — SPEAKS FOR ITSELF (outline + shimmer) */}
          <div style={{ display: 'block' }}>
            {line2.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 80, skewX: -5 }}
                animate={{ opacity: 1, y: 0, skewX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={char !== ' ' ? 'pfp-shimmer' : undefined}
                style={{
                  display: 'inline-block',
                  WebkitTextStroke: '1.5px rgba(77,159,255,0.8)',
                  color: 'transparent',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Description with highlighted words + left border */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(107,159,212,0.7)',
            maxWidth: '480px',
            lineHeight: 1.75,
            borderLeft: '2px solid rgba(30,111,255,0.4)',
            paddingLeft: '1rem',
          }}
        >
          A curated selection of our digital projects delivered for{' '}
          <span style={{ color: '#4d9fff' }}>Sri Lankan businesses</span>
          {' '}— from management systems to brand identities.
        </motion.p>
      </div>

      {/* ── Floating stats row ── */}
      <div
        className="pfp-stats"
        style={{
          position: 'absolute',
          right: '5vw',
          bottom: '3rem',
          display: 'flex',
          gap: '1rem',
          zIndex: 1,
        }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.12, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                padding: '10px 20px',
                background: 'rgba(13,33,71,0.85)',
                border: '1px solid rgba(30,111,255,0.25)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#4d9fff',
                textShadow: '0 0 15px rgba(77,159,255,0.5)',
              }}>
                {stat.num}
              </span>
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(107,159,212,0.7)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Scan line (runs once) ── */}
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: '400%' }}
        transition={{ duration: 2, delay: 0.5, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.15), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom glow line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.7) 40%, rgba(0,200,255,0.5) 60%, transparent)',
          boxShadow: '0 0 25px rgba(30,111,255,0.4)',
          transformOrigin: 'center',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const testimonials = [
    { quote: "SF Digital transformed our restaurant operations. The RMS they built saves us 3 hours every day in admin work.", name: 'Kamal Perera', role: 'Owner, Spice Garden Restaurant' },
    { quote: "Our website traffic tripled in 4 months after their SEO campaign. Best investment we've made for our hotel.", name: 'Dilshan Jayawardena', role: 'Manager, LuxeStay Hotels' },
    { quote: "The social media campaign launched our brand perfectly. We hit 10,000 followers in the first month.", name: 'Nimasha Fernando', role: 'Founder, FreshBite Delivery' },
  ]

  return (
    <section ref={ref} style={{ padding: '4rem 0', borderBottom: '1px solid rgba(30,111,255,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.04</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
          <span className="section-label">Client Testimonials</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px', marginBottom: '3rem' }}
        >
          WHAT CLIENTS SAY
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(30,111,255,0.06)' }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              style={{
                background: 'rgba(8,20,48,0.9)', padding: '2.5rem 2rem',
                borderTop: '2px solid rgba(30,111,255,0.3)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#4d9fff'; e.currentTarget.style.boxShadow = '0 0 24px rgba(30,111,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'rgba(30,111,255,0.3)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '3rem', color: 'rgba(30,111,255,0.15)', lineHeight: 1, marginBottom: '1.5rem' }}>"</div>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(107,159,212,0.7)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{t.quote}</p>
              <div style={{ width: '24px', height: '1px', background: 'linear-gradient(90deg, #1e6fff, transparent)', marginBottom: '1rem', boxShadow: '0 0 6px rgba(30,111,255,0.4)' }} />
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '11px', fontWeight: 700, color: '#d6eaff', letterSpacing: '1px', marginBottom: '4px' }}>{t.name}</div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 500, fontSize: '10px', color: 'rgba(107,159,212,0.4)', letterSpacing: '1px' }}>{t.role}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }} style={{ marginTop: '3rem' }}>
          <Link to="/contact" className="btn-primary-glass">Start Your Project</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function PortfolioPage() {
  return (
    <>
      <PageHero />
      <Portfolio />
      <TestimonialsSection />
    </>
  )
}
