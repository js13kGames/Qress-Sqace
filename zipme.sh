#!/usr/bin/env bash
set -euo pipefail
npm run build
cd dist
zip nesro.zip index.html game.min.js
ls -lah nesro.zip
cd ../
