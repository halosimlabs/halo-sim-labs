import { useEffect, useRef, useState } from 'react'

const counters = [
  { end: 30,  suffix: '+',  label: 'Schools Engaged' },
  { end: 500, suffix: '+',  label: 'Learners Across Secured Pilot Schools' },
  { end: 4,   suffix: '',   label: 'Rural Schools Secured' },
  { end: 300, suffix: 'K+', label: 'People Reached' },
]

function useCountUp(end, duration, started) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(end)
    }
    requestAnimationFrame(step)
  }, [end, duration, started])

  return count
}

function Counter({ end, suffix, label, started, delay }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!started) return
    const t = setTimeout(() => setActive(true), delay)
    return () => clearTimeout(t)
  }, [started, delay])

  const count = useCountUp(end, 2400, active)

  return (
    <div className="ic-item">
      <div className="ic-number">{count}{suffix}</div>
      <div className="ic-label">{label}</div>
    </div>
  )
}

export default function ImpactCounters() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="ic-section">
      <div className="container">
        <div className="ic-grid">
          {counters.map((c, i) => (
            <div key={i} className={`ic-cell${i < counters.length - 1 ? ' ic-cell-border' : ''}`}>
              <Counter {...c} started={started} delay={i * 180} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ic-section {
          background: #0B0B0B;
          padding: 56px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .ic-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .ic-cell {
          padding: 0 24px;
          text-align: center;
        }

        .ic-cell-border {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ic-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .ic-number {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.2rem, 3.8vw, 3.4rem);
          font-weight: 800;
          color: #F5F5F5;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .ic-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          color: rgba(245, 245, 245, 0.4);
          line-height: 1.5;
          max-width: 130px;
          text-align: center;
        }

        @media (max-width: 700px) {
          .ic-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px 0;
          }

          .ic-cell-border {
            border-right: none;
          }

          .ic-cell:nth-child(1),
          .ic-cell:nth-child(3) {
            border-right: 1px solid rgba(255, 255, 255, 0.08);
          }

          .ic-cell {
            padding: 0 16px;
          }
        }

        @media (max-width: 400px) {
          .ic-grid {
            grid-template-columns: 1fr;
            gap: 32px 0;
          }

          .ic-cell:nth-child(1),
          .ic-cell:nth-child(3) {
            border-right: none;
          }
        }
      `}</style>
    </section>
  )
}
