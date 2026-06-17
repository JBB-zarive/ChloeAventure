/**
 * app.js – Chloé Aventure v7
 * Architecture : Sheets = Source unique de vérité
 * Local = cache d'affichage uniquement
 */

/* ══════════════════════════════════════════════════════════════
   BADGES (définis localement car statiques)
══════════════════════════════════════════════════════════════ */
const ALL_BADGES = [
  { id: 'first_mission',  icon: '⭐', name: 'Premier pas',          desc: 'Terminer ta première mission',     condition: { type: 'missions_total', value: 1   } },
  { id: 'missions_10',    icon: '🏅', name: 'Aventurière',          desc: '10 missions accomplies',           condition: { type: 'missions_total', value: 10  } },
  { id: 'missions_50',    icon: '🥇', name: 'Héroïne',              desc: '50 missions accomplies',           condition: { type: 'missions_total', value: 50  } },
  { id: 'missions_100',   icon: '🎖️', name: 'Centurion',            desc: '100 missions accomplies',          condition: { type: 'missions_total', value: 100 } },
  { id: 'streak_3',       icon: '🔥', name: 'En feu !',             desc: '3 jours d\'affilée',               condition: { type: 'streak',         value: 3   } },
  { id: 'streak_7',       icon: '🌟', name: 'Semaine parfaite',     desc: '7 jours d\'affilée',               condition: { type: 'streak',         value: 7   } },
  { id: 'streak_14',      icon: '🔥', name: 'Deux semaines !',      desc: '14 jours d\'affilée',              condition: { type: 'streak',         value: 14  } },
  { id: 'streak_30',      icon: '💎', name: 'Mois légendaire',      desc: '30 jours d\'affilée',              condition: { type: 'streak',         value: 30  } },
  { id: 'streak_100',     icon: '👸', name: 'Centenaire de feu',    desc: '100 jours d\'affilée',             condition: { type: 'streak',         value: 100 } },
  { id: 'first_quete',    icon: '🗺️', name: 'Quêteuse',             desc: 'Première quête accomplie',         condition: { type: 'quetes_total',   value: 1   } },
  { id: 'quetes_5',       icon: '🧭', name: 'Exploratrice',         desc: '5 quêtes accomplies',              condition: { type: 'quetes_total',   value: 5   } },
  { id: 'van_first',      icon: '🚐', name: 'Vanlife Rookie',       desc: 'Première mission Van',             condition: { type: 'van_missions',   value: 1   } },
  { id: 'van_5',          icon: '🏕️', name: 'Exploratrice Van',    desc: '5 missions Van',                   condition: { type: 'van_missions',   value: 5   } },
  { id: 'xp_100',         icon: '💫', name: 'Première centaine',    desc: '100 XP gagnés',                    condition: { type: 'total_xp',       value: 100  } },
  { id: 'xp_500',         icon: '🌠', name: 'Chasseuse d\'étoiles', desc: '500 XP gagnés',                    condition: { type: 'total_xp',       value: 500  } },
  { id: 'xp_1000',        icon: '👑', name: 'Maîtresse des XP',     desc: '1000 XP gagnés',                   condition: { type: 'total_xp',       value: 1000 } },
  { id: 'xp_2000',        icon: '🌟', name: 'Super active',         desc: '2000 XP gagnés',                   condition: { type: 'total_xp',       value: 2000 } },
  { id: 'xp_5000',        icon: '🚀', name: 'Astronaute XP',        desc: '5000 XP gagnés',                   condition: { type: 'total_xp',       value: 5000 } },
  { id: 'level_5',        icon: '🛡️', name: 'Gardienne',            desc: 'Atteindre le niveau 5',            condition: { type: 'level',          value: 5   } },
  { id: 'level_10',       icon: '⚔️', name: 'Maître des quêtes',    desc: 'Atteindre le niveau 10',           condition: { type: 'level',          value: 10  } },
  { id: 'level_15',       icon: '🏆', name: 'Conquérante',          desc: 'Atteindre le niveau 15',           condition: { type: 'level',          value: 15  } },
  { id: 'level_20',       icon: '👑', name: 'Héroïne Familiale',    desc: 'Atteindre le niveau 20',           condition: { type: 'level',          value: 20  } },
  { id: 'level_25',       icon: '💫', name: 'Étoile filante',       desc: 'Atteindre le niveau 25',           condition: { type: 'level',          value: 25  } },
  { id: 'level_30',       icon: '👸', name: 'Chloé la Magnifique',  desc: 'Atteindre le niveau 30 !',         condition: { type: 'level',          value: 30  } },
  { id: 'nature_5',       icon: '🌿', name: 'Amie de la nature',    desc: '5 missions Nature',                condition: { type: 'cat_missions',   value: 5, cat: 'Nature'  } },
  { id: 'reading_5',      icon: '📚', name: 'Grande Lectrice',      desc: '5 missions Lecture',               condition: { type: 'cat_missions',   value: 5, cat: 'Lecture' } },
];

const LEVELS = [
  { level:  1, name: 'Exploratrice',           min: 0,     max: 100,    emoji: '🌱' },
  { level:  2, name: 'Aventurière',            min: 100,   max: 250,    emoji: '🧭' },
  { level:  3, name: 'Randonneuse',            min: 250,   max: 450,    emoji: '🥾' },
  { level:  4, name: 'Voyageuse',              min: 450,   max: 700,    emoji: '🎒' },
  { level:  5, name: 'Gardienne',              min: 700,   max: 1000,   emoji: '🛡️' },
  { level:  6, name: 'Chasseuse de quêtes',   min: 1000,  max: 1400,   emoji: '🗺️' },
  { level:  7, name: 'Exploratrice Van',       min: 1400,  max: 1900,   emoji: '🚐' },
  { level:  8, name: 'Protectrice nature',     min: 1900,  max: 2500,   emoji: '🌿' },
  { level:  9, name: 'Aventurière stellaire',  min: 2500,  max: 3200,   emoji: '🌟' },
  { level: 10, name: 'Maître des quêtes',      min: 3200,  max: 4000,   emoji: '⚔️' },
  { level: 11, name: 'Gardienne des étoiles',  min: 4000,  max: 4950,   emoji: '🔭' },
  { level: 12, name: 'Exploratrice légendaire',min: 4950,  max: 6050,   emoji: '🏕️' },
  { level: 13, name: 'Chercheuse de trésors',  min: 6050,  max: 7300,   emoji: '💎' },
  { level: 14, name: 'Navigatrice des mers',   min: 7300,  max: 8700,   emoji: '⚓' },
  { level: 15, name: 'Conquérante',            min: 8700,  max: 10250,  emoji: '🏆' },
  { level: 16, name: 'Gardienne de la forêt',  min: 10250, max: 11950,  emoji: '🌳' },
  { level: 17, name: 'Pilote de van',          min: 11950, max: 13800,  emoji: '🛞' },
  { level: 18, name: 'Astronaute junior',      min: 13800, max: 15800,  emoji: '🚀' },
  { level: 19, name: 'Exploratrice galactique',min: 15800, max: 17950,  emoji: '🌌' },
  { level: 20, name: 'Héroïne Familiale',      min: 17950, max: 20250,  emoji: '👑' },
  { level: 21, name: 'Légende de la nature',   min: 20250, max: 22750,  emoji: '🦋' },
  { level: 22, name: 'Maîtresse du temps',     min: 22750, max: 25450,  emoji: '⏳' },
  { level: 23, name: 'Protectrice du monde',   min: 25450, max: 28350,  emoji: '🌍' },
  { level: 24, name: 'Reine de l\'aventure',   min: 28350, max: 31450,  emoji: '👸' },
  { level: 25, name: 'Étoile filante',         min: 31450, max: 34750,  emoji: '💫' },
  { level: 26, name: 'Gardienne de l\'univers',min: 34750, max: 38250,  emoji: '🌠' },
  { level: 27, name: 'Phénix aventurière',     min: 38250, max: 41950,  emoji: '🔥' },
  { level: 28, name: 'Lumière du monde',       min: 41950, max: 45850,  emoji: '✨' },
  { level: 29, name: 'Légende éternelle',      min: 45850, max: 49950,  emoji: '🌈' },
  { level: 30, name: 'Chloé la Magnifique',    min: 49950, max: 999999, emoji: '👸🌟' },
];

const CONGRATS = [
  'Bravo Chloé ! 🎉', 'Mission accomplie ! ⭐', 'Tu es une vraie aventurière ! 🗺️',
  'Incroyable ! Continue comme ça ! 🔥', 'Quelle championne ! 🏆', 'Tu assures ! 💪',
  'Super boulot ! ✨', 'L\'aventure continue ! 🚐', 'Waouh ! 🌟',
];

/* ══════════════════════════════════════════════════════════════
   ÉTAT (cache local uniquement)
══════════════════════════════════════════════════════════════ */
const STATE = {
  // Données Sheets (source de vérité)
  missions: [],
  completions: {},      // { missionId: { status, date } }
  user: { id: 'chloe', name: 'Chloé', xp: 0, totalXp: 0, streak: 0, lastActiveDate: null, level: 1, missionsDone: 0, quetesDone: 0 },
  validations: [],
  rewards: [],
  unlockedBadges: [],   // [{ badgeId, unlockedAt }] depuis Sheets
  history: [],
  settings: {},
  // Données locales uniquement
  pin: '1234',
  theme: 'light',
  parentsAuth: false,
  currentTab: 'home',
  syncInterval: null,
  syncing: false,
};

/* ══════════════════════════════════════════════════════════════
   UTILITAIRES
══════════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const today = () => {
  const d = new Date();
  // Utilise l'heure locale (pas UTC) pour éviter les bugs de timezone
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
};
const formatDate = iso => { try { return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); } catch(e) { return ''; } };

function getLevelInfo(xp) {
  return LEVELS.find(l => xp >= l.min && xp < l.max) ?? LEVELS[LEVELS.length - 1];
}
function getXpProgress(xp) {
  const lvl = getLevelInfo(xp);
  return { progress: Math.min(((xp - lvl.min) / (lvl.max - lvl.min)) * 100, 100), current: xp - lvl.min, needed: lvl.max - lvl.min, lvl };
}

// Badges enrichis avec statut débloqué
function getBadgesWithStatus() {
  return ALL_BADGES.map(b => {
    const unlocked = STATE.unlockedBadges.find(ub => ub.badgeId === b.id);
    return { ...b, unlocked: !!unlocked, unlockedAt: unlocked?.unlockedAt || null };
  });
}

/* ── Toast ─────────────────────────────────────────────────── */
let toastContainer;
function showToast(msg, type = 'info', duration = 3000) {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  toastContainer.appendChild(t);
  setTimeout(() => { t.classList.add('fade-out'); setTimeout(() => t.remove(), 300); }, duration);
}

/* ══════════════════════════════════════════════════════════════
   PERSISTANCE LOCALE (cache uniquement)
══════════════════════════════════════════════════════════════ */
const CACHE_KEY = 'chloe_v7_cache';
const LOCAL_KEY = 'chloe_v7_local';

function saveCache() {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      missions: STATE.missions,
      completions: STATE.completions,
      user: STATE.user,
      validations: STATE.validations,
      rewards: STATE.rewards,
      unlockedBadges: STATE.unlockedBadges,
      history: STATE.history,
      settings: STATE.settings,
      cachedAt: new Date().toISOString(),
    }));
  } catch(e) {}
}

function saveLocal() {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({
      pin: STATE.pin,
      theme: STATE.theme,
    }));
  } catch(e) {}
}

function loadCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return false;
    const c = JSON.parse(raw);
    if (c.missions?.length) STATE.missions = c.missions;
    if (c.completions) STATE.completions = c.completions;
    if (c.user) Object.assign(STATE.user, c.user);
    if (c.validations) STATE.validations = c.validations;
    if (c.rewards?.length) STATE.rewards = c.rewards;
    if (c.unlockedBadges) STATE.unlockedBadges = c.unlockedBadges;
    if (c.history) STATE.history = c.history;
    if (c.settings) STATE.settings = c.settings;
    return true;
  } catch(e) { return false; }
}

function loadLocal() {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return;
    const l = JSON.parse(raw);
    if (l.pin) STATE.pin = l.pin;
    if (l.theme) STATE.theme = l.theme;
  } catch(e) {}
}

/* ══════════════════════════════════════════════════════════════
   SYNCHRONISATION — Sheets = maître
══════════════════════════════════════════════════════════════ */
async function syncFromSheets() {
  if (STATE.syncing) return;
  if (STATE.syncBlocked) return; // Bloqué après une validation
  STATE.syncing = true;
  updateSyncStatus('🔄 Synchronisation...');

  try {
    const result = await API.getAll(STATE.user.id);
    if (!result.ok || !result.data) {
      updateSyncStatus('⚠️ Hors-ligne');
      STATE.syncing = false;
      return false;
    }

    const d = result.data;

    // Missions
    if (d.missions?.length) {
      STATE.missions = d.missions.map(m => ({
        ...m,
        xp: Number(m.xp) || 0,
        validation: m.validation === true || m.validation === 'TRUE',
        secret: m.secret === true || m.secret === 'TRUE',
      }));
    }

    // Completions → convertit en objet { missionId: { status, date } }
    // Filtre selon la fréquence de la mission pour le reset automatique
    if (d.completions) {
      STATE.completions = {};
      const todayStr = today();
      const weekStart = getWeekStart();
      const allMissions = d.missions || STATE.missions;
      (Array.isArray(d.completions) ? d.completions : []).forEach(c => {
        const mission = allMissions.find(m => m.id === c.missionId);
        if (!mission) return;
        const freq = mission.freq;
        const type = mission.type;

        if (freq === 'quotidien') {
          // Quotidien : valide seulement si c'est aujourd'hui
          if (c.date === todayStr) {
            STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
          }
          // Sinon ignoré (reset quotidien)
        } else if (freq === 'hebdo') {
          // Hebdo : valide si dans la semaine courante
          if (c.date >= weekStart) {
            STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
          }
        } else if (freq === 'unique') {
          if (type === 'quete' || type === 'van') {
            // Quêtes uniques : toujours visibles (trophées)
            STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
          } else {
            // Missions uniques : visibles seulement aujourd'hui
            if (c.date === todayStr) {
              STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
            }
          }
        } else {
          // Fréquence inconnue : toujours valide
          STATE.completions[c.missionId] = { status: c.status || 'done', date: c.date };
        }
      });
    }

    // User
    if (d.user) {
      Object.assign(STATE.user, {
        xp: Number(d.user.xp) || 0,
        totalXp: Number(d.user.totalXp) || 0,
        streak: Number(d.user.streak) || 0,
        level: Number(d.user.level) || 1,
        missionsDone: Number(d.user.missionsDone) || 0,
        quetesDone: Number(d.user.quetesDone) || 0,
        lastActiveDate: d.user.lastActiveDate || null,
        name: d.user.name || 'Chloé',
      });
    }

    // Validations en attente
    if (d.validations) {
      STATE.validations = Array.isArray(d.validations) ? d.validations : [];
      // CRUCIAL : ajoute les completions 'pending' depuis les validations Sheets
      // Car la feuille completions ne contient que les 'done'
      STATE.validations.forEach(v => {
        if (v.status === 'pending') {
          const existing = STATE.completions[v.missionId];
          // Ne JAMAIS écraser un 'done' par un 'pending'
          if (existing && existing.status === 'done') return;
          // Ne pas remettre en pending si on vient de valider (< 60s)
          const recentlyValidated = STATE.recentlyValidated[v.missionId];
          if (recentlyValidated && (Date.now() - recentlyValidated) < 60000) return;
          // Seulement si pas encore de completion locale
          if (!existing) {
            STATE.completions[v.missionId] = { status: 'pending', date: v.submittedAt ? v.submittedAt.slice(0,10) : today() };
          }
        }
      });
      // Nettoie les entrées recentlyValidated > 30s
      Object.keys(STATE.recentlyValidated).forEach(mId => {
        if (Date.now() - STATE.recentlyValidated[mId] > 30000) {
          delete STATE.recentlyValidated[mId];
        }
      });
    }

    // Récompenses
    if (d.rewards?.length) {
      STATE.rewards = d.rewards.map(r => ({
        ...r,
        cost: Number(r.cost) || 0,
        available: r.available === true || r.available === 'TRUE',
      }));
    }

    // Badges débloqués
    if (d.badges) {
      STATE.unlockedBadges = Array.isArray(d.badges) ? d.badges : [];
    }

    // Historique
    if (d.history) {
      STATE.history = Array.isArray(d.history) ? d.history : [];
    }

    // Paramètres (PIN depuis Sheets)
    if (d.settings?.pin) {
      STATE.pin = String(d.settings.pin);
    } else {
      // PIN par défaut si non configuré dans Sheets
      STATE.pin = STATE.pin || '1234';
    }

    saveCache();
    renderAll();
    updateSyncStatus('✅ Synchronisé à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    STATE.syncing = false;
    return true;

  } catch(e) {
    updateSyncStatus('⚠️ Erreur : ' + e.message);
    STATE.syncing = false;
    return false;
  }
}

function updateSyncStatus(msg) {
  const el = $('#sync-status');
  if (el) el.textContent = msg;
}

function startAutoSync() {
  if (API.getApiUrl()) syncFromSheets();
  STATE.syncInterval = setInterval(() => {
    if (API.getApiUrl() && document.visibilityState !== 'hidden' && !STATE.syncBlocked) {
      syncFromSheets();
    }
  }, 60 * 1000); // Toutes les 60 secondes
}

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
function initApp() {
  loadLocal();
  loadCache();
  applyTheme();
  renderAll();
  bindEvents();
  initPWA();

  if (!STATE.missions.length && API.getApiUrl()) {
    syncFromSheets().finally(() => hideSplash());
    setTimeout(hideSplash, 6000);
  } else {
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

/* ══════════════════════════════════════════════════════════════
   RESET QUOTIDIEN
══════════════════════════════════════════════════════════════ */
function checkDailyReset() {
  const t = today();
  if (localStorage.getItem('chloe_v7_reset') === t) return;
  localStorage.setItem('chloe_v7_reset', t);
  // Ne remet PAS à zéro localement - c'est Sheets qui fait foi
  // Les completions d'un autre jour sont ignorées à l'affichage
}

/* ══════════════════════════════════════════════════════════════
   RENDU
══════════════════════════════════════════════════════════════ */
function renderAll() {
  checkDailyReset();
  renderHero();
  renderHomePage();
  renderMissionsPage();
  renderQuetesPage();
  renderBadgesPage();
  renderRewardsPage();
  renderVanPage();
  if (STATE.parentsAuth) {
    renderAdminMissions();
    renderAdminQuetes();
    renderAdminRewards();
    renderAdminValidations();
    renderAdminHistory();
  }
}

function renderHero() {
  const u = STATE.user;
  const info = getXpProgress(u.xp);
  const lvl = info.lvl;
  $('#avatar-emoji').textContent = lvl.emoji;
  $('#hero-name').textContent = u.name;
  $('#hero-title').textContent = lvl.name;
  $('#home-level-badge').textContent = 'Niv. ' + lvl.level;
  $('#xp-bar').style.width = info.progress + '%';
  $('#xp-label').textContent = info.current + ' / ' + info.needed + ' XP';
  $('#stat-streak').textContent = u.streak;
  $('#stat-total-xp').textContent = u.totalXp;
  $('#stat-badges').textContent = STATE.unlockedBadges.length;
  $('#stat-missions-done').textContent = u.missionsDone;
  $('#header-xp-value').textContent = u.xp;
}

function getWeekStart() {
  const now = new Date();
  const day = now.getDay(); // 0=dim, 1=lun...
  const diff = day === 0 ? -6 : 1 - day; // Revient au lundi
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().slice(0, 10);
}

function isCompletedToday(missionId) {
  const comp = STATE.completions[missionId];
  if (!comp) return false;
  if (comp.status !== 'done') return false;
  const mission = STATE.missions.find(m => m.id === missionId);
  if (!mission) return false;
  // Pour les missions quotidiennes, vérifie que c'est bien aujourd'hui
  if (mission.freq === 'quotidien') return comp.date === today();
  // Pour hebdo, vérifie la semaine courante
  if (mission.freq === 'hebdo') {
    const compDate = new Date(comp.date);
    const mondayThisWeek = new Date();
    mondayThisWeek.setDate(mondayThisWeek.getDate() - mondayThisWeek.getDay() + 1);
    mondayThisWeek.setHours(0,0,0,0);
    return compDate >= mondayThisWeek;
  }
  // Pour unique, toujours valide
  return true;
}

function getCompletionStatus(missionId) {
  const comp = STATE.completions[missionId];
  if (!comp) return null;
  // 'pending' = en attente de validation
  if (comp.status === 'pending') return 'pending';
  // 'done' = accomplie — le filtre de date est géré à la sync, pas ici
  if (comp.status === 'done') return 'done';
  return null;
}

function renderHomePage() {
  // Compteur missions quotidiennes
  const dailyMissions = STATE.missions.filter(m => m.cat === 'Quotidien' && !m.secret);
  const dailyRemaining = dailyMissions.filter(m => getCompletionStatus(m.id) !== 'done');
  const counter = $('#daily-counter');
  if (counter) {
    counter.textContent = dailyRemaining.length === 0 && dailyMissions.length > 0
      ? '🎉 Toutes les missions du jour sont faites !'
      : dailyRemaining.length + ' mission' + (dailyRemaining.length > 1 ? 's' : '') + ' quotidienne' + (dailyRemaining.length > 1 ? 's' : '') + ' restante' + (dailyRemaining.length > 1 ? 's' : '');
    counter.style.color = dailyRemaining.length === 0 ? 'var(--green)' : 'var(--text-secondary)';
  }

  // Missions du jour
  const todayMissions = STATE.missions
    .filter(m => m.type === 'mission' && (m.freq === 'quotidien' || m.freq === 'unique') && !m.secret && getCompletionStatus(m.id) !== 'done')
    .slice(0, 3);
  const $ml = $('#home-missions-list');
  $ml.innerHTML = todayMissions.length
    ? todayMissions.map(m => missionCardHTML(m)).join('')
    : '<div class="empty-state"><span class="empty-state-icon">🎉</span>Toutes les missions du jour sont faites !</div>';
  bindMissionCards($ml);

  // Quêtes actives
  const activeQuetes = STATE.missions
    .filter(m => m.type === 'quete' && !m.secret && getCompletionStatus(m.id) !== 'done')
    .slice(0, 2);
  const $ql = $('#home-quetes-list');
  $ql.innerHTML = activeQuetes.length
    ? activeQuetes.map(m => missionCardHTML(m)).join('')
    : '<div class="empty-state"><span class="empty-state-icon">🗺️</span>Aucune quête active.</div>';
  bindMissionCards($ql);

  // Badges récents
  const badges = getBadgesWithStatus();
  const recentBadges = badges.filter(b => b.unlocked).slice(-4);
  $('#home-badges-list').innerHTML = recentBadges.length
    ? recentBadges.map(badgeMiniHTML).join('')
    : '<div class="empty-state" style="padding:12px">Accomplis des missions pour gagner des badges !</div>';

  // Récompenses
  $('#home-rewards-list').innerHTML = STATE.rewards.filter(r => r.available).slice(0, 3).map(rewardMiniHTML).join('');
}

function renderMissionsPage(filter = 'all') {
  const missions = STATE.missions.filter(m => m.type === 'mission' && !m.secret);
  const filtered = filter === 'all' ? missions : missions.filter(m => m.cat === filter);
  const $list = $('#missions-list');
  $list.innerHTML = filtered.length
    ? filtered.map(m => missionCardHTML(m)).join('')
    : '<div class="empty-state"><span class="empty-state-icon">🎯</span>Aucune mission ici.</div>';
  bindMissionCards($list);
}

function renderQuetesPage() {
  const quetes = STATE.missions.filter(m => m.type === 'quete' && !m.secret);
  const done = quetes.filter(m => getCompletionStatus(m.id) === 'done');
  const active = quetes.filter(m => getCompletionStatus(m.id) !== 'done');

  $('#quetes-active-list').innerHTML = active.length
    ? active.map(m => missionCardHTML(m)).join('')
    : '<div class="empty-state">Aucune quête active.</div>';
  bindMissionCards($('#quetes-active-list'));

  const doneSection = $('#quetes-done-section');
  if (doneSection) doneSection.style.display = done.length ? 'block' : 'none';
  $('#quetes-done-list').innerHTML = done.map(m => missionCardHTML(m)).join('');
  bindMissionCards($('#quetes-done-list'));
}

function renderBadgesPage() {
  const badges = getBadgesWithStatus();
  const unlocked = badges.filter(b => b.unlocked).length;
  $('#badges-progress-fill').style.width = (badges.length ? (unlocked / badges.length * 100) : 0) + '%';
  $('#badges-progress-label').textContent = unlocked + ' / ' + badges.length + ' débloqués';
  $('#badges-grid').innerHTML = badges.map(b =>
    '<div class="badge-card ' + (b.unlocked ? 'unlocked' : 'locked') + '">' +
    '<span class="badge-icon">' + b.icon + '</span>' +
    '<div class="badge-name">' + b.name + '</div>' +
    '<div class="badge-desc">' + (b.unlocked ? '✅ ' + (b.unlockedAt ? formatDate(b.unlockedAt) : 'Débloqué') : b.desc) + '</div>' +
    '</div>'
  ).join('');

  // Trophées
  const trophees = STATE.missions.filter(m => (m.type === 'quete' || m.type === 'van') && !m.secret && getCompletionStatus(m.id) === 'done');
  const trophSection = $('#trophees-section');
  if (trophSection) {
    trophSection.style.display = trophees.length ? 'block' : 'none';
    $('#trophees-list').innerHTML = trophees.map(m =>
      '<div class="history-item">' +
      '<span class="history-icon">' + (m.icon || '🏅') + '</span>' +
      '<div class="history-body"><div class="history-title">' + m.title + '</div>' +
      '<div class="history-date">' + (STATE.completions[m.id]?.date ? formatDate(STATE.completions[m.id].date) : '') + '</div></div>' +
      '<div class="history-xp">+' + m.xp + ' XP</div></div>'
    ).join('');
  }
}

function renderRewardsPage() {
  $('#balance-xp').textContent = STATE.user.xp + ' XP';
  $('#rewards-list').innerHTML = STATE.rewards.filter(r => r.available).map(r => rewardCardHTML(r)).join('');
  bindRewardCards($('#rewards-list'));
}

function renderVanPage() {
  const vanMissions = STATE.missions.filter(m => m.type === 'van' || m.cat === 'Van');
  $('#van-missions-list').innerHTML = vanMissions.length
    ? vanMissions.map(m => missionCardHTML(m)).join('')
    : '<div class="empty-state"><span class="empty-state-icon">🚐</span>Aucune mission Van.</div>';
  bindMissionCards($('#van-missions-list'));
  const vanBadges = getBadgesWithStatus().filter(b => b.unlocked && (b.id.startsWith('van')));
  $('#van-badges-list').innerHTML = vanBadges.map(badgeMiniHTML).join('');
}

function renderAdminMissions() {
  const missions = STATE.missions.filter(m => m.type === 'mission');
  $('#admin-missions-list').innerHTML = missions.length
    ? missions.map(adminItemHTML).join('')
    : '<div class="empty-state">Aucune mission.</div>';
}

function renderAdminQuetes() {
  const quetes = STATE.missions.filter(m => m.type === 'quete' || m.type === 'van');
  $('#admin-quetes-list').innerHTML = quetes.length
    ? quetes.map(adminItemHTML).join('')
    : '<div class="empty-state">Aucune quête.</div>';
}

function renderAdminValidations() {
  const $list = $('#admin-validations-list');
  $list.innerHTML = STATE.validations.length
    ? STATE.validations.map(v =>
      '<div class="validation-item">' +
      '<div class="validation-header"><div class="validation-title">' + (v.missionTitle || v.missionId) + '</div>' +
      '<div class="validation-date">' + (v.submittedAt ? formatDate(v.submittedAt) : '') + '</div></div>' +
      '<div class="validation-btns">' +
      '<button class="btn-approve" onclick="doValidate(\'' + v.id + '\', true)">✅ Valider</button>' +
      '<button class="btn-refuse" onclick="doValidate(\'' + v.id + '\', false)">❌ Refuser</button>' +
      '</div></div>'
    ).join('')
    : '<div class="empty-state">Aucune mission en attente. 🎉</div>';
}

function renderAdminRewards() {
  $('#admin-rewards-list').innerHTML = STATE.rewards.map(r =>
    '<div class="admin-item">' +
    '<span style="font-size:1.4rem">' + r.icon + '</span>' +
    '<div class="admin-item-info"><div class="admin-item-title">' + r.title + '</div>' +
    '<div class="admin-item-meta">' + r.cost + ' XP · ' + (r.desc || '') + '</div></div>' +
    '<div class="admin-item-btns">' +
    '<button class="btn-icon" onclick="openEditReward(\'' + r.id + '\')">✏️</button>' +
    '<button class="btn-danger" onclick="doDeleteReward(\'' + r.id + '\')">🗑️</button>' +
    '</div></div>'
  ).join('');
}

function renderAdminHistory() {
  const $list = $('#admin-history-list');
  if (!STATE.history.length) { $list.innerHTML = '<div class="empty-state">Aucun historique.</div>'; return; }
  $list.innerHTML = STATE.history.map(h =>
    '<div class="history-item">' +
    '<span class="history-icon">' + (h.icon || '📌') + '</span>' +
    '<div class="history-body"><div class="history-title">' + (h.title || '') + '</div>' +
    '<div class="history-date">' + (h.date ? formatDate(h.date) : '') + '</div></div>' +
    '<div class="history-xp ' + (Number(h.xp) < 0 ? 'malus' : '') + '">' + (Number(h.xp) > 0 ? '+' : '') + (h.xp || 0) + ' XP</div>' +
    '</div>'
  ).join('');
}

/* ══════════════════════════════════════════════════════════════
   HTML BUILDERS
══════════════════════════════════════════════════════════════ */
function missionCardHTML(m) {
  const status = getCompletionStatus(m.id);
  const isDone = status === 'done';
  const isPending = status === 'pending';
  const isQuete = m.type === 'quete';
  const statusClass = isDone ? 'done' : isPending ? 'pending' : isQuete ? 'quete-card' : '';

  // Date limite
  var dueLine = '';
  if (m.due) {
    try {
      const dueDate = new Date(m.due);
      const todayDate = new Date(); todayDate.setHours(0,0,0,0);
      const diffDays = Math.ceil((dueDate - todayDate) / 86400000);
      const dueStr = diffDays < 0 ? 'Expirée' : diffDays === 0 ? 'Aujourd\'hui !' : diffDays === 1 ? 'Demain' : 'Jusqu\'au ' + dueDate.toLocaleDateString('fr-FR', {day:'numeric',month:'short'});
      const dueColor = diffDays <= 1 ? 'var(--red)' : diffDays <= 3 ? 'var(--amber)' : 'var(--text-muted)';
      dueLine = '<span class="mission-due" style="color:' + dueColor + '">📅 ' + dueStr + '</span>';
    } catch(e) {}
  }

  return '<div class="mission-card ' + statusClass + '" data-id="' + m.id + '">' +
    '<div class="mission-icon-wrap"><span>' + (m.icon || '🎯') + '</span></div>' +
    '<div class="mission-body">' +
    '<div class="mission-title">' + m.title + '</div>' +
    (m.desc ? '<div class="mission-desc">' + m.desc + '</div>' : '') +
    '<div class="mission-meta">' +
    '<span class="mission-tag ' + (isQuete ? 'quete-tag' : '') + '">' + (isQuete ? '🗺️ Quête' : m.cat) + '</span>' +
    (m.freq === 'quotidien' ? '<span class="mission-tag">🔁</span>' : m.freq === 'hebdo' ? '<span class="mission-tag">📆</span>' : '') +
    '<span class="mission-xp">+' + m.xp + ' XP</span>' +
    dueLine +
    '</div></div>' +
    '<div class="mission-action">' +
    '<button class="complete-btn ' + (isDone ? 'done-btn' : isPending ? 'pending-btn' : '') + '" data-id="' + m.id + '" ' + (isDone || isPending ? 'disabled' : '') + '>' +
    (isDone ? '✓' : isPending ? '⏳' : '○') +
    '</button></div></div>';
}

function adminItemHTML(m) {
  const typeLabel = m.type === 'quete' ? '🗺️ Quête' : m.type === 'van' ? '🚐 Van' : '🎯 Mission';
  return '<div class="admin-item">' +
    '<span style="font-size:1.3rem">' + (m.icon || '🎯') + '</span>' +
    '<div class="admin-item-info"><div class="admin-item-title">' + m.title + '</div>' +
    '<div class="admin-item-meta">' + typeLabel + ' · ' + m.xp + ' XP · ' + m.freq + (m.secret ? ' · 🔒' : '') + (m.due ? ' · 📅 ' + formatDate(m.due) : '') + '</div></div>' +
    '<div class="admin-item-btns">' +
    '<button class="btn-icon" onclick="openEditMission(\'' + m.id + '\')">✏️</button>' +
    '<button class="btn-danger" onclick="doDeleteMission(\'' + m.id + '\')">🗑️</button>' +
    '</div></div>';
}

function badgeMiniHTML(b) {
  return '<div class="badge-card-mini ' + (b.unlocked ? 'unlocked' : 'locked') + '">' +
    '<span class="badge-icon">' + b.icon + '</span>' +
    '<div class="badge-name">' + b.name + '</div></div>';
}

function rewardCardHTML(r) {
  const can = STATE.user.xp >= r.cost;
  return '<div class="reward-card">' +
    '<div class="reward-icon-wrap">' + (r.icon || '🎁') + '</div>' +
    '<div class="reward-body"><div class="reward-title">' + r.title + '</div>' +
    '<div class="reward-desc">' + (r.desc || '') + '</div>' +
    '<div class="reward-cost">⚡ ' + r.cost + ' XP</div></div>' +
    '<button class="reward-buy-btn" data-id="' + r.id + '" ' + (can ? '' : 'disabled') + '>' +
    (can ? 'Obtenir' : 'Il manque ' + (r.cost - STATE.user.xp) + ' XP') +
    '</button></div>';
}

function rewardMiniHTML(r) {
  return '<div class="reward-card-mini">' +
    '<div class="reward-icon-wrap">' + (r.icon || '🎁') + '</div>' +
    '<div class="reward-title">' + r.title + '</div>' +
    '<div class="reward-cost">⚡ ' + r.cost + '</div></div>';
}

/* ══════════════════════════════════════════════════════════════
   ACTIONS MISSIONS
══════════════════════════════════════════════════════════════ */
function completeMission(id) {
  const mission = STATE.missions.find(m => m.id === id);
  if (!mission) return;
  const status = getCompletionStatus(id);
  if (status === 'done' || status === 'pending') return; // Déjà accomplie ou en attente

  // Mise à jour locale immédiate
  if (mission.validation) {
    STATE.completions[id] = { status: 'pending', date: today() };
    // Ajoute à la liste de validations locale
    STATE.validations.push({
      id: uid(),
      userId: STATE.user.id,
      missionId: id,
      missionTitle: mission.title,
      xp: mission.xp,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    });
    showToast('En attente de validation parentale ⏳', 'info');
    saveCache();
    renderAll();
    // Envoi vers Sheets — pas de resync immédiate pour éviter les doublons
    API.submitValidation(STATE.user.id, id, mission.title, mission.xp).catch(() => {});
  } else {
    awardMission(id, mission);
  }
}

function awardMission(id, mission) {
  const prevXp = STATE.user.xp;
  const prevLevel = STATE.user.level;

  // Mise à jour locale immédiate
  STATE.completions[id] = { status: 'done', date: today() };
  STATE.user.xp += mission.xp;
  STATE.user.totalXp += mission.xp;
  if (mission.type === 'quete') STATE.user.quetesDone++;
  else STATE.user.missionsDone++;

  // Streak
  const t = today();
  if (STATE.user.lastActiveDate !== t) {
    const last = STATE.user.lastActiveDate;
    const diff = last ? Math.floor((new Date(t) - new Date(last)) / 86400000) : 0;
    STATE.user.streak = diff === 1 ? STATE.user.streak + 1 : 1;
    STATE.user.lastActiveDate = t;
  }

  // Niveau
  const newLvl = getLevelInfo(STATE.user.xp);
  STATE.user.level = newLvl.level;

  saveCache();
  renderAll();
  showSuccessModal(mission);

  // Vérifie badges
  checkAndUnlockBadges();

  // Niveau supérieur
  if (newLvl.level > prevLevel) {
    setTimeout(() => showLevelUpModal(newLvl), 1800);
  }

  // Notifications locales
  sendLocalNotif('Mission accomplie ! ⭐', mission.title + ' +' + mission.xp + ' XP');

  // Envoi vers Sheets (en arrière-plan)
  API.saveCompletion(STATE.user.id, id, 'done', t).catch(() => {});
  API.addPoints(STATE.user.id, mission.xp, 'Mission : ' + mission.title).catch(() => {});
}

/* ══════════════════════════════════════════════════════════════
   BADGES — Vérification et déblocage
══════════════════════════════════════════════════════════════ */
function checkAndUnlockBadges() {
  const u = STATE.user;
  const doneMissions = STATE.missions.filter(m => {
    const s = getCompletionStatus(m.id);
    return s === 'done';
  });
  const vanDone = doneMissions.filter(m => m.type === 'van' || m.cat === 'Van').length;
  const levelInfo = getLevelInfo(u.xp);
  const alreadyUnlocked = STATE.unlockedBadges.map(b => b.badgeId);
  const newBadges = [];

  ALL_BADGES.forEach(b => {
    if (alreadyUnlocked.includes(b.id)) return;
    const c = b.condition;
    let earned = false;
    switch (c.type) {
      case 'missions_total': earned = u.missionsDone >= c.value; break;
      case 'quetes_total':   earned = u.quetesDone >= c.value; break;
      case 'streak':         earned = u.streak >= c.value; break;
      case 'van_missions':   earned = vanDone >= c.value; break;
      case 'total_xp':       earned = u.totalXp >= c.value; break;
      case 'level':          earned = levelInfo.level >= c.value; break;
      case 'cat_missions':   earned = doneMissions.filter(m => m.cat === c.cat).length >= c.value; break;
    }
    if (earned) {
      const unlockedAt = new Date().toISOString();
      STATE.unlockedBadges.push({ badgeId: b.id, unlockedAt });
      newBadges.push({ ...b, unlockedAt });
      // Envoi vers Sheets
      API.unlockBadge(STATE.user.id, b.id).catch(() => {});
    }
  });

  if (newBadges.length) {
    saveCache();
    setTimeout(() => showBadgeModal(newBadges[0]), 1500);
  }
}

/* ══════════════════════════════════════════════════════════════
   VALIDATION PARENTALE
══════════════════════════════════════════════════════════════ */
window.doValidate = async function(validationId, approved) {
  showToast(approved ? 'Validation en cours...' : 'Refus en cours...', 'info');

  // Trouve la validation dans STATE (ID vient de Sheets via renderAdminValidations)
  const validation = STATE.validations.find(v => v.id === validationId);
  const result = await API.validateMission(validationId, approved, '', 0);
  if (result.ok) {
    if (validation) {
      if (approved) {
        STATE.completions[validation.missionId] = { status: 'done', date: today() };
        // Marque cette mission pour ignorer le pending de la prochaine sync
        STATE.recentlyValidated[validation.missionId] = Date.now();
        const mission = STATE.missions.find(m => m.id === validation.missionId);
        if (mission) {
          STATE.user.xp       += mission.xp;
          STATE.user.totalXp  += mission.xp;
          STATE.user.missionsDone++;
          const newLvl   = getLevelInfo(STATE.user.xp);
          const prevLevel = STATE.user.level;
          STATE.user.level = newLvl.level;
          if (newLvl.level > prevLevel) setTimeout(() => showLevelUpModal(newLvl), 500);
        }
      } else {
        delete STATE.completions[validation.missionId];
      }
      STATE.validations = STATE.validations.filter(v => v.id !== validationId);
    }

    saveCache();
    renderAll();
    showToast(approved ? 'Mission validée ! ✅' : 'Mission refusée.', approved ? 'success' : 'error');

    // Bloque la sync auto pendant 15s pour laisser Sheets écrire
    // et éviter que la sync n'écrase notre 'done' local
    STATE.syncBlocked = true;
    setTimeout(() => {
      STATE.syncBlocked = false;
      syncFromSheets(); // Sync après que Sheets ait eu le temps d'écrire
    }, 15000);
  } else {
    showToast('Erreur : ' + (result.error || 'Inconnue'), 'error');
  }
};

/* ══════════════════════════════════════════════════════════════
   RÉCOMPENSES
══════════════════════════════════════════════════════════════ */
function buyReward(id) {
  const reward = STATE.rewards.find(r => r.id === id);
  if (!reward) return;
  if (STATE.user.xp < reward.cost) { showToast('Pas assez de XP !', 'error'); return; }

  showConfirmModal('🎁', 'Obtenir "' + reward.title + '" ?',
    'Coût : ' + reward.cost + ' XP. Il te restera ' + (STATE.user.xp - reward.cost) + ' XP.', async () => {
    STATE.user.xp -= reward.cost;
    saveCache();
    renderAll();
    showToast('Profite bien de "' + reward.title + '" ! 🎉', 'success', 4000);
    const result = await API.redeemReward(STATE.user.id, id);
    if (!result.ok) {
      // Annule si erreur
      STATE.user.xp += reward.cost;
      saveCache();
      renderAll();
      showToast('Erreur lors de l\'échange.', 'error');
    }
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
    $('#mission-icon-input').value = m.icon || '🎯';
    $('#mission-title-input').value = m.title;
    $('#mission-desc-input').value = m.desc || '';
    $('#mission-type-input').value = m.type || 'mission';
    $('#mission-cat-input').value = m.cat;
    $('#mission-points-input').value = m.xp;
    $('#mission-freq-input').value = m.freq || 'unique';
    $('#mission-due-input').value = m.due || '';
    $('#mission-validation-input').checked = m.validation || false;
    $('#mission-secret-input').checked = m.secret || false;
  } else {
    $('#mission-form-title').textContent = defaultType === 'quete' ? 'Nouvelle quête' : 'Nouvelle mission';
    $('#mission-type-input').value = defaultType;
    $('#mission-icon-input').value = defaultType === 'quete' ? '🗺️' : '🎯';
  }
  $('#mission-form-modal').classList.remove('hidden');
}
window.openEditMission = openMissionForm;

async function handleMissionFormSubmit(e) {
  e.preventDefault();
  const mission = {
    id: editingMissionId || uid(),
    icon: $('#mission-icon-input').value.trim() || '🎯',
    title: $('#mission-title-input').value.trim(),
    desc: $('#mission-desc-input').value.trim(),
    type: $('#mission-type-input').value,
    cat: $('#mission-cat-input').value,
    xp: parseInt($('#mission-points-input').value) || 20,
    freq: $('#mission-freq-input').value,
    due: $('#mission-due-input').value || '',
    validation: $('#mission-validation-input').checked,
    secret: $('#mission-secret-input').checked,
    createdAt: editingMissionId ? undefined : new Date().toISOString(),
  };

  let result;
  if (editingMissionId) {
    result = await API.updateMission(editingMissionId, mission);
  } else {
    result = await API.createMission(mission);
  }

  if (result.ok !== false) {
    showToast(editingMissionId ? 'Modifié ✓' : (mission.type === 'quete' ? 'Quête créée ! 🗺️' : 'Mission créée ! 🎯'), 'success');
    $('#mission-form-modal').classList.add('hidden');
    editingMissionId = null;
    await syncFromSheets();
  } else {
    showToast('Erreur : ' + (result.error || 'Inconnue'), 'error');
  }
}

window.doDeleteMission = function(id) {
  showConfirmModal('🗑️', 'Supprimer ?', 'Cette action est irréversible.', async () => {
    const result = await API.deleteMission(id);
    if (result.ok !== false) {
      showToast('Supprimé.', 'info');
      await syncFromSheets();
    } else {
      showToast('Erreur lors de la suppression.', 'error');
    }
  });
};

let editingRewardId = null;
function openRewardForm(id = null) {
  editingRewardId = id;
  $('#reward-form').reset();
  if (id) {
    const r = STATE.rewards.find(rw => rw.id === id);
    if (!r) return;
    $('#reward-form-title').textContent = 'Modifier';
    $('#reward-icon-input').value = r.icon || '🎁';
    $('#reward-title-input').value = r.title;
    $('#reward-desc-input').value = r.desc || '';
    $('#reward-cost-input').value = r.cost;
    $('#reward-available-input').checked = r.available !== false;
  } else {
    $('#reward-form-title').textContent = 'Nouvelle récompense';
    $('#reward-icon-input').value = '🎁';
  }
  $('#reward-form-modal').classList.remove('hidden');
}
window.openEditReward = openRewardForm;

async function handleRewardFormSubmit(e) {
  e.preventDefault();
  const reward = {
    id: editingRewardId || uid(),
    icon: $('#reward-icon-input').value.trim() || '🎁',
    title: $('#reward-title-input').value.trim(),
    desc: $('#reward-desc-input').value.trim(),
    cost: parseInt($('#reward-cost-input').value) || 100,
    available: $('#reward-available-input').checked,
  };

  let result;
  if (editingRewardId) {
    result = await API.updateReward(editingRewardId, reward);
  } else {
    result = await API.createReward(reward);
  }

  if (result.ok !== false) {
    showToast(editingRewardId ? 'Modifié ✓' : 'Récompense créée ! 🎁', 'success');
    $('#reward-form-modal').classList.add('hidden');
    editingRewardId = null;
    await syncFromSheets();
  } else {
    showToast('Erreur.', 'error');
  }
}

window.doDeleteReward = function(id) {
  showConfirmModal('🗑️', 'Supprimer ?', 'Irréversible.', async () => {
    await API.deleteReward(id);
    showToast('Supprimée.', 'info');
    await syncFromSheets();
  });
};

/* ══════════════════════════════════════════════════════════════
   PARAMÈTRES
══════════════════════════════════════════════════════════════ */
async function saveNewPin() {
  const p = $('#new-pin-input').value.trim();
  if (!/^\d{4}$/.test(p)) { showToast('PIN : 4 chiffres requis.', 'error'); return; }
  STATE.pin = p;
  saveLocal();
  await API.saveSettings({ pin: p });
  $('#new-pin-input').value = '';
  showToast('PIN mis à jour ✓', 'success');
}

async function giveBonus() {
  const pts = parseInt($('#bonus-points-input').value) || 0;
  const reason = $('#bonus-reason-input').value.trim() || 'Bonus parental';
  if (pts <= 0) { showToast('Entrez un nombre valide.', 'error'); return; }
  const result = await API.addPoints(STATE.user.id, pts, reason);
  if (result.ok) {
    showToast('+' + pts + ' XP attribués ! 🌟', 'success');
    await syncFromSheets();
  }
}

async function deductPoints() {
  const pts = parseInt($('#deduct-points-input').value) || 0;
  const reason = $('#deduct-reason-input').value.trim();
  if (pts <= 0) { showToast('Entrez un nombre valide.', 'error'); return; }
  if (!reason) { showToast('La raison est obligatoire.', 'error'); return; }
  showConfirmModal('⚠️', 'Déduire ' + pts + ' XP ?', reason, async () => {
    const result = await API.deductPoints(STATE.user.id, pts, reason);
    if (result.ok) {
      showToast('-' + pts + ' XP déduits.', 'error');
      $('#deduct-points-input').value = '';
      $('#deduct-reason-input').value = '';
      await syncFromSheets();
    }
  });
}

function saveApiUrl() {
  API.setApiUrl($('#api-url-input').value.trim());
  showToast('URL enregistrée ✓', 'success');
}

async function pushAllToSheets() {
  showToast('Envoi complet vers Sheets...', 'info');
  const result = await API.pushAll({
    missions: STATE.missions,
    rewards: STATE.rewards,
    user: STATE.user,
    completions: STATE.completions,
    badges: getBadgesWithStatus(),
  });
  if (result.ok) {
    showToast('Tout envoyé vers Sheets ! ✅', 'success', 4000);
    await syncFromSheets();
  } else {
    showToast('Erreur lors de l\'envoi.', 'error');
  }
}

function clearAppCache() {
  showToast('Nettoyage...', 'info', 1500);
  if ('caches' in window) {
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).catch(() => {});
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
  }
  setTimeout(() => {
    window.location.href = window.location.href.split('?')[0] + '?v=' + Date.now();
  }, 1500);
}

/* ══════════════════════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════════════════════ */
function navigateTo(tab) {
  STATE.currentTab = tab;
  $$('.page').forEach(p => p.classList.remove('active'));
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  const pageMap = { home:'home', missions:'missions', quetes:'quetes', badges:'badges', rewards:'rewards', van:'van', parents:'parents' };
  $('#page-' + (pageMap[tab] || tab))?.classList.add('active');
  $('.nav-btn[data-tab="' + tab + '"]')?.classList.add('active');
  if (tab === 'parents') { STATE.parentsAuth ? showParentsContent() : showParentsLocked(); }
}

/* ══════════════════════════════════════════════════════════════
   AUTHENTIFICATION PARENTS
══════════════════════════════════════════════════════════════ */
let pinBuffer = '';
function openPinModal() { pinBuffer = ''; updatePinDisplay(); $('#pin-modal').classList.remove('hidden'); $('#pin-error').classList.add('hidden'); }
function closePinModal() { $('#pin-modal').classList.add('hidden'); }
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
    setTimeout(() => $('#pin-error')?.classList.add('hidden'), 2000);
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
function applyTheme() { document.body.className = 'theme-' + STATE.theme; $('#theme-toggle').textContent = STATE.theme === 'dark' ? '☀️' : '🌙'; }
function toggleTheme() { STATE.theme = STATE.theme === 'light' ? 'dark' : 'light'; applyTheme(); saveLocal(); }

/* ══════════════════════════════════════════════════════════════
   ÉVÉNEMENTS
══════════════════════════════════════════════════════════════ */
function bindEvents() {
  $$('.nav-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.tab)));
  $$('.see-all-btn').forEach(btn => btn.addEventListener('click', () => navigateTo(btn.dataset.tab)));

  $$('#missions-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#missions-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMissionsPage(btn.dataset.filter);
    });
  });

  $('#theme-toggle')?.addEventListener('click', toggleTheme);
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

  $$('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.admin-tab').forEach(t => t.classList.remove('active'));
      $$('.admin-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      $('#admin-' + tab.dataset.admin)?.classList.add('active');
    });
  });

  $$('.modal-backdrop').forEach(bd => bd.addEventListener('click', closeAllModals));
  $('#success-close')?.addEventListener('click', () => $('#success-modal').classList.add('hidden'));
  $('#badge-modal-close')?.addEventListener('click', () => $('#badge-modal').classList.add('hidden'));
  $('#confirm-cancel')?.addEventListener('click', () => $('#confirm-modal').classList.add('hidden'));
  $('#confirm-ok')?.addEventListener('click', () => { $('#confirm-modal').classList.add('hidden'); confirmCallback?.(); confirmCallback = null; });

  $('#add-mission-btn')?.addEventListener('click', () => openMissionForm(null, 'mission'));
  $('#add-quete-btn')?.addEventListener('click', () => openMissionForm(null, 'quete'));
  $('#mission-form-cancel')?.addEventListener('click', () => $('#mission-form-modal').classList.add('hidden'));
  $('#mission-form')?.addEventListener('submit', handleMissionFormSubmit);

  $('#add-reward-btn')?.addEventListener('click', () => openRewardForm());
  $('#reward-form-cancel')?.addEventListener('click', () => $('#reward-form-modal').classList.add('hidden'));
  $('#reward-form')?.addEventListener('submit', handleRewardFormSubmit);

  $('#save-pin-btn')?.addEventListener('click', saveNewPin);
  $('#give-bonus-btn')?.addEventListener('click', giveBonus);
  $('#deduct-btn')?.addEventListener('click', deductPoints);
  $('#save-api-btn')?.addEventListener('click', saveApiUrl);
  $('#sync-btn')?.addEventListener('click', async () => { showToast('Synchronisation...', 'info'); await syncFromSheets(); });
  $('#push-btn')?.addEventListener('click', pushAllToSheets);
  $('#restore-btn')?.addEventListener('click', async () => { showToast('Chargement depuis Sheets...', 'info'); await syncFromSheets(); });

  const clearBtn = document.getElementById('clear-cache-btn');
  if (clearBtn) clearBtn.onclick = clearAppCache;

  $('#api-url-input').value = API.getApiUrl();

  $$('.emoji-input').forEach(input => input.addEventListener('focus', () => input.select()));
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
   MODALS
══════════════════════════════════════════════════════════════ */
function closeAllModals() { $$('.modal').forEach(m => m.classList.add('hidden')); }

function showSuccessModal(mission) {
  $('#success-emoji').textContent = mission.icon || '⭐';
  $('#success-title').textContent = mission.type === 'quete' ? 'Quête accomplie ! 🗺️' : 'Mission accomplie !';
  $('#success-message').textContent = CONGRATS[Math.floor(Math.random() * CONGRATS.length)];
  $('#success-points').textContent = '+' + mission.xp + ' XP';
  $('#success-modal').classList.remove('hidden');
  launchConfetti('#confetti-container');
  if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
}

function showLevelUpModal(lvl) {
  const modal = document.getElementById('badge-modal');
  if (!modal) return;
  document.getElementById('badge-modal-icon').textContent = lvl.emoji;
  document.getElementById('badge-modal-name').textContent = 'Niveau ' + lvl.level + ' atteint !';
  document.getElementById('badge-modal-desc').textContent = 'Tu es maintenant : ' + lvl.name;
  modal.classList.remove('hidden');
  launchConfetti('#badge-confetti');
  if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
}

function showBadgeModal(badge) {
  document.getElementById('badge-modal-icon').textContent = badge.icon;
  document.getElementById('badge-modal-name').textContent = badge.name;
  document.getElementById('badge-modal-desc').textContent = badge.desc;
  document.getElementById('badge-modal').classList.remove('hidden');
  launchConfetti('#badge-confetti');
  sendLocalNotif('Badge débloqué ! 🏆', 'Tu as obtenu le badge "' + badge.name + '" !');
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
    p.style.cssText = 'left:' + (Math.random()*100) + '%;top:' + (-10-Math.random()*20) + 'px;background:' + colors[Math.floor(Math.random()*colors.length)] + ';width:' + (4+Math.random()*8) + 'px;height:' + (4+Math.random()*8) + 'px;border-radius:' + (Math.random()>.5?'50%':'2px') + ';animation-duration:' + (1.5+Math.random()*2) + 's;animation-delay:' + (Math.random()*.4) + 's;';
    container.appendChild(p);
  }
  setTimeout(() => { if(container) container.innerHTML = ''; }, 4000);
}

/* ══════════════════════════════════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════════════════════════════════ */
async function requestNotifPermission() {
  if (!('Notification' in window)) { showToast('Non supporté.', 'error'); return; }
  const perm = await Notification.requestPermission();
  showToast(perm === 'granted' ? 'Notifications activées ! 🔔' : 'Notifications refusées.', perm === 'granted' ? 'success' : 'error');
  updateNotifStatus();
}

function updateNotifStatus() {
  const el = $('#notif-status');
  if (!el || !('Notification' in window)) return;
  const labels = { granted: '✅ Activées', denied: '❌ Refusées', default: '⚪ Non activées' };
  el.textContent = 'Statut : ' + (labels[Notification.permission] || 'Inconnu');
}

function sendLocalNotif(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  try { new Notification(title, { body, icon: 'icons/icon-192.png' }); } catch(e) {}
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
