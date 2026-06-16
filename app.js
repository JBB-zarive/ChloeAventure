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

const DEFAULT_MISSIONS = []; // Missions gérées depuis Google Sheets

const DEFAULT_REWARDS = []; // Récompenses gérées depuis Google Sheets

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
  checkDailyReset();
  updateStreak();
  renderAll();
  bindEvents();
  initPWA();
  updateNotifStatus();

  // Si pas de missions en local, attend la sync avant de masquer le splash
  if (!STATE.missions.length && API.getApiUrl()) {
    // Sync d'abord, puis affiche l'app
    syncWithServer().finally(() => {
      hideSplash();
    });
    // Timeout de sécurité : affiche l'app après 5s même si sync échoue
    setTimeout(hideSplash, 5000);
  } else {
    // Données locales dispo, affiche normalement
    setTimeout(hideSplash, 2000);
    startAutoSync();
  }
}

function hideSplash() {
  const splash = $('#splash-screen');
  if (!splash || splash.classList.contains('hidden')) return;
  splash.classList.add('fade-out');
  setTimeout(() => {
    splash.classList.add('hidden');
    $('#app').classList.remove('hidden');
    startAutoSync();
  }, 600);
}

function checkDailyReset() {
  const t = today();
  if (localStorage.getItem('chloe_last_reset') === t) return;
  localStorage.setItem('chloe_last_reset', t);
  const todayStr = today();
  Object.keys(STATE.completions).forEach(id => {
    const m = STATE.missions.find(m => m.id === id);
    if (!m) return;
    // Reset quotidien
    if (m.freq === 'quotidien') delete STATE.completions[id];
    // Consigne 3 : désactiver si date limite dépassée
    if (m.due && new Date(m.due) < new Date(todayStr)) {
      m.expired = true;
    }
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
  // Consigne 9 : compteur basé sur catégorie 'Quotidien'
  const allDailyMissions = STATE.missions.filter(m => m.cat === 'Quotidien' && !m.secret);
  const dailyRemaining = allDailyMissions.filter(m => STATE.completions[m.id]?.status !== 'done');
  const dailyDone = allDailyMissions.length - dailyRemaining.length;
  const counterEl = $('#daily-counter');
  if (counterEl) {
    if (allDailyMissions.length > 0) {
      counterEl.textContent = dailyRemaining.length === 0 ? '🎉 Toutes les missions du jour sont faites !' : dailyRemaining.length + ' mission' + (dailyRemaining.length > 1 ? 's' : '') + ' quotidienne' + (dailyRemaining.length > 1 ? 's' : '') + ' restante' + (dailyRemaining.length > 1 ? 's' : '');
      counterEl.style.color = dailyRemaining.length === 0 ? 'var(--green)' : 'var(--text-secondary)';
    } else {
      counterEl.textContent = '';
    }
  }

  const todayMissions = STATE.missions.filter(m => m.type === 'mission' && (m.freq === 'quotidien' || m.freq === 'unique') && !m.secret && STATE.completions[m.id]?.status !== 'done').slice(0, 3);
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
  // Consigne 8 : missions secrètes invisibles
  const filtered = (filter === 'all' ? missions : missions.filter(m => m.cat === filter)).filter(m => !m.secret && !m.expired);
  const $list = $('#missions-list');
  $list.innerHTML = filtered.length ? filtered.map(missionCardHTML).join('') : `<div class="empty-state"><span class="empty-state-icon">🎯</span>Aucune mission ici.</div>`;
  bindMissionCards($list);
}

function renderQuetesPage() {
  const quetes = STATE.missions.filter(m => m.type === 'quete');
  // Consigne 8 : secrètes totalement invisibles
  const active = quetes.filter(m => !m.secret && STATE.completions[m.id]?.status !== 'done');
  const done = quetes.filter(m => !m.secret && STATE.completions[m.id]?.status === 'done');

  $('#quetes-active-list').innerHTML = active.length ? active.map(missionCardHTML).join('') : `<div class="empty-state">Aucune quête active pour le moment.</div>`;
  bindMissionCards($('#quetes-active-list'));

  // Consigne 5 : sections vides masquées
  const doneSect = $('#quetes-done-section');
  if (doneSect) doneSect.style.display = done.length ? 'block' : 'none';
  $('#quetes-done-list').innerHTML = done.length ? done.map(m => missionCardHTML(m, false, true)).join('') : '';
  bindMissionCards($('#quetes-done-list'));
}

function renderBadgesPage() {
  const unlocked = STATE.badges.filter(b => b.unlocked).length;
  $('#badges-progress-fill').style.width = (STATE.badges.length ? (unlocked / STATE.badges.length * 100) : 0) + '%';
  $('#badges-progress-label').textContent = unlocked + ' / ' + STATE.badges.length + ' débloqués';
  $('#badges-grid').innerHTML = STATE.badges.map(b => `
    <div class="badge-card ${b.unlocked ? 'unlocked' : 'locked'}">
      <span class="badge-icon">${b.icon}</span>
      <div class="badge-name">${b.name}</div>
      <div class="badge-desc">${b.unlocked ? ('✅ ' + (b.unlockedAt ? formatDate(b.unlockedAt) : 'Débloqué')) : b.desc}</div>
    </div>`).join('');

  // Consigne 11 : Trophées = quêtes accomplies
  const trophees = STATE.missions.filter(m =>
    (m.type === 'quete' || m.type === 'van') &&
    !m.secret &&
    STATE.completions[m.id]?.status === 'done'
  );
  const trophSection = $('#trophees-section');
  if (trophSection) {
    trophSection.style.display = trophees.length ? 'block' : 'none';
    $('#trophees-list').innerHTML = trophees.map(m => `
      <div class="history-item">
        <span class="history-icon">${m.icon ?? '🏅'}</span>
        <div class="history-body">
          <div class="history-title">${m.title}</div>
          <div class="history-date">${STATE.completions[m.id]?.date ? formatDate(STATE.completions[m.id].date) : ''}</div>
        </div>
        <div class="history-xp">+${m.xp} XP</div>
      </div>`).join('');
  }
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
function missionCardHTML(m, forceSecret = false, showReplay = false) {
  const comp = STATE.completions[m.id];
  const isDone = comp?.status === 'done', isPending = comp?.status === 'pending';
  const isQuete = m.type === 'quete';
  const statusClass = isDone ? 'done' : isPending ? 'pending' : isQuete ? 'quete-card' : '';

  // Consigne 2 : date limite formatée
  var dueLine = '';
  if (m.due) {
    var dueDate = new Date(m.due);
    var today = new Date(); today.setHours(0,0,0,0);
    var diffDays = Math.ceil((dueDate - today) / 86400000);
    var dueStr = diffDays < 0 ? 'Expirée' : diffDays === 0 ? 'Aujourd\'hui !' : diffDays === 1 ? 'Demain' : 'Jusqu\'au ' + dueDate.toLocaleDateString('fr-FR', {day:'numeric', month:'short'});
    var dueColor = diffDays <= 1 ? 'var(--red)' : diffDays <= 3 ? 'var(--amber)' : 'var(--text-muted)';
    dueLine = `<span class="mission-due" style="color:${dueColor}">📅 ${dueStr}</span>`;
  }

  // Consigne 6 : bouton revoir animation (uniquement sur missions accomplies)
  var replayBtn = (isDone && showReplay) ? `<button class="replay-btn" data-id="${m.id}" title="Revoir l'animation">🎉</button>` : '';

  return `<div class="mission-card ${statusClass}" data-id="${m.id}">
    <div class="mission-icon-wrap">
      <span>${m.icon ?? '🎯'}</span>
    </div>
    <div class="mission-body">
      <div class="mission-title">${m.title}</div>
      ${m.desc ? `<div class="mission-desc">${m.desc}</div>` : ''}
      <div class="mission-meta">
        <span class="mission-tag ${isQuete ? 'quete-tag' : ''}">${isQuete ? '🗺️ Quête' : m.cat}</span>
        ${m.freq === 'quotidien' ? '<span class="mission-tag">🔁 Quotidien</span>' : m.freq === 'hebdo' ? '<span class="mission-tag">📆 Hebdo</span>' : ''}
        <span class="mission-xp">+${m.xp} XP</span>
        ${dueLine}
      </div>
    </div>
    <div class="mission-action">
      ${replayBtn}
      <button class="complete-btn ${isDone ? 'done-btn' : isPending ? 'pending-btn' : ''}" data-id="${m.id}" ${isDone || isPending ? 'disabled' : ''}>
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
  // Consigne 6 : bouton revoir animation
  $$('.replay-btn', ctx).forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const m = STATE.missions.find(ms => ms.id === btn.dataset.id);
      if (m) replayAnimation(m);
    });
  });
}

// Consigne 6 : rejouer uniquement l'animation, sans recréditer les XP
function replayAnimation(mission) {
  $('#success-emoji').textContent = mission.icon ?? '⭐';
  $('#success-title').textContent = mission.type === 'quete' ? 'Quête accomplie ! 🗺️' : 'Mission accomplie !';
  $('#success-message').textContent = CONGRATS[Math.floor(Math.random() * CONGRATS.length)];
  $('#success-points').textContent = '+' + mission.xp + ' XP';
  $('#success-modal').classList.remove('hidden');
  launchConfetti('#confetti-container');
  if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
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
  // Consigne 7 : basé sur catégorie 'Quotidien' (pas freq)
  const dailyDoneToday = STATE.missions.filter(m =>
    m.cat === 'Quotidien' && !m.secret &&
    STATE.completions[m.id]?.status === 'done' &&
    STATE.completions[m.id]?.date === t
  ).length;

  // Streak si au moins 3 missions quotidiennes complétées
  if (dailyDoneToday >= 3 && STATE.user.lastActiveDate !== t) {
    const diff = STATE.user.lastActiveDate ? Math.floor((new Date(t) - new Date(STATE.user.lastActiveDate)) / 86400000) : 0;
    STATE.user.streak = diff === 1 ? STATE.user.streak + 1 : 1;
    STATE.user.lastActiveDate = t;
  } else if (STATE.user.lastActiveDate !== t && dailyDoneToday < 3) {
    // Pas encore 3 missions quotidiennes, on marque la date sans incrémenter
    // Le streak sera incrémenté quand la 3e mission sera faite
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
  // Consigne 10 : pas de validation parentale pour les récompenses
  showConfirmModal('🎁', 'Obtenir "' + reward.title + '" ?',
    'Coût : ' + reward.cost + ' XP. Il te restera ' + (STATE.user.xp - reward.cost) + ' XP.', () => {
    STATE.user.xp -= reward.cost;
    STATE.history.push({ id: uid(), title: 'Récompense : ' + reward.title, icon: reward.icon, xp: -reward.cost, date: new Date().toISOString() });
    showToast('Profite bien de "' + reward.title + '" ! 🎉', 'success', 4000);
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
  showToast('+' + pts + ' XP attribués ! 🌟', 'success');
  API.addPoints(STATE.user.id, pts, reason).catch(() => {});
}

// Consigne 4 : Déduire des points
function deductPoints() {
  const pts = parseInt($('#deduct-points-input').value) || 0;
  const reason = $('#deduct-reason-input').value.trim();
  if (pts <= 0) { showToast('Entrez un nombre valide.', 'error'); return; }
  if (!reason) { showToast('Le commentaire est obligatoire.', 'error'); return; }
  if (STATE.user.xp < pts) { showToast('Chloé n\'a pas assez de XP.', 'error'); return; }

  showConfirmModal('⚠️', 'Déduire ' + pts + ' XP ?', reason, () => {
    STATE.user.xp -= pts;
    STATE.user.totalXp = Math.max(0, STATE.user.totalXp - pts);
    STATE.history.push({ id: uid(), title: 'Malus : ' + reason, icon: '⚠️', xp: -pts, date: new Date().toISOString(), type: 'malus' });
    saveState(); renderAll();
    showToast('-' + pts + ' XP déduits.', 'error');
    $('#deduct-points-input').value = '';
    $('#deduct-reason-input').value = '';
    API.addPoints(STATE.user.id, -pts, 'Malus : ' + reason).catch(() => {});
  });
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
  // Les missions viennent maintenant uniquement de Google Sheets
  showToast('Synchronisation en cours...', 'info');
  syncWithServer().then(() => {
    showToast('Missions chargées depuis Sheets !', 'success');
  }).catch(() => {
    showToast('Erreur de connexion.', 'error');
  });
}

// Vider le cache service worker sans toucher aux données
async function clearAppCache() {
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      showToast('Cache vidé ! Rechargement...', 'success');
      setTimeout(() => window.location.reload(true), 1500);
    } else {
      showToast('Cache non supporté sur ce navigateur.', 'error');
    }
  } catch(e) {
    showToast('Erreur lors du vidage du cache.', 'error');
  }
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
