function localizedContentText(value, language) {
  if (!value || typeof value !== "object") return value || "";
  return value[language] || value.en || value.ru || Object.values(value)[0] || "";
}

function localizedContentList(value, language) {
  const localized = Array.isArray(value)
    ? value
    : value?.[language] || value?.en || value?.ru || [];
  if (!Array.isArray(localized)) return localized ? [localized] : [];
  return localized.filter(Boolean);
}

function contentLessonLines(lesson, language) {
  const lines = lesson.lines?.[language] || lesson.lines?.en || lesson.lines?.ru || [];
  if (Array.isArray(lines) && lines.length) return lines;

  const fallback = localizedContentText(lesson.title, language) || lesson.id;
  const count = Math.max(lesson.target?.lines || 10, 10);
  return Array.from({ length: count }, () => fallback);
}

const defaultLessonCompletionText = {
  ru: "Отлично. Молодец. Идём дальше.",
  de: "Ausgezeichnet. Gut gemacht. Weiter geht's.",
  en: "Excellent. Well done. Let's keep going."
};

function contentLessonCompletion(lesson, language) {
  const text = localizedContentText(lesson.completion, language)
    || defaultLessonCompletionText[language]
    || defaultLessonCompletionText.en;
  return { text };
}

function buildPracticeContentForLanguage(source, language) {
  const modules = {};
  const moduleGroups = source.modules.map(module => ({
      id: module.id,
      title: localizedContentText(module.title, language),
      symbols: module.symbols || {},
      lessons: module.lessons.map(lesson => {
        const normalizedLesson = {
          id: lesson.id,
          moduleId: module.id,
          symbolPolicy: lesson.symbolPolicy || {},
          customPractice: lesson.customPractice || null,
          name: localizedContentText(lesson.title, language),
          description: localizedContentText(lesson.description, language),
          tips: localizedContentList(lesson.tips, language),
          completion: contentLessonCompletion(lesson, language),
          target: lesson.target || {},
          lines: contentLessonLines(lesson, language)
        };

        modules[lesson.id] = normalizedLesson;
        return normalizedLesson;
      })
    }));

  return {
    moduleGroups,
    modules,
    grades: source.grades[language] || source.grades.en || []
  };
}

function buildPracticeContent() {
  const source = window.PRACTICE_CONTENT_SOURCE;
  const languages = source.languages || ["ru", "de", "en"];

  window.PRACTICE_CONTENT = {};
  languages.forEach(language => {
    window.PRACTICE_CONTENT[language] = buildPracticeContentForLanguage(source, language);
  });
}

buildPracticeContent();
