import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { projects, profile } from '../data/content'
import { Reveal, SectionHead } from './ui'

function ProjectCard({ p, i }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }

  // first card spans wider for an editorial rhythm
  const span = i === 0 || i === 3 ? 'md:col-span-7' : 'md:col-span-5'

  return (
    <Reveal delay={(i % 2) * 0.08} className={span}>
      <motion.a
        ref={ref}
        href={p.href}
        target="_blank"
        rel="noreferrer"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        data-cursor="View"
        className="spotlight glass group flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] p-6 md:p-8"
      >
        <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${p.hue} opacity-60 transition-opacity duration-700 group-hover:opacity-100`} />
        <div className="pointer-events-none absolute -right-6 -bottom-12 -z-10 font-serif text-[12rem] leading-none italic text-white/[0.04] transition-transform duration-700 group-hover:-translate-y-4">
          {String(i + 1).padStart(2, '0')}
        </div>

        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider">{p.kind}</span>
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-mist">{p.year}</span>
          </div>
          <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-ink/40 transition duration-500 group-hover:rotate-45 group-hover:bg-lime group-hover:text-ink">
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        <div>
          <h3 className="text-4xl font-medium tracking-tight md:text-5xl">{p.title}</h3>
          <p className="mt-3 max-w-md text-zinc-400">{p.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-zinc-300">{s}</span>
            ))}
          </div>
        </div>
      </motion.a>
    </Reveal>
  )
}

export default function Work() {
  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="02"
          label="Selected work"
          title={
            <>
              Things I’ve <span className="font-serif italic">designed</span> &amp; shipped recently.
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-12">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
        <Reveal className="mt-10 flex justify-center">
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition hover:border-white/30"
          >
            Browse all repositories
            <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
