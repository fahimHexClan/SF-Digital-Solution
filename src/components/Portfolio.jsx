import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? '0 12px 40px rgba(37,99,235,0.1)' : 'none',
        borderTop: hovered ? '2px solid #2563eb' : '2px solid transparent',
      }}
    >
      {/* Visual area */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '2.5rem 2rem 2rem',
        minHeight: '200px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(37,99,235,0.08)',
        background: hovered ? '#f4f7ff' : '#ffffff',
        transition: 'background 0.3s ease',
      }}>
        {/* Background number */}
        <div style={{
          position: 'absolute', bottom: '-0.5rem', right: '1.5rem',
          fontFamily: 'Bebas Neue, sans-serif', fontSize: '120px', fontWeight: 400,
          color: 'rgba(37,99,235,0.05)', lineHeight: 1,
          userSelect: 'none', pointerEvents: 'none', letterSpacing: '2px',
        }}>{String(project.id).padStart(2, '0')}</div>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '9px',
            padding: '4px 10px',
            background: '#eff6ff',
            color: '#2563eb',
            letterSpacing: '2px', textTransform: 'uppercase',
          }}>{project.type}</span>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '10px',
            color: '#9ca3af', letterSpacing: '2px',
          }}>{project.year}</span>
        </div>

        {/* Title */}
        <div>
          <h3 style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', fontWeight: 400,
            letterSpacing: '1px', lineHeight: 1,
            color: hovered ? '#2563eb' : '#0a0f2e',
            transition: 'color 0.25s ease', marginBottom: '6px',
          }}>{project.title}</h3>
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '9px',
            color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase',
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
                background: 'rgba(244,247,255,0.85)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{
                fontFamily: 'Space Mono, monospace', fontSize: '10px',
                color: '#2563eb', letterSpacing: '4px', textTransform: 'uppercase',
              }}>VIEW PROJECT →</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem 2rem' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: '#4b5563', lineHeight: 1.8, marginBottom: '1rem' }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'Space Mono, monospace', fontSize: '9px',
              padding: '4px 10px',
              background: '#eff6ff',
              color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase',
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
    <section style={{ padding: '5rem 0', position: 'relative', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.03</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
            <span className="section-label">Our Work</span>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px' }}
            >
              Selected<br />Projects
            </motion.h2>

            {/* Filter tabs */}
            {!limit && (
              <motion.div
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                className="filter-tabs"
              >
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '9px',
                    padding: '8px 14px',
                    background: activeFilter === cat ? '#2563eb' : '#ffffff',
                    color: activeFilter === cat ? '#ffffff' : '#4b5563',
                    border: '1px solid',
                    borderColor: activeFilter === cat ? '#2563eb' : 'rgba(37,99,235,0.15)',
                    cursor: 'pointer', letterSpacing: '2px', textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
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
