import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const badgeColors = {
  'Most Popular': { bg: 'rgba(30,111,255,0.2)', border: 'rgba(30,111,255,0.5)', text: '#4d9fff', glow: 'rgba(30,111,255,0.4)' },
  'New':          { bg: 'rgba(41,121,255,0.15)', border: 'rgba(41,121,255,0.5)', text: '#818cf8', glow: 'rgba(41,121,255,0.35)' },
}

const courses = [
  {
    id: '01', title: 'Digital Marketing Mastery', subtitle: 'Foundation Course',
    duration: '8 Weeks', sessions: '24 Sessions', level: 'Beginner',
    price: 'LKR 25,000',
    topics: ['Social Media Strategy', 'Content Creation', 'Paid Ads', 'Analytics', 'SEO Basics', 'Email Marketing'],
    badge: 'Most Popular',
  },
  {
    id: '02', title: 'Web Design Fundamentals', subtitle: 'Design & Development',
    duration: '10 Weeks', sessions: '30 Sessions', level: 'Beginner–Intermediate',
    price: 'LKR 30,000',
    topics: ['HTML & CSS', 'Figma UI Design', 'WordPress', 'Responsive Design', 'Basic JavaScript', 'Deployment'],
    badge: 'New',
  },
  {
    id: '03', title: 'Advanced Social Media', subtitle: 'Growth & Monetization',
    duration: '6 Weeks', sessions: '18 Sessions', level: 'Intermediate',
    price: 'LKR 20,000',
    topics: ['Content Strategy', 'Paid Ads', 'Analytics', 'Influencer Marketing'],
    badge: null,
  },
  {
    id: '04', title: 'Personal Branding Blueprint', subtitle: 'Identity & Positioning',
    duration: '4 Weeks', sessions: '12 Sessions', level: 'All Levels',
    price: 'LKR 15,000',
    topics: ['Brand Story', 'Visual Identity', 'LinkedIn Mastery', 'Content Strategy', 'Public Speaking', 'Networking'],
    badge: null,
  },
]

function CourseCard({ course, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const bc = course.badge ? badgeColors[course.badge] : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="light-sweep-wrap"
      style={{
        background: 'rgba(8,20,48,0.9)',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        borderLeft: '2px solid rgba(30,111,255,0.2)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{
        boxShadow: '0 8px 40px rgba(30,111,255,0.15), -2px 0 0 #4d9fff',
        borderLeftColor: '#4d9fff',
        backgroundColor: 'rgba(13,33,71,0.95)',
      }}
    >
      {/* Top area */}
      <div style={{ padding: '2.5rem 2rem 2rem', borderBottom: '1px solid rgba(30,111,255,0.08)', flex: 1 }}>
        {/* Badge + number row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          {bc ? (
            <span className="badge-pulse" style={{
              fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '10px',
              padding: '4px 12px',
              background: bc.bg,
              border: `1px solid ${bc.border}`,
              color: bc.text,
              letterSpacing: '2px', textTransform: 'uppercase',
            }}>{course.badge}</span>
          ) : <span />}
          <span style={{
            fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '11px',
            color: 'rgba(30,111,255,0.3)', letterSpacing: '2px',
          }}>{course.id}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Orbitron, sans-serif', fontSize: '15px', fontWeight: 700,
          letterSpacing: '1px', lineHeight: 1.3, color: '#d6eaff', marginBottom: '0.4rem',
        }}>{course.title}</h3>

        <p style={{
          fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px',
          color: '#1e6fff', letterSpacing: '3px', textTransform: 'uppercase',
          marginBottom: '2rem',
        }}>{course.subtitle}</p>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Duration', value: course.duration },
            { label: 'Sessions', value: course.sessions },
            { label: 'Level', value: course.level },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(107,159,212,0.35)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 400, fontSize: '12px', color: 'rgba(107,159,212,0.8)' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(107,159,212,0.35)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Topics</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {course.topics.map(topic => (
              <span key={topic} style={{
                fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '10px',
                padding: '3px 10px',
                background: 'rgba(30,111,255,0.07)',
                color: 'rgba(77,159,255,0.75)',
                border: '1px solid rgba(30,111,255,0.18)',
                letterSpacing: '1px', textTransform: 'uppercase',
              }}>{topic}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Price + CTA */}
      <div style={{
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        background: 'rgba(7,16,32,0.5)',
      }}>
        <div>
          <div style={{ fontFamily: 'Rajdhani, sans-serif', fontWeight: 600, fontSize: '9px', color: 'rgba(107,159,212,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Enrollment Fee</div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif', fontSize: '22px', fontWeight: 700,
            letterSpacing: '1px', color: '#4d9fff',
            textShadow: '0 0 16px rgba(77,159,255,0.5)',
          }}>{course.price}</div>
        </div>
        <Link to="/contact" className="btn-primary-glass" style={{ fontSize: '11px', padding: '10px 20px', minHeight: '42px' }}>
          Enroll Now
        </Link>
      </div>
    </motion.div>
  )
}

export default function Courses({ limit }) {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })
  const displayed = limit ? courses.slice(0, limit) : courses

  return (
    <section style={{ padding: '4rem 0', position: 'relative', borderBottom: '1px solid rgba(30,111,255,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.04</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(30,111,255,0.3)' }} />
            <span className="section-label">Learn & Grow</span>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(36px, 5vw, 80px)', fontWeight: 900, color: '#d6eaff', lineHeight: 0.95, letterSpacing: '2px' }}
            >
              DIGITAL COURSES<br />
              <span style={{ WebkitTextStroke: '1.5px rgba(77,159,255,0.7)', color: 'transparent' }}>FOR SRI LANKA</span>
            </motion.h2>
            {!limit && (
              <motion.p
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '14px', color: 'rgba(107,159,212,0.7)', maxWidth: '300px', lineHeight: 1.75 }}
              >
                Hands-on training designed for entrepreneurs and professionals ready to master the digital landscape.
              </motion.p>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="courses-grid">
          {displayed.map((course, i) => <CourseCard key={course.id} course={course} index={i} />)}
        </div>

        {limit && (
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}
            style={{ marginTop: '3rem' }}
          >
            <Link to="/courses" className="btn-glass">View All Courses</Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
