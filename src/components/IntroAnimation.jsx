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
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
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

    </div>
  )
}
