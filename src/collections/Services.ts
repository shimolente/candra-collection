import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Layanan', plural: 'Layanan' },
  admin: {
    group: 'Konten',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    description: 'Consultation, Master Fitting, Custom Design, Bulk Production.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nama Layanan',
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Ringkasan',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
