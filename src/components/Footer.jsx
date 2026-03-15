import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Courses', path: '/courses' },
  { label: 'Contact', path: '/contact' },
]

const services = [
  'Custom Management Systems',
  'Web Design & SEO',
  'Social Media Campaigns',
  'Personal Branding',
  'Digital Courses',
]

const tickerItems = ['Digital Innovation', 'Custom Systems', 'Web Design', 'SEO Growth', 'Social Media', 'Personal Branding', 'Digital Courses', 'Sri Lanka']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#060b24',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      {/* Ticker strip */}
      <div style={{
        background: '#060b24',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '1rem 0', overflow: 'hidden',
      }}>
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'inline-flex', gap: '3rem', paddingRight: '3rem' }}>
              {tickerItems.map(item => (
                <span key={item} style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '10px',
                  color: '#333', letterSpacing: '4px', textTransform: 'uppercase',
                  whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '1.5rem',
                }}>
                  {item}
                  <span style={{ color: '#2563eb', fontSize: '6px', opacity: 0.7 }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-wrap max-w-7xl mx-auto">
        <div className="footer-main-grid">
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px', height: '32px', background: '#2563eb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#ffffff', fontFamily: 'Bebas Neue, sans-serif', fontSize: '17px', letterSpacing: '1px' }}>SF</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '14px', color: '#ffffff', letterSpacing: '3px', lineHeight: 1 }}>Digital Solutions</div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', marginTop: '2px' }}>Sri Lanka</div>
                </div>
              </div>
            </Link>

            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Empowering Sri Lankan businesses through digital innovation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="tel:+94701988102"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#ffffff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >070 1988 102</a>
              <a href="mailto:sfdigitalsolution@mail.com"
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '1px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#ffffff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
              >sfdigitalsolution@mail.com</a>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>Sri Lanka</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#3b82f6', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map(link => (
                <Link key={link.path} to={link.path}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#3b82f6', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {services.map(s => (
                <Link key={s} to="/services"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#ffffff'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}
                >{s}</Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#3b82f6', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Ready to Start?</h4>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Let's transform your business together.
            </p>
            <Link to="/contact" className="btn-primary-glass" style={{ fontSize: '10px', padding: '10px 22px' }}>
              Get Started →
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '2rem',
          display: 'flex', flexWrap: 'wrap', gap: '1rem',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
            © {year} SF Digital Solutions. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
            Crafted with precision in Sri Lanka
          </p>
        </div>
      </div>
    </footer>
  )
}
