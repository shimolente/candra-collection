import { getPayload } from 'payload'
import config from '../src/payload.config'

// Translate all seeded Indonesian CMS content to English.
const categoryDesc: Record<string, string> = {
  Shirts: 'Work and formal shirts with clean, precise stitching.',
  'Corporate Uniform': 'Office and corporate uniforms aligned with your brand identity.',
  'Custom Tailoring': 'Custom tailoring built around your specific requirements.',
  Polo: 'Comfortable polo shirts for everyday operations.',
  'T-shirt': 'Custom t-shirts for teams and events.',
  Accessories: 'Aprons, caps, scarves, and finishing uniform accessories.',
  Linen: 'Linen pieces — breathable, elegant, premium.',
}

const productDesc: Record<string, string> = {
  'Hotel Front Office Shirt': 'Front-office shirt with a crisp collar and breathable fabric.',
  'Executive Corporate Set': 'Formal corporate uniform set for management.',
  'Restaurant Server Apron': 'Durable apron for restaurant staff.',
  'Villa Housekeeping Polo': 'Housekeeping polo, comfortable to wear all day.',
  'Cafe Crew T-shirt': 'Cafe crew t-shirt with custom print.',
  'Linen Chef Jacket': 'Linen chef jacket — breathable and elegant.',
  'Custom Tailored Blazer': 'Custom-tailored blazer with a precise fit.',
  'Spa Therapist Linen Set': 'Soft linen spa uniform set.',
  'Bellboy Corporate Vest': 'Formal bellboy vest with premium detailing.',
  'Banquet Dress Shirt': 'Banquet dress shirt for formal hotel events.',
}

const postTrans: Record<string, { title: string; excerpt: string }> = {
  'Panduan Memilih Bahan Uniform': {
    title: 'Choosing the Right Uniform Fabric',
    excerpt: 'Cotton, linen, drill — the strengths of each fabric for your business uniforms.',
  },
  'Tren Fashion Uniform 2026': {
    title: 'Uniform Fashion Trends 2026',
    excerpt: 'The design directions the hospitality industry is favouring this year.',
  },
  'Di Balik Proses Produksi Kami': {
    title: 'Behind Our Production Process',
    excerpt: 'From pattern to finishing — how your uniforms are made.',
  },
}

const run = async () => {
  const payload = await getPayload({ config: await config })

  for (const c of (await payload.find({ collection: 'categories', limit: 100 })).docs) {
    const d = categoryDesc[c.name as string]
    if (d) await payload.update({ collection: 'categories', id: c.id, data: { description: d } })
  }

  for (const p of (await payload.find({ collection: 'products', limit: 200 })).docs) {
    const d = productDesc[p.title as string]
    if (d) await payload.update({ collection: 'products', id: p.id, data: { shortDescription: d } })
  }

  for (const post of (await payload.find({ collection: 'posts', limit: 200 })).docs) {
    const t = postTrans[post.title as string]
    if (t) await payload.update({ collection: 'posts', id: post.id, data: t })
  }

  await payload.updateGlobal({
    slug: 'contact',
    data: { tagline: 'Custom uniform specialist' },
  })
  await payload.updateGlobal({
    slug: 'home',
    data: { introHeading: 'Consistent production detail.' },
  })

  payload.logger.info('Content translated to English ✓')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
