import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { ArrowUpRight, Check, Copy, MessageCircle } from 'lucide-react'
import { profile } from '../data/content'
import { GithubIcon, Reveal, WhatsappIcon } from './ui'

function Magnetic({ children, className = '' }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0) }} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const channels = [
    { label: 'WhatsApp', value: '+977 984 933 1064', href: `https://wa.me/${profile.whatsapp.replace('+', '')}`, Icon: WhatsappIcon },
    { label: 'Messenger', value: 'sumendra.manandhar', href: profile.messenger, Icon: MessageCircle },
    { label: 'GitHub', value: 'sumendra-manandhar', href: profile.github, Icon: GithubIcon },
  ]

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(124,92,255,0.25),transparent_60%)]" />
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mist">
            <span className="text-lime">05</span> / Contact
          </span>
        </Reveal>

        <div className="mt-10 grid items-center gap-12 md:grid-cols-12">
          <Reveal delay={0.05} className="md:col-span-8">
            <h2 className="text-[15vw] leading-[0.85] font-medium tracking-[-0.05em] md:text-[9vw] xl:text-[9.5rem]">
              Let’s build
              <br />
              <span className="font-serif font-normal italic text-lime">something</span>
              <br />
              <span className="text-outline">remarkable.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} className="flex justify-start md:col-span-4 md:justify-center">
            <Magnetic>
              <a
                href={`mailto:${profile.email}?subject=Project%20inquiry`}
                data-cursor="Write"
                className="group relative grid size-44 place-items-center rounded-full bg-lime text-ink transition-transform duration-500 hover:scale-105 md:size-56"
              >
                <span className="absolute inset-0 animate-spin-slow">
                  <svg viewBox="0 0 200 200" className="size-full">
                    <defs>
                      <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                    </defs>
                    <text className="fill-ink font-mono text-[11px] uppercase tracking-[0.3em]">
                      <textPath href="#circle">Send an email · Start a project · </textPath>
                    </text>
                  </svg>
                </span>
                <ArrowUpRight className="size-12 transition duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-4">
          <Reveal>
            <button onClick={copy} className="glass group flex h-full w-full flex-col justify-between gap-6 rounded-3xl p-6 text-left transition hover:border-lime/50">
              <span className="flex w-full items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-mist">
                Email
                {copied ? <Check className="size-4 text-lime" /> : <Copy className="size-4 opacity-60 group-hover:opacity-100" />}
              </span>
              <span className="break-all text-lg font-medium">{copied ? 'Copied to clipboard ✓' : profile.email}</span>
            </button>
          </Reveal>
          {channels.map(({ label, value, href, Icon }, i) => (
            <Reveal key={label} delay={0.05 * (i + 1)}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="glass group flex h-full flex-col justify-between gap-6 rounded-3xl p-6 transition hover:border-white/30"
              >
                <span className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-mist">
                  {label}
                  <Icon className="size-4 opacity-60 transition group-hover:text-lime group-hover:opacity-100" />
                </span>
                <span className="text-lg font-medium">{value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
