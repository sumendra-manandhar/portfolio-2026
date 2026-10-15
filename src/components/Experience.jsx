import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { experience } from '../data/content'
import { Reveal, SectionHead } from './ui'

export default function Experience() {
  const [open, setOpen] = useState(0)
  return (
    <section id="experience" className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          index="03"
          label="Experience"
          title={
            <>
              Eight years across <span className="font-serif italic">fintech, banking</span> &amp; design.
            </>
          }
        />
        <div className="border-t border-line">
          {experience.map((job, i) => {
            const active = open === i
            return (
              <Reveal key={job.company} delay={i * 0.05}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(active ? -1 : i)}
                    aria-expanded={active}
                    className="group grid w-full grid-cols-12 items-center gap-4 py-7 text-left md:py-9"
                  >
                    <span className="col-span-12 font-mono text-xs text-mist md:col-span-3">{job.period}</span>
                    <span className="col-span-10 md:col-span-8">
                      <span className={`block text-2xl font-medium tracking-tight transition md:text-4xl ${active ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>
                        {job.company}
                      </span>
                      <span className="mt-1 block font-serif text-lg italic text-lime/90">{job.role}</span>
                    </span>
                    <span className="col-span-2 flex justify-end md:col-span-1">
                      <span className={`grid size-11 place-items-center rounded-full border border-line transition duration-500 ${active ? 'rotate-45 bg-lime text-ink' : 'group-hover:border-white/30'}`}>
                        <Plus className="size-5" />
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-12 gap-4 pb-9">
                          <div className="col-span-12 md:col-span-8 md:col-start-4">
                            <ul className="space-y-2 text-zinc-400">
                              {job.points.map((p) => (
                                <li key={p} className="flex gap-3">
                                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-lime" /> {p}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {job.tags.map((t) => (
                                <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-zinc-300">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
