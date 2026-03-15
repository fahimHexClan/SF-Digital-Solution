import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const WHATSAPP_NUMBER = '94701988102'
const EMAIL = 'sfdigitalsolution@mail.com'
const PHONE = '070 1988 102'

export default function Contact() {
  const titleRef = useRef(null)
  const isInView = useInView(titleRef, { once: true })
  const formRef = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const subject = encodeURIComponent(`[SF Digital] Project Inquiry from ${formData.name}`)
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\n\nMessage:\n${formData.message}`)
      window.open(`mailto:${EMAIL}?subject=${subject}&body=${body}`, '_blank')
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    } catch { setStatus('error') }
    setTimeout(() => setStatus('idle'), 4000)
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi SF Digital Solutions! I'd like to discuss a project.")
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const services = ['Custom Management System', 'Web Design & SEO', 'Social Media Campaign', 'Personal Branding', 'Digital Course Enrollment', 'Other']

  return (
    <section style={{ padding: '5rem 0', position: 'relative', background: '#ffffff', borderBottom: '1px solid rgba(37,99,235,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}
          >
            <span className="section-number">.05</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(37,99,235,0.2)' }} />
            <span className="section-label">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 6vw, 96px)', fontWeight: 400, color: '#0a0f2e', lineHeight: 0.92, letterSpacing: '1px' }}
          >
            Let's Build<br />Something Great
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
          >
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', lineHeight: 1.75, marginBottom: '3rem' }}>
              Ready to transform your business digitally? Reach out and let's craft a tailored digital strategy that delivers real results.
            </p>

            {/* Contact details */}
            {[
              { label: 'Phone', value: PHONE, href: `tel:+${WHATSAPP_NUMBER}` },
              { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
              { label: 'Location', value: 'Sri Lanka', href: null },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '36px', height: '36px', background: '#eff6ff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: '#2563eb', fontSize: '14px',
                }}>◉</div>
                <div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#2563eb', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#2563eb'}
                      onMouseLeave={e => e.target.style.color = '#4b5563'}
                    >{item.value}</a>
                  ) : (
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '14px', color: '#4b5563' }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div style={{ width: '100%', height: '1px', background: 'rgba(37,99,235,0.1)', marginBottom: '2rem' }} />

            {/* WhatsApp button */}
            <button
              onClick={openWhatsApp}
              className="btn-glass"
              style={{ width: '100%', justifyContent: 'center', gap: '0.75rem', display: 'flex', alignItems: 'center' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(37,99,235,0.1)',
              padding: '2.5rem',
              boxShadow: '0 4px 24px rgba(37,99,235,0.06)',
            }}
          >
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-row-2" style={{ marginBottom: '1px' }}>
                <input className="form-input" type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} required />
                <input className="form-input" type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-row-2" style={{ marginBottom: '1px' }}>
                <input className="form-input" type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                <select className="form-input" name="service" value={formData.service} onChange={handleChange} style={{ cursor: 'pointer' }} required>
                  <option value="" disabled>Select Service *</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <textarea
                className="form-input"
                name="message" rows={5}
                placeholder="Tell us about your project... *"
                value={formData.message} onChange={handleChange} required
                style={{ resize: 'vertical', marginBottom: '1px' }}
              />

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    background: '#eff6ff',
                    border: '1px solid rgba(37,99,235,0.2)',
                    fontFamily: 'Space Mono, monospace', fontSize: '10px',
                    color: '#2563eb', letterSpacing: '1px', marginBottom: '1px',
                  }}
                >
                  MESSAGE SENT — We'll respond within 24 hours.
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary-glass"
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
