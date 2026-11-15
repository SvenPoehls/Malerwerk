#!/usr/bin/env bash
# Erzeugt dist/ mit ausschließlich den hochzuladenden Dateien.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist && mkdir dist
cp -r *.html css js assets dist/
cp .htaccess robots.txt sitemap.xml site.webmanifest favicon.svg favicon.ico apple-touch-icon.png icon-192.png icon-512.png kontakt.php kontakt-config.php dist/
echo "dist/ erstellt: $(find dist -type f | wc -l) Dateien, $(du -sh dist | cut -f1)"
