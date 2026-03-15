import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Portfolio from '../components/Portfolio'

function PageHero() {
  return (
    <section className="page-hero" style={{ background: '#ffffff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span className="section-number">.00</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">Portfolio</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 10vw, 140px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '2rem' }}
        >
          Work That<br />
          <span style={{ WebkitTextStroke: '2px #2563eb', color: 'transparent' }}>Speaks For Itself</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', maxWidth: '480px', lineHeight: 1.75 }}
        >
          A curated selection of our digital projects delivered for Sri Lankan businesses — from management systems to brand identities.
        </motion.p>
      </div>
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
    <section ref={ref} style={{ padding: '5rem 0', background: '#f4f7ff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.04</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">Client Testimonials</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '4rem' }}
        >
          What Clients Say
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(37,99,235,0.08)' }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              style={{ background: '#ffffff', padding: '2.5rem 2rem', borderTop: '3px solid #2563eb' }}
            >
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '4rem', color: 'rgba(37,99,235,0.1)', lineHeight: 1, marginBottom: '1.5rem' }}>"</div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: '#4b5563', lineHeight: 1.8, marginBottom: '1.5rem' }}>{t.quote}</p>
              <div style={{ width: '24px', height: '2px', background: '#2563eb', marginBottom: '1rem' }} />
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#0a0f2e', letterSpacing: '1px', marginBottom: '4px' }}>{t.name}</div>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#9ca3af', letterSpacing: '1px' }}>{t.role}</div>
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
      <div style={{ background: '#ffffff' }}>
        <Portfolio />
      </div>
      <TestimonialsSection />
    </>
  )
}
