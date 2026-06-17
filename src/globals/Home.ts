import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: { group: 'Pengaturan' },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        { name: 'heroEyebrow', type: 'text', label: 'Teks Kecil Atas', defaultValue: 'Spesialis Custom Uniforms' },
        { name: 'heroHeading', type: 'text', label: 'Judul Utama', required: true, defaultValue: 'Candra Collection' },
        { name: 'heroSubheading', type: 'textarea', label: 'Sub-judul' },
        {
          name: 'heroSlides',
          type: 'array',
          label: 'Gambar Hero (Carousel)',
          labels: { singular: 'Slide', plural: 'Slide' },
          maxRows: 5,
          admin: { description: 'Gambar carousel hero. Kosongkan untuk pakai placeholder.' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Gambar' },
          ],
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Gambar Hero (tunggal — fallback)',
          admin: { description: 'Dipakai hanya bila "Gambar Hero (Carousel)" kosong.' },
        },
        { name: 'ctaLabel', type: 'text', label: 'Tombol — Teks', defaultValue: 'Request Quote' },
        { name: 'ctaLink', type: 'text', label: 'Tombol — Link', defaultValue: '/contact' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Intro',
      fields: [
        { name: 'introHeading', type: 'text', label: 'Judul' },
        { name: 'introBody', type: 'richText', label: 'Paragraf' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Company Profile (Video)',
      fields: [
        { name: 'videoHeading', type: 'text', label: 'Judul', defaultValue: 'We are Candra Collection Bali' },
        { name: 'videoText', type: 'textarea', label: 'Paragraf' },
        {
          name: 'videoImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Gambar di Samping Video',
          admin: { description: 'Gambar yang tampil di samping video. Kosongkan untuk pakai gambar otomatis.' },
        },
        {
          name: 'companyVideo',
          type: 'upload',
          relationTo: 'media',
          label: 'Video Vertikal (9:16)',
          admin: { description: 'Upload video portrait (mp4). Kosongkan untuk placeholder.' },
        },
        { name: 'videoPoster', type: 'upload', relationTo: 'media', label: 'Poster / Thumbnail (opsional)' },
      ],
    },
  ],
}
