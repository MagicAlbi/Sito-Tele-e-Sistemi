(() => {
  const lesson = document.querySelector('[data-lesson-annotations]');
  const actions = document.querySelector('.site-header .header-actions');
  if (!lesson || !actions) return;

  const colors = new Map([
    ['giallo', 'Giallo'], ['verde', 'Verde'], ['azzurro', 'Azzurro'], ['rosa', 'Rosa'],
    ['arancione', 'Arancione'], ['viola', 'Viola']
  ]);
  const regions = new Map();
  for (const region of lesson.querySelectorAll('.lesson-hero-content, .tldr, .slide[id]')) {
    const key = region.id || (region.classList.contains('tldr') ? 'sintesi' : 'introduzione');
    regions.set(key, region);
  }
  const excluded = '.quiz-wrap, .lab-panel, .interactive-wrap, button, input, select, textarea, [contenteditable], svg, canvas';
  const key = 'telecomunicazioni:annotazioni:v1:' + lesson.dataset.lessonAnnotations;
  const registry = window.CSS?.highlights;
  const canPaint = Boolean(registry && window.Highlight);
  const selection = window.getSelection();

  const content = lesson.querySelector('.content-wrap');
  const wide = window.matchMedia('(min-width: 1080px)');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'btn btn-icon btn-ghost annotations-toggle';
  toggle.setAttribute('aria-label', 'Annotazioni');
  toggle.setAttribute('aria-controls', 'lesson-annotations');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.title = 'Annotazioni';
  toggle.innerHTML = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20H4v-8l10-10 8 8-10 10ZM4 20l-2 2m12-20 8 8M4 12l8 8m3 2h7"/></svg>';
  actions.prepend(toggle);

  const menu = document.createElement('div');
  menu.id = 'lesson-annotations';
  menu.className = 'annotations-menu';
  menu.hidden = true;
  menu.innerHTML = `
    <div class="annotations-row" role="group" aria-label="Strumenti">
      <button type="button" data-mode="highlight" aria-pressed="false">Evidenzia</button>
      <button type="button" data-mode="note" aria-pressed="false">Aggiungi nota</button>
    </div>
    <div class="annotations-colors" role="group" aria-label="Colore evidenziatore" hidden></div>
    <div class="annotations-row annotations-note-controls" role="group" aria-label="Tutte le note" hidden></div>
  `;

  const modeBar = document.createElement('div');
  modeBar.className = 'annotations-mode';
  modeBar.hidden = true;
  modeBar.innerHTML = `
    <span data-hint></span>
    <button type="button" data-apply hidden></button>
    <button type="button" data-stop aria-label="Disattiva lo strumento">×</button>
  `;

  const markEditor = document.createElement('div');
  markEditor.className = 'annotations-mark-editor';
  markEditor.setAttribute('role', 'group');
  markEditor.setAttribute('aria-label', 'Modifica evidenziazione');
  markEditor.hidden = true;
  markEditor.innerHTML = `
    <div class="annotations-colors annotations-mark-colors" role="group" aria-label="Nuovo colore" hidden></div>
    <div class="annotations-row">
      <button type="button" class="annotation-swatch" data-current aria-label="Cambia colore" aria-expanded="false" title="Cambia colore"></button>
      <button type="button" class="annotation-icon" data-delete aria-label="Elimina evidenziazione" title="Elimina evidenziazione">
        <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V3h8v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/></svg>
      </button>
    </div>
  `;
  const feedback = document.createElement('div');
  feedback.className = 'annotations-feedback';
  feedback.setAttribute('role', 'status');
  const popover = document.createElement('div');
  popover.className = 'annotations-tools-popover';
  popover.append(menu, modeBar);
  document.body.append(popover, markEditor, feedback);

  const rail = document.createElement('div');
  rail.className = 'annotations-rail';
  const fields = document.createElement('form');
  fields.className = 'annotations-card annotations-editor';
  fields.hidden = true;
  fields.innerHTML = `
    <label for="annotation-title">Titolo</label>
    <input id="annotation-title" name="title" maxlength="80" placeholder="Facoltativo">
    <label for="annotation-body">Nota</label>
    <textarea id="annotation-body" name="body" rows="2" maxlength="5000" required></textarea>
    <p>Invio per salvare · Maiusc + Invio per andare a capo</p>
    <div class="annotations-row">
      <button type="submit">Salva</button>
      <button type="button" data-cancel>Annulla</button>
    </div>
  `;
  rail.append(fields);
  content.classList.add('annotations-content');
  content.append(rail);

  const titleField = fields.elements.namedItem('title');
  const bodyField = fields.elements.namedItem('body');
  const hint = modeBar.querySelector('[data-hint]');
  const apply = modeBar.querySelector('[data-apply]');
  const modeButtons = menu.querySelectorAll('[data-mode]');
  const colorGroup = menu.querySelector('.annotations-colors');
  const noteControls = menu.querySelector('.annotations-note-controls');
  const markColors = markEditor.querySelector('.annotations-colors');
  const markCurrent = markEditor.querySelector('[data-current]');
  const collapsed = new Set();
  const cards = new Map();
  const spaces = new Map();
  let color = 'giallo';
  let mode = null;
  let draft = null;
  let editing = null;
  let entries = readEntries();
  let anchored = new Map();
  let layoutFrame = 0;

  function makeButton(label, onClick) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', onClick);
    return button;
  }

    function readEntries() {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  function saveEntries(update, message) {
    try {
      const next = update(readEntries());
      localStorage.setItem(key, JSON.stringify(next));
      entries = next;
      refresh();
      feedback.removeAttribute('data-error');
      feedback.textContent = message;
      return true;
    } catch {
      feedback.setAttribute('data-error', '');
      feedback.textContent = 'Il browser non ha potuto salvare le annotazioni.';
      return false;
    }
  }

  function textOffset(region, node, offset) {
    const range = document.createRange();
    range.setStart(region, 0);
    range.setEnd(node, offset);
    return range.toString().length;
  }

  function selectedAnchor() {
    if (!selection?.rangeCount || selection.isCollapsed) return null;
    const range = selection.getRangeAt(0);
    const quote = range.toString();
    if (!quote.trim()) return null;
    for (const [regionKey, region] of regions) {
      if (!region.contains(range.startContainer) || !region.contains(range.endContainer)) continue;
      if ([...region.querySelectorAll(excluded)].some(node => range.intersectsNode(node))) return null;
      return { region: regionKey, start: textOffset(region, range.startContainer, range.startOffset), quote };
    }
    return null;
  }

  function restoreRange(anchor) {
    const region = regions.get(anchor.region);
    if (!region || !anchor.quote) return null;
    const content = region.textContent;
    let start = anchor.start;
    if (content.slice(start, start + anchor.quote.length) !== anchor.quote) {
      start = content.indexOf(anchor.quote);
      if (start < 0 || content.indexOf(anchor.quote, start + 1) >= 0) return null;
    }
    const end = start + anchor.quote.length;
    const walker = document.createTreeWalker(region, NodeFilter.SHOW_TEXT);
    let position = 0;
    let range;
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const next = position + node.length;
      if (!range && next > start) {
        range = document.createRange();
        range.setStart(node, start - position);
      }
      if (range && next >= end) {
        range.setEnd(node, end - position);
        return range;
      }
      position = next;
    }
    return null;
  }


  function paint() {
    anchored = new Map();
    const layers = new Map([...colors.keys(), 'note', 'draft'].map(name => [name, []]));
    if (!document.body.classList.contains('presenting')) {
      for (const entry of entries) {
        const range = restoreRange(entry.anchor);
        if (!range) continue;
        anchored.set(entry.id, range);
        layers.get(entry.color || 'note')?.push(range);
      }
      const draftRange = draft && restoreRange(draft);
      if (draftRange) layers.get('draft').push(draftRange);
    }
    if (canPaint) {
      let priority = 0;
      for (const [name, ranges] of layers) {
        const highlight = new Highlight(...ranges);
        highlight.priority = priority++;
        registry.set('lesson-' + name, highlight);
      }
    }
  }

  function setMenu(open) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }

  function setMode(next) {
    closeMark();
    mode = next;
    lesson.dataset.annotationMode = next || '';
    toggle.classList.toggle('annotation-active', Boolean(next));
    for (const button of modeButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.mode === next));
      button.disabled = Boolean(draft) || (button.dataset.mode === 'highlight' && !canPaint);
    }
    if (next !== 'highlight') setMenu(false);
    modeBar.hidden = !next;
    colorGroup.hidden = next !== 'highlight';
    hint.textContent = next === 'note' ? 'Modalità nota · Seleziona una frase' : 'Evidenziatore attivo';
    apply.textContent = next === 'note' ? 'Annota selezione' : 'Evidenzia selezione';
    updateSelection();
  }

  function updateSelection() {
    apply.hidden = !mode || !selectedAnchor();
  }

  function excerpt(quote) {
    const text = quote.trim().replace(/\s+/g, ' ');
    return text.length > 105 ? text.slice(0, 104) + '…' : text;
  }

  function noteCard(entry) {
    const card = document.createElement('details');
    card.className = 'annotations-card';
    card.dataset.noteId = entry.id;
    card.open = !collapsed.has(entry.id);
    card.addEventListener('toggle', () => {
      if (!card.isConnected) return;
      if (card.open) collapsed.delete(entry.id);
      else collapsed.add(entry.id);
      scheduleLayout();
    });
    const summary = document.createElement('summary');
    summary.textContent = entry.title || excerpt(entry.anchor.quote);
    const body = document.createElement('p');
    body.className = 'annotations-note-body';
    body.textContent = entry.body;
    const remove = makeButton('Elimina nota', () => {
      if (saveEntries(current => current.filter(item => item.id !== entry.id), 'Nota eliminata.')) {
        collapsed.delete(entry.id);
        toggle.focus({ preventScroll: true });
      }
    });
    card.append(summary, body, remove);
    return card;
  }

  function setAllNotes(open) {
    for (const [id, card] of cards) {
      card.open = open;
      if (open) collapsed.delete(id);
      else collapsed.add(id);
    }
    scheduleLayout();
  }

  function refresh() {
    paint();
    for (const card of cards.values()) {
      resize.unobserve(card);
      card.remove();
    }
    cards.clear();
    for (const entry of entries) {
      if (entry.color || !anchored.has(entry.id)) continue;
      const card = noteCard(entry);
      cards.set(entry.id, card);
      rail.append(card);
      resize.observe(card);
    }
    noteControls.hidden = !cards.size;
    scheduleLayout();
  }

  function inlineBlock(range) {
    const node = range.startContainer;
    const block = node.parentElement.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote, table, .lesson-hero-content, .tldr, .slide');
    if (block?.closest('table')) return block.closest('table');
    if (block?.matches('li')) return block.parentElement;
    return block;
  }

  function clearInlineSpaces() {
    for (const space of spaces.values()) space.remove();
    spaces.clear();
  }

  function scheduleLayout() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(layoutNotes);
  }

  function layoutNotes() {
    layoutFrame = 0;
    const positions = [];
    for (const [id, card] of cards) positions.push({ card, range: anchored.get(id) });
    const draftRange = draft && restoreRange(draft);
    if (draftRange && !document.body.classList.contains('presenting')) positions.push({ card: fields, range: draftRange });
    const side = wide.matches && positions.length > 0;
    lesson.classList.toggle('annotations-with-notes', side);
    const groups = new Map();
    if (!side) {
      for (const item of positions) {
        const block = inlineBlock(item.range);
        if (!block) continue;
        if (!groups.has(block)) groups.set(block, []);
        groups.get(block).push(item);
      }
    }
    for (const [block, space] of spaces) {
      if (groups.has(block)) continue;
      space.remove();
      spaces.delete(block);
    }

    const gap = 8;
    for (const [block, group] of groups) {
      let space = spaces.get(block);
      if (!space) {
        space = document.createElement('div');
        space.className = 'annotations-inline-space';
        space.setAttribute('aria-hidden', 'true');
        block.after(space);
        spaces.set(block, space);
      }
      const height = group.reduce((sum, { card }) => sum + card.offsetHeight + gap, gap);
      space.style.height = height + 'px';
    }

    const origin = rail.getBoundingClientRect().top;
    if (side) {
      for (const item of positions) {
        const firstLine = Array.from(item.range.getClientRects()).find(rect => rect.width);
        item.top = (firstLine || item.range.getBoundingClientRect()).top - origin;
      }
      positions.sort((a, b) => a.top - b.top);
      let previousEnd = 0;
      for (const { card, top } of positions) {
        const y = Math.max(top, previousEnd);
        card.style.top = y + 'px';
        previousEnd = y + card.offsetHeight + gap;
      }
    } else {
      for (const [block, group] of groups) {
        let y = spaces.get(block).getBoundingClientRect().top - origin + gap;
        for (const { card } of group) {
          card.style.top = y + 'px';
          y += card.offsetHeight + gap;
        }
      }
    }
  }

  const resize = new ResizeObserver(scheduleLayout);
  resize.observe(content);
  resize.observe(fields);
  wide.addEventListener('change', scheduleLayout);
  content.addEventListener('transitionend', scheduleLayout);
  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('scroll', scheduleLayout, { passive: true });
  for (const button of document.querySelectorAll('[data-present]')) {
    button.addEventListener('click', clearInlineSpaces, { capture: true });
  }

  function applySelection(anchor) {
    if (!mode || !anchor || draft) return;
    if (mode === 'highlight') {
      const entry = { id: crypto.randomUUID(), anchor, color };
      if (!saveEntries(current => [...current, entry], 'Evidenziazione salvata.')) return;
    } else {
      draft = anchor;
      fields.hidden = false;
      setMode(null);
      paint();
      layoutNotes();
      titleField.focus({ preventScroll: true });
      fields.scrollIntoView({ block: 'nearest' });
    }
    selection.removeAllRanges();
  }

  function closeEditor() {
    draft = null;
    fields.reset();
    bodyField.style.height = '';
    fields.hidden = true;
    setMode(null);
    paint();
    scheduleLayout();
  }

  function markAtPoint(event) {
    let match = null;
    for (const entry of entries) {
      if (!entry.color) continue;
      const range = anchored.get(entry.id);
      if (!range) continue;
      const rect = Array.from(range.getClientRects()).find(rect => rect.width &&
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom);
      if (rect) {
        const order = [...colors.keys()];
        if (!match || order.indexOf(entry.color) >= order.indexOf(match.entry.color)) match = { entry, rect };
      }
    }
    return match;
  }

  function setPalette(open) {
    markColors.hidden = !open;
    markCurrent.setAttribute('aria-expanded', String(open));
    if (!open) return;
    markEditor.classList.remove('annotations-palette-below', 'annotations-palette-align-end');
    const bounds = markColors.getBoundingClientRect();
    const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
    markEditor.classList.toggle('annotations-palette-below', bounds.top < header);
    markEditor.classList.toggle('annotations-palette-align-end', bounds.right > innerWidth - 8);
  }

  function closeMark() {
    if (markEditor.hidden) return;
    editing = null;
    markEditor.hidden = true;
    setPalette(false);
  }

  function openMark(entry, rect, x) {
    editing = entry;
    markCurrent.dataset.color = entry.color;
    for (const button of markColors.children) {
      button.setAttribute('aria-pressed', String(button.dataset.color === entry.color));
    }
    setPalette(false);
    markEditor.hidden = false;
    const editorWidth = markEditor.offsetWidth;
    const margin = 8;
    const header = document.querySelector('.site-header').getBoundingClientRect().bottom;
    const above = rect.top - markEditor.offsetHeight - margin;
    markEditor.style.top = (above >= header ? above : rect.bottom + margin) + 'px';
    const left = Math.max(margin, Math.min(innerWidth - editorWidth - margin, x - editorWidth / 2));
    markEditor.style.left = left + 'px';
  }

  function swatch(name, label, onChoose) {
    const button = makeButton('', onChoose);
    button.className = 'annotation-swatch';
    button.dataset.color = name;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', 'false');
    button.title = label;
    return button;
  }

  for (const [name, label] of colors) {
    const button = swatch(name, label, () => {
      color = name;
      for (const option of colorGroup.children) {
        option.setAttribute('aria-pressed', String(option.dataset.color === color));
      }
    });
    button.setAttribute('aria-pressed', String(color === name));
    colorGroup.append(button);
    markColors.append(swatch(name, label, () => {
      if (editing && saveEntries(current => current.map(item => item.id === editing.id ? { ...item, color: name } : item),
        'Colore aggiornato.')) closeMark();
    }));
  }

  noteControls.append(
    makeButton('Espandi tutte', () => setAllNotes(true)),
    makeButton('Comprimi tutte', () => setAllNotes(false))
  );
  for (const button of modeButtons) {
    button.addEventListener('click', () => setMode(mode === button.dataset.mode ? null : button.dataset.mode));
  }
  toggle.addEventListener('click', () => {
    if (!menu.hidden || mode) setMode(null);
    else {
      closeMark();
      setMenu(true);
    }
  });
  modeBar.querySelector('[data-stop]').addEventListener('click', () => {
    setMode(null);
    toggle.focus({ preventScroll: true });
  });
  markCurrent.addEventListener('click', () => setPalette(markColors.hidden));
  markEditor.querySelector('[data-delete]').addEventListener('click', () => {
    if (editing && saveEntries(current => current.filter(item => item.id !== editing.id),
      'Evidenziazione eliminata.')) closeMark();
  });
  fields.querySelector('[data-cancel]').addEventListener('click', () => {
    closeEditor();
    toggle.focus({ preventScroll: true });
  });
  apply.addEventListener('pointerdown', event => event.preventDefault());
  apply.addEventListener('click', () => applySelection(selectedAnchor()));
  document.addEventListener('selectionchange', updateSelection);
  lesson.addEventListener('pointerup', event => {
    if (event.button === 0 && event.pointerType === 'mouse' && mode && !event.target.closest('.annotations-rail')) {
      setTimeout(() => applySelection(selectedAnchor()), 0);
    }
  });
  lesson.addEventListener('click', event => {
    if (event.target.closest(excluded + ', a, .annotations-rail') || !selection.isCollapsed) return;
    const mark = markAtPoint(event);
    if (!mark) {
      closeMark();
      return;
    }
    if (mode === 'note') applySelection(mark.entry.anchor);
    else if (editing?.id === mark.entry.id) closeMark();
    else openMark(mark.entry, mark.rect, event.clientX);
  });
  document.addEventListener('pointerdown', event => {
    if (!event.target.closest('.annotations-mark-editor, [data-lesson-annotations]')) closeMark();
    if (!mode && !menu.hidden && !event.target.closest('.annotations-menu, .annotations-toggle')) setMenu(false);
  });
  window.addEventListener('scroll', closeMark, { passive: true });
  window.addEventListener('resize', closeMark);

  bodyField.addEventListener('input', () => {
    bodyField.style.height = 'auto';
    bodyField.style.height = bodyField.scrollHeight + 2 + 'px';
    scheduleLayout();
  });
  fields.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing &&
        (event.target === bodyField || event.target === titleField)) {
      event.preventDefault();
      fields.requestSubmit();
    }
  });
  fields.addEventListener('submit', event => {
    event.preventDefault();
    if (!draft || !bodyField.value.trim()) {
      bodyField.focus();
      return;
    }
    const entry = { id: crypto.randomUUID(), anchor: draft, title: titleField.value.trim(), body: bodyField.value.trim() };
    if (saveEntries(current => [...current, entry], 'Nota salvata.')) {
      closeEditor();
      cards.get(entry.id)?.querySelector('summary').focus({ preventScroll: true });
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (editing) closeMark();
    else if (!menu.hidden || mode) {
      setMode(null);
      toggle.focus({ preventScroll: true });
    }
  });

    // La presentazione sposta temporaneamente gli elementi delle lezioni.
  let presenting = false;
  new MutationObserver(() => {
    const active = document.body.classList.contains('presenting');
    if (active === presenting) return;
    presenting = active;
    if (active) {
      setMode(null);
      closeMark();
    }
    refresh();
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    entries = readEntries();
    refresh();
  });


  setMode(null);
  refresh();
})();
