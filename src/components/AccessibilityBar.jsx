import { useState, useEffect } from 'react'

const TOGGLES = [
  { key: 'high-contrast',  label: 'High Contrast',         icon: '◑' },
  { key: 'large-text',     label: 'Larger Text',            icon: 'A+' },
  { key: 'dyslexia-font',  label: 'Dyslexia-Friendly Font', icon: 'D' },
  { key: 'reduce-motion',  label: 'Reduce Motion',          icon: '⏸' },
]

export default function AccessibilityBar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('a11y-prefs') || '{}')
    } catch {
      return {}
    }
  })

  useEffect(() => {
    TOGGLES.forEach(({ key }) => {
      if (active[key]) {
        document.body.classList.add(key)
      } else {
        document.body.classList.remove(key)
      }
    })
    localStorage.setItem('a11y-prefs', JSON.stringify(active))
  }, [active])

  const toggle = (key) => {
    setActive(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div
      role="region"
      aria-label="Accessibility options"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      {/* Panel */}
      {open && (
        <div
          style={{
            background: '#1A1A1A',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            minWidth: 220,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.35)',
            marginBottom: 4,
          }}>
            Accessibility
          </p>
          {TOGGLES.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              aria-pressed={!!active[key]}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: active[key] ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                border: active[key] ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8,
                padding: '10px 14px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 500,
                color: active[key] ? '#F5F5F5' : 'rgba(245,245,245,0.5)',
                transition: 'all 0.2s ease',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '0.9rem', minWidth: 20, textAlign: 'center' }}>{icon}</span>
              {label}
              {active[key] && (
                <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'rgba(245,245,245,0.4)' }}>ON</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Toggle accessibility options"
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: '#1A1A1A',
          border: '1px solid rgba(255,255,255,0.12)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          color: 'rgba(245,245,245,0.6)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'border-color 0.2s ease, color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
          e.currentTarget.style.color = '#F5F5F5'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
          e.currentTarget.style.color = 'rgba(245,245,245,0.6)'
        }}
      >
        ♿
      </button>
    </div>
  )
}
