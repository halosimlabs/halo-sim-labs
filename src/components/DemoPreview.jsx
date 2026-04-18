import { Link } from 'react-router-dom'

export default function DemoPreview() {
  return (
    <section
      id="demo-preview"
      className="section"
      style={{ background: '#06060a', paddingTop: 'clamp(80px, 10vw, 140px)', paddingBottom: 'clamp(80px, 10vw, 140px)' }}
    >
      <div className="container" style={{ maxWidth: 960 }}>

        {/* Eyebrow */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 24 }}>
          <span className="eyebrow">Live Simulation</span>
        </div>

        {/* Heading */}
        <h2
          className="reveal"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            fontWeight: 700,
            color: '#F5F5F5',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: 64,
          }}
        >
          See It In Action
        </h2>

        {/* Preview image */}
        <div className="reveal demo-preview-frame">
          <Link to="/demo" style={{ display: 'block' }}>
            <img
              src="/assets/images/demo-preview.svg"
              alt="Halo Sim Labs demo — Melissa's World scenario"
              style={{
                width: '100%',
                borderRadius: 16,
                display: 'block',
              }}
            />
            <div className="demo-preview-overlay">
              <span className="demo-preview-play">&#9654; Try the Demo</span>
            </div>
          </Link>
        </div>

        {/* Description */}
        <p
          className="reveal"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1rem',
            color: 'rgba(240,240,245,0.55)',
            textAlign: 'center',
            marginTop: 32,
            lineHeight: 1.75,
          }}
        >
          An immersive simulation where every choice has a consequence.
        </p>

        {/* CTA Button */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 36 }}>
          <Link to="/demo" className="btn-accent" style={{ display: 'inline-block' }}>
            Try the Demo
          </Link>
        </div>
      </div>

      <style>{`
        .demo-preview-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 24px 60px rgba(0,0,0,0.6),
            0 0 80px rgba(139,124,246,0.08);
        }

        .demo-preview-frame a {
          display: block;
          position: relative;
        }

        .demo-preview-frame img {
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .demo-preview-frame:hover img {
          transform: scale(1.025);
        }

        .demo-preview-overlay {
          position: absolute;
          inset: 0;
          background: rgba(6,6,10,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 16px;
        }

        .demo-preview-frame:hover .demo-preview-overlay {
          opacity: 1;
        }

        .demo-preview-play {
          font-family: 'Sora', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          background: rgba(139,124,246,0.85);
          padding: 14px 32px;
          border-radius: 50px;
          letter-spacing: 0.02em;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 600px) {
          .demo-preview-play {
            font-size: 0.95rem;
            padding: 12px 24px;
          }
        }
      `}</style>
    </section>
  )
}
