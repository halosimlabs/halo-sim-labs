export default function WhyDifferent() {
  const traditional = [
    'Passive reading and listening',
    'One-size-fits-all worksheets',
    'Easily forgotten after the lesson',
    'No safe space to practice and fail',
    'Emotional skills left to chance',
  ]

  const halo = [
    'Active, decision-based learning',
    'Calibrated per grade and learning stage',
    'Remembered through lived experience',
    'Safe digital environment to explore',
    'Emotional skills built deliberately',
  ]

  return (
    <section id="simulations" className="section">
      <div className="container">
        <div style={{ maxWidth: 600, marginBottom: 72 }}>
          <span className="section-eyebrow reveal">Why Schools Need This</span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#f0f0f5',
            letterSpacing: '-0.025em',
            marginBottom: 20,
            lineHeight: 1.15,
          }} className="reveal reveal-delay-1">
            Experiential learning changes<br />
            <span style={{ color: 'rgba(240,240,245,0.28)' }}>how knowledge sticks.</span>
          </h2>
          <p style={{
            color: 'rgba(240,240,245,0.42)',
            fontSize: '1rem',
            lineHeight: 1.8,
          }} className="reveal reveal-delay-2">
            Traditional SEL curricula rely on explanation. Halo Sim Labs changes
            the paradigm — students don't learn about empathy, they practice it.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }} className="diff-grid">

          {/* Traditional */}
          <div style={{
            padding: '36px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 14,
          }} className="reveal reveal-delay-2">
            <div style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(240,240,245,0.25)',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}>Traditional Approach</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {traditional.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                    marginTop: 1,
                  }} />
                  <span style={{
                    fontSize: '0.9rem',
                    color: 'rgba(240,240,245,0.3)',
                    lineHeight: 1.5,
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Halo approach */}
          <div style={{
            padding: '36px',
            background: 'rgba(139,124,246,0.04)',
            border: '1px solid rgba(139,124,246,0.18)',
            borderRadius: 14,
            position: 'relative',
            overflow: 'hidden',
          }} className="reveal reveal-delay-3">
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(139,124,246,0.45), transparent)',
            }} />
            <div style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(139,124,246,0.65)',
              textTransform: 'uppercase',
              marginBottom: 28,
            }}>Halo Sim Labs</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {halo.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'rgba(139,124,246,0.15)',
                    border: '1px solid rgba(139,124,246,0.35)',
                    flexShrink: 0,
                    marginTop: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#8b7cf6',
                    }} />
                  </div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: 'rgba(240,240,245,0.72)',
                    lineHeight: 1.5,
                  }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .diff-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
