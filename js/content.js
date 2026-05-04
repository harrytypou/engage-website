/* ============================================================
   ENGAGE — Projects, Competitions, Team fetchers
   Reads JSON files from the GitHub content repo.
   ============================================================ */

/* ── Projects ────────────────────────────────────────────── */
async function fetchProjects() {
  const res = await fetch(`${RAW_BASE}/data/projects.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderProjectsPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const projects = await fetchProjects();
    const featured = projects.filter(p => p.featured).slice(0, 4);
    const items = featured.length > 0 ? featured : projects.slice(0, 4);
    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state"><p class="empty-state-title">${t('proj_empty')}</p></div>`;
      return;
    }
    container.innerHTML = `<div class="proj-grid">${items.map(projectCardHTML).join('')}</div>`;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('proj_empty'), e.message);
  }
}

async function renderProjectsPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="proj-grid">${skeletonCards(4, 'skeleton-card')}</div>`;
  try {
    const projects = await fetchProjects();
    if (projects.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🔧</div><p class="empty-state-title">${t('proj_empty')}</p></div>`;
      return;
    }
    container.innerHTML = `<div class="proj-grid">${projects.map(projectCardHTML).join('')}</div>`;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('proj_empty'), e.message);
  }
}

function projectCardHTML(p) {
  const loc = p[currentLang] || p['en'] || {};
  const name = loc.name || p.name || '';
  const desc = loc.description || p.description || '';
  const statusMap = { active: 'badge-green', completed: 'badge-blue', paused: 'badge-gray' };
  const statusKey = `proj_status_${p.status || 'active'}`;
  const tags = (p.tags || []).map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join('');
  const ghLink = p.github ? `<a href="${p.github}" target="_blank" rel="noopener" style="font-size:12px;color:var(--accent);font-weight:600;margin-top:10px;display:inline-block;">${t('proj_view_gh')}</a>` : '';
  return `
    <div class="card proj-card reveal">
      <div class="proj-icon">${p.icon || '⚙'}</div>
      <div>
        <div class="proj-name">${escapeHTML(name)}</div>
        <div class="proj-desc">${escapeHTML(desc)}</div>
        ${tags ? `<div class="proj-tags">${tags}</div>` : ''}
        <div class="proj-status">
          <span class="badge ${statusMap[p.status] || 'badge-blue'}">${t(statusKey)}</span>
          ${p.members ? `<span>${p.members} members</span>` : ''}
        </div>
        ${ghLink}
      </div>
    </div>`;
}

/* ── Competitions ─────────────────────────────────────────── */
async function fetchCompetitions() {
  const res = await fetch(`${RAW_BASE}/data/competitions.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderCompetitionsPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const comps = await fetchCompetitions();
    const items = comps.slice(0, 4);
    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state"><p class="empty-state-title">${t('comp_empty')}</p></div>`;
      return;
    }
    container.innerHTML = `<div class="comp-list">${items.map(competitionRowHTML).join('')}</div>`;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('comp_empty'), e.message);
  }
}

async function renderCompetitionsPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = skeletonCards(4, 'skeleton-row');
  try {
    const comps = await fetchCompetitions();
    if (comps.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🏆</div><p class="empty-state-title">${t('comp_empty')}</p></div>`;
      return;
    }
    const groups = {
      active:   comps.filter(c => c.status === 'active'),
      upcoming: comps.filter(c => c.status === 'upcoming'),
      past:     comps.filter(c => c.status === 'past'),
    };
    let html = '';
    if (groups.active.length)   html += compGroup(t('comp_active'),   groups.active);
    if (groups.upcoming.length) html += compGroup(t('comp_upcoming'), groups.upcoming);
    if (groups.past.length)     html += compGroup(t('comp_past'),     groups.past);
    container.innerHTML = html;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('comp_empty'), e.message);
  }
}

function compGroup(title, items) {
  return `
    <div style="margin-bottom:40px;">
      <div class="tier-title">${title}</div>
      <div class="comp-list">${items.map(competitionRowHTML).join('')}</div>
    </div>`;
}

function competitionRowHTML(c) {
  const loc = c[currentLang] || c['en'] || {};
  const name  = loc.name  || c.name  || '';
  const date  = loc.date  || c.date  || '';
  const scope = loc.scope || c.scope || '';
  const statusMap   = { upcoming: 'badge-blue', active: 'badge-green', past: 'badge-gray' };
  const statusKey   = `comp_${c.status || 'past'}`;
  const result      = c.result ? `<span style="color:var(--accent);font-weight:600;margin-left:8px;">${escapeHTML(c.result)}</span>` : '';
  const link        = c.url ? `<a href="${c.url}" target="_blank" rel="noopener" style="font-size:12px;color:var(--accent);font-weight:600;">&rarr;</a>` : '';
  return `
    <div class="comp-row reveal">
      <div>
        <div class="comp-name">${escapeHTML(name)}${result}</div>
        <div class="comp-sub">${escapeHTML(date)}${scope ? ' · ' + escapeHTML(scope) : ''}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <span class="badge ${statusMap[c.status] || 'badge-gray'}">${t(statusKey)}</span>
        ${link}
      </div>
    </div>`;
}

/* ── Team ────────────────────────────────────────────────── */
async function fetchTeam() {
  const res = await fetch(`${RAW_BASE}/data/team.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderTeamPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="team-grid">${skeletonCards(8, 'skeleton-card')}</div>`;
  try {
    const members = await fetchTeam();
    if (members.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">👥</div><p class="empty-state-title">${t('team_empty')}</p></div>`;
      return;
    }

    /* Group by role category if provided */
    const categories = [...new Set(members.map(m => m.category || 'Board'))];
    let html = '';
    categories.forEach(cat => {
      const group = members.filter(m => (m.category || 'Board') === cat);
      html += `
        <div style="margin-bottom:48px;">
          <div class="tier-title">${escapeHTML(cat)}</div>
          <div class="team-grid">${group.map(teamCardHTML).join('')}</div>
        </div>`;
    });
    container.innerHTML = html;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('team_empty'), e.message);
  }
}

async function renderTeamPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const members = await fetchTeam();
    const items = members.slice(0, 4);
    if (items.length === 0) return;
    container.innerHTML = `<div class="team-grid">${items.map(teamCardHTML).join('')}</div>`;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('team_empty'), e.message);
  }
}

function teamCardHTML(m) {
  const initials = (m.name || 'XX').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
  const avatar   = m.photo
    ? `<img src="${escapeHTML(m.photo)}" alt="${escapeHTML(m.name)}" loading="lazy">`
    : initials;
  const linkedin = m.linkedin ? `<a href="${escapeHTML(m.linkedin)}" target="_blank" rel="noopener" title="LinkedIn">in</a>` : '';
  const gh       = m.github   ? `<a href="${escapeHTML(m.github)}" target="_blank" rel="noopener" title="GitHub">gh</a>` : '';
  const socials  = (linkedin || gh) ? `<div class="team-social">${linkedin}${gh}</div>` : '';
  return `
    <div class="card team-card reveal">
      <div class="team-avatar">${avatar}</div>
      <div class="team-name">${escapeHTML(m.name)}</div>
      <div class="team-role">${escapeHTML(m.role)}</div>
      ${socials}
    </div>`;
}

/* ── Sponsors ────────────────────────────────────────────── */
async function fetchSponsors() {
  const res = await fetch(`${RAW_BASE}/data/sponsors.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderSponsorsPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div style="display:flex;gap:12px;flex-wrap:wrap;">${skeletonCards(4, 'skeleton-card' )}</div>`;
  try {
    const sponsors = await fetchSponsors();
    if (sponsors.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🤝</div><p class="empty-state-title">${t('spon_empty')}</p></div>`;
      return;
    }
    const tiers = ['gold', 'silver', 'bronze'];
    const tierKeys = { gold: 'spon_tier_gold', silver: 'spon_tier_silver', bronze: 'spon_tier_bronze' };
    const tierClasses = { gold: 'tier-gold', silver: 'tier-silver', bronze: 'tier-bronze' };
    let html = '';
    tiers.forEach(tier => {
      const group = sponsors.filter(s => (s.tier || 'bronze') === tier);
      if (group.length === 0) return;
      html += `
        <div class="tier-section reveal">
          <div class="tier-badge ${tierClasses[tier]}"><span class="tier-dot"></span><span>${t(tierKeys[tier])}</span></div>
          <div class="sponsor-grid">${group.map(sponsorCardHTML).join('')}</div>
        </div>`;
    });
    /* Catch any sponsors with unrecognised tier */
    const other = sponsors.filter(s => !tiers.includes(s.tier || 'bronze'));
    if (other.length > 0) {
      html += `<div class="tier-section reveal"><div class="sponsor-grid">${other.map(sponsorCardHTML).join('')}</div></div>`;
    }
    container.innerHTML = html;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('spon_empty'), e.message);
  }
}

async function renderSponsorsPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const sponsors = await fetchSponsors();
    if (sponsors.length === 0) return;
    const html = sponsors.slice(0, 5).map(sponsorCardHTML).join('');
    container.innerHTML = `<div class="sponsor-grid">${html}</div>`;
    triggerReveal(container);
  } catch (e) {
    /* silently fail on homepage preview */
  }
}

function sponsorCardHTML(s) {
  /* display_mode: "logo" shows an <img>, anything else shows the name as text */
  const inner = (s.display_mode === 'logo' && s.logo)
    ? `<img src="${escapeHTML(s.logo)}" alt="${escapeHTML(s.name)}" class="sponsor-card-logo" loading="lazy">`
    : `<span class="sponsor-card-name">${escapeHTML(s.name)}</span>`;
  const wrap = s.website
    ? `<a href="${escapeHTML(s.website)}" target="_blank" rel="noopener" class="sponsor-card" title="${escapeHTML(s.name)}">${inner}</a>`
    : `<div class="sponsor-card">${inner}</div>`;
  return wrap;
}

/* ── Events ──────────────────────────────────────────────── */
async function fetchEvents() {
  const res = await fetch(`${RAW_BASE}/data/events.json`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderEventsPreview(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const events = await fetchEvents();
    /* Show upcoming + ongoing first, sorted by date; fallback to most recent past */
    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    const live   = sorted.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
    const items  = (live.length > 0 ? live : sorted.slice(-3).reverse()).slice(0, 3);
    if (items.length === 0) {
      container.innerHTML = `<div class="empty-state"><p class="empty-state-title">${t('events_empty')}</p></div>`;
      return;
    }
    container.innerHTML = `<div class="events-grid">${items.map(eventCardHTML).join('')}</div>`;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('events_error'), e.message);
  }
}

async function renderEventsPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = `<div class="events-grid">${skeletonCards(3, 'skeleton-card')}</div>`;
  try {
    const events = await fetchEvents();
    if (events.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📅</div><p class="empty-state-title">${t('events_empty')}</p></div>`;
      return;
    }
    const sorted   = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    const upcoming = sorted.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
    const past     = sorted.filter(e => e.status === 'past').reverse();
    let html = '';
    if (upcoming.length > 0) {
      html += `<div style="margin-bottom:52px;">
        <div class="tier-title">${t('events_status_upcoming')}</div>
        <div class="events-grid">${upcoming.map(eventCardHTML).join('')}</div>
      </div>`;
    }
    if (past.length > 0) {
      html += `<div>
        <div class="tier-title">${t('events_status_past')}</div>
        <div class="events-grid events-grid-past">${past.map(eventCardHTML).join('')}</div>
      </div>`;
    }
    container.innerHTML = html;
    triggerReveal(container);
  } catch (e) {
    container.innerHTML = errorState(t('events_error'), e.message);
  }
}

function eventCardHTML(ev) {
  const loc  = ev[currentLang] || ev['en'] || {};
  const name = loc.title || ev.title || '';
  const desc = loc.description || ev.description || '';
  const typeKey   = `events_label_${ev.type || 'other'}`;
  const statusKey = `events_status_${ev.status || 'upcoming'}`;
  const statusMap = { upcoming: 'badge-blue', ongoing: 'badge-green', past: 'badge-gray' };

  const dateStr = ev.date
    ? new Date(ev.date).toLocaleDateString(currentLang === 'el' ? 'el-GR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const loc_loc  = loc.location || ev.location || '';
  const locationHTML = loc_loc
    ? `<div class="event-meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>${escapeHTML(loc_loc)}</span></div>`
    : '';

  const timeStr  = ev.time || '';
  const timeHTML = timeStr
    ? `<div class="event-meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>${escapeHTML(timeStr)}</span></div>`
    : '';

  const isPast = ev.status === 'past';

  const imgHTML = ev.image
    ? `<div class="event-card-img" style="background-image:url('${escapeHTML(ev.image)}')"></div>`
    : `<div class="event-card-img-placeholder"><span>${ev.icon || '📅'}</span></div>`;

  const inner = `
      ${imgHTML}
      <div class="event-card-body">
        <div class="event-card-header">
          <span class="badge ${statusMap[ev.status] || 'badge-blue'}">${t(statusKey)}</span>
          <span class="event-type-label">${t(typeKey)}</span>
        </div>
        <div class="event-name">${escapeHTML(name)}</div>
        <div class="event-desc">${escapeHTML(desc)}</div>
        <div class="event-meta">
          <div class="event-meta-item"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><span>${dateStr}</span></div>
          ${timeHTML}
          ${locationHTML}
        </div>
      </div>`;

  if (ev.url) {
    return `<a href="${escapeHTML(ev.url)}" target="_blank" rel="noopener" class="card event-card reveal${isPast ? ' event-card-past' : ''} event-card-link">${inner}</a>`;
  }
  return `<div class="card event-card reveal${isPast ? ' event-card-past' : ''}">${inner}</div>`;
}
