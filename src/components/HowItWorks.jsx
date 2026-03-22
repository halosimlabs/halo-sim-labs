export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose a Scenario',
      body: 'Students browse a library of real-world situations tailored to their grade level — from peer conflict to identity to mental health.',
    },
    {
      num: '02',
      title: 'Enter the Simulation',
      body: 'They step into an immersive digital environment where the scenario unfolds with context, characters, and real emotional stakes.',
    },
    {
      num: '03',
      title: 'Make Decisions',
      body: 'At key moments, students choose how to respond. Every choice is meaningful — and each path through the story is unique.',
    },
    {
      num: '04',
      title: 'Receive Insight',
      body: 'After each simulation, students and educators receive personalised insight on decisions, emotional patterns, and growth.',
    },
  ]

  return (
    <section id="how-it-works" className="section" style={{
      background: 'var(--surface)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div className="container">
        <div style={{ maxWidth: 580, margin: '0 auto', textAlign: 'center', marginBottom: 80 }}>
          <span className="section-eyebrow reveal">How It Works</span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#f0f0f5',
            letterSpacing: '-0.025em',
            marginBottom: 20,
            lineHeight: 1.15,
          }} className="reveal reveal-delay-1">
            From scenario to insight<br />
            <span style={{ color: 'rgba(240,240,245,0.28)' }}>in four steps.</span>
          </h2>
          <p style={{
            color: 'rgba(240,240,245,0.42)',
            fontSize: '0.97rem',
            lineHeight: 1.8,
          }} className="reveal reveal-delay-2">
            Every simulation guides students through a structured journey that builds
            real emotional skill — not just awareness.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
        }} className="steps-grid">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                padding: '36px 28px',
                background: 'var(--card)',
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
                color: 'rgba(139,124,246,0.45)',
                marginBottom: 20,
              }}>{s.num}</div>
              {/* Connecting accent */}
              <div style={{
                width: 28,
                height: 2,
                background: 'rgba(139,124,246,0.3)',
                borderRadius: 1,
                marginBottom: 20,
              }} />
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#f0f0f5',
                marginBottom: 12,
                letterSpacing: '-0.01em',
              }}>{s.title}</h3>
              <p style={{
                fontSize: '0.855rem',
                color: 'rgba(240,240,245,0.38)',
                lineHeight: 1.7,
              }}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Bottom link */}
        <div style={{ textAlign: 'center', marginTop: 52 }} className="reveal reveal-delay-3">
          <a href="#contact" className="btn-ghost" style={{ fontSize: '0.875rem' }}>
            Request a walkthrough →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
