/* Section 2 — Why It Matters */

const stats = [
  {
    figure: '1 in 7',
    statement: 'children and adolescents aged 10–19 experience a mental health condition globally.',
    source: 'WHO / UNICEF',
  },
  {
    figure: '3rd',
    statement: 'Suicide is the third leading cause of death among young people aged 15–29 worldwide.',
    source: 'World Health Organization',
  },
  {
    figure: '1 in 3',
    statement: 'students report being bullied by peers at school at least once in the last month.',
    source: 'UNESCO',
  },
]

export default function WhyItMatters() {
  return (
    <section
      id="why"
      className="section"
      style={{ background: '#1A1A1A' }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <span className="eyebrow reveal">The Challenge</span>
          <h2 className="reveal reveal-delay-1" style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#F5F5F5',
            maxWidth: 520,
            lineHeight: 1.15,
          }}>
            Why Emotional Intelligence Matters
          </h2>
        </div>

        {/* Stat cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          marginBottom: 64,
        }} className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: '#0B0B0B',
                padding: '40px 36px',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(2.4rem, 4vw, 3.4rem)',
                fontWeight: 800,
                color: '#F5F5F5',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                marginBottom: 16,
              }}>
                {s.figure}
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: '#C9C9C9',
                lineHeight: 1.65,
                marginBottom: 20,
              }}>
                {s.statement}
              </p>
              <span style={{
                display: 'inline-block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,245,0.28)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                paddingTop: 14,
                width: '100%',
              }}>
                Source: {s.source}
              </span>
            </div>
          ))}
        </div>

        {/* Body paragraph */}
        <div className="reveal" style={{ maxWidth: 680 }}>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(245,245,245,0.5)',
            lineHeight: 1.85,
          }}>
            Students face emotional and social challenges every day, yet practical emotional
            skills are rarely taught in ways that feel real or experiential. Halo Sim Labs
            explores how immersive learning experiences could help students better understand
            empathy, communication, and emotional awareness.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .stats-grid { grid-template-columns: 1fr !important; gap: 2px !important; }
          .stats-grid > div { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.05); }
          .stats-grid > div:first-child { border-top: none; }
        }
      `}</style>
    </section>
  )
}
