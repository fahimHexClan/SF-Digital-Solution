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
      background: 'rgba(4,10,28,0.95)',
      borderTop: '1px solid rgba(30,111,255,0.08)',
      borderBottom: '1px solid rgba(30,111,255,0.08)',
      padding: '1rem 0', overflow: 'hidden',
    }}>
      <div className="ticker-track">
        {[...Array(2)].map((_, gi) => (
          <div key={gi} style={{ display: 'inline-flex', gap: '3rem', paddingRight: '3rem' }}>
            {items.map(item => (
              <span key={item} style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px',
                color: 'rgba(30,111,255,0.3)', letterSpacing: '4px', textTransform: 'uppercase',
                whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
              }}>
                {item}
                <span style={{ color: '#1e6fff', fontSize: '6px', opacity: 0.5 }}>◈</span>
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
    <section ref={ref} style={{
      padding: '4rem 0', position: 'relative',
      background: 'rgba(7,16,32,0.9)',
      borderBottom: '1px solid rgba(30,111,255,0.08)',
    }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
            >
              <span className="section-number">.04</span>
              <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
              <span className="section-label">Why Choose Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(32px, 5vw, 76px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px', marginBottom: '1.5rem' }}
            >
              THE DIGITAL PARTNER<br />
              <span style={{ WebkitTextStroke: '1.5px rgba(77,159,255,0.7)', color: 'transparent' }}>SRI LANKA TRUSTS</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
              style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(107,159,212,0.6)', lineHeight: 1.75, marginBottom: '2rem' }}
            >
              We combine global design standards with local business insight to deliver digital solutions that actually work in the Sri Lankan context.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
              <Link to="/contact" className="btn-primary-glass">Start Your Project</Link>
            </motion.div>
          </div>

          {/* Right - 2×2 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(30,111,255,0.06)' }}>
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  background: 'rgba(30,111,255,0.04)',
                  border: '1px solid rgba(30,111,255,0.08)',
                  padding: '2rem 1.5rem',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  backgroundColor: 'rgba(30,111,255,0.10)',
                  borderColor: 'rgba(30,111,255,0.30)',
                  boxShadow: '0 0 28px rgba(30,111,255,0.20), inset 0 0 20px rgba(30,111,255,0.04)',
                }}
              >
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px', color: '#1e6fff', letterSpacing: '3px', marginBottom: '1rem', textTransform: 'uppercase' }}>{r.num}</div>
                <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '1px', color: '#d6eaff', marginBottom: '0.5rem' }}>{r.title}</h3>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(107,159,212,0.55)', lineHeight: 1.75 }}>{r.desc}</p>
              </motion.div>
            ))}
          </div>
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
      <Services limit={3} />
      <WhyUs />
      <Portfolio limit={3} />
      <Courses limit={2} />
    </>
  )
}
