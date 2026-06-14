import { getPayload } from 'payload'
import config from './payload.config'

const categories = [
  { name: 'Shirts', order: 1, description: 'Work and formal shirts with clean, precise stitching.' },
  { name: 'Corporate Uniform', order: 2, description: 'Office and corporate uniforms aligned with your brand identity.' },
  { name: 'Custom Tailoring', order: 3, description: 'Custom tailoring built around your specific requirements.' },
  { name: 'Polo', order: 4, description: 'Comfortable polo shirts for everyday operations.' },
  { name: 'T-shirt', order: 5, description: 'Custom t-shirts for teams and events.' },
  { name: 'Accessories', order: 6, description: 'Aprons, caps, scarves, and finishing uniform accessories.' },
  { name: 'Linen', order: 7, description: 'Linen pieces — breathable, elegant, premium.' },
]

const products = [
  { title: 'Hotel Front Office Shirt', cat: 'Shirts', material: 'Cotton Oxford', featured: true, desc: 'Front-office shirt with a crisp collar and breathable fabric.' },
  { title: 'Executive Corporate Set', cat: 'Corporate Uniform', material: 'Wool Blend', featured: true, desc: 'Formal corporate uniform set for management.' },
  { title: 'Restaurant Server Apron', cat: 'Accessories', material: 'Canvas', featured: false, desc: 'Durable apron for restaurant staff.' },
  { title: 'Villa Housekeeping Polo', cat: 'Polo', material: 'Pique Cotton', featured: true, desc: 'Housekeeping polo, comfortable to wear all day.' },
  { title: 'Cafe Crew T-shirt', cat: 'T-shirt', material: 'Combed 24s', featured: false, desc: 'Cafe crew t-shirt with custom print.' },
  { title: 'Linen Chef Jacket', cat: 'Linen', material: 'Pure Linen', featured: true, desc: 'Linen chef jacket — breathable and elegant.' },
  { title: 'Custom Tailored Blazer', cat: 'Custom Tailoring', material: 'Tropical Wool', featured: false, desc: 'Custom-tailored blazer with a precise fit.' },
  { title: 'Spa Therapist Linen Set', cat: 'Linen', material: 'Linen Cotton', featured: false, desc: 'Soft linen spa uniform set.' },
  { title: 'Bellboy Corporate Vest', cat: 'Corporate Uniform', material: 'Gabardine', featured: false, desc: 'Formal bellboy vest with premium detailing.' },
  { title: 'Banquet Dress Shirt', cat: 'Shirts', material: 'Poplin', featured: false, desc: 'Banquet dress shirt for formal hotel events.' },
]

const services = [
  { title: 'Consultation', order: 1, summary: 'We start by understanding your brand identity, dress code requirements, and quantity needs.' },
  { title: 'Master Fitting', order: 2, summary: 'Sample garments are produced and refined until every fit, fabric, and finish meets your standard.' },
  { title: 'Custom Design', order: 3, summary: 'Our team works with your brief — or builds from scratch — to create a uniform that reflects your brand.' },
  { title: 'Bulk Production', order: 4, summary: 'Consistent quality, accurate quantities, and on-schedule delivery — ready for your team when you need them.' },
]

const posts = [
  { title: 'Choosing the Right Uniform Fabric', excerpt: 'Cotton, linen, drill — the strengths of each fabric for your business uniforms.', publishedAt: '2026-05-02' },
  { title: 'Uniform Fashion Trends 2026', excerpt: 'The design directions the hospitality industry is favouring this year.', publishedAt: '2026-05-15' },
  { title: 'Behind Our Production Process', excerpt: 'From pattern to finishing — how your uniforms are made.', publishedAt: '2026-05-28' },
]

const clients = [
  { name: 'The Bali Resort', order: 1 },
  { name: 'Sunset Villas', order: 2 },
  { name: 'Ubud Coffee Co.', order: 3 },
  { name: 'Seminyak Bistro', order: 4 },
]

const run = async () => {
  const payload = await getPayload({ config: await config })

  const existing = await payload.count({ collection: 'categories' })
  if (existing.totalDocs > 0) {
    payload.logger.info('Seed skipped — data already exists.')
    process.exit(0)
  }

  payload.logger.info('Seeding…')

  const catMap: Record<string, string | number> = {}
  for (const c of categories) {
    const doc = await payload.create({ collection: 'categories', data: c })
    catMap[c.name] = doc.id
  }

  for (const p of products) {
    await payload.create({
      collection: 'products',
      data: {
        title: p.title,
        material: p.material,
        featured: p.featured,
        shortDescription: p.desc,
        category: catMap[p.cat],
      },
    })
  }

  for (const s of services) await payload.create({ collection: 'services', data: s })

  for (const post of posts) {
    await payload.create({
      collection: 'posts',
      data: { title: post.title, excerpt: post.excerpt, publishedAt: post.publishedAt, _status: 'published' },
    })
  }

  for (const cl of clients) await payload.create({ collection: 'clients', data: cl })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      heroEyebrow: 'Custom Uniform Specialist — Bali',
      heroHeading: 'Uniforms That Represent Your Brand.',
      heroSubheading:
        "From corporate offices to hospitality floors — we craft custom uniforms tailored to your team's identity, built to your exact specification.",
      ctaLabel: 'Request a Quote',
      ctaLink: '/contact',
      introHeading: 'Consistent production detail.',
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    data: {
      companyName: 'Candra Collection',
      tagline: 'Custom uniform specialist',
      whatsapp: '+62 812-3456-7890',
      email: 'halo@candra-collection.com',
      address: 'Denpasar, Bali, Indonesia',
      instagram: '@candracollection',
      mapsUrl: 'https://maps.google.com',
    },
  })

  payload.logger.info('Seed complete ✓')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
