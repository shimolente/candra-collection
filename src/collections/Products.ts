import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Produk', plural: 'Produk' },
  admin: {
    group: 'Katalog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'updatedAt'],
    description: 'Katalog produk (20–50 item). Filter per kategori di website.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Nama Produk',
    },
    slugField('title'),
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          label: 'Kategori',
          admin: { width: '50%' },
        },
        {
          name: 'material',
          type: 'text',
          label: 'Bahan',
          admin: { width: '50%', description: 'mis. Cotton, Linen, Drill.' },
        },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Deskripsi Singkat',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Deskripsi Lengkap',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galeri Foto',
      labels: { singular: 'Foto', plural: 'Foto' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Tampilkan di Home',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
}
