/* ============================================================
   app.js — Core & Interactive Engine v2
   Telecomunicazioni 5A — IIS J.C. Maxwell
   ============================================================ */

'use strict';

/* ---- Dark / Light Mode ---- */
const ThemeManager = (() => {
  const KEY = 'tele5a-theme';
  const root = document.documentElement;

  function get() {
    return localStorage.getItem(KEY) || 'dark';
  }

  function set(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro');
      btn.innerHTML = theme === 'dark' ? iconSun() : iconMoon();
    });
  }

  function toggle() { set(get() === 'dark' ? 'light' : 'dark'); }

  function init() {
    set(get());
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
  }

  return { init, toggle, get };
})();

/* ---- Icone SVG inline ---- */
function iconSun() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
}
function iconMoon() {
  return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}
function iconCheck() {
  return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
}
function iconArrowRight() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
}
function iconArrowLeft() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`;
}

/* ---- Reading Progress Bar ---- */
const ReadingProgressBar = (() => {
  function init() {
    let bar = document.querySelector('.reading-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'reading-progress-bar';
      document.body.appendChild(bar);
    }

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      bar.style.width = scrolled + '%';
    }, { passive: true });
  }
  return { init };
})();

/* ---- Scroll Reveal (IntersectionObserver) ---- */
const ScrollReveal = (() => {
  function init() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }
  return { init };
})();

/* ---- Micro Confetti Particle FX (No external libs) ---- */
const ConfettiFx = (() => {
  function fire() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#38bdf8', '#818cf8', '#a78bfa', '#34d399', '#fbbf24', '#f472b6'];
    const particles = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        alpha: 1
      });
    }

    let frame = 0;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98;
        p.rotation += p.rSpeed;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 180) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(animate);
  }
  return { fire };
})();

/* ---- Progress Tracking ---- */
const studyPath = /\/modulo1\/(?:index\.html|allenamento\.html|lezione-1-[1-6]\.html)?$/.test(location.pathname);
if (studyPath) {
  import(new URL('studio.js', document.currentScript.src)).then(({ StudySync }) => {
    StudySync.showStatus();
    window.dispatchEvent(new Event('studio-change'));
  }).catch(() => {});
}

const Progress = (() => {
  const KEY = 'tele5a-progress';

  function getLocal() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch { return {}; }
  }

  function getAll() {
    const local = getLocal();
    if (!window.StudySync?.active()) return local;
    for (const lesson of Object.keys(local)) {
      if (/^m1-[1-6]$/.test(lesson)) delete local[lesson];
    }
    return { ...local, ...window.StudySync.progress() };
  }

  function markDone(lessonId) {
    const value = { done: true, date: new Date().toISOString() };
    if (window.StudySync?.active() && /^m1-[1-6]$/.test(lessonId)) {
      if (!window.StudySync.markDone(lessonId, value)) return;
    } else {
      const p = getLocal();
      p[lessonId] = value;
      localStorage.setItem(KEY, JSON.stringify(p));
    }
    updateUI(lessonId);
    ConfettiFx.fire();
  }

  function isDone(lessonId) {
    return !!getAll()[lessonId]?.done;
  }

  function getModuleProgress(moduleId, totalLessons) {
    const p = getAll();
    const done = Object.keys(p).filter(k => k.startsWith(moduleId + '-') && p[k].done).length;
    return { done, total: totalLessons, pct: totalLessons ? Math.round((done / totalLessons) * 100) : 0 };
  }

  function getTotalProgress() {
    const p = getAll();
    return Object.keys(p).filter(k => p[k].done).length;
  }

  function updateUI(lessonId) {
    const btn = document.querySelector('.mark-done-btn');
    if (btn) {
      btn.classList.add('done');
      btn.innerHTML = `${iconCheck()} Completata con successo!`;
      btn.disabled = true;
    }
    document.querySelectorAll(`.sidebar-nav li[data-lesson="${lessonId}"]`).forEach(li => {
      li.classList.add('completed');
      const chk = li.querySelector('.lesson-check');
      if (chk) chk.innerHTML = iconCheck();
    });
    refreshModuleProgress();
  }

  function refreshModuleProgress() {
    document.querySelectorAll('[data-module-progress]').forEach(el => {
      const moduleId = el.dataset.moduleProgress;
      const total = parseInt(el.dataset.total || '0');
      const { done, pct } = getModuleProgress(moduleId, total);
      const fill = el.querySelector('.progress-fill, .module-progress-fill');
      const label = el.querySelector('[data-progress-pct]');
      if (fill) fill.style.width = pct + '%';
      if (label) label.textContent = window.StudySync && moduleId === 'm1' ? pct : `${pct}%`;
      const doneTxt = el.querySelector('[data-progress-done]');
      if (doneTxt) doneTxt.textContent = window.StudySync && moduleId === 'm1' ? done : `${done}/${total}`;
    });
    const totalEl = document.querySelector('[data-total-done]');
    if (totalEl) totalEl.textContent = getTotalProgress();
  }

  function init(currentLessonId) {
    const studyButton = document.querySelector('.mark-done-btn');
    if (studyPath && studyButton && currentLessonId) {
      const originalLabel = studyButton.innerHTML;
      window.addEventListener('studio-change', () => {
        const done = isDone(currentLessonId);
        studyButton.classList.toggle('done', done);
        studyButton.disabled = done;
        studyButton.innerHTML = done ? `${iconCheck()} Lezione completata!` : originalLabel;
      });
    }
    if (studyPath || document.querySelector('.study-access')) {
      window.addEventListener('studio-change', () => {
        const progress = getAll();
        document.querySelectorAll('.sidebar-nav li[data-lesson^="m1-"]').forEach(item => {
          const done = Boolean(progress[item.dataset.lesson]?.done);
          item.classList.toggle('completed', done);
          const check = item.querySelector('.lesson-check');
          if (check) check.innerHTML = done ? iconCheck() : '';
        });
        refreshModuleProgress();
      });
    }
    if (currentLessonId && isDone(currentLessonId)) {
      const btn = document.querySelector('.mark-done-btn');
      if (btn) {
        btn.classList.add('done');
        btn.innerHTML = `${iconCheck()} Lezione completata!`;
        btn.disabled = true;
      }
    }
    const p = getAll();
    Object.keys(p).forEach(lessonId => {
      if (p[lessonId].done) {
        document.querySelectorAll(`.sidebar-nav li[data-lesson="${lessonId}"]`).forEach(li => {
          li.classList.add('completed');
          const chk = li.querySelector('.lesson-check');
          if (chk) chk.innerHTML = iconCheck();
        });
      }
    });
    refreshModuleProgress();

    const btn = document.querySelector('.mark-done-btn');
    if (btn && currentLessonId && (studyPath || !isDone(currentLessonId))) {
      btn.addEventListener('click', () => markDone(currentLessonId));
    }
  }

  return { init, markDone, isDone, getModuleProgress, refreshModuleProgress, getTotalProgress };
})();

/* ---- Sidebar mobile ---- */
const SidebarManager = (() => {
  function init() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.btn-hamburger');
    if (!sidebar || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', e => {
      if (sidebar.classList.contains('open') &&
          !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
  return { init };
})();

/* ---- Modalità Presentazione ---- */
const PresentationMode = (() => {
  let currentSlide = 0;
  let slides = [];
  let presenterEl = null;
  let counterEl = null;
  let prevBtn = null;
  let nextBtn = null;
  let origins = [];
  let returnFocus = null;
  let scrollPosition = 0;

  function buildPresenter() {
    const pageSections = document.querySelectorAll('.slide');
    if (pageSections.length === 0) return false;

    slides = Array.from(pageSections);

    presenterEl = document.createElement('div');
    presenterEl.className = 'slides-presenter';

    const lessonTitle = document.querySelector('.lesson-title-h1')?.textContent || '';
    presenterEl.innerHTML = `
      <div class="presenter-topbar">
        <div>
          <div class="presenter-info">Maxwell / Laboratorio di telecomunicazioni</div>
          <div class="presenter-title">${lessonTitle}</div>
        </div>
        <div class="presenter-counter">
          <span id="slideNum">1</span> / <span id="slideTotal">${slides.length}</span>
        </div>
        <button class="btn btn-ghost btn-sm" id="exitPresent">✕ Esci (ESC)</button>
      </div>
      <div class="presenter-slides-wrap" id="presenterSlidesWrap"></div>
      <div class="presenter-controls">
        <button class="presenter-nav-btn" id="prevSlide" disabled>
          ${iconArrowLeft()} Precedente
        </button>
        <div style="flex:1;text-align:center">
          <span style="font-size:.8rem;color:var(--text-muted)">Usa le frecce della tastiera ← → o Barra Spaziatrice</span>
        </div>
        <button class="presenter-nav-btn" id="nextSlide">
          Successivo ${iconArrowRight()}
        </button>
      </div>
    `;

    const wrap = presenterEl.querySelector('#presenterSlidesWrap');
    wrap.style.flex = '1';
    wrap.style.overflow = 'hidden';
    wrap.style.position = 'relative';

    document.body.appendChild(presenterEl);
    presenterEl.setAttribute('role', 'dialog');
    presenterEl.setAttribute('aria-modal', 'true');
    presenterEl.setAttribute('aria-label', 'Presentazione della lezione');
    counterEl = presenterEl.querySelector('#slideNum');
    counterEl.setAttribute('aria-live', 'polite');

    counterEl = presenterEl.querySelector('#slideNum');
    prevBtn   = presenterEl.querySelector('#prevSlide');
    nextBtn   = presenterEl.querySelector('#nextSlide');

    presenterEl.querySelector('#exitPresent').addEventListener('click', stop);
    prevBtn.addEventListener('click', () => goTo(currentSlide - 1));
    nextBtn.addEventListener('click', () => goTo(currentSlide + 1));

    return true;
  }

  function goTo(idx) {
    const presSlides = presenterEl.querySelectorAll('.presenter-slide');
    if (idx < 0 || idx >= presSlides.length) return;
    presSlides[currentSlide].classList.remove('active-slide');
    presSlides[currentSlide].inert = true;
    currentSlide = idx;
    presSlides[currentSlide].classList.add('active-slide');
    presSlides[currentSlide].inert = false;
    presSlides[currentSlide].scrollTop = 0;
    if (counterEl) counterEl.textContent = currentSlide + 1;
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === presSlides.length - 1;
    window.dispatchEvent(new Event('resize'));
  }

  function start() {
    if (document.body.classList.contains('presenting')) return;
    if (!presenterEl) { if (!buildPresenter()) return; }
    returnFocus = document.activeElement;
    scrollPosition = window.scrollY;
    const wrap = presenterEl.querySelector('#presenterSlidesWrap');
    // Move live elements, never copies. Give each experiment its own screen.
    origins = [];
    slides.forEach(section => {
      let page = null;
      const title = section.querySelector('h2')?.textContent || 'Lezione';
      const newPage = (heading) => {
        page = document.createElement('section');
        page.className = 'presenter-slide';
        page.inert = true;
        page.tabIndex = -1;
        if (heading) {
          const h = document.createElement('h2');
          h.textContent = heading;
          page.appendChild(h);
        }
        wrap.appendChild(page);
      };
      Array.from(section.children).forEach(element => {
        const experiment = element.matches('.lab-panel');
        if (experiment) newPage(element.querySelector('h3')?.textContent || title);
        else if (!page || (page.textContent.length > 1300) || (element.matches('h3') && page.children.length > 2)) {
          newPage(element.matches('h2, h3') ? '' : title + ' · continua');
        }
        const marker = document.createComment('presentation-origin');
        element.before(marker);
        page.appendChild(element);
        origins.push({ element, marker });
        if (experiment) page = null;
      });
    });
    presenterEl.querySelector('#slideTotal').textContent = wrap.children.length;
    document.querySelector('.app-layout').inert = true;
    currentSlide = 0;
    document.body.classList.add('presenting');
    goTo(0);
    presenterEl.querySelector('#exitPresent').focus();
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }

  function stop() {
    if (!document.body.classList.contains('presenting')) return;
    document.body.classList.remove('presenting');
    origins.forEach(({ element, marker }) => marker.replaceWith(element));
    origins = [];
    presenterEl.querySelector('#presenterSlidesWrap').replaceChildren();
    document.querySelector('.app-layout').inert = false;
    returnFocus?.focus({ preventScroll: true });
    window.scrollTo(0, scrollPosition);
    window.dispatchEvent(new Event('resize'));
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }

  function handleKey(e) {
    if (!document.body.classList.contains('presenting')) return;
    if (e.key === 'Escape') { stop(); return; }
    if (e.key === 'Tab') {
      const focusable = Array.from(presenterEl.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]'))
        .filter(el => !el.disabled && !el.closest('[inert]') && el.getClientRects().length);
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      return;
    }
    if (e.target.closest('input, select, textarea, canvas, [contenteditable="true"]')) return;
    if (e.key === ' ' && e.target.closest('button, a')) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault(); goTo(currentSlide + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault(); goTo(currentSlide - 1);
    }
    if (e.key === 'Escape') stop();
  }

  function init() {
    document.querySelectorAll('[data-present]').forEach(btn => {
      btn.addEventListener('click', start);
    });
    document.addEventListener('keydown', handleKey);
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && document.body.classList.contains('presenting')) stop();
    });
  }

  return { init };
})();

/* ---- Quiz Engine (Interactive & Game-like) ---- */
const QuizEngine = (() => {

  function init(containerId, questions) {
    const container = document.getElementById(containerId);
    if (!container || !questions?.length) return;

    let current = 0;
    let score = 0;
    let answered = false;
    const total = questions.length;
    const lessonId = document.body.dataset.lessonId;
    const studyQuiz = /^m1-[1-6]$/.test(lessonId || '');

    function showLatest() {
      const label = container.querySelector('[data-last-study-score]');
      if (!label) return;
      const latest = window.StudySync?.latestQuiz(lessonId);
      label.hidden = !latest;
      label.textContent = latest ? 'Ultimo risultato salvato: ' + latest.score + '/' + latest.total : '';
    }
    if (studyQuiz) window.addEventListener('studio-change', showLatest);

    function render() {
      if (current >= total) { showScore(); return; }
      const q = questions[current];
      answered = false;

      container.innerHTML = `
        <div class="quiz-header">
          <span class="quiz-title">⚡ Checkpoint di comprensione</span>
          <span class="quiz-counter">${current + 1} di ${total}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width:${((current)/total)*100}%"></div>
        </div>
        ${studyQuiz ? '<p class="quiz-score-sub" data-last-study-score hidden></p>' : ''}
        <div class="question-text">${q.question}</div>
        <div class="answers-grid" id="answersGrid">
          ${q.answers.map((a, i) => `
            <button class="answer-btn" data-idx="${i}">
              <span class="answer-letter">${'ABCD'[i]}</span>
              <span>${a.text}</span>
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
        <div class="quiz-nav">
          <button class="btn btn-primary hidden" id="nextQBtn">
            ${current < total - 1 ? 'Prossima sfida ' + iconArrowRight() : 'Vedi punteggio ' + iconArrowRight()}
          </button>
        </div>
      `;

      container.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', () => selectAnswer(btn, q));
      });
      document.getElementById('nextQBtn').addEventListener('click', () => { current++; render(); });
      if (studyQuiz) showLatest();
    }

    function selectAnswer(btn, q) {
      if (answered) return;
      answered = true;
      const idx = parseInt(btn.dataset.idx);
      const correct = q.answers[idx].correct;

      container.querySelectorAll('.answer-btn').forEach((b, i) => {
        b.disabled = true;
        if (q.answers[i].correct) b.classList.add('correct');
        else if (i === idx && !correct) b.classList.add('wrong');
      });

      const feedback = document.getElementById('quizFeedback');
      feedback.classList.add('show');
      if (correct) {
        score++;
        feedback.className = 'quiz-feedback show feedback-correct';
        feedback.innerHTML = `
          <div class="feedback-icon">🎉</div>
          <div class="feedback-text">Centro esatto!</div>
          <div class="feedback-explain">${q.explain_correct || ''}</div>
        `;
      } else {
        feedback.className = 'quiz-feedback show feedback-wrong';
        feedback.innerHTML = `
          <div class="feedback-icon">⚠️</div>
          <div class="feedback-text">Non proprio...</div>
          <div class="feedback-explain">${q.explain_wrong || ''}</div>
        `;
      }

      document.getElementById('nextQBtn').classList.remove('hidden');
    }

    function showScore() {
      if (studyQuiz) window.StudySync?.quiz(lessonId, score, total);
      const pct = Math.round((score / total) * 100);
      let msg = pct >= 80 ? '🔥 Eccezionale! Hai dominato il modulo.' : pct >= 60 ? '👍 Buon risultato! Qualche dettaglio da affinare.' : '💡 Ti consiglio un rapido ripasso prima del compito.';
      
      if (pct >= 80) {
        ConfettiFx.fire();
      }

      container.innerHTML = `
        <div class="quiz-score">
          <div class="score-circle">
            <span class="score-num">${score}</span>
            <span class="score-den">/ ${total}</span>
          </div>
          <div class="score-title">${msg}</div>
          <div class="score-sub">${pct}% di risposte corrette</div>
          <div class="quiz-actions">
            <button class="btn btn-ghost" id="retryQuiz">↩ Riprova</button>
            <button class="btn btn-primary" onclick="document.querySelector('.mark-done-btn')?.scrollIntoView({behavior:'smooth'})">
              Completa lezione ${iconArrowRight()}
            </button>
          </div>
        </div>
      `;
      document.getElementById('retryQuiz').addEventListener('click', () => { score = 0; current = 0; render(); });
    }

    render();
  }

  return { init };
})();

/* ---- Init globale ---- */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  SidebarManager.init();
  PresentationMode.init();
  ReadingProgressBar.init();
  ScrollReveal.init();

  const lessonId = document.body.dataset.lessonId || null;
  Progress.init(lessonId);
});
