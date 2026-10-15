import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Command, Menu, X } from 'lucide-react'
import { profile } from '../data/content'

const links = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Contact', '#contact'],
]

export function scrollTo(hash) {
  const el = document.querySelector(hash)
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

function useKtmTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timezone }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 10_000)
    return () => clearInterval(id)
  }, [])
  return t
}

export default function Nav() {
  const time = useKtmTime()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  const go = (e, hash) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(hash)
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-5 transition-shadow duration-500 ${
          scrolled ? 'shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]' : ''
        }`}
      >
        <a href="#top" onClick={(e) => go(e, '#top')} className="flex items-center gap-2" data-cursor="Home">
          <span className="font-serif text-2xl italic leading-none text-lime">S</span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => go(e, href)}
                className="rounded-full px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-xs text-mist lg:inline">KTM {time}</span>
          <button
            onClick={() => window.dispatchEvent(new Event('open-command'))}
            className="hidden items-center gap-1.5 rounded-full border border-line px-3 py-2 font-mono text-xs text-mist transition hover:text-white sm:flex"
            aria-label="Open command menu"
          >
            <Command className="size-3.5" /> K
          </button>
          <a
            href="#contact"
            onClick={(e) => go(e, '#contact')}
            className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white"
          >
            Let’s talk
          </a>
          <button
            className="grid size-9 place-items-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="glass absolute top-16 right-4 left-4 rounded-3xl bg-ink/80 p-3 md:hidden"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={(e) => go(e, href)}
                className="block rounded-2xl px-4 py-3 text-2xl font-medium tracking-tight hover:bg-white/5"
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
