(() => {
  const root = document.querySelector('#numerical-exercises');
  if (!root) return;

  const { reference, types } = window.numericalExercises;
  const formulas = root.querySelector('#exercise-formulas');
  const picker = root.querySelector('.exercise-picker');
  const menu = root.querySelector('#exercise-type');
  const start = root.querySelector('#exercise-start');
  const form = root.querySelector('#exercise-form');
  const pair = root.querySelector('#exercise-pair');
  const summary = root.querySelector('#exercise-summary');
  let cards = [];

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function parseNumber(text) {
    const value = text.trim().replace(/^−/, '-');
    if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(value)) return NaN;
    return Number(value.replace(',', '.'));
  }

  function matches(value, expected, decimals) {
    if (decimals === 0) return value === expected;
    const tolerance = 0.5 / 10 ** decimals;
    const roundingError = Number.EPSILON * Math.max(1, Math.abs(expected));
    return Math.abs(value - expected) <= tolerance + roundingError;
  }

  function matchesAnswer(value, { value: expected, tolerance = 0 }) {
    if (tolerance === 0) return value === expected;
    const margin = Math.abs(expected) * tolerance;
    return value >= expected - margin && value <= expected + margin;
  }

  function renderFacts(facts, className) {
    const list = element('dl', undefined, className);
    for (const [label, value] of facts) {
      const fact = element('div');
      fact.append(element('dt', label), element('dd', value));
      list.append(fact);
    }
    return list;
  }

  function renderEquations(equations) {
    const group = element('div', undefined, 'exercise-equations');
    for (const equation of equations) group.append(element('p', equation));
    return group;
  }

  function renderCard(exercise, index, tone) {
    const card = element('section', undefined, 'exercise-card');
    card.dataset.tone = tone;
    const heading = element('h2', exercise.title);
    heading.id = `exercise-card-title-${index}`;
    heading.tabIndex = -1;
    card.setAttribute('aria-labelledby', heading.id);
    const header = element('header', undefined, 'exercise-card-header');
    header.append(element('p', `Esercizio ${index + 1}`, 'exercise-card-number'), heading,
      element('p', exercise.context, 'exercise-context'));
    card.append(header, renderFacts(exercise.facts, 'exercise-facts'),
      element('p', exercise.task, 'exercise-task'));

    const fields = element('fieldset', undefined, 'exercise-fields');
    fields.append(element('legend', 'I tuoi risultati'));
    const answers = exercise.answers.map((answer, answerIndex) => {
      const row = element('div', undefined, 'exercise-answer');
      const input = element('input');
      input.type = 'text';
      input.id = `exercise-${index}-answer-${answerIndex}`;
      // A text keyboard also offers a minus sign on phones.
      input.inputMode = answer.signed ? 'text' : 'decimal';
      input.autocomplete = 'off';
      input.spellcheck = false;
      const control = element('div', undefined, 'exercise-input');
      const label = element('label', answer.label);
      const unit = element('span', answer.unit, 'exercise-unit');
      unit.id = `${input.id}-unit`;
      label.htmlFor = input.id;
      const exactNote = answer.decimals === 0 ? 'Numero intero.' : 'Valore esatto.';
      const precision = answer.tolerance
        ? `Arrotonda a ${answer.decimals} decimali. Tolleranza ±${answer.tolerance * 100}%.`
        : exactNote;
      const note = element('p', precision, 'exercise-note');
      const feedback = element('p', '', 'exercise-feedback');
      note.id = `${input.id}-precision`;
      feedback.id = `${input.id}-feedback`;
      feedback.hidden = true;
      input.setAttribute('aria-describedby', `${unit.id} ${note.id} ${feedback.id}`);
      control.append(input, unit);
      row.append(label, control, note, feedback);
      fields.append(row);
      return { input, feedback, answer };
    });

    const guide = element('section', undefined, 'exercise-guide');
    guide.hidden = true;
    const guideHeading = element('h3', 'Svolgimento completo');
    guideHeading.id = `exercise-guide-title-${index}`;
    guideHeading.tabIndex = -1;
    guide.setAttribute('aria-labelledby', guideHeading.id);
    const steps = element('ol', undefined, 'exercise-steps');
    for (const [stepIndex, { title, text, equations }] of exercise.steps.entries()) {
      const step = element('li');
      const number = element('span', String(stepIndex + 1), 'exercise-step-number');
      number.setAttribute('aria-hidden', 'true');
      step.append(number, element('h4', title), element('p', text), renderEquations(equations));
      steps.append(step);
    }
    const result = element('div', undefined, 'exercise-result');
    const resultFacts = exercise.answers.map(({ label, value, decimals, unit }) => [
      label, `${value.toFixed(decimals).replace('.', ',').replace(/^-/, '−')} ${unit}`
    ]);
    result.append(element('h4', 'Risultato'), renderFacts(resultFacts, 'exercise-result-values'));
    if (exercise.conclusion) result.append(element('p', exercise.conclusion));
    guide.append(guideHeading, steps, result);
    card.append(fields, guide);
    return { card, heading, answers, guide, guideHeading };
  }

  for (const [index, type] of types.entries()) {
    const option = element('option', type.title);
    option.value = index;
    menu.append(option);
  }

  for (const item of reference) {
    const tile = element('article', undefined, 'exercise-formula');
    tile.dataset.tone = item.tone;
    const link = element('a', `${item.lessonLabel} →`);
    link.href = item.lesson;
    link.setAttribute('aria-label', `${item.lessonLabel}, ripassa ${item.title.toLowerCase()}`);
    tile.append(
      element('h3', item.title),
      renderEquations(item.equations),
      element('p', item.symbols, 'exercise-symbols'),
      element('p', item.use, 'exercise-use'),
      link
    );
    formulas.append(tile);
  }

  start.addEventListener('click', () => {
    const type = types[Number(menu.value)];
    const available = [...type.exercises];
    const first = available.splice(Math.floor(Math.random() * available.length), 1)[0];
    const second = available[Math.floor(Math.random() * available.length)];
    cards = [first, second].map((exercise, index) => renderCard(exercise, index, type.tone));
    pair.replaceChildren(...cards.map(({ card }) => card));
    form.hidden = false;
    summary.textContent = '';
    start.textContent = 'Estrai altri due esercizi';
    cards[0].heading.focus({ preventScroll: true });
    cards[0].heading.scrollIntoView({ block: 'start', behavior: 'instant' });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const results = cards.flatMap(({ answers, guide }) =>
      answers.map(({ input, answer, feedback }) => ({ input, answer, feedback, guide, value: parseNumber(input.value) }))
    );
    const invalid = results.filter(({ value }) => !Number.isFinite(value));
    for (const { guide } of cards) guide.hidden = true;
    for (const { input, feedback, value } of results) {
      const valid = Number.isFinite(value);
      input.setAttribute('aria-invalid', String(!valid));
      feedback.dataset.status = 'error';
      feedback.hidden = valid;
      feedback.textContent = valid ? '' : input.value.trim() ? 'Inserisci un numero, senza unità.' : 'Inserisci il risultato.';
    }
    if (invalid.length) {
      summary.textContent = 'Completa i campi segnalati per vedere la correzione.';
      invalid[0].input.focus();
      return;
    }

    let correct = 0;
    for (const { input, answer, feedback, guide, value } of results) {
      feedback.hidden = false;
      const isCorrect = matchesAnswer(value, answer);
      input.setAttribute('aria-invalid', String(!isCorrect));
      feedback.dataset.status = isCorrect ? 'correct' : 'error';
      if (isCorrect) {
        feedback.textContent = 'Corretto.';
        correct++;
        continue;
      }
      const knownError = answer.errors?.find(({ value: expected }) => matches(value, expected, answer.decimals));
      feedback.textContent = knownError
        ? `Risultato da rivedere. ${knownError.hint}`
        : 'Risultato da rivedere. Confronta il tuo calcolo con lo svolgimento.';
      guide.hidden = false;
    }
    summary.textContent = correct === results.length
      ? `Sfida superata! Tutti i ${correct} risultati sono corretti.`
      : `${correct} su ${results.length} risultati corretti. Lo svolgimento è sotto gli esercizi con errori.`;
    const firstGuide = cards.find(({ guide }) => !guide.hidden);
    if (firstGuide) {
      firstGuide.guideHeading.focus({ preventScroll: true });
      firstGuide.guideHeading.scrollIntoView({ block: 'start', behavior: 'instant' });
    } else {
      summary.focus();
    }
  });

  root.querySelector('.exercise-reference').hidden = false;
  picker.hidden = false;
})();
