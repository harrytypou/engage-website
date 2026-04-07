/* ============================================================
   ENGAGE — GitHub Config & News Fetcher
   ============================================================
   News is now loaded from data/news.json in the content repo.
   Each article supports EN/EL translations, optional image,
   optional links, and a full body that opens in an overlay.
   ============================================================ */

/* TODO: Replace with your GitHub org/user and content repo name */
const GITHUB_OWNER = 'harrytypou';
const GITHUB_REPO  = 'engage-website-data';

/* Raw content base URL — used for JSON files */
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main`;

/* GitHub API base (kept for future use) */
const API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`;

/* ── Fetch news from JSON ─────────────────────────────────── */
async function fetchNews({ limit = 0 } = {}) {
  const res = await fetch(`${RAW_BASE}/data/news.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const items = await res.json();
  /* Sort by ID descending — highest ID = newest article, shown first */
  items.sort((a, b) => Number(b.id) - Number(a.id));
  return limit > 0 ? items.slice(0, limit) : items;
}

function getNewsLocale(item) {
  const loc = item[currentLang] || item['en'] || {};
  return {
    title:   loc.title   || '',
    excerpt: loc.excerpt || '',
    body:    loc.body    || '',
  };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(currentLang === 'el' ? 'el-GR' : 'en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

/* ── News card HTML (list view) ──────────────────────────── */
function newsCardHTML(item) {
  const loc     = getNewsLocale(item);
  const typeKey = `news_label_${item.type || 'announcement'}`;
  const label   = t(typeKey);
  const date    = formatDate(item.date);
  const imgHTML = item.image
    ? `<div class="news-card-img" style="background-image:url('${escapeHTML(item.image)}')"></div>`
    : '';
  return `
    <div class="card card-accent-top news-card reveal" data-news-id="${escapeHTML(String(item.id))}" role="button" tabindex="0" style="cursor:pointer;padding:0;overflow:hidden;">
      ${imgHTML}
      <div class="news-card-body">
        <div class="news-type">${label}</div>
        <div class="news-title">${escapeHTML(loc.title)}</div>
        <div class="news-body">${escapeHTML(loc.excerpt)}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;">
          <div class="news-meta">${date}</div>
          <span style="font-size:12px;color:var(--accent);font-weight:600;">${t('news_read_more')}</span>
        </div>
      </div>
    </div>`;
}

/* ── Render news preview (homepage) ──────────────────────── */
async function renderNewsPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const items = await fetchNews({ limit: 3 });
    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📭</div><p class="empty-state-title">${t('news_empty')}</p></div>`;
      return;
    }
    container.innerHTML = `<div class="news-grid">${items.map(newsCardHTML).join('')}</div>`;
    container.querySelectorAll('.reveal').forEach(el => setTimeout(() => el.classList.add('in'), 100));
    bindNewsCards(container, items);
  } catch (e) {
    container.innerHTML = `<div class="empty-state"><p class="empty-state-title">${t('news_error')}</p><p class="empty-state-sub">${e.message}</p></div>`;
  }
}

/* ── Render full news page ────────────────────────────────── */
async function renderNewsPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = skeletonCards(3, 'skeleton-card');
  try {
    const items = await fetchNews();
    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📭</div><p class="empty-state-title">${t('news_empty')}</p></div>`;
      return;
    }
    container.innerHTML = `<div class="news-grid">${items.map(newsCardHTML).join('')}</div>`;
    triggerReveal(container);
    bindNewsCards(container, items);
  } catch (e) {
    container.innerHTML = errorState(t('news_error'), e.message);
  }
}

/* ── Bind click/keyboard to open overlay ─────────────────── */
function bindNewsCards(container, items) {
  container.querySelectorAll('[data-news-id]').forEach(card => {
    const open = () => {
      const item = items.find(i => String(i.id) === card.dataset.newsId);
      if (item) openNewsOverlay(item);
    };
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
  });
}

/* ── News overlay ─────────────────────────────────────────── */
function openNewsOverlay(item) {
  const loc     = getNewsLocale(item);
  const typeKey = `news_label_${item.type || 'announcement'}`;
  const label   = t(typeKey);
  const date    = formatDate(item.date);

  const imgHTML = item.image
    ? `<div class="news-overlay-img" style="background-image:url('${escapeHTML(item.image)}')"></div>`
    : '';

  const linksHTML = (item.links && item.links.length > 0)
    ? `<div class="news-overlay-links">
        <div class="news-overlay-links-title">${t('news_links_title')}</div>
        ${item.links.map(l => `<a href="${escapeHTML(l.url)}" target="_blank" rel="noopener" class="news-overlay-link">${escapeHTML(l.label)} →</a>`).join('')}
       </div>`
    : '';

  /* Convert newline-separated paragraphs/lists to HTML */
  const bodyHTML = (loc.body || '').split('\n\n')
    .map(para => para.trim()).filter(Boolean)
    .map(para => {
      const lines = para.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.some(l => l.startsWith('-'))) {
        return `<ul class="news-overlay-list">${lines.map(l => `<li>${escapeHTML(l.replace(/^-\s*/, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${escapeHTML(lines.join(' '))}</p>`;
    }).join('');

  const overlay = document.createElement('div');
  overlay.className = 'news-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.innerHTML = `
    <div class="news-overlay-backdrop"></div>
    <div class="news-overlay-panel">
      <button class="news-overlay-close" aria-label="Close">&times;</button>
      ${imgHTML}
      <div class="news-overlay-content">
        <div class="news-overlay-meta">
          <span class="news-type" style="font-size:11px;">${label}</span>
          <span class="news-overlay-date">${date}</span>
        </div>
        <h2 class="news-overlay-title">${escapeHTML(loc.title)}</h2>
        <div class="news-overlay-body">${bodyHTML}</div>
        ${linksHTML}
        <button class="news-overlay-back">${t('news_back')}</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => overlay.classList.add('open'));

  function close() {
    overlay.classList.remove('open');
    overlay.addEventListener('transitionend', () => {
      overlay.remove();
      document.body.style.overflow = '';
    }, { once: true });
  }

  overlay.querySelector('.news-overlay-close').addEventListener('click', close);
  overlay.querySelector('.news-overlay-back').addEventListener('click', close);
  overlay.querySelector('.news-overlay-backdrop').addEventListener('click', close);
  document.addEventListener('keydown', function esc(e) {
    if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
  });
}

/* ── Helpers ─────────────────────────────────────────────── */
function skeletonCards(n, cls) {
  return Array(n).fill(`<div class="skeleton ${cls}"></div>`).join('');
}
function errorState(title, sub = '') {
  return `<div class="empty-state"><div class="empty-state-icon">⚠️</div><p class="empty-state-title">${title}</p>${sub ? `<p class="empty-state-sub">${sub}</p>` : ''}</div>`;
}
function escapeHTML(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function triggerReveal(container) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.06 });
  container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
