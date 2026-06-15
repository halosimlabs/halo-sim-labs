const stats = [
  {
    stat: '75%',
    heading: 'Higher Retention',
    description:
      'Learners retain information at a 75% higher rate through immersive simulation than through conventional instruction.',
    source: 'National Training Laboratory',
  },
  {
    stat: '54%',
    heading: 'Higher Test Scores',
    description:
      'Students in simulation-based active learning sessions score significantly higher than those in traditional lecture formats.',
    source: 'Active Learning Impact Study, 2024',
  },
  {
    stat: '5% vs 75%',
    heading: 'Retention Gap',
    description:
      'Traditional lectures produce just 5% knowledge retention. Immersive simulation changes that and changes how students actually behave, not just what they know.',
    source: 'Learning Pyramid, National Training Laboratory',
  },
]

export default function StatsSection() {
  return (
    <section
      id="why-simulation"
      className="section"
      style={{ background: '#0B0B0B' }}
    >
      <div className="container">

        <div style={{ marginBottom: 56 }}>
          <h2 style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)',
            fontWeight: 700,
            color: '#F5F5F5',
            lineHeight: 1.15,
            marginTop: 14,
            maxWidth: 480,
          }}>
            Why Simulation Works
          </h2>
        </div>

        <div className="stats-row">
          {stats.map((item, i) => (
            <div key={i} className="stats-item">
              <div className="stats-number">{item.stat}</div>
              <div className="stats-heading">{item.heading}</div>
              <p className="stats-desc">{item.description}</p>
              <p className="stats-source">Source: {item.source}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stats-item {
          padding: 48px 40px 48px 0;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stats-item:first-child { padding-left: 0; }
        .stats-item:not(:first-child) { padding-left: 40px; }
        .stats-item:last-child { border-right: none; }

        .stats-number {
          font-family: 'Sora', sans-serif;
          font-size: clamp(2.8rem, 4.5vw, 4rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: #8b7cf6;
          margin-bottom: 12px;
        }

        .stats-heading {
          font-family: 'Sora', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #F5F5F5;
          margin-bottom: 16px;
        }

        .stats-desc {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(245, 245, 245, 0.45);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .stats-source {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          color: rgba(245, 245, 245, 0.22);
          letter-spacing: 0.01em;
        }

        @media (max-width: 860px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .stats-item:nth-child(2) { border-right: none; }
          .stats-item:last-child {
            grid-column: 1 / -1;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            border-right: none;
            padding-left: 0;
          }
        }

        @media (max-width: 540px) {
          .stats-row { grid-template-columns: 1fr; }
          .stats-item {
            padding: 36px 0;
            border-right: none;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
          .stats-item:first-child { border-top: none; }
          .stats-item:last-child { grid-column: auto; }
        }
      `}</style>
    </section>
  )
}
