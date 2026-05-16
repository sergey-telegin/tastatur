const privacyConsentStorageKey = "flykey-privacy-consent-v1";

const privacyConsentCopy = {
  ru: {
    title: "Конфиденциальность",
    text: "FlyKey использует Google Analytics, чтобы понимать, как развивается сайт. Аналитика включается только с вашего согласия.",
    accept: "Принять",
    reject: "Отклонить"
  },
  uk: {
    title: "Конфіденційність",
    text: "FlyKey використовує Google Analytics, щоб розуміти, як розвивається сайт. Аналітика вмикається лише з вашої згоди.",
    accept: "Прийняти",
    reject: "Відхилити"
  },
  kk: {
    title: "Құпиялылық",
    text: "FlyKey сайттың қалай дамып жатқанын түсіну үшін Google Analytics қолданады. Аналитика тек сіздің келісіміңізбен қосылады.",
    accept: "Қабылдау",
    reject: "Бас тарту"
  },
  en: {
    title: "Privacy",
    text: "FlyKey uses Google Analytics to understand how the site is used. Analytics is enabled only with your consent.",
    accept: "Accept",
    reject: "Decline"
  },
  de: {
    title: "Datenschutz",
    text: "FlyKey verwendet Google Analytics, um die Nutzung der Website zu verstehen. Analytics wird nur mit Ihrer Zustimmung aktiviert.",
    accept: "Akzeptieren",
    reject: "Ablehnen"
  }
};

function readPrivacyConsent() {
  try {
    return JSON.parse(localStorage.getItem(privacyConsentStorageKey)) || null;
  } catch {
    return null;
  }
}

function savePrivacyConsent(analytics) {
  try {
    localStorage.setItem(privacyConsentStorageKey, JSON.stringify({
      analytics: Boolean(analytics),
      updatedAt: new Date().toISOString()
    }));
  } catch {
    // Consent still applies for the current page when storage is unavailable.
  }
}

function updateAnalyticsConsent(analytics) {
  if (analytics && typeof window.loadFlyKeyAnalytics === "function") {
    window.loadFlyKeyAnalytics();
    return;
  }

  if (typeof gtag !== "function") return;

  gtag("consent", "update", {
    analytics_storage: "denied"
  });
}

function isLessonStoryboardUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.has("lessonStoryboard") ||
    params.has("roadmap") ||
    params.get("mode") === "roadmap" ||
    window.location.hash === "#lessonStoryboard" ||
    window.location.hash === "#roadmap" ||
    window.location.pathname.endsWith("/roadmap.html");
}

function privacyConsentLanguage() {
  if (typeof currentLanguage !== "undefined" && privacyConsentCopy[currentLanguage]) {
    return currentLanguage;
  }

  try {
    const savedLanguage = JSON.parse(localStorage.getItem("keyboard-layout-editor-v1"))?.currentLanguage;
    if (privacyConsentCopy[savedLanguage]) return savedLanguage;
  } catch {
    // Fall back to the browser language if saved settings are unavailable.
  }

  const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || navigator.userLanguage].filter(Boolean);

  for (const browserLanguage of browserLanguages) {
    const languageId = String(browserLanguage).toLowerCase().split("-")[0];
    if (privacyConsentCopy[languageId]) return languageId;
  }

  return "en";
}

function initializePrivacyConsent() {
  if (isLessonStoryboardUrl()) return;

  const banner = document.querySelector("#privacyConsent");
  const title = document.querySelector("#privacyConsentTitle");
  const text = document.querySelector("#privacyConsentText");
  const accept = document.querySelector("#privacyConsentAccept");
  const reject = document.querySelector("#privacyConsentReject");
  if (!banner || !title || !text || !accept || !reject) return;

  const activeDialogHost = () => {
    const openDialogs = Array.from(document.querySelectorAll("dialog[open]"));
    return openDialogs.at(-1) || document.body;
  };

  const mountConsentBanner = () => {
    const host = activeDialogHost();
    if (banner.parentElement !== host) {
      host.append(banner);
    }
  };

  const hideConsentBanner = () => {
    banner.hidden = true;
    banner.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("privacy-consent-active");
    if (banner.parentElement !== document.body) {
      document.body.append(banner);
    }
  };

  const savedConsent = readPrivacyConsent();
  if (savedConsent && typeof savedConsent.analytics === "boolean") {
    hideConsentBanner();
    updateAnalyticsConsent(savedConsent.analytics);
    return;
  }

  const applyPrivacyConsentCopy = () => {
    const copy = privacyConsentCopy[privacyConsentLanguage()];
    title.textContent = copy.title;
    text.textContent = copy.text;
    accept.textContent = copy.accept;
    reject.textContent = copy.reject;
  };

  applyPrivacyConsentCopy();
  window.addEventListener("flykey:languagechange", applyPrivacyConsentCopy);

  let consentResolved = false;
  let dialogObserver = null;

  const showConsentDialog = () => {
    if (consentResolved) return;
    mountConsentBanner();
    banner.hidden = false;
    banner.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("privacy-consent-active");
  };

  const queueConsentDialog = () => {
    requestAnimationFrame(() => setTimeout(showConsentDialog, 0));
  };

  const closeWithChoice = analytics => {
    if (consentResolved) return;
    consentResolved = true;
    dialogObserver?.disconnect();
    window.removeEventListener("flykey:languagechange", applyPrivacyConsentCopy);
    hideConsentBanner();
    savePrivacyConsent(analytics);
    try {
      updateAnalyticsConsent(analytics);
    } catch (error) {
      console.warn("FlyKey analytics consent update failed", error);
    }
  };

  const handleConsentChoice = analytics => event => {
    event.preventDefault();
    event.stopPropagation();
    closeWithChoice(analytics);
  };

  ["pointerdown", "click", "touchstart"].forEach(eventName => {
    accept.addEventListener(eventName, handleConsentChoice(true), { capture: true });
    reject.addEventListener(eventName, handleConsentChoice(false), { capture: true });
  });
  banner.addEventListener("click", event => {
    const button = event.target.closest?.("#privacyConsentAccept, #privacyConsentReject");
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    closeWithChoice(button === accept);
  });

  dialogObserver = new MutationObserver(mutations => {
    if (consentResolved) return;
    const openedAnotherDialog = mutations.some(mutation => (
      mutation.type === "attributes" &&
      mutation.attributeName === "open" &&
      mutation.target !== banner &&
      mutation.target?.tagName === "DIALOG" &&
      mutation.target.open
    ));

    if (openedAnotherDialog) queueConsentDialog();
  });

  dialogObserver.observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ["open"]
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      [80, 320, 900].forEach(delay => setTimeout(showConsentDialog, delay));
    });
  });
}

initializePrivacyConsent();
