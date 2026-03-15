import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{
        background: '#ffffff',
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        borderLeft: '3px solid #2563eb',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Top area */}
      <div style={{ padding: '2.5rem 2rem 2rem', borderBottom: '1px solid rgba(37,99,235,0.08)', flex: 1 }}>
        {/* Badge + number row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
          {course.badge ? (
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: '9px',
              padding: '4px 12px',
              background: course.badge === 'Most Popular' ? '#2563eb' : '#ffffff',
              border: course.badge === 'New' ? '1px solid #2563eb' : 'none',
              color: course.badge === 'Most Popular' ? '#ffffff' : '#2563eb',
              letterSpacing: '2px', textTransform: 'uppercase',
            }}>{course.badge}</span>
          ) : <span />}
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '10px',
            color: '#9ca3af', letterSpacing: '2px',
          }}>{course.id}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', fontWeight: 400,
          letterSpacing: '1px', lineHeight: 1, color: '#0a0f2e', marginBottom: '0.4rem',
        }}>{course.title}</h3>

        <p style={{
          fontFamily: 'Space Mono, monospace', fontSize: '9px',
          color: '#2563eb', letterSpacing: '3px', textTransform: 'uppercase',
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
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '12px', color: '#4b5563' }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Topics</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {course.topics.map(topic => (
              <span key={topic} style={{
                fontFamily: 'Space Mono, monospace', fontSize: '9px',
                padding: '4px 10px',
                background: '#eff6ff',
                color: '#2563eb', letterSpacing: '1px', textTransform: 'uppercase',
              }}>{topic}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: Price + CTA */}
      <div style={{
        padding: '1.5rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        background: '#f9fafb',
      }}>
        <div>
          <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>Enrollment Fee</div>
          <div style={{
            fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', fontWeight: 400,
            letterSpacing: '1px', color: '#2563eb',
          }}>{course.price}</div>
        </div>
        <Link to="/contact" className="btn-primary-glass" style={{ fontSize: '10px', padding: '10px 20px' }}>
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
    <section style={{ padding: '5rem 0', position: 'relative', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.04</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
            <span className="section-label">Learn & Grow</span>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem' }}>
            <motion.h2
              initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
              style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px' }}
            >
              Digital Courses<br />For Sri Lanka
            </motion.h2>
            {!limit && (
              <motion.p
                initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', maxWidth: '300px', lineHeight: 1.75 }}
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
