/* Confeti de la página de confirmación */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cols = ['#FFD400', '#0f0f0f', '#1ea052', '#FFE36A'];
  for (let i = 0; i < 46; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    const w = 6 + Math.random() * 8;
    c.style.cssText = 'left:' + (Math.random() * 100) + 'vw;width:' + w + 'px;height:' + (w * (.5 + Math.random())) + 'px;background:' + cols[i % 4] + ';border-radius:2px;--dx:' + ((Math.random() - .5) * 240) + 'px;--rot:' + ((Math.random() - .5) * 900) + 'deg;animation-duration:' + (2.6 + Math.random() * 2.4) + 's;animation-delay:' + (Math.random() * .9) + 's';
    document.body.append(c);
    c.addEventListener('animationend', () => c.remove());
  }
})();
