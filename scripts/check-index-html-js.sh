#!/bin/sh

set -eu

HTML_FILE="${1:-index.html}"

if [ ! -f "$HTML_FILE" ]; then
  echo "File not found: $HTML_FILE" >&2
  exit 1
fi

TMP_SCRIPT="$(mktemp /tmp/check-index-html-js.XXXXXX.js)"
TMP_STDERR="$(mktemp /tmp/check-index-html-js.XXXXXX.err)"

cleanup() {
  rm -f "$TMP_SCRIPT" "$TMP_STDERR"
}

trap cleanup EXIT INT TERM

perl -0ne 'if (m{<script>([\s\S]*)</script>}s) { print $1 } else { exit 1 }' "$HTML_FILE" > "$TMP_SCRIPT" || {
  echo "Could not extract inline <script> from $HTML_FILE" >&2
  exit 1
}

if osascript -l JavaScript - "$TMP_SCRIPT" > /dev/null 2> "$TMP_STDERR" <<'JXA'
function run(argv) {
  ObjC.import("Foundation");
  var path = $.NSString.stringWithUTF8String(argv[0]);
  var source = $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, null).js;
  Function(source);
}
JXA
then
  if grep -v "Connection Invalid" "$TMP_STDERR" | grep -v "Error received in message reply handler" >/dev/null 2>&1; then
    grep -v "Connection Invalid" "$TMP_STDERR" | grep -v "Error received in message reply handler" >&2 || true
  fi
  echo "Inline script syntax OK: $HTML_FILE"
else
  grep -v "Connection Invalid" "$TMP_STDERR" | grep -v "Error received in message reply handler" >&2 || cat "$TMP_STDERR" >&2
  exit 1
fi
