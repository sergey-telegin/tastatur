const flyKeyApiDefaultConfig = {
  baseUrl: null,
  contentVersionPath: "/api/content/version",
  contentBundlePath: "/api/content/bundle"
};

function createFlyKeyApiClient(config = {}) {
  const settings = { ...flyKeyApiDefaultConfig, ...config };
  const pageOrigin = window.location?.origin || "";
  const sameOriginBaseUrl = pageOrigin.startsWith("http://") || pageOrigin.startsWith("https://")
    ? pageOrigin
    : "";
  const configuredBaseUrl = settings.baseUrl == null ? sameOriginBaseUrl : settings.baseUrl;
  const baseUrl = String(configuredBaseUrl || "").replace(/\/$/, "");

  function isConfigured() {
    return Boolean(baseUrl);
  }

  function apiUrl(path) {
    return `${baseUrl}${path}`;
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

  return {
    isConfigured,

    getConfig() {
      return { ...settings, baseUrl };
    },

    async getContentVersion() {
      return fetchJson(settings.contentVersionPath);
    },

    async getContentBundle() {
      return fetchJson(settings.contentBundlePath);
    }
  };
}

window.FlyKeyApiClient = window.FlyKeyApiClient || createFlyKeyApiClient(window.FLYKEY_API_CONFIG || {});
