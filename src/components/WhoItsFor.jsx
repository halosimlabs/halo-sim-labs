const audiences = [
  {
    title: 'Primary Schools',
    grades: 'Grades 3–6',
    body: 'Build the emotional foundations early — empathy, handling frustration, and making kind choices in a safe digital world designed for young learners.',
    features: [
      'Age-appropriate scenario design',
      'Visual storytelling format',
      'Classroom and home modes',
      'Teacher dashboard included',
    ],
  },
  {
    title: 'High Schools',
    grades: 'Grades 7–12',
    body: 'Navigate the complex social landscape of adolescence — identity, relationships, mental health, and peer pressure — with insight and confidence.',
    features: [
      'Advanced scenario depth',
      'Mental health & anxiety modules',
      'Personalised EQ insight reports',
      'Counsellor integration tools',
    ],
    featured: true,
  },
  {
    title: 'Youth Programs',
    grades: 'Ages 8–18',
    body: 'For after-school programs, youth clubs, and NGOs committed to raising emotionally resilient young people beyond the classroom.',
    features: [
      'Flexible group formats',
      'Facilitator guide included',
      'Multi-language support',
      'Impact reporting for funders',
    ],
  },
]

export default function WhoItsFor() {
  return (
    <section id="who" className="section">
      <div className="container">
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', marginBottom: 72 }}>
          <span className="section-eyebrow reveal">Who It's For</span>
          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
            fontWeight: 700,
            color: '#f0f0f5',
            letterSpacing: '-0.025em',
            marginBottom: 20,
            lineHeight: 1.15,
          }} className="reveal reveal-delay-1">
            Built for every level of<br />
            <span style={{ color: 'rgba(240,240,245,0.28)' }}>learning and growth.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          alignItems: 'start',
        }} className="who-grid">
          {audiences.map((a, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                padding: '36px 32px',
                background: a.featured ? 'rgba(139,124,246,0.05)' : 'var(--card)',
                border: a.featured ? '1px solid rgba(139,124,246,0.2)' : '1px solid var(--border)',
                borderRadius: 14,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {a.featured && (
                <>
                  {/* Top accent line */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(139,124,246,0.5), transparent)',
                  }} />
                  {/* Badge */}
                  <div style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#8b7cf6',
                    background: 'rgba(139,124,246,0.1)',
                    border: '1px solid rgba(139,124,246,0.2)',
                    padding: '3px 10px',
                    borderRadius: 50,
                  }}>Most Popular</div>
                </>
              )}

              <div style={{
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: a.featured ? 'rgba(139,124,246,0.6)' : 'rgba(240,240,245,0.25)',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>{a.grades}</div>

              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#f0f0f5',
                marginBottom: 12,
                letterSpacing: '-0.015em',
              }}>{a.title}</h3>

              <p style={{
                fontSize: '0.875rem',
                color: 'rgba(240,240,245,0.38)',
                lineHeight: 1.7,
                marginBottom: 28,
              }}>{a.body}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {a.features.map((f, fi) => (
                  <div key={fi} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: a.featured ? 'rgba(139,124,246,0.15)' : 'rgba(255,255,255,0.05)',
                      border: a.featured ? '1px solid rgba(139,124,246,0.3)' : '1px solid rgba(255,255,255,0.1)',
                      flexShrink: 0,
                      marginTop: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {a.featured && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#8b7cf6' }} />}
                    </div>
                    <span style={{
                      fontSize: '0.845rem',
                      color: a.featured ? 'rgba(240,240,245,0.6)' : 'rgba(240,240,245,0.35)',
                      lineHeight: 1.5,
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .who-grid { grid-template-columns: 1fr !important; max-width: 500px; margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  )
}
