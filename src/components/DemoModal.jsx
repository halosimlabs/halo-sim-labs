import { useState, useEffect } from 'react'

export default function DemoModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [students, setStudents] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !school.trim() || !email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xeerrejo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, school, email, phone, city, students, message, type: 'demo-request' }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '13px 16px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.92rem',
    color: '#F5F5F5',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.74rem',
    fontWeight: 500,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'rgba(245,245,245,0.38)',
    marginBottom: 7,
  }

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        animation: 'fadeIn 0.25s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0f0f0f',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          width: '100%',
          maxWidth: 680,
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(28px, 5vw, 52px)',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1) both',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'rgba(245,245,245,0.5)',
            fontSize: '1rem',
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              border: '1px solid rgba(139,124,246,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              background: 'rgba(139,124,246,0.1)',
            }}>
              <span style={{ color: '#c4baff', fontSize: '1.2rem' }}>✓</span>
            </div>
            <h3 style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#F5F5F5',
              marginBottom: 12,
            }}>
              Request Received
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(245,245,245,0.45)',
              lineHeight: 1.7,
              maxWidth: 380,
              margin: '0 auto 32px',
            }}>
              Thank you! Our team will be in touch within 2–3 business days to arrange your private demo.
            </p>
            <button
              onClick={onClose}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.88rem',
                color: 'rgba(245,245,245,0.4)',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                padding: '10px 24px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#c4baff',
                display: 'block',
                marginBottom: 14,
              }}>
                Private Demo
              </span>
              <h2 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                fontWeight: 700,
                color: '#F5F5F5',
                lineHeight: 1.15,
                marginBottom: 12,
              }}>
                Bring Halo Sim Labs to Your School
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.92rem',
                color: 'rgba(245,245,245,0.4)',
                lineHeight: 1.7,
              }}>
                Fill in your details and our team will reach out to arrange a private, in-person demo at your school — no commitment required.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px' }} className="demo-form-grid">

                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Full name"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>School Name *</label>
                  <input
                    type="text"
                    value={school}
                    onChange={e => setSchool(e.target.value)}
                    placeholder="Name of your school"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@school.com"
                    required
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>


                <div>
                  <label style={labelStyle}>City / Town</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="e.g. Johannesburg"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Estimated No. of Students</label>
                  <input
                    type="text"
                    value={students}
                    onChange={e => setStudents(e.target.value)}
                    placeholder="e.g. 30–60"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Anything else we should know?</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Preferred dates, grade levels, questions..."
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: 90,
                    }}
                    onFocus={e => e.target.style.borderColor = 'rgba(139,124,246,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              </div>

              <div style={{ marginTop: 28 }}>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '15px 24px',
                    background: 'rgba(139,124,246,0.18)',
                    border: '1px solid rgba(139,124,246,0.35)',
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: '#c4baff',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.6 : 1,
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = 'rgba(139,124,246,0.28)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,124,246,0.18)' }}
                >
                  {status === 'loading' ? 'Sending…' : 'Request a Demo'}
                </button>

                {status === 'error' && (
                  <p role="alert" style={{
                    marginTop: 10,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    color: 'rgba(255,100,100,0.7)',
                    textAlign: 'center',
                  }}>
                    Something went wrong. Please try again.
                  </p>
                )}

                <p style={{
                  marginTop: 14,
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(245,245,245,0.2)',
                  textAlign: 'center',
                }}>
                  No commitment required. We'll be in touch within 2–3 business days.
                </p>
              </div>
            </form>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 520px) {
          .demo-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
