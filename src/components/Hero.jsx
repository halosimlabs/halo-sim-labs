/* Hero — full-viewport, centered editorial layout with halo ring visual */

const HaloRings = () => (
  <svg
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'min(700px, 90vw)',
      height: 'min(700px, 90vw)',
      pointerEvents: 'none',
      opacity: 0.5,
    }}
    viewBox="0 0 700 700"
  >
    {[120, 180, 240, 300, 360].map((r, i) => (
      <circle
        key={r}
        cx="350"
        cy="350"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        style={{
          animation: `haloRing ${6 + i * 2}s ease-in-out ${i * 0.8}s infinite`,
          transformOrigin: '350px 350px',
        }}
      />
    ))}
    {/* Faint cross-hair lines */}
    <line x1="350" y1="50" x2="350" y2="650" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
    <line x1="50" y1="350" x2="650" y2="350" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />
  </svg>
)

export default function Hero() {
  return (
    <>
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        background: '#0B0B0B',
      }}
    >
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.025) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Halo ring visual */}
      <HaloRings />

      {/* Content — page 1: headline only */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: 800,
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginBottom: 40,
          animation: 'fadeUp 0.7s ease both',
        }}>
          <div style={{ width: 28, height: 1, background: 'rgba(245,245,245,0.15)' }} />
          <span style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.35)',
          }}>
            Simulation-Based Learning
          </span>
          <div style={{ width: 28, height: 1, background: 'rgba(245,245,245,0.15)' }} />
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          marginBottom: 12,
          animation: 'fadeUp 0.7s 0.1s ease both',
        }}>
          <span style={{ color: 'rgba(245,245,245,0.3)' }}>Schools teach theory.</span>
        </h1>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: '-0.03em',
          color: '#F5F5F5',
          marginBottom: 0,
          animation: 'fadeUp 0.7s 0.15s ease both',
        }}>
          We teach emotional intelligence.
        </h1>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        background: 'linear-gradient(to top, #0B0B0B, transparent)',
        pointerEvents: 'none',
      }} />
    </section>

    {/* Page 2 — supporting content */}
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: '#0B0B0B',
    }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: '#C9C9C9',
          lineHeight: 1.7,
          maxWidth: 620,
          margin: '0 0 20px',
          fontWeight: 400,
          animation: 'fadeUp 0.7s 0.1s ease both',
        }}>
          Halo Sim Labs is exploring how simulation-based learning could help students
          build empathy, self-awareness, and real-world decision-making skills.
        </p>

        <p style={{
          fontSize: 'clamp(0.875rem, 1.3vw, 0.95rem)',
          color: 'rgba(245,245,245,0.38)',
          lineHeight: 1.8,
          maxWidth: 540,
          margin: '0 0 52px',
          fontWeight: 400,
          animation: 'fadeUp 0.7s 0.18s ease both',
        }}>
          Young people face social pressure, anxiety, bullying, and complex emotional
          situations every day. Halo Sim Labs exists to explore new ways of helping
          students practice emotional intelligence through experience, not just theory.
        </p>

        <div style={{
          display: 'flex',
          gap: 14,
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.26s ease both',
        }}>
          <a href="#waitlist" className="btn-primary" style={{ fontSize: '0.9rem', padding: '14px 30px' }}>
            Join the Waitlist
          </a>
          <a href="#why" className="btn-ghost" style={{ fontSize: '0.9rem', padding: '14px 30px' }}>
            Learn More
          </a>
        </div>
      </div>
    </section>
    </>
  )
}
