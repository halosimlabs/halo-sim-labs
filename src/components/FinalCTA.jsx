import { useState } from 'react'

export default function FinalCTA() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !role) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xeerrejo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, role }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section" style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--surface)',
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,124,246,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
        <span className="section-eyebrow reveal">Get Started</span>

        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 700,
          color: '#f0f0f5',
          letterSpacing: '-0.028em',
          lineHeight: 1.12,
          marginBottom: 20,
        }} className="reveal reveal-delay-1">
          Bring emotional learning<br />
          <span style={{ color: 'rgba(240,240,245,0.28)' }}>to your school.</span>
        </h2>

        <p style={{
          color: 'rgba(240,240,245,0.42)',
          fontSize: '1rem',
          lineHeight: 1.8,
          maxWidth: 520,
          margin: '0 auto 48px',
        }} className="reveal reveal-delay-2">
          Join the schools already using Halo Sim Labs to build the emotional skills
          that last a lifetime. Request a free pilot today.
        </p>

        <div className="reveal reveal-delay-3">
          {status !== 'success' ? (
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: 500, margin: '0 auto 16px' }}
              className="cta-form"
            >
              {[
                { label: 'Name', type: 'text', value: name, onChange: e => setName(e.target.value), placeholder: 'Your name' },
                { label: 'Email', type: 'email', value: email, onChange: e => setEmail(e.target.value), placeholder: 'Your school email address' },
              ].map(({ label, type, value, onChange, placeholder }) => (
                <div key={label} style={{ marginBottom: 12 }}>
                  <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      padding: '13px 18px',
                      color: '#f0f0f5',
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.45)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 8,
                    padding: '13px 18px',
                    color: role ? '#f0f0f5' : 'rgba(240,240,245,0.35)',
                    fontSize: '0.9rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    appearance: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.45)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  <option value="" disabled style={{ background: '#0c0c14' }}>Your role</option>
                  {['Student', 'Teacher', 'School Administrator', 'Researcher', 'Other'].map(r => (
                    <option key={r} value={r} style={{ background: '#0c0c14' }}>{r}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn-accent" disabled={status === 'loading'} style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.6 : 1 }}>
                {status === 'loading' ? 'Submitting…' : 'Request Pilot'}
              </button>
              {status === 'error' && (
                <p style={{ color: 'rgba(255,100,100,0.7)', fontSize: '0.8rem', marginTop: 8 }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          ) : (
            <div style={{
              maxWidth: 500,
              margin: '0 auto 16px',
              background: 'rgba(139,124,246,0.06)',
              border: '1px solid rgba(139,124,246,0.2)',
              borderRadius: 10,
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'rgba(139,124,246,0.15)',
                border: '1px solid rgba(139,124,246,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '0.8rem',
                color: '#8b7cf6',
              }}>✓</div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: 600, color: '#8b7cf6', marginBottom: 2, fontSize: '0.9rem' }}>
                  Request received
                </p>
                <p style={{ color: 'rgba(240,240,245,0.4)', fontSize: '0.82rem' }}>
                  Our team will be in touch within 24 hours.
                </p>
              </div>
            </div>
          )}

          <p style={{
            color: 'rgba(240,240,245,0.22)',
            fontSize: '0.78rem',
            letterSpacing: '0.02em',
          }}>
            Free pilot available for qualifying schools · No credit card required
          </p>
        </div>

        {/* Divider */}
        <div style={{
          marginTop: 72,
          padding: '40px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          justifyContent: 'center',
          gap: 48,
          flexWrap: 'wrap',
        }} className="reveal">
          {[
            { num: '20+', label: 'Simulations available' },
            { num: 'Grades 3–12', label: 'Full age coverage' },
            { num: '2 days', label: 'To deploy in your school' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#f0f0f5',
                letterSpacing: '-0.02em',
                marginBottom: 4,
              }}>{s.num}</div>
              <div style={{
                fontSize: '0.75rem',
                color: 'rgba(240,240,245,0.3)',
                letterSpacing: '0.04em',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .cta-form { flex-direction: column !important; }
        }
      `}</style>
    </section>
  )
}
