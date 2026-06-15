/**
 * Code.gs – Chloé Aventure
 * Backend Google Apps Script – API REST complète
 * À déployer sur : https://script.google.com
 *
 * STRUCTURE des Google Sheets :
 * - utilisateurs | missions | validations | points | badges
 * - recompenses  | evenements | parametres | historique
 */

/* ══════════════════════════════════════════════════════════════
   CONFIGURATION
══════════════════════════════════════════════════════════════ */
// ⚠️ REMPLACEZ PAR L'ID DE VOTRE GOOGLE SHEET (pas l'ID du déploiement Apps Script)
// L'ID se trouve dans l'URL de votre Sheet :
// https://docs.google.com/spreadsheets/d/[CET_ID_ICI]/edit
const SPREADSHEET_ID = 'VOTRE_SPREADSHEET_ID_ICI'; // ← Remplacez uniquement ceci

const SHEETS = {
  USERS: 'utilisateurs',
  MISSIONS: 'missions',
  VALIDATIONS: 'validations',
  POINTS: 'points',
  BADGES: 'badges',
  REWARDS: 'recompenses',
  EVENTS: 'evenements',
  SETTINGS: 'parametres',
  HISTORY: 'historique',
};

/* ══════════════════════════════════════════════════════════════
   POINT D'ENTRÉE HTTP
══════════════════════════════════════════════════════════════ */

/** Requêtes GET */
function doGet(e) {
  try {
    const params = e.parameter;
    const action = params.action;
    let result;

    switch (action) {
      case 'getMissions':          result = getMissions();                       break;
      case 'getRewards':           result = getRewards();                        break;
      case 'getBadges':            result = getBadges(params.userId);            break;
      case 'getUserData':          result = getUserData(params.userId);          break;
      case 'getPendingValidations':result = getPendingValidations();             break;
      case 'getHistory':           result = getHistory(params.userId, parseInt(params.limit) || 50); break;
      case 'getSettings':          result = getSettings();                       break;
      default:                     result = { error: 'Action inconnue: ' + action };
    }

    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

/** Requêtes POST */
function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    let result;

    switch (action) {
      case 'createMission':    result = createMission(body.mission);                                               break;
      case 'updateMission':    result = updateMission(body.id, body.updates);                                      break;
      case 'deleteMission':    result = deleteMission(body.id);                                                    break;
      case 'submitCompletion': result = submitCompletion(body.missionId, body.userId);                             break;
      case 'validateMission':  result = validateMission(body.validationId, body.approved, body.comment, body.bonusPoints); break;
      case 'addPoints':        result = addPoints(body.userId, body.points, body.reason);                          break;
      case 'checkBadges':      result = checkAndAwardBadges(body.userId);                                          break;
      case 'createReward':     result = createReward(body.reward);                                                 break;
      case 'updateReward':     result = updateReward(body.id, body.updates);                                       break;
      case 'deleteReward':     result = deleteReward(body.id);                                                     break;
      case 'redeemReward':     result = redeemReward(body.rewardId, body.userId);                                  break;
      case 'saveSettings':     result = saveSettings(body.settings);                                               break;
      default:                 result = { error: 'Action inconnue: ' + action };
    }

    return jsonResponse(result);
  } catch (err) {
    return jsonResponse({ error: err.message });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ══════════════════════════════════════════════════════════════
   UTILITAIRES SHEETS
══════════════════════════════════════════════════════════════ */

function getSheet(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = createSheet(ss, name);
  return sheet;
}

function getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function appendRow(sheet, obj, headers) {
  const row = headers.map(h => obj[h] ?? '');
  sheet.appendRow(row);
}

function updateRow(sheet, headers, idField, idValue, updates) {
  const data = sheet.getDataRange().getValues();
  const headerRow = data[0];
  const idCol = headerRow.indexOf(idField);
  if (idCol === -1) return false;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(idValue)) {
      Object.keys(updates).forEach(key => {
        const col = headerRow.indexOf(key);
        if (col > -1) sheet.getRange(i + 1, col + 1).setValue(updates[key]);
      });
      return true;
    }
  }
  return false;
}

function deleteRow(sheet, idField, idValue) {
  const data = sheet.getDataRange().getValues();
  const headerRow = data[0];
  const idCol = headerRow.indexOf(idField);
  if (idCol === -1) return false;

  for (let i = data.length - 1; i >= 1; i--) {
    if (String(data[i][idCol]) === String(idValue)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function uid() {
  return Utilities.getUuid().replace(/-/g, '').slice(0, 12);
}

/* ══════════════════════════════════════════════════════════════
   INITIALISATION DES FEUILLES
══════════════════════════════════════════════════════════════ */

/**
 * EXÉCUTER CETTE FONCTION UNE FOIS pour créer la structure
 * Menu Apps Script > Exécuter > initSpreadsheet
 */
function initSpreadsheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  // utilisateurs
  const users = getOrCreateSheet(ss, SHEETS.USERS);
  if (users.getLastRow() === 0) {
    users.appendRow(['id', 'name', 'xp', 'totalXp', 'streak', 'lastActiveDate', 'level', 'missionsDone', 'avatarEmoji', 'createdAt']);
    users.appendRow(['chloe', 'Chloé', 0, 0, 0, '', 1, 0, '🧭', new Date().toISOString()]);
  }

  // missions
  const missions = getOrCreateSheet(ss, SHEETS.MISSIONS);
  if (missions.getLastRow() === 0) {
    missions.appendRow(['id', 'title', 'desc', 'cat', 'diff', 'xp', 'icon', 'freq', 'validation', 'due', 'secret', 'createdAt']);
    // Exemples
    missions.appendRow(['m_bed', 'Faire son lit', 'Ranger son lit dès le matin', 'Quotidien', 'facile', 15, '🛏️', 'quotidien', false, '', false, new Date().toISOString()]);
    missions.appendRow(['m_read', 'Lire 20 minutes', 'Un livre de ton choix', 'Lecture', 'facile', 20, '📖', 'quotidien', false, '', false, new Date().toISOString()]);
    missions.appendRow(['van_stars', 'Observer les étoiles', 'Trouver 3 constellations', 'Van', 'facile', 30, '🔭', 'unique', false, '', false, new Date().toISOString()]);
  }

  // validations
  const validations = getOrCreateSheet(ss, SHEETS.VALIDATIONS);
  if (validations.getLastRow() === 0) {
    validations.appendRow(['id', 'missionId', 'missionTitle', 'userId', 'status', 'comment', 'bonusPoints', 'submittedAt', 'validatedAt']);
  }

  // points
  const points = getOrCreateSheet(ss, SHEETS.POINTS);
  if (points.getLastRow() === 0) {
    points.appendRow(['id', 'userId', 'amount', 'reason', 'createdAt']);
  }

  // badges
  const badges = getOrCreateSheet(ss, SHEETS.BADGES);
  if (badges.getLastRow() === 0) {
    badges.appendRow(['id', 'userId', 'badgeId', 'unlockedAt']);
  }

  // recompenses
  const rewards = getOrCreateSheet(ss, SHEETS.REWARDS);
  if (rewards.getLastRow() === 0) {
    rewards.appendRow(['id', 'title', 'desc', 'cost', 'icon', 'available', 'createdAt']);
    rewards.appendRow(['r_movie', 'Choisir le film', 'Tu choisis le film du soir !', 80, '🎬', true, new Date().toISOString()]);
    rewards.appendRow(['r_dessert', 'Dessert préféré', 'Le dessert de ton choix', 50, '🍰', true, new Date().toISOString()]);
    rewards.appendRow(['r_outing', 'Sortie spéciale', 'Une sortie de ton choix', 300, '🎡', true, new Date().toISOString()]);
  }

  // evenements
  const events = getOrCreateSheet(ss, SHEETS.EVENTS);
  if (events.getLastRow() === 0) {
    events.appendRow(['id', 'name', 'theme', 'startDate', 'endDate', 'active']);
  }

  // parametres
  const settings = getOrCreateSheet(ss, SHEETS.SETTINGS);
  if (settings.getLastRow() === 0) {
    settings.appendRow(['key', 'value']);
    settings.appendRow(['pin', '1234']);
    settings.appendRow(['level_thresholds', '0,100,300,600,1000']);
    settings.appendRow(['daily_reset_hour', '0']);
  }

  // historique
  const history = getOrCreateSheet(ss, SHEETS.HISTORY);
  if (history.getLastRow() === 0) {
    history.appendRow(['id', 'userId', 'type', 'title', 'icon', 'xp', 'createdAt']);
  }

  return { ok: true, message: 'Structure initialisée avec succès !' };
}

/* ══════════════════════════════════════════════════════════════
   CRUD MISSIONS
══════════════════════════════════════════════════════════════ */

const MISSION_HEADERS = ['id', 'title', 'desc', 'cat', 'diff', 'xp', 'icon', 'freq', 'validation', 'due', 'secret', 'createdAt'];

function getMissions() {
  const sheet = getSheet(SHEETS.MISSIONS);
  return sheetToObjects(sheet).map(m => ({
    ...m,
    xp: Number(m.xp),
    validation: m.validation === true || m.validation === 'TRUE',
    secret: m.secret === true || m.secret === 'TRUE',
  }));
}

function createMission(mission) {
  const sheet = getSheet(SHEETS.MISSIONS);
  const m = { ...mission, id: mission.id || uid(), createdAt: new Date().toISOString() };
  appendRow(sheet, m, MISSION_HEADERS);
  return { ok: true, id: m.id };
}

function updateMission(id, updates) {
  const sheet = getSheet(SHEETS.MISSIONS);
  const ok = updateRow(sheet, MISSION_HEADERS, 'id', id, updates);
  return { ok };
}

function deleteMission(id) {
  const sheet = getSheet(SHEETS.MISSIONS);
  const ok = deleteRow(sheet, 'id', id);
  return { ok };
}

/* ══════════════════════════════════════════════════════════════
   VALIDATIONS
══════════════════════════════════════════════════════════════ */

function submitCompletion(missionId, userId) {
  const sheet = getSheet(SHEETS.VALIDATIONS);
  const missions = getMissions();
  const mission = missions.find(m => m.id === missionId);

  const entry = {
    id: uid(),
    missionId,
    missionTitle: mission?.title ?? missionId,
    userId: userId || 'chloe',
    status: 'pending',
    comment: '',
    bonusPoints: 0,
    submittedAt: new Date().toISOString(),
    validatedAt: '',
  };

  sheet.appendRow(['id', 'missionId', 'missionTitle', 'userId', 'status', 'comment', 'bonusPoints', 'submittedAt', 'validatedAt'].map(h => entry[h]));
  return { ok: true, id: entry.id };
}

function getPendingValidations() {
  const sheet = getSheet(SHEETS.VALIDATIONS);
  return sheetToObjects(sheet).filter(v => v.status === 'pending');
}

function validateMission(validationId, approved, comment, bonusPoints) {
  const sheet = getSheet(SHEETS.VALIDATIONS);
  const validations = sheetToObjects(sheet);
  const v = validations.find(val => val.id === validationId);

  if (!v) return { ok: false, error: 'Validation introuvable' };

  const status = approved ? 'approved' : 'refused';
  updateRow(sheet, Object.keys(v), 'id', validationId, {
    status,
    comment: comment || '',
    bonusPoints: bonusPoints || 0,
    validatedAt: new Date().toISOString(),
  });

  if (approved) {
    // Attribuer les points
    const missions = getMissions();
    const mission = missions.find(m => m.id === v.missionId);
    const pts = (Number(mission?.xp) || 0) + (Number(bonusPoints) || 0);
    if (pts > 0) {
      addPoints(v.userId, pts, `Mission validée : ${v.missionTitle}`);
    }
    addHistory(v.userId, 'mission', v.missionTitle, mission?.icon || '✅', pts);
  }

  return { ok: true };
}

/* ══════════════════════════════════════════════════════════════
   POINTS & UTILISATEURS
══════════════════════════════════════════════════════════════ */

function getUserData(userId) {
  const sheet = getSheet(SHEETS.USERS);
  const users = sheetToObjects(sheet);
  const user = users.find(u => u.id === (userId || 'chloe'));
  if (!user) return null;
  return { ...user, xp: Number(user.xp), totalXp: Number(user.totalXp), level: Number(user.level), streak: Number(user.streak), missionsDone: Number(user.missionsDone) };
}

function addPoints(userId, points, reason) {
  const uid_ = userId || 'chloe';

  // Enregistre transaction
  const pointsSheet = getSheet(SHEETS.POINTS);
  pointsSheet.appendRow([uid(), uid_, points, reason, new Date().toISOString()]);

  // Met à jour utilisateur
  const userSheet = getSheet(SHEETS.USERS);
  const data = userSheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  const xpCol = headers.indexOf('xp');
  const totalXpCol = headers.indexOf('totalXp');
  const missionsDoneCol = headers.indexOf('missionsDone');

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === uid_) {
      const newXp = Number(data[i][xpCol]) + Number(points);
      const newTotal = Number(data[i][totalXpCol]) + Number(points);
      userSheet.getRange(i + 1, xpCol + 1).setValue(newXp);
      userSheet.getRange(i + 1, totalXpCol + 1).setValue(newTotal);
      userSheet.getRange(i + 1, missionsDoneCol + 1).setValue(Number(data[i][missionsDoneCol]) + 1);

      // Recalcul niveau
      const level = calculateLevel(newTotal);
      userSheet.getRange(i + 1, headers.indexOf('level') + 1).setValue(level);
      break;
    }
  }

  return { ok: true };
}

function calculateLevel(totalXp) {
  if (totalXp < 100)  return 1;
  if (totalXp < 300)  return 2;
  if (totalXp < 600)  return 3;
  if (totalXp < 1000) return 4;
  return 5;
}

/* ══════════════════════════════════════════════════════════════
   BADGES
══════════════════════════════════════════════════════════════ */

function getBadges(userId) {
  const sheet = getSheet(SHEETS.BADGES);
  return sheetToObjects(sheet).filter(b => b.userId === (userId || 'chloe'));
}

function checkAndAwardBadges(userId) {
  // Logique de vérification implémentée côté client et synchronisée ici
  return { ok: true };
}

function awardBadge(userId, badgeId) {
  const sheet = getSheet(SHEETS.BADGES);
  const existing = sheetToObjects(sheet).find(b => b.userId === userId && b.badgeId === badgeId);
  if (existing) return { ok: false, already: true };

  sheet.appendRow([uid(), userId, badgeId, new Date().toISOString()]);
  addHistory(userId, 'badge', 'Badge débloqué', '🏆', 0);
  return { ok: true };
}

/* ══════════════════════════════════════════════════════════════
   RÉCOMPENSES
══════════════════════════════════════════════════════════════ */

const REWARD_HEADERS = ['id', 'title', 'desc', 'cost', 'icon', 'available', 'createdAt'];

function getRewards() {
  const sheet = getSheet(SHEETS.REWARDS);
  return sheetToObjects(sheet).map(r => ({
    ...r,
    cost: Number(r.cost),
    available: r.available === true || r.available === 'TRUE',
  })).filter(r => r.available);
}

function createReward(reward) {
  const sheet = getSheet(SHEETS.REWARDS);
  const r = { ...reward, id: reward.id || uid(), createdAt: new Date().toISOString() };
  appendRow(sheet, r, REWARD_HEADERS);
  return { ok: true, id: r.id };
}

function updateReward(id, updates) {
  const sheet = getSheet(SHEETS.REWARDS);
  const ok = updateRow(sheet, REWARD_HEADERS, 'id', id, updates);
  return { ok };
}

function deleteReward(id) {
  const sheet = getSheet(SHEETS.REWARDS);
  const ok = deleteRow(sheet, 'id', id);
  return { ok };
}

function redeemReward(rewardId, userId) {
  const rewards = getRewards();
  const reward = rewards.find(r => r.id === rewardId);
  if (!reward) return { ok: false, error: 'Récompense introuvable' };

  const user = getUserData(userId);
  if (!user || user.xp < reward.cost) return { ok: false, error: 'XP insuffisants' };

  // Débiter les points
  const userSheet = getSheet(SHEETS.USERS);
  const data = userSheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf('id');
  const xpCol = headers.indexOf('xp');

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === userId) {
      userSheet.getRange(i + 1, xpCol + 1).setValue(Number(data[i][xpCol]) - reward.cost);
      break;
    }
  }

  addHistory(userId, 'reward', `Récompense : ${reward.title}`, reward.icon, -reward.cost);
  return { ok: true };
}

/* ══════════════════════════════════════════════════════════════
   HISTORIQUE
══════════════════════════════════════════════════════════════ */

function addHistory(userId, type, title, icon, xp) {
  const sheet = getSheet(SHEETS.HISTORY);
  sheet.appendRow([uid(), userId || 'chloe', type, title, icon, xp, new Date().toISOString()]);
}

function getHistory(userId, limit) {
  const sheet = getSheet(SHEETS.HISTORY);
  const all = sheetToObjects(sheet).filter(h => h.userId === (userId || 'chloe'));
  return all.slice(-Math.min(limit || 50, all.length)).reverse();
}

/* ══════════════════════════════════════════════════════════════
   PARAMÈTRES
══════════════════════════════════════════════════════════════ */

function getSettings() {
  const sheet = getSheet(SHEETS.SETTINGS);
  const rows = sheetToObjects(sheet);
  const settings = {};
  rows.forEach(r => { settings[r.key] = r.value; });
  return settings;
}

function saveSettings(settings) {
  const sheet = getSheet(SHEETS.SETTINGS);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const keyCol = headers.indexOf('key');
  const valCol = headers.indexOf('value');

  Object.entries(settings).forEach(([key, value]) => {
    let found = false;
    for (let i = 1; i < data.length; i++) {
      if (String(data[i][keyCol]) === key) {
        sheet.getRange(i + 1, valCol + 1).setValue(value);
        found = true;
        break;
      }
    }
    if (!found) sheet.appendRow([key, value]);
  });

  return { ok: true };
}
