'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  whatsapp?: string // e.g. "+62 812-3456-7890"
  email?: string
}

const FALLBACK_WA = '+62 812-3456-7890'
const FALLBACK_EMAIL = 'halo@candra-collection.com'

export function ContactForm({ whatsapp, email }: Props) {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')

  const waNumber = (whatsapp || FALLBACK_WA).replace(/\D/g, '') // digits only
  const mail = email || FALLBACK_EMAIL

  const body = [
    'Hi Candra Collection, I would like to request a quote.',
    '',
    `Name: ${name || '-'}`,
    `Company: ${company || '-'}`,
    `Contact: ${contact || '-'}`,
    '',
    'Requirements:',
    message || '-',
  ].join('\n')

  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(body)}`
  const mailHref = `mailto:${mail}?subject=${encodeURIComponent(
    `Request a Quote — ${name || 'Prospective Client'}`,
  )}&body=${encodeURIComponent(body)}`

  const fields: [string, string, (v: string) => void, string][] = [
    ['Name', name, setName, 'Full name'],
    ['Company', company, setCompany, 'Company name'],
    ['Email / WhatsApp', contact, setContact, 'Your contact'],
  ]

  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {fields.map(([label, value, set, ph]) => (
        <div key={label}>
          <label className="eyebrow mb-2 block">{label}</label>
          <input
            type="text"
            value={value}
            onChange={(e) => set(e.target.value)}
            placeholder={ph}
            className="h-12 w-full border border-[var(--color-line)] bg-white px-4 text-sm outline-none focus:border-[var(--color-ink)]"
          />
        </div>
      ))}
      <div>
        <label className="eyebrow mb-2 block">Requirements</label>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Uniform type, quantity, target timeline…"
          className="w-full border border-[var(--color-line)] bg-white p-4 text-sm outline-none focus:border-[var(--color-ink)]"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a href={waHref} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Button type="button" className="w-full sm:w-auto">
            Send via WhatsApp
          </Button>
        </a>
        <a href={mailHref} className="w-full sm:w-auto">
          <Button type="button" variant="outline" className="w-full sm:w-auto">
            Send via Email
          </Button>
        </a>
      </div>
      <p className="text-xs text-[var(--color-muted)]">
        These buttons open WhatsApp or your email app with the message pre-filled.
      </p>
    </form>
  )
}
