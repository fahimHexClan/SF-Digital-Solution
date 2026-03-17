import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const typeColors = {
  SYSTEM:   { border: '#1e6fff', glow: 'rgba(30,111,255,0.4)',  bg: 'rgba(30,111,255,0.08)',  text: '#4d9fff'  },
  WEB:      { border: '#6366f1', glow: 'rgba(41,121,255,0.4)',  bg: 'rgba(41,121,255,0.08)',  text: '#818cf8'  },
  CAMPAIGN: { border: '#06b6d4', glow: 'rgba(6,182,212,0.4)',   bg: 'rgba(6,182,212,0.08)',   text: '#22d3ee'  },
  BRAND:    { border: '#8b5cf6', glow: 'rgba(139,92,246,0.4)',  bg: 'rgba(139,92,246,0.08)',  text: '#a78bfa'  },
}

const projects = [
  { id: 1, title: 'Spice Garden RMS', category: 'Management System', tags: ['React', 'Node.js', 'MySQL'], description: 'Full restaurant management system with POS, inventory tracking, and real-time analytics dashboard.', year: '2024', type: 'SYSTEM' },
  { id: 2, title: 'LuxeStay Hotels', category: 'Web Design & SEO', tags: ['WordPress', 'SEO', 'Booking'], description: 'Luxury hotel website with integrated booking engine and 300% organic traffic growth.', year: '2024', type: 'WEB' },
  { id: 3, title: 'FreshBite Delivery', category: 'Social Media', tags: ['Facebook Ads', 'Instagram', 'TikTok'], description: 'Full social media campaign achieving 5x ROAS on food delivery platform launch.', year: '2023', type: 'CAMPAIGN' },
  { id: 4, title: 'Nimesh Perera', category: 'Personal Branding', tags: ['Brand Identity', 'Logo', 'Strategy'], description: 'Complete personal brand overhaul for a life coach, including visual identity and content strategy.', year: '2024', type: 'BRAND' },
  { id: 5, title: 'AutoParts Lanka', category: 'Web Design & SEO', tags: ['eCommerce', 'SEO', 'UX'], description: 'E-commerce platform for automotive parts with local SEO dominating Colombo search results.', year: '2023', type: 'WEB' },
  { id: 6, title: 'CeylonCraft Exports', category: 'Management System', tags: ['ERP', 'Inventory', 'Exports'], description: 'Export management system handling 500+ SKUs with automated invoicing and shipping integration.', year: '2024', type: 'SYSTEM' },
]

const categories = ['All', 'Management System', 'Web Design & SEO', 'Social Media', 'Personal Branding']

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const colors = typeColors[project.type] || typeColors.SYSTEM

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(8,20,48,0.9)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? `0 12px 40px ${colors.glow}, 0 0 0 1px ${colors.border}33` : 'none',
        borderTop: `2px solid ${hovered ? colors.border : 'rgba(30,111,255,0.1)'}`,
      }}
    >
      {/* Visual area */}
      <div className="light-sweep-wrap" style={{
        position: 'relative', overflow: 'hidden',
        padding: '2.5rem 2rem 2rem',
        minHeight: '200px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(30,111,255,0.08)',
        background: hovered ? `rgba(13,33,71,0.95)` : 'rgba(8,20,48,0.9)',
        transition: 'background 0.3s ease',
      }}>
        {/* Background number */}
        <div style={{
          position: 'absolute', bottom: '-0.5rem', right: '1.5rem',
          fontFamily: 'Orbitron, sans-serif', fontSize: '100px', fontWeight: 900,
          color: 'rgba(30,111,255,0.04)', lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none', letterSpacing: '2px',
        }}>{String(project.id).padStart(2, '0')}</div>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px',
            padding: '3px 10px',
            background: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}55`,
            letterSpacing: '2px', textTransform: 'uppercase',
            boxShadow: hovered ? `0 0 12px ${colors.glow}` : 'none',
          }}>{project.type}</span>
          <span style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '11px',
            color: 'rgba(107,159,212,0.4)', letterSpacing: '2px',
          }}>{project.year}</span>
        </div>

        {/* Title */}
        <div>
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '16px', fontWeight: 700,
            letterSpacing: '1px', lineHeight: 1.2,
            color: hovered ? colors.text : '#d6eaff',
            textShadow: hovered ? `0 0 16px ${colors.glow}` : 'none',
            transition: 'color 0.25s ease, text-shadow 0.25s ease', marginBottom: '6px',
          }}>{project.title}</h3>
          <span style={{
            fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px',
            color: 'rgba(107,159,212,0.45)', letterSpacing: '2px', textTransform: 'uppercase',
          }}>{project.category}</span>
        </div>

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(135deg, ${colors.bg}, rgba(13,33,71,0.92))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '12px',
                color: colors.text, letterSpacing: '4px', textTransform: 'uppercase',
                textShadow: `0 0 16px ${colors.glow}`,
              }}>VIEW PROJECT →</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem 2rem' }}>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(107,159,212,0.65)', lineHeight: 1.8, marginBottom: '1rem' }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px',
              padding: '3px 10px',
              background: 'rgba(30,111,255,0.06)',
              color: 'rgba(77,159,255,0.7)',
              border: '1px solid rgba(30,111,255,0.15)',
              letterSpacing: '1px', textTransform: 'uppercase',
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Portfolio({ limit }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.category === activeFilter)
  const displayed = limit ? filtered.slice(0, limit) : filtered

  return (
    <section style={{ padding: '4rem 0', position: 'relative', borderBottom: '1px solid rgba(30,111,255,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.03</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
            <span className="section-label">Our Work</span>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px' }}
            >
              SELECTED<br />
              <span style={{ WebkitTextStroke: '1.5px rgba(77,159,255,0.7)', color: 'transparent' }}>PROJECTS</span>
            </motion.h2>

            {/* Filter tabs */}
            {!limit && (
              <motion.div
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                className="filter-tabs"
              >
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                    fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px',
                    padding: '8px 14px',
                    background: activeFilter === cat ? 'linear-gradient(135deg, #1e6fff, #4d9fff)' : 'rgba(13,33,71,0.7)',
                    color: activeFilter === cat ? '#ffffff' : 'rgba(107,159,212,0.6)',
                    border: '1px solid',
                    borderColor: activeFilter === cat ? 'transparent' : 'rgba(30,111,255,0.2)',
                    cursor: 'pointer', letterSpacing: '2px', textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                    boxShadow: activeFilter === cat ? '0 0 20px rgba(30,111,255,0.4)' : 'none',
                  }}>{cat}</button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="portfolio-grid">
          <AnimatePresence>
            {displayed.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
          </AnimatePresence>
        </motion.div>

        {limit && (
          <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} style={{ marginTop: '3rem' }}>
            <Link to="/portfolio" className="btn-glass">View All Projects</Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
