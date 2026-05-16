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

  let consentResolved = false;
  let dialogObserver = null;

  const showConsentDialog = () => {
    if (consentResolved) return;
    document.documentElement.classList.add("privacy-consent-active");

    if (typeof banner.showModal === "function") {
      try {
        if (banner.open) banner.close();
        banner.showModal();
        return;
      } catch {
        // Fall through to the non-modal fallback if the browser refuses showModal.
      }
    }

    banner.setAttribute("open", "");
  };

  const queueConsentDialog = () => {
    requestAnimationFrame(() => setTimeout(showConsentDialog, 0));
  };

  const closeWithChoice = analytics => {
    consentResolved = true;
    dialogObserver?.disconnect();
    savePrivacyConsent(analytics);
    updateAnalyticsConsent(analytics);
    document.documentElement.classList.remove("privacy-consent-active");
    if (typeof banner.close === "function" && banner.open) {
      banner.close();
    } else {
      banner.removeAttribute("open");
    }
  };

  accept.addEventListener("click", () => closeWithChoice(true));
  reject.addEventListener("click", () => closeWithChoice(false));
  banner.addEventListener("cancel", event => {
    event.preventDefault();
    closeWithChoice(false);
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
