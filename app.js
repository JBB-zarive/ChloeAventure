/**
 * app.js – Chloé Aventure v5
 * Quêtes séparées · Notifications locales · Sync auto · Emoji iOS
 */

/* ══════════════════════════════════════════════════════════════
   DONNÉES PAR DÉFAUT
══════════════════════════════════════════════════════════════ */
const DEFAULT_BADGES = [
  { id: 'first_mission',  icon: '⭐', name: 'Premier pas',        desc: 'Terminer ta première mission',       cat: 'général', condition: { type: 'missions_total', value: 1  } },
  { id: 'streak_3',       icon: '🔥', name: 'En feu !',           desc: '3 jours d\'affilée',                 cat: 'général', condition: { type: 'streak',         value: 3  } },
  { id: 'streak_7',       icon: '🌟', name: 'Semaine parfaite',   desc: '7 jours d\'affilée',                 cat: 'général', condition: { type: 'streak',         value: 7  } },
  { id: 'streak_30',      icon: '💎', name: 'Mois légendaire',    desc: '30 jours d\'affilée',                cat: 'général', condition: { type: 'streak',         value: 30 } },
  { id: 'missions_10',    icon: '🏅', name: 'Aventurière',        desc: '10 missions accomplies',             cat: 'général', condition: { type: 'missions_total', value: 10 } },
  { id: 'missions_50',    icon: '🥇', name: 'Héroïne',            desc: '50 missions accomplies',             cat: 'général', condition: { type: 'missions_total', value: 50 } },
  { id: 'first_quete',    icon: '🗺️', name: 'Quêteuse',           desc: 'Première quête accomplie',           cat: 'quete',   condition: { type: 'quetes_total',   value: 1  } },
  { id: 'quetes_5',       icon: '🧭', name: 'Exploratrice',       desc: '5 quêtes accomplies',                cat: 'quete',   condition: { type: 'quetes_total',   value: 5  } },
  { id: 'van_first',      icon: '🚐', name: 'Vanlife Rookie',     desc: 'Première mission Van',               cat: 'van',     condition: { type: 'van_missions',   value: 1  } },
  { id: 'van_5',          icon: '🏕️', name: 'Exploratrice Van',  desc: '5 missions Van',                     cat: 'van',     condition: { type: 'van_missions',   value: 5  } },
  { id: 'nature_5',       icon: '🌿', name: 'Amie de la nature',  desc: '5 missions Nature',                  cat: 'nature',  condition: { type: 'cat_missions',   value: 5, cat: 'Nature'  } },
  { id: 'reading_5',      icon: '📚', name: 'Grande Lectrice',    desc: '5 missions Lecture',                 cat: 'lecture', condition: { type: 'cat_missions',   value: 5, cat: 'Lecture' } },
  { id: 'xp_100',         icon: '💫', name: 'Première centaine',  desc: '100 XP gagnés',                      cat: 'xp',      condition: { type: 'total_xp',       value: 100  } },
  { id: 'xp_500',         icon: '🌠', name: 'Chasseuse d\'étoiles',desc:'500 XP gagnés',                     cat: 'xp',      condition: { type: 'total_xp',       value: 500  } },
  { id: 'xp_1000',        icon: '👑', name: 'Maîtresse des XP',   desc: '1000 XP gagnés',                     cat: 'xp',      condition: { type: 'total_xp',       value: 1000 } },
  { id: 'level_3',        icon: '🛡️', name: 'Gardienne',          desc: 'Atteindre le niveau 3',              cat: 'niveau',  condition: { type: 'level',          value: 3  } },
  { id: 'level_5',        icon: '👑', name: 'Héroïne Familiale',  desc: 'Atteindre le niveau 5',              cat: 'niveau',  condition: { type: 'level',          value: 5  } },
  { id: 'eco_warrior',    icon: '♻️', name: 'Éco-guerrière',      desc: 'Ramasser des déchets en voyage',     cat: 'van',     condition: { type: 'mission_id',     value: 'van_eco'  } },
  { id: 'stars_observer', icon: '🔭', name: 'Observatrice',       desc: 'Observer les étoiles',               cat: 'van',     condition: { type: 'mission_id',     value: 'van_stars'} },
  // Niveaux
  { id: 'level_5',      icon: '🛡️', name: 'Gardienne',            desc: 'Atteindre le niveau 5',    cat: 'niveau',  condition: { type: 'level',          value: 5   } },
  { id: 'level_10',     icon: '⚔️', name: 'Maitre des quetes',    desc: 'Atteindre le niveau 10',   cat: 'niveau',  condition: { type: 'level',          value: 10  } },
  { id: 'level_15',     icon: '🏆', name: 'Conquerante',          desc: 'Atteindre le niveau 15',   cat: 'niveau',  condition: { type: 'level',          value: 15  } },
  { id: 'level_20',     icon: '👑', name: 'Heroine Familiale',    desc: 'Atteindre le niveau 20',   cat: 'niveau',  condition: { type: 'level',          value: 20  } },
  { id: 'level_25',     icon: '💫', name: 'Etoile filante',       desc: 'Atteindre le niveau 25',   cat: 'niveau',  condition: { type: 'level',          value: 25  } },
  { id: 'level_30',     icon: '👸', name: 'Chloe la Magnifique',  desc: 'Atteindre le niveau 30 !', cat: 'niveau',  condition: { type: 'level',          value: 30  } },
  // XP
  { id: 'xp_2000',      icon: '🌟', name: 'Super active',         desc: '2000 XP gagnes',           cat: 'xp',      condition: { type: 'total_xp',       value: 2000  } },
  { id: 'xp_5000',      icon: '🚀', name: 'Astronaute XP',        desc: '5000 XP gagnes',           cat: 'xp',      condition: { type: 'total_xp',       value: 5000  } },
  { id: 'xp_10000',     icon: '🌈', name: 'Legende des XP',       desc: '10000 XP gagnes',          cat: 'xp',      condition: { type: 'total_xp',       value: 10000 } },
  // Missions
  { id: 'missions_100', icon: '🎖️', name: 'Centurion',            desc: '100 missions accomplies',  cat: 'general', condition: { type: 'missions_total', value: 100  } },
  { id: 'missions_200', icon: '🏅', name: 'Veterane',             desc: '200 missions accomplies',  cat: 'general', condition: { type: 'missions_total', value: 200  } },
  // Streaks
  { id: 'streak_14',    icon: '🔥', name: 'Deux semaines !',      desc: '14 jours affilee',         cat: 'general', condition: { type: 'streak',         value: 14  } },
  { id: 'streak_60',    icon: '💎', name: 'Deux mois !',          desc: '60 jours affilee',         cat: 'general', condition: { type: 'streak',         value: 60  } },
  { id: 'streak_100',   icon: '👸', name: 'Centenaire de feu',    desc: '100 jours affilee',        cat: 'general', condition: { type: 'streak',         value: 100 } },
];

const DEFAULT_MISSIONS = [
  { id: 'm_bed',     title: 'Faire son lit',         desc: 'Ranger son lit dès le matin',             cat: 'Quotidien',  diff: 'facile',   xp: 15,  icon: '🛏️', freq: 'quotidien', validation: false, type: 'mission' },
  { id: 'm_teeth',   title: 'Se brosser les dents',  desc: 'Matin et soir sans oublier',              cat: 'Quotidien',  diff: 'facile',   xp: 10,  icon: '🦷', freq: 'quotidien', validation: false, type: 'mission' },
  { id: 'm_room',    title: 'Ranger sa chambre',     desc: 'Tout à sa place !',                       cat: 'Maison',     diff: 'moyen',    xp: 25,  icon: '🏠', freq: 'quotidien', validation: true,  type: 'mission' },
  { id: 'm_dishes',  title: 'Aider la vaisselle',    desc: 'Mettre ou sortir la vaisselle',           cat: 'Maison',     diff: 'facile',   xp: 20,  icon: '🍽️', freq: 'quotidien', validation: false, type: 'mission' },
  { id: 'm_read',    title: 'Lire 20 minutes',       desc: 'Un livre de ton choix',                   cat: 'Lecture',    diff: 'facile',   xp: 20,  icon: '📖', freq: 'quotidien', validation: false, type: 'mission' },
  { id: 'm_sport',   title: 'Faire du sport',        desc: '30 minutes d\'activité physique',         cat: 'Quotidien',  diff: 'moyen',    xp: 35,  icon: '🏃', freq: 'quotidien', validation: false, type: 'mission' },
  { id: 'm_garden',  title: 'Arroser les plantes',   desc: 'Prendre soin du jardin',                  cat: 'Nature',     diff: 'facile',   xp: 15,  icon: '🌱', freq: 'quotidien', validation: false, type: 'mission' },
  { id: 'm_art',     title: 'Créer quelque chose',   desc: 'Dessiner, peindre ou bricoler',           cat: 'Créativité', diff: 'moyen',    xp: 30,  icon: '🎨', freq: 'hebdo',     validation: false, type: 'mission' },
  // Quêtes
  { id: 'q_screen',  title: 'Journée sans écran',    desc: 'Pas de téléphone de la journée !',        cat: 'Spécial',    diff: 'difficile',xp: 100, icon: '📵', freq: 'hebdo',     validation: true,  type: 'quete',  secret: false },
  { id: 'q_helper',  title: 'Aide spontanée',        desc: 'Aider quelqu\'un sans qu\'on te le demande', cat:'Spécial', diff: 'epique',  xp: 75,  icon: '🤝', freq: 'unique',    validation: true,  type: 'quete',  secret: true  },
  { id: 'q_week',    title: 'Semaine parfaite',      desc: 'Toutes les missions du jour pendant 7 jours', cat:'Spécial', diff:'epique',  xp: 150, icon: '🌟', freq: 'unique',    validation: false, type: 'quete',  secret: true  },
  { id: 'q_reader',  title: 'Défi lecture',          desc: 'Lire pendant 7 jours d\'affilée',         cat: 'Lecture',    diff: 'difficile',xp: 80,  icon: '📚', freq: 'unique',    validation: false, type: 'quete',  secret: false },
  // Van
  { id: 'van_stars', title: 'Observer les étoiles',  desc: 'Trouver 3 constellations',                cat: 'Van',        diff: 'facile',   xp: 30,  icon: '🔭', freq: 'unique',    validation: false, type: 'van' },
  { id: 'van_beach', title: 'Découvrir une plage',   desc: 'Explorer une nouvelle plage',             cat: 'Van',        diff: 'facile',   xp: 25,  icon: '🏖️', freq: 'unique',    validation: false, type: 'van' },
  { id: 'van_hike',  title: 'Randonnée en famille',  desc: 'Au moins 5 km parcourus',                 cat: 'Van',        diff: 'moyen',    xp: 50,  icon: '🥾', freq: 'unique',    validation: false, type: 'van' },
  { id: 'van_eco',   title: 'Ramasser des déchets',  desc: 'Protéger la nature en voyage',            cat: 'Van',        diff: 'moyen',    xp: 45,  icon: '♻️', freq: 'unique',    validation: false, type: 'van' },
  { id: 'van_camp',  title: 'Aider au campement',    desc: 'Installer ou ranger le campement',        cat: 'Van',        diff: 'facile',   xp: 30,  icon: '⛺', freq: 'unique',    validation: false, type: 'van' },
  { id: 'van_city',  title: 'Découvrir une ville',   desc: 'Explorer un endroit jamais visité',       cat: 'Van',        diff: 'facile',   xp: 30,  icon: '🏙️', freq: 'unique',    validation: false, type: 'van' },
];

const DEFAULT_REWARDS = [
  { id: 'r_movie',   icon: '🎬', title: 'Choisir le film',     desc: 'Tu choisis le film du soir !',  cost: 80  },
  { id: 'r_dessert', icon: '🍰', title: 'Dessert préféré',      desc: 'Le dessert de ton choix',       cost: 50  },
  { id: 'r_outing',  icon: '🎡', title: 'Sortie spéciale',      desc: 'Une sortie de ton choix',       cost: 300 },
  { id: 'r_screen',  icon: '📱', title: '+1h d\'écran',         desc: 'Une heure de plus d\'écran',    cost: 100 },
  { id: 'r_sushi',   icon: '🍣', title: 'Soirée sushi',         desc: 'Resto sushi en famille',        cost: 250 },
  { id: 'r_book',    icon: '📚', title: 'Nouveau livre',        desc: 'Le livre de ton choix',         cost: 120 },
  { id: 'r_friend',  icon: '👯', title: 'Inviter une amie',     desc: 'Une amie à dormir',             cost: 200 },
];

const LEVELS = [
  // ── Tier 1 : Débutante (1-5) ──────────────────────────────
  { level:  1, name: 'Exploratrice',        min: 0,     max: 100,   emoji: '🌱' },
  { level:  2, name: 'Aventurière',         min: 100,   max: 250,   emoji: '🧭' },
  { level:  3, name: 'Randonneuse',         min: 250,   max: 450,   emoji: '🥾' },
  { level:  4, name: 'Voyageuse',           min: 450,   max: 700,   emoji: '🎒' },
  { level:  5, name: 'Gardienne',           min: 700,   max: 1000,  emoji: '🛡️' },
  // ── Tier 2 : Confirmée (6-10) ─────────────────────────────
  { level:  6, name: 'Chasseuse de quêtes', min: 1000,  max: 1400,  emoji: '🗺️' },
  { level:  7, name: 'Exploratrice Van',    min: 1400,  max: 1900,  emoji: '🚐' },
  { level:  8, name: 'Protectrice nature',  min: 1900,  max: 2500,  emoji: '🌿' },
  { level:  9, name: 'Aventurière stellaire',min:2500,  max: 3200,  emoji: '🌟' },
  { level: 10, name: 'Maître des quêtes',   min: 3200,  max: 4000,  emoji: '⚔️' },
  // ── Tier 3 : Experte (11-15) ──────────────────────────────
  { level: 11, name: 'Gardienne des étoiles',min:4000,  max: 4950,  emoji: '🔭' },
  { level: 12, name: 'Exploratrice légendaire',min:4950,max: 6050,  emoji: '🏕️' },
  { level: 13, name: 'Chercheuse de trésors',min:6050, max: 7300,  emoji: '💎' },
  { level: 14, name: 'Navigatrice des mers', min: 7300, max: 8700,  emoji: '⚓' },
  { level: 15, name: 'Conquérante',          min: 8700, max: 10250, emoji: '🏆' },
  // ── Tier 4 : Élite (16-20) ────────────────────────────────
  { level: 16, name: 'Gardienne de la forêt',min:10250,max: 11950, emoji: '🌳' },
  { level: 17, name: 'Pilote de van',        min:11950, max: 13800, emoji: '🛞' },
  { level: 18, name: 'Astronaute junior',    min:13800, max: 15800, emoji: '🚀' },
  { level: 19, name: 'Exploratrice galactique',min:15800,max:17950, emoji: '🌌' },
  { level: 20, name: 'Héroïne Familiale',    min:17950, max: 20250, emoji: '👑' },
  // ── Tier 5 : Légendaire (21-25) ───────────────────────────
  { level: 21, name: 'Légende de la nature', min:20250, max: 22750, emoji: '🦋' },
  { level: 22, name: 'Maîtresse du temps',   min:22750, max: 25450, emoji: '⏳' },
  { level: 23, name: 'Protectrice du monde', min:25450, max: 28350, emoji: '🌍' },
  { level: 24, name: 'Reine de l aventure',  min:28350, max: 31450, emoji: '👸' },
  { level: 25, name: 'Étoile filante',       min:31450, max: 34750, emoji: '💫' },
  // ── Tier 6 : Mythique (26-30) ─────────────────────────────
  { level: 26, name: 'Gardienne de l univers',min:34750,max: 38250, emoji: '🌠' },
  { level: 27, name: 'Phénix aventurier',    min:38250, max: 41950, emoji: '🔥' },
  { level: 28, name: 'Lumière du monde',     min:41950, max: 45850, emoji: '✨' },
  { level: 29, name: 'Légende éternelle',    min:45850, max: 49950, emoji: '🌈' },
  { level: 30, name: 'Chloé la Magnifique',  min:49950, max: 999999,emoji: '👸🌟' },
];

const CONGRATS = [
  'Bravo Chloé ! 🎉', 'Mission accomplie ! ⭐', 'Tu es une vraie aventurière ! 🗺️',
  'Incroyable ! Continue comme ça ! 🔥', 'Quelle championne ! 🏆', 'Tu assures ! 💪',
  'Super boulot ! ✨', 'L\'aventure continue ! 🚐', 'Waouh ! Impressionnant ! 🌟',
];

/* ══════════════════════════════════════════════════════════════
   ÉTAT GLOBAL
══════════════════════════════════════════════════════════════ */
const STATE = {
  user: { id: 'chloe', name: 'Chloé', xp: 0, totalXp: 0, streak: 0, lastActiveDate: null, level: 1, missionsDone: 0, quetesDone: 0 },
  missions: [],
  badges: DEFAULT_BADGES.map(b => ({ ...b, unlocked: false, unlockedAt: null })),
  rewards: DEFAULT_REWARDS,
  history: [],
  completions: {},
  parentsAuth: false,
  pin: '1234',
  currentTab: 'home',
  pendingValidations: [],
  theme: 'light',
  notifTime: '09:00',
  syncInterval: null,
};

/* ══════════════════════════════════════════════════════════════
   UTILITAIRES
══════════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const today = () => new Date().toISOString().slice(0, 10);
const formatDate = iso => new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

function getLevelInfo(xp) { return LEVELS.find(l => xp >= l.min && xp < l.max) ?? LEVELS[LEVELS.length - 1]; }
function getXpProgress(xp) {
  const lvl = getLevelInfo(xp);
  return { progress: Math.min(((xp - lvl.min) / (lvl.max - lvl.min)) * 100, 100), current: xp - lvl.min, needed: lvl.max - lvl.min, lvl };
}

/* Toast */
let toastContainer;
function showToast(msg, type = 'info', duration = 3000) {
  if (!toastContainer) { toastContainer = document.createElement('div'); toastContainer.className = 'toast-container'; document.body.appendChild(toastContainer); }
  const t = document.createElement('div'); t.className = `toast ${type}`; t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, duration);
}

/* ══════════════════════════════════════════════════════════════
   PERSISTANCE
══════════════════════════════════════════════════════════════ */
const STORE_KEY = 'chloe_aventure_v5';

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      user: STATE.user, missions: STATE.missions, badges: STATE.badges,
      rewards: STATE.rewards, history: STATE.history, completions: STATE.completions,
      pin: STATE.pin, pendingValidations: STATE.pendingValidations,
      theme: STATE.theme, notifTime: STATE.notifTime,
    }));
  } catch(e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (s.user) Object.assign(STATE.user, s.user);
    if (s.missions?.length) STATE.missions = s.missions;
    if (s.badges?.length) STATE.badges = s.badges;
    if (s.rewards?.length) STATE.rewards = s.rewards;
    if (s.history) STATE.history = s.history;
    if (s.completions) STATE.completions = s.completions;
    if (s.pin) STATE.pin = s.pin;
    if (s.pendingValidations) STATE.pendingValidations = s.pendingValidations;
    if (s.theme) STATE.theme = s.theme;
    if (s.notifTime) STATE.notifTime = s.notifTime;
  } catch(e) {}
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
function initApp() {
  loadState();
  applyTheme();
  if (!STATE.missions.length) STATE.missions = DEFAULT_MISSIONS.map(m => ({ ...m }));
  checkDailyReset();
  updateStreak();
  renderAll();
  bindEvents();
  initPWA();
  startAutoSync();
  updateNotifStatus();

  setTimeout(() => {
    const splash = $('#splash-screen');
    splash.classList.add('fade-out');
    setTimeout(() => { splash.classList.add('hidden'); $('#app').classList.remove('hidden'); }, 600);
  }, 2000);
}

function checkDailyReset() {
  const t = today();
  if (localStorage.getItem('chloe_last_reset') === t) return;
  localStorage.setItem('chloe_last_reset', t);
  Object.keys(STATE.completions).forEach(id => {
    const m = STATE.missions.find(m => m.id === id);
    if (m?.freq === 'quotidien') delete STATE.completions[id];
  });
  const now = new Date();
  if (now.getDay() === 1) {
    Object.keys(STATE.completions).forEach(id => {
      const m = STATE.missions.find(m => m.id === id);
      if (m?.freq === 'hebdo') delete STATE.completions[id];
    });
  }
  saveState();
}

function updateStreak() {
  const t = today(), last = STATE.user.lastActiveDate;
  if (!last) return;
  const diff = Math.floor((new Date(t) - new Date(last)) / 86400000);
  if (diff > 1) { STATE.user.streak = 0; saveState(); }
}

/* ══════════════════════════════════════════════════════════════
   RENDU
══════════════════════════════════════════════════════════════ */
function renderAll() {
  renderHero();
  renderHomePage();
  renderMissionsPage();
  renderQuetesPage();
  renderBadgesPage();
  renderRewardsPage();
  renderVanPage();
  renderAdminMissions();
  renderAdminQuetes();
  renderAdminRewards();
  renderAdminValidations();
  renderAdminHistory();
}

function renderHero() {
  const u = STATE.user, info = getXpProgress(u.xp), lvl = info.lvl;
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
  $('#header-xp-value').textContent = u.xp;
}

function renderHomePage() {
  // Missions du jour
  const todayMissions = STATE.missions.filter(m => m.type === 'mission' && (m.freq === 'quotidien' || m.freq === 'unique') && STATE.completions[m.id]?.status !== 'done').slice(0, 3);
  const $ml = $('#home-missions-list');
  $ml.innerHTML = todayMissions.length ? todayMissions.map(missionCardHTML).join('') : `<div class="empty-state"><span class="empty-state-icon">🎉</span>Toutes les missions du jour sont faites !</div>`;
  bindMissionCards($ml);

  // Quêtes actives
  const activeQuetes = STATE.missions.filter(m => m.type === 'quete' && !m.secret && STATE.completions[m.id]?.status !== 'done').slice(0, 2);
  const $ql = $('#home-quetes-list');
  $ql.innerHTML = activeQuetes.length ? activeQuetes.map(missionCardHTML).join('') : `<div class="empty-state"><span class="empty-state-icon">🗺️</span>Aucune quête active pour le moment.</div>`;
  bindMissionCards($ql);

  // Badges
  const recent = STATE.badges.filter(b => b.unlocked).slice(-4);
  $('#home-badges-list').innerHTML = recent.length ? recent.map(badgeMiniHTML).join('') : `<div class="empty-state" style="padding:16px">Accomplis des missions pour gagner des badges !</div>`;

  // Récompenses
  $('#home-rewards-list').innerHTML = STATE.rewards.slice(0, 3).map(rewardMiniHTML).join('');
}

function renderMissionsPage(filter = 'all') {
  const missions = STATE.missions.filter(m => m.type === 'mission');
  const filtered = filter === 'all' ? missions : missions.filter(m => m.cat === filter);
  const $list = $('#missions-list');
  $list.innerHTML = filtered.length ? filtered.map(missionCardHTML).join('') : `<div class="empty-state"><span class="empty-state-icon">🎯</span>Aucune mission ici.</div>`;
  bindMissionCards($list);
}

function renderQuetesPage() {
  const quetes = STATE.missions.filter(m => m.type === 'quete');
  const active = quetes.filter(m => !m.secret && STATE.completions[m.id]?.status !== 'done');
  const secret = quetes.filter(m => m.secret && STATE.completions[m.id]?.status !== 'done');
  const done = quetes.filter(m => STATE.completions[m.id]?.status === 'done');

  $('#quetes-active-list').innerHTML = active.length ? active.map(missionCardHTML).join('') : `<div class="empty-state">Aucune quête active.</div>`;
  bindMissionCards($('#quetes-active-list'));

  $('#quetes-secret-list').innerHTML = secret.length ? secret.map(m => missionCardHTML(m, true)).join('') : `<div class="empty-state">Aucune quête secrète… pour l'instant 🔒</div>`;
  bindMissionCards($('#quetes-secret-list'));

  $('#quetes-done-list').innerHTML = done.length ? done.map(missionCardHTML).join('') : `<div class="empty-state">Pas encore de quête accomplie.</div>`;
  bindMissionCards($('#quetes-done-list'));
}

function renderBadgesPage() {
  const unlocked = STATE.badges.filter(b => b.unlocked).length;
  $('#badges-progress-fill').style.width = (STATE.badges.length ? (unlocked / STATE.badges.length * 100) : 0) + '%';
  $('#badges-progress-label').textContent = `${unlocked} / ${STATE.badges.length} débloqués`;
  $('#badges-grid').innerHTML = STATE.badges.map(b => `
    <div class="badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.unlocked ? ('✅ ' + (b.unlockedAt ? formatDate(b.unlockedAt) : 'Débloqué')) : b.desc}</div>
    </div>`).join('');
}

function renderRewardsPage() {
  $('#balance-xp').textContent = `${STATE.user.xp} XP`;
  $('#rewards-list').innerHTML = STATE.rewards.map(rewardCardHTML).join('');
  bindRewardCards($('#rewards-list'));
}

function renderVanPage() {
  const vanMissions = STATE.missions.filter(m => m.type === 'van' || m.cat === 'Van');
  $('#van-missions-list').innerHTML = vanMissions.length ? vanMissions.map(missionCardHTML).join('') : `<div class="empty-state"><span class="empty-state-icon">🚐</span>Aucune mission Van.</div>`;
  bindMissionCards($('#van-missions-list'));
  const vanBadges = STATE.badges.filter(b => b.cat === 'van');
  $('#van-badges-list').innerHTML = vanBadges.map(badgeMiniHTML).join('');
}

function renderAdminMissions() {
  const missions = STATE.missions.filter(m => m.type === 'mission');
  $('#admin-missions-list').innerHTML = missions.length ? missions.map(adminItemHTML).join('') : `<div class="empty-state">Aucune mission.</div>`;
}

function renderAdminQuetes() {
  const quetes = STATE.missions.filter(m => m.type === 'quete' || m.type === 'van');
  $('#admin-quetes-list').innerHTML = quetes.length ? quetes.map(adminItemHTML).join('') : `<div class="empty-state">Aucune quête.</div>`;
}

function renderAdminValidations() {
  const $list = $('#admin-validations-list');
  $list.innerHTML = STATE.pendingValidations.length ? STATE.pendingValidations.map(v => `
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
    </div>`).join('') : `<div class="empty-state">Aucune mission en attente. 🎉</div>`;
}

function renderAdminRewards() {
  $('#admin-rewards-list').innerHTML = STATE.rewards.map(r => `
    <div class="admin-item">
      <span style="font-size:1.4rem">${r.icon}</span>
      <div class="admin-item-info">
        <div class="admin-item-title">${r.title}</div>
        <div class="admin-item-meta">${r.cost} XP · ${r.desc ?? ''}</div>
      </div>
      <div class="admin-item-btns">
        <button class="btn-icon" onclick="openEditReward('${r.id}')">✏️</button>
        <button class="btn-danger" onclick="deleteReward('${r.id}')">🗑️</button>
      </div>
    </div>`).join('');
}

function renderAdminHistory() {
  const $list = $('#admin-history-list');
  if (!STATE.history.length) { $list.innerHTML = `<div class="empty-state">Aucun historique.</div>`; return; }
  $list.innerHTML = STATE.history.slice().reverse().map(h => `
    <div class="history-item">
      <span class="history-icon">${h.icon ?? '📌'}</span>
      <div class="history-body"><div class="history-title">${h.title}</div><div class="history-date">${h.date ? formatDate(h.date) : ''}</div></div>
      <div class="history-xp">${h.xp > 0 ? '+' : ''}${h.xp ?? 0} XP</div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════════════════════
   HTML BUILDERS
══════════════════════════════════════════════════════════════ */
function missionCardHTML(m, forceSecret = false) {
  const comp = STATE.completions[m.id];
  const isDone = comp?.status === 'done', isPending = comp?.status === 'pending';
  const isSecret = m.secret && forceSecret && !isDone;
  const isQuete = m.type === 'quete';
  const statusClass = isDone ? 'done' : isPending ? 'pending' : isQuete ? 'quete-card' : '';
  const secretClass = isSecret ? 'secret-card' : '';

  return `<div class="mission-card ${statusClass} ${secretClass}" data-id="${m.id}">
    <div class="mission-icon-wrap">
      <span>${isSecret ? '🔒' : (m.icon ?? '🎯')}</span>
      <span class="diff-dot diff-${m.diff ?? 'facile'}"></span>
    </div>
    <div class="mission-body">
      <div class="mission-title">${isSecret ? '??? Quête secrète' : m.title}</div>
      <div class="mission-desc">${isSecret ? 'Accomplis des missions pour la découvrir !' : (m.desc ?? '')}</div>
      <div class="mission-meta">
        ${!isSecret ? `<span class="mission-tag ${isQuete ? 'quete-tag' : ''}">${isQuete ? '🗺️ Quête' : m.cat}</span>` : ''}
        <span class="mission-xp">+${m.xp} XP</span>
      </div>
    </div>
    <div class="mission-action">
      <button class="complete-btn ${isDone ? 'done-btn' : isPending ? 'pending-btn' : ''}" data-id="${m.id}" ${isDone || isPending || isSecret ? 'disabled' : ''}>
        ${isDone ? '✓' : isPending ? '⏳' : '○'}
      </button>
    </div>
  </div>`;
}

function adminItemHTML(m) {
  const typeLabel = m.type === 'quete' ? '🗺️ Quête' : m.type === 'van' ? '🚐 Van' : '🎯 Mission';
  return `<div class="admin-item">
    <span style="font-size:1.3rem">${m.icon ?? '🎯'}</span>
    <div class="admin-item-info">
      <div class="admin-item-title">${m.title}</div>
      <div class="admin-item-meta">${typeLabel} · ${m.xp} XP · ${m.freq}${m.secret ? ' · 🔒 Secrète' : ''}</div>
    </div>
    <div class="admin-item-btns">
      <button class="btn-icon" onclick="openEditMission('${m.id}')">✏️</button>
      <button class="btn-danger" onclick="deleteMission('${m.id}')">🗑️</button>
    </div>
  </div>`;
}

function badgeMiniHTML(b) {
  return `<div class="badge-card-mini ${b.unlocked ? 'unlocked' : 'locked'}">
    <span class="badge-icon">${b.icon}</span>
    <div class="badge-name">${b.name}</div>
  </div>`;
}

function rewardCardHTML(r) {
  const can = STATE.user.xp >= r.cost;
  return `<div class="reward-card">
    <div class="reward-icon-wrap">${r.icon ?? '🎁'}</div>
    <div class="reward-body">
      <div class="reward-title">${r.title}</div>
      <div class="reward-desc">${r.desc ?? ''}</div>
      <div class="reward-cost">⚡ ${r.cost} XP</div>
    </div>
    <button class="reward-buy-btn" data-id="${r.id}" ${can ? '' : 'disabled'}>${can ? 'Obtenir' : `Il manque ${r.cost - STATE.user.xp} XP`}</button>
  </div>`;
}

function rewardMiniHTML(r) {
  return `<div class="reward-card-mini">
    <div class="reward-icon-wrap">${r.icon ?? '🎁'}</div>
    <div class="reward-title">${r.title}</div>
    <div class="reward-cost">⚡ ${r.cost}</div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════
   ÉVÉNEMENTS
══════════════════════════════════════════════════════════════ */
function bindEvents() {
  // Navigation
  $$('.nav-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.tab)));
  $$('.see-all-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.tab)));

  // Filtres missions
  $$('#missions-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#missions-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMissionsPage(btn.dataset.filter);
    });
  });

  // Thème
  $('#theme-toggle')?.addEventListener('click', toggleTheme);

  // Notifications
  $('#notif-btn')?.addEventListener('click', () => requestNotifPermission());

  // Parents
  $('#open-pin-btn')?.addEventListener('click', openPinModal);
  $('#pin-cancel')?.addEventListener('click', closePinModal);
  $('#parents-logout')?.addEventListener('click', logoutParents);
  $$('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.digit !== undefined) handlePinDigit(btn.dataset.digit);
      else if (btn.dataset.action === 'back') handlePinBack();
      else if (btn.dataset.action === 'clear') resetPin();
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

  // Backdrop
  $$('.modal-backdrop').forEach(bd => bd.addEventListener('click', closeAllModals));

  // Modals
  $('#success-close')?.addEventListener('click', () => $('#success-modal').classList.add('hidden'));
  $('#badge-modal-close')?.addEventListener('click', () => $('#badge-modal').classList.add('hidden'));
  $('#confirm-cancel')?.addEventListener('click', () => $('#confirm-modal').classList.add('hidden'));
  $('#confirm-ok')?.addEventListener('click', () => { $('#confirm-modal').classList.add('hidden'); confirmCallback?.(); confirmCallback = null; });

  // Formulaires
  $('#add-mission-btn')?.addEventListener('click', () => openMissionForm(null, 'mission'));
  $('#add-quete-btn')?.addEventListener('click', () => openMissionForm(null, 'quete'));
  $('#mission-form-cancel')?.addEventListener('click', () => $('#mission-form-modal').classList.add('hidden'));
  $('#mission-form')?.addEventListener('submit', handleMissionFormSubmit);

  $('#add-reward-btn')?.addEventListener('click', () => openRewardForm());
  $('#reward-form-cancel')?.addEventListener('click', () => $('#reward-form-modal').classList.add('hidden'));
  $('#reward-form')?.addEventListener('submit', handleRewardFormSubmit);

  // Paramètres
  $('#save-pin-btn')?.addEventListener('click', saveNewPin);
  $('#give-bonus-btn')?.addEventListener('click', giveBonus);
  $('#save-api-btn')?.addEventListener('click', saveApiUrl);
  $('#sync-btn')?.addEventListener('click', async () => { showToast('Synchronisation…', 'info'); await syncWithServer(); });
  $('#push-btn')?.addEventListener('click', pushToServer);
  $('#enable-notif-btn')?.addEventListener('click', requestNotifPermission);
  $('#save-notif-btn')?.addEventListener('click', saveNotifTime);

  // Init champs
  $('#api-url-input').value = API.getApiUrl();
  $('#notif-time-input').value = STATE.notifTime;

  // Emoji inputs — ouvre clavier emoji sur iOS
  $$('.emoji-input').forEach(input => {
    input.addEventListener('focus', () => { input.select(); });
  });
}

function bindMissionCards(ctx) {
  $$('.complete-btn', ctx).forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); completeMission(btn.dataset.id); });
  });
}
function bindRewardCards(ctx) {
  $$('.reward-buy-btn', ctx).forEach(btn => btn.addEventListener('click', () => buyReward(btn.dataset.id)));
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════ */
function navigateTo(tab) {
  STATE.currentTab = tab;
  $$('.page').forEach(p => p.classList.remove('active'));
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  const pageMap = { home: 'home', missions: 'missions', quetes: 'quetes', badges: 'badges', rewards: 'rewards', van: 'van', parents: 'parents' };
  $(`#page-${pageMap[tab] ?? tab}`)?.classList.add('active');
  $(`.nav-btn[data-tab="${tab}"]`)?.classList.add('active');
  if (tab === 'parents') { STATE.parentsAuth ? showParentsContent() : showParentsLocked(); }
}

/* ══════════════════════════════════════════════════════════════
   MISSIONS & QUÊTES
══════════════════════════════════════════════════════════════ */
function completeMission(id) {
  const mission = STATE.missions.find(m => m.id === id);
  if (!mission || STATE.completions[id]) return;

  if (mission.validation) {
    STATE.completions[id] = { status: 'pending', date: today() };
    STATE.pendingValidations.push({ id: uid(), missionId: id, missionTitle: mission.title, desc: mission.desc, xp: mission.xp, date: new Date().toISOString() });
    showToast('En attente de validation parentale ⏳', 'info');
    saveState(); renderAll();
    API.submitMissionCompletion(id, STATE.user.id).catch(() => {});
  } else {
    awardMission(id, mission);
  }
}

function awardMission(id, mission) {
  STATE.completions[id] = { status: 'done', date: today() };
  addXp(mission.xp, mission.title, mission.icon ?? '⭐');

  const t = today();
  if (STATE.user.lastActiveDate !== t) {
    const diff = STATE.user.lastActiveDate ? Math.floor((new Date(t) - new Date(STATE.user.lastActiveDate)) / 86400000) : 0;
    STATE.user.streak = diff === 1 ? STATE.user.streak + 1 : 1;
    STATE.user.lastActiveDate = t;
  }

  if (mission.type === 'quete') STATE.user.quetesDone++;
  else STATE.user.missionsDone++;

  // Verifie changement de niveau
  var prevLevel = STATE.user.level;
  var newLevelInfo = getLevelInfo(STATE.user.xp);
  if (newLevelInfo.level > prevLevel) {
    STATE.user.level = newLevelInfo.level;
    setTimeout(function() { showLevelUpModal(newLevelInfo); }, 1800);
  }

  checkBadges();
  saveState(); renderAll();
  showSuccessModal(mission);

  // Notification
  sendLocalNotif('Mission accomplie ! ⭐', mission.title + ' validée ! +' + mission.xp + ' XP');

  // Pousse les XP et la progression vers Sheets immédiatement
  API.addPoints(STATE.user.id, mission.xp, 'Mission : ' + mission.title).catch(() => {});
}

function addXp(amount, title, icon = '⭐') {
  STATE.user.xp += amount;
  STATE.user.totalXp += amount;
  STATE.history.push({ id: uid(), title, icon, xp: amount, date: new Date().toISOString() });
  if (STATE.history.length > 200) STATE.history.shift();
  $('#header-xp-value').textContent = STATE.user.xp;
}

window.validateMission = function(validationId, approved) {
  const idx = STATE.pendingValidations.findIndex(v => v.id === validationId);
  if (idx === -1) return;
  const v = STATE.pendingValidations.splice(idx, 1)[0];

  if (approved) {
    const mission = STATE.missions.find(m => m.id === v.missionId);
    if (mission) awardMission(v.missionId, mission);
    showToast(`"${v.missionTitle}" validée ! ✅`, 'success');
    sendLocalNotif('Mission validée ! ✅', `"${v.missionTitle}" a été validée par tes parents !`);
  } else {
    delete STATE.completions[v.missionId];
    showToast(`"${v.missionTitle}" refusée.`, 'error');
  }

  saveState(); renderAdminValidations();
  API.validateMission(validationId, approved).catch(() => {});
};

/* ══════════════════════════════════════════════════════════════
   BADGES
══════════════════════════════════════════════════════════════ */
function checkBadges() {
  const u = STATE.user;
  const doneMissions = STATE.missions.filter(m => STATE.completions[m.id]?.status === 'done');
  const vanDone = doneMissions.filter(m => m.type === 'van' || m.cat === 'Van').length;
  const levelInfo = getLevelInfo(u.xp);
  const newBadges = [];

  STATE.badges.forEach(b => {
    if (b.unlocked) return;
    const c = b.condition; let earned = false;
    switch (c.type) {
      case 'missions_total': earned = u.missionsDone >= c.value; break;
      case 'quetes_total':   earned = u.quetesDone >= c.value; break;
      case 'streak':         earned = u.streak >= c.value; break;
      case 'van_missions':   earned = vanDone >= c.value; break;
      case 'total_xp':       earned = u.totalXp >= c.value; break;
      case 'level':          earned = levelInfo.level >= c.value; break;
      case 'cat_missions':   earned = doneMissions.filter(m => m.cat === c.cat).length >= c.value; break;
      case 'mission_id':     earned = STATE.completions[c.value]?.status === 'done'; break;
    }
    if (earned) { b.unlocked = true; b.unlockedAt = new Date().toISOString(); newBadges.push(b); }
  });

  if (newBadges.length) {
    setTimeout(() => showBadgeModal(newBadges[0]), 1500);
    newBadges.forEach(b => STATE.history.push({ id: uid(), title: `Badge : ${b.name}`, icon: b.icon, xp: 0, date: b.unlockedAt }));
  }
}

/* ══════════════════════════════════════════════════════════════
   RÉCOMPENSES
══════════════════════════════════════════════════════════════ */
function buyReward(id) {
  const reward = STATE.rewards.find(r => r.id === id);
  if (!reward) return;
  if (STATE.user.xp < reward.cost) { showToast('Pas assez de XP !', 'error'); return; }
  showConfirmModal('🎁', `Obtenir "${reward.title}" ?`, `Coût : ${reward.cost} XP. Il te restera ${STATE.user.xp - reward.cost} XP.`, () => {
    STATE.user.xp -= reward.cost;
    STATE.history.push({ id: uid(), title: `Récompense : ${reward.title}`, icon: reward.icon, xp: -reward.cost, date: new Date().toISOString() });
    showToast(`"${reward.title}" demandée ! Les parents vont valider 🎉`, 'success', 4000);
    saveState(); renderAll();
    API.redeemReward(id, STATE.user.id).catch(() => {});
  });
}

/* ══════════════════════════════════════════════════════════════
   FORMULAIRES ADMIN
══════════════════════════════════════════════════════════════ */
let editingMissionId = null;

function openMissionForm(id = null, defaultType = 'mission') {
  editingMissionId = id;
  $('#mission-form').reset();
  if (id) {
    const m = STATE.missions.find(ms => ms.id === id);
    if (!m) return;
    $('#mission-form-title').textContent = 'Modifier';
    $('#mission-icon-input').value = m.icon ?? '🎯';
    $('#mission-title-input').value = m.title;
    $('#mission-desc-input').value = m.desc ?? '';
    $('#mission-type-input').value = m.type ?? 'mission';
    $('#mission-cat-input').value = m.cat;
    $('#mission-diff-input').value = m.diff ?? 'facile';
    $('#mission-points-input').value = m.xp;
    $('#mission-freq-input').value = m.freq ?? 'unique';
    $('#mission-due-input').value = m.due ?? '';
    $('#mission-validation-input').checked = m.validation ?? false;
    $('#mission-secret-input').checked = m.secret ?? false;
  } else {
    $('#mission-form-title').textContent = defaultType === 'quete' ? 'Nouvelle quête' : 'Nouvelle mission';
    $('#mission-type-input').value = defaultType;
    $('#mission-icon-input').value = defaultType === 'quete' ? '🗺️' : '🎯';
  }
  $('#mission-form-modal').classList.remove('hidden');
}
window.openEditMission = openMissionForm;

function handleMissionFormSubmit(e) {
  e.preventDefault();
  const mission = {
    id: editingMissionId ?? uid(),
    icon: $('#mission-icon-input').value.trim() || '🎯',
    title: $('#mission-title-input').value.trim(),
    desc: $('#mission-desc-input').value.trim(),
    type: $('#mission-type-input').value,
    cat: $('#mission-cat-input').value,
    diff: $('#mission-diff-input').value,
    xp: parseInt($('#mission-points-input').value) || 20,
    freq: $('#mission-freq-input').value,
    due: $('#mission-due-input').value || null,
    validation: $('#mission-validation-input').checked,
    secret: $('#mission-secret-input').checked,
  };

  if (editingMissionId) {
    const idx = STATE.missions.findIndex(m => m.id === editingMissionId);
    if (idx > -1) STATE.missions[idx] = mission;
    API.updateMission(editingMissionId, mission).catch(() => {});
  } else {
    STATE.missions.push(mission);
    API.createMission(mission).catch(() => {});
  }

  saveState(); renderAll();
  $('#mission-form-modal').classList.add('hidden');
  showToast(editingMissionId ? 'Modifié ✓' : (mission.type === 'quete' ? 'Quête créée ! 🗺️' : 'Mission créée ! 🎯'), 'success');
  editingMissionId = null;
}

window.deleteMission = function(id) {
  showConfirmModal('🗑️', 'Supprimer ?', 'Cette action est irréversible.', () => {
    STATE.missions = STATE.missions.filter(m => m.id !== id);
    delete STATE.completions[id];
    saveState(); renderAll();
    API.deleteMission(id).catch(() => {});
    showToast('Supprimé.', 'info');
  });
};

let editingRewardId = null;
function openRewardForm(id = null) {
  editingRewardId = id;
  $('#reward-form').reset();
  if (id) {
    const r = STATE.rewards.find(rw => rw.id === id);
    if (!r) return;
    $('#reward-form-title').textContent = 'Modifier la récompense';
    $('#reward-icon-input').value = r.icon ?? '🎁';
    $('#reward-title-input').value = r.title;
    $('#reward-desc-input').value = r.desc ?? '';
    $('#reward-cost-input').value = r.cost;
    $('#reward-available-input').checked = r.available ?? true;
  } else {
    $('#reward-form-title').textContent = 'Nouvelle récompense';
    $('#reward-icon-input').value = '🎁';
  }
  $('#reward-form-modal').classList.remove('hidden');
}
window.openEditReward = openRewardForm;

function handleRewardFormSubmit(e) {
  e.preventDefault();
  const reward = {
    id: editingRewardId ?? uid(),
    icon: $('#reward-icon-input').value.trim() || '🎁',
    title: $('#reward-title-input').value.trim(),
    desc: $('#reward-desc-input').value.trim(),
    cost: parseInt($('#reward-cost-input').value) || 100,
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
  saveState(); renderAll();
  $('#reward-form-modal').classList.add('hidden');
  showToast(editingRewardId ? 'Modifié ✓' : 'Récompense créée ! 🎁', 'success');
  editingRewardId = null;
}

window.deleteReward = function(id) {
  showConfirmModal('🗑️', 'Supprimer la récompense ?', 'Irréversible.', () => {
    STATE.rewards = STATE.rewards.filter(r => r.id !== id);
    saveState(); renderAll();
    API.deleteReward(id).catch(() => {});
    showToast('Supprimée.', 'info');
  });
};

/* ══════════════════════════════════════════════════════════════
   PARAMÈTRES
══════════════════════════════════════════════════════════════ */
function saveNewPin() {
  const p = $('#new-pin-input').value.trim();
  if (!/^\d{4}$/.test(p)) { showToast('PIN : 4 chiffres requis.', 'error'); return; }
  STATE.pin = p; saveState(); $('#new-pin-input').value = '';
  showToast('PIN mis à jour ✓', 'success');
}

function giveBonus() {
  const pts = parseInt($('#bonus-points-input').value) || 0;
  const reason = $('#bonus-reason-input').value.trim() || 'Bonus parental';
  if (pts <= 0) { showToast('Entrez un nombre valide.', 'error'); return; }
  addXp(pts, reason, '⭐'); checkBadges(); saveState(); renderAll();
  showToast(`+${pts} XP attribués ! 🌟`, 'success');
  API.addPoints(STATE.user.id, pts, reason).catch(() => {});
}

function saveApiUrl() {
  API.setApiUrl($('#api-url-input').value.trim());
  showToast('URL enregistrée ✓', 'success');
}

function saveNotifTime() {
  STATE.notifTime = $('#notif-time-input').value;
  saveState();
  scheduleNotif();
  showToast(`Rappel quotidien à ${STATE.notifTime} ✓`, 'success');
}

/* ══════════════════════════════════════════════════════════════
   AUTHENTIFICATION PARENTS
══════════════════════════════════════════════════════════════ */
let pinBuffer = '';

function openPinModal() { resetPin(); $('#pin-modal').classList.remove('hidden'); $('#pin-error').classList.add('hidden'); }
function closePinModal() { $('#pin-modal').classList.add('hidden'); resetPin(); }
function handlePinDigit(d) { if (pinBuffer.length >= 4) return; pinBuffer += d; updatePinDisplay(); if (pinBuffer.length === 4) setTimeout(verifyPin, 200); }
function handlePinBack() { pinBuffer = pinBuffer.slice(0, -1); updatePinDisplay(); }
function resetPin() { pinBuffer = ''; updatePinDisplay(); }
function updatePinDisplay() { $$('.pin-dot').forEach((dot, i) => dot.classList.toggle('filled', i < pinBuffer.length)); }

function verifyPin() {
  if (pinBuffer === STATE.pin) {
    closePinModal(); STATE.parentsAuth = true; showParentsContent();
    showToast('Bienvenue 👋', 'success');
  } else {
    $('#pin-error').classList.remove('hidden'); resetPin();
    setTimeout(() => $('#pin-error').classList.add('hidden'), 2000);
  }
}

function showParentsContent() {
  $('#parents-locked').classList.add('hidden');
  $('#parents-content').classList.remove('hidden');
  renderAdminMissions(); renderAdminQuetes(); renderAdminRewards(); renderAdminValidations(); renderAdminHistory();
}
function showParentsLocked() { $('#parents-locked').classList.remove('hidden'); $('#parents-content').classList.add('hidden'); }
function logoutParents() { STATE.parentsAuth = false; showParentsLocked(); showToast('Déconnecté.', 'info'); }

/* ══════════════════════════════════════════════════════════════
   THÈME
══════════════════════════════════════════════════════════════ */
function applyTheme() { document.body.className = `theme-${STATE.theme}`; $('#theme-toggle').textContent = STATE.theme === 'dark' ? '☀️' : '🌙'; }
function toggleTheme() { STATE.theme = STATE.theme === 'light' ? 'dark' : 'light'; applyTheme(); saveState(); }

/* ══════════════════════════════════════════════════════════════
   MODALS
══════════════════════════════════════════════════════════════ */
function closeAllModals() { $$('.modal').forEach(m => m.classList.add('hidden')); }

function showSuccessModal(mission) {
  $('#success-emoji').textContent = mission.icon ?? '⭐';
  $('#success-title').textContent = mission.type === 'quete' ? 'Quête accomplie ! 🗺️' : 'Mission accomplie !';
  $('#success-message').textContent = CONGRATS[Math.floor(Math.random() * CONGRATS.length)];
  $('#success-points').textContent = `+${mission.xp} XP`;
  $('#success-modal').classList.remove('hidden');
  launchConfetti('#confetti-container');
  if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
}

function showLevelUpModal(lvl) {
  var el = document.getElementById('badge-modal-icon');
  var nameEl = document.getElementById('badge-modal-name');
  var descEl = document.getElementById('badge-modal-desc');
  var modal = document.getElementById('badge-modal');
  if (!el || !modal) return;
  el.textContent = lvl.emoji;
  nameEl.textContent = 'Niveau ' + lvl.level + ' atteint !';
  nameEl.style.fontSize = '1.2rem';
  descEl.textContent = 'Tu es maintenant : ' + lvl.name;
  modal.classList.remove('hidden');
  launchConfetti('#badge-confetti');
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
  sendLocalNotif('Niveau ' + lvl.level + ' ! ' + lvl.emoji, 'Tu es maintenant ' + lvl.name + ' !');
}

function showBadgeModal(badge) {
  $('#badge-modal-icon').textContent = badge.icon;
  $('#badge-modal-name').textContent = badge.name;
  $('#badge-modal-desc').textContent = badge.desc;
  $('#badge-modal').classList.remove('hidden');
  launchConfetti('#badge-confetti');
  sendLocalNotif('Badge débloqué ! 🏆', `Tu as obtenu le badge "${badge.name}" !`);
}

let confirmCallback = null;
function showConfirmModal(icon, title, msg, onConfirm) {
  $('#confirm-icon').textContent = icon;
  $('#confirm-title').textContent = title;
  $('#confirm-message').textContent = msg;
  confirmCallback = onConfirm;
  $('#confirm-modal').classList.remove('hidden');
}

/* ══════════════════════════════════════════════════════════════
   CONFETTIS
══════════════════════════════════════════════════════════════ */
function launchConfetti(selector) {
  const container = $(selector);
  if (!container) return;
  container.innerHTML = '';
  const colors = ['#6C63FF','#F5A623','#2ECC71','#FF6B9D','#3A9AD9','#A855F7'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div'); p.className = 'confetti-piece';
    p.style.cssText = `left:${Math.random()*100}%;top:${-10-Math.random()*20}px;background:${colors[Math.floor(Math.random()*colors.length)]};width:${4+Math.random()*8}px;height:${4+Math.random()*8}px;border-radius:${Math.random()>.5?'50%':'2px'};animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*.4}s;`;
    container.appendChild(p);
  }
  setTimeout(() => { container.innerHTML = ''; }, 4000);
}

/* ══════════════════════════════════════════════════════════════
   NOTIFICATIONS LOCALES
══════════════════════════════════════════════════════════════ */
async function requestNotifPermission() {
  if (!('Notification' in window)) { showToast('Notifications non supportées sur ce navigateur.', 'error'); return; }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    showToast('Notifications activées ! 🔔', 'success');
    scheduleNotif();
  } else {
    showToast('Notifications refusées. Activez-les dans les réglages.', 'error');
  }
  updateNotifStatus();
}

function updateNotifStatus() {
  const el = $('#notif-status');
  if (!el) return;
  if (!('Notification' in window)) { el.textContent = 'Statut : non supporté'; return; }
  const labels = { granted: '✅ Activées', denied: '❌ Refusées (réglages iOS)', default: '⚪ Non activées' };
  el.textContent = `Statut : ${labels[Notification.permission] ?? 'Inconnu'}`;
}

function sendLocalNotif(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try { new Notification(title, { body, icon: 'icons/icon-192.png', badge: 'icons/icon-72.png' }); } catch(e) {}
}

function scheduleNotif() {
  // Utilise un service worker pour les notifications programmées
  if (!('serviceWorker' in navigator) || !STATE.notifTime) return;
  localStorage.setItem('chloe_notif_time', STATE.notifTime);
  // Le SW vérifie l'heure toutes les minutes via un periodic sync si disponible
  showToast(`Rappel programmé à ${STATE.notifTime} ✓`, 'info');
}

/* ══════════════════════════════════════════════════════════════
   SYNC AUTOMATIQUE
══════════════════════════════════════════════════════════════ */
function startAutoSync() {
  // Sync immédiate si API configurée
  if (API.getApiUrl()) syncWithServer();
  // Puis toutes les 2 minutes
  STATE.syncInterval = setInterval(() => {
    if (API.getApiUrl() && document.visibilityState !== 'hidden') syncWithServer();
  }, 2 * 60 * 1000);
}

function restoreDefaultMissions() {
  let added = 0;
  DEFAULT_MISSIONS.forEach(dm => {
    if (!STATE.missions.find(m => m.id === dm.id)) {
      STATE.missions.push(Object.assign({}, dm));
      added++;
    }
  });
  DEFAULT_REWARDS.forEach(dr => {
    if (!STATE.rewards.find(r => r.id === dr.id)) {
      STATE.rewards.push(Object.assign({}, dr));
      added++;
    }
  });
  saveState();
  renderAll();
  showToast(added > 0 ? (added + ' elements restaures !') : 'Tout etait deja la !', 'success');
}

async function pushToServer() {
  var el = document.querySelector('#sync-status');
  if (el) el.textContent = 'Envoi vers Google Sheets…';
  showToast('Envoi de toutes les donnees vers Sheets…', 'info');
  try {
    var result = await API.pushAllData({
      missions: STATE.missions,
      rewards: STATE.rewards,
      user: STATE.user,
      history: STATE.history,
    });
    if (result.ok) {
      var r = (result.data && result.data.results) ? result.data.results : {};
      var msg = 'Envoye ! ' + (r.missions || 0) + ' missions, ' + (r.rewards || 0) + ' recompenses';
      showToast(msg, 'success', 5000);
      if (el) el.textContent = 'Donnees envoyees avec succes !';
    } else {
      showToast('Erreur lors de l envoi.', 'error');
    }
  } catch(e) {
    showToast('Hors-ligne - impossible d envoyer.', 'error');
  }
}

async function syncWithServer() {
  const el = $('#sync-status');
  if (el) el.textContent = '🔄 Synchronisation…';
  try {
    const result = await API.syncAll(STATE.user.id);
    // Ne remplace les missions locales que si Sheets en a au moins autant
    if (result.missions?.ok && result.missions.data?.length > 0 && result.missions.data.length >= STATE.missions.length) {
      // Correction automatique du bug type/createdAt inversés
      STATE.missions = result.missions.data.map(m => {
        var type = m.type;
        var createdAt = m.createdAt;
        if (!type && (createdAt === 'mission' || createdAt === 'quete' || createdAt === 'van')) {
          type = createdAt;
          createdAt = new Date().toISOString();
        }
        if (!type) type = 'mission';
        return Object.assign({}, m, { type: type, createdAt: createdAt });
      });
    }
    if (result.rewards?.ok && result.rewards.data?.length > 0 && result.rewards.data.length >= STATE.rewards.length) STATE.rewards = result.rewards.data;
    if (result.userData?.ok && result.userData.data) {
      var remote = result.userData.data;
      // Prend toujours la valeur la plus haute (source de vérité = le max)
      // Cela permet la synchro entre plusieurs téléphones
      STATE.user.xp = Math.max(STATE.user.xp, Number(remote.xp) || 0);
      STATE.user.totalXp = Math.max(STATE.user.totalXp, Number(remote.totalXp) || 0);
      STATE.user.missionsDone = Math.max(STATE.user.missionsDone, Number(remote.missionsDone) || 0);
      STATE.user.quetesDone = Math.max(STATE.user.quetesDone || 0, Number(remote.quetesDone) || 0);
      STATE.user.streak = Math.max(STATE.user.streak, Number(remote.streak) || 0);
      STATE.user.level = Math.max(STATE.user.level, Number(remote.level) || 1);
      if (remote.lastActiveDate) STATE.user.lastActiveDate = remote.lastActiveDate;
    }
    if (result.badges?.ok && result.badges.data) {
      result.badges.data.forEach(sb => {
        const local = STATE.badges.find(b => b.id === sb.badgeId);
        if (local && sb.unlockedAt) { local.unlocked = true; local.unlockedAt = sb.unlockedAt; }
      });
    }
    saveState(); renderAll();
    if (el) el.textContent = `✅ Synchronisé à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  } catch(e) {
    if (el) el.textContent = '⚠️ Hors-ligne – données locales';
  }
}

/* ══════════════════════════════════════════════════════════════
   PWA
══════════════════════════════════════════════════════════════ */
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  }
}

/* ══════════════════════════════════════════════════════════════
   DÉMARRAGE
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', initApp);
