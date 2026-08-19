import { useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from './lib/useTheme'
import { BASE, caseDetails, directions, cases, magnets, interactives, bannerGroups } from './data'
import AgroScene from './components/AgroScene'
import {
  IconLeaf, IconWheat, IconChart, IconDoc, IconDownload, IconSpark, IconPlay,
  IconMail, IconTarget, IconDrop, IconLayout, IconImage, IconPen, IconMotion,
  IconPlate, IconStar, IconRepeat, IconCalendar, IconPaw, IconBowl, IconHeart,
  IconBox, IconChat, IconCar, IconWrench, IconClock, IconFunnel, IconHome,
  IconPlan, IconRoute, IconFolder, IconDevice, IconCompare, IconCart,
} from './components/Icons'
import { PLAY_ART } from './components/PlayArt'

// Чтобы форма писала на почту — вставь endpoint Formspree (formspree.io → новая форма).
const FORMSPREE_ENDPOINT = ''

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const NAV = [
  ['cases', 'Кейсы'],
  ['magnets', 'Материалы'],
  ['play', 'Интерактив'],
  ['banners', 'Баннеры'],
  ['about', 'Подход'],
  ['contact', 'Контакты'],
] as const

const ICONS = {
  doc: IconDoc, download: IconDownload, motion: IconMotion, target: IconTarget,
  play: IconPlay, layout: IconLayout, image: IconImage, chart: IconChart, pen: IconPen,
}

// иконки пунктов кейса — свои для каждой ниши
const CASE_ICONS: Record<string, (p: { size?: number }) => React.ReactElement> = {
  chart: IconChart, target: IconTarget, wheat: IconWheat, drop: IconDrop, leaf: IconLeaf,
  plate: IconPlate, star: IconStar, repeat: IconRepeat, calendar: IconCalendar,
  paw: IconPaw, bowl: IconBowl, heart: IconHeart, box: IconBox, chat: IconChat,
  car: IconCar, wrench: IconWrench, clock: IconClock, funnel: IconFunnel,
  home: IconHome, plan: IconPlan, route: IconRoute, folder: IconFolder,
  device: IconDevice, compare: IconCompare, cart: IconCart,
}

function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const nav = (id: string) => { setOpen(false); go(id) }
  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between px-6">
        <button onClick={() => nav('top')} className="flex items-center gap-2.5 font-display text-[1.32rem] font-bold tracking-[-0.01em]">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent"><IconLeaf size={19} /></span>
          Студия<span className="-ml-1.5 text-accent">.</span>
        </button>

        {/* сегментированное меню с номерами — своя айдентика */}
        <div className="hidden items-center gap-1 rounded-full border border-line bg-surface px-1.5 py-1.5 lg:flex">
          {NAV.map(([id, t], i) => (
            <button key={id} onClick={() => nav(id)}
              className="group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[0.98rem] text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent">
              <span className="font-mono text-[0.62rem] text-ink-mute transition-colors group-hover:text-accent">0{i + 1}</span>
              {t}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-2.5 lg:flex">
          <button onClick={toggle} aria-label="Тема" className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong text-ink-soft hover:text-ink">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={() => nav('contact')} className="rounded-xl bg-accent px-4 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-accent-hov">
            Обсудить проект
          </button>
        </div>

        <div className="flex items-center gap-2.5 lg:hidden">
          <button onClick={toggle} aria-label="Тема" className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong text-ink-soft">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Меню" className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-bg lg:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col px-6 py-3">
            {NAV.map(([id, t], i) => (
              <button key={id} onClick={() => nav(id)} className="flex items-center gap-2 py-2.5 text-left font-display text-[1.05rem] text-ink-soft">
                <span className="font-mono text-[0.66rem] text-ink-mute">0{i + 1}</span>{t}
              </button>
            ))}
            <button onClick={() => nav('contact')} className="mt-2 rounded-xl bg-accent px-4 py-3 text-center font-semibold text-white">Обсудить проект</button>
          </div>
        </div>
      )}
    </nav>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-soft">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  )
}

function SectionHead({ index, kicker, title, sub, aside, wideSub }: { index: string; kicker: string; title: string; sub?: string; aside?: React.ReactNode; wideSub?: boolean }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
      <div className={wideSub ? '' : 'max-w-[54ch]'}>
        <Kicker>{kicker}</Kicker>
        <h2 className={`mt-4 font-display text-[clamp(1.8rem,4vw,2.9rem)] font-bold leading-[1.03] tracking-[-0.02em] text-balance ${wideSub ? 'max-w-[54ch]' : ''}`}>{title}</h2>
        {sub && <p className={`mt-3 text-[1.05rem] text-ink-soft ${wideSub ? 'lg:whitespace-nowrap' : ''}`}>{sub}</p>}
      </div>
      {aside ?? <div className="hidden shrink-0 font-display text-[3.4rem] font-bold leading-none text-line-strong md:block">{index}</div>}
    </div>
  )
}

/* Бегущая строка направлений */
function Directions() {
  const row = (keyPrefix: string) =>
    directions.map((d) => {
      const Ic = ICONS[d.icon]
      return (
        <div key={keyPrefix + d.label} className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent"><Ic size={20} /></span>
          <div className="whitespace-nowrap">
            <div className="font-display text-[1.02rem] font-bold leading-tight">{d.label}</div>
            <div className="text-[0.8rem] text-ink-mute">{d.note}</div>
          </div>
        </div>
      )
    })
  return (
    <section aria-label="Направления работы" className="marquee overflow-hidden border-y border-line bg-[color-mix(in_srgb,var(--color-surface)_55%,transparent)] py-5">
      <div className="marquee-track flex gap-4">
        {row('a')}
        {row('b')}
      </div>
    </section>
  )
}

export default function App() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState<{ name?: string; email?: string; message?: string }>({})
  const track = useRef<HTMLDivElement>(null)
  const magTrack = useRef<HTMLDivElement>(null)

  const slide = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  const slideMag = (dir: 1 | -1) => magTrack.current?.scrollBy({ left: dir * 380, behavior: 'smooth' })

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    const next: typeof err = {}
    const name = form.name.trim()
    if (!name) next.name = 'Введите имя'
    else if (!/^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё\s-]{1,39}$/.test(name)) next.name = 'Имя: 2–40 букв, без цифр'
    if (!form.email.trim()) next.email = 'Введите e-mail'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = 'Проверьте e-mail'
    if (form.message.trim().length < 10) next.message = 'Опишите задачу — хотя бы пара предложений'
    if (Object.keys(next).length) { setErr(next); return }
    setSending(true)
    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
        if (!res.ok) throw new Error('bad')
      }
      setSent(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setSent(false), 4000)
    } catch {
      alert('Не удалось отправить. Попробуйте позже.')
    } finally { setSending(false) }
  }

  const field = (k: 'name' | 'email' | 'message', label: string, ph: string, type = 'text') => (
    <div>
      <label htmlFor={k} className="mb-1.5 block text-[0.85rem] font-medium text-panel-soft">{label}</label>
      {k === 'message' ? (
        <textarea id={k} rows={4} placeholder={ph} value={form[k]} maxLength={600}
          onChange={(e) => { setForm({ ...form, [k]: e.target.value }); setErr({ ...err, [k]: undefined }) }}
          className={`w-full resize-none rounded-xl border bg-[#08170F] px-4 py-3 text-[0.98rem] text-panel-ink placeholder:text-[#5c6f60] focus:border-accent focus:outline-none ${err[k] ? 'border-[#E08A7A]' : 'border-panel-line'}`} />
      ) : (
        <input id={k} type={type} placeholder={ph} value={form[k]} maxLength={k === 'name' ? 40 : 60} autoComplete={k}
          onChange={(e) => { setForm({ ...form, [k]: e.target.value }); setErr({ ...err, [k]: undefined }) }}
          className={`w-full rounded-xl border bg-[#08170F] px-4 py-3 text-[0.98rem] text-panel-ink placeholder:text-[#5c6f60] focus:border-accent focus:outline-none ${err[k] ? 'border-[#E08A7A]' : 'border-panel-line'}`} />
      )}
      {err[k] && <p className="mt-1 text-[0.78rem] text-[#E8A08F]">{err[k]}</p>}
    </div>
  )

  return (
    <div id="top">
      <Nav />

      {/* HERO */}
      <header className="mx-auto max-w-[1200px] px-6 pb-12 pt-12 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Kicker>Портфолио маркетинг-контента</Kicker>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6.4vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.03em]">
              Контент, который продаёт.<br />
              <span className="text-accent">Под любую нишу.</span>
            </h1>
            <p className="mt-5 max-w-[50ch] text-[1.12rem] text-ink-soft">
              Презентации, лид-магниты, анимации и интерактив — с погружением в отрасль, а не по шаблону.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => go('cases')} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">
                Смотреть кейсы <span aria-hidden>→</span>
              </button>
              <button onClick={() => go('contact')} className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                <IconMail size={18} /> Обсудить проект
              </button>
            </div>
            <div className="mt-9 font-display text-[1.9rem] font-bold leading-none text-accent">
              PPTX · PDF · веб
            </div>
          </div>
          <AgroScene />
        </div>
      </header>

      <Directions />

      {/* CASES — карусель */}
      <section id="cases" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead
          index="01"
          kicker="Кейсы"
          title="Материалы под конкретные отрасли"
          sub="Каждый кейс — своя тема, своя графика и свой язык аудитории."
          aside={
            <div className="hidden shrink-0 gap-2 md:flex">
              <button onClick={() => slide(-1)} aria-label="Назад" className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-ink-soft transition-colors hover:border-accent hover:text-accent">‹</button>
              <button onClick={() => slide(1)} aria-label="Вперёд" className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-ink-soft transition-colors hover:border-accent hover:text-accent">›</button>
            </div>
          }
        />
        <div ref={track} className="no-sb mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {cases.map((c) => (
            <article key={c.id} className={`flex w-[300px] shrink-0 snap-start flex-col rounded-[20px] border p-5 sm:w-[330px] ${c.ready ? 'border-line bg-surface' : 'border-dashed border-line-strong bg-surface/60'}`}>
              {c.ready ? (
                <div className="mb-4 overflow-hidden rounded-xl border border-line">
                  <img src={`${BASE}previews/${c.id}.png`} alt={`Превью кейса «${c.title}»`} className="block aspect-[16/9] w-full object-cover" />
                </div>
              ) : (
                <div className="mb-4 grid aspect-[16/9] place-items-center rounded-xl bg-accent-soft/40 text-accent"><IconSpark size={26} /></div>
              )}
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-ink-mute">{c.topic}</span>
              <h3 className="mt-1.5 font-display text-[1.28rem] font-bold leading-tight">{c.title}</h3>
              <p className="mt-1.5 flex-1 text-[0.92rem] text-ink-soft">{c.desc}</p>
              {c.ready ? (
                <button onClick={() => go(`case-${c.id}`)} className="mt-4 inline-flex w-max items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-accent-hov">
                  Смотреть кейс →
                </button>
              ) : (
                <span className="mt-4 inline-flex w-max rounded-xl border border-line px-4 py-2.5 text-[0.9rem] font-medium text-ink-mute">В работе</span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* CASE DETAILS — по одному блоку на готовый кейс */}
      {caseDetails.map((d) => (
        <section key={d.id} id={`case-${d.id}`} className="mx-auto max-w-[1200px] px-6 pb-16">
          <div className="rounded-[26px] border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.78rem] font-medium text-accent">{d.topic}</span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-ink-soft">{d.slides} слайдов</span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-ink-soft">{d.audience}</span>
            </div>

            <div className="mt-5 grid items-start gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold leading-tight">{d.title}</h3>
                <p className="mt-3 text-[1.02rem] text-ink-soft">{d.tagline}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {d.bullets.map((b, i) => (
                    <li key={b} className="flex gap-3 text-[0.95rem]">
                      <span className="mt-0.5 shrink-0 text-accent">
                        {(() => { const Ic = CASE_ICONS[d.icons[i]] || IconSpark; return <Ic size={18} /> })()}
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={`${BASE}decks/${d.id}.pptx`} download className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">
                    <IconDownload size={18} /> Скачать PPTX
                  </a>
                  {d.magnet && (
                    <a href={`${BASE}leadmagnets/${d.magnet.file}.pdf`} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                      <IconDoc size={18} /> {d.magnet.title}
                    </a>
                  )}
                  {d.quiz && (
                    <Link to={d.quiz.to} className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                      <IconTarget size={18} /> {d.quiz.title}
                    </Link>
                  )}
                </div>
              </div>

              {/* превью — фиксированные пропорции, без растяжения */}
              <figure className="m-0">
                <div className="overflow-hidden rounded-2xl border border-line bg-bg">
                  <img src={`${BASE}previews/${d.id}.png`} alt={`Титульный слайд презентации «${d.title}»`}
                    className="block aspect-[16/9] w-full object-contain" />
                </div>
                <figcaption className="mt-2 text-[0.82rem] text-ink-mute">Титульный слайд</figcaption>
              </figure>
            </div>

            {/* галерея слайдов */}
            <div className="mt-8 border-t border-line pt-6">
              <div className="mb-3 text-[0.85rem] font-medium text-ink-mute">Слайды из презентации — нажмите, чтобы увеличить</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {d.gallery.map((g) => (
                  <button key={g} onClick={() => setLightbox(`${BASE}previews/${g}.png`)} className="overflow-hidden rounded-2xl border border-line bg-bg transition-transform hover:-translate-y-1 hover:border-accent">
                    <img src={`${BASE}previews/${g}.png`} alt="Слайд презентации" loading="lazy" className="block aspect-[16/9] w-full object-contain" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* MAGNETS */}
      <section id="magnets" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="02" kicker="Материалы" title="Что скачивают и применяют"
          sub="Чек-листы, гайды и шаблоны под конкретную отрасль — точка входа в диалог с клиентом."
          aside={
            <div className="hidden shrink-0 gap-2 md:flex">
              <button onClick={() => slideMag(-1)} aria-label="Назад" className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-ink-soft transition-colors hover:border-accent hover:text-accent">‹</button>
              <button onClick={() => slideMag(1)} aria-label="Вперёд" className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-ink-soft transition-colors hover:border-accent hover:text-accent">›</button>
            </div>
          } />
        <div ref={magTrack} className="no-sb mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2">
          {magnets.map((m) => (
            <article key={m.id} className="flex w-[86vw] shrink-0 snap-start flex-col rounded-[18px] border border-line bg-surface p-6 sm:w-[46%] lg:w-[calc((100%-2.5rem)/3)]">
              {m.ready ? (
                <button onClick={() => setLightbox(`${BASE}previews/magnet-${m.id}.png`)} className="mb-4 overflow-hidden rounded-xl border border-line bg-bg transition-transform hover:-translate-y-0.5 hover:border-accent">
                  <img src={`${BASE}previews/magnet-${m.id}.png`} alt={`Превью: ${m.title}`} loading="lazy" className="block aspect-[3/4] w-full object-cover object-top" />
                </button>
              ) : (
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><IconDoc /></div>
              )}
              <div className="text-[0.72rem] font-medium uppercase tracking-[0.1em] text-ink-mute">{m.format}</div>
              <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-tight">{m.title}</h3>
              <p className="mt-1.5 flex-1 text-[0.92rem] text-ink-soft">{m.desc}</p>
              {m.ready ? (
                <a href={`${BASE}leadmagnets/${m.id}.pdf`} download className="mt-4 inline-flex w-max items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[0.9rem] font-semibold text-white hover:bg-accent-hov"><IconDownload size={16} /> Скачать PDF</a>
              ) : (
                <span className="mt-4 inline-flex w-max rounded-xl border border-line px-4 py-2.5 text-[0.9rem] font-medium text-ink-mute">Готовится</span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* INTERACTIVE */}
      <section id="play" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="03" kicker="Интерактив" title="Попробуйте прямо здесь" sub="Тесты, игры и калькуляторы вовлекают сильнее баннера и приводят к заявкам." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {interactives.map((it) => {
            const Art = it.art ? PLAY_ART[it.art] : null
            const inner = (
              <>
                {Art && (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-line">
                    <Art />
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">{it.tag === 'Игра' ? <IconPlay size={20} /> : it.tag === 'Калькулятор' ? <IconChart size={20} /> : <IconTarget size={20} />}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-[0.75rem] text-ink-soft">{it.tag}</span>
                  {!it.ready && <span className="rounded-full bg-line px-3 py-1 text-[0.75rem] text-ink-mute">Готовится</span>}
                </div>
                <h3 className="mt-4 font-display text-[1.3rem] font-bold">{it.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-ink-soft">{it.desc}</p>
              </>
            )
            return it.ready && it.to ? (
              <Link key={it.title} to={it.to}
                className="group rounded-[18px] border border-line bg-surface p-6 transition-colors hover:border-accent">
                {inner}
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-accent">Пройти тест <span className="transition-transform group-hover:translate-x-1">→</span></span>
              </Link>
            ) : it.ready && it.href ? (
              <a key={it.title} href={it.href} target="_blank" rel="noopener noreferrer"
                className="group rounded-[18px] border border-line bg-surface p-6 transition-colors hover:border-accent">
                {inner}
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-accent">Открыть <span className="transition-transform group-hover:translate-x-1">↗</span></span>
              </a>
            ) : (
              <div key={it.title} className="rounded-[18px] border border-dashed border-line-strong bg-surface/60 p-6">{inner}</div>
            )
          })}
        </div>
      </section>

      {/* BANNERS */}
      <section id="banners" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="04" kicker="Баннеры" title="Графика под площадки"
          sub="Посты, веб-баннеры и сторис — в размерах, готовых к публикации. Нажмите, чтобы увеличить." />
        <div className="mt-10 flex flex-col gap-10">
          {bannerGroups.map((g) => (
            <div key={g.format}>
              <div className="mb-4 flex items-baseline gap-3 border-b border-line pb-2">
                <h3 className="font-display text-[1.15rem] font-bold">{g.format}</h3>
                <span className="font-mono text-[0.78rem] text-ink-mute">{g.size}</span>
              </div>
              <div className={`grid gap-5 ${g.cols}`}>
                {g.items.map((b) => (
                  <article key={b.id} className="flex flex-col overflow-hidden rounded-[18px] border border-line bg-surface">
                    <button onClick={() => setLightbox(`${BASE}banners/${b.id}.png`)} className="block overflow-hidden bg-bg transition-transform hover:-translate-y-0.5">
                      <img src={`${BASE}banners/${b.id}.png`} alt={`Баннер: ${b.title}`} loading="lazy"
                        className="block w-full object-cover" style={{ aspectRatio: b.ratio }} />
                    </button>
                    <div className="flex flex-1 flex-col p-4">
                      <h4 className="font-display text-[1.02rem] font-bold leading-tight">{b.title}</h4>
                      <p className="mt-0.5 flex-1 text-[0.85rem] text-ink-soft">{b.topic}</p>
                      <a href={`${BASE}banners/${b.id}.png`} download
                        className="mt-3 inline-flex w-max items-center gap-1.5 rounded-xl border border-line-strong px-3.5 py-2 text-[0.85rem] font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                        <IconDownload size={15} /> PNG
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="05" kicker="Подход" title="Как рождается материал" wideSub
          sub="Рабочий цикл: идея → промпт → генерация → доработка руками → готовый файл." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Погружение', 'Изучаю отрасль и боль аудитории: чем живёт агроном, что решает в поле.', <IconTarget key="i" />],
            ['Смысл', 'Собираю структуру: проблема → механика → доказательства → следующий шаг.', <IconSpark key="i" />],
            ['Визуал', 'Рисую иллюстрации и иконки под тему — векторно, без стоковых картинок.', <IconLeaf key="i" />],
            ['Доводка', 'Проверяю вёрстку, контраст и тексты. На выходе — файл, готовый к показу.', <IconChart key="i" />],
          ].map(([t, d, ic], i) => (
            <article key={t as string} className="rounded-[18px] border border-line bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">{ic as React.ReactNode}</span>
                <span className="font-display text-[1.6rem] font-bold text-line-strong">0{i + 1}</span>
              </div>
              <h3 className="font-display text-[1.15rem] font-bold">{t as string}</h3>
              <p className="mt-1.5 text-[0.92rem] text-ink-soft">{d as string}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-10 rounded-[26px] border border-panel-line bg-panel p-8 text-panel-ink sm:p-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-panel-line px-3.5 py-1.5 text-[0.82rem] text-panel-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Связаться
            </span>
            <h2 className="mt-4 font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold leading-[1.05]">Нужен контент под вашу нишу?</h2>
            <p className="mt-3 max-w-[44ch] text-[1rem] text-panel-soft">
              Опишите задачу — предложу форматы и покажу, как это будет выглядеть. Презентация, лид-магнит, тест или связка из нескольких материалов.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-[0.95rem]">
              {['Погружение в отрасль, а не шаблон', 'Свои иллюстрации и анимации под тему', 'Готовые файлы: PPTX, PDF, веб'].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><span className="mt-0.5 text-accent"><IconLeaf size={18} /></span>{t}</li>
              ))}
            </ul>
          </div>
          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            {field('name', 'Имя', 'Как к вам обращаться')}
            {field('email', 'E-mail', 'you@company.ru', 'email')}
            {field('message', 'Задача', 'Например: нужна презентация для оптовых покупателей зерна')}
            <button type="submit" disabled={sending} className="rounded-xl bg-accent px-5 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hov disabled:opacity-60">
              {sending ? 'Отправляем…' : 'Отправить заявку'}
            </button>
            <p className="text-center text-[0.78rem] text-panel-soft">
              {FORMSPREE_ENDPOINT ? 'Ответим в течение рабочего дня.' : 'Демо-режим: форма проверяет данные, но пока не отправляет (см. код).'}
            </p>
          </form>
        </div>
      </section>

      <footer className="border-t border-line py-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 text-[0.88rem] text-ink-mute">
          <span>© 2026 Студия — портфолио маркетинг-контента. Демо-проект.</span>
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.72rem]">vibe-coded · React + Vite + Tailwind</span>
        </div>
      </footer>

      <div role="status" className={`fixed bottom-7 left-1/2 z-[90] -translate-x-1/2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-lg transition-all ${sent ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
        Заявка отправлена — спасибо!
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[95] grid place-items-center bg-black/80 p-6 backdrop-blur-sm">
          <img src={lightbox} alt="Просмотр материала" className="max-h-[86vh] w-auto max-w-full rounded-xl shadow-2xl" />
          <button onClick={() => setLightbox(null)} aria-label="Закрыть" className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-xl border border-white/25 text-white hover:bg-white/10">✕</button>
        </div>
      )}
    </div>
  )
}
