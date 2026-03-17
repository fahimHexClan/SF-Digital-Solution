import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  { id: '01', title: 'Custom Management Systems', subtitle: 'Restaurant & Business RMS', description: 'Bespoke digital management platforms built for Sri Lankan businesses — from restaurant ordering to inventory, staff, and reporting dashboards.', tags: ['RMS', 'Web App', 'Dashboard', 'Database'], icon: '⬡' },
  { id: '02', title: 'Web Design & SEO',          subtitle: 'Digital Presence',          description: 'High-converting websites with strong design paired with technical SEO strategies that drive organic traffic and rank your business on Google.',    tags: ['Website', 'SEO', 'UI/UX', 'Performance'], icon: '◈' },
  { id: '03', title: 'Social Media Campaigns',    subtitle: 'Growth Marketing',          description: 'Data-driven social media strategies, content creation, and paid campaigns across Facebook, Instagram, and TikTok tailored for local markets.',  tags: ['Facebook', 'Instagram', 'TikTok', 'Ads'], icon: '◎' },
  { id: '04', title: 'Personal Branding',         subtitle: 'Brand Identity',            description: 'Craft a powerful personal brand identity — logos, visual systems, brand voice, and positioning that makes you unforgettable in your industry.', tags: ['Logo', 'Identity', 'Strategy', 'Visual'], icon: '⬟' },
  { id: '05', title: 'Digital Courses',           subtitle: 'Education & Training',      description: 'Hands-on digital marketing and web development courses designed for Sri Lankan entrepreneurs, freelancers, and professionals ready to level up.',  tags: ['Marketing', 'Web Dev', 'Workshops', 'Certification'], icon: '◇' },
]

// ═══════════════════════════════════════════
// GLASSMORPHISM CARD
// ═══════════════════════════════════════════
function GlassmorphismCard({ service, index }) {
  const ref       = useRef(null)
  const isInView  = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [tagHovered, setTagHovered] = useState(null)

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    setHovered(false)
    setMousePos({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        padding: '1px',
        background: hovered
          ? 'linear-gradient(135deg, rgba(77,159,255,0.6), rgba(30,111,255,0.1), rgba(0,200,255,0.5))'
          : 'linear-gradient(135deg, rgba(77,159,255,0.3), rgba(30,111,255,0.05), rgba(0,200,255,0.2))',
        borderRadius: '16px',
        transition: 'background 0.4s ease',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(30,111,255,0.15)'
          : '0 8px 32px rgba(0,0,0,0.3)',
        cursor: 'default',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Inner card */}
      <div style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(30,111,255,0.12) 0%, ${hovered ? 'rgba(10,26,68,0.65)' : 'rgba(8,20,52,0.55)'} 50%)`,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '15px',
        padding: '2.5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
        transition: 'background 0.4s ease',
      }}>

        {/* Glass shine overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
          borderRadius: '15px 15px 0 0',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Top accent glow line */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(77,159,255,0.6), rgba(0,200,255,0.4), transparent)',
          boxShadow: '0 0 15px rgba(77,159,255,0.4)',
          borderRadius: '0 0 50% 50%',
        }} />

        {/* Corner glow — top-right */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '120px', height: '120px',
          background: 'radial-gradient(circle, rgba(30,111,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Corner glow — bottom-left */}
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px',
          width: '100px', height: '100px',
          background: 'radial-gradient(circle, rgba(0,200,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* All content — above decorative layers */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>

          {/* Service number — watermark top-right */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            fontFamily: 'Orbitron, sans-serif', fontSize: '32px', fontWeight: 900,
            color: 'rgba(30,111,255,0.07)', lineHeight: 1,
            pointerEvents: 'none', userSelect: 'none',
          }}>{service.id}</div>

          {/* Icon box */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '52px', height: '52px',
              background: 'rgba(30,111,255,0.12)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${hovered ? 'rgba(77,159,255,0.7)' : 'rgba(77,159,255,0.35)'}`,
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', color: '#4d9fff',
              boxShadow: hovered
                ? '0 0 35px rgba(30,111,255,0.5), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 0 20px rgba(30,111,255,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
              marginBottom: '1.5rem', flexShrink: 0,
              transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
            }}
          >{service.icon}</motion.div>

          {/* Title */}
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '15px', fontWeight: 700,
            color: '#e8f4ff', lineHeight: 1.3, marginBottom: '0.4rem',
            letterSpacing: '0.5px', paddingRight: '2.5rem',
            textShadow: '0 0 20px rgba(255,255,255,0.1)',
          }}>{service.title}</h3>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Rajdhani, sans-serif', fontSize: '11px', fontWeight: 700,
            color: '#4d9fff', letterSpacing: '3px',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}>{service.subtitle}</p>

          {/* Divider */}
          <div style={{
            width: '30px', height: '1px',
            background: 'linear-gradient(90deg, #1e6fff, #00c8ff)',
            boxShadow: '0 0 8px rgba(30,111,255,0.6)',
            marginBottom: '1.25rem',
          }} />

          {/* Description */}
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px',
            color: 'rgba(107,159,212,0.75)', lineHeight: 1.8,
            marginBottom: '1.5rem', flex: 1,
          }}>{service.description}</p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {service.tags.map(tag => (
              <span
                key={tag}
                onMouseEnter={() => setTagHovered(tag)}
                onMouseLeave={() => setTagHovered(null)}
                style={{
                  fontFamily: 'Rajdhani, sans-serif', fontSize: '10px', fontWeight: 700,
                  padding: '5px 12px',
                  background: tagHovered === tag ? 'rgba(30,111,255,0.2)' : 'rgba(30,111,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${tagHovered === tag ? 'rgba(77,159,255,0.5)' : 'rgba(30,111,255,0.2)'}`,
                  borderRadius: '4px',
                  color: tagHovered === tag ? '#fff' : '#4d9fff',
                  letterSpacing: '1px', textTransform: 'uppercase',
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
              >{tag}</span>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════
// SERVICES SECTION
// ═══════════════════════════════════════════
export default function Services({ limit }) {
  const titleRef = useRef(null)
  const isInView  = useInView(titleRef, { once: true })
  const displayed = limit ? services.slice(0, limit) : services

  return (
    <section style={{
      padding: '4rem 0', position: 'relative',
      borderBottom: '1px solid rgba(30,111,255,0.08)',
    }}>

      {/* Section radial glow backdrop */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(30,111,255,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <div ref={titleRef} style={{ marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.02</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
            <span className="section-label">What We Do</span>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px' }}
            >
              SERVICES THAT<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ WebkitTextStroke: '1.5px rgba(77,159,255,0.7)', color: 'transparent' }}>DRIVE RESULTS</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ position: 'absolute', bottom: -4, left: 0, height: '1px', background: 'linear-gradient(90deg, #1e6fff, #00c8ff)', boxShadow: '0 0 10px rgba(30,111,255,0.4)' }}
                />
              </span>
            </motion.h2>

            {!limit && (
              <motion.p
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(107,159,212,0.7)', maxWidth: '300px', lineHeight: 1.75 }}
              >
                Full-spectrum digital solutions crafted specifically for Sri Lankan businesses ready to scale.
              </motion.p>
            )}
          </div>
        </div>

        {/* ── Cards grid ── */}
        <div className="services-grid" style={{ alignItems: 'stretch' }}>
          {displayed.map((s, i) => <GlassmorphismCard key={s.id} service={s} index={i} />)}
        </div>

        {limit && (
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
            style={{ marginTop: '3rem' }}
          >
            <Link to="/services" className="btn-glass">View All Services</Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
