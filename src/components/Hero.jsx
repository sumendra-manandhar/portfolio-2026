import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '../data/content'
import { scrollTo } from './Nav'

const ease = [0.16, 1, 0.3, 1]

function Line({ children, delay, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: '110%', rotate: 3 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 1.2, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-end px-5 pt-32 pb-10 sm:px-8 md:pb-14">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="glass mb-8 inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-xs text-zinc-300"
        >
          <span className="size-2 animate-pulse-dot rounded-full bg-lime" />
          {profile.available ? 'Available for freelance & full-time roles' : 'Currently heads-down'}
        </motion.div>

        <h1 className="text-[13.5vw] leading-[0.88] font-medium tracking-[-0.045em] md:text-[9.2vw] xl:text-[8.6rem]">
          <Line delay={0.35}>Frontend</Line>
          <Line delay={0.45}>
            engineer <span className="font-serif font-normal italic text-lime">&amp;</span>
          </Line>
          <Line delay={0.55} className="font-serif font-normal tracking-[-0.02em] italic">
            <span className="bg-gradient-to-r from-white via-violet-200 to-violet bg-clip-text text-transparent">
              interface designer
            </span>
          </Line>
        </h1>

        <div className="mt-10 grid items-end gap-8 md:mt-14 md:grid-cols-12">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="max-w-md text-lg leading-relaxed text-zinc-400 md:col-span-5"
          >
            Hi, I’m <span className="text-white">{profile.name}</span>. {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="flex flex-wrap gap-3 md:col-span-4"
          >
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); scrollTo('#work') }}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-lime"
            >
              See selected work
              <ArrowDownRight className="size-4 transition group-hover:rotate-[-45deg]" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition hover:border-white/30"
            >
              GitHub
              <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-mist md:col-span-3 md:justify-end"
          >
            <MapPin className="size-3.5 text-lime" /> {profile.location}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
