import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Courses from '../components/Courses'

function PageHero() {
  return (
    <section className="page-hero" style={{ background: '#ffffff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span className="section-number">.00</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">Courses & Classes</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(60px, 10vw, 140px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '2rem' }}
        >
          Level Up Your<br />
          <span style={{ WebkitTextStroke: '2px #2563eb', color: 'transparent' }}>Digital Skills</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', maxWidth: '500px', lineHeight: 1.75 }}
        >
          Practical, hands-on digital marketing and web development courses designed for Sri Lankan entrepreneurs and professionals.
        </motion.p>
      </div>
    </section>
  )
}

function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const benefits = [
    { num: '01', title: 'Hands-On Learning', desc: 'Real projects, real tools, real results. No fluff — just practical skills you can apply immediately.' },
    { num: '02', title: 'Local Context', desc: 'Curriculum built for the Sri Lankan market — platforms, payment systems, and business culture included.' },
    { num: '03', title: 'Expert Instructors', desc: 'Learn from professionals who have successfully run campaigns and built systems for local businesses.' },
    { num: '04', title: 'Certificate Awarded', desc: 'Receive an SF Digital Solutions certificate recognized by Sri Lankan businesses upon completion.' },
    { num: '05', title: 'Small Batch Classes', desc: 'Maximum 15 students per batch to ensure personalized attention and quality learning.' },
    { num: '06', title: 'Lifetime Community', desc: 'Join our alumni network for ongoing support, job opportunities, and collaboration.' },
  ]

  return (
    <section ref={ref} style={{ padding: '5rem 0', background: '#f4f7ff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.05</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">Why Learn With Us</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '4rem' }}
        >
          The SF Digital Advantage
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px', background: 'rgba(37,99,235,0.08)' }}>
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
              style={{ background: '#ffffff', padding: '2rem', transition: 'all 0.3s ease', borderTop: '3px solid transparent' }}
              onMouseEnter={e => e.currentTarget.style.borderTopColor = '#2563eb'}
              onMouseLeave={e => e.currentTarget.style.borderTopColor = 'transparent'}
            >
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#2563eb', letterSpacing: '2px', marginBottom: '1rem' }}>{b.num}</div>
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', fontWeight: 400, letterSpacing: '1px', color: '#0a0f2e', marginBottom: '0.5rem' }}>{b.title}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const faqs = [
    { q: 'Are the courses online or in-person?', a: 'We offer both in-person sessions in Colombo and online live classes via Zoom, with recordings available for all enrolled students.' },
    { q: 'What equipment do I need?', a: 'Just a laptop and stable internet connection. All software used in the courses is either free or we provide access during the course duration.' },
    { q: 'Is there a payment plan available?', a: 'Yes! We offer a 2-installment payment plan for all courses. Contact us to arrange your preferred payment schedule.' },
    { q: "Can I get a refund if I'm not satisfied?", a: "We offer a 100% satisfaction guarantee. If you're not happy after the first 2 sessions, we'll issue a full refund." },
    { q: 'Do I need prior experience?', a: 'Most of our courses are beginner-friendly. Check the level listed on each course card — we have options for all experience levels.' },
  ]

  return (
    <section ref={ref} style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <span className="section-number">.06</span>
          <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
          <span className="section-label">FAQ</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px', marginBottom: '3rem' }}
        >
          Common Questions
        </motion.h2>

        <div style={{ maxWidth: '800px' }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}
              style={{ borderBottom: '1px solid rgba(37,99,235,0.08)', padding: '1.75rem 0' }}
            >
              <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '22px', fontWeight: 400, letterSpacing: '1px', color: '#0a0f2e', marginBottom: '0.75rem' }}>{faq.q}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>{faq.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} style={{ marginTop: '3rem' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#9ca3af', marginBottom: '1.5rem' }}>Still have questions? We're happy to help.</p>
          <Link to="/contact" className="btn-glass">Contact Us</Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function CoursesPage() {
  return (
    <>
      <PageHero />
      <div style={{ background: '#f4f7ff' }}>
        <Courses />
      </div>
      <BenefitsSection />
      <FAQSection />
    </>
  )
}
