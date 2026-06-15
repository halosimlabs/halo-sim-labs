/* Section — Inclusive Design */

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

        {/* Body */}
        <p
          className="reveal reveal-delay-3"
          style={{
            fontSize: '1rem',
            color: '#C9C9C9',
            lineHeight: 1.85,
            maxWidth: 680,
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          Halo Sim Labs is built for all students. As part of our long-term innovation roadmap,
          we are also developing sign language-based simulation experiences for deaf learners,
          ensuring that emotional intelligence education remains accessible, engaging, and relevant
          for every student.
        </p>

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
