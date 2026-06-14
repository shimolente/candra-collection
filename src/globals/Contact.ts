import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Kontak & Brand',
  admin: { group: 'Pengaturan' },
  access: { read: () => true },
  fields: [
    { name: 'companyName', type: 'text', label: 'Nama Perusahaan', defaultValue: 'Candra Collection' },
    { name: 'tagline', type: 'text', label: 'Tagline', defaultValue: 'Spesialis custom uniforms' },
    { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo' },
    {
      type: 'row',
      fields: [
        { name: 'whatsapp', type: 'text', label: 'WhatsApp', admin: { width: '50%' } },
        { name: 'email', type: 'email', label: 'Email', admin: { width: '50%' } },
      ],
    },
    { name: 'address', type: 'textarea', label: 'Alamat' },
    {
      type: 'row',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram', admin: { width: '50%' } },
        { name: 'mapsUrl', type: 'text', label: 'Google Maps URL', admin: { width: '50%' } },
      ],
    },
  ],
}
