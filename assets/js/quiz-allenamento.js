const QuizAllenamento = (() => {
  const questionCount = 10;
  const reactions = [
    { max: 2, name: 'retry', title: 'Ritrasmissione', message: 'Milo finisce di nuovo alla partenza. Rivedi una domanda e dagli una seconda chance.' },
    { max: 4, name: 'lag', title: 'Lag in partita', message: 'Milo avanza a scatti. Apri la prima correzione per capire dove hai perso il filo.' },
    { max: 6, name: 'checkpoint', title: 'Checkpoint raggiunto', message: 'Milo è a metà percorso. Usa le correzioni per superare il prossimo tratto.' },
    { max: 8, name: 'near', title: 'Server in vista', message: 'Milo ha quasi raggiunto il server. Rivedi i passaggi che ti hanno fatto perdere punti.' },
    { max: 10, name: 'finish', title: 'Arrivo in volata', message: 'Milo, il pacchetto dati, è arrivato al server. Prova un’altra serie per tenere il ritmo.' }
  ];

  function shuffle(items) {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function readAttempt(key) {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (typeof saved?.submitted !== 'boolean' ||
          saved.questions?.length !== questionCount ||
          saved.selections?.length !== questionCount) return null;

      const valid = saved.questions.every((question, index) => {
        const selection = saved.selections[index];
        return typeof question?.prompt === 'string' &&
          /^[\w-]+\.html(?:#[\w-]+)?$/.test(question.source?.href) &&
          typeof question.source.label === 'string' &&
          Array.isArray(question.options) &&
          question.options.every(option => typeof option?.text === 'string' && typeof option.explanation === 'string') &&
          question.options.filter(option => option.correct).length === 1 &&
          (selection === null || (Number.isInteger(selection) && selection >= 0 && selection < question.options.length));
      });
      return valid ? saved : null;
    } catch {
      return null;
    }
  }

  function addFeedbackText(element, label, message) {
    const heading = document.createElement('strong');
    heading.textContent = label;
    element.replaceChildren(heading, document.createElement('br'), message);
  }

  function init(container, bank) {
    const storageKey = 'telecomunicazioni:allenamento:v1:' + container.dataset.trainingKey;
    const form = container.querySelector('.training-form');
    const list = form.querySelector('.training-questions');
    const count = form.querySelector('.training-count');
    const summary = form.querySelector('.training-summary');
    const score = summary.querySelector('h2');
    const breakdown = summary.querySelector('.training-breakdown');
    const rank = summary.querySelector('.training-rank');
    const reviewButton = summary.querySelector('.training-review');
    const message = summary.querySelector('.training-message');
    const actions = form.querySelector('.training-actions');
    const topRetry = form.querySelector('.training-toolbar .training-retry');
    const questionTemplate = document.getElementById('training-question');
    const answerTemplate = document.getElementById('training-answer');
    let attempt = readAttempt(storageKey);
    let cards = [];

    function saveAttempt() {
      try {
        localStorage.setItem(storageKey, JSON.stringify(attempt));
      } catch {
        // The current page remains usable when the browser blocks storage.
      }
    }

    function updateCount() {
      const answered = attempt.selections.filter(selection => selection !== null).length;
      count.textContent = answered + ' risposte su ' + questionCount;
    }

    function renderQuestion(question, index) {
      const card = questionTemplate.content.firstElementChild.cloneNode(true);
      card.dataset.number = index + 1;
      card.querySelector('.training-number').textContent = index + 1;
      card.querySelector('.training-prompt').textContent = question.prompt;
      const grid = card.querySelector('.answers-grid');
      const options = question.options.map((option, position) => {
        const row = answerTemplate.content.firstElementChild.cloneNode(true);
        const input = row.querySelector('input');
        input.name = 'training-q-' + index;
        input.checked = attempt.selections[index] === position;
        input.addEventListener('change', () => {
          if (attempt.submitted || !input.checked) return;
          attempt.selections[index] = position;
          saveAttempt();
          updateCount();
        });
        row.querySelector('.training-answer-text').textContent = option.text;
        grid.append(row);
        return { option, row, input };
      });
      list.append(card);
      return { card, options, source: question.source };
    }

    function reviewQuestion({ card, options, source }) {
      const selected = options.find(({ input }) => input.checked);
      const correct = options.find(({ option }) => option.correct);
      const isCorrect = selected === correct;
      const feedback = card.querySelector('.quiz-feedback');

      options.forEach(entry => {
        entry.input.disabled = true;
        if (entry !== correct && entry !== selected) return;
        const result = entry.row.querySelector('.training-answer-result');
        entry.row.classList.add(entry === correct ? 'correct' : 'wrong');
        result.textContent = entry === correct ? 'Risposta corretta' : 'La tua risposta';
        result.hidden = false;
      });

      feedback.querySelector('h3').textContent = isCorrect
        ? 'Risposta esatta'
        : selected ? 'Risposta da rivedere' : 'Risposta omessa';
      if (selected && !isCorrect) {
        const error = feedback.querySelector('.training-error');
        addFeedbackText(error, 'Perché la tua scelta è sbagliata', selected.option.explanation);
        error.hidden = false;
      }
      if (!isCorrect) {
        const sourceLink = card.querySelector('.training-source');
        sourceLink.href = source.href;
        sourceLink.textContent = source.label;
        sourceLink.hidden = false;
      }
      addFeedbackText(feedback.querySelector('.training-solution'), 'Perché questa risposta è corretta', correct.option.explanation);
      feedback.classList.add('show', isCorrect ? 'feedback-correct' : 'feedback-wrong');
      feedback.hidden = false;
      if (!selected) return 'omitted';
      return isCorrect ? 'correct' : 'wrong';
    }

    function showReview() {
      const totals = { correct: 0, wrong: 0, omitted: 0 };
      cards.forEach(card => totals[reviewQuestion(card)]++);
      score.textContent = totals.correct + ' su ' + questionCount;
      breakdown.textContent = totals.correct + ' corrette · ' + totals.wrong + ' errate · ' + totals.omitted + ' omesse';
      const result = reactions.find(({ max }) => totals.correct <= max);
      message.textContent = result.message;
      rank.textContent = result.title;
      const firstCorrection = list.querySelector('.feedback-wrong');
      reviewButton.hidden = !firstCorrection;
      if (firstCorrection) reviewButton.textContent = 'Rivedi la domanda ' + firstCorrection.closest('.training-card').dataset.number;
      summary.dataset.reaction = result.name;
      actions.hidden = true;
      topRetry.classList.replace('btn-ghost', 'btn-primary');
      summary.hidden = false;
    }

    function renderAttempt() {
      list.replaceChildren();
      cards = attempt.questions.map(renderQuestion);
      summary.hidden = true;
      summary.classList.remove('is-animating');
      actions.hidden = false;
      topRetry.classList.replace('btn-primary', 'btn-ghost');
      form.hidden = false;
      updateCount();
      if (attempt.submitted) showReview();
    }

    function newAttempt() {
      attempt = {
        questions: shuffle(bank).slice(0, questionCount).map(question => ({
          ...question,
          options: shuffle(question.options)
        })),
        selections: Array(questionCount).fill(null),
        submitted: false
      };
      saveAttempt();
      renderAttempt();
    }

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (attempt.submitted) return;

      attempt.submitted = true;
      saveAttempt();
      showReview();

      // Place the expanded result in view before starting its animation.
      score.focus({ preventScroll: true });
      summary.scrollIntoView({ block: 'center', behavior: 'instant' });
      const submittedAttempt = attempt;
      requestAnimationFrame(() => {
        if (attempt === submittedAttempt) summary.classList.add('is-animating');
      });
    });

    reviewButton.addEventListener('click', () => {
      const firstCorrection = list.querySelector('.feedback-wrong .feedback-text');
      firstCorrection.focus({ preventScroll: true });
      firstCorrection.scrollIntoView({ block: 'center', behavior: 'instant' });
    });

    form.querySelectorAll('.training-retry').forEach(button => {
      button.addEventListener('click', () => {
        const heading = container.querySelector('h1');
        newAttempt();
        heading.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    });

    if (attempt) renderAttempt();
    else newAttempt();
  }

  return { init };
})();
