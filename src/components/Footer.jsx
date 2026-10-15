import { ArrowUp } from 'lucide-react'
import { profile } from '../data/content'
import { scrollTo } from './Nav'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line px-5 pt-16 pb-8 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p
          aria-hidden="true"
          className="bg-gradient-to-b from-white/15 to-transparent bg-clip-text text-center text-[19vw] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent select-none"
        >
          {profile.short.toLowerCase()}.
        </p>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-mist sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}. Crafted in Kathmandu.</span>
          <span className="font-mono text-xs">React · Three.js · Tailwind</span>
          <button onClick={() => scrollTo('#top')} className="group flex items-center gap-2 hover:text-white">
            Back to top <ArrowUp className="size-4 transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
