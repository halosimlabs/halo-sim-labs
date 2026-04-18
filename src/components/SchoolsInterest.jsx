import { useEffect, useRef, useState } from 'react'

// ── Update this number as interest grows ──
const SCHOOLS_COUNT = 15

function useCountUp(target, duration = 1600) {
  const [value, setValue] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [triggered])

  useEffect(() => {
    if (!triggered) return

    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [triggered, target, duration])

  return { value, ref }
}

export default function SchoolsInterest() {
  const { value, ref } = useCountUp(SCHOOLS_COUNT)

  return (
    <section
      style={{
        background: '#0B0B0B',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '72px 0',
      }}
    >
      <div className="container">
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 16,
          }}
        >
          <span className="eyebrow">Growing Interest</span>

          <div style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(4rem, 10vw, 7rem)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: '#F5F5F5',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {value}
          </div>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            color: 'rgba(245,245,245,0.45)',
            lineHeight: 1.6,
            maxWidth: 360,
          }}>
            schools have expressed interest in bringing Halo Sim Labs to their students.
          </p>
        </div>
      </div>
    </section>
  )
}
