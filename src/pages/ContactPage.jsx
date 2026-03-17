import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Contact from '../components/Contact'

function PageHero() {
  const canvasRef = useRef(null)
  const [showCursor, setShowCursor] = useState(false)

  // Cursor appears after description fades in (delay 1.1s + 0.6s anim = ~1.8s)
  useEffect(() => {
    const show = setTimeout(() => setShowCursor(true), 1900)
    const hide = setTimeout(() => setShowCursor(false), 5500)
    return () => { clearTimeout(show); clearTimeout(hide) }
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

    // ── Signal waves — 4 expanding rings from focal point ──
    const waves = [0, 0.25, 0.5, 0.75].map(phase => ({ phase }))
    const maxWaveR = 200
    const waveCycle = maxWaveR / 0.8 // ~250 frames per full expansion

    // ── Transmission lines — 8 angles from focal point ──
    const txLines = Array.from({ length: 8 }, (_, i) => ({
      angle:  i * 45 * Math.PI / 180,
      timer:  i * 15, // stagger offsets
      period: 120,    // 2s at 60fps
    }))

    // ── Binary data rain — 15 columns in right 40% ──
    const rainCols = Array.from({ length: 15 }, (_, i) => ({
      x:    0, // set after resize
      y:    Math.random() * (canvas.height || 500),
      speed: 1 + Math.random(),
      char:  Math.random() > 0.5 ? '1' : '0',
      tick:  Math.floor(Math.random() * 20),
    }))
    const initRain = () => {
      rainCols.forEach((col, i) => {
        col.x = canvas.width * 0.6 + (i / 15) * canvas.width * 0.38
      })
    }
    initRain()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t++

      const fx = canvas.width  * 0.75
      const fy = canvas.height * 0.5

      // ── Signal waves ──
      waves.forEach(w => {
        const r = ((t * 0.8) + w.phase * maxWaveR) % maxWaveR
        const alpha = (1 - r / maxWaveR) * 0.15
        if (r > 0) {
          ctx.beginPath()
          ctx.arc(fx, fy, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(30,111,255,${alpha.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })

      // ── Transmission lines ──
      txLines.forEach(line => {
        line.timer++
        const progress = line.timer % line.period
        const len = (progress / line.period) * 150
        // Fade out in last 30% of period
        const fadeFrac = progress / line.period
        const alpha = fadeFrac < 0.7
          ? 0.2
          : 0.2 * (1 - (fadeFrac - 0.7) / 0.3)
        if (len > 0) {
          ctx.beginPath()
          ctx.moveTo(fx, fy)
          ctx.lineTo(
            fx + Math.cos(line.angle) * len,
            fy + Math.sin(line.angle) * len
          )
          ctx.strokeStyle = `rgba(30,111,255,${alpha.toFixed(3)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })

      // ── Binary data rain ──
      ctx.font = '10px monospace'
      ctx.fillStyle = 'rgba(30,111,255,0.08)'
      rainCols.forEach(col => {
        col.y += col.speed
        col.tick++
        if (col.tick % 20 === 0) col.char = Math.random() > 0.5 ? '1' : '0'
        if (col.y > canvas.height + 10) {
          col.y = -10
          col.x = canvas.width * 0.6 + Math.random() * canvas.width * 0.38
        }
        ctx.fillText(col.char, col.x, col.y)
      })

      // ── Location pin diamond + pulsing rings ──
      // Outer rings (drawn before pin so pin sits on top)
      ;[50, 30, 15].forEach((maxR, i) => {
        const period = 120
        const phaseOffset = (i / 3) * period
        const r = (((t + phaseOffset) % period) / period) * maxR
        const alpha = (1 - r / maxR) * 0.35
        if (r > 0) {
          ctx.beginPath()
          ctx.arc(fx, fy, r, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(77,159,255,${alpha.toFixed(3)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      })
      // Diamond pin
      const ps = 6
      ctx.beginPath()
      ctx.moveTo(fx,      fy - ps)
      ctx.lineTo(fx + ps, fy)
      ctx.lineTo(fx,      fy + ps)
      ctx.lineTo(fx - ps, fy)
      ctx.closePath()
      ctx.fillStyle = 'rgba(77,159,255,0.6)'
      ctx.fill()

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const line1  = "LET'S TALK"
  const line2  = 'BUSINESS'
  const contactChars = 'CONTACT US'.split('')

  const pills = [
    {
      dot: '#25d366',
      label: 'WHATSAPP',
      value: '070 1988 102',
    },
    {
      dot: '#4d9fff',
      label: 'EMAIL',
      value: 'sfdigitalsolution1@gmail.com',
    },
    {
      dot: '#00c8ff',
      label: 'LOCATION',
      value: 'SRI LANKA',
    },
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
      background: 'linear-gradient(135deg, rgba(7,16,32,1) 0%, rgba(9,20,48,0.96) 40%, rgba(10,24,56,0.88) 70%, rgba(7,16,32,1) 100%)',
    }}>
      <style>{`
        @keyframes stroke-pulse {
          0%,100% { -webkit-text-stroke-color: rgba(77,159,255,0.85); }
          50%      { -webkit-text-stroke-color: rgba(0,200,255,1);     }
        }
        .ctp-stroke-pulse { animation: stroke-pulse 2s ease-in-out 3 5s; }
        @media (max-width: 899px) { .ctp-pills  { display: none !important; } }
        @media (max-width: 767px) { .ctp-badge  { display: none !important; } }
      `}</style>

      {/* ── Canvas ── */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Scan line (one-time sweep) ── */}
      <motion.div
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: '100%', opacity: 0 }}
        transition={{ duration: 1.8, delay: 0.3, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.2), transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

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
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)', transformOrigin: 'left' }}
          />
          <div style={{ display: 'flex' }}>
            {contactChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                className="section-label"
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Headline — blur-in character reveal + glitch */}
        <motion.h1
          animate={{ x: [0, 4, -4, 2, 0] }}
          transition={{ delay: 1.8, duration: 0.25, times: [0, 0.25, 0.5, 0.75, 1] }}
          style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '2px',
            marginBottom: '2rem',
          }}
        >
          {/* Line 1 — LET'S TALK */}
          <div style={{ display: 'block' }}>
            {line1.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: '#d6eaff' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* Line 2 — BUSINESS (outline + stroke pulse) */}
          <div style={{ display: 'block' }}>
            {line2.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="ctp-stroke-pulse"
                style={{
                  display: 'inline-block',
                  WebkitTextStroke: '1.5px rgba(77,159,255,0.85)',
                  color: 'transparent',
                  textShadow: '0 0 40px rgba(30,111,255,0.3)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            color: 'rgba(107,159,212,0.7)',
            maxWidth: '450px',
            lineHeight: 1.75,
          }}
        >
          Have a project in mind? Want to enroll in a course? Or just want to explore what's possible?{' '}
          <span style={{ color: '#4d9fff', fontWeight: 500 }}>We're ready to listen.</span>
          {showCursor && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.55, repeat: 3 }}
              style={{ marginLeft: '2px', color: 'rgba(77,159,255,0.8)' }}
            >▋</motion.span>
          )}
        </motion.p>
      </div>

      {/* ── Contact method pills (right side) ── */}
      <div
        className="ctp-pills"
        style={{
          position: 'absolute',
          right: '5vw',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          zIndex: 2,
        }}
      >
        {pills.map((pill, i) => (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                padding: '12px 20px',
                background: 'rgba(10,26,58,0.88)',
                border: '1px solid rgba(30,111,255,0.25)',
                backdropFilter: 'blur(14px)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                minWidth: '260px',
              }}
            >
              {/* Pulsing dot */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: pill.dot,
                  boxShadow: `0 0 10px ${pill.dot}`,
                  flexShrink: 0,
                }}
              />
              {/* Text */}
              <div>
                <div style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(77,159,255,0.6)',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '3px',
                }}>
                  {pill.label}
                </div>
                <div style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(214,234,255,0.85)',
                }}>
                  {pill.value}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Response time badge (bottom-left) ── */}
      <motion.div
        className="ctp-badge"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        style={{
          position: 'absolute',
          left: '5vw',
          bottom: '3rem',
          zIndex: 2,
        }}
      >
        <motion.span
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'inline-block',
            padding: '6px 16px',
            background: 'rgba(30,111,255,0.08)',
            border: '1px solid rgba(30,111,255,0.2)',
            borderRadius: '2px',
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            color: 'rgba(77,159,255,0.65)',
            letterSpacing: '2px',
          }}
        >
          ⚡ AVERAGE RESPONSE TIME — UNDER 24 HOURS
        </motion.span>
      </motion.div>

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
          background: 'linear-gradient(90deg, transparent, rgba(30,111,255,0.5) 30%, rgba(0,200,255,0.4) 55%, rgba(99,102,241,0.3) 80%, transparent)',
          boxShadow: '0 0 20px rgba(30,111,255,0.3)',
          transformOrigin: 'left',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <Contact />
    </>
  )
}
