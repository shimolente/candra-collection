'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export type FaqItem = { question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="mt-12 border-t border-[var(--color-line)]">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border-b border-[var(--color-line)]">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="text-lg text-[var(--color-ink)] md:text-xl">{item.question}</span>
              <span className="shrink-0 text-[var(--color-muted)]">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-[var(--color-ink-soft)]">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
