import { useEffect, useState } from 'react'

export default function IntroAnimation({ onComplete }) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [phase, setPhase] = useState('enter') // enter → exit → done

  useEffect(() => {
    // If user prefers reduced motion, skip the animation entirely
    if (prefersReducedMotion) {
      document.body.style.overflow = ''
      onComplete()
      return
    }

    document.body.style.overflow = 'hidden'

    const t1 = setTimeout(() => setPhase('exit'), 2000)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      onComplete()
    }, 2900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [onComplete, prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      role="status"
      aria-label="Loading Halo Sim Labs"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0B0B0B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Expanding halo rings */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 400, height: 400, opacity: 0.7 }}
        viewBox="0 0 400 400"
      >
        {[70, 110, 150].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            style={{
              animation: `haloRing 2.8s ease-out ${i * 0.4}s both`,
              transformOrigin: '200px 200px',
            }}
          />
        ))}
      </svg>

      {/* Logo */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) both',
      }}>
        <img
          src="/logo.svg"
          alt="Halo Sim Labs"
          style={{
            height: 400,
            width: 'auto',
            filter: 'brightness(0) invert(1)',
            opacity: 0.85,
            animation: 'breathe 3s ease-in-out 0.4s infinite',
          }}
        />
      </div>

      {/* Loading label */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        animation: 'fadeIn 0.6s ease 0.8s both',
      }}>
        <div style={{ width: 20, height: 1, background: 'rgba(245,245,245,0.15)' }} />
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          color: 'rgba(245,245,245,0.2)',
          textTransform: 'uppercase',
        }}>
          Halo Sim Labs
        </span>
        <div style={{ width: 20, height: 1, background: 'rgba(245,245,245,0.15)' }} />
      </div>
    </div>
  )
}
