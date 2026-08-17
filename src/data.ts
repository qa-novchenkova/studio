export const BASE = import.meta.env.BASE_URL

// Готовый кейс: агро-презентация
export const agroDeck = {
  id: 'agro',
  topic: 'Сельское хозяйство',
  title: 'Поле недобирает',
  tagline: 'Где теряются центнеры и как их вернуть программой защиты и питания по фазам',
  slides: 10,
  audience: 'Агрономы и руководители хозяйств',
  bullets: [
    'Разрыв между потенциалом сорта и фактическим урожаем — в цифрах',
    'Четыре канала потерь: сорняки, болезни, вредители, дефицит питания',
    'Фазы развития культуры и окна вмешательства',
    'Программа сезона: от протравливания семян до защиты колоса',
    'Зонирование поля и экономика прибавки',
  ],
  gallery: ['agro-s03', 'agro-s04', 'agro-s05', 'agro-s08'],
}

// Направления студии — для бегущей строки под первым экраном
export type Direction = { icon: 'doc' | 'download' | 'motion' | 'target' | 'play' | 'layout' | 'image' | 'chart' | 'pen'; label: string; note: string }

export const directions: Direction[] = [
  { icon: 'doc', label: 'Презентации', note: 'PPTX и HTML' },
  { icon: 'download', label: 'Лид-магниты', note: 'чек-листы, гайды' },
  { icon: 'motion', label: 'SVG-анимации', note: 'живая графика' },
  { icon: 'target', label: 'Квизы и тесты', note: 'вовлечение' },
  { icon: 'play', label: 'Мини-игры', note: 'браузерные' },
  { icon: 'layout', label: 'Лендинги', note: 'страницы под оффер' },
  { icon: 'image', label: 'Баннеры', note: 'соцсети и веб' },
  { icon: 'chart', label: 'Инфографика', note: 'цифры наглядно' },
  { icon: 'pen', label: 'Тексты', note: 'копирайт под нишу' },
]

// Кейсы для карусели
export type CaseItem = { id: string; topic: string; title: string; desc: string; ready: boolean }

export const cases: CaseItem[] = [
  { id: 'agro', topic: 'Сельское хозяйство', title: 'Поле недобирает', desc: 'Питч-дек для агронома: где теряются центнеры и как их вернуть.', ready: true },
  { id: 'auto', topic: 'Автосервис', title: 'Запись без хаоса', desc: 'Как сервису собирать заявки со всех каналов и не терять клиентов.', ready: false },
  { id: 'tech', topic: 'Электроника', title: 'Карточка, которая продаёт', desc: 'Контент для магазина техники: описания, сравнения, подборки.', ready: false },
  { id: 'petfood', topic: 'Корма для животных', title: 'Здоровье в миске', desc: 'Экспертный контент о питании питомцев и повторные продажи.', ready: false },
  { id: 'horeca', topic: 'HoReCa', title: 'Полный зал в будни', desc: 'Меню, поводы и события, которые заполняют тихие дни.', ready: false },
  { id: 'realty', topic: 'Недвижимость', title: 'Ключи быстрее', desc: 'Упаковка объекта: лендинг, презентация, показ.', ready: false },
]

export type Magnet = { id: string; topic: string; title: string; format: string; desc: string; ready: boolean }

export const magnets: Magnet[] = [
  { id: 'agro-checklist', topic: 'Агро', title: 'Осмотр поля перед обработкой', format: 'PDF · чек-лист', desc: '11 пунктов, которые агроном проверяет до выезда техники. Готов к печати на A4.', ready: true },
  { id: 'agro-calendar', topic: 'Агро', title: 'Календарь фаз и обработок на сезон', format: 'PDF · шаблон', desc: 'Готовая сетка: фаза — задача — препарат — срок.', ready: false },
  { id: 'agro-econ', topic: 'Агро', title: 'Как посчитать цену недобора урожая', format: 'PDF · гайд', desc: 'Простая формула: центнеры → рубли → решение.', ready: false },
]

export type Interactive = { title: string; desc: string; href?: string; to?: string; tag: string; ready: boolean }

export const interactives: Interactive[] = [
  { title: 'Где поле теряет урожай', desc: 'Тест для агронома: 6 вопросов — и понятно, какой фактор забирает центнеры.', to: '/quiz-agro', tag: 'Тест', ready: true },
  { title: 'Виральный тест', desc: '«Кто ты в хаосе рабочего дня» — 4 архетипа и шаринг в соцсети.', href: 'https://qa-novchenkova.github.io/puls/#/quiz', tag: 'Тест', ready: true },
  { title: 'Мини-игра', desc: '«Успей обработать лиды» — аркада на реакцию с рекордом.', href: 'https://qa-novchenkova.github.io/puls/#/game', tag: 'Игра', ready: true },
  { title: 'Калькулятор недобора', desc: 'Считает потери в центнерах и рублях по вводным поля.', tag: 'Калькулятор', ready: false },
]
