'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export type Slide = { url?: string | null; alt?: string }

// Dark placeholder gradients (legible white overlay) until real photos land.
const PLACEHOLDER_BG = [
  'linear-gradient(135deg,#1a1a18 0%,#3a3a38 100%)',
  'linear-gradient(135deg,#241f1b 0%,#4a4038 100%)',
  'linear-gradient(135deg,#1b211f 0%,#37423e 100%)',
]

export function HeroCarousel({
  slides,
  interval = 5500,
}: {
  slides: Slide[]
  interval?: number
}) {
  const count = slides.length
  const [index, setIndex] = useState(0)

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])

  useEffect(() => {
    if (count <= 1) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, interval])

  return (
    <>
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{
            opacity: i === index ? 1 : 0,
            background: s.url ? undefined : PLACEHOLDER_BG[i % PLACEHOLDER_BG.length],
          }}
        >
          {s.url && (
            <Image
              src={s.url}
              alt={s.alt || ''}
              fill
              priority={i === 0}
              className="object-cover"
            />
          )}
        </div>
      ))}

      {/* Dots */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-[5px] rounded-full transition-all duration-500 ease-out ${
                i === index ? 'w-[19px] bg-white' : 'w-[5px] bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </>
  )
}
