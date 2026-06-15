/**
 * One-off: upload existing local /media files to Vercel Blob with exact
 * pathnames so existing Payload media records resolve after the storage switch.
 */
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import { put } from '@vercel/blob'

const MEDIA_DIR = path.resolve(process.cwd(), 'media')
const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) throw new Error('BLOB_READ_WRITE_TOKEN not set')

const run = async () => {
  const files = await readdir(MEDIA_DIR)
  let ok = 0
  for (const name of files) {
    if (name.startsWith('.')) continue
    const body = await readFile(path.join(MEDIA_DIR, name))
    const res = await put(name, body, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    })
    ok++
    console.log(`✓ ${name} → ${res.url}`)
  }
  console.log(`\nUploaded ${ok} files to Vercel Blob.`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
