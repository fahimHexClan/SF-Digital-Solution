import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '35+', label: 'Clients' },
  { value: '5+', label: 'Years' },
  { value: '100%', label: 'Satisfaction' },
]

export default function Hero() {
  const ref = useRef(null)

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: '80px',
        paddingBottom: '5rem',
        paddingLeft: '5vw',
        paddingRight: '5vw',
        position: 'relative',
        background: '#ffffff',
        borderBottom: '1px solid rgba(37,99,235,0.08)',
        backgroundImage: `
          linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    >
      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ position: 'absolute', top: '80px', left: '5vw' }}
      >
        <span className="section-number">.01 — HERO</span>
      </motion.div>

      {/* Main headline block */}
      <div style={{ marginBottom: '2.5rem' }}>
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-headline"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(80px, 15vw, 200px)',
            fontWeight: 400,
            color: '#0a0f2e',
            lineHeight: 0.9,
            letterSpacing: '3px',
          }}
        >
          SF DIGITAL
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="hero-headline"
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(80px, 15vw, 200px)',
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: '3px',
            WebkitTextStroke: '2px #2563eb',
            color: 'transparent',
          }}
        >
          SOLUTIONS
        </motion.h1>
      </div>

      {/* Horizontal rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', height: '1px',
          background: 'linear-gradient(90deg, #2563eb, transparent)',
          transformOrigin: 'left',
          marginBottom: '2.5rem',
        }}
      />

      {/* Bottom row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="hero-bottom-row"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}
      >
        {/* Left: tagline + CTA */}
        <div className="hero-tagline-block" style={{ maxWidth: '380px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 300,
            fontSize: '14px', color: '#4b5563', lineHeight: 1.75,
            marginBottom: '2rem',
          }}>
            Empowering Sri Lankan businesses through digital innovation — from custom management systems to social media mastery.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn-primary-glass">Explore Services</Link>
            <Link to="/contact" className="btn-glass">Start a Project</Link>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="stats-grid" style={{ display: 'flex', gap: '1px', flexWrap: 'wrap' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.08 }}
              style={{
                background: '#f4f7ff',
                border: '1px solid rgba(37,99,235,0.1)',
                padding: '1.5rem 2rem',
                minWidth: '100px',
              }}
            >
              <div style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: '#2563eb', lineHeight: 1, letterSpacing: '2px',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px', letterSpacing: '3px',
                color: '#9ca3af', textTransform: 'uppercase', marginTop: '4px',
              }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
