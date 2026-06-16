'use client'

import Image from 'next/image'
import { Play, Pause } from 'lucide-react'
import { useRef, useState } from 'react'

/**
 * Two vertical panels — a product image and a playable video — side by side.
 * Hovering either panel grows it; the video plays/pauses on click.
 * Placeholders use the section's dark ink tone (never grey) so nothing
 * flashes before media loads.
 */
export function CompanyMedia({
  imageUrl,
  imageAlt,
  videoUrl,
  videoPoster,
}: {
  imageUrl?: string | null
  imageAlt?: string
  videoUrl?: string | null
  videoPoster?: string | null
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="flex h-[420px] w-full gap-3 md:h-[520px]">
      {/* Vertical image */}
      <div className="group relative flex-1 overflow-hidden bg-white/5 ring-1 ring-white/10 transition-[flex-grow] duration-500 ease-out hover:flex-[1.7]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt || ''}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>

      {/* Vertical video */}
      <div className="group relative flex-1 overflow-hidden bg-white/5 ring-1 ring-white/10 transition-[flex-grow] duration-500 ease-out hover:flex-[1.7]">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={videoUrl}
              poster={videoPoster || undefined}
              loop
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause video' : 'Play video'}
              className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur-sm transition-opacity duration-300 ${
                  playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                }`}
              >
                {playing ? (
                  <Pause size={24} className="text-white" />
                ) : (
                  <Play size={24} className="ml-0.5 text-white" />
                )}
              </span>
            </button>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
              <Play size={24} className="ml-0.5 text-white" />
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
