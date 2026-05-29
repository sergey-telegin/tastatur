const flyKeyApiDefaultConfig = {
  baseUrl: null,
  contentVersionPath: "/api/content/version",
  contentBundlePath: "/api/content/bundle",
  backendBaseUrl: null
};

function createFlyKeyApiClient(config = {}) {
  const settings = { ...flyKeyApiDefaultConfig, ...config };
  const pageOrigin = window.location?.origin || "";
  const sameOriginBaseUrl = pageOrigin.startsWith("http://") || pageOrigin.startsWith("https://")
    ? pageOrigin
    : "";
  const configuredBaseUrl = settings.baseUrl == null ? sameOriginBaseUrl : settings.baseUrl;
  const baseUrl = String(configuredBaseUrl || "").replace(/\/$/, "");
  const backendBaseUrl = String(settings.backendBaseUrl || "").replace(/\/$/, "");

  function isConfigured() {
    return Boolean(baseUrl);
  }

  function isBackendConfigured() {
    return Boolean(backendBaseUrl);
  }

  function apiUrl(path) {
    return `${baseUrl}${path}`;
  }

  function backendUrl(path) {
    return `${backendBaseUrl}${path}`;
  }

  async function fetchJson(path) {
    if (!isConfigured()) {
      return {
        status: "skipped",
        reason: "api-not-configured"
      };
    }

    try {
      const response = await fetch(apiUrl(path), {
        headers: { Accept: "application/json" },
        cache: "no-store"
      });

      if (!response.ok) {
        return {
          status: "error",
          reason: "http-error",
          statusCode: response.status
        };
      }

      return {
        status: "ok",
        data: await response.json()
      };
    } catch (error) {
      return {
        status: "error",
        reason: "network-error",
        message: error?.message || String(error)
      };
    }
  }

  async function requestBackendJson(path, options = {}) {
    if (!isBackendConfigured()) {
      return {
        status: "skipped",
        reason: "backend-not-configured"
      };
    }

    const headers = {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.accessToken ? { Authorization: `Bearer ${options.accessToken}` } : {})
    };

    try {
      const response = await fetch(backendUrl(path), {
        method: options.method || "GET",
        headers,
        cache: "no-store",
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        return {
          status: "error",
          reason: "http-error",
          statusCode: response.status,
          data
        };
      }

      return {
        status: "ok",
        data
      };
    } catch (error) {
      return {
        status: "error",
        reason: "network-error",
        message: error?.message || String(error)
      };
    }
  }

  return {
    isConfigured,
    isBackendConfigured,

    getConfig() {
      return { ...settings, baseUrl, backendBaseUrl };
    },

    async getContentVersion() {
      return fetchJson(settings.contentVersionPath);
    },

    async getContentBundle() {
      return fetchJson(settings.contentBundlePath);
    },

    async register(payload) {
      return requestBackendJson("/api/v1/auth/register", {
        method: "POST",
        body: payload
      });
    },

    async login(payload) {
      return requestBackendJson("/api/v1/auth/login", {
        method: "POST",
        body: payload
      });
    },

    async refresh(refreshToken) {
      return requestBackendJson("/api/v1/auth/refresh", {
        method: "POST",
        body: { refreshToken }
      });
    },

    async logout(accessToken) {
      return requestBackendJson("/api/v1/auth/logout", {
        method: "POST",
        accessToken
      });
    },

    async me(accessToken) {
      return requestBackendJson("/api/v1/me", { accessToken });
    },

    async entitlements(accessToken) {
      return requestBackendJson("/api/v1/me/entitlements", { accessToken });
    },

    async oauthProviders() {
      return requestBackendJson("/api/v1/oauth/providers");
    },

    async oauthStart(provider) {
      return requestBackendJson(`/api/v1/oauth/${encodeURIComponent(provider)}/start?returnTo=${encodeURIComponent(window.location.href)}`);
    },

    async listProfiles(accessToken) {
      return requestBackendJson("/api/v1/profiles", { accessToken });
    },

    async createProfile(accessToken, payload) {
      return requestBackendJson("/api/v1/profiles", {
        method: "POST",
        accessToken,
        body: payload
      });
    },

    async getProfile(accessToken, profileId) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}`, { accessToken });
    },

    async updateProfile(accessToken, profileId, payload) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}`, {
        method: "PATCH",
        accessToken,
        body: payload
      });
    },

    async deleteProfile(accessToken, profileId) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}`, {
        method: "DELETE",
        accessToken
      });
    },

    async getProfileState(accessToken, profileId) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}/state`, { accessToken });
    },

    async putProfileState(accessToken, profileId, payload) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}/state`, {
        method: "PUT",
        accessToken,
        body: payload
      });
    },

    async getProfileProgress(accessToken, profileId) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}/progress`, { accessToken });
    },

    async putProfileProgress(accessToken, profileId, payload) {
      return requestBackendJson(`/api/v1/profiles/${encodeURIComponent(profileId)}/progress`, {
        method: "PUT",
        accessToken,
        body: payload
      });
    },

    async importLocalState(accessToken, payload) {
      return requestBackendJson("/api/v1/migration/local-state", {
        method: "POST",
        accessToken,
        body: payload
      });
    }
  };
}

window.FlyKeyApiClient = window.FlyKeyApiClient || createFlyKeyApiClient(window.FLYKEY_API_CONFIG || {});
