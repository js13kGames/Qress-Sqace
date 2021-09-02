!/usr/bin/env bash
set -euo pipefail
zip ./dist/nesro.zip ./dist/index.html ./dist/game.min.js
ls -lah ./dist/nesro.zip
