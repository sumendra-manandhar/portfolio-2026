import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { Briefcase, Layers, PenTool, Rocket, Sparkles } from 'lucide-react'
import { stats } from '../data/content'
import { Reveal, SectionHead, spot } from './ui'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      <span className="text-lime">{suffix}</span>
    </span>
  )
}

const card = 'spotlight glass rounded-3xl p-6 md:p-8 overflow-hidden'

export default function About() {
  return (
    <section id="about" className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="01"
          label="About"
          title={
            <>
              I turn complex systems into interfaces that feel <span className="font-serif italic text-lime">effortless.</span>
            </>
          }
        />

        <div className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4 md:row-span-2">
            <div onPointerMove={spot} className={`${card} flex h-full flex-col justify-between gap-10`}>
              <Sparkles className="size-6 text-lime" />
              <div className="space-y-5 text-lg leading-relaxed text-zinc-400 md:text-xl">
                <p>
                  I’m a <span className="text-white">frontend engineer who started as a designer</span>. That mix means I
                  care as much about the 4px detail as the render pipeline behind it.
                </p>
                <p>
                  Today I build for <span className="text-white">Nepal’s national payment infrastructure at NCHL</span>,
                  where clarity and reliability aren’t nice-to-haves. Before that I designed and developed for banking,
                  print media and agencies.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-2">
            <div onPointerMove={spot} className={`${card} h-full`}>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mist">
                <Briefcase className="size-3.5" /> Currently
              </div>
              <p className="mt-6 text-2xl font-medium tracking-tight">Frontend Developer</p>
              <p className="mt-1 text-zinc-400">Nepal Clearing House Ltd.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <div onPointerMove={spot} className={`${card} relative h-full`}>
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-violet/30 blur-3xl" />
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-mist">Based in</div>
              <p className="mt-6 font-serif text-4xl italic">Kathmandu</p>
              <p className="mt-1 text-zinc-400">Nepal · GMT+5:45 · works remote</p>
            </div>
          </Reveal>

          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i} className="md:col-span-2">
              <div onPointerMove={spot} className={`${card} flex h-full flex-col justify-between`}>
                <span className="text-6xl font-medium tracking-tighter md:text-7xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-6 text-sm text-zinc-400">{s.label}</span>
              </div>
            </Reveal>
          ))}

          <Reveal className="md:col-span-6">
            <div onPointerMove={spot} className={`${card} grid gap-6 md:grid-cols-3`}>
              {[
                [PenTool, 'Design', 'Research, wireframes and high-fidelity Figma systems.'],
                [Layers, 'Build', 'Typed, accessible React with motion that serves meaning.'],
                [Rocket, 'Ship', 'Performance budgets, testing and calm, iterative releases.'],
              ].map(([Icon, t, d], i) => (
                <div key={t} className="flex gap-4">
                  <span className="font-mono text-xs text-lime">0{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-2 text-lg font-medium">
                      <Icon className="size-4 text-zinc-500" /> {t}
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
