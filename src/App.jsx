import { lazy, Suspense, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import CommandMenu from './components/CommandMenu'

const Scene = lazy(() => import('./components/Scene'))

export default function App() {
  const sceneRef = useRef(null)

  // dim the 3D backdrop once the visitor scrolls past the hero
  useEffect(() => {
    const on = () => {
      const t = Math.min(window.scrollY / window.innerHeight, 1)
      if (sceneRef.current) sceneRef.current.style.opacity = String(1 - t * 0.55)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    window.__lenis = lenis
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])

  return (
    <div className="grain relative">
      <div ref={sceneRef} className="pointer-events-none fixed inset-0 -z-0 h-lvh">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>
      <Cursor />
      <CommandMenu />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
