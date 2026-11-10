#!/usr/bin/env bash
set -euo pipefail
cd /workspace/Dori
npm ci --cache /tmp/dori-npm-cache --no-audit --no-fund
npm run typecheck
npm run build
