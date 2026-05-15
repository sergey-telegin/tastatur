const privacyConsentStorageKey = "flykey-privacy-consent-v1";

const privacyConsentCopy = {
  ru: {
    title: "Конфиденциальность",
    text: "FlyKey использует Google Analytics, чтобы понимать, как развивается сайт. Аналитика включается только с вашего согласия.",
    accept: "Принять",
    reject: "Отклонить"
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

function privacyConsentLanguage() {
  if (typeof currentLanguage !== "undefined" && privacyConsentCopy[currentLanguage]) {
    return currentLanguage;
  }

  const browserLanguage = String(navigator.language || "").toLowerCase().split("-")[0];
  return privacyConsentCopy[browserLanguage] ? browserLanguage : "en";
}

function initializePrivacyConsent() {
  const banner = document.querySelector("#privacyConsent");
  const title = document.querySelector("#privacyConsentTitle");
  const text = document.querySelector("#privacyConsentText");
  const accept = document.querySelector("#privacyConsentAccept");
  const reject = document.querySelector("#privacyConsentReject");
  if (!banner || !title || !text || !accept || !reject) return;

  const savedConsent = readPrivacyConsent();
  if (savedConsent && typeof savedConsent.analytics === "boolean") {
    updateAnalyticsConsent(savedConsent.analytics);
    return;
  }

  const copy = privacyConsentCopy[privacyConsentLanguage()];
  title.textContent = copy.title;
  text.textContent = copy.text;
  accept.textContent = copy.accept;
  reject.textContent = copy.reject;

  const closeWithChoice = analytics => {
    savePrivacyConsent(analytics);
    updateAnalyticsConsent(analytics);
    if (typeof banner.close === "function" && banner.open) {
      banner.close();
    }
  };

  accept.addEventListener("click", () => closeWithChoice(true));
  reject.addEventListener("click", () => closeWithChoice(false));
  banner.addEventListener("cancel", event => {
    event.preventDefault();
    closeWithChoice(false);
  });

  const showConsentDialog = () => {
    if (banner.open) return;
    if (typeof banner.showModal === "function") {
      banner.showModal();
    } else {
      banner.setAttribute("open", "");
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(showConsentDialog, 80);
    });
  });
}

initializePrivacyConsent();
