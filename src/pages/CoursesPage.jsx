import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Courses from '../components/Courses'

function PageHero() {
  const canvasRef = useRef(null)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const ct = setTimeout(() => setShowCursor(false), 4500)
    return () => clearTimeout(ct)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width  = canvas.parentElement?.offsetWidth  || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || 540
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Knowledge symbols ──
    const symbolPool = ['{ }', '</>', '#', '@', '✦', '◈', '⬡', '01', '<>']
    const symbols = Array.from({ length: 20 }, (_, i) => ({
      symbol:   symbolPool[i % symbolPool.length],
      x:        Math.random() * canvas.width,
      y:        Math.random() * canvas.height,
      speed:    0.3 + Math.random() * 0.3,
      fontSize: 12 + Math.floor(Math.random() * 9),
    }))

    // ── Progress bar streams ──
    const trackW = () => canvas.width * 0.42
    const bars = Array.from({ length: 5 }, (_, i) => ({
      y:        (canvas.height / 6) * (i + 1),
      current:  Math.random() * trackW() * 0.5,
      target:   trackW() * (0.4 + Math.random() * 0.5),
      speed:    0.3 + Math.random() * 0.5,
    }))

    // ── Neural network dots (bias toward right) ──
    const dots = Array.from({ length: 30 }, () => {
      const rx = Math.random() > 0.35 ? 0.5 + Math.random() * 0.5 : Math.random()
      return {
        x: rx * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }
    })

    // ── Book / screen outlines ──
    const books = [
      { w: 180, h: 120, ox:  0, oy:  0, phase: 0 },
      { w: 160, h: 105, ox: 15, oy: 12, phase: Math.PI * 0.7 },
      { w: 140, h:  90, ox: 28, oy: 22, phase: Math.PI * 1.4 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      // Symbols drift upward
      symbols.forEach(s => {
        s.y -= s.speed
        if (s.y < -30) {
          s.y = canvas.height + 10
          s.x = Math.random() * canvas.width
          s.symbol = symbolPool[Math.floor(Math.random() * symbolPool.length)]
        }
        ctx.font = `${s.fontSize}px monospace`
        ctx.fillStyle = 'rgba(30,111,255,0.12)'
        ctx.fillText(s.symbol, s.x, s.y)
      })

      // Progress bars
      const startX = canvas.width * 0.05
      const tw = trackW()
      bars.forEach(bar => {
        // Track
        ctx.fillStyle = 'rgba(30,111,255,0.05)'
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(startX, bar.y, tw, 3, 2)
        else ctx.rect(startX, bar.y, tw, 3)
        ctx.fill()
        // Animated fill
        bar.current += bar.speed
        if (bar.current >= bar.target) {
          bar.current = 0
          bar.target = tw * (0.4 + Math.random() * 0.5)
        }
        ctx.fillStyle = 'rgba(30,111,255,0.25)'
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(startX, bar.y, Math.min(bar.current, tw), 3, 2)
        else ctx.rect(startX, bar.y, Math.min(bar.current, tw), 3)
        ctx.fill()
      })

      // Neural dots — update positions
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy
        if (d.x < 0 || d.x > canvas.width)  { d.vx *= -1; d.x = Math.max(0, Math.min(canvas.width,  d.x)) }
        if (d.y < 0 || d.y > canvas.height) { d.vy *= -1; d.y = Math.max(0, Math.min(canvas.height, d.y)) }
      })
      // Connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          if (dx * dx + dy * dy < 6400) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = 'rgba(30,111,255,0.06)'
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
        ctx.beginPath()
        ctx.arc(dots[i].x, dots[i].y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(30,111,255,0.2)'
        ctx.fill()
      }

      // Book / screen outlines
      const bcx = canvas.width * 0.82
      const bcy = canvas.height * 0.5
      books.forEach(book => {
        const angle = Math.sin(t * 0.016 + book.phase) * (2 * Math.PI / 180)
        const cx = bcx + book.ox
        const cy = bcy + book.oy
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angle)
        ctx.strokeStyle = 'rgba(30,111,255,0.05)'
        ctx.lineWidth = 1
        ctx.strokeRect(-book.w / 2, -book.h / 2, book.w, book.h)
        // Inner text lines
        for (let l = 0; l < 3; l++) {
          const ly = -book.h / 2 + 20 + l * 18
          ctx.beginPath()
          ctx.moveTo(-book.w / 2 + 10, ly)
          ctx.lineTo(-book.w / 2 + 10 + book.w * 0.6, ly)
          ctx.strokeStyle = 'rgba(30,111,255,0.04)'
          ctx.stroke()
        }
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const line1Words = ['LEVEL', 'UP', 'YOUR']
  const line2Words = ['DIGITAL', 'SKILLS']

  const pills = [
    { text: 'DIGITAL MARKETING', top: '22%', color: '#1e6fff' },
    { text: 'WEB DEVELOPMENT',   top: '40%', color: '#00c8ff' },
    { text: 'SOCIAL MEDIA',      top: '58%', color: '#6366f1' },
    { text: 'PERSONAL BRANDING', top: '76%', color: '#4d9fff' },
  ]

  const badges = [
    '★ CERTIFIED COURSES',
    '⚡ HANDS-ON TRAINING',
    '🎯 SRI LANKA FOCUSED',
  ]

  return (
    <section style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '420px',
      paddingTop: '130px',
      paddingBottom: '5rem',
      paddingLeft: '5vw',
      paddingRight: '5vw',
      borderBottom: '1px solid rgba(30,111,255,0.1)',
      background: 'linear-gradient(135deg, rgba(7,16,32,1) 0%, rgba(9,22,52,0.95) 35%, rgba(11,26,60,0.85) 65%, rgba(7,16,32,1) 100%)',
    }}>
      <style>{`
        @media (max-width: 899px) { .crs-pills   { display: none !important; } }
        @media (max-width: 767px) { .crs-badges  { display: none !important; } }
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span className="section-number">.02</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)', transformOrigin: 'left' }}
          />
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            COURSES & CLASSES
          </motion.span>
        </motion.div>

        {/* Headline — word-by-word reveal + electric flicker */}
        <motion.h1
          animate={{ opacity: [1, 0.85, 1, 0.9, 1] }}
          transition={{ delay: 1.5, duration: 0.15, repeat: 3, repeatDelay: 4 }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '2px',
            marginBottom: '2rem',
          }}
        >
          {/* Line 1 */}
          <div style={{ display: 'block' }}>
            {line1Words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: '#d6eaff', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Line 2 — outline + glow */}
          <div style={{ display: 'block' }}>
            {line2Words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'inline-block',
                  marginRight: '0.3em',
                  WebkitTextStroke: '1.5px rgba(77,159,255,0.85)',
                  color: 'transparent',
                  textShadow: '0 0 40px rgba(30,111,255,0.25)',
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(107,159,212,0.7)',
            maxWidth: '500px',
            lineHeight: 1.75,
          }}
        >
          Practical, hands-on digital marketing and web development courses designed for{' '}
          <span style={{ color: '#4d9fff', fontWeight: 500 }}>Sri Lankan entrepreneurs</span>
          {' '}and professionals.
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.55, repeat: 3 }}
              style={{ marginLeft: '2px', color: 'rgba(77,159,255,0.8)' }}
            >▋</motion.span>
          )}
        </motion.p>
      </div>

      {/* ── Course category pills (right side) ── */}
      <div className="crs-pills" style={{ position: 'absolute', right: '5vw', top: 0, bottom: 0, zIndex: 2 }}>
        {pills.map((pill, i) => (
          <motion.div
            key={pill.text}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.14, duration: 0.5 }}
            style={{ position: 'absolute', top: pill.top, right: 0 }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                background: 'rgba(10,26,58,0.9)',
                border: '1px solid rgba(30,111,255,0.28)',
                backdropFilter: 'blur(12px)',
                borderRadius: '3px',
                whiteSpace: 'nowrap',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: pill.color,
                  boxShadow: `0 0 8px ${pill.color}`,
                  flexShrink: 0,
                }}
              />
              <span style={{
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(107,159,212,0.85)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}>
                {pill.text}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Achievement badges (bottom-left) ── */}
      <div
        className="crs-badges"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '5vw',
          display: 'flex',
          gap: '0.6rem',
          flexWrap: 'wrap',
          zIndex: 2,
        }}
      >
        {badges.map((badge, i) => (
          <motion.span
            key={badge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}
            style={{
              display: 'inline-flex',
              gap: '6px',
              padding: '5px 12px',
              background: 'rgba(30,111,255,0.08)',
              border: '1px solid rgba(30,111,255,0.2)',
              borderRadius: '2px',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(77,159,255,0.7)',
              letterSpacing: '2px',
            }}
          >
            {badge}
          </motion.span>
        ))}
      </div>

      {/* ── Progress indicator (4 segments, just above glow line) ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '1px',
          left: 0,
          right: 0,
          height: '2px',
          transformOrigin: 'left',
          zIndex: 3,
          display: 'flex',
          gap: '2px',
          pointerEvents: 'none',
        }}
      >
        {[
          { w: '25%', d: 0    },
          { w: '20%', d: 0.35 },
          { w: '35%', d: 0.7  },
          { w: '15%', d: 1.05 },
        ].map((seg, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: seg.d, ease: 'easeInOut' }}
            style={{ width: seg.w, height: '100%', background: 'rgba(30,111,255,0.3)' }}
          />
        ))}
      </motion.div>

      {/* ── Bottom glow line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.7 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(30,111,255,0.6) 25%, rgba(0,200,255,0.5) 50%, rgba(99,102,241,0.4) 75%, transparent)',
          boxShadow: '0 0 20px rgba(30,111,255,0.35)',
          transformOrigin: 'left',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const benefits = [
    { num: '01', title: 'Hands-On Learning', desc: 'Real projects, real tools, real results. No fluff — just practical skills you can apply immediately.' },
    { num: '02', title: 'Local Context', desc: 'Curriculum built for the Sri Lankan market — platforms, payment systems, and business culture included.' },
    { num: '03', title: 'Expert Instructors', desc: 'Learn from professionals who have successfully run campaigns and built systems for local businesses.' },
    { num: '04', title: 'Certificate Awarded', desc: 'Receive an SF Digital Solutions certificate recognized by Sri Lankan businesses upon completion.' },
    { num: '05', title: 'Small Batch Classes', desc: 'Maximum 15 students per batch to ensure personalized attention and quality learning.' },
    { num: '06', title: 'Lifetime Community', desc: 'Join our alumni network for ongoing support, job opportunities, and collaboration.' },
  ]

  return (
    <section ref={ref} style={{ padding: '4rem 0', borderBottom: '1px solid rgba(30,111,255,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.05</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
          <span className="section-label">Why Learn With Us</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px', marginBottom: '3rem' }}
        >
          THE SF DIGITAL ADVANTAGE
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px', background: 'rgba(30,111,255,0.06)' }}>
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              style={{ background: 'rgba(8,20,48,0.9)', padding: '2rem', transition: 'all 0.3s ease', borderTop: '2px solid transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#4d9fff'; e.currentTarget.style.background = 'rgba(12,28,60,0.95)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(30,111,255,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.background = 'rgba(8,20,48,0.9)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', color: '#1e6fff', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>{b.num}</div>
              <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '1px', color: '#d6eaff', marginBottom: '0.5rem' }}>{b.title}</h3>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(107,159,212,0.6)', lineHeight: 1.8 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const faqs = [
    { q: 'Are the courses online or in-person?', a: 'We offer both in-person sessions in Colombo and online live classes via Zoom, with recordings available for all enrolled students.' },
    { q: 'What equipment do I need?', a: 'Just a laptop and stable internet connection. All software used in the courses is either free or we provide access during the course duration.' },
    { q: 'Is there a payment plan available?', a: 'Yes! We offer a 2-installment payment plan for all courses. Contact us to arrange your preferred payment schedule.' },
    { q: "Can I get a refund if I'm not satisfied?", a: "We offer a 100% satisfaction guarantee. If you're not happy after the first 2 sessions, we'll issue a full refund." },
    { q: 'Do I need prior experience?', a: 'Most of our courses are beginner-friendly. Check the level listed on each course card — we have options for all experience levels.' },
  ]

  return (
    <section ref={ref} style={{ padding: '4rem 0' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.06</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
          <span className="section-label">FAQ</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px', marginBottom: '3rem' }}
        >
          COMMON QUESTIONS
        </motion.h2>

        <div style={{ maxWidth: '800px' }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ borderBottom: '1px solid rgba(30,111,255,0.1)', padding: '1.75rem 0' }}
            >
              <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '1px', color: '#d6eaff', marginBottom: '0.75rem' }}>{faq.q}</h3>
              <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(107,159,212,0.65)', lineHeight: 1.8 }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} style={{ marginTop: '3rem' }}>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(107,159,212,0.4)', marginBottom: '1.5rem' }}>Still have questions? We're happy to help.</p>
          <Link to="/contact" className="btn-glass">Contact Us</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function CoursesPage() {
  return (
    <>
      <PageHero />
      <Courses />
      <BenefitsSection />
      <FAQSection />
    </>
  )
}
