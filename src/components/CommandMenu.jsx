import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Copy, Hash, Mail, Search } from 'lucide-react'
import { profile } from '../data/content'
import { scrollTo } from './Nav'
import { GithubIcon } from './ui'

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef(null)

  const items = useMemo(
    () => [
      ...['About', 'Work', 'Experience', 'Skills', 'Contact'].map((s) => ({
        label: `Go to ${s}`, Icon: Hash, run: () => scrollTo(`#${s.toLowerCase()}`),
      })),
      { label: 'Copy email address', Icon: Copy, run: () => navigator.clipboard?.writeText(profile.email) },
      { label: 'Send an email', Icon: Mail, run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: 'Open GitHub', Icon: GithubIcon, run: () => window.open(profile.github, '_blank') },
    ],
    [],
  )
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-command', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-command', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setQ('')
      setActive(0)
      setTimeout(() => input.current?.focus(), 30)
    }
  }, [open])

  const run = (item) => {
    setOpen(false)
    setTimeout(item.run, 120)
  }

  const onInputKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && filtered[active]) run(filtered[active])
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 px-4 pt-[18vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            role="dialog"
            aria-label="Command menu"
            initial={{ scale: 0.96, y: -8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-2xl bg-ink-2/90 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-4 text-mist" />
              <input
                ref={input}
                value={q}
                onChange={(e) => { setQ(e.target.value); setActive(0) }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-mist">ESC</kbd>
            </div>
            <ul className="max-h-80 overflow-y-auto p-2">
              {filtered.map((item, i) => (
                <li key={item.label}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${i === active ? 'bg-white/[0.07] text-white' : 'text-zinc-400'}`}
                  >
                    <item.Icon className="size-4" />
                    <span className="flex-1">{item.label}</span>
                    {i === active && <ArrowRight className="size-4 text-lime" />}
                  </button>
                </li>
              ))}
              {!filtered.length && <li className="px-3 py-6 text-center text-sm text-mist">No results</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
