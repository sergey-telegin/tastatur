(function () {
  function cloneRoute(route) {
    return {
      id: route?.id || "home",
      params: { ...(route?.params || {}) },
      query: { ...(route?.query || {}) },
      mode: route?.mode || "push"
    };
  }

  function createRouter({ renderRoute, adapter } = {}) {
    let currentRoute = { id: "home", params: {}, query: {}, mode: "replace" };
    let isRendering = false;

    function setRoute(route, { mode = "push", fromAdapter = false } = {}) {
      const nextRoute = cloneRoute({ ...route, mode });
      currentRoute = nextRoute;

      if (!fromAdapter && adapter?.writeRoute) {
        adapter.writeRoute(nextRoute, { mode });
      }

      isRendering = true;
      try {
        renderRoute?.(nextRoute);
      } finally {
        isRendering = false;
      }

      window.dispatchEvent(new CustomEvent("flykey:routechange", { detail: { route: cloneRoute(nextRoute) } }));
      return nextRoute;
    }

    function navigate(route) {
      return setRoute(route, { mode: "push" });
    }

    function replaceRoute(route) {
      return setRoute(route, { mode: "replace" });
    }

    function restoreRoute(route) {
      return setRoute(route, { mode: "restore", fromAdapter: true });
    }

    function goBack() {
      if (adapter?.goBack) {
        adapter.goBack();
        return;
      }
      replaceRoute({ id: "home" });
    }

    function closeCurrentRoute() {
      if (adapter?.closeCurrentRoute) {
        adapter.closeCurrentRoute(currentRoute);
        return;
      }
      replaceRoute({ id: "home" });
    }

    function handleRouteDialogClosed(routeIds = []) {
      if (isRendering) return;
      if (!routeIds.includes(currentRoute.id)) return;
      closeCurrentRoute();
    }

    return {
      currentRoute: () => cloneRoute(currentRoute),
      navigate,
      replaceRoute,
      restoreRoute,
      goBack,
      closeCurrentRoute,
      handleRouteDialogClosed
    };
  }

  window.FlyKeyNavigationCore = {
    createRouter
  };
})();
