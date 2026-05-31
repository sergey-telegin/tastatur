const flyKeyContentCacheKey = "flykey-content-cache-v1";

function cloneFlyKeyContentValue(value) {
  if (value == null) return value;
  return JSON.parse(JSON.stringify(value));
}

function flyKeyLocalContentBundle() {
  const source = window.PRACTICE_CONTENT_SOURCE || {};
  const meta = source.meta || window.FLYKEY_CONTENT_VERSION || {};

  return {
    meta,
    languages: source.languages || meta.languages || [],
    grades: source.grades || {},
    modules: source.modules || [],
    storyboard: window.FLYKEY_LESSON_STORYBOARD || {},
    onboardingStoryboard: window.FLYKEY_ONBOARDING_STORYBOARD || {},
    assets: meta.assets || {}
  };
}

function readFlyKeyCachedContentBundle() {
  try {
    const cached = JSON.parse(localStorage.getItem(flyKeyContentCacheKey)) || null;
    if (!cached || typeof cached !== "object") return null;
    return cached.bundle || null;
  } catch {
    return null;
  }
}

function writeFlyKeyCachedContentBundle(bundle) {
  try {
    localStorage.setItem(flyKeyContentCacheKey, JSON.stringify({
      cachedAt: new Date().toISOString(),
      version: bundle?.meta?.version || null,
      bundle
    }));
    return true;
  } catch {
    return false;
  }
}

function createFlyKeyContentProvider() {
  const getLocalBundle = () => cloneFlyKeyContentValue(flyKeyLocalContentBundle());

  return {
    getContentVersion() {
      return cloneFlyKeyContentValue(getLocalBundle().meta || {});
    },

    getContentBundle() {
      return getLocalBundle();
    },

    getCachedContentBundle() {
      return cloneFlyKeyContentValue(readFlyKeyCachedContentBundle());
    },

    saveContentBundleToCache(bundle = getLocalBundle()) {
      return writeFlyKeyCachedContentBundle(bundle);
    },

    async syncContentFromApi() {
      const apiResult = await window.FlyKeyApiClient?.getContentBundle?.();

      if (apiResult?.status === "ok" && apiResult.data) {
        writeFlyKeyCachedContentBundle(apiResult.data);
        return {
          status: "updated",
          source: "api",
          bundle: cloneFlyKeyContentValue(apiResult.data)
        };
      }

      return {
        ...(apiResult || { status: "skipped", reason: "api-not-configured" }),
        bundle: getLocalBundle()
      };
    },

    getCacheKey() {
      return flyKeyContentCacheKey;
    }
  };
}

window.FlyKeyContentProvider = window.FlyKeyContentProvider || createFlyKeyContentProvider();
