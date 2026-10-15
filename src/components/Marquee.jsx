const words = ['React', 'Next.js', 'TypeScript', 'Three.js', 'Tailwind', 'Figma', 'Design Systems', 'Fintech UI', 'Supabase', 'Motion']

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-line bg-ink/60 py-6 backdrop-blur-sm" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 text-3xl font-medium tracking-tight text-zinc-500 md:text-5xl">
            {i % 2 ? <span className="font-serif italic text-zinc-300">{w}</span> : w}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}
