import React from 'react'
import { cn } from '@/lib/utils'

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto max-w-[100rem] px-6 md:px-12 lg:px-16', className)}>{children}</div>
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string
  title: string
  intro?: string
  center?: boolean
}) {
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center')}>
      {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
      <h2 className="text-4xl md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-[var(--color-ink-soft)]">{intro}</p>}
    </div>
  )
}
