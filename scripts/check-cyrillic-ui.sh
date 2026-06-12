#!/usr/bin/env sh
set -eu

pattern='[А-Яа-яЁёІіЇїЄєҐґӘәІіҢңҒғҚқӨөҰұҮүҺһ]'

rg -n "$pattern" \
  --glob '!app/data.js' \
  --glob '!index.html' \
  --glob '!app/practice-content-builder.js' \
  --glob '!practice-content.js' \
  --glob '!practice-content/**' \
  --glob '!scripts/check-cyrillic-ui.sh' \
  --glob '!scripts/check-content-language-leaks.js' \
  --glob '!scripts/smoke-server-api.js' \
  --glob '!node_modules/**' \
  . && {
    printf '\nCyrillic UI text found outside localized content files.\n'
    exit 1
  }

exit 0
