/* Footer — minimal, honest */

export default function Footer() {
  const links = [
    { label: 'Why It Matters', href: '#why' },
    { label: 'About',          href: '#about' },
    { label: 'Inclusive',      href: '#inclusive' },
    { label: 'Waitlist',       href: '#waitlist' },
  ]

  return (
    <footer style={{
      background: '#0B0B0B',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '48px 0 36px',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 36,
        }}>
          {/* Brand */}
          <a href="#" aria-label="Halo Sim Labs — go to top" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.svg"
              alt="Halo Sim Labs"
              style={{
                height: 468,
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.5,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
            />
          </a>

          {/* Nav links */}
          <nav aria-label="Footer navigation" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(245,245,245,0.28)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,245,245,0.65)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,245,0.28)'}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <a
            href="mailto:info@halosimlabs.com"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              color: 'rgba(245,245,245,0.28)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,245,245,0.65)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,245,0.28)'}
          >
            info@halosimlabs.com
          </a>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            color: 'rgba(245,245,245,0.18)',
          }}>
            © 2026 Halo Sim Labs.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            color: 'rgba(245,245,245,0.12)',
          }}>
            Built with care.
          </p>
        </div>
      </div>
    </footer>
  )
}
