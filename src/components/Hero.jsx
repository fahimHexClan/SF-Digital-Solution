import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '35+', label: 'Clients' },
  { value: '5+', label: 'Years' },
  { value: '100%', label: 'Satisfaction' },
]

/* ── Character-by-character reveal ─────────────────── */
function SplitReveal({ children, delay = 0, stroke = false }) {
  const text = String(children)
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.028, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-block',
            ...(stroke ? { WebkitTextStroke: '1.5px rgba(77,159,255,0.8)', color: 'transparent' } : {}),
          }}
        >
          {char === ' ' ? '\u00a0' : char}
        </motion.span>
      ))}
    </>
  )
}

/* ── Typewriter ─────────────────────────────────────── */
function Typewriter({ text, delay = 0, speed = 32 }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let idx = 0
    let interval
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        idx++
        setDisplayed(text.slice(0, idx))
        if (idx >= text.length) clearInterval(interval)
      }, speed)
    }, delay * 1000)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [text, delay, speed])

  return (
    <>
      {displayed}
      {displayed.length < text.length && (
        <span style={{ animation: 'blink 0.7s step-end infinite', color: '#4d9fff', marginLeft: '1px' }}>|</span>
      )}
    </>
  )
}

/* ── Count-up number ────────────────────────────────── */
function CountUp({ end, delay = 0 }) {
  const [value, setValue] = useState(0)
  const num = parseInt(end, 10)
  const suffix = end.replace(/[0-9]/g, '')
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1300
      const start = Date.now()
      const tick = () => {
        const prog = Math.min((Date.now() - start) / duration, 1)
        const eased = 1 - Math.pow(1 - prog, 3)
        setValue(Math.round(eased * num))
        if (prog < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [num, delay])
  return <>{value}{suffix}</>
}

/* ── Globe canvas ───────────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrame
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cx = () => canvas.width * 0.38
    const cy = () => canvas.height * 0.5
    const R = () => Math.min(canvas.width, canvas.height) * 0.32

    const nodeAngles = [
      { lat: 0.4, lng: 0.3 }, { lat: -0.5, lng: 1.2 }, { lat: 0.8, lng: -0.5 },
      { lat: -0.2, lng: -1.0 }, { lat: 1.1, lng: 0.8 }, { lat: 0.1, lng: 2.0 },
      { lat: -0.9, lng: -0.3 }, { lat: 0.6, lng: -1.8 },
    ]

    const panelNodes = [
      { rx: 0.72, ry: 0.22, label: 'CONNECTION' },
      { rx: 0.78, ry: 0.48, label: 'SIGNAL' },
      { rx: 0.70, ry: 0.72, label: 'SHARING' },
    ]

    function project3D(lat, lng, rotation, r, centerX, centerY) {
      const x3 = Math.cos(lat) * Math.cos(lng + rotation)
      const z3 = Math.cos(lat) * Math.sin(lng + rotation)
      const y3 = Math.sin(lat)
      return { x: centerX + r * x3, y: centerY - r * y3, visible: z3 > -0.1, depth: z3 }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const r = R(), ox = cx(), oy = cy()
      const rot = t * 0.004

      /* outer glow */
      const glowGrad = ctx.createRadialGradient(ox, oy, r * 0.6, ox, oy, r * 1.3)
      glowGrad.addColorStop(0, 'rgba(30,111,255,0.07)')
      glowGrad.addColorStop(1, 'rgba(30,111,255,0)')
      ctx.fillStyle = glowGrad
      ctx.beginPath(); ctx.arc(ox, oy, r * 1.3, 0, Math.PI * 2); ctx.fill()

      /* pulsing beam from globe center */
      const beamAlpha = (Math.sin(t * 0.03) + 1) / 2 * 0.08
      const beamGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r * 1.5)
      beamGrad.addColorStop(0, `rgba(77,159,255,${beamAlpha})`)
      beamGrad.addColorStop(1, 'rgba(77,159,255,0)')
      ctx.fillStyle = beamGrad
      ctx.beginPath(); ctx.arc(ox, oy, r * 1.5, 0, Math.PI * 2); ctx.fill()

      /* globe outline */
      ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(30,111,255,0.25)'; ctx.lineWidth = 1; ctx.stroke()

      /* inner fill */
      const fillGrad = ctx.createRadialGradient(ox - r * 0.3, oy - r * 0.3, 0, ox, oy, r)
      fillGrad.addColorStop(0, 'rgba(30,111,255,0.08)')
      fillGrad.addColorStop(1, 'rgba(7,16,32,0.4)')
      ctx.fillStyle = fillGrad
      ctx.beginPath(); ctx.arc(ox, oy, r, 0, Math.PI * 2); ctx.fill()

      /* latitude lines */
      for (let lat = -60; lat <= 60; lat += 30) {
        const latR = lat * Math.PI / 180
        const projR = r * Math.cos(latR)
        const projY = oy - r * Math.sin(latR)
        if (projR > 2) {
          ctx.save()
          ctx.beginPath()
          ctx.ellipse(ox, projY, projR, projR * 0.25, 0, 0, Math.PI * 2)
          ctx.strokeStyle = lat === 0 ? 'rgba(77,159,255,0.3)' : 'rgba(30,111,255,0.12)'
          ctx.lineWidth = lat === 0 ? 1.5 : 0.8
          ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([])
          ctx.restore()
        }
      }

      /* longitude lines */
      for (let i = 0; i < 8; i++) {
        const lng = (i / 8) * Math.PI * 2 + rot
        ctx.save(); ctx.beginPath()
        for (let lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.1) {
          const p = project3D(lat, lng, 0, r, ox, oy)
          if (lat === -Math.PI / 2) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.strokeStyle = `rgba(30,111,255,${0.06 + Math.max(0, Math.sin(lng)) * 0.1})`
        ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore()
      }

      /* nodes */
      const projectedNodes = nodeAngles
        .map((n, idx) => ({ ...project3D(n.lat, n.lng, rot, r, ox, oy), idx }))
        .filter(p => p.visible)

      /* arcs between nodes */
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const a = projectedNodes[i], b = projectedNodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < r * 1.1) {
            const pulse = (Math.sin(t * 0.02 + i + j) + 1) / 2
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.quadraticCurveTo((a.x + b.x) / 2, (a.y + b.y) / 2 - dist * 0.15, b.x, b.y)
            ctx.strokeStyle = `rgba(77,159,255,${0.08 + pulse * 0.14})`
            ctx.lineWidth = 0.8; ctx.setLineDash([3, 5]); ctx.stroke(); ctx.setLineDash([])
          }
        }
      }

      /* globe node dots */
      projectedNodes.forEach(p => {
        const pulse = (Math.sin(t * 0.03 + p.idx) + 1) / 2
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 6 + pulse * 4)
        grd.addColorStop(0, 'rgba(77,159,255,0.9)')
        grd.addColorStop(1, 'rgba(30,111,255,0)')
        ctx.fillStyle = grd
        ctx.beginPath(); ctx.arc(p.x, p.y, 6 + pulse * 4, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#4d9fff'
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2); ctx.fill()
      })

      /* orbiting satellite */
      const satAngle = t * 0.012
      const satX = ox + (r + 18) * Math.cos(satAngle)
      const satY = oy + (r + 18) * Math.sin(satAngle) * 0.4
      const satGrd = ctx.createRadialGradient(satX, satY, 0, satX, satY, 5)
      satGrd.addColorStop(0, 'rgba(0,200,255,0.9)')
      satGrd.addColorStop(1, 'rgba(0,200,255,0)')
      ctx.fillStyle = satGrd
      ctx.beginPath(); ctx.arc(satX, satY, 5, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#00c8ff'
      ctx.beginPath(); ctx.arc(satX, satY, 2, 0, Math.PI * 2); ctx.fill()

      /* panel nodes */
      const panelW = canvas.width, panelH = canvas.height
      panelNodes.forEach((pn, idx) => {
        const px = panelW * pn.rx
        const py = panelH * pn.ry
        const srcNode = projectedNodes[idx % projectedNodes.length]
        if (srcNode) {
          const pulse = (Math.sin(t * 0.025 + idx * 1.5) + 1) / 2
          ctx.beginPath(); ctx.moveTo(srcNode.x, srcNode.y)
          const cpx = (srcNode.x + px) / 2 + 20
          ctx.bezierCurveTo(cpx, srcNode.y, cpx, py, px - 60, py)
          ctx.strokeStyle = `rgba(77,159,255,${0.2 + pulse * 0.25})`
          ctx.lineWidth = 1; ctx.setLineDash([4, 6]); ctx.stroke(); ctx.setLineDash([])
          ctx.beginPath(); ctx.moveTo(px - 60, py); ctx.lineTo(px - 12, py)
          ctx.strokeStyle = `rgba(77,159,255,${0.4 + pulse * 0.3})`; ctx.lineWidth = 1; ctx.stroke()
        }
        const grd2 = ctx.createRadialGradient(px - 60, py, 0, px - 60, py, 8)
        grd2.addColorStop(0, 'rgba(77,159,255,0.8)'); grd2.addColorStop(1, 'rgba(30,111,255,0)')
        ctx.fillStyle = grd2; ctx.beginPath(); ctx.arc(px - 60, py, 8, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#4d9fff'; ctx.beginPath(); ctx.arc(px - 60, py, 2.5, 0, Math.PI * 2); ctx.fill()
        const boxW = 90, boxH = 26
        ctx.fillStyle = 'rgba(13,33,71,0.85)'; ctx.strokeStyle = 'rgba(30,111,255,0.35)'; ctx.lineWidth = 1
        ctx.beginPath(); ctx.rect(px - 10, py - boxH / 2, boxW, boxH); ctx.fill(); ctx.stroke()
        ctx.fillStyle = '#4d9fff'; ctx.font = '600 9px Rajdhani, sans-serif'
        ctx.fillText(pn.label, px - 2, py + 3)
      })

      t++
      animFrame = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', opacity: 0.85, pointerEvents: 'none' }}
    />
  )
}

/* ── Hero ───────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null)
  const tagline = 'Empowering Sri Lankan businesses through digital innovation — from custom management systems to social media mastery.'

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        paddingTop: '80px', paddingBottom: '5rem', paddingLeft: '5vw', paddingRight: '5vw',
        position: 'relative', overflow: 'hidden', background: '#071020',
        borderBottom: '1px solid rgba(30,111,255,0.1)',
        backgroundImage: `
          linear-gradient(rgba(30,111,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30,111,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Radial glow */}
      <div style={{ position: 'absolute', right: '5%', top: '15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(30,111,255,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <GlobeCanvas />

      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ position: 'absolute', top: '80px', left: '5vw' }}
      >
        <span className="section-number">.01 — HERO</span>
      </motion.div>

      {/* Headings with split-char reveal */}
      <div style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 2 }}>
        <h1
          className="hero-headline"
          style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(64px, 12vw, 160px)',
            fontWeight: 900, color: '#d6eaff', lineHeight: 0.9, letterSpacing: '4px',
            textShadow: '0 0 60px rgba(30,111,255,0.3), 0 0 120px rgba(30,111,255,0.15)',
          }}
        >
          <SplitReveal delay={0.2}>SF DIGITAL</SplitReveal>
        </h1>
        <h1
          className="hero-headline"
          style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(64px, 12vw, 160px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '4px' }}
        >
          <SplitReveal delay={0.46} stroke>SOLUTIONS</SplitReveal>
        </h1>
      </div>

      {/* Separator */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', height: '1px',
          background: 'linear-gradient(90deg, #1e6fff, rgba(41,121,255,0.4), transparent)',
          transformOrigin: 'left', marginBottom: '2.5rem',
          boxShadow: '0 0 12px rgba(30,111,255,0.4)',
          position: 'relative', zIndex: 2,
        }}
      />

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="hero-bottom-row"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', position: 'relative', zIndex: 2 }}
      >
        {/* Tagline + CTA */}
        <div className="hero-tagline-block" style={{ maxWidth: '400px' }}>
          <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(107,159,212,0.8)', lineHeight: 1.8, marginBottom: '2rem', minHeight: '75px' }}>
            <Typewriter text={tagline} delay={1.1} speed={22} />
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn-primary-glass">Explore Services</Link>
            <Link to="/contact" className="btn-glass">Start a Project</Link>
          </div>
        </div>

        {/* Stats with count-up */}
        <div style={{ display: 'flex', gap: '1px', flexWrap: 'wrap', background: 'rgba(30,111,255,0.08)' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.08 }}
              style={{ background: 'rgba(13,33,71,0.9)', border: '1px solid rgba(30,111,255,0.12)', padding: '1.5rem 2rem', minWidth: '100px' }}
            >
              <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#4d9fff', lineHeight: 1, letterSpacing: '2px', textShadow: '0 0 20px rgba(77,159,255,0.6)' }}>
                <CountUp end={stat.value} delay={1.0 + i * 0.1} />
              </div>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '9px', letterSpacing: '3px', color: 'rgba(107,159,212,0.5)', textTransform: 'uppercase', marginTop: '6px' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
