/* Section — Waitlist / Pilot Request */
import { useState } from 'react'

export default function Waitlist() {
  const [mode, setMode] = useState('waitlist') // 'waitlist' | 'pilot'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleModeSwitch = (newMode) => {
    setMode(newMode)
    setStatus('idle')
    setName('')
    setEmail('')
    setRole('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !role) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xeerrejo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, role, type: mode }),
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

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '14px 18px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    color: '#F5F5F5',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.78rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'rgba(245,245,245,0.4)',
    marginBottom: 8,
  }

  return (
    <section
      id="waitlist"
      className="section"
      style={{ background: '#1A1A1A' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }} className="waitlist-grid">

          {/* Left — text */}
          <div>
            <span className="eyebrow reveal">Get Involved</span>
            <h2 className="reveal reveal-delay-1" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              color: '#F5F5F5',
              lineHeight: 1.15,
              marginBottom: 28,
            }}>
              Follow the Journey
            </h2>
            <p className="reveal reveal-delay-2" style={{
              fontSize: '1rem',
              color: '#C9C9C9',
              lineHeight: 1.85,
              marginBottom: 20,
            }}>
              Join the waitlist to stay updated as the project evolves, or request
              a pilot if you're interested in bringing Halo Sim Labs to your school.
            </p>
            <p className="reveal reveal-delay-3" style={{
              fontSize: '0.875rem',
              color: 'rgba(245,245,245,0.35)',
              lineHeight: 1.7,
              marginBottom: 32,
            }}>
              No spam, no sales pressure. Just honest updates as things develop.
            </p>
            <div className="reveal reveal-delay-4" style={{
              paddingTop: 24,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                color: 'rgba(245,245,245,0.3)',
                display: 'block',
                marginBottom: 6,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>For Inquiries</span>
              <a
                href="mailto:info@halosimlabs.com"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(245,245,245,0.55)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#F5F5F5'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,245,0.55)'}
              >
                info@halosimlabs.com
              </a>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal reveal-delay-2">
            {status === 'success' ? (
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                padding: '48px 40px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <span style={{ color: '#F5F5F5', fontSize: '1.1rem' }} aria-hidden="true">✓</span>
                </div>
                <h3 style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#F5F5F5',
                  marginBottom: 12,
                }}>
                  {mode === 'waitlist' ? "You're on the list" : 'Request received'}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(245,245,245,0.4)',
                  lineHeight: 1.7,
                }}>
                  {mode === 'waitlist'
                    ? "Thank you for your interest. We'll be in touch as the project evolves."
                    : "We'll review your request and be in touch within a few days."}
                </p>
              </div>
            ) : (
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: '40px 36px',
              }}>
                {/* Toggle buttons */}
                <div
                  role="group"
                  aria-label="Form type"
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 32,
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 8,
                    padding: 4,
                  }}
                >
                  {[
                    { key: 'waitlist', label: 'Join Waitlist' },
                    { key: 'pilot',    label: 'Pilot Request' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleModeSwitch(key)}
                      aria-pressed={mode === key}
                      style={{
                        flex: 1,
                        padding: '10px 16px',
                        borderRadius: 6,
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                        background: mode === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                        color: mode === key ? '#F5F5F5' : 'rgba(245,245,245,0.4)',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="waitlist-name" style={labelStyle}>Name</label>
                    <input
                      id="waitlist-name"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      autoComplete="name"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="waitlist-email" style={labelStyle}>Email</label>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={mode === 'pilot' ? 'Your school email address' : 'your@email.com'}
                      required
                      autoComplete="email"
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label htmlFor="waitlist-role" style={labelStyle}>Role</label>
                    <select
                      id="waitlist-role"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      required
                      style={{
                        ...inputStyle,
                        appearance: 'none',
                        cursor: 'pointer',
                        color: role ? '#F5F5F5' : 'rgba(245,245,245,0.35)',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.25)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                      <option value="" disabled style={{ background: '#1A1A1A' }}>Select your role</option>
                      {['Student', 'Teacher', 'School Administrator', 'Parent / Guardian', 'Researcher', 'Other'].map(r => (
                        <option key={r} value={r} style={{ background: '#1A1A1A' }}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={status === 'loading'}
                    aria-busy={status === 'loading'}
                    style={{ width: '100%', justifyContent: 'center', padding: '15px 24px', opacity: status === 'loading' ? 0.6 : 1 }}
                  >
                    {status === 'loading' ? 'Submitting…' : mode === 'waitlist' ? 'Join the Waitlist' : 'Request a Pilot'}
                  </button>
                </form>

                {status === 'error' && (
                  <p
                    role="alert"
                    style={{
                      marginTop: 12,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: 'rgba(255,100,100,0.7)',
                      textAlign: 'center',
                    }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .waitlist-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
