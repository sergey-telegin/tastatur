# Refactor Plan

## Что это за файл

Это короткий рабочий план проекта после большого рефакторинга.

Задача этого файла:

- быстро понять, что уже сделано
- быстро понять, что ещё осталось
- не пересобирать весь контекст заново, если чат сбросится

---

## Главная цель

Уйти от одного огромного `index.html` к более понятной структуре:

- `state` — текущее состояние приложения
- `storage` — сохранение в `localStorage`
- `views` — отрисовка интерфейса
- `controllers` — поведение и склейка
- `utils` — чистые вспомогательные функции

Итог: код должен быть проще читать, поддерживать и менять без страха случайно сломать всё сразу.

---

## Что уже сделано

### Контент

- [x] Тексты тренажёра вынесены из `index.html` в `practice-content.js`
- [x] Структура контента приведена к формату “сначала язык, потом модули”

### Состояние и хранение

- [x] Runtime state вынесен в `app/state.js`
- [x] Persistence вынесен в `app/storage.js`

### Practice

- [x] Логика тренажёра вынесена в `app/controllers/practice-controller.js`
- [x] Отрисовка тренажёра вынесена в `app/views/practice-view.js`
- [x] Key helpers вынесены в `app/utils/keymap.js`

### Finger Map

- [x] Логика аппликатуры вынесена в `app/controllers/fingering-controller.js`
- [x] UI аппликатуры вынесен в `app/views/fingering-view.js`
- [x] Чистые helpers для finger map вынесены в `app/utils/finger-map.js`
- [x] После рефакторинга стабилизирован старт режима печати через усиленный возврат фокуса в поле ввода

### Keyboard

- [x] `renderKeyboard()` вынесен в `app/views/keyboard-view.js`
- [x] Keyboard-specific helpers тоже вынесены туда:
  - подписи клавиш
  - выбор клавиши
  - сцена клавиатуры
  - калибровка положения рук

### Settings

- [x] Рендер настроек вынесен в `app/views/settings-view.js`
- [x] Логика настроек вынесена в `app/controllers/settings-controller.js`

### App Bootstrap

- [x] Общая склейка приложения вынесена в `app/controllers/app-controller.js`
- [x] Event wiring, старт приложения и общий `render()` больше не сидят в `index.html`

---

## Текущая структура проекта

```text
/
  index.html
  practice-content.js
  REFACTOR_PLAN.md
  app/
    state.js
    storage.js
    controllers/
      app-controller.js
      settings-controller.js
      practice-controller.js
      fingering-controller.js
    views/
      keyboard-view.js
      practice-view.js
      settings-view.js
      fingering-view.js
    utils/
      keymap.js
      finger-map.js
```

---

## Что ещё осталось сделать

Это уже не обязательный structural refactor, а следующий слой работы.

### 0. Уменьшить `index.html`

Это теперь отдельная явная цель.

Нормальное состояние:

- `index.html` — маленький shell-файл
- внутри только:
  - базовая HTML-разметка
  - подключение CSS и JS
  - минимум стартового кода

Что ещё можно вынести именно из `index.html`:

- статические данные в `app/data.js`:
  - `languages`
  - `geometry`
  - `defaultFingerMap`
  - `fixedHandCalibrationPx`
  - `uiText`
- общие helper-функции в отдельные модули:
  - `textFor()`
  - `keyIds()`
  - `fingerName()`
  - `visibleKeyLabel()`
- DOM bootstrap в отдельный слой:
  - все `document.querySelector(...)`
  - возможно в `app/dom.js` или `app/bootstrap/dom.js`
- SVG-гидрацию рук:
  - `refreshFingerNodes()`
  - `hydrateFingerSvgs()`
- оставшиеся UI-константы и shared wiring, если они ещё всплывут при cleanup

Что должно остаться в `index.html` после следующей волны:

- HTML-структура страницы
- встроенный CSS или ссылка на CSS
- подключения `practice-content.js` и модулей `app/*`
- одна стартовая точка вроде `initializeApp()`

### 1. Cleanup

Нужно:

- пройтись по `index.html`
- посмотреть, что там ещё осталось из “старого мира”
- подчистить хвосты, которые уже логичнее держать в отдельных файлах

Примеры:

- крупные статические данные
- остаточные helper-функции
- повторяющиеся куски инициализации

### 2. Data extraction

Есть смысл вынести в отдельный `app/data.js`:

- `languages`
- `geometry`
- `defaultFingerMap`
- `fixedHandCalibrationPx`
- `uiText`

Это не срочно, но сделает проект ещё чище.

### 3. Verification pass

Перед следующим большим коммитом стоит отдельно проверить:

- режим печати
- режим аппликатуры
- настройки
- переключение языков
- переключение модулей
- сохранение и восстановление через `localStorage`

### 4. Polish

После проверки можно:

- привести названия файлов и функций к единому стилю
- убрать мелкие остаточные зависимости между модулями
- написать короткую техническую заметку о структуре проекта

---

## Что сейчас не нужно делать

Пока не нужно:

- переписывать всё заново
- делать “идеальный MVC”
- смешивать cleanup с новыми фичами в одном большом изменении

Сейчас важнее:

- держать проект стабильным
- не потерять рабочее поведение
- двигаться маленькими безопасными шагами

---

## Текущий статус

Структурный рефакторинг первой волны завершён.

Сейчас проект находится в стадии:

- `architecture done`
- `cleanup / verification / polish next`

---

## Следующий рекомендуемый шаг

Лучший следующий шаг:

1. сделать короткий `cleanup` `index.html`
2. вынести данные в `app/data.js`
3. после этого вынести общие helpers / DOM bootstrap
4. потом сделать `verification pass`

---

## Для следующей сессии

Если чат сбросится, начинать нужно не с нового большого анализа, а с этого:

- прочитать этот файл
- считать основную архитектурную фазу завершённой
- следующим шагом брать `verification + cleanup`
