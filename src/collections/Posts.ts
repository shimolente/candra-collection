import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Blog / Artikel' },
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
    description: 'Panduan bahan, tren fashion, proses produksi.',
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  versions: { drafts: true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul',
    },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Ringkasan',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Sampul',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Isi Artikel',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Tanggal Terbit',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
  ],
}
