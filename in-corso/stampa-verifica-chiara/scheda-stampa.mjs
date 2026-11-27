export function preparaIntestazioniStampa(sorgente) {
  return sorgente
    .replace('<section aria-label="Dati della prova"><p><strong>',
      '<section aria-label="Dati della prova"><h2 class="scheda-titolo-stampa">Modulo 1 · Wi-Fi</h2><p><strong>')
    .replace(/return '<section><h2>Domande chiuse<\/h2>([^]*?) \+ domande \+\r?\n    ('<p class="scheda-totale"[^]*?<\/p>)<\/section>';/,
      "return '<section><h2>Domande chiuse</h2>' +\n    $2' + '$1 + domande + '</section>';")
    .replace('class="scheda-etichetta">Risposta non data', 'class="scheda-etichetta scheda-omissione">Risposta non data')
    .replace("testo(risposta || 'Risposta non data')",
      "(risposta ? testo(risposta) : '<span class=\"scheda-omissione\">Risposta non data</span>')")
    .replace('<tr><th scope="row">Schemi</th><td>—</td><td>',
      '<tr class="scheda-schemi-schermo"><th scope="row">Schemi</th><td class="scheda-punti-non-previsti"></td><td>')
    .replace('\"><span class="scheda-solo-stampa">_____</span></td></tr>\' : \'\';',
      '\"></td></tr><tr class="scheda-schemi-stampa"><td colspan="3"><strong>Schemi</strong>' +
      '<span class="scheda-solo-stampa scheda-spazio-schemi"></span></td></tr>\' : \'\';')
    .replaceAll('>_____</span>', '></span>')
    .replaceAll('>—</td>', '></td>')
    .replaceAll("'—' : formato.format", "'' : formato.format")
    .replace("campo.nextElementSibling.textContent = campo.validity.valid && campo.value !== '' ? valore : '_____';",
      "const spazio = campo.matches('.scheda-giudizio')\n" +
      "    ? campo.closest('tr').nextElementSibling.querySelector('.scheda-spazio-schemi')\n" +
      "    : campo.nextElementSibling;\n" +
      "  spazio.textContent = campo.validity.valid && campo.value !== '' ? valore : '';")
    .replaceAll(/<section><h2>(Domande chiuse|Domande aperte|Esercizi)<\/h2>/g,
      '<section class="scheda-sezione"><h2>$1</h2>')
    .replace(/    const titolo = document\.createElement\('h2'\);\n[^]*?    scheda\.firstElementChild\.prepend\(titolo\);\n/, '');
}
