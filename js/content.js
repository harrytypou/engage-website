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
