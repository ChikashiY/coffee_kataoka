import type { ReactNode } from 'react'

interface LegalSectionProps {
  title: string
  children: ReactNode
}

function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-mincho text-base tracking-widest">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-loose text-ink-soft">{children}</div>
    </section>
  )
}

export default LegalSection
