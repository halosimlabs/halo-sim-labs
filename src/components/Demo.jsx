import { useState } from 'react'

const scenario = {
  title: 'A Friend in Need',
  grade: 'Grades 6–10',
  context: 'Your best friend seems upset and has been avoiding you for the past few days. Today at lunch, you spot them sitting alone, staring at their phone. They haven\'t replied to your messages. You walk over and sit down.',
  choices: [
    {
      id: 1,
      text: '"Hey, I\'ve noticed you\'ve been quiet lately. Is everything okay?"',
      consequence: {
        outcome: 'Strong Move',
        color: '#2ec4b6',
        bg: 'rgba(46,196,182,0.08)',
        border: 'rgba(46,196,182,0.25)',
        description: 'Direct but caring — you open the door without pressure. Your friend is likely to feel seen and safe to share. This builds trust and shows emotional courage.',
        skills: ['Empathy', 'Active Listening', 'Courage'],
        xp: '+18 Empathy XP',
      },
    },
    {
      id: 2,
      text: '"What\'s wrong with you? You\'ve been ignoring everyone."',
      consequence: {
        outcome: 'Risky Approach',
        color: '#f7914f',
        bg: 'rgba(247,145,79,0.08)',
        border: 'rgba(247,145,79,0.25)',
        description: 'This might put them on the defensive. Accusatory language can push people away when they\'re already vulnerable. Consider how your words land.',
        skills: ['Needs work: Tone', 'Self-Awareness'],
        xp: '+4 Empathy XP',
      },
    },
    {
      id: 3,
      text: 'Sit quietly next to them without saying anything.',
      consequence: {
        outcome: 'Supportive Presence',
        color: '#4f8ef7',
        bg: 'rgba(79,142,247,0.08)',
        border: 'rgba(79,142,247,0.25)',
        description: 'Sometimes the most powerful thing is simply being there. Your friend may appreciate your presence without needing to talk right away.',
        skills: ['Presence', 'Non-verbal Support'],
        xp: '+12 Empathy XP',
      },
    },
    {
      id: 4,
      text: '"You\'re probably just having a bad week. Want to hang out after school?"',
      consequence: {
        outcome: 'Well-Meaning but Rushed',
        color: '#7c5cbf',
        bg: 'rgba(124,92,191,0.08)',
        border: 'rgba(124,92,191,0.25)',
        description: 'Trying to distract rather than address feelings. It shows care, but can feel dismissive. Try acknowledging their emotions before offering solutions.',
        skills: ['Emotional Validation: needs development'],
        xp: '+8 Empathy XP',
      },
    },
  ],
}

export default function Demo() {
  const [selected, setSelected] = useState(null)

  const selectedChoice = scenario.choices.find(c => c.id === selected)

  return (
    <section id="demo" className="section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-label reveal">Live Preview</span>
          <h2 className="reveal" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: 16,
          }}>
            Try a simulation <span className="gradient-text">right now</span>
          </h2>
          <p className="reveal" style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto', fontSize: '1rem' }}>
            Select a response below and see how emotional intelligence analysis works in real time.
          </p>
        </div>

        {/* Video placeholder */}
        <div className="reveal" style={{
          background: 'var(--card-bg)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          overflow: 'hidden',
          marginBottom: 48,
          position: 'relative',
        }}>
          <div style={{
            aspectRatio: '16/7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
            background: 'linear-gradient(135deg, rgba(79,142,247,0.05), rgba(124,92,191,0.08))',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background design */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%',
              background: 'linear-gradient(90deg, rgba(79,142,247,0.05), transparent)',
            }} />
            <div style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%',
              background: 'linear-gradient(-90deg, rgba(124,92,191,0.05), transparent)',
            }} />

            {/* Play button */}
            <div style={{
              width: 72, height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4f8ef7, #7c5cbf)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(79,142,247,0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              position: 'relative', zIndex: 1,
              animation: 'pulse 2.5s ease-in-out infinite',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)'
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(79,142,247,0.55)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,142,247,0.4)'
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ marginLeft: 4 }}>
                <path d="M8 6L22 14L8 22V6Z" fill="white" />
              </svg>
            </div>

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <p style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
                HaloSim Labs — Full Product Demo
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                4 min · See how a full simulation session works
              </p>
            </div>
          </div>
        </div>

        {/* Interactive simulation preview */}
        <div className="reveal" style={{
          background: 'var(--card-bg)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24,
          overflow: 'hidden',
        }}>
          {/* Top bar */}
          <div style={{
            padding: '16px 28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#2ec4b6',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>
                {scenario.title}
              </span>
              <span style={{
                background: 'rgba(79,142,247,0.12)',
                border: '1px solid rgba(79,142,247,0.2)',
                color: '#4f8ef7',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 50,
              }}>{scenario.grade}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Interactive Preview</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: selected ? '1fr 1fr' : '1fr',
            gap: 0,
            minHeight: 400,
          }} className="demo-inner">
            {/* Left: Scenario + choices */}
            <div style={{
              padding: 32,
              borderRight: selected ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              {/* Context */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding: '18px 20px',
                marginBottom: 28,
              }}>
                <p style={{ fontSize: '0.88rem', color: '#c8cce8', lineHeight: 1.75, fontStyle: 'italic' }}>
                  "{scenario.context}"
                </p>
              </div>

              <h3 style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 16,
              }}>How do you respond?</h3>

              {/* Choices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {scenario.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => setSelected(choice.id)}
                    style={{
                      background: selected === choice.id ? 'rgba(79,142,247,0.1)' : 'rgba(255,255,255,0.02)',
                      border: selected === choice.id ? '1.5px solid rgba(79,142,247,0.5)' : '1px solid rgba(255,255,255,0.07)',
                      borderRadius: 12,
                      padding: '14px 18px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: selected === choice.id ? '#e8eaf6' : '#8891b8',
                      fontSize: '0.9rem',
                      lineHeight: 1.55,
                      transition: 'all 0.25s ease',
                      fontFamily: 'Inter, sans-serif',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                    }}
                    onMouseEnter={e => {
                      if (selected !== choice.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                        e.currentTarget.style.color = '#e8eaf6'
                      }
                    }}
                    onMouseLeave={e => {
                      if (selected !== choice.id) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.color = '#8891b8'
                      }
                    }}
                  >
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                      border: selected === choice.id ? '2px solid #4f8ef7' : '2px solid rgba(255,255,255,0.15)',
                      background: selected === choice.id ? '#4f8ef7' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease',
                    }}>
                      {selected === choice.id && <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    {choice.text}
                  </button>
                ))}
              </div>

              {!selected && (
                <p style={{ marginTop: 20, color: 'var(--text-muted)', fontSize: '0.82rem', textAlign: 'center', opacity: 0.7 }}>
                  Select a response to see the emotional intelligence analysis →
                </p>
              )}
            </div>

            {/* Right: Consequence panel */}
            {selected && selectedChoice && (
              <div style={{
                padding: 32,
                animation: 'fadeInUp 0.4s ease',
              }}>
                <h3 style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: 20,
                }}>Consequence Preview</h3>

                {/* Outcome badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: selectedChoice.consequence.bg,
                  border: `1px solid ${selectedChoice.consequence.border}`,
                  borderRadius: 50,
                  padding: '6px 16px',
                  marginBottom: 20,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: selectedChoice.consequence.color }} />
                  <span style={{ fontWeight: 700, color: selectedChoice.consequence.color, fontSize: '0.85rem' }}>
                    {selectedChoice.consequence.outcome}
                  </span>
                </div>

                {/* Analysis */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  marginBottom: 24,
                }}>
                  <p style={{ color: '#c8cce8', fontSize: '0.9rem', lineHeight: 1.75 }}>
                    {selectedChoice.consequence.description}
                  </p>
                </div>

                {/* Skills */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Skills Practiced
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {selectedChoice.consequence.skills.map(skill => (
                      <span key={skill} style={{
                        background: `${selectedChoice.consequence.bg}`,
                        border: `1px solid ${selectedChoice.consequence.border}`,
                        color: selectedChoice.consequence.color,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '4px 12px',
                        borderRadius: 50,
                      }}>{skill}</span>
                    ))}
                  </div>
                </div>

                {/* XP earned */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(79,142,247,0.06)',
                  border: '1px solid rgba(79,142,247,0.15)',
                  borderRadius: 12,
                  padding: '14px 18px',
                }}>
                  <span style={{ fontSize: '1.4rem' }}>✨</span>
                  <div>
                    <p style={{ fontWeight: 700, color: '#e8eaf6', fontSize: '0.9rem' }}>{selectedChoice.consequence.xp}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Added to your Empathy Profile</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  style={{
                    marginTop: 20,
                    background: 'none',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 50,
                    padding: '8px 18px',
                    color: 'var(--text-muted)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#e8eaf6' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  ← Try another response
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .demo-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
