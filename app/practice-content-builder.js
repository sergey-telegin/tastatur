function localizedContentText(value, language) {
  if (!value || typeof value !== "object") return value || "";
  return value[language] || value.en || value.ru || Object.values(value)[0] || "";
}

function contentLessonLines(lesson, language) {
  const lines = lesson.lines?.[language] || lesson.lines?.en || lesson.lines?.ru || [];
  if (Array.isArray(lines) && lines.length) return lines;

  const fallback = localizedContentText(lesson.title, language) || lesson.id;
  const count = Math.max(lesson.target?.lines || 10, 10);
  return Array.from({ length: count }, () => fallback);
}

function buildPracticeContentForLanguage(source, language) {
  const modules = {};
  const moduleGroups = source.modules.map(module => ({
      id: module.id,
      title: localizedContentText(module.title, language),
      lessons: module.lessons.map(lesson => {
        const normalizedLesson = {
          id: lesson.id,
          moduleId: module.id,
          name: localizedContentText(lesson.title, language),
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
