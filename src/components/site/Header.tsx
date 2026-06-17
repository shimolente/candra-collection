'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'

type Cat = { id: string; name: string; slug?: string }

/** Mega-dropdown link with an animated arrow + color shift on hover. */
function MegaLink({
  href,
  onSelect,
  children,
}: {
  href: string
  onSelect: () => void
  children: ReactNode
}) {
  return (
    <Link
      href={href}
      onClick={onSelect}
      className="group/link inline-flex items-center gap-2 text-2xl font-medium text-[var(--color-ink-soft)] transition-colors duration-300 hover:text-[var(--color-ink)]"
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="-translate-x-2 text-xl opacity-0 transition-all duration-300 ease-out group-hover/link:translate-x-0 group-hover/link:opacity-100"
      >
        &rarr;
      </span>
    </Link>
  )
}

const nav = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog', mega: true },
  { href: '/services', label: 'Services' },
  { href: '/clients', label: 'Our Clients' },
  { href: '/about', label: 'About Us' },
]


export function Header({ categories = [], megaImage }: { categories?: Cat[]; megaImage?: string | null }) {
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 bg-white"
      onMouseLeave={() => setMega(false)}
    >
      <div className="flex h-16 w-full items-center justify-between px-6 md:h-20 md:px-12 lg:px-16">
        <Link href="/" onClick={() => setOpen(false)} className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Candra Collection" className="h-7 w-auto md:h-8" />
        </Link>

        {/* Desktop nav — group enables sibling dimming on hover */}
        <nav className="group hidden items-center gap-8 lg:flex lg:gap-10">
          {nav.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              onMouseEnter={() => setMega(Boolean(n.mega))}
              className="group/item relative py-1 text-[15px] font-medium text-[var(--color-ink)] opacity-100 transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
            >
              {n.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-ink)] transition-transform duration-300 ease-out group-hover/item:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          onMouseEnter={() => setMega(false)}
          className="group/item relative hidden py-1 text-[15px] font-medium text-[var(--color-ink)] lg:inline-flex"
        >
          Get a Quote
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--color-ink)] transition-transform duration-300 ease-out group-hover/item:scale-x-100" />
        </Link>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mega dropdown (Catalog) */}
      <div
        className={`absolute inset-x-0 top-full hidden border-b border-[var(--color-line)] bg-white shadow-[0_24px_40px_-24px_rgba(0,0,0,0.18)] transition-all duration-300 lg:block ${
          mega ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="grid w-full grid-cols-[360px_1fr] gap-12 px-6 py-10 md:px-12 lg:px-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-2)]">
            {megaImage && <Image src={megaImage} alt="" fill className="object-cover" />}
          </div>
          <div>
            <div className="eyebrow mb-6">Collections</div>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-4">
              <li>
                <MegaLink href="/catalog" onSelect={() => setMega(false)}>
                  All Products
                </MegaLink>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <MegaLink
                    href={c.slug ? `/catalog?category=${c.slug}` : '/catalog'}
                    onSelect={() => setMega(false)}
                  >
                    {c.name}
                  </MegaLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--color-line)] bg-white lg:hidden">
          <nav className="flex w-full flex-col px-6 py-2">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-line)] py-4 text-base font-medium text-[var(--color-ink)] last:border-0"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 inline-flex h-12 items-center justify-center bg-[var(--color-ink)] text-sm font-medium text-white"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
