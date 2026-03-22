export default function Mission() {
  return (
    <section id="mission" className="section" style={{
      background: 'linear-gradient(135deg, #0a0b18 0%, #0d0e1a 50%, #0a0b18 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,142,247,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 860, margin: '0 auto' }}>

        <span className="section-label reveal">Our Mission</span>

        <h2 className="reveal" style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 28,
        }}>
          We're not preparing students<br />
          for <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>exams</span>.<br />
          We're preparing them for{' '}
          <span className="gradient-text">life.</span>
        </h2>

        <p className="reveal" style={{
          color: 'var(--text-muted)',
          fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
          lineHeight: 1.8,
          maxWidth: 660,
          margin: '0 auto 56px',
        }}>
          Our mission is simple: give every student, regardless of background or school resources,
          access to the emotional tools they need to navigate life with confidence, compassion, and resilience.
        </p>

        {/* Value pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          maxWidth: 700,
          margin: '0 auto',
        }} className="pillars-grid">
          {[
            {
              icon: '💙',
              title: 'Empathy First',
              desc: 'Every simulation, every scenario, every piece of design starts with one question: how does the student feel? Empathy is not a module — it\'s the foundation.',
              color: '#4f8ef7',
            },
            {
              icon: '🔬',
              title: 'Science-Backed',
              desc: 'Our curriculum is built in collaboration with child psychologists, educators, and neuroscientists. Every scenario is grounded in evidence-based SEL frameworks.',
              color: '#7c5cbf',
            },
          ].map((pillar, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '28px 24px',
                textAlign: 'left',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 0 1px ${pillar.color}30`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                fontSize: '1.8rem',
                marginBottom: 14,
              }}>{pillar.icon}</div>
              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1.05rem',
                fontWeight: 700,
                marginBottom: 10,
                background: `linear-gradient(135deg, ${pillar.color}, #e8eaf6)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{pillar.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
