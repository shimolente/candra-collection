'use client'

import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Product image gallery: click a thumbnail to swap the main image,
 * click the main image to open a fullscreen lightbox (arrow keys / Esc supported).
 */
export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  const count = images.length
  const safeActive = Math.min(active, Math.max(0, count - 1))

  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
    }
  }, [open, go])

  if (count === 0) {
    return (
      <div className="aspect-[4/5] w-full overflow-hidden bg-[var(--color-paper-2)] ring-1 ring-[var(--color-line)]" />
    )
  }

  return (
    <div>
      {/* Main image — click to zoom */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View larger image"
        className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-[var(--color-paper-2)] ring-1 ring-[var(--color-line)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[safeActive]}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === safeActive}
              className={`aspect-square overflow-hidden bg-[var(--color-paper-2)] transition-opacity ${
                i === safeActive
                  ? 'ring-2 ring-[var(--color-ink)]'
                  : 'opacity-70 ring-1 ring-[var(--color-line)] hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={22} />
          </button>

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation()
                  go(-1)
                }}
                className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation()
                  go(1)
                }}
                className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[safeActive]}
            alt={title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />

          {count > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {safeActive + 1} / {count}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
