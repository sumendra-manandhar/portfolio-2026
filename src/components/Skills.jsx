import { Award, GraduationCap, ArrowUpRight } from 'lucide-react'
import { achievements, education, skills } from '../data/content'
import { Reveal, SectionHead, spot } from './ui'

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="04"
          label="Toolkit"
          title={
            <>
              A designer’s eye, an <span className="font-serif italic">engineer’s</span> toolkit.
            </>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.06}>
              <div onPointerMove={spot} className="spotlight glass h-full rounded-3xl p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-medium tracking-tight">{group}</h3>
                  <span className="font-mono text-xs text-mist">{String(items.length).padStart(2, '0')}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-zinc-300 transition hover:border-lime/60 hover:text-lime"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="md:col-span-1">
            <div onPointerMove={spot} className="spotlight glass h-full rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mist">
                <GraduationCap className="size-4" /> Education
              </div>
              <ul className="mt-6 space-y-5">
                {education.map((e) => (
                  <li key={e.title}>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-zinc-400">{e.place} · <span className="font-mono text-xs">{e.period}</span></p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-2">
            <div onPointerMove={spot} className="spotlight glass h-full rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mist">
                <Award className="size-4" /> Recognition
              </div>
              <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {achievements.map((a) => (
                  <li key={a.title} className="flex gap-4">
                    <span className="font-mono text-xs text-lime">{a.year}</span>
                    <div>
                      {a.href ? (
                        <a href={a.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 font-medium hover:text-lime">
                          {a.title} <ArrowUpRight className="size-3.5 opacity-60 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <p className="font-medium">{a.title}</p>
                      )}
                      <p className="text-sm text-zinc-400">{a.place}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
