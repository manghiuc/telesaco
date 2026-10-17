/* Arranque mínimo (se carga síncrono en <head>): marca JS y decide la cortinilla de entrada */
document.documentElement.classList.add('js');
try {
  if ((location.pathname === '/' || location.pathname === '/index.html') && !sessionStorage.getItem('fxIntro')) {
    document.documentElement.classList.add('fx-intro');
  }
} catch (e) { /* sin storage */ }
