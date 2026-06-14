import type { GlobalConfig } from 'payload'

export const Faq: GlobalConfig = {
  slug: 'faq',
  label: 'FAQ',
  admin: { group: 'Pengaturan' },
  access: { read: () => true },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Judul Section',
      defaultValue: 'Your questions, answered.',
    },
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Teks Kecil Atas',
      defaultValue: 'Frequently Asked Questions',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Pertanyaan',
      labels: { singular: 'Pertanyaan', plural: 'Pertanyaan' },
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Pertanyaan' },
        { name: 'answer', type: 'textarea', required: true, label: 'Jawaban' },
      ],
    },
  ],
}
