// Genera sitemap.xml con la fecha real de cada página (lastmod).
// Uso: node scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const B = 'https://telesacoenmadrid.es';

const pages = [
  ['', 'index.html'],
  ['contenedores-escombro-madrid', 'contenedores-escombro-madrid.html'],
  ...fs.readdirSync(root).filter((f) => /^saco-escombro-.*\.html$/.test(f)).sort().map((f) => [f.replace(/\.html$/, ''), f]),
];

const day = (f) => fs.statSync(path.join(root, f)).mtime.toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([slug, f]) => `  <url>\n    <loc>${B}/${slug}</loc>\n    <lastmod>${day(f)}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${pages.length} URLs`);
