export const BASE = import.meta.env.BASE_URL

export type Deck = {
  id: string
  topic: string
  title: string
  tagline: string
  slides: number
  accent: string
  accent2: string
  ready: boolean
}

// 6 презентаций на разные ниши. Файлы: public/decks/<id>.pptx, превью: public/previews/<id>.png
export const decks: Deck[] = [
  { id: 'agro', topic: 'Сельское хозяйство', title: 'Урожай под контролем', tagline: 'Цифровые решения для агробизнеса', slides: 10, accent: '#3F9E4D', accent2: '#C7A24B', ready: true },
  { id: 'auto', topic: 'Автомобили', title: 'Автосервис на потоке', tagline: 'Как загрузить сервис под завязку', slides: 10, accent: '#2C6BE4', accent2: '#E4472C', ready: true },
  { id: 'tech', topic: 'Техника и электроника', title: 'Гаджеты, которые продают', tagline: 'Контент для магазина электроники', slides: 10, accent: '#7A3FF2', accent2: '#12B5C9', ready: true },
  { id: 'petfood', topic: 'Корма для животных', title: 'Здоровье в миске', tagline: 'Маркетинг зоотоваров', slides: 10, accent: '#E86A17', accent2: '#2FA36B', ready: true },
  { id: 'horeca', topic: 'HoReCa', title: 'Полный зал каждый вечер', tagline: 'Продвижение кафе и ресторанов', slides: 10, accent: '#D5283A', accent2: '#E0A100', ready: true },
  { id: 'realty', topic: 'Недвижимость', title: 'Ключи быстрее', tagline: 'Как продавать объекты быстрее', slides: 10, accent: '#0E8C8C', accent2: '#C7A24B', ready: true },
]

export type Magnet = {
  id: string
  topic: string
  title: string
  format: string
  desc: string
  ready: boolean
}

export const magnets: Magnet[] = [
  { id: 'agro', topic: 'Сельское хозяйство', title: 'Чек-лист запуска рекламы для фермы', format: 'PDF · чек-лист', desc: '12 пунктов, без которых бюджет уходит впустую.', ready: false },
  { id: 'auto', topic: 'Автомобили', title: '5 ошибок автосервиса, которые сливают заявки', format: 'PDF · гайд', desc: 'Разбор типовых провалов и как их закрыть.', ready: false },
  { id: 'tech', topic: 'Техника', title: 'Как описать гаджет, чтобы купили', format: 'PDF · шаблон', desc: 'Формула карточки товара, которая конвертит.', ready: false },
  { id: 'petfood', topic: 'Корма', title: 'Чек-лист выбора корма для питомца', format: 'PDF · чек-лист', desc: 'Лид-магнит для владельцев кошек и собак.', ready: false },
  { id: 'horeca', topic: 'HoReCa', title: 'Меню, которое продаёт: 9 приёмов', format: 'PDF · гайд', desc: 'Как оформить меню, чтобы средний чек рос.', ready: false },
  { id: 'realty', topic: 'Недвижимость', title: 'Чек-лист идеального показа квартиры', format: 'PDF · чек-лист', desc: 'Что сделать до, во время и после показа.', ready: false },
]

export type Banner = {
  id: string
  topic: string
  title: string
  size: string
  ready: boolean
}

export const banners: Banner[] = [
  { id: 'agro-post', topic: 'Сельское хозяйство', title: 'Сезон посева — успей', size: '1080×1080 · пост', ready: false },
  { id: 'auto-web', topic: 'Автомобили', title: 'ТО со скидкой 20%', size: '1200×628 · веб-баннер', ready: false },
  { id: 'tech-story', topic: 'Техника', title: 'Новинки недели', size: '1080×1920 · сторис', ready: false },
  { id: 'horeca-post', topic: 'HoReCa', title: 'Бизнес-ланч 350 ₽', size: '1080×1080 · пост', ready: false },
]
