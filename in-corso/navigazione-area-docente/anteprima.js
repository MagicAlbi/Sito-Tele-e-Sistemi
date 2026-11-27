'use strict';

const classi = new Map([
  ['quinta-a-tele', { nome: 'Quinta A Tele', anno: '2026–2027', numero: 17 }],
  ['quinta-b-tele', { nome: 'Quinta B Tele', anno: '2026–2027', numero: 14 }],
]);

const area = ['Area docente', '#area-docente'];
const verifiche = ['Verifiche', '#verifiche'];
const codici = ['Codici alunni', '#codici-alunni'];
const viste = new Map([
  ['area-docente', { titolo: 'Area docente', percorso: [area] }],
  ['verifiche', { titolo: 'Verifiche', percorso: [area, ['Nuova verifica', '#verifiche']], mostraVerifiche: true }],
  ['archivio', { titolo: 'Verifiche', percorso: [area, verifiche, ['Archivio', '#archivio']], mostraVerifiche: true }],
  ['codici-alunni', { titolo: 'Codici alunni', percorso: [area, codici] }],
  ['accesso', { titolo: 'Accesso all’Area docente', percorso: [['Accesso', '#accesso']] }],
]);

const percorso = document.querySelector('#percorso');
const titolo = document.querySelector('#titolo');
const contesto = document.querySelector('#contesto');
const sezioni = document.querySelectorAll('[data-vista]');
const menuVerifiche = document.querySelector('#menu-verifiche');
const dettaglio = document.querySelector('#dettaglio-classe');
const elencoClassi = document.querySelector('#elenco-classi');
const alunni = document.querySelector('#alunni');
const tema = document.querySelector('#tema');
const filtroArchivio = document.querySelector('#archivio-classe');
const nuovaClasse = document.querySelector('#nuova-classe');

function creaLink(testo, href) {
  const link = document.createElement('a');
  link.textContent = testo;
  link.href = href;
  return link;
}

function disegnaPercorso(voci) {
  percorso.replaceChildren(...[['Home', '../../index.html'], ...voci].map(([testo, href], indice, tutte) => {
    const voce = document.createElement('li');
    if (indice > 0) {
      const barra = document.createElement('span');
      barra.textContent = '/';
      barra.setAttribute('aria-hidden', 'true');
      voce.append(barra);
    }
    if (indice === tutte.length - 1) {
      const corrente = document.createElement('span');
      corrente.textContent = testo;
      corrente.setAttribute('aria-current', 'page');
      voce.append(corrente);
    } else {
      voce.append(creaLink(testo, href));
    }
    return voce;
  }));
}

for (const [id, classe] of classi) {
  const link = creaLink('', '#' + id);
  link.className = 'module-card docente-codici';
  const nome = document.createElement('h3');
  nome.textContent = classe.nome;
  const informazioni = document.createElement('p');
  informazioni.textContent = `${classe.anno} · ${classe.numero} alunni`;
  link.append(nome, informazioni);
  elencoClassi.append(link);
}

function mostraClasse(classe) {
  contesto.textContent = `Classe ${classe.nome} · ${classe.anno} · ${classe.numero} alunni`;
  alunni.replaceChildren(...Array.from({ length: classe.numero }, (_, indice) => {
    const riga = document.createElement('tr');
    const numero = String(indice + 1).padStart(2, '0');
    const codice = document.createElement('code');
    codice.textContent = 'DEMO-' + numero;
    riga.insertCell().textContent = 'Alunno ' + numero;
    riga.insertCell().append(codice);
    riga.insertCell().textContent = ((indice * 20) % 100) + '%';
    return riga;
  }));
}

function mostraVista(spostaFocus = false) {
  const indirizzo = location.hash.slice(1);
  const id = viste.has(indirizzo) || classi.has(indirizzo) ? indirizzo : 'area-docente';
  const classe = classi.get(id);
  const vista = viste.get(id) ?? { titolo: 'Codici alunni', percorso: [area, codici, [classe.nome, '#' + id]] };
  titolo.textContent = vista.titolo;
  document.title = vista.titolo + ' · Anteprima';
  disegnaPercorso(vista.percorso);
  for (const sezione of sezioni) sezione.hidden = sezione.dataset.vista !== id;
  contesto.hidden = dettaglio.hidden = !classe;
  if (classe) mostraClasse(classe);
  menuVerifiche.hidden = !vista.mostraVerifiche;
  for (const link of menuVerifiche.querySelectorAll('a')) {
    if (link.hash === '#' + id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  if (spostaFocus) {
    window.scrollTo({ top: 0, behavior: 'instant' });
    titolo.focus({ preventScroll: true });
  }
}

function aggiornaTema() {
  const destinazione = document.documentElement.dataset.theme === 'dark' ? 'chiaro' : 'scuro';
  tema.setAttribute('aria-label', 'Passa al tema ' + destinazione);
}

tema.addEventListener('click', () => {
  const radice = document.documentElement;
  radice.dataset.theme = radice.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('tele5a-anteprima-navigazione-tema', radice.dataset.theme); } catch {}
  aggiornaTema();
});

filtroArchivio.addEventListener('change', () => {
  for (const prova of document.querySelectorAll('#prove-archivio li')) {
    prova.hidden = filtroArchivio.value !== '' && filtroArchivio.value !== prova.dataset.classe;
  }
});

nuovaClasse.addEventListener('change', () => {
  const classe = [...classi.values()].find(voce => voce.nome === nuovaClasse.value);
  document.querySelector('#stato-nuova').textContent = classe
    ? `Classe ${classe.nome} · ${classe.anno} · ${classe.numero} alunni`
    : 'Scegli una classe per vedere il riepilogo.';
});

window.addEventListener('hashchange', () => mostraVista(true));
aggiornaTema();
mostraVista();
