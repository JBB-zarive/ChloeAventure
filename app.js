/**
 * app.js – Chloé Aventure
 * Application principale : logique UI, navigation, données
 */

/* ═══════════════════════════════════════════════════════════════
   DONNÉES PAR DÉFAUT (utilisées hors-ligne / sans API)
═══════════════════════════════════════════════════════════════ */
const DEFAULT_BADGES = [
  { id: 'first_mission',  icon: '⭐', name: 'Premier pas',       desc: 'Terminer ta première mission',              cat: 'général',  condition: { type: 'missions_total', value: 1  } },
  { id: 'streak_3',       icon: '🔥', name: 'En feu !',          desc: '3 jours d\'affilée',                        cat: 'général',  condition: { type: 'streak',         value: 3  } },
  { id: 'streak_7',       icon: '🌟', name: 'Semaine parfaite',  desc: '7 jours d\'affilée',                        cat: 'général',  condition: { type: 'streak',         value: 7  } },
  { id: 'streak_30',      icon: '💎', name: 'Mois légendaire',   desc: '30 jours d\'affilée',                       cat: 'général',  condition: { type: 'streak',         value: 30 } },
  { id: 'missions_10',    icon: '🏅', name: 'Aventurière',       desc: '10 missions accomplies',                    cat: 'général',  condition: { type: 'missions_total', value: 10 } },
  { id: 'missions_50',    icon: '🥇', name: 'Héroïne',           desc: '50 missions accomplies',                    cat: 'général',  condition: { type: 'missions_total', value: 50 } },
  { id: 'van_first',      icon: '🚐', name: 'Vanlife Rookie',    desc: 'Première mission Van',                      cat: 'van',      condition: { type: 'van_missions',   value: 1  } },
  { id: 'van_5',          icon: '🗺️', name: 'Exploratrice Van',  desc: '5 missions Van accomplie',                  cat: 'van',      condition: { type: 'van_missions',   value: 5  } },
  { id: 'van_10',         icon: '🏕️', name: 'Reine du Van',     desc: '10 missions Van accomplies',                cat: 'van',      condition: { type: 'van_missions',   value: 10 } },
  { id: 'nature_5',       icon: '🌿', name: 'Amie de la nature', desc: '5 missions Nature accomplies',              cat: 'nature',   condition: { type: 'cat_missions',   value: 5,  cat: 'Nature'  } },
  { id: 'reading_5',      icon: '📚', name: 'Grande Lectrice',   desc: '5 missions Lecture accomplies',             cat: 'lecture',  condition: { type: 'cat_missions',   value: 5,  cat: 'Lecture' } },
  { id: 'xp_100',         icon: '💫', name: 'Première centaine', desc: '100 XP gagnés',                             cat: 'xp',       condition: { type: 'total_xp',       value: 100 } },
  { id: 'xp_500',         icon: '🌠', name: 'Chasseuse d\'étoiles','desc': '500 XP gagnés',                        cat: 'xp',       condition: { type: 'total_xp',       value: 500 } },
  { id: 'level_3',        icon: '🛡️', name: 'Gardienne',         desc: 'Atteindre le niveau 3',                    cat: 'niveau',   condition: { type: 'level',          value: 3  } },
  { id: 'level_5',        icon: '👑', name: 'Héroïne Familiale', desc: 'Atteindre le niveau 5',                    cat: 'niveau',   condition: { type: 'level',          value: 5  } },
  { id: 'stars_observer', icon: '🔭', name: 'Observatrice',      desc: 'Observer les étoiles (mission Van)',        cat: 'van',      condition: { type: 'mission_id',     value: 'van_stars' } },
  { id: 'eco_warrior',    icon: '♻️', name: 'Éco-guerrière',     desc: 'Ramasser des déchets en voyage',           cat: 'van',      condition: { type: 'mission_id',     value: 'van_eco'  } },
  { id: 'helper',         icon: '🤝', name: 'Super assistante',  desc: 'Aider spontanément quelqu\'un',             cat: 'spécial',  condition: { type: 'mission_id',     value: 'special_helper' } },
];

const DEFAULT_MISSIONS = [
  // Quotidien
  { id: 'm_bed',      title: 'Faire son lit',            desc: 'Ranger son lit dès le matin',             cat: 'Quotidien',  diff: 'facile',   xp: 15,  icon: '🛏️',  freq: 'quotidien', validation: false  },
  { id: 'm_teeth',    title: 'Se brosser les dents',     desc: 'Matin et soir sans oublier',              cat: 'Quotidien',  diff: 'facile',   xp: 10,  icon: '🦷',  freq: 'quotidien', validation: false  },
  { id: 'm_room',     title: 'Ranger sa chambre',        desc: 'Tout à sa place !',                       cat: 'Maison',     diff: 'moyen',    xp: 25,  icon: '🏠',  freq: 'quotidien', validation: true   },
  { id: 'm_dishes',   title: 'Aider la vaisselle',       desc: 'Mettre ou sortir la vaisselle',           cat: 'Maison',     diff: 'facile',   xp: 20,  icon: '🍽️',  freq: 'quotidien', validation: false  },
  { id: 'm_read',     title: 'Lire 20 minutes',          desc: 'Un livre de ton choix',                   cat: 'Lecture',    diff: 'facile',   xp: 20,  icon: '📖',  freq: 'quotidien', validation: false  },
  { id: 'm_art',      title: 'Créer quelque chose',      desc: 'Dessiner, peindre ou bricoler',           cat: 'Créativité', diff: 'moyen',    xp: 30,  icon: '🎨',  freq: 'hebdo',     validation: false  },
  { id: 'm_garden',   title: 'Arroser les plantes',      desc: 'Prendre soin du jardin ou des plantes',   cat: 'Nature',     diff: 'facile',   xp: 15,  icon: '🌱',  freq: 'quotidien', validation: false  },
  { id: 'm_sport',    title: 'Faire du sport',           desc: '30 minutes d\'activité physique',         cat: 'Quotidien',  diff: 'moyen',    xp: 35,  icon: '🏃',  freq: 'quotidien', validation: false  },
  // Spéciaux
  { id: 'special_helper', title: 'Aide spontanée',       desc: 'Aider quelqu\'un sans qu\'on te le demande', cat: 'Spécial', diff: 'epique', xp: 75,  icon: '🤝',  freq: 'unique',    validation: true, secret: true },
  { id: 'm_screen',   title: 'Journée sans écran',       desc: 'Pas de téléphone de la journée !',        cat: 'Spécial',    diff: 'difficile', xp: 100, icon: '📵', freq: 'hebdo',     validation: true   },
  // Van
  { id: 'van_stars',  title: 'Observer les étoiles',     desc: 'Trouver 3 constellations',                cat: 'Van',        diff: 'facile',   xp: 30,  icon: '🔭',  freq: 'unique',    validation: false  },
  { id: 'van_beach',  title: 'Découvrir une plage',      desc: 'Explorer une nouvelle plage',             cat: 'Van',        diff: 'facile',   xp: 25,  icon: '🏖️',  freq: 'unique',    validation: false  },
  { id: 'van_hike',   title: 'Randonnée en famille',     desc: 'Au moins 5 km parcourus',                 cat: 'Van',        diff: 'moyen',    xp: 50,  icon: '🥾',  freq: 'unique',    validation: false  },
  { id: 'van_monument', title: 'Visiter un monument',    desc: 'Un lieu historique ou culturel',          cat: 'Van',        diff: 'moyen',    xp: 40,  icon: '🏛️',  freq: 'unique',    validation: false  },
  { id: 'van_camp',   title: 'Aider au campement',       desc: 'Installer ou ranger le campement',        cat: 'Van',        diff: 'facile',   xp: 30,  icon: '⛺',  freq: 'unique',    validation: false  },
  { id: 'van_eco',    title: 'Ramasser des déchets',     desc: 'Protéger la nature lors d\'un voyage',    cat: 'Van',        diff: 'moyen',    xp: 45,  icon: '♻️',  freq: 'unique',    validation: false  },
  { id: 'van_city',   title: 'Découvrir une ville',      desc: 'Explorer un endroit jamais visité',       cat: 'Van',        diff: 'facile',   xp: 30,  icon: '🏙️',  freq: 'unique',    validation: false  },
];

const DEFAULT_REWARDS = [
  { id: 'r_movie',   icon: '🎬', title: 'Choisir le film',        desc: 'Tu choisis le film du soir !',            cost: 80  },
  { id: 'r_dessert', icon: '🍰', title: 'Dessert préféré',         desc: 'Le dessert de ton choix',                 cost: 50  },
  { id: 'r_outing',  icon: '🎡', title: 'Sortie spéciale',         desc: 'Une sortie de ton choix',                 cost: 300 },
  { id: 'r_screen',  icon: '📱', title: '+1h d\'écran',            desc: 'Une heure de plus d\'écran',              cost: 100 },
  { id: 'r_sushi',   icon: '🍣', title: 'Soirée sushi',            desc: 'Resto sushi pour toute la famille',       cost: 250 },
  { id: 'r_book',    icon: '📚', title: 'Nouveau livre',           desc: 'Le livre de ton choix',                   cost: 120 },
  { id: 'r_friend',  icon: '👯', title: 'Inviter une amie',        desc: 'Inviter une amie à dormir',               cost: 200 },
];

const LEVELS = [
  { level: 1, name: 'Exploratrice',      min: 0,    max: 100,  emoji: '🌱' },
  { level: 2, name: 'Aventurière',       min: 100,  max: 300,  emoji: '🧭' },
  { level: 3, name: 'Gardienne',         min: 300,  max: 600,  emoji: '🛡️' },
  { level: 4, name: 'Maître des quêtes', min: 600,  max: 1000, emoji: '⚔️' },
  { level: 5, name: 'Héroïne Familiale', min: 1000, max: 9999, emoji: '👑' },
];

const CONGRATS = [
  'Bravo Chloé ! 🎉', 'Mission accomplie ! ⭐', 'Tu es une vraie aventurière ! 🗺️',
  'Incroyable ! Continue comme ça ! 🔥', 'Quelle championne ! 🏆', 'Tu assures ! 💪',
  'Super boulot ! ✨', 'Parfait ! La aventure continue ! 🚐', 'Waouh ! Impressionnant ! 🌟',
];

/* ═══════════════════════════════════════════════════════════════
   ÉTAT GLOBAL
═══════════════════════════════════════════════════════════════ */
const STATE = {
  user: {
    id: 'chloe',
    name: 'Chloé',
    xp: 0,
    totalXp: 0,
    streak: 0,
    lastActiveDate: null,
    level: 1,
    avatarEmoji: '🧭',
    missionsDone: 0,
  },
  missions: [],
  badges: DEFAULT_BADGES.map(b => ({ ...b, unlocked: false, unlockedAt: null })),
  rewards: DEFAULT_REWARDS,
  history: [],
  completions: {}, // { missionId: { status: 'done'|'pending', date: '…' } }
  parentsAuth: false,
  pin: '1234',
  currentTab: 'home',
  pendingValidations: [],
  theme: 'light',
};

/* ═══════════════════════════════════════════════════════════════
   UTILITAIRES
═══════════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

function today() { return new Date().toISOString().slice(0, 10); }

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getLevelInfo(xp) {
  return LEVELS.find(l => xp >= l.min && xp < l.max) ?? LEVELS[LEVELS.length - 1];
}

function getXpProgress(xp) {
  const lvl = getLevelInfo(xp);
  const progress = ((xp - lvl.min) / (lvl.max - lvl.min)) * 100;
  return { progress: Math.min(progress, 100), current: xp - lvl.min, needed: lvl.max - lvl.min, lvl };
}

/* ── Toast ────────────────────────────────────────────────────── */
let toastContainer;
function showToast(msg, type = 'info', duration = 3000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, duration);
}

/* ═══════════════════════════════════════════════════════════════
   PERSISTANCE LOCALE
═══════════════════════════════════════════════════════════════ */
const STORE_KEY = 'chloe_aventure_state';

function saveState() {
  const toSave = {
    user: STATE.user,
    missions: STATE.missions,
    badges: STATE.badges,
    rewards: STATE.rewards,
    history: STATE.history,
    completions: STATE.completions,
    pin: STATE.pin,
    pendingValidations: STATE.pendingValidations,
    theme: STATE.theme,
  };
  try { localStorage.setItem(STORE_KEY, JSON.stringify(toSave)); } catch (e) { console.warn('Erreur sauvegarde', e); }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    Object.assign(STATE.user, saved.user ?? {});
    if (saved.missions?.length) STATE.missions = saved.missions;
    if (saved.badges?.length) STATE.badges = saved.badges;
    if (saved.rewards?.length) STATE.rewards = saved.rewards;
    if (saved.history) STATE.history = saved.history;
    if (saved.completions) STATE.completions = saved.completions;
    if (saved.pin) STATE.pin = saved.pin;
    if (saved.pendingValidations) STATE.pendingValidations = saved.pendingValidations;
    if (saved.theme) STATE.theme = saved.theme;
  } catch (e) { console.warn('Erreur chargement', e); }
}

/* ═══════════════════════════════════════════════════════════════
   INITIALISATION
═══════════════════════════════════════════════════════════════ */
function initApp() {
  loadState();
  applyTheme();

  // Missions par défaut si aucune sauvegardée
  if (!STATE.missions.length) STATE.missions = DEFAULT_MISSIONS.map(m => ({ ...m }));

  checkDailyReset();
  updateStreak();

  renderAll();
  bindEvents();
  initPWA();

  // Synchronisation si API configurée
  if (API.getApiUrl()) syncWithServer();

  // Cache l'écran de chargement après animation
  setTimeout(() => {
    const splash = $('#splash-screen');
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.classList.add('hidden');
      $('#app').classList.remove('hidden');
    }, 600);
  }, 2200);
}

/* ── Réinitialisation quotidienne ─────────────────────────────── */
function checkDailyReset() {
  const t = today();
  const lastReset = localStorage.getItem('chloe_last_reset') ?? '';

  if (lastReset === t) return;
  localStorage.setItem('chloe_last_reset', t);

  // Remet à zéro les missions quotidiennes
  Object.keys(STATE.completions).forEach(id => {
    const mission = STATE.missions.find(m => m.id === id);
    if (mission && mission.freq === 'quotidien') {
      delete STATE.completions[id];
    }
  });

  // Hebdomadaire : reset le lundi
  const now = new Date();
  if (now.getDay() === 1) {
    Object.keys(STATE.completions).forEach(id => {
      const mission = STATE.missions.find(m => m.id === id);
      if (mission && mission.freq === 'hebdo') delete STATE.completions[id];
    });
  }

  saveState();
}

/* ── Streak ───────────────────────────────────────────────────── */
function updateStreak() {
  const t = today();
  const last = STATE.user.lastActiveDate;
  if (!last) return;

  const diff = Math.floor((new Date(t) - new Date(last)) / 86400000);
  if (diff === 1) {
    // Jour consécutif
  } else if (diff > 1) {
    STATE.user.streak = 0;
    saveState();
  }
}

/* ═══════════════════════════════════════════════════════════════
   RENDU GLOBAL
═══════════════════════════════════════════════════════════════ */
function renderAll() {
  renderHero();
  renderHomePage();
  renderMissionsPage();
  renderBadgesPage();
  renderRewardsPage();
  renderVanPage();
  renderAdminMissions();
  renderAdminRewards();
  renderAdminValidations();
  renderAdminHistory();
  updateHeaderXp();
}

/* ── Hero (accueil) ───────────────────────────────────────────── */
function renderHero() {
  const u = STATE.user;
  const info = getXpProgress(u.xp);
  const lvl = info.lvl;

  $('#avatar-emoji').textContent = lvl.emoji;
  $('#hero-name').textContent = u.name;
  $('#hero-title').textContent = lvl.name;
  $('#home-level-badge').textContent = `Niv. ${lvl.level}`;
  $('#xp-bar').style.width = info.progress + '%';
  $('#xp-label').textContent = `${info.current} / ${info.needed} XP`;
  $('#stat-streak').textContent = u.streak;
  $('#stat-total-xp').textContent = u.totalXp;
  $('#stat-badges').textContent = STATE.badges.filter(b => b.unlocked).length;
  $('#stat-missions-done').textContent = u.missionsDone;

  updateHeaderXp();
}

function updateHeaderXp() {
  $('#header-xp-value').textContent = STATE.user.xp;
}

/* ── Accueil ──────────────────────────────────────────────────── */
function renderHomePage() {
  // Missions du jour (max 3 non complétées)
  const todayMissions = STATE.missions
    .filter(m => m.freq === 'quotidien' || m.freq === 'unique')
    .filter(m => !STATE.completions[m.id] || STATE.completions[m.id].status !== 'done')
    .slice(0, 3);

  const $ml = $('#home-missions-list');
  if (todayMissions.length) {
    $ml.innerHTML = todayMissions.map(m => missionCardHTML(m)).join('');
  } else {
    $ml.innerHTML = `<div class="empty-state"><span class="empty-state-icon">🎉</span>Toutes les missions du jour sont accomplies !</div>`;
  }
  bindMissionCards($ml);

  // Badges récents
  const recent = STATE.badges.filter(b => b.unlocked).slice(-4);
  const $bl = $('#home-badges-list');
  $bl.innerHTML = recent.length
    ? recent.map(b => badgeMiniHTML(b)).join('')
    : `<div class="empty-state"><span class="empty-state-icon">🏆</span>Accomplis des missions pour gagner des badges !</div>`;

  // Récompenses
  const $rl = $('#home-rewards-list');
  $rl.innerHTML = STATE.rewards.slice(0, 3).map(r => rewardMiniHTML(r)).join('');
}

/* ── Missions ─────────────────────────────────────────────────── */
function renderMissionsPage(filter = 'all') {
  const filtered = filter === 'all' ? STATE.missions : STATE.missions.filter(m => m.cat === filter);
  const $list = $('#missions-list');
  if (!filtered.length) {
    $list.innerHTML = `<div class="empty-state"><span class="empty-state-icon">🎯</span>Aucune mission dans cette catégorie.</div>`;
    return;
  }
  $list.innerHTML = filtered.map(m => missionCardHTML(m)).join('');
  bindMissionCards($list);
}

/* ── Badges ───────────────────────────────────────────────────── */
function renderBadgesPage() {
  const unlocked = STATE.badges.filter(b => b.unlocked).length;
  const total = STATE.badges.length;
  $('#badges-progress-fill').style.width = (total ? (unlocked / total * 100) : 0) + '%';
  $('#badges-progress-label').textContent = `${unlocked} / ${total} débloqués`;

  $('#badges-grid').innerHTML = STATE.badges.map(b => `
    <div class="badge-card ${b.unlocked ? 'unlocked' : 'locked'}" title="${b.unlocked ? (b.unlockedAt ? formatDate(b.unlockedAt) : '') : b.desc}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.unlocked ? '✅ Débloqué' : b.desc}</div>
    </div>
  `).join('');
}

/* ── Récompenses ──────────────────────────────────────────────── */
function renderRewardsPage() {
  $('#balance-xp').textContent = `${STATE.user.xp} XP`;
  $('#rewards-list').innerHTML = STATE.rewards.map(r => rewardCardHTML(r)).join('');
  bindRewardCards($('#rewards-list'));
}

/* ── Van ──────────────────────────────────────────────────────── */
function renderVanPage() {
  const vanMissions = STATE.missions.filter(m => m.cat === 'Van');
  $('#van-missions-list').innerHTML = vanMissions.length
    ? vanMissions.map(m => missionCardHTML(m)).join('')
    : `<div class="empty-state"><span class="empty-state-icon">🚐</span>Aucune mission Van configurée.</div>`;
  bindMissionCards($('#van-missions-list'));

  const vanBadges = STATE.badges.filter(b => b.cat === 'van');
  $('#van-badges-list').innerHTML = vanBadges.map(b => badgeMiniHTML(b)).join('');
}

/* ── Admin Missions ───────────────────────────────────────────── */
function renderAdminMissions() {
  const $list = $('#admin-missions-list');
  if (!STATE.missions.length) {
    $list.innerHTML = `<div class="empty-state">Aucune mission créée.</div>`;
    return;
  }
  $list.innerHTML = STATE.missions.map(m => `
    <div class="admin-mission-item">
      <span style="font-size:1.4rem">${m.icon ?? '🎯'}</span>
      <div class="admin-mission-info">
        <div class="admin-mission-title">${m.title}</div>
        <div class="admin-mission-meta">${m.cat} · ${m.xp} XP · ${m.freq}</div>
      </div>
      <div class="admin-actions-btns">
        <button class="btn-icon" onclick="openEditMission('${m.id}')">✏️</button>
        <button class="btn-danger" onclick="deleteMission('${m.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

/* ── Admin Validations ────────────────────────────────────────── */
function renderAdminValidations() {
  const $list = $('#admin-validations-list');
  if (!STATE.pendingValidations.length) {
    $list.innerHTML = `<div class="empty-state">Aucune mission en attente de validation. 🎉</div>`;
    return;
  }
  $list.innerHTML = STATE.pendingValidations.map(v => `
    <div class="validation-item">
      <div class="validation-header">
        <div class="validation-title">${v.missionTitle ?? v.missionId}</div>
        <div class="validation-date">${v.date ? formatDate(v.date) : ''}</div>
      </div>
      <div class="validation-desc">${v.desc ?? ''}</div>
      <div class="validation-btns">
        <button class="btn-approve" onclick="validateMission('${v.id}', true)">✅ Valider</button>
        <button class="btn-refuse" onclick="validateMission('${v.id}', false)">❌ Refuser</button>
      </div>
    </div>
  `).join('');
}

/* ── Admin Récompenses ────────────────────────────────────────── */
function renderAdminRewards() {
  const $list = $('#admin-rewards-list');
  $list.innerHTML = STATE.rewards.map(r => `
    <div class="admin-mission-item">
      <span style="font-size:1.4rem">${r.icon}</span>
      <div class="admin-mission-info">
        <div class="admin-mission-title">${r.title}</div>
        <div class="admin-mission-meta">${r.cost} XP · ${r.desc ?? ''}</div>
      </div>
      <div class="admin-actions-btns">
        <button class="btn-icon" onclick="openEditReward('${r.id}')">✏️</button>
        <button class="btn-danger" onclick="deleteReward('${r.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

/* ── Admin Historique ─────────────────────────────────────────── */
function renderAdminHistory() {
  const $list = $('#admin-history-list');
  if (!STATE.history.length) {
    $list.innerHTML = `<div class="empty-state">Aucun historique pour le moment.</div>`;
    return;
  }
  $list.innerHTML = STATE.history.slice().reverse().map(h => `
    <div class="history-item">
      <span class="history-icon">${h.icon ?? '📌'}</span>
      <div class="history-body">
        <div class="history-title">${h.title}</div>
        <div class="history-date">${h.date ? formatDate(h.date) : ''}</div>
      </div>
      <div class="history-xp">+${h.xp ?? 0} XP</div>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   HTML BUILDERS
═══════════════════════════════════════════════════════════════ */
function missionCardHTML(m) {
  const comp = STATE.completions[m.id];
  const isDone = comp?.status === 'done';
  const isPending = comp?.status === 'pending';
  const statusClass = isDone ? 'done' : isPending ? 'pending' : '';
  const btnClass = isDone ? 'done-btn' : isPending ? 'pending-btn' : '';
  const btnIcon = isDone ? '✓' : isPending ? '⏳' : '○';

  return `
    <div class="mission-card ${statusClass}" data-id="${m.id}">
      <div class="mission-icon-wrap">
        <span>${m.icon ?? '🎯'}</span>
        <span class="diff-dot diff-${m.diff ?? 'facile'}"></span>
      </div>
      <div class="mission-body">
        <div class="mission-title">${m.title}</div>
        <div class="mission-desc">${m.desc ?? ''}</div>
        <div class="mission-meta">
          <span class="mission-tag">${m.cat}</span>
          <span class="mission-xp">+${m.xp} XP</span>
          ${m.secret && !isDone ? '<span class="mission-tag" style="color:var(--violet)">🔒 Secret</span>' : ''}
        </div>
      </div>
      <div class="mission-action">
        <button class="complete-btn ${btnClass}" data-id="${m.id}" ${isDone || isPending ? 'disabled' : ''}>${btnIcon}</button>
      </div>
    </div>
  `;
}

function badgeMiniHTML(b) {
  return `
    <div class="badge-card-mini ${b.unlocked ? 'unlocked' : 'locked'}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-name">${b.name}</div>
    </div>
  `;
}

function rewardCardHTML(r) {
  const canAfford = STATE.user.xp >= r.cost;
  return `
    <div class="reward-card">
      <div class="reward-icon-wrap">${r.icon ?? '🎁'}</div>
      <div class="reward-body">
        <div class="reward-title">${r.title}</div>
        <div class="reward-desc">${r.desc ?? ''}</div>
        <div class="reward-cost">⚡ ${r.cost} XP</div>
      </div>
      <button class="reward-buy-btn" data-id="${r.id}" ${canAfford ? '' : 'disabled'}>
        ${canAfford ? 'Obtenir' : `${r.cost - STATE.user.xp} XP`}
      </button>
    </div>
  `;
}

function rewardMiniHTML(r) {
  return `
    <div class="reward-card-mini">
      <div class="reward-icon-wrap">${r.icon ?? '🎁'}</div>
      <div class="reward-title">${r.title}</div>
      <div class="reward-cost">⚡ ${r.cost}</div>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════════════
   ÉVÉNEMENTS
═══════════════════════════════════════════════════════════════ */
function bindEvents() {
  // Navigation bas
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.tab));
  });

  // "Tout voir" accueil
  $$('.see-all-btn').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.tab));
  });

  // Filtres missions
  $$('#missions-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#missions-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMissionsPage(btn.dataset.filter);
    });
  });

  // Thème
  $('#theme-toggle').addEventListener('click', toggleTheme);

  // Parents – accéder
  $('#open-pin-btn').addEventListener('click', openPinModal);
  $('#pin-cancel').addEventListener('click', closePinModal);
  $('#parents-logout').addEventListener('click', logoutParents);

  // PIN keypad
  $$('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const digit = btn.dataset.digit;
      const action = btn.dataset.action;
      if (digit !== undefined) handlePinDigit(digit);
      else if (action === 'back') handlePinBack();
      else if (action === 'clear') resetPin();
    });
  });

  // Admin tabs
  $$('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.admin-tab').forEach(t => t.classList.remove('active'));
      $$('.admin-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $(`#admin-${tab.dataset.admin}`)?.classList.add('active');
    });
  });

  // Modals backdrop
  $$('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', () => {
      // Ferme toutes les modales sauf PIN en cours
      closeAllModals();
    });
  });

  // Modal succès
  $('#success-close').addEventListener('click', () => $('#success-modal').classList.add('hidden'));

  // Confirm modal
  $('#confirm-cancel').addEventListener('click', () => $('#confirm-modal').classList.add('hidden'));

  // Formulaire mission
  $('#add-mission-btn')?.addEventListener('click', () => openMissionForm());
  $('#mission-form-cancel').addEventListener('click', () => $('#mission-form-modal').classList.add('hidden'));
  $('#mission-form').addEventListener('submit', handleMissionFormSubmit);

  // Formulaire récompense
  $('#add-reward-btn')?.addEventListener('click', () => openRewardForm());
  $('#reward-form-cancel').addEventListener('click', () => $('#reward-form-modal').classList.add('hidden'));
  $('#reward-form').addEventListener('submit', handleRewardFormSubmit);

  // Paramètres
  $('#save-pin-btn').addEventListener('click', saveNewPin);
  $('#give-bonus-btn').addEventListener('click', giveBonus);
  $('#save-api-btn').addEventListener('click', saveApiUrl);
  $('#sync-btn').addEventListener('click', () => { syncWithServer(); showToast('Synchronisation en cours…', 'info'); });

  // Init valeur URL API
  $('#api-url-input').value = API.getApiUrl();
}

function bindMissionCards(ctx) {
  $$('.complete-btn', ctx).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      completeMission(btn.dataset.id);
    });
  });
}

function bindRewardCards(ctx) {
  $$('.reward-buy-btn', ctx).forEach(btn => {
    btn.addEventListener('click', () => buyReward(btn.dataset.id));
  });
}

/* ═══════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════ */
function navigateTo(tab) {
  STATE.currentTab = tab;

  $$('.page').forEach(p => p.classList.remove('active'));
  $$('.nav-btn').forEach(b => b.classList.remove('active'));

  $(`#page-${tab === 'home' ? 'home' : tab === 'missions' ? 'missions' : tab === 'badges' ? 'badges' : tab === 'rewards' ? 'rewards' : tab === 'van' ? 'van' : 'parents'}`)?.classList.add('active');
  $(`.nav-btn[data-tab="${tab}"]`)?.classList.add('active');

  // Si page parents : afficher le bon état
  if (tab === 'parents') {
    if (STATE.parentsAuth) showParentsContent();
    else showParentsLocked();
  }
}

/* ═══════════════════════════════════════════════════════════════
   MISSIONS
═══════════════════════════════════════════════════════════════ */
function completeMission(id) {
  const mission = STATE.missions.find(m => m.id === id);
  if (!mission) return;
  if (STATE.completions[id]) return; // Déjà en cours

  if (mission.validation) {
    // Nécessite validation parentale
    STATE.completions[id] = { status: 'pending', date: today() };
    STATE.pendingValidations.push({
      id: uid(),
      missionId: id,
      missionTitle: mission.title,
      desc: mission.desc,
      xp: mission.xp,
      date: new Date().toISOString(),
    });
    showToast('Mission en attente de validation parentale ⏳', 'info');
    saveState();
    renderAll();
    // Sync serveur si dispo
    API.submitMissionCompletion(id, STATE.user.id).catch(() => {});
  } else {
    // Validation automatique
    awardMission(id, mission);
  }
}

function awardMission(id, mission) {
  STATE.completions[id] = { status: 'done', date: today() };
  addXp(mission.xp, mission.title, mission.icon);

  // Streak
  const t = today();
  if (STATE.user.lastActiveDate !== t) {
    const last = STATE.user.lastActiveDate;
    if (last) {
      const diff = Math.floor((new Date(t) - new Date(last)) / 86400000);
      if (diff === 1) STATE.user.streak++;
      else if (diff > 1) STATE.user.streak = 1;
    } else {
      STATE.user.streak = 1;
    }
    STATE.user.lastActiveDate = t;
  }

  // Missions compteur
  STATE.user.missionsDone++;

  // Vérifie badges
  checkBadges();
  saveState();
  renderAll();

  // Animation
  showSuccessModal(mission);
}

function addXp(amount, title, icon = '⭐') {
  STATE.user.xp += amount;
  STATE.user.totalXp += amount;

  // Historique
  STATE.history.push({ id: uid(), title, icon, xp: amount, date: new Date().toISOString() });
  if (STATE.history.length > 200) STATE.history.shift();

  updateHeaderXp();
}

/* ── Validation parentale ─────────────────────────────────────── */
window.validateMission = function(validationId, approved) {
  const idx = STATE.pendingValidations.findIndex(v => v.id === validationId);
  if (idx === -1) return;

  const v = STATE.pendingValidations[idx];
  STATE.pendingValidations.splice(idx, 1);

  if (approved) {
    const mission = STATE.missions.find(m => m.id === v.missionId);
    if (mission) awardMission(v.missionId, mission);
    showToast(`Mission "${v.missionTitle}" validée ! ✅`, 'success');
  } else {
    delete STATE.completions[v.missionId];
    showToast(`Mission "${v.missionTitle}" refusée.`, 'error');
  }

  saveState();
  renderAdminValidations();

  // Sync serveur
  API.validateMission(validationId, approved).catch(() => {});
};

/* ═══════════════════════════════════════════════════════════════
   BADGES
═══════════════════════════════════════════════════════════════ */
function checkBadges() {
  const u = STATE.user;
  const doneMissions = STATE.missions.filter(m => STATE.completions[m.id]?.status === 'done');
  const vanDone = doneMissions.filter(m => m.cat === 'Van').length;
  const levelInfo = getLevelInfo(u.xp);

  STATE.badges.forEach(b => {
    if (b.unlocked) return;
    const c = b.condition;
    let earned = false;

    switch (c.type) {
      case 'missions_total': earned = u.missionsDone >= c.value; break;
      case 'streak':         earned = u.streak >= c.value; break;
      case 'van_missions':   earned = vanDone >= c.value; break;
      case 'total_xp':       earned = u.totalXp >= c.value; break;
      case 'level':          earned = levelInfo.level >= c.value; break;
      case 'cat_missions':
        earned = doneMissions.filter(m => m.cat === c.cat).length >= c.value;
        break;
      case 'mission_id':
        earned = STATE.completions[c.value]?.status === 'done';
        break;
    }

    if (earned) {
      b.unlocked = true;
      b.unlockedAt = new Date().toISOString();
      // Notification badge
      setTimeout(() => showToast(`🏆 Badge débloqué : ${b.name} !`, 'success', 4000), 1000);
      // Historique
      STATE.history.push({ id: uid(), title: `Badge : ${b.name}`, icon: b.icon, xp: 0, date: b.unlockedAt });
    }
  });
}

/* ═══════════════════════════════════════════════════════════════
   RÉCOMPENSES
═══════════════════════════════════════════════════════════════ */
function buyReward(id) {
  const reward = STATE.rewards.find(r => r.id === id);
  if (!reward) return;
  if (STATE.user.xp < reward.cost) { showToast('Pas assez de XP !', 'error'); return; }

  showConfirmModal(
    '🎁', `Obtenir "${reward.title}" ?`,
    `Cette récompense coûte ${reward.cost} XP. Il te restera ${STATE.user.xp - reward.cost} XP.`,
    () => {
      STATE.user.xp -= reward.cost;
      STATE.history.push({ id: uid(), title: `Récompense : ${reward.title}`, icon: reward.icon, xp: -reward.cost, date: new Date().toISOString() });
      showToast(`Récompense "${reward.title}" demandée ! En attente des parents 🎉`, 'success', 4000);
      saveState();
      renderRewardsPage();
      updateHeaderXp();
      API.redeemReward(id, STATE.user.id).catch(() => {});
    }
  );
}

/* ═══════════════════════════════════════════════════════════════
   FORMULAIRES ADMIN
═══════════════════════════════════════════════════════════════ */
let editingMissionId = null;

function openMissionForm(id = null) {
  editingMissionId = id;
  const form = $('#mission-form');
  form.reset();

  if (id) {
    const m = STATE.missions.find(ms => ms.id === id);
    if (!m) return;
    $('#mission-form-title').textContent = 'Modifier la mission';
    $('#mission-title-input').value = m.title;
    $('#mission-desc-input').value = m.desc ?? '';
    $('#mission-cat-input').value = m.cat;
    $('#mission-diff-input').value = m.diff ?? 'facile';
    $('#mission-points-input').value = m.xp;
    $('#mission-freq-input').value = m.freq ?? 'unique';
    $('#mission-due-input').value = m.due ?? '';
    $('#mission-validation-input').checked = m.validation ?? true;
  } else {
    $('#mission-form-title').textContent = 'Nouvelle mission';
  }
  $('#mission-form-modal').classList.remove('hidden');
}

window.openEditMission = openMissionForm;

function handleMissionFormSubmit(e) {
  e.preventDefault();
  const mission = {
    id: editingMissionId ?? uid(),
    title: $('#mission-title-input').value.trim(),
    desc: $('#mission-desc-input').value.trim(),
    cat: $('#mission-cat-input').value,
    diff: $('#mission-diff-input').value,
    xp: parseInt($('#mission-points-input').value) || 20,
    freq: $('#mission-freq-input').value,
    due: $('#mission-due-input').value || null,
    validation: $('#mission-validation-input').checked,
    icon: getCatIcon($('#mission-cat-input').value),
  };

  if (editingMissionId) {
    const idx = STATE.missions.findIndex(m => m.id === editingMissionId);
    if (idx > -1) STATE.missions[idx] = mission;
    API.updateMission(editingMissionId, mission).catch(() => {});
  } else {
    STATE.missions.push(mission);
    API.createMission(mission).catch(() => {});
  }

  saveState();
  renderAll();
  $('#mission-form-modal').classList.add('hidden');
  showToast(editingMissionId ? 'Mission modifiée ✓' : 'Mission créée ! 🎯', 'success');
  editingMissionId = null;
}

window.deleteMission = function(id) {
  showConfirmModal('🗑️', 'Supprimer la mission ?', 'Cette action est irréversible.', () => {
    STATE.missions = STATE.missions.filter(m => m.id !== id);
    delete STATE.completions[id];
    saveState();
    renderAll();
    API.deleteMission(id).catch(() => {});
    showToast('Mission supprimée.', 'info');
  });
};

let editingRewardId = null;

function openRewardForm(id = null) {
  editingRewardId = id;
  const form = $('#reward-form');
  form.reset();

  if (id) {
    const r = STATE.rewards.find(rw => rw.id === id);
    if (!r) return;
    $('#reward-form-title').textContent = 'Modifier la récompense';
    $('#reward-title-input').value = r.title;
    $('#reward-desc-input').value = r.desc ?? '';
    $('#reward-cost-input').value = r.cost;
    $('#reward-icon-input').value = r.icon ?? '🎁';
  } else {
    $('#reward-form-title').textContent = 'Nouvelle récompense';
  }
  $('#reward-form-modal').classList.remove('hidden');
}

window.openEditReward = openRewardForm;

function handleRewardFormSubmit(e) {
  e.preventDefault();
  const reward = {
    id: editingRewardId ?? uid(),
    title: $('#reward-title-input').value.trim(),
    desc: $('#reward-desc-input').value.trim(),
    cost: parseInt($('#reward-cost-input').value) || 100,
    icon: $('#reward-icon-input').value || '🎁',
    available: $('#reward-available-input').checked,
  };

  if (editingRewardId) {
    const idx = STATE.rewards.findIndex(r => r.id === editingRewardId);
    if (idx > -1) STATE.rewards[idx] = reward;
    API.updateReward(editingRewardId, reward).catch(() => {});
  } else {
    STATE.rewards.push(reward);
    API.createReward(reward).catch(() => {});
  }

  saveState();
  renderAll();
  $('#reward-form-modal').classList.add('hidden');
  showToast(editingRewardId ? 'Récompense modifiée ✓' : 'Récompense créée ! 🎁', 'success');
  editingRewardId = null;
}

window.deleteReward = function(id) {
  showConfirmModal('🗑️', 'Supprimer la récompense ?', 'Cette action est irréversible.', () => {
    STATE.rewards = STATE.rewards.filter(r => r.id !== id);
    saveState();
    renderAll();
    API.deleteReward(id).catch(() => {});
    showToast('Récompense supprimée.', 'info');
  });
};

/* ═══════════════════════════════════════════════════════════════
   PARAMÈTRES
═══════════════════════════════════════════════════════════════ */
function saveNewPin() {
  const newPin = $('#new-pin-input').value.trim();
  if (!/^\d{4}$/.test(newPin)) { showToast('Le PIN doit contenir 4 chiffres.', 'error'); return; }
  STATE.pin = newPin;
  saveState();
  $('#new-pin-input').value = '';
  showToast('Code PIN mis à jour ✓', 'success');
}

function giveBonus() {
  const pts = parseInt($('#bonus-points-input').value) || 0;
  const reason = $('#bonus-reason-input').value.trim() || 'Bonus parental';
  if (pts <= 0) { showToast('Entrez un nombre de points valide.', 'error'); return; }
  addXp(pts, reason, '⭐');
  checkBadges();
  saveState();
  renderAll();
  showToast(`+${pts} XP attribués à ${STATE.user.name} ! 🌟`, 'success');
  API.addPoints(STATE.user.id, pts, reason).catch(() => {});
}

function saveApiUrl() {
  const url = $('#api-url-input').value.trim();
  API.setApiUrl(url);
  showToast('URL API enregistrée ✓', 'success');
}

/* ═══════════════════════════════════════════════════════════════
   AUTHENTIFICATION PARENTS
═══════════════════════════════════════════════════════════════ */
let pinBuffer = '';

function openPinModal() {
  resetPin();
  $('#pin-modal').classList.remove('hidden');
  $('#pin-error').classList.add('hidden');
}
function closePinModal() { $('#pin-modal').classList.add('hidden'); resetPin(); }

function handlePinDigit(d) {
  if (pinBuffer.length >= 4) return;
  pinBuffer += d;
  updatePinDisplay();
  if (pinBuffer.length === 4) setTimeout(verifyPin, 200);
}
function handlePinBack() { pinBuffer = pinBuffer.slice(0, -1); updatePinDisplay(); }
function resetPin() { pinBuffer = ''; updatePinDisplay(); }

function updatePinDisplay() {
  $$('.pin-dot').forEach((dot, i) => {
    dot.classList.toggle('filled', i < pinBuffer.length);
  });
}

function verifyPin() {
  if (pinBuffer === STATE.pin) {
    closePinModal();
    STATE.parentsAuth = true;
    showParentsContent();
    showToast('Bienvenue dans l\'espace parents 👋', 'success');
  } else {
    $('#pin-error').classList.remove('hidden');
    resetPin();
    // Animation shake
    $('#pin-display').animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'none' }], { duration: 300 });
    setTimeout(() => $('#pin-error').classList.add('hidden'), 2000);
  }
}

function showParentsContent() {
  $('#parents-locked').classList.add('hidden');
  $('#parents-content').classList.remove('hidden');
  renderAdminMissions();
  renderAdminRewards();
  renderAdminValidations();
  renderAdminHistory();
}

function showParentsLocked() {
  $('#parents-locked').classList.remove('hidden');
  $('#parents-content').classList.add('hidden');
}

function logoutParents() {
  STATE.parentsAuth = false;
  showParentsLocked();
  showToast('Déconnecté de l\'espace parents.', 'info');
}

/* ═══════════════════════════════════════════════════════════════
   THÈME
═══════════════════════════════════════════════════════════════ */
function applyTheme() {
  document.body.className = `theme-${STATE.theme}`;
  $('#theme-toggle').textContent = STATE.theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
  applyTheme();
  saveState();
}

/* ═══════════════════════════════════════════════════════════════
   MODALES
═══════════════════════════════════════════════════════════════ */
function closeAllModals() {
  $$('.modal').forEach(m => m.classList.add('hidden'));
}

function showSuccessModal(mission) {
  const msg = CONGRATS[Math.floor(Math.random() * CONGRATS.length)];
  $('#success-title').textContent = 'Mission accomplie !';
  $('#success-message').textContent = msg;
  $('#success-points').textContent = `+${mission.xp} XP`;
  $('#success-modal').classList.remove('hidden');
  launchConfetti();

  // Vibration légère
  if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
}

let confirmCallback = null;
function showConfirmModal(icon, title, msg, onConfirm) {
  $('#confirm-icon').textContent = icon;
  $('#confirm-title').textContent = title;
  $('#confirm-message').textContent = msg;
  confirmCallback = onConfirm;
  $('#confirm-modal').classList.remove('hidden');
}
$('#confirm-ok')?.addEventListener('click', () => {
  $('#confirm-modal').classList.add('hidden');
  confirmCallback?.();
  confirmCallback = null;
});

/* ═══════════════════════════════════════════════════════════════
   CONFETTIS
═══════════════════════════════════════════════════════════════ */
function launchConfetti() {
  const container = $('#confetti-container');
  container.innerHTML = '';
  const colors = ['#6C63FF', '#F5A623', '#2ECC71', '#FF6B9D', '#3A9AD9', '#A855F7'];

  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${-10 - Math.random() * 20}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      width: ${4 + Math.random() * 8}px;
      height: ${4 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      animation-duration: ${1.5 + Math.random() * 2}s;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(piece);
  }

  setTimeout(() => { container.innerHTML = ''; }, 4000);
}

/* ═══════════════════════════════════════════════════════════════
   UTILITAIRE ICÔNES
═══════════════════════════════════════════════════════════════ */
function getCatIcon(cat) {
  const icons = {
    Quotidien: '📅', Maison: '🏠', Vacances: '🌴', Van: '🚐',
    Nature: '🌿', Lecture: '📚', Créativité: '🎨', Spécial: '⭐',
  };
  return icons[cat] ?? '🎯';
}

/* ═══════════════════════════════════════════════════════════════
   SYNCHRONISATION SERVEUR
═══════════════════════════════════════════════════════════════ */
async function syncWithServer() {
  try {
    const result = await API.syncAll(STATE.user.id);

    if (result.missions?.ok && result.missions.data?.length) {
      STATE.missions = result.missions.data;
    }
    if (result.rewards?.ok && result.rewards.data?.length) {
      STATE.rewards = result.rewards.data;
    }
    if (result.userData?.ok && result.userData.data) {
      Object.assign(STATE.user, result.userData.data);
    }
    if (result.badges?.ok && result.badges.data) {
      // Merge badges serveur avec badges locaux
      result.badges.data.forEach(sb => {
        const local = STATE.badges.find(b => b.id === sb.id);
        if (local && sb.unlocked) { local.unlocked = true; local.unlockedAt = sb.unlockedAt; }
      });
    }

    saveState();
    renderAll();
  } catch (e) {
    console.warn('Sync échouée (hors-ligne ?)', e);
  }
}

/* ═══════════════════════════════════════════════════════════════
   PWA – Service Worker
═══════════════════════════════════════════════════════════════ */
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('SW enregistré', reg.scope))
      .catch(err => console.warn('SW erreur', err));
  }

  // Prompt installation
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    // Optionnel : afficher un bouton d'installation
  });
}

/* ═══════════════════════════════════════════════════════════════
   DÉMARRAGE
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', initApp);
