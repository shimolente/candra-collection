import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Klien', plural: 'Klien / Portofolio' },
  admin: {
    group: 'Konten',
    useAsTitle: 'name',
    defaultColumns: ['name', 'order'],
    description: 'Logo & nama klien untuk membangun kepercayaan.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Klien',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'url',
      type: 'text',
      label: 'Website (opsional)',
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
