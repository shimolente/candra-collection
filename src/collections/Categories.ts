import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Kategori', plural: 'Kategori' },
  admin: {
    group: 'Katalog',
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'slug'],
    description:
      'Kelompok produk: Shirts, Corporate Uniform, Custom Tailoring, Accessories, Polo, T-shirt, Linen.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Kategori',
    },
    slugField('name'),
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Gambar Kategori',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' },
    },
  ],
}
