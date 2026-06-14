import Link from 'next/link'
import { getGlobalSafe } from '@/lib/data'

type Contact = {
  companyName?: string
  email?: string
  whatsapp?: string
}

const columns = [
  {
    title: 'Main',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Us' },
      { href: '/catalog', label: 'Our Shop' },
      { href: '/blog', label: 'Blog Posts' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { href: '/catalog?category=corporate-uniform', label: 'Corporate Uniforms' },
      { href: '/catalog?category=t-shirt', label: 'T-Shirt' },
      { href: '/catalog?category=linen', label: 'Linen' },
      { href: '/catalog?category=polo', label: 'Polo' },
    ],
  },
  {
    title: 'Help',
    links: [
      { href: '/contact', label: 'Support' },
      { href: '/services', label: 'Shipping & Returns' },
      { href: '/about', label: 'Terms' },
      { href: '/about', label: 'Privacy Policy' },
    ],
  },
]

export async function Footer() {
  const contact = await getGlobalSafe<Contact>('contact')
  const company = contact?.companyName || 'Candra Collection'

  return (
    <footer className="bg-[var(--color-ink)] text-white">
      <div className="mx-auto grid max-w-[100rem] gap-12 px-6 py-16 md:grid-cols-4 md:px-12 md:py-20 lg:px-16">
        <div>
          <div className="font-serif text-2xl">{company}</div>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Crafted with purpose. Delivered with precision.
          </p>
          <ul className="mt-6 space-y-1 text-sm text-white/70">
            {contact?.email && <li>{contact.email}</li>}
            {contact?.whatsapp && <li>{contact.whatsapp}</li>}
          </ul>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <div className="eyebrow mb-4 text-white/50">{col.title}</div>
            <ul className="space-y-2 text-sm text-white/70">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[100rem] flex-col gap-2 px-6 py-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
          <span>
            © {new Date().getFullYear()} {company}. All rights reserved.
          </span>
          <span>Designed by WarnaMata</span>
        </div>
      </div>
    </footer>
  )
}
