export const BASE = import.meta.env.BASE_URL

export type CaseDetail = {
  id: string
  topic: string
  title: string
  tagline: string
  slides: number
  audience: string
  bullets: string[]
  gallery: string[]
  magnet?: { file: string; title: string }
  quiz?: { to: string; title: string }
}

// Готовые кейсы с раскрытием
export const caseDetails: CaseDetail[] = [
  {
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
    magnet: { file: 'agro-checklist', title: 'Чек-лист осмотра поля' },
    quiz: { to: '/quiz-agro', title: 'Тест «Где поле теряет урожай»' },
  },
  {
    id: 'horeca',
    topic: 'Кафе и рестораны',
    title: 'Меню, которое продаёт',
    tagline: 'Как поднять средний чек и заполнить будни, не трогая цены в прайсе',
    slides: 10,
    audience: 'Владельцы и управляющие заведений',
    bullets: [
      'Гость выбирает за 15–30 секунд — и меню должно успеть сработать',
      'Матрица меню: звёзды, загадки, рабочие лошадки и аутсайдеры',
      'Анатомия продающей позиции: название, описание, цена, якорь',
      'Тихие будни: поводы прийти вместо скидок',
      'Экономика возврата гостя и рост среднего чека',
    ],
    gallery: ['horeca-s03', 'horeca-s04', 'horeca-s05', 'horeca-s08'],
    magnet: { file: 'horeca-menu-audit', title: 'Чек-лист аудита меню' },
    quiz: { to: '/calc-horeca', title: 'Калькулятор выручки' },
  },
  {
    id: 'petfood',
    topic: 'Корма для животных',
    title: 'Миска, к которой возвращаются',
    tagline: 'Как превратить разовую покупку корма в постоянного покупателя',
    slides: 9,
    audience: 'Бренды кормов и зоомагазины',
    bullets: [
      'Экономика повторной покупки: деньги живут не в первой, а в пятой',
      'Разные мотивы первой и второй покупки — и что на них влияет',
      'Состав понятным языком вместо таблицы мелким шрифтом',
      'Путь от разовой покупки к регулярному заказу',
      'Форматы контента, которые доводят до второй покупки',
    ],
    gallery: ['petfood-s03', 'petfood-s05', 'petfood-s06', 'petfood-s07'],
    magnet: { file: 'petfood-guide', title: 'Гид по выбору корма' },
    quiz: { to: '/game-petfood', title: 'Мини-игра «Собери миску»' },
  },
]

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
  { id: 'horeca', topic: 'Кафе и рестораны', title: 'Меню, которое продаёт', desc: 'Средний чек и загрузка будней — через инженерию меню, а не скидки.', ready: true },
  { id: 'auto', topic: 'Автосервис', title: 'Запись без хаоса', desc: 'Как сервису собирать заявки со всех каналов и не терять клиентов.', ready: false },
  { id: 'tech', topic: 'Электроника', title: 'Карточка, которая продаёт', desc: 'Контент для магазина техники: описания, сравнения, подборки.', ready: false },
  { id: 'petfood', topic: 'Корма для животных', title: 'Миска, к которой возвращаются', desc: 'Как превратить разовую покупку корма в постоянного покупателя.', ready: true },
  { id: 'realty', topic: 'Недвижимость', title: 'Ключи быстрее', desc: 'Упаковка объекта: лендинг, презентация, показ.', ready: false },
]

export type Magnet = { id: string; topic: string; title: string; format: string; desc: string; ready: boolean }

export const magnets: Magnet[] = [
  { id: 'agro-checklist', topic: 'Агро', title: 'Осмотр поля перед обработкой', format: 'PDF · чек-лист', desc: '11 пунктов, которые агроном проверяет до выезда техники. Готов к печати на A4.', ready: true },
  { id: 'horeca-menu-audit', topic: 'Кафе и рестораны', title: 'Аудит меню за 20 минут', format: 'PDF · чек-лист', desc: '12 пунктов: структура, описания, цены и поводы. Проходится с меню в руках.', ready: true },
  { id: 'petfood-guide', topic: 'Корма для животных', title: 'Как выбрать корм питомцу', format: 'PDF · гид', desc: '11 вопросов до покупки: питомец, состав, покупка и переход на новый корм.', ready: true },
  { id: 'agro-calendar', topic: 'Агро', title: 'Календарь фаз и обработок на сезон', format: 'PDF · шаблон', desc: 'Готовая сетка: фаза — задача — препарат — срок.', ready: false },
]

export type Interactive = { title: string; desc: string; href?: string; to?: string; tag: string; ready: boolean }

export const interactives: Interactive[] = [
  { title: 'Где поле теряет урожай', desc: 'Тест для агронома: 6 вопросов — и понятно, какой фактор забирает центнеры.', to: '/quiz-agro', tag: 'Тест', ready: true },
  { title: 'Виральный тест', desc: '«Кто ты в хаосе рабочего дня» — 4 архетипа и шаринг в соцсети.', href: 'https://qa-novchenkova.github.io/puls/#/quiz', tag: 'Тест', ready: true },
  { title: 'Мини-игра', desc: '«Успей обработать лиды» — аркада на реакцию с рекордом.', href: 'https://qa-novchenkova.github.io/puls/#/game', tag: 'Игра', ready: true },
  { title: 'Собери правильную миску', desc: 'Мини-игра для зоо-бренда: ловим полезные ингредиенты, пропускаем пустые калории.', to: '/game-petfood', tag: 'Игра', ready: true },
  { title: 'Сколько приносит работа с меню', desc: 'Калькулятор для ресторатора: подставьте свои цифры и увидите прибавку за месяц и за год.', to: '/calc-horeca', tag: 'Калькулятор', ready: true },
]

// Баннеры (файлы в public/banners)
export type Banner = { id: string; topic: string; title: string; ratio: string }
export type BannerGroup = { format: string; size: string; cols: string; items: Banner[] }

// сгруппированы по формату: внутри группы карточки одного размера
export const bannerGroups: BannerGroup[] = [
  {
    format: 'Посты для соцсетей',
    size: '1080×1080',
    cols: 'sm:grid-cols-2 lg:grid-cols-4',
    items: [
      { id: 'agro-post-1080', topic: 'Агро', title: 'Чек-лист осмотра поля', ratio: '1/1' },
      { id: 'horeca-post-1080', topic: 'Кафе и рестораны', title: 'Аудит меню за 20 минут', ratio: '1/1' },
      { id: 'petfood-post-1080', topic: 'Корма для животных', title: 'Как выбрать корм питомцу', ratio: '1/1' },
    ],
  },
  {
    format: 'Веб-баннеры',
    size: '1200×628',
    cols: 'sm:grid-cols-2',
    items: [
      { id: 'agro-web-1200x628', topic: 'Агро', title: 'Поле недобирает?', ratio: '1200/628' },
    ],
  },
  {
    format: 'Сторис',
    size: '1080×1920',
    cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    items: [
      { id: 'horeca-story-1080x1920', topic: 'Кафе и рестораны', title: 'Будни пустые?', ratio: '9/16' },
    ],
  },
]
