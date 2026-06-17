'use client'

import { useEffect, useRef } from 'react'

/**
 * Fixed bottom scroll-affordance blur that fades out as the page nears its end,
 * so the footer is read crisp (no blur) once you reach the bottom.
 * Opacity maps directly to remaining scroll distance for a gradual fade.
 */
export function BottomBlur() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const FADE = 360 // px from page bottom over which the blur fades to zero
    let raf = 0

    const update = () => {
      raf = 0
      const scrollBottom = window.scrollY + window.innerHeight
      const distance = document.documentElement.scrollHeight - scrollBottom
      el.style.opacity = String(Math.max(0, Math.min(1, distance / FADE)))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 backdrop-blur-[3px]"
      style={{
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, transparent 100%)',
        maskImage: 'linear-gradient(to top, black 0%, black 20%, transparent 100%)',
      }}
    />
  )
}
