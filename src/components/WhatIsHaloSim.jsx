/* Section 3 — What is Halo Sim Labs? */

export default function WhatIsHaloSim() {
  return (
    <section
      id="about"
      className="section"
      style={{ background: '#0B0B0B' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 80,
          alignItems: 'start',
        }} className="about-grid">

          {/* Left — label + concept tag */}
          <div className="reveal">
            <span className="eyebrow" style={{ display: 'block', marginBottom: 24 }}>
              The Concept
            </span>

            {/* Tagline */}
            <blockquote style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'rgba(245,245,245,0.3)',
              lineHeight: 1.7,
              borderLeft: '2px solid rgba(255,255,255,0.1)',
              paddingLeft: 16,
              maxWidth: 220,
            }}>
              "Emotional intelligence cannot be memorized. It has to be experienced."
            </blockquote>
          </div>

          {/* Right — body text */}
          <div>
            <h2 className="reveal" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.15,
              marginBottom: 36,
            }}>
              What is Halo Sim Labs?
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p className="reveal reveal-delay-1" style={{
                fontSize: '1rem',
                color: '#C9C9C9',
                lineHeight: 1.85,
              }}>
                Halo Sim Labs is focused on simulation-based emotional learning.
                The idea is to create guided digital experiences where students can
                engage with realistic social and emotional situations and reflect
                on the choices they make.
              </p>

              <p className="reveal reveal-delay-2" style={{
                fontSize: '1rem',
                color: '#C9C9C9',
                lineHeight: 1.85,
              }}>
                Rather than memorizing definitions of empathy or emotional intelligence,
                learners would interact with scenarios that encourage reflection,
                perspective-taking, and thoughtful decision-making.
              </p>

              <p className="reveal reveal-delay-3" style={{
                fontSize: '1rem',
                color: 'rgba(245,245,245,0.45)',
                lineHeight: 1.85,
              }}>
                The goal is to build tools that help students practice emotional
                intelligence in meaningful ways.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
