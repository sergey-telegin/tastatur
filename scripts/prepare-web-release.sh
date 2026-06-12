#!/bin/sh
set -eu

target_dir="${1:-}"

if [ -z "$target_dir" ]; then
  echo "Usage: sh scripts/prepare-web-release.sh <target-dir>" >&2
  exit 2
fi

rm -rf "$target_dir"
mkdir -p "$target_dir"

for file in \
  CNAME \
  googlea48f8e75ced8bc47.html \
  hands.svg \
  index.html \
  practice-content.js \
  privacy.html \
  roadmap.html \
  robots.txt \
  sitemap.xml \
  support.html
do
  cp "$file" "$target_dir/"
done

for dir in \
  app \
  assets \
  practice-content \
  site-content \
  styles
do
  cp -R "$dir" "$target_dir/"
done

find "$target_dir" -name ".DS_Store" -delete
