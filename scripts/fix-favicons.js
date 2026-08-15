// Replace inline SVG data-URI favicon with real favicon files (Google-friendly)
const fs = require('fs');
const path = require('path');

const files = [
  'aviso-legal.html', 'condiciones-servicio.html', 'condiciones.html', 'index.html',
  'politica-privacidad.html', 'success.html',
  'saco-escombro-alcorcon.html', 'saco-escombro-arganda-del-rey.html', 'saco-escombro-coslada.html',
  'saco-escombro-fuenlabrada.html', 'saco-escombro-getafe.html', 'saco-escombro-leganes.html',
  'saco-escombro-madrid-capital.html', 'saco-escombro-mostoles.html', 'saco-escombro-parla.html',
  'saco-escombro-pozuelo-de-alarcon.html', 'saco-escombro-rivas-vaciamadrid.html',
  'saco-escombro-san-fernando-de-henares.html', 'saco-escombro-san-sebastian-de-los-reyes.html',
];

const newIcons = `<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="32x32" />
<link rel="icon" type="image/png" href="/assets/img/favicon-32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="/assets/img/favicon-192.png" sizes="192x192" />
<link rel="apple-touch-icon" href="/assets/img/favicon-192.png" />`;

const pattern = /<link rel="icon" href="data:image\/svg\+xml,[^"]*" \/>/;

let changed = 0;
files.forEach(f => {
  const p = path.join(__dirname, '..', f);
  if (!fs.existsSync(p)) { console.log(`✗ missing ${f}`); return; }
  let content = fs.readFileSync(p, 'utf8');
  if (pattern.test(content)) {
    content = content.replace(pattern, newIcons);
    fs.writeFileSync(p, content, 'utf8');
    changed++;
    console.log(`✓ ${f}`);
  } else {
    console.log(`- no match in ${f}`);
  }
});
console.log(`\nUpdated ${changed}/${files.length} files.`);
