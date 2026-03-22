import { useState, useEffect } from 'react'
import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyItMatters from './components/WhyItMatters'
import WhatIsHaloSim from './components/WhatIsHaloSim'
import Inclusive from './components/Inclusive'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'
import AccessibilityBar from './components/AccessibilityBar'

function App() {
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    if (!introComplete) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const revealEls = document.querySelectorAll('.reveal')
    revealEls.forEach((el) => observer.observe(el))

    return () => {
      revealEls.forEach((el) => observer.unobserve(el))
    }
  }, [introComplete])

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />

      <div style={{
        opacity: introComplete ? 1 : 0,
        transition: 'opacity 0.8s ease 0.1s',
      }}>
        <Navbar />
        <main id="main-content">
          <Hero />
          <WhyItMatters />
          <WhatIsHaloSim />
          <Inclusive />
          <Waitlist />
        </main>
        <Footer />
        <AccessibilityBar />
      </div>
    </>
  )
}

export default App
