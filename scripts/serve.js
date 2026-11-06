// Servidor local ligero con soporte de URLs limpias (igual que Netlify)
// Uso: node scripts/serve.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const PORT = process.env.PORT || 8080;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
};

http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/') u = '/index.html';
  let fp = path.join(root, u);
  if (!path.extname(fp) && fs.existsSync(fp + '.html')) fp += '.html';
  if (!fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    const p404 = path.join(root, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.existsSync(p404) ? fs.createReadStream(p404).pipe(res) : res.end('404 Not Found');
  }
  res.writeHead(200, {
    'Content-Type': mime[path.extname(fp)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  fs.createReadStream(fp).pipe(res);
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
