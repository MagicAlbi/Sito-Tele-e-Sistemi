'use strict';

(() => {
  const root = document.documentElement;
  const pulsante = document.querySelector('[data-verifica-tema]');
  const chiave = 'tele5a-theme';
  const icone = {
    sole: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    luna: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
  };

  function mostra(tema) {
    root.dataset.theme = tema;
    const passaAlChiaro = tema === 'dark';
    const etichetta = passaAlChiaro ? 'Passa al tema chiaro' : 'Passa al tema scuro';
    pulsante.innerHTML = passaAlChiaro ? icone.sole : icone.luna;
    pulsante.setAttribute('aria-label', etichetta);
    pulsante.title = etichetta;
  }

  try { mostra(localStorage.getItem(chiave) === 'dark' ? 'dark' : 'light'); }
  catch { mostra('light'); }
  pulsante.addEventListener('click', () => {
    const tema = root.dataset.theme === 'dark' ? 'light' : 'dark';
    mostra(tema);
    try { localStorage.setItem(chiave, tema); } catch {}
  });
  window.addEventListener('storage', evento => {
    if (evento.key === chiave) mostra(evento.newValue === 'dark' ? 'dark' : 'light');
  });
})();
