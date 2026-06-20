# Deploying candra-web to Hostinger (Business plan, managed Node.js)

The app is **Next 16 + Payload 3.85 + SQLite**. It runs on Hostinger's managed
Node.js web apps. The one rule that makes hosting smooth: **never let the small
hosting box run the full `next build`** — it needs more RAM than the 3 GB plan
provides. Build elsewhere, ship the artifact.

## Why build off-server

`npm run build` is configured with `--max-old-space-size=8000` (8 GB) because
Next 16 + Payload builds are memory-hungry. The Business plan has 3 GB RAM, so a
server-side build will OOM. We use `output: 'standalone'` so the build produces a
self-contained server bundle that we upload and just *run*.

(`npm run build:server` exists as a 2 GB fallback if you must build on the box,
but expect it to be slow or fail — prefer the artifact path below.)

## Build + package (local or CI)

```bash
npm ci
npm run build                      # produces .next/standalone/server.js
./scripts/package-standalone.sh    # assembles ./deploy (adds static + public)
```

`./deploy` then contains: `server.js`, trimmed `node_modules` (incl. prebuilt
`sharp`), `.next/static`, and `public/`. Start command:

```bash
NODE_ENV=production node server.js   # entry file: server.js
```

## Hostinger setup

1. hPanel → **Websites → Node.js app** (or deploy from GitHub, but see note below).
2. Node version: **20.x, 22.x, or 24.x** (engines requires >= 20.9).
3. Entry file: **`server.js`**. Output dir: **`.next`**.
4. Upload the contents of `./deploy` to the app's nodejs directory (file-upload
   method), OR run the build in GitHub Actions and upload the `deploy` artifact.
   Avoid Hostinger's auto-build-on-git-deploy — it runs `next build` on the box.

### Environment variables (hPanel → app → env)

| Var | Value |
|-----|-------|
| `DATABASE_URI` | `file:./candra-web.db` (default; SQLite file on the persistent disk) |
| `PAYLOAD_SECRET` | required — your secret |
| `NODE_ENV` | `production` |
| `BLOB_READ_WRITE_TOKEN` | **required** — same `vercel_blob_…` value as local `.env` (see media below) |

## SQLite

The DB is a file on Hostinger's **persistent** filesystem (unlike serverless),
so it survives restarts. Upload your seeded `candra-web.db` alongside `server.js`,
or run the seed once. Single-writer — fine for a company-profile site. Keep the
`.db` file in your backup rotation.

## Media uploads — current state: Vercel Blob

This project's media **already lives in Vercel Blob.** Verified: with the local
`media/` folder removed, the running app still serves images — they stream from
Blob, not local disk. The `media/` folder in the repo is stale duplicates.

The storage plugin is gated on `BLOB_READ_WRITE_TOKEN` (`src/payload.config.ts`).
Because the bytes are in Blob, deployment is simple — **no image re-upload**:

- Set `BLOB_READ_WRITE_TOKEN` on Hostinger to the **same** `vercel_blob_…` value
  in local `.env`. The DB already references these files; Blob serves them.
- You do **not** need to upload the `media/` folder.

Catches:
- Two vendors — Hostinger (hosting) + Vercel (Blob storage/CDN). Blob has a free
  tier then usage-based billing; watch usage.
- Guard the token (back up `.env`) and keep the Vercel account active — if it
  lapses, images break.

Escape hatch (only if you ever want to leave Vercel): unset the token and the
plugin disables, falling back to local disk in `media/`. You'd then need the
files on disk. Not needed now.

## Email (minor)

No email adapter is configured, so Payload writes emails to the console (admin
password resets, etc.). Add an adapter later if you need transactional email.
Not a hosting blocker.
