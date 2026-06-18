'use client'

import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import {
  MessagesSquare,
  FileText,
  Wallet,
  Ruler,
  ClipboardCheck,
  Package,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as const
const ICONS: LucideIcon[] = [MessagesSquare, FileText, Wallet, Ruler, ClipboardCheck, Package]

export type Step = { title: string; summary?: string }

export function HowWeWork({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 55%'],
  })

  return (
    <ol ref={ref} className="relative mt-20">
      {/* Track + animated progress fill */}
      <div className="absolute top-0 bottom-0 left-6 w-px bg-[var(--color-line)] md:left-1/2 md:-translate-x-1/2" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute top-0 bottom-0 left-6 w-px origin-top bg-[var(--color-ink)] md:left-1/2 md:-translate-x-1/2"
      />

      {steps.map((s, i) => {
        const Icon = ICONS[i % ICONS.length]
        const left = i % 2 === 0
        return (
          <li key={i} className="relative py-12 md:py-20">
            {/* Node on the line */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -160px 0px' }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="absolute top-12 left-6 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl bg-white shadow-[0_0_30px_rgba(0,0,0,0.10)] ring-1 ring-[var(--color-line)] md:top-1/2 md:left-1/2 md:h-16 md:w-16 md:-translate-y-1/2"
            >
              <Icon size={26} strokeWidth={1.5} className="text-[var(--color-ink)]" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -160px 0px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className={cn(
                'pl-16 md:w-1/2 md:pl-0',
                left ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20',
              )}
            >
              <div className={cn('flex items-baseline gap-3', left && 'md:justify-end')}>
                <span className="text-4xl font-bold text-[var(--color-line)] md:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-3xl font-semibold md:text-4xl">{s.title}</h3>
              </div>
              {s.summary && (
                <p
                  className={cn(
                    'mt-4 max-w-md text-[var(--color-ink-soft)]',
                    left && 'md:ml-auto',
                  )}
                >
                  {s.summary}
                </p>
              )}
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}
