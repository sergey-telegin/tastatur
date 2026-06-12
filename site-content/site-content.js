module.exports = {
  brand: {
    name: "FlyKey",
    supportEmail: "support@flykey.org",
    websiteUrl: "https://flykey.org/",
    supportUrl: "https://flykey.org/support.html",
    privacyUrl: "https://flykey.org/privacy.html"
  },
  appStore: {
    appName: "FlyKey",
    subtitle: "Calm touch typing trainer",
    bundleId: "org.flykey.app",
    sku: "flykey-macos",
    primaryCategory: "Education",
    secondaryCategory: "Productivity",
    ageRating: "4+",
    copyright: "2026 Sergey Telegin",
    promotionalText: "Learn touch typing with gentle lessons, finger hints, custom fingering, local progress, and support for five keyboard layouts.",
    description: [
      "FlyKey is a calm touch typing trainer for macOS. It helps you build real keyboard movement step by step instead of throwing you into random symbols.",
      "The app supports Russian, Ukrainian, Kazakh, German, and English keyboard layouts. Lessons start with the home row and gradually add both hands, short words, upper and lower rows, Shift, punctuation, rhythm, and longer practice.",
      "FlyKey shows the on-screen keyboard, finger zones, finger hints, press highlights, accuracy, speed, and progress. You can turn assistants on or off, change the text size, switch between light and dark themes, adjust sound, and customize which finger presses each key.",
      "The learning program includes structured lessons and tests. Test lessons can reduce hints so you can see which movements are already automatic and which still need practice.",
      "When you want to practice outside the lesson program, you can paste your own text and tune the session settings.",
      "The Mac App Store version is local-first. It does not require an account, does not include analytics, and stores progress and settings locally on your Mac."
    ],
    keywords: "typing,touch typing,keyboard,trainer,blind typing,fingers,lessons,macOS,education",
    whatsNew: "Initial Mac App Store release.",
    reviewNotes: "FlyKey is a local-first macOS typing trainer. No account is required. Analytics and web-only SEO content are disabled in the Mac App Store build. Progress, settings, and custom text remain local to the user's Mac.",
    privacyAnswers: [
      ["Data collected", "No"],
      ["Tracking", "No"],
      ["Third-party advertising", "No"],
      ["Analytics", "No"],
      ["Account creation", "No"],
      ["User-generated text leaves device", "No"]
    ],
    privacyExplanation: "the Mac App Store build disables analytics and cloud/account features by default. Lesson progress, app settings, custom practice text, selected language, theme, and finger map are stored locally on device.",
    screenshotSizes: ["1280 x 800", "1440 x 900", "2560 x 1600", "2880 x 1800"]
  },
  seo: {
    navLabel: "About FlyKey",
    nav: [
      ["#seo-custom-layout", "Fingering"],
      ["#seo-assistants", "Assistants"],
      ["#seo-lessons", "Lessons and tests"],
      ["#seo-character", "Tips"],
      ["#seo-practice", "Your texts"],
      ["#seo-faq-title", "FAQ"]
    ],
    eyebrow: "Online touch typing trainer",
    title: "FlyKey - a touch typing trainer you can adapt to yourself",
    lead: "FlyKey helps you learn touch typing without harsh pressure: the trainer shows the keyboard, fingers, responsibility zones, current accuracy, and speed, then gradually removes extra hints where the real skill needs to be checked.",
    summaryLabel: "Key FlyKey features",
    summary: [
      ["5 layouts", "Russian, Ukrainian, Kazakh, German, and English keyboards in one trainer."],
      ["Custom fingering", "You can change which finger presses each key and save your own map."],
      ["Optional assistants", "Key, finger, zone, and press highlights can be turned on and off manually."],
      ["Tests without hints", "Check lessons can disable assistants to measure real movement memory."]
    ],
    articles: [
      {
        id: "seo-custom-layout",
        title: "Fingering is not nailed to one rule",
        paragraphs: [
          "Many trainers assume one finger scheme for everyone. FlyKey is softer: there is a standard map, but you can change it. If a key feels uncomfortable, open fingering setup, choose a finger, and assign keys directly on the on-screen keyboard.",
          "This helps with different keyboards, nonstandard habits, smaller hands, or keys that feel unpleasant to reach. The trainer does not force the hand into an abstract rule; it helps find a stable scheme."
        ]
      },
      {
        id: "seo-assistants",
        title: "Assistants help without getting in the way",
        paragraphs: [
          "In FlyKey you can separately control key highlights, finger zones, finger highlights, press highlights, hand display, every-other-line mode, and the metronome. A beginner can keep more support, then turn part of it off.",
          "Test lessons can turn assistants off automatically. That is intentional: if hints are always visible, it is easy to look at them instead of remembering the movement."
        ]
      },
      {
        id: "seo-lessons",
        title: "The program moves from simple to real typing",
        paragraphs: [
          "Lessons start with the home position and gradually add hands, short words, top and bottom rows, Shift, numbers, punctuation, rhythm, and longer texts. Each lesson has a goal for lines, accuracy, and sometimes speed or rhythm.",
          "The user understands why the next module matters, sees progress, and passes check stages. FlyKey feels more like a calm learning program than an endless field of symbols."
        ]
      },
      {
        id: "seo-character",
        title: "The character explains why the exercise matters",
        paragraphs: [
          "The trainer has a helper character. It appears in the welcome flow, before lessons, after completion, and when moving to the next module. Its job is short human context, not decoration.",
          "Touch typing errors often come from tension, extra movement, or trying to type faster than the motor skill is ready for. Tips make practice softer."
        ]
      },
      {
        id: "seo-practice",
        title: "Practice is not limited to lessons",
        paragraphs: [
          "Beyond the learning program, FlyKey supports text practice. You can paste your own text, choose a line count, enable random text, and tune assistants for that session.",
          "Progress, settings, selected language, finger map, theme, sound, and text size are saved locally in the browser."
        ]
      }
    ],
    faqTitle: "Questions about FlyKey",
    faq: [
      ["How is FlyKey different from a regular typing trainer?", "FlyKey focuses on gentle learning: finger hints, customizable fingering, character tips, metronome, tests without assistants, and support for multiple layouts."],
      ["Can I change which finger presses a key?", "Yes. In fingering setup, you can choose a finger and assign keys directly on the on-screen keyboard."],
      ["Can I turn hints off?", "Yes. You control key highlights, fingers, zones, press highlights, hand display, and the metronome. Test lessons can also turn assistants off automatically."],
      ["Which layouts are supported?", "Russian, Ukrainian, Kazakh, German, and English layouts."],
      ["Do I need an account?", "No account is required for basic practice. Settings and progress are saved locally in the browser."]
    ]
  },
  legal: {
    lastUpdated: "May 29, 2026",
    privacy: {
      title: "FlyKey Privacy Policy",
      description: "Privacy Policy for the FlyKey macOS app.",
      intro: "FlyKey is a touch typing trainer for the web and macOS. The Mac App Store version is designed to work locally on your Mac by default. The website may offer optional account and sync features when a production FlyKey backend is enabled.",
      sections: [
        ["Data stored locally", "FlyKey may store your selected language, theme, text size, sound setting, finger map, lesson progress, practice statistics, custom practice text, and other app preferences locally on your device. This local data is used to remember your settings and progress between sessions."],
        ["Mac App Store version", "The current Mac App Store version is local-first. It does not require an account, does not include third-party analytics, and does not send your typing practice, progress, settings, or custom text to FlyKey servers unless cloud features are explicitly enabled in a future release."],
        ["Accounts and cloud sync", "If you create a FlyKey account on the website, FlyKey may store your email address, password hash, session records, device metadata such as platform and app version, entitlements, profile names, synced settings, finger maps, lesson progress, and practice state. Passwords are stored only as hashes. Refresh tokens are stored only as hashes."],
        ["OAuth sign-in", "If you sign in with Google, Apple, or Microsoft, the provider may send FlyKey your provider account identifier, email address, and display name. FlyKey uses this information only to create or connect your FlyKey account."],
        ["Account deletion", "You can delete your FlyKey account through the account deletion API or by contacting support. Account deletion removes the account and associated profile sync data from the active application database, subject to backup retention and legal/security requirements."],
        ["Data collection", "FlyKey does not sell personal data. The Mac App Store app does not include third-party analytics. Website analytics, if enabled, are shown with consent controls on the website."],
        ["Website analytics", "The FlyKey website may offer optional analytics with consent. This does not apply to the Mac App Store app, where analytics is disabled."],
        ["Contact", "For privacy or support questions, contact support@flykey.org."]
      ]
    },
    support: {
      title: "FlyKey Support",
      description: "Support information for FlyKey.",
      intro: "FlyKey is a macOS touch typing trainer for Russian, Ukrainian, Kazakh, German, and English keyboard layouts.",
      sections: [
        ["Contact", "For support, feedback, or privacy questions, email support@flykey.org."],
        ["Before contacting support", [
          "Check that you are using the latest App Store version.",
          "Include your macOS version and FlyKey app version.",
          "If the issue is about a lesson, include the language and lesson number."
        ]],
        ["Privacy", "Read the FlyKey Privacy Policy."]
      ]
    }
  }
};
