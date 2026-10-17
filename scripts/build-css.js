// Une fonts.css + styles.css + fx.css + fx2.css en src/css/site.css (una sola petición bloqueante).
// Hay que ejecutarlo tras tocar cualquiera de esos cuatro ficheros: node scripts/build-css.js
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'css');
const parts = ['fonts.css', 'styles.css', 'fx.css', 'fx2.css'];

// Quita comentarios y espacios sobrantes sin tocar cadenas ni data: URIs
const slim = (css) => css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/[ \t]*\r?\n[ \t]*/g, '\n')
  .replace(/\n{2,}/g, '\n')
  .replace(/[ \t]{2,}/g, ' ')
  .trim();

const out = '/* Generado por scripts/build-css.js: no editar a mano */\n' + parts.map((f) => slim(fs.readFileSync(path.join(dir, f), 'utf8'))).join('\n') + '\n';
fs.writeFileSync(path.join(dir, 'site.css'), out);
const total = parts.reduce((n, f) => n + fs.statSync(path.join(dir, f)).size, 0);
console.log(`site.css: ${out.length} bytes (de ${total} en origen)`);
