/* Section — Inclusive Design */

const pillars = [
  {
    label: '01',
    title: 'If you read differently',
    desc: 'Switch to a dyslexia-friendly font with one tap. Spacing, line height, everything adjusts. Reading should not be the hard part.',
  },
  {
    label: '02',
    title: 'If motion is overwhelming',
    desc: 'Every animation can be turned off. Not scaled back. Off. Some students need stillness to focus, and that is completely valid.',
  },
  {
    label: '03',
    title: 'If screens are hard to see',
    desc: 'High-contrast mode cranks the visibility up. Large text mode goes further. Screen readers find everything properly labelled.',
  },
  {
    label: '04',
    title: 'If sound does not reach you',
    desc: 'Nothing important lives only in audio. Captions, on-screen text cues, and visual feedback are built in from the start.',
  },
  {
    label: '05',
    title: 'If a mouse is not an option',
    desc: 'Every part of the platform works with a keyboard. No traps, no dead ends. Tab through the whole thing if you need to.',
  },
  {
    label: '06',
    title: 'If you need things predictable',
    desc: 'Consistent layouts. No surprise pop-ups. Clear signposting before anything changes. The experience behaves the way you expect.',
  },
]

export default function Inclusive() {
  return (
    <section
      id="inclusive"
      className="section"
      style={{ background: '#0F0F0F' }}
      aria-labelledby="inclusive-heading"
    >
      <div className="container">

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 72 }}>
          <span className="eyebrow reveal">Access</span>
          <h2
            id="inclusive-heading"
            className="reveal reveal-delay-1"
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Not designed for the average student.
            <br />
            <span style={{ color: 'rgba(245,245,245,0.3)' }}>Designed for all of them.</span>
          </h2>
          <p
            className="reveal reveal-delay-2"
            style={{
              fontSize: '1rem',
              color: '#C9C9C9',
              lineHeight: 1.85,
              marginBottom: 12,
            }}
          >
            More than 600,000 children in South Africa live with a disability.
            Most edtech was not built with them in mind. We think that is worth changing.
          </p>
          <p
            className="reveal reveal-delay-3"
            style={{
              fontSize: '0.875rem',
              color: 'rgba(245,245,245,0.35)',
              lineHeight: 1.75,
            }}
          >
            Accessibility here is not a checklist. It is a starting point.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: 1,
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        >
          {pillars.map((p, i) => (
            <article
              key={p.label}
              className={`reveal reveal-delay-${(i % 4) + 1}`}
              style={{
                background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.025)',
                padding: '32px 28px 36px',
                borderRight: (i + 1) % 3 !== 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                borderBottom: i < pillars.length - 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span style={{
                display: 'block',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: 'rgba(245,245,245,0.2)',
                marginBottom: 20,
              }} aria-hidden="true">
                {p.label}
              </span>
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#F5F5F5',
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: 'rgba(245,245,245,0.4)',
                lineHeight: 1.8,
              }}>
                {p.desc}
              </p>
            </article>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #inclusive article {
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  )
}
