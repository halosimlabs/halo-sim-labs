export default function Problem() {
  const data = [
    {
      num: '1 in 5',
      label: 'students experience significant mental health challenges before age 18',
    },
    {
      num: '58%',
      label: 'of teachers report students lack basic empathy and conflict resolution skills',
    },
    {
      num: '7×',
      label: 'greater impact when SEL is practiced through experience vs. passive instruction',
    },
  ]

  return (
    <section id="why-it-matters" className="section" style={{
      background: 'var(--surface)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div className="container">
        <div style={{ maxWidth: 660, margin: '0 auto', textAlign: 'center', marginBottom: 72 }}>
          <span className="section-eyebrow reveal">Why It Matters</span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#f0f0f5',
            letterSpacing: '-0.025em',
            marginBottom: 20,
            lineHeight: 1.15,
          }} className="reveal reveal-delay-1">
            Emotional intelligence is the{' '}
            <span style={{ color: 'rgba(240,240,245,0.28)' }}>defining skill</span>{' '}
            of the 21st century.
          </h2>
          <p style={{
            color: 'rgba(240,240,245,0.42)',
            fontSize: '1rem',
            lineHeight: 1.8,
          }} className="reveal reveal-delay-2">
            Schools teach math and science with precision, yet emotional intelligence —
            proven to predict success, relationships, and wellbeing more reliably than IQ —
            is left entirely to chance.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'var(--border)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          marginBottom: 72,
        }} className="prob-grid reveal reveal-delay-2">
          {data.map((d, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              background: 'var(--card)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(2rem, 3vw, 2.6rem)',
                fontWeight: 800,
                color: '#f0f0f5',
                letterSpacing: '-0.03em',
                marginBottom: 12,
              }}>{d.num}</div>
              <p style={{
                fontSize: '0.845rem',
                color: 'rgba(240,240,245,0.35)',
                lineHeight: 1.65,
                maxWidth: 200,
                margin: '0 auto',
              }}>{d.label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center',
          padding: '48px 40px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          position: 'relative',
        }} className="reveal reveal-delay-3">
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 36,
            height: 2,
            background: 'var(--accent)',
            borderRadius: 1,
          }} />
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            fontWeight: 400,
            color: 'rgba(240,240,245,0.62)',
            lineHeight: 1.65,
            letterSpacing: '-0.01em',
            fontStyle: 'italic',
          }}>
            "Emotional intelligence cannot be memorized.<br />
            It has to be experienced."
          </p>
          <div style={{
            marginTop: 20,
            fontSize: '0.68rem',
            color: 'rgba(240,240,245,0.22)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>Halo Sim Labs</div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .prob-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
