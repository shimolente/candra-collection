# Candra Collection — Company Profile Website

Marketing + catalog site for **Candra Collection** (custom uniform manufacturer, Bali), with a built-in CMS for non-technical content editing.

## Stack

| Concern        | Tech                                                        |
| -------------- | ----------------------------------------------------------- |
| Framework      | Next.js 16 (App Router, Turbopack)                          |
| CMS            | Payload 3 (admin at `/admin`)                               |
| Database       | SQLite via `@payloadcms/db-sqlite` — local file in dev, [Turso](https://turso.tech) (libSQL) in production |
| Media storage  | Vercel Blob (`@payloadcms/storage-vercel-blob`)             |
| Styling        | Tailwind CSS v4                                             |
| Hosting        | Vercel                                                       |

## Environment

Copy `.env.example` → `.env` and fill in:

```bash
DATABASE_URI=libsql://<your-db>.turso.io   # or file:./candra-web.db for local
DATABASE_AUTH_TOKEN=<turso-token>          # omit for local file DB
PAYLOAD_SECRET=<random-32+-char-secret>
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>  # enables Vercel Blob media storage
```

> `PAYLOAD_SECRET` signs auth tokens — use a long random value and never commit it. `.env`, `*.db`, and `/media` are gitignored.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000  (admin: /admin)
npm run seed         # optional: seed demo catalog/content
```

With no `DATABASE_URI` set, Payload falls back to a local SQLite file (`./candra-web.db`).

## Useful scripts

| Script                     | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `npm run dev`              | Dev server                               |
| `npm run build`            | Production build                         |
| `npm run start`            | Serve the production build               |
| `npm run lint`             | ESLint                                   |
| `npm run generate:types`   | Regenerate `payload-types.ts`            |
| `npm run test:int`         | Vitest integration tests                 |
| `npm run test:e2e`         | Playwright end-to-end tests              |

## Content model

Collections (`src/collections`): `Products`, `Categories`, `Services`, `Posts` (blog), `Clients`, `Media`, `Users`.
Globals (`src/globals`): `Home`, `Contact`, `Faq`.

Public read access is enabled on content collections; all writes require an authenticated admin user. `Posts` only expose `published` items to anonymous visitors.

> **Blog:** the `Posts` collection and `/blog` routes exist but are currently hidden (unlinked, posts unpublished) until real article content is written.

## Deployment

Deployed on **Vercel** (project `candra-collection`). Set the environment variables above in the Vercel project settings. Pushes to `main` deploy to production.

A `Dockerfile` is included for optional self-hosting; it requires `output: 'standalone'` in `next.config.ts`.
