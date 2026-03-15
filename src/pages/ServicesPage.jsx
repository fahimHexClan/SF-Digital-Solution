import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Services from '../components/Services'

function PageHero() {
  return (
    <section className="page-hero" style={{ background: '#ffffff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span className="section-number">.00</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">Our Services</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 10vw, 140px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '2rem' }}
        >
          Digital Services<br />
          <span style={{ WebkitTextStroke: '2px #2563eb', color: 'transparent' }}>Built For Growth</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', maxWidth: '500px', lineHeight: 1.75 }}
        >
          From custom software to social media campaigns — comprehensive digital solutions that move the needle for Sri Lankan businesses.
        </motion.p>
      </div>
    </section>
  )
}

function ProcessSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const steps = [
    { num: '01', title: 'Discovery', desc: 'We dive deep into your business, goals, and challenges to understand what digital solutions will have the highest impact.' },
    { num: '02', title: 'Strategy', desc: 'A custom digital roadmap is crafted — from tech stack to campaign channels — designed specifically for your business.' },
    { num: '03', title: 'Execution', desc: 'Our team builds, designs, and launches with precision, keeping you in the loop at every milestone.' },
    { num: '04', title: 'Growth', desc: 'Post-launch, we monitor, optimize, and iterate to ensure your digital presence keeps growing.' },
  ]

  return (
    <section ref={ref} style={{ padding: '5rem 0', background: '#f4f7ff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.03</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">How We Work</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '4rem' }}
        >
          Our Process
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(37,99,235,0.08)' }}>
          {steps.map((step, i) => (
            <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ background: '#ffffff', padding: '2.5rem 2rem', transition: 'all 0.3s ease' }}
            >
              <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '5rem', fontWeight: 400, color: 'rgba(37,99,235,0.08)', lineHeight: 1, marginBottom: '1rem', letterSpacing: '2px' }}>{step.num}</div>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', fontWeight: 400, letterSpacing: '1px', color: '#0a0f2e', marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <section ref={ref} style={{ padding: '5rem 0', background: '#0a0f2e' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          style={{
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', padding: '3rem 2.5rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderTop: '3px solid #2563eb',
          }}
        >
          <div>
            <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', fontWeight: 400, letterSpacing: '1px', color: '#ffffff', marginBottom: '0.5rem' }}>
              Ready to get started?
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              Book a free 30-minute consultation — no commitments.
            </p>
          </div>
          <Link to="/contact" className="btn-primary-glass">Book Free Consultation</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHero />
      <div style={{ background: '#f4f7ff' }}>
        <Services />
      </div>
      <ProcessSection />
      <CTABanner />
    </>
  )
}
