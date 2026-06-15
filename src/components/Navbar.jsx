import { useState, useEffect } from 'react'

export default function Navbar({ onOpenDemo }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const links = [
    { label: 'Why It Matters', href: '#why' },
    { label: 'About',          href: '#about' },
    { label: 'Inclusive',      href: '#inclusive' },
    { label: 'Waitlist',       href: '#waitlist' },
  ]

  return (
    <nav
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(11,11,11,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div className="container nav-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 100,
      }}>
        {/* Logo */}
        <a href="#" aria-label="Halo Sim Labs — go to top" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo.svg"
            alt="Halo Sim Labs"
            className="nav-logo"
            style={{
              height: 360,
              width: 'auto',
              marginTop: 12,
              filter: 'brightness(0) invert(1)',
              opacity: 0.5,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
          />
        </a>

        {/* Desktop nav */}
        <ul className="nav-links" role="list" style={{
          display: 'flex',
          gap: 36,
          listStyle: 'none',
          alignItems: 'center',
        }}>
          {links.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{
                  color: 'rgba(245,245,245,0.45)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.target.style.color = 'rgba(245,245,245,0.9)'}
                onMouseLeave={e => e.target.style.color = 'rgba(245,245,245,0.45)'}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA — hidden on mobile */}
        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 40 }}>
          <button onClick={onOpenDemo} style={{
            fontSize: '0.85rem',
            padding: '10px 20px',
            borderRadius: 8,
            background: 'rgba(139, 124, 246, 0.18)',
            color: '#c4baff',
            border: '1px solid rgba(139, 124, 246, 0.3)',
            fontWeight: 600,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s ease, border-color 0.2s ease',
            cursor: 'pointer',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,124,246,0.28)'; e.currentTarget.style.borderColor = 'rgba(139,124,246,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,124,246,0.18)'; e.currentTarget.style.borderColor = 'rgba(139,124,246,0.3)' }}
          >
            Request Demo
          </button>
          <a href="#waitlist" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
            Join the Waitlist
          </a>
        </div>

        {/* Demo button — mobile only */}
        <button
          onClick={onOpenDemo}
          className="nav-demo-mobile"
          style={{
            display: 'none',
            fontSize: '0.75rem',
            padding: '8px 14px',
            borderRadius: 7,
            background: 'rgba(139, 124, 246, 0.18)',
            color: '#c4baff',
            border: '1px solid rgba(139, 124, 246, 0.3)',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            marginRight: 10,
          }}
        >
          Request Demo
        </button>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 6,
            flexDirection: 'column',
            gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: 20,
              height: 1.5,
              background: 'rgba(245,245,245,0.75)',
              borderRadius: 1,
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: mobileOpen
                ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'none'
                : 'none',
              opacity: mobileOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        style={{
          maxHeight: mobileOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
          background: 'rgba(11,11,11,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: mobileOpen ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ padding: '20px 28px 28px' }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '14px 0',
                color: 'rgba(245,245,245,0.55)',
                fontSize: '1rem',
                fontWeight: 500,
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            <button
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => { setMobileOpen(false); onOpenDemo() }}
              style={{
                display: 'inline-flex',
                fontSize: '0.875rem',
                padding: '10px 20px',
                borderRadius: 8,
                background: 'rgba(139, 124, 246, 0.18)',
                color: '#c4baff',
                border: '1px solid rgba(139, 124, 246, 0.3)',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Request Demo
            </button>
            <a
              href="#waitlist"
              className="btn-primary"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'inline-flex', fontSize: '0.875rem' }}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .nav-logo { height: 180px !important; }
          .nav-container { height: 70px !important; }
          .nav-demo-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
