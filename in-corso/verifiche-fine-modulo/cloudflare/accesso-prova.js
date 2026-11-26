import { StudySync } from '../assets/js/studio.js';

const accessoVerifica = document.querySelector('#verifica-docente');
accessoVerifica.addEventListener('click', evento => {
  const sessione = StudySync.session();
  if (!/^[a-f0-9]{64}$/.test(sessione?.token ?? '') || sessione.expiresAt <= Date.now() / 1000 ||
      evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
  evento.preventDefault();
  const form = document.createElement('form');
  form.method = 'post';
  form.action = new URL('accesso-sito', accessoVerifica.href).href;
  const campo = document.createElement('input');
  campo.type = 'hidden';
  campo.name = 'token';
  campo.value = sessione.token;
  form.append(campo);
  document.body.append(form);
  form.submit();
});
