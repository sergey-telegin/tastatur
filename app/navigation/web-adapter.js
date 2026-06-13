(function () {
  const privateQueryFlags = [
    "lessonStoryboard",
    "roadmap",
    "previewWelcome",
    "freshUser",
    "calibrateHands"
  ];

  const privateHashes = new Set(["#lessonStoryboard", "#roadmap"]);

  function isPrivateNavigationUrl(url = window.location) {
    const params = new URLSearchParams(url.search || "");
    return privateQueryFlags.some(flag => params.has(flag)) || privateHashes.has(url.hash || "");
  }

  function supportedLanguages() {
    const languageMap = typeof languages !== "undefined" ? languages : window.languages;
    return Object.keys(languageMap || {});
  }

  function fallbackLanguage() {
    if (typeof currentLanguage !== "undefined" && supportedLanguages().includes(currentLanguage)) {
      return currentLanguage;
    }
    return supportedLanguages()[0] || "en";
  }

  function normalizeLanguage(language) {
    return supportedLanguages().includes(language) ? language : fallbackLanguage();
  }

  function cleanPathname(pathname) {
    const path = pathname || "/";
    if (path === "/index.html" || path.endsWith("/index.html")) return "/";
    return path.replace(/\/+$/, "") || "/";
  }

  function parseRouteFromLocation(location = window.location) {
    const path = cleanPathname(location.pathname);
    const segments = path.split("/").filter(Boolean).map(decodeURIComponent);

    if (segments.length === 0) {
      return { id: "home", params: {}, query: Object.fromEntries(new URLSearchParams(location.search || "")) };
    }

    if (segments[0] === "settings" && segments.length === 1) {
      return { id: "settings", params: {}, query: {} };
    }

    if (segments[0] === "settings" && segments[1] === "learning-program") {
      return {
        id: "settings.learningProgram",
        params: { language: normalizeLanguage(segments[2]) },
        query: {}
      };
    }

    if (segments[0] === "stats") {
      return {
        id: "settings.stats",
        params: { language: normalizeLanguage(segments[1]) },
        query: {}
      };
    }

    if (segments[0] === "help" && segments.length === 1) {
      return { id: "help", params: {}, query: {} };
    }

    return { id: "home", params: {}, query: {} };
  }

  function pathForRoute(route) {
    const language = normalizeLanguage(route?.params?.language);

    if (route.id === "settings") return "/settings";
    if (route.id === "settings.learningProgram") return `/settings/learning-program/${encodeURIComponent(language)}`;
    if (route.id === "settings.stats") return `/stats/${encodeURIComponent(language)}`;
    if (route.id === "help") return "/help";
    return "/";
  }

  function historyDepth() {
    return Number(history.state?.flykeyDepth || 0);
  }

  function routeState(route, depth) {
    return {
      ...(history.state || {}),
      flykeyRoute: route,
      flykeyDepth: depth
    };
  }

  function createWebAdapter() {
    let router = null;
    const syncHistory = window.location.protocol === "http:" || window.location.protocol === "https:";

    function writeRoute(route, { mode = "push" } = {}) {
      if (!syncHistory) return;
      if (isPrivateNavigationUrl()) return;

      const path = pathForRoute(route);
      const depth = mode === "push" ? historyDepth() + 1 : historyDepth();
      const state = routeState(route, depth);

      if (mode === "push") {
        history.pushState(state, "", path);
      } else {
        history.replaceState(state, "", path);
      }
    }

    function goBack() {
      if (syncHistory && historyDepth() > 0) {
        history.back();
        return;
      }
      router?.replaceRoute({ id: "home" });
    }

    function closeCurrentRoute() {
      goBack();
    }

    function bind(nextRouter) {
      router = nextRouter;

      if (isPrivateNavigationUrl()) {
        router.replaceRoute({ id: "home" });
        return;
      }

      const initialRoute = parseRouteFromLocation(window.location);
      if (!syncHistory) {
        router.restoreRoute(initialRoute);
        return;
      }

      const initialPath = pathForRoute(initialRoute);
      history.replaceState(routeState(initialRoute, historyDepth()), "", initialPath);
      router.restoreRoute(initialRoute);

      window.addEventListener("popstate", () => {
        const route = history.state?.flykeyRoute || parseRouteFromLocation(window.location);
        router.restoreRoute(route);
      });
    }

    return {
      bind,
      writeRoute,
      goBack,
      closeCurrentRoute
    };
  }

  function closeDialogIfOpen(dialog) {
    if (dialog?.open) dialog.close();
  }

  function setRouteLanguage(language) {
    const nextLanguage = normalizeLanguage(language);
    const activeLanguage = typeof currentLanguage !== "undefined" ? currentLanguage : "";
    const activeModule = typeof currentPracticeModule !== "undefined" ? currentPracticeModule : "";
    if (!nextLanguage || nextLanguage === activeLanguage) return;
    window.applySettings?.({ language: nextLanguage, module: activeModule });
  }

  function renderRoute(route) {
    const id = route?.id || "home";
    const settingsDialogElement = document.getElementById("settingsDialog");
    const learningProgramDialogElement = document.getElementById("learningProgramDialog");
    const statsDialogElement = document.getElementById("statsDialog");
    const helpDialogElement = document.getElementById("helpDialog");

    if (id === "settings.learningProgram") {
      setRouteLanguage(route.params?.language);
      closeDialogIfOpen(statsDialogElement);
      closeDialogIfOpen(helpDialogElement);
      window.openLearningProgramDialog?.();
      return;
    }

    if (id === "settings.stats") {
      setRouteLanguage(route.params?.language);
      closeDialogIfOpen(learningProgramDialogElement);
      closeDialogIfOpen(helpDialogElement);
      window.openStatsDialog?.();
      return;
    }

    if (id === "settings") {
      closeDialogIfOpen(learningProgramDialogElement);
      closeDialogIfOpen(statsDialogElement);
      closeDialogIfOpen(helpDialogElement);
      window.openSettingsDialog?.();
      return;
    }

    if (id === "help") {
      closeDialogIfOpen(settingsDialogElement);
      closeDialogIfOpen(learningProgramDialogElement);
      closeDialogIfOpen(statsDialogElement);
      window.openHelpDialog?.();
      return;
    }

    closeDialogIfOpen(settingsDialogElement);
    closeDialogIfOpen(learningProgramDialogElement);
    closeDialogIfOpen(statsDialogElement);
    closeDialogIfOpen(helpDialogElement);
  }

  function initializeWebNavigation() {
    const adapter = createWebAdapter();
    const router = window.FlyKeyNavigationCore.createRouter({ renderRoute, adapter });
    window.FlyKeyNavigation = router;
    adapter.bind(router);
    return router;
  }

  window.FlyKeyWebNavigation = {
    initialize: initializeWebNavigation,
    parseRouteFromLocation,
    pathForRoute,
    isPrivateNavigationUrl
  };
})();
