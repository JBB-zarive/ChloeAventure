/**
 * api.js – Chloé Aventure
 * Couche de communication avec Google Apps Script (backend REST)
 * et gestion du localStorage (cache local hors-ligne)
 */

/* ═══════════════════════════════════════════════════════════════
   CONFIGURATION
═══════════════════════════════════════════════════════════════ */
const API = (() => {

  // Clé de stockage pour l'URL de l'API
  const API_URL_KEY = 'chloe_api_url';
  const CACHE_PREFIX = 'chloe_cache_';
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /** Retourne l'URL de l'API GAS configurée */
  function getApiUrl() {
    return localStorage.getItem(API_URL_KEY) || 'https://script.google.com/macros/s/AKfycbyJJIq_dN9wXJUGl-dpAsULpQdK9HKIu8tjbk3q6egN5Bg8QYugcP7pBvRnBTV_5ij6/exec';
  }

  /** Enregistre l'URL de l'API GAS */
  function setApiUrl(url) {
    localStorage.setItem(API_URL_KEY, url);
  }

  /* ── Cache local ─────────────────────────────────────────────── */

  function cacheGet(key) {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      const entry = JSON.parse(raw);
      if (Date.now() - entry.ts > CACHE_TTL) { localStorage.removeItem(CACHE_PREFIX + key); return null; }
      return entry.data;
    } catch { return null; }
  }

  function cacheSet(key, data) {
    try { localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ ts: Date.now(), data })); } catch {}
  }

  function cacheClear(key) {
    if (key) { localStorage.removeItem(CACHE_PREFIX + key); }
    else {
      Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX)).forEach(k => localStorage.removeItem(k));
    }
  }

  /* ── Requêtes HTTP ───────────────────────────────────────────── */

  /**
   * Appel GET vers l'API GAS
   * @param {string} action  – nom de l'action
   * @param {object} params  – paramètres additionnels
   * @param {boolean} useCache – utiliser le cache local
   */
  async function get(action, params = {}, useCache = true) {
    const url = getApiUrl();
    if (!url) return { ok: false, error: 'API non configurée', offline: true };

    const cacheKey = action + JSON.stringify(params);
    if (useCache) {
      const cached = cacheGet(cacheKey);
      if (cached) return { ok: true, data: cached, cached: true };
    }

    try {
      const qs = new URLSearchParams({ action, ...params }).toString();
      const res = await fetch(`${url}?${qs}`, { method: 'GET' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (useCache) cacheSet(cacheKey, data);
      return { ok: true, data };
    } catch (err) {
      // Retour cache même expiré si hors-ligne
      const stale = cacheGet(cacheKey) ?? null;
      return { ok: false, error: err.message, offline: true, data: stale };
    }
  }

  /**
   * Appel POST vers l'API GAS
   * @param {string} action
   * @param {object} payload
   */
  async function post(action, payload = {}) {
    const url = getApiUrl();
    if (!url) return { ok: false, error: 'API non configurée', offline: true };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' }, // GAS impose text/plain pour éviter preflight
        body: JSON.stringify({ action, ...payload })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      cacheClear(); // Invalide le cache après une écriture
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err.message, offline: true };
    }
  }

  /* ════════════════════════════════════════════════════════════════
     API PUBLIQUE – Méthodes métier
  ════════════════════════════════════════════════════════════════ */

  return {
    getApiUrl,
    setApiUrl,
    cacheClear,

    /* ── Missions ─────────────────────────────────────────────── */

    async getMissions() {
      return get('getMissions');
    },

    async createMission(mission) {
      return post('createMission', { mission });
    },

    async updateMission(id, updates) {
      return post('updateMission', { id, updates });
    },

    async deleteMission(id) {
      return post('deleteMission', { id });
    },

    /* ── Validations ──────────────────────────────────────────── */

    async submitMissionCompletion(missionId, userId) {
      return post('submitCompletion', { missionId, userId });
    },

    async validateMission(validationId, approved, comment = '', bonusPoints = 0) {
      return post('validateMission', { validationId, approved, comment, bonusPoints });
    },

    async getPendingValidations() {
      return get('getPendingValidations', {}, false);
    },

    /* ── Points & Niveaux ─────────────────────────────────────── */

    async getUserData(userId) {
      return get('getUserData', { userId });
    },

    async addPoints(userId, points, reason) {
      return post('addPoints', { userId, points, reason });
    },

    /* ── Badges ───────────────────────────────────────────────── */

    async getBadges(userId) {
      return get('getBadges', { userId });
    },

    async checkAndAwardBadges(userId) {
      return post('checkBadges', { userId });
    },

    /* ── Récompenses ──────────────────────────────────────────── */

    async getRewards() {
      return get('getRewards');
    },

    async createReward(reward) {
      return post('createReward', { reward });
    },

    async updateReward(id, updates) {
      return post('updateReward', { id, updates });
    },

    async deleteReward(id) {
      return post('deleteReward', { id });
    },

    async redeemReward(rewardId, userId) {
      return post('redeemReward', { rewardId, userId });
    },

    /* ── Historique ───────────────────────────────────────────── */

    async getHistory(userId, limit = 50) {
      return get('getHistory', { userId, limit });
    },

    /* ── Paramètres ───────────────────────────────────────────── */

    async getSettings() {
      return get('getSettings');
    },

    async saveSettings(settings) {
      return post('saveSettings', { settings });
    },

    /* ── Synchronisation complète ─────────────────────────────── */

    async syncAll(userId) {
      const [missions, rewards, badges, userData, history] = await Promise.all([
        this.getMissions(),
        this.getRewards(),
        this.getBadges(userId),
        this.getUserData(userId),
        this.getHistory(userId, 20)
      ]);
      return { missions, rewards, badges, userData, history };
    }
  };
})();
