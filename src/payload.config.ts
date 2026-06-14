import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Services } from './collections/Services'
import { Posts } from './collections/Posts'
import { Clients } from './collections/Clients'
import { Home } from './globals/Home'
import { Contact } from './globals/Contact'
import { Faq } from './globals/Faq'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Candra Collection',
    },
  },
  collections: [Categories, Products, Services, Posts, Clients, Media, Users],
  globals: [Home, Contact, Faq],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./candra-web.db',
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
})
