import { motion } from 'framer-motion'
import Contact from '../components/Contact'

function PageHero() {
  return (
    <section className="page-hero" style={{ background: '#ffffff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span className="section-number">.00</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">Contact Us</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 10vw, 140px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '2rem' }}
        >
          Let's Talk<br />
          <span style={{ WebkitTextStroke: '2px #2563eb', color: 'transparent' }}>Business</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', maxWidth: '450px', lineHeight: 1.75 }}
        >
          Have a project in mind? Want to enroll in a course? Or just want to explore what's possible? We're ready to listen.
        </motion.p>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHero />
      <Contact />
    </>
  )
}
