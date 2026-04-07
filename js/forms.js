/* ============================================================
   ENGAGE — Contact Forms (Formspree)
   ============================================================
   Formspree endpoint IDs from https://formspree.io
   Free tier allows 50 submissions/month per form.
   ============================================================ */

const FORMSPREE_JOIN    = 'mzdkowvl';
const FORMSPREE_SPONSOR = 'mkopyevo';
const FORMSPREE_PARTNER = 'mvzvlybk';

const FORMSPREE_BASE = 'https://formspree.io/f/';

/* ── Tab switcher ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.contact-tab');
  const panels = document.querySelectorAll('.contact-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === target));
      panels.forEach(p => p.classList.toggle('hidden', p.dataset.panel !== target));
    });
  });

  /* Activate first tab */
  if (tabs.length > 0) tabs[0].click();

  /* Bind forms */
  bindForm('form-join',    FORMSPREE_JOIN);
  bindForm('form-sponsor', FORMSPREE_SPONSOR);
  bindForm('form-partner', FORMSPREE_PARTNER);
});

/* ── Generic form submission ─────────────────────────────── */
function bindForm(formId, endpointId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn      = form.querySelector('[type="submit"]');
    const success  = form.querySelector('.form-success');
    const errEl    = form.querySelector('.form-error');
    const origText = btn.textContent;

    btn.textContent = t('contact_sending');
    btn.disabled    = true;
    if (success) success.style.display = 'none';
    if (errEl)   errEl.style.display   = 'none';

    const data = new FormData(form);

    try {
      const res = await fetch(`${FORMSPREE_BASE}${endpointId}`, {
        method:  'POST',
        body:    data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (success) {
          success.textContent  = t('contact_success');
          success.style.display = 'block';
        }
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      if (errEl) {
        errEl.textContent  = t('contact_error');
        errEl.style.display = 'block';
      }
    } finally {
      btn.textContent = origText;
      btn.disabled    = false;
    }
  });
}
