/* ============================================================
   ENGAGE — Language System (EN / ΕΛ)
   ============================================================ */

const LANG = {
  en: {
    /* Nav */
    nav_home:         'Home',
    nav_projects:     'Projects',
    nav_competitions: 'Competitions',
    nav_news:         'News',
    nav_team:         'Team',
    nav_sponsors:     'Sponsors',
    nav_contact:      'Contact',
    nav_events:       'Events',

    /* Hero */
    hero_badge:       'Engineering · Robotics · Technology',
    hero_title:       'We build the <span class="grad">future</span>,<br>one project at a time.',
    hero_sub:         'A student-led engineering club at the forefront of robotics, embedded systems, and applied technology. Open to all university students.',
    hero_btn_join:    'Apply to join',
    hero_btn_work:    'View our work',
    hero_stat_members:      'Members',
    hero_stat_projects:     'Projects',
    hero_stat_competitions: 'Competitions',
    hero_stat_sponsors:     'Sponsors',

    /* Sections */
    sec_news_label:   'Latest',
    sec_news_title:   'News & announcements',
    sec_news_more:    'All news →',
    sec_proj_label:   'What we build',
    sec_proj_title:   'Featured projects',
    sec_proj_more:    'All projects →',
    sec_comp_label:   'How we compete',
    sec_comp_title:   'Competitions',
    sec_comp_more:    'All competitions →',
    sec_spon_label:   'Partners',
    sec_spon_title:   'Our sponsors',
    sec_spon_more:    'Become a sponsor →',
    sec_team_label:   'People',
    sec_team_title:   'Meet the team',
    sec_team_more:    'Full team →',
    sec_events_label: 'What\'s happening',
    sec_events_title: 'Events',
    sec_events_more:  'All events →',

    /* News */
    news_page_title:  'News & announcements',
    news_page_sub:    'Stay up to date with club announcements, events, and achievements.',
    news_label_announcement: 'Announcement',
    news_label_event:        'Event',
    news_label_achievement:  'Achievement',
    news_read_more:   'Read more →',
    news_back:        '← Back to News',
    news_loading:     'Loading news...',
    news_empty:       'No news yet. Check back soon.',
    news_error:       'Could not load news.',
    news_links_title: 'Related links',

    /* Events */
    events_page_title:   'Events',
    events_page_sub:     'Workshops, talks, and meetups hosted by ENGAGE.',
    events_label_workshop:   'Workshop',
    events_label_talk:       'Talk',
    events_label_meetup:     'Meetup',
    events_label_hackathon:  'Hackathon',
    events_label_other:      'Event',
    events_status_upcoming:  'Upcoming',
    events_status_ongoing:   'Ongoing',
    events_status_past:      'Past',
    events_register:         'Register →',
    events_learn_more:       'Learn more →',
    events_empty:            'No events yet. Check back soon.',
    events_error:            'Could not load events.',
    events_free:             'Free',
    events_location_online:  'Online',

    /* Projects */
    proj_page_title:  'Our projects',
    proj_page_sub:    'From robotics to embedded systems, here\'s what our members are building.',
    proj_loading:     'Loading projects...',
    proj_empty:       'No projects yet. Add entries to data/projects.json.',
    proj_view_gh:     'View on GitHub →',
    proj_status_active:    'Active',
    proj_status_completed: 'Completed',
    proj_status_paused:    'Paused',

    /* Competitions */
    comp_page_title:  'Competitions',
    comp_page_sub:    'Competitions we\'re entering, currently active in, and have completed.',
    comp_loading:     'Loading competitions...',
    comp_empty:       'No competitions yet. Add entries to data/competitions.json.',
    comp_upcoming:    'Upcoming',
    comp_active:      'Active',
    comp_past:        'Past',

    /* Team */
    team_page_title:  'Meet the team',
    team_page_sub:    'The people behind ENGAGE: Students, engineers, and builders.',
    team_loading:     'Loading team...',
    team_empty:       'No team members yet. Add entries to data/team.json.',

    /* Sponsors */
    spon_page_title:  'Our sponsors',
    spon_page_sub:    'We are grateful to the companies and organisations that support our work.',
    spon_tier_gold:   'Gold sponsors',
    spon_tier_silver: 'Silver sponsors',
    spon_tier_bronze: 'Bronze sponsors',
    spon_cta_title:   'Become a sponsor',
    spon_cta_sub:     'Support the next generation of engineers. We offer several sponsorship tiers with different benefits.',
    spon_cta_btn:     'Get in touch →',

    /* Sponsor perks */
    spon_perk_vis_title:  'Brand visibility',
    spon_perk_vis_desc:   'Your logo on our website, presentations, and competition materials.',
    spon_perk_tal_title:  'Talent pipeline',
    spon_perk_tal_desc:   'Direct access to our top engineering students for internships and jobs.',
    spon_perk_col_title:  'Collaboration',
    spon_perk_col_desc:   'Co-organise workshops and events. Work with students on real problems.',
    spon_perks_label:     'What you get',
    spon_perks_title:     'Sponsorship perks',
    spon_loading:         'Loading sponsors...',
    spon_empty:           'No sponsors yet. Add entries to data/sponsors.json.',

    /* Contact */
    contact_page_title: 'Get in touch',
    contact_page_sub:   'Whether you want to join, partner with us, or support our work — we\'d love to hear from you.',
    contact_tab_join:    'Join the club',
    contact_tab_sponsor: 'Sponsor us',
    contact_tab_partner: 'Partnership',
    contact_email_label: 'Email',
    contact_name_label:  'Full name',
    contact_msg_label:   'Message',
    contact_submit:      'Send message',
    contact_sending:     'Sending...',
    contact_success:     'Message sent! We\'ll get back to you soon.',
    contact_error:       'Something went wrong. Please try again or email us directly.',

    /* Join form */
    join_dept:        'Department / Programme',
    join_year:        'Year of study',
    join_year_1:      '1st year',
    join_year_2:      '2nd year',
    join_year_3:      '3rd year',
    join_year_4:      '4th year',
    join_year_5:      '5th year +',
    join_skills:      'Skills & interests',
    join_skills_hint: 'e.g. Python, electronics, CAD, robotics...',
    join_why:         'Why do you want to join?',

    /* Sponsor form */
    spon_company:     'Company name',
    spon_website:     'Company website',
    spon_tier_pref:   'Preferred sponsorship tier',
    spon_tier_gold_f: 'Gold',
    spon_tier_silv_f: 'Silver',
    spon_tier_bron_f: 'Bronze',
    spon_tier_disc_f: 'Let\'s discuss',
    spon_message:     'Tell us about your company',

    /* Partner form */
    part_org:         'Organisation name',
    part_website:     'Website',
    part_type:        'Partnership type',
    part_type_res:    'Research collaboration',
    part_type_event:  'Event co-organisation',
    part_type_other:  'Other',
    part_message:     'Describe the collaboration',

    /* General */
    loading:          'Loading...',
    error_load:       'Failed to load content.',
    footer_copy:      '© 2026 ENGAGE. All rights reserved.',
    footer_tagline:   'Building the future, one project at a time.',
    footer_links_title:  'Pages',
    footer_social_title: 'Follow us',
    footer_legal_title:  'Legal',
    footer_privacy:   'Privacy policy',
    footer_github_src: 'Content on GitHub',
  },

  el: {
    /* Nav */
    nav_home:         'Αρχική',
    nav_projects:     'Project',
    nav_competitions: 'Διαγωνισμοί',
    nav_news:         'Νέα',
    nav_team:         'Ομάδα',
    nav_sponsors:     'Χορηγοί',
    nav_contact:      'Επικοινωνία',
    nav_events:       'Εκδηλώσεις',

    /* Hero */
    hero_badge:       'Μηχανική · Ρομποτική · Τεχνολογία',
    hero_title:       'Χτίζουμε το <span class="grad">μέλλον</span>,<br>ένα project τη φορά.',
    hero_sub:         'Μια φοιτητική ομάδα μηχανικής στην πρώτη γραμμή της ρομποτικής, των ενσωματωμένων συστημάτων και της εφαρμοσμένης τεχνολογίας.',
    hero_btn_join:    'Μπες στην ομάδα',
    hero_btn_work:    'Δες τα project μας',
    hero_stat_members:      'Μέλη',
    hero_stat_projects:     'Project',
    hero_stat_competitions: 'Διαγωνισμοί',
    hero_stat_sponsors:     'Χορηγοί',

    /* Sections */
    sec_news_label:   'Πρόσφατα',
    sec_news_title:   'Νέα & ανακοινώσεις',
    sec_news_more:    'Όλα τα νέα →',
    sec_proj_label:   'Τι κατασκευάζουμε',
    sec_proj_title:   'Επιλεγμένα project',
    sec_proj_more:    'Όλα τα project →',
    sec_comp_label:   'Πώς διαγωνιζόμαστε',
    sec_comp_title:   'Διαγωνισμοί',
    sec_comp_more:    'Όλοι οι διαγωνισμοί →',
    sec_spon_label:   'Συνεργάτες',
    sec_spon_title:   'Οι χορηγοί μας',
    sec_spon_more:    'Γίνε χορηγός →',
    sec_team_label:   'Μέλη',
    sec_team_title:   'Η ομάδα μας',
    sec_team_more:    'Όλη η ομάδα →',
    sec_events_label: 'Τι γίνεται',
    sec_events_title: 'Εκδηλώσεις',
    sec_events_more:  'Όλες οι εκδηλώσεις →',

    /* News */
    news_page_title:  'Νέα & ανακοινώσεις',
    news_page_sub:    'Μείνε ενημερωμένος για ανακοινώσεις, εκδηλώσεις και επιτεύγματα.',
    news_label_announcement: 'Ανακοίνωση',
    news_label_event:        'Εκδήλωση',
    news_label_achievement:  'Επίτευγμα',
    news_read_more:   'Διαβάστε περισσότερα →',
    news_back:        '← Πίσω στα Νέα',
    news_loading:     'Φόρτωση νέων...',
    news_empty:       'Δεν υπάρχουν νέα ακόμα.',
    news_error:       'Αδυναμία φόρτωσης νέων.',
    news_links_title: 'Σχετικοί σύνδεσμοι',

    /* Events */
    events_page_title:   'Εκδηλώσεις',
    events_page_sub:     'Workshops, ομιλίες και συναντήσεις που διοργανώνει το ENGAGE.',
    events_label_workshop:   'Workshop',
    events_label_talk:       'Ομιλία',
    events_label_meetup:     'Meetup',
    events_label_hackathon:  'Hackathon',
    events_label_other:      'Εκδήλωση',
    events_status_upcoming:  'Επερχόμενη',
    events_status_ongoing:   'Σε εξέλιξη',
    events_status_past:      'Παρελθόν',
    events_register:         'Εγγραφή →',
    events_learn_more:       'Μάθε περισσότερα →',
    events_empty:            'Δεν υπάρχουν εκδηλώσεις ακόμα.',
    events_error:            'Αδυναμία φόρτωσης εκδηλώσεων.',
    events_free:             'Δωρεάν',
    events_location_online:  'Διαδικτυακά',

    /* Projects */
    proj_page_title:  'Τα project μας',
    proj_page_sub:    'Από τη ρομποτική έως τα ενσωματωμένα συστήματα, αυτά κατασκευάζουν τα μέλη μας.',
    proj_loading:     'Φόρτωση project...',
    proj_empty:       'Δεν υπάρχουν project ακόμα.',
    proj_view_gh:     'Δες στο GitHub →',
    proj_status_active:    'Ενεργό',
    proj_status_completed: 'Ολοκληρωμένο',
    proj_status_paused:    'Σε παύση',

    /* Competitions */
    comp_page_title:  'Διαγωνισμοί',
    comp_page_sub:    'Διαγωνισμοί στους οποίους συμμετέχουμε, είμαστε ενεργοί και έχουμε ολοκληρώσει.',
    comp_loading:     'Φόρτωση διαγωνισμών...',
    comp_empty:       'Δεν υπάρχουν διαγωνισμοί ακόμα.',
    comp_upcoming:    'Επερχόμενος',
    comp_active:      'Ενεργός',
    comp_past:        'Παρελθόν',

    /* Team */
    team_page_title:  'Η ομάδα μας',
    team_page_sub:    'Οι άνθρωποι πίσω από το ENGAGE: Φοιτητές, μηχανικοί και δημιουργοί.',
    team_loading:     'Φόρτωση ομάδας...',
    team_empty:       'Δεν υπάρχουν μέλη ακόμα.',

    /* Sponsors */
    spon_page_title:  'Οι Χορηγοί μας',
    spon_page_sub:    'Ευγνωμονούμε τις εταιρείες και τους οργανισμούς που στηρίζουν τη δουλειά μας.',
    spon_tier_gold:   'Χρυσοί χορηγοί',
    spon_tier_silver: 'Αργυροί χορηγοί',
    spon_tier_bronze: 'Χάλκινοι χορηγοί',
    spon_cta_title:   'Γίνε χορηγός',
    spon_cta_sub:     'Στήριξε την επόμενη γενιά μηχανικών. Προσφέρουμε διάφορα επίπεδα χορηγίας.',
    spon_cta_btn:     'Επικοινώνησε μαζί μας →',

    /* Sponsor perks */
    spon_perk_vis_title:  'Ορατότητα brand',
    spon_perk_vis_desc:   'Το λογότυπό σας στον ιστότοπο, τις παρουσιάσεις και τα υλικά διαγωνισμών.',
    spon_perk_tal_title:  'Πρόσβαση σε ταλέντο',
    spon_perk_tal_desc:   'Άμεση πρόσβαση στους κορυφαίους φοιτητές μας για πρακτική ή εργασία.',
    spon_perk_col_title:  'Συνεργασία',
    spon_perk_col_desc:   'Συν-οργανώστε workshops και εκδηλώσεις. Εργαστείτε με φοιτητές σε πραγματικά προβλήματα.',
    spon_perks_label:     'Τι κερδίζετε',
    spon_perks_title:     'Οφέλη χορηγίας',
    spon_loading:         'Φόρτωση χορηγών...',
    spon_empty:           'Δεν υπάρχουν χορηγοί ακόμα.',

    /* Contact */
    contact_page_title: 'Επικοινωνία',
    contact_page_sub:   'Είτε θέλεις να γίνεις μέλος, να συνεργαστείς ή να μας υποστηρίξεις.',
    contact_tab_join:    'Εγγραφή',
    contact_tab_sponsor: 'Χορηγία',
    contact_tab_partner: 'Συνεργασία',
    contact_email_label: 'Email',
    contact_name_label:  'Ονοματεπώνυμο',
    contact_msg_label:   'Μήνυμα',
    contact_submit:      'Αποστολή',
    contact_sending:     'Αποστολή...',
    contact_success:     'Το μήνυμά σας εστάλη! Θα επικοινωνήσουμε σύντομα.',
    contact_error:       'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά.',

    /* Join form */
    join_dept:        'Τμήμα / Πρόγραμμα σπουδών',
    join_year:        'Έτος σπουδών',
    join_year_1:      '1ο έτος',
    join_year_2:      '2ο έτος',
    join_year_3:      '3ο έτος',
    join_year_4:      '4ο έτος',
    join_year_5:      '5ο έτος +',
    join_skills:      'Δεξιότητες & ενδιαφέροντα',
    join_skills_hint: 'π.χ. Python, ηλεκτρονικά, CAD, ρομποτική...',
    join_why:         'Γιατί θέλεις να γίνεις μέλος;',

    /* Sponsor form */
    spon_company:     'Όνομα εταιρείας',
    spon_website:     'Ιστοσελίδα εταιρείας',
    spon_tier_pref:   'Επιθυμητό επίπεδο χορηγίας',
    spon_tier_gold_f: 'Χρυσό',
    spon_tier_silv_f: 'Αργυρό',
    spon_tier_bron_f: 'Χάλκινο',
    spon_tier_disc_f: 'Να το συζητήσουμε',
    spon_message:     'Πείτε μας για την εταιρεία σας',

    /* Partner form */
    part_org:         'Όνομα οργανισμού',
    part_website:     'Ιστοσελίδα',
    part_type:        'Τύπος συνεργασίας',
    part_type_res:    'Ερευνητική συνεργασία',
    part_type_event:  'Συν-οργάνωση εκδήλωσης',
    part_type_other:  'Άλλο',
    part_message:     'Περιγράψτε τη συνεργασία',

    /* General */
    loading:          'Φόρτωση...',
    error_load:       'Αποτυχία φόρτωσης περιεχομένου.',
    footer_copy:      '© 2026 ENGAGE. All rights reserved.',
    footer_tagline:   'Χτίζουμε το μέλλον, ένα project τη φορά.',
    footer_links_title:  'Σελίδες',
    footer_social_title: 'Ακολουθήστε μας',
    footer_legal_title:  'Νομικά',
    footer_privacy:   'Πολιτική απορρήτου',
    footer_github_src: 'Περιεχόμενο στο GitHub',
  }
};

/* ── Lang engine ───────────────────────────────────────────── */
let currentLang = localStorage.getItem('engage-lang') || 'en';

function t(key) {
  return LANG[currentLang][key] || LANG['en'][key] || key;
}

function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = val;
    } else {
      el.innerHTML = val;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
  document.documentElement.lang = currentLang === 'el' ? 'el' : 'en';
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('engage-lang', lang);
  applyLang();
  if (typeof onLangChange === 'function') onLangChange(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  applyLang();
});
