import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Courses from '../components/Courses'

function TickerStrip() {
  const items = ['Custom Systems', 'Web Design', 'SEO Growth', 'Social Media', 'Personal Branding', 'Digital Courses', 'Sri Lanka']
  return (
    <div style={{
      background: '#f0f4ff',
      borderTop: '1px solid rgba(37,99,235,0.08)',
      borderBottom: '1px solid rgba(37,99,235,0.08)',
      padding: '1rem 0', overflow: 'hidden',
    }}>
      <div className="ticker-track">
        {[...Array(2)].map((_, gi) => (
          <div key={gi} style={{ display: 'inline-flex', gap: '3rem', paddingRight: '3rem' }}>
            {items.map(item => (
              <span key={item} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '10px',
                color: '#9ca3af', letterSpacing: '4px', textTransform: 'uppercase',
                whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
              }}>
                {item}
                <span style={{ color: '#2563eb', fontSize: '6px' }}>◈</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function WhyUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const reasons = [
    { num: '01', title: 'Local Expertise', desc: 'Deep understanding of the Sri Lankan market, culture, and business environment.' },
    { num: '02', title: 'Full-Stack Digital', desc: 'From strategy to execution — we handle everything under one roof.' },
    { num: '03', title: 'Results-Driven', desc: 'Every campaign, website, and system is built with measurable ROI in mind.' },
    { num: '04', title: 'Ongoing Support', desc: "We don't disappear after launch. Long-term partnerships are our standard." },
  ]

  return (
    <section ref={ref} style={{ padding: '5rem 0', position: 'relative', background: '#0a0f2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
            >
              <span className="section-number">.04</span>
              <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
              <span className="section-label">Why Choose Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#ffffff', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '1.5rem' }}
            >
              The Digital Partner<br />Sri Lanka Trusts
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, marginBottom: '2rem' }}
            >
              We combine global design standards with local business insight to deliver digital solutions that actually work in the Sri Lankan context.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
              <Link to="/contact" className="btn-primary-glass">Start Your Project</Link>
            </motion.div>
          </div>

          {/* Right - 2×2 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '2rem 1.5rem',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ backgroundColor: 'rgba(37,99,235,0.15)', borderColor: 'rgba(37,99,235,0.3)' }}
              >
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#3b82f6', letterSpacing: '2px', marginBottom: '1rem' }}>{r.num}</div>
                <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', fontWeight: 400, letterSpacing: '1px', color: '#ffffff', marginBottom: '0.5rem' }}>{r.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} style={{ padding: '5rem 0', position: 'relative', background: '#0a0f2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '3rem' }}>
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
            >
              <span className="section-number">.06</span>
              <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
              <span className="section-label">Take Action</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 7vw, 120px)', fontWeight: 400, color: '#ffffff', lineHeight: 0.92, letterSpacing: '1px' }}
            >
              Ready To Go<br />Digital?
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '320px' }}>
              Book a free consultation and let's map out your digital transformation strategy.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary-glass">Get Free Consultation</Link>
              <Link to="/courses" className="btn-glass-dark">Browse Courses</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TickerStrip />
      {/* Services: light blue #f4f7ff */}
      <div style={{ background: '#f4f7ff' }}>
        <Services limit={3} />
      </div>
      {/* Why Choose Us: dark navy */}
      <WhyUs />
      {/* Portfolio: white */}
      <div style={{ background: '#ffffff' }}>
        <Portfolio limit={3} />
      </div>
      {/* Courses: light blue */}
      <div style={{ background: '#f4f7ff' }}>
        <Courses limit={2} />
      </div>
      {/* CTA: dark navy */}
      <CallToAction />
    </>
  )
}
