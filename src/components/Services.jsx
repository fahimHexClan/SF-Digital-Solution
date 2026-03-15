import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  { id: '01', title: 'Custom Management Systems', subtitle: 'Restaurant & Business RMS', description: 'Bespoke digital management platforms built for Sri Lankan businesses — from restaurant ordering to inventory, staff, and reporting dashboards.', tags: ['RMS', 'Web App', 'Dashboard', 'Database'] },
  { id: '02', title: 'Web Design & SEO', subtitle: 'Digital Presence', description: 'High-converting websites with strong design paired with technical SEO strategies that drive organic traffic and rank your business on Google.', tags: ['Website', 'SEO', 'UI/UX', 'Performance'] },
  { id: '03', title: 'Social Media Campaigns', subtitle: 'Growth Marketing', description: 'Data-driven social media strategies, content creation, and paid campaigns across Facebook, Instagram, and TikTok tailored for local markets.', tags: ['Facebook', 'Instagram', 'TikTok', 'Ads'] },
  { id: '04', title: 'Personal Branding', subtitle: 'Brand Identity', description: 'Craft a powerful personal brand identity — logos, visual systems, brand voice, and positioning that makes you unforgettable in your industry.', tags: ['Logo', 'Identity', 'Strategy', 'Visual'] },
  { id: '05', title: 'Digital Courses', subtitle: 'Education & Training', description: 'Hands-on digital marketing and web development courses designed for Sri Lankan entrepreneurs, freelancers, and professionals ready to level up.', tags: ['Marketing', 'Web Dev', 'Workshops', 'Certification'] },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{
        background: '#ffffff',
        padding: '2.5rem 2rem',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        cursor: 'default',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(37,99,235,0.1)' }}
    >
      {/* Large background number */}
      <div style={{
        position: 'absolute', top: '1.5rem', right: '1.5rem',
        fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px',
        color: '#d1d9f0', lineHeight: 1, pointerEvents: 'none', letterSpacing: '2px',
      }}>{service.id}</div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px',
        fontWeight: 400, letterSpacing: '1px', lineHeight: 1,
        color: '#0a0f2e', marginBottom: '0.4rem',
        paddingRight: '3rem',
      }}>{service.title}</h3>

      <p style={{
        fontFamily: 'Space Mono, monospace', fontSize: '9px',
        color: '#2563eb', letterSpacing: '3px', textTransform: 'uppercase',
        marginBottom: '1rem',
      }}>{service.subtitle}</p>

      <div style={{ width: '24px', height: '2px', background: '#2563eb', marginBottom: '1.25rem' }} />

      <p style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 300,
        fontSize: '13px', lineHeight: 1.8,
        color: '#4b5563', marginBottom: '1.5rem', flex: 1,
      }}>{service.description}</p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: 'Space Mono, monospace', fontSize: '9px',
            padding: '4px 10px',
            background: '#eff6ff',
            color: '#2563eb',
            letterSpacing: '1px', textTransform: 'uppercase',
          }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Services({ limit }) {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })
  const displayed = limit ? services.slice(0, limit) : services

  return (
    <section style={{ padding: '5rem 0', position: 'relative', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.02</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
            <span className="section-label">What We Do</span>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px' }}
            >
              Services That<br />Drive Results
            </motion.h2>
            {!limit && (
              <motion.p
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', maxWidth: '300px', lineHeight: 1.75 }}
              >
                Full-spectrum digital solutions crafted specifically for Sri Lankan businesses ready to scale.
              </motion.p>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="services-grid">
          {displayed.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
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
