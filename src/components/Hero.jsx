import { useEffect, useRef, useState } from 'react'

const heroStats = [
  { end: 40,  suffix: '+',  label: 'Schools Interested' },
  { end: 500, suffix: '+',  label: 'Learners in Pilot' },
  { end: 4,   suffix: '',   label: 'Rural Schools in Pilot' },
  { end: 300, suffix: 'K+', label: 'People Reached Digitally' },
]

function useCountUp(end, duration, started) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [end, duration, started])
  return count
}

function StatItem({ end, suffix, label, started, delay }) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setActive(true), delay)
    return () => clearTimeout(t)
  }, [started, delay])
  const count = useCountUp(end, 2400, active)
  return (
    <div className="hs-stat">
      <span className="hs-stat-num">{count}{suffix}</span>
      <span className="hs-stat-label">{label}</span>
    </div>
  )
}

export default function Hero() {
  const statsRef = useRef(null)
  const [statsStarted, setStatsStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        background: '#0B0B0B',
      }}
    >

      <div className="container hero-inner">
        {/* Left: Text + Stats */}
        <div className="hero-text">
          <span className="hero-eyebrow">
            Simulation-Based Learning
          </span>

          <h1 className="hero-h1 hero-h1-dim" style={{ animation: 'fadeUp 0.7s 0.1s ease both' }}>
            Schools teach theory.
          </h1>
          <h1 className="hero-h1" style={{ animation: 'fadeUp 0.7s 0.15s ease both' }}>
            We teach emotional<br />intelligence.
          </h1>

          {/* Inline stats */}
          <div className="hs-stats-row" ref={statsRef}>
            {heroStats.map((s, i) => (
              <StatItem key={i} {...s} started={statsStarted} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* Right: Character */}
        <div className="hero-character">
          <img
            src="/assets/characters/student-character.png"
            alt="Student character"
            className="hero-character-img"
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to top, #0B0B0B, transparent)',
        pointerEvents: 'none',
      }} />
    </section>

    {/* Page 2 — supporting content */}
    <section style={{
      padding: '80px 0 100px',
      background: '#0B0B0B',
    }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
          color: '#C9C9C9',
          lineHeight: 1.7,
          maxWidth: 620,
          margin: '0 0 20px',
          fontWeight: 400,
          animation: 'fadeUp 0.7s 0.1s ease both',
        }}>
          Halo Sim Labs uses simulation-based learning to help students build empathy,
          self-awareness, and real-world decision-making skills.
        </p>

        <p style={{
          fontSize: 'clamp(0.875rem, 1.3vw, 0.95rem)',
          color: 'rgba(245,245,245,0.38)',
          lineHeight: 1.8,
          maxWidth: 540,
          margin: '0 0 52px',
          fontWeight: 400,
          animation: 'fadeUp 0.7s 0.18s ease both',
        }}>
          Young people face social pressure, anxiety, bullying, and ongoing mental health
          challenges every day. Halo Sim Labs provides an interactive learning environment
          where students practice emotional intelligence through real-life scenarios, moving
          beyond theory into lived experience.
        </p>

        <div style={{
          display: 'flex',
          gap: 14,
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.26s ease both',
        }}>
          <a href="#waitlist" className="btn-primary" style={{ fontSize: '0.9rem', padding: '14px 30px' }}>
            Join the Waitlist
          </a>
          <a href="#why" className="btn-ghost" style={{ fontSize: '0.9rem', padding: '14px 30px' }}>
            Learn More
          </a>
        </div>
      </div>
    </section>

    <style>{`
      .hero-inner {
        position: relative;
        z-index: 2;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
      }

      .hero-text {
        flex: 1 1 0;
        max-width: 580px;
        text-align: center;
      }

      .hero-eyebrow {
        font-family: 'Inter', sans-serif;
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(245, 245, 245, 0.35);
        display: block;
        margin-bottom: 40px;
        animation: fadeUp 0.7s ease both;
      }

      .hero-h1 {
        font-size: clamp(1.4rem, 2.4vw, 2.2rem);
        font-weight: 800;
        line-height: 1.15;
        letter-spacing: -0.03em;
        color: #F5F5F5;
        margin: 0 0 12px;
      }

      .hero-h1-dim {
        color: rgba(245, 245, 245, 0.3);
      }

      .hs-stats-row {
        display: flex;
        gap: 0;
        margin-top: 48px;
        animation: fadeUp 0.7s 0.3s ease both;
      }

      .hs-stat {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 12px 0;
        gap: 5px;
      }

      .hs-stat-num {
        font-family: 'Sora', sans-serif;
        font-size: clamp(1.2rem, 2vw, 1.6rem);
        font-weight: 800;
        color: #F5F5F5;
        letter-spacing: -0.02em;
        line-height: 1;
      }

      .hs-stat-label {
        font-family: 'Inter', sans-serif;
        font-size: 0.72rem;
        color: rgba(245, 245, 245, 0.38);
        text-align: center;
        line-height: 1.4;
      }

      .hero-character {
        flex: 0 0 auto;
        width: clamp(240px, 38vw, 500px);
        display: flex;
        align-items: flex-end;
        justify-content: center;
        align-self: flex-end;
      }

      .hero-character-img {
        width: 100%;
        height: auto;
        max-height: 80vh;
        object-fit: contain;
        object-position: bottom center;
        mix-blend-mode: screen;
        transform-origin: bottom center;
        filter: brightness(0.72) saturate(0.85);
        animation: fadeUp 0.9s 0.2s ease both;
      }

      @media (max-width: 768px) {
        .hero-inner {
          flex-direction: row;
          align-items: center;
          gap: 16px;
        }

        .hero-text {
          flex: 1 1 0;
          text-align: left;
        }

        .hero-eyebrow {
          font-size: 0.55rem;
          margin-bottom: 20px;
        }

        .hero-h1 {
          font-size: clamp(1.1rem, 4.5vw, 1.5rem) !important;
          margin-bottom: 8px !important;
        }

        .hs-stats-row {
          margin-top: 20px;
          flex-wrap: wrap;
          gap: 8px 0;
        }

        .hs-stat {
          flex: 1 1 45%;
          padding: 12px 4px 0;
          align-items: flex-start;
        }

        .hs-stat-num {
          font-size: clamp(0.95rem, 3.5vw, 1.2rem) !important;
        }

        .hs-stat-label {
          font-size: 0.62rem;
          max-width: none;
          text-align: left;
        }

        .hero-character {
          flex: 0 0 auto;
          width: 38%;
          max-width: 180px;
          align-self: flex-end;
          margin-top: 0;
        }
      }
    `}</style>
    </>
  )
}
