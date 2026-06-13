(function () {
  const routeDefinitions = {
    home: {
      id: "home",
      path: "/"
    },
    "trainer.lesson": {
      id: "trainer.lesson",
      path: "/learn/:language/:lessonId",
      params: ["language", "lessonId"]
    },
    "trainer.custom": {
      id: "trainer.custom",
      path: "/practice/custom/:language",
      params: ["language"]
    },
    "trainer.random": {
      id: "trainer.random",
      path: "/practice/random/:language",
      params: ["language"]
    },
    settings: {
      id: "settings",
      path: "/settings"
    },
    "settings.learningProgram": {
      id: "settings.learningProgram",
      path: "/settings/learning-program/:language",
      params: ["language"]
    },
    "settings.fingering": {
      id: "settings.fingering",
      path: "/settings/fingering/:language",
      params: ["language", "keyId", "fingerId"]
    },
    "settings.stats": {
      id: "settings.stats",
      path: "/stats/:language",
      params: ["language"]
    },
    help: {
      id: "help",
      path: "/help"
    },
    mobileGame: {
      id: "mobileGame",
      path: "/game/flykey-jump/:language?",
      params: ["language", "gameId"]
    }
  };

  const routeIds = Object.freeze(Object.fromEntries(
    Object.keys(routeDefinitions).map(id => [id.replace(/\./g, "_").toUpperCase(), id])
  ));

  window.FlyKeyRoutes = {
    definitions: Object.freeze(routeDefinitions),
    ids: routeIds
  };
})();
