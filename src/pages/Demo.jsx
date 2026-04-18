import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react'

const ThreeScene = lazy(() => import('../components/demo/ThreeScene.jsx'))

// ─── Script data ────────────────────────────────────────────────────────────

const SCRIPT = [
  {
    phase: 'narration',
    speaker: 'narrator',
    activeCharacter: null,
    text: 'Melissa has known Sthandile, Nadine and Kelly since Grade 6. They do everything together. Today, they want to do something Melissa has never done before.',
    voiceConfig: { pitch: 1.0, rate: 0.88 },
  },
  {
    phase: 'kelly',
    speaker: 'Kelly',
    activeCharacter: 'kelly',
    text: "We're going to the mall after school. There's this lip gloss I want - I'm just going to take it. It's tiny, no one will even notice. Come with us.",
    voiceConfig: { pitch: 1.3, rate: 1.0 },
  },
  {
    phase: 'nadine',
    speaker: 'Nadine',
    activeCharacter: 'nadine',
    text: "Come on Mel, we do everything together. It's literally one thing. Are you scared?",
    voiceConfig: { pitch: 1.2, rate: 1.05 },
  },
]

const CHOICES = [
  { id: 'A', label: 'Okay... I guess just this once.' },
  { id: 'B', label: 'Melissa says nothing and walks with them.' },
  { id: 'C', label: "I don't think that's a good idea. I'll come to the mall but I'm not stealing anything." },
]

const CONSEQUENCES = {
  A: {
    color: '#c0392b',
    bgColor: 'rgba(192,57,43,0.12)',
    borderColor: 'rgba(192,57,43,0.35)',
    label: 'You chose to go along.',
    text: "Melissa went along. She felt sick the whole time. Later that week, Kelly got caught - and Melissa's name came up too.",
  },
  B: {
    color: '#d4ac0d',
    bgColor: 'rgba(212,172,13,0.12)',
    borderColor: 'rgba(212,172,13,0.35)',
    label: 'You stayed silent.',
    text: 'Melissa stayed silent. But silence felt like a yes. She carried the guilt for days.',
  },
  C: {
    color: '#27ae60',
    bgColor: 'rgba(39,174,96,0.12)',
    borderColor: 'rgba(39,174,96,0.35)',
    label: 'You stood your ground.',
    text: "It wasn't easy. But Melissa stood her ground. Her real friends respected her for it.",
  },
}

// ─── Speech helper ───────────────────────────────────────────────────────────

function getVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) return resolve(voices)
    const handler = () => {
      resolve(window.speechSynthesis.getVoices())
      window.speechSynthesis.removeEventListener('voiceschanged', handler)
    }
    window.speechSynthesis.addEventListener('voiceschanged', handler)
    // Fallback if event never fires
    setTimeout(() => resolve(window.speechSynthesis.getVoices()), 1500)
  })
}

function speak(text, voiceConfig, onEnd) {
  window.speechSynthesis.cancel()
  getVoices().then((voices) => {
    const utt = new SpeechSynthesisUtterance(text)
    const preferred = voices.find(
      (v) => v.lang.startsWith('en') && /female|woman|zira|samantha|victoria|karen/i.test(v.name)
    ) || voices.find((v) => v.lang.startsWith('en')) || voices[0]
    if (preferred) utt.voice = preferred
    utt.pitch = voiceConfig.pitch ?? 1.0
    utt.rate = voiceConfig.rate ?? 1.0
    utt.volume = 1.0
    utt.onend = onEnd
    utt.onerror = onEnd
    window.speechSynthesis.speak(utt)
  })
}

// ─── Fade wrapper ─────────────────────────────────────────────────────────────

function FadeLayer({ visible, children, style }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.7s ease',
      pointerEvents: visible ? 'auto' : 'none',
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── Main Demo component ──────────────────────────────────────────────────────

export default function Demo() {
  const [phase, setPhase] = useState('loading')
  const [scriptIndex, setScriptIndex] = useState(0)
  const [subtitle, setSubtitle] = useState('')
  const [activeSpeaker, setActiveSpeaker] = useState(null)
  const [activeCharacter, setActiveCharacter] = useState(null)
  const [choice, setChoice] = useState(null)
  const [uiVisible, setUiVisible] = useState(true)
  const hasStarted = useRef(false)

  // Loading -> narration after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('narration')
      setUiVisible(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const advanceScript = useCallback((index) => {
    const entry = SCRIPT[index]
    if (!entry) {
      // All script lines done, move to question
      setSubtitle('')
      setActiveSpeaker(null)
      setActiveCharacter(null)
      setPhase('question')
      return
    }
    setPhase(entry.phase)
    setSubtitle(entry.text)
    setActiveSpeaker(entry.speaker)
    setActiveCharacter(entry.activeCharacter)

    speak(entry.text, entry.voiceConfig, () => {
      setTimeout(() => {
        advanceScript(index + 1)
      }, 600)
    })
  }, [])

  // Kick off script when phase becomes 'narration' for the first time
  useEffect(() => {
    if (phase === 'narration' && !hasStarted.current) {
      hasStarted.current = true
      setTimeout(() => advanceScript(0), 400)
    }
  }, [phase, advanceScript])

  const handleChoice = useCallback((choiceId) => {
    window.speechSynthesis.cancel()
    setChoice(choiceId)
    setPhase('consequence')
    setSubtitle('')
    setActiveSpeaker(null)
  }, [])

  const handleOutro = useCallback(() => {
    setUiVisible(false)
    setTimeout(() => {
      setPhase('outro')
      setUiVisible(true)
    }, 700)
  }, [])

  // Cleanup speech on unmount
  useEffect(() => {
    return () => window.speechSynthesis.cancel()
  }, [])

  const consequence = choice ? CONSEQUENCES[choice] : null
  const isScriptPhase = ['narration', 'kelly', 'nadine'].includes(phase)
  const showScene = phase !== 'loading' && phase !== 'outro'

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0B0B0B',
      fontFamily: 'Inter, sans-serif',
      color: '#F5F5F5',
      overflow: 'hidden',
    }}>

      {/* ── Three.js scene ── */}
      {showScene && (
        <Suspense fallback={null}>
          <ThreeScene activeCharacter={activeCharacter} />
        </Suspense>
      )}

      {/* ── Dark overlay for readability ── */}
      {showScene && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.3) 50%, rgba(11,11,11,0.5) 100%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Loading screen ── */}
      <FadeLayer
        visible={phase === 'loading'}
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20 }}
      >
        <div style={{ textAlign: 'center' }}>
          <img src="/logo.svg" alt="Halo Sim Labs" style={{ height: 60, filter: 'brightness(0) invert(1)', opacity: 0.6, marginBottom: 24 }} />
          <p style={{ color: 'rgba(245,245,245,0.35)', fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Loading simulation...</p>
        </div>
      </FadeLayer>

      {/* ── Script / subtitle phase ── */}
      {isScriptPhase && (
        <FadeLayer
          visible={uiVisible}
          style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          {/* Speaker label */}
          {activeSpeaker && activeSpeaker !== 'narrator' && (
            <div style={{
              textAlign: 'center',
              marginBottom: 10,
              paddingLeft: 24,
              paddingRight: 24,
            }}>
              <span style={{
                display: 'inline-block',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(139,124,246,0.9)',
                background: 'rgba(139,124,246,0.1)',
                border: '1px solid rgba(139,124,246,0.25)',
                borderRadius: 4,
                padding: '4px 12px',
              }}>{activeSpeaker}</span>
            </div>
          )}

          {/* Subtitle text */}
          {subtitle && (
            <div style={{
              textAlign: 'center',
              padding: '0 24px 60px',
            }}>
              <p style={{
                fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                color: '#F5F5F5',
                lineHeight: 1.65,
                maxWidth: 680,
                margin: '0 auto',
                fontWeight: activeSpeaker === 'narrator' ? 300 : 400,
                fontStyle: activeSpeaker === 'narrator' ? 'italic' : 'normal',
                textShadow: '0 2px 12px rgba(0,0,0,0.9)',
              }}>{subtitle}</p>
            </div>
          )}
        </FadeLayer>
      )}

      {/* ── Question phase ── */}
      <FadeLayer
        visible={phase === 'question' && uiVisible}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ padding: '0 24px 48px', maxWidth: 700, margin: '0 auto', width: '100%' }}>
          <p style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
            fontFamily: 'Sora, sans-serif',
            fontWeight: 600,
            color: '#F5F5F5',
            textAlign: 'center',
            marginBottom: 28,
            textShadow: '0 2px 16px rgba(0,0,0,1)',
          }}>
            How do you think Melissa is feeling right now?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CHOICES.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChoice(c.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  padding: '14px 18px',
                  color: '#F5F5F5',
                  fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                  lineHeight: 1.5,
                  backdropFilter: 'blur(12px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(139,124,246,0.12)'
                  e.currentTarget.style.borderColor = 'rgba(139,124,246,0.4)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                }}
              >
                <span style={{
                  flexShrink: 0,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: '1px solid rgba(139,124,246,0.5)',
                  color: 'rgba(139,124,246,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}>{c.id}</span>
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </FadeLayer>

      {/* ── Consequence phase ── */}
      <FadeLayer
        visible={phase === 'consequence' && uiVisible}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {consequence && (
          <div style={{ padding: '0 24px 48px', maxWidth: 640, width: '100%' }}>
            <div style={{
              background: consequence.bgColor,
              border: `1px solid ${consequence.borderColor}`,
              borderRadius: 14,
              padding: '24px 28px',
              backdropFilter: 'blur(16px)',
            }}>
              <p style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: consequence.color,
                marginBottom: 10,
              }}>{consequence.label}</p>
              <p style={{
                fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)',
                color: '#F5F5F5',
                lineHeight: 1.65,
                marginBottom: 24,
              }}>{consequence.text}</p>
              <button
                onClick={handleOutro}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 8,
                  padding: '11px 26px',
                  color: '#F5F5F5',
                  fontSize: '0.85rem',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </FadeLayer>

      {/* ── Outro screen ── */}
      <FadeLayer
        visible={phase === 'outro' && uiVisible}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          background: '#0B0B0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 32px', maxWidth: 560 }}>
          <img
            src="/logo.svg"
            alt="Halo Sim Labs"
            style={{
              height: 56,
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              opacity: 0.7,
              marginBottom: 40,
            }}
          />
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 600,
            color: '#F5F5F5',
            lineHeight: 1.4,
            marginBottom: 16,
          }}>
            Every choice has a ripple.
          </p>
          <p style={{
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            color: 'rgba(245,245,245,0.5)',
            lineHeight: 1.7,
            marginBottom: 48,
          }}>
            Experience the full simulation at{' '}
            <span style={{ color: 'rgba(245,245,245,0.8)' }}>halosimlabs.com</span>
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 9,
                padding: '13px 28px',
                color: 'rgba(245,245,245,0.75)',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#F5F5F5'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.color = 'rgba(245,245,245,0.75)'
              }}
            >
              Back to homepage
            </a>
            <a
              href="#waitlist"
              onClick={(e) => { e.preventDefault(); window.location.href = '/#waitlist' }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(139,124,246,0.15)',
                border: '1px solid rgba(139,124,246,0.4)',
                borderRadius: 9,
                padding: '13px 28px',
                color: 'rgba(139,124,246,0.9)',
                fontSize: '0.875rem',
                fontFamily: 'Inter, sans-serif',
                textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,124,246,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(139,124,246,0.15)'}
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </FadeLayer>

      {/* ── Back link (always visible except loading/outro) ── */}
      {!['loading', 'outro'].includes(phase) && (
        <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 30 }}>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              color: 'rgba(245,245,245,0.35)',
              fontSize: '0.78rem',
              fontFamily: 'Inter, sans-serif',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,245,245,0.75)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,245,0.35)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Home
          </a>
        </div>
      )}

      {/* ── Simulation title badge ── */}
      {!['loading', 'outro'].includes(phase) && (
        <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 30 }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,0.25)',
            fontFamily: 'Inter, sans-serif',
          }}>Just One Thing</span>
        </div>
      )}
    </div>
  )
}
