(() => {
  const form = document.getElementById('wan-exam-form');
  const result = document.getElementById('wan-exam-result');
  const solutions = document.querySelector('.wan-exam-solutions');
  document.querySelector('[data-wan-print]').addEventListener('click', () => window.print());

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let score = 0;
    let empty = 0;
    for (const question of form.querySelectorAll('[data-correct]')) {
      const answer = question.querySelector('input:checked');
      const correct = answer?.value === question.dataset.correct;
      if (correct) score++;
      if (!answer) empty++;
      const feedback = question.querySelector('.wan-exam-feedback');
      const text = feedback.dataset.explanation ?? feedback.textContent;
      feedback.dataset.explanation = text;
      feedback.textContent = (correct ? 'Corretta. ' : answer ? 'Da rivedere. ' : 'Non risposta. ') + text;
      feedback.classList.toggle('is-correct', correct);
      feedback.hidden = false;
    }
    result.textContent = 'Parte A: ' + score + '/8. Risposte omesse: ' + empty + '.';
    solutions.hidden = false;
  });
})();
