export default function WhatIs() {
  const pillars = [
    {
      num: '01',
      title: 'Simulation-Based',
      body: 'Students step inside carefully crafted scenarios that mirror real social and emotional challenges they face at school, at home, and with peers.',
    },
    {
      num: '02',
      title: 'Curriculum-Aligned',
      body: 'Every simulation maps to SEL competencies and integrates into existing class time without disrupting the school schedule.',
    },
    {
      num: '03',
      title: 'Measurable Outcomes',
      body: 'Educators receive insight reports tracking empathy development, decision patterns, and emotional growth over time.',
    },
  ]

  return (
    <section id="about" className="section" style={{
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }} className="whatis-grid">

          {/* Left */}
          <div>
            <span className="section-eyebrow reveal">What We Build</span>
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#f0f0f5',
              marginBottom: 24,
              letterSpacing: '-0.025em',
            }} className="reveal reveal-delay-1">
              A laboratory for<br />
              <span style={{ color: 'rgba(240,240,245,0.28)' }}>human understanding.</span>
            </h2>
            <p style={{
              color: 'rgba(240,240,245,0.5)',
              fontSize: '1rem',
              lineHeight: 1.8,
              maxWidth: 420,
              marginBottom: 24,
            }} className="reveal reveal-delay-2">
              Halo Sim Labs is an educational technology company building simulation-based
              experiences that develop social-emotional intelligence in students ages 9–18.
            </p>
            <p style={{
              color: 'rgba(240,240,245,0.35)',
              fontSize: '0.93rem',
              lineHeight: 1.8,
              maxWidth: 420,
            }} className="reveal reveal-delay-3">
              We believe the skills that matter most in life — empathy, self-regulation,
              conflict resolution — cannot be taught through lectures. They require practice
              in realistic, safe environments.
            </p>
          </div>

          {/* Right: Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {pillars.map((p, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 2}`}
                style={{
                  padding: '26px 30px',
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: i === 0 ? '12px 12px 0 0' : i === 2 ? '0 0 12px 12px' : 0,
                  transition: 'background 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#161624'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--card)'}
              >
                <div style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  color: 'rgba(139,124,246,0.5)',
                  marginBottom: 8,
                }}>{p.num}</div>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#f0f0f5',
                  marginBottom: 7,
                  letterSpacing: '-0.01em',
                }}>{p.title}</div>
                <p style={{
                  fontSize: '0.855rem',
                  color: 'rgba(240,240,245,0.4)',
                  lineHeight: 1.7,
                }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .whatis-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  )
}
