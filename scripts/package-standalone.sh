#!/usr/bin/env bash
#
# Assemble a self-contained deployable bundle for managed Node.js hosting
# (e.g. Hostinger Business). Run AFTER `npm run build`.
#
# Next.js `output: 'standalone'` produces .next/standalone/server.js plus a
# trimmed node_modules, but it does NOT copy the static assets or the public
# folder — those must be placed next to server.js by hand. This script does
# that and emits ./deploy ready to upload / start with:
#
#     NODE_ENV=production node server.js
#
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .next/standalone/server.js ]; then
  echo "No standalone build found. Run 'npm run build' first." >&2
  exit 1
fi

rm -rf deploy
mkdir -p deploy

# Core standalone server + trimmed node_modules (includes prebuilt sharp).
cp -R .next/standalone/. deploy/

# Static assets and public files (NOT copied by Next standalone).
mkdir -p deploy/.next
cp -R .next/static deploy/.next/static
[ -d public ] && cp -R public deploy/public

echo "Bundle ready in ./deploy"
echo "Start with: NODE_ENV=production node server.js  (entry file: server.js)"
