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

// Ниши в работе — без «пустых» карточек, просто честный список
export const upcoming = [
  'Автомобили и автосервис',
  'Техника и электроника',
  'Корма для животных',
  'HoReCa',
  'Недвижимость',
]

export type Magnet = { id: string; topic: string; title: string; format: string; desc: string; ready: boolean }

export const magnets: Magnet[] = [
  { id: 'agro-checklist', topic: 'Агро', title: 'Чек-лист осмотра поля перед обработкой', format: 'PDF · чек-лист', desc: '11 пунктов, которые агроном проверяет до выезда техники.', ready: false },
  { id: 'agro-calendar', topic: 'Агро', title: 'Календарь фаз и обработок на сезон', format: 'PDF · шаблон', desc: 'Готовая сетка: фаза — задача — препарат — срок.', ready: false },
  { id: 'agro-econ', topic: 'Агро', title: 'Как посчитать цену недобора урожая', format: 'PDF · гайд', desc: 'Простая формула: центнеры → рубли → решение.', ready: false },
]

export type Interactive = { title: string; desc: string; href?: string; tag: string; ready: boolean }

export const interactives: Interactive[] = [
  { title: 'Виральный тест', desc: '«Кто ты в хаосе рабочего дня» — 4 архетипа и шаринг в соцсети.', href: 'https://qa-novchenkova.github.io/puls/#/quiz', tag: 'Тест', ready: true },
  { title: 'Мини-игра', desc: '«Успей обработать лиды» — аркада на реакцию с рекордом.', href: 'https://qa-novchenkova.github.io/puls/#/game', tag: 'Игра', ready: true },
  { title: 'Тест для агронома', desc: '«Что ворует твой урожай» — определяем слабое звено на поле.', tag: 'Тест', ready: false },
  { title: 'Калькулятор недобора', desc: 'Считает потери в центнерах и рублях по вводным поля.', tag: 'Калькулятор', ready: false },
]
