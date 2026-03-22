const simulations = [
  {
    icon: '🛡️',
    grade: 'Grades 4–8',
    title: 'Bullying & Bystander Intervention',
    description: 'What do you do when you witness someone being bullied? Navigate the difficult choice between staying silent and speaking up.',
    color: '#4f8ef7',
  },
  {
    icon: '📋',
    grade: 'Grades 6–12',
    title: 'Handling Exam Anxiety',
    description: 'Manage overwhelming stress before a high-stakes exam. Learn to calm your nervous system and shift your mindset under pressure.',
    color: '#7c5cbf',
  },
  {
    icon: '🤝',
    grade: 'Grades 5–10',
    title: 'Conflict with a Friend',
    description: 'Your closest friendship is strained. Navigate misunderstandings, repair trust, and learn the art of genuine reconciliation.',
    color: '#2ec4b6',
  },
  {
    icon: '📱',
    grade: 'Grades 6–12',
    title: 'Social Media Pressure',
    description: 'When comparing yourself online spirals into anxiety — learn to set digital boundaries and protect your self-worth.',
    color: '#f7914f',
  },
  {
    icon: '💙',
    grade: 'Grades 7–12',
    title: 'Supporting a Struggling Friend',
    description: 'Your friend has confided that they\'re not okay. How do you respond with empathy, without saying the wrong thing?',
    color: '#4f8ef7',
  },
]

export default function Simulations() {
  return (
    <section id="simulations" className="section" style={{
      background: '#0a0b16',
      overflow: 'hidden',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-label reveal">Simulation Library</span>
          <h2 className="reveal" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: 16,
          }}>
            Real situations. <span className="gradient-text">Real learning.</span>
          </h2>
          <p className="reveal" style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Every scenario is grounded in the emotional challenges students actually face — designed with psychologists and educators.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }} className="sim-grid">
          {simulations.map((sim, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${(i % 3) + 1}`}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: '28px 24px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                gridColumn: i === 3 ? 'span 1' : 'auto',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px ${sim.color}40`
                e.currentTarget.style.borderColor = `${sim.color}40`
                e.currentTarget.querySelector('.explore-link').style.color = sim.color
                e.currentTarget.querySelector('.explore-link').style.gap = '8px'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.querySelector('.explore-link').style.color = 'var(--text-muted)'
                e.currentTarget.querySelector('.explore-link').style.gap = '4px'
              }}
            >
              {/* Top color line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: `linear-gradient(90deg, ${sim.color}80, transparent)`,
              }} />

              {/* Icon */}
              <div style={{
                width: 52, height: 52,
                borderRadius: 14,
                background: `${sim.color}15`,
                border: `1px solid ${sim.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: 16,
                transition: 'transform 0.3s ease',
              }}>
                {sim.icon}
              </div>

              {/* Grade label */}
              <span style={{
                display: 'inline-block',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: sim.color,
                background: `${sim.color}12`,
                border: `1px solid ${sim.color}25`,
                padding: '3px 10px',
                borderRadius: 50,
                marginBottom: 12,
              }}>{sim.grade}</span>

              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1rem',
                fontWeight: 700,
                marginBottom: 10,
                color: '#e8eaf6',
                lineHeight: 1.3,
              }}>{sim.title}</h3>

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
                marginBottom: 20,
              }}>{sim.description}</p>

              <div className="explore-link" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'color 0.2s ease, gap 0.2s ease',
              }}>
                Explore →
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: 48 }}>
          <a href="#contact" className="btn-outline">
            View Full Simulation Library
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .sim-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .sim-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
