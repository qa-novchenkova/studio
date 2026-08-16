import { useState, type FormEvent } from 'react'
import { useTheme } from './lib/useTheme'
import { BASE, agroDeck, upcoming, magnets, interactives } from './data'
import AgroScene from './components/AgroScene'
import { IconLeaf, IconWheat, IconChart, IconDoc, IconDownload, IconSpark, IconPlay, IconMail, IconTarget, IconDrop } from './components/Icons'

// Чтобы форма писала на почту — вставь endpoint Formspree (formspree.io → новая форма).
const FORMSPREE_ENDPOINT = ''

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const NAV = [
  ['case', 'Кейс'],
  ['magnets', 'Лид-магниты'],
  ['play', 'Интерактив'],
  ['about', 'Подход'],
  ['contact', 'Контакты'],
] as const

function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const link = 'text-[0.92rem] font-medium text-ink-soft transition-colors hover:text-ink cursor-pointer'
  const nav = (id: string) => { setOpen(false); go(id) }
  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--color-bg)_85%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <button onClick={() => nav('top')} className="flex items-center gap-2 font-display text-[1.3rem] font-bold tracking-[-0.01em]">
          <IconLeaf size={20} className="text-accent" />
          Студия<span className="text-accent">.</span>
        </button>
        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map(([id, t]) => <button key={id} className={link} onClick={() => nav(id)}>{t}</button>)}
          <button onClick={toggle} aria-label="Тема" className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-ink-soft hover:text-ink">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={() => nav('contact')} className="rounded-xl bg-accent px-4 py-2.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-accent-hov">
            Обсудить проект
          </button>
        </div>
        <div className="flex items-center gap-2.5 lg:hidden">
          <button onClick={toggle} aria-label="Тема" className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-ink-soft">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Меню" className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-bg lg:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col px-6 py-3">
            {NAV.map(([id, t]) => <button key={id} className="py-2.5 text-left text-[1rem] font-medium text-ink-soft" onClick={() => nav(id)}>{t}</button>)}
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

function SectionHead({ index, kicker, title, sub }: { index: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-6">
      <div className="max-w-[54ch]">
        <Kicker>{kicker}</Kicker>
        <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,2.9rem)] font-bold leading-[1.03] tracking-[-0.02em] text-balance">{title}</h2>
        {sub && <p className="mt-3 text-[1.05rem] text-ink-soft">{sub}</p>}
      </div>
      <div className="hidden shrink-0 font-display text-[3.4rem] font-bold leading-none text-line-strong md:block">{index}</div>
    </div>
  )
}

export default function App() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [err, setErr] = useState<{ name?: string; email?: string; message?: string }>({})

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
              Презентации, лид-магниты и интерактив — с погружением в отрасль, а не по шаблону.
              Первый кейс: озимая пшеница и борьба за центнеры.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => go('case')} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">
                Смотреть кейс <span aria-hidden>→</span>
              </button>
              <a href={`${BASE}decks/${agroDeck.id}.pptx`} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                <IconDownload size={18} /> Скачать презентацию
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-4">
              {[['10', 'слайдов в кейсе'], ['9', 'своих иллюстраций'], ['PPTX · PDF', 'форматы на выходе']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[1.9rem] font-bold leading-none text-accent">{n}</div>
                  <div className="mt-1 text-[0.88rem] text-ink-soft">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <AgroScene />
        </div>
      </header>

      {/* CASE */}
      <section id="case" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="01" kicker="Кейс · сельское хозяйство" title="«Поле недобирает» — питч-дек для агронома"
          sub="Не общая презентация «про автоматизацию», а разговор на языке отрасли: фазы культуры, окна обработок, экономика прибавки." />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[22px] border border-line bg-surface">
            <img src={`${BASE}previews/agro.png`} alt="Титульный слайд презентации «Поле недобирает»" className="w-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.78rem] font-medium text-accent">{agroDeck.topic}</span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-ink-soft">{agroDeck.slides} слайдов</span>
              <span className="rounded-full border border-line px-3 py-1 text-[0.78rem] text-ink-soft">{agroDeck.audience}</span>
            </div>
            <h3 className="mt-4 font-display text-[1.7rem] font-bold leading-tight">{agroDeck.title}</h3>
            <p className="mt-2 text-[1rem] text-ink-soft">{agroDeck.tagline}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {agroDeck.bullets.map((b, i) => (
                <li key={b} className="flex gap-3 text-[0.95rem]">
                  <span className="mt-0.5 shrink-0 text-accent">
                    {[<IconChart key="a" size={18} />, <IconTarget key="b" size={18} />, <IconWheat key="c" size={18} />, <IconDrop key="d" size={18} />, <IconLeaf key="e" size={18} />][i]}
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href={`${BASE}decks/${agroDeck.id}.pptx`} download className="mt-6 inline-flex w-max items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">
              <IconDownload size={18} /> Скачать PPTX
            </a>
          </div>
        </div>

        {/* галерея слайдов */}
        <div className="mt-8">
          <div className="mb-3 text-[0.85rem] font-medium text-ink-mute">Слайды из презентации — нажмите, чтобы увеличить</div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agroDeck.gallery.map((g) => (
              <button key={g} onClick={() => setLightbox(g)} className="overflow-hidden rounded-2xl border border-line bg-surface transition-transform hover:-translate-y-1 hover:border-accent">
                <img src={`${BASE}previews/${g}.png`} alt="Слайд презентации" loading="lazy" className="w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* ниши в работе */}
        <div className="mt-10 rounded-[18px] border border-dashed border-line-strong p-6">
          <div className="flex items-center gap-2 text-[0.85rem] font-medium text-ink-mute"><IconSpark size={16} /> Следующие ниши в работе</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {upcoming.map((u) => <span key={u} className="rounded-full border border-line px-3.5 py-1.5 text-[0.85rem] text-ink-soft">{u}</span>)}
          </div>
        </div>
      </section>

      {/* MAGNETS */}
      <section id="magnets" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="02" kicker="Лид-магниты" title="Бесплатная польза в обмен на контакт" sub="Материалы, которые агроном скачает и реально применит в поле." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {magnets.map((m) => (
            <article key={m.id} className="flex flex-col rounded-[18px] border border-line bg-surface p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><IconDoc /></div>
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
        <SectionHead index="03" kicker="Интерактив" title="Форматы, в которые играют" sub="Тесты, игры и калькуляторы вовлекают сильнее баннера — и приводят заявки." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {interactives.map((it) => {
            const inner = (
              <>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent">{it.tag === 'Игра' ? <IconPlay size={20} /> : it.tag === 'Калькулятор' ? <IconChart size={20} /> : <IconTarget size={20} />}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-[0.75rem] text-ink-soft">{it.tag}</span>
                  {!it.ready && <span className="rounded-full bg-line px-3 py-1 text-[0.75rem] text-ink-mute">Готовится</span>}
                </div>
                <h3 className="mt-4 font-display text-[1.3rem] font-bold">{it.title}</h3>
                <p className="mt-1.5 text-[0.95rem] text-ink-soft">{it.desc}</p>
              </>
            )
            return it.ready && it.href ? (
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

      {/* ABOUT / подход */}
      <section id="about" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="04" kicker="Подход" title="Как рождается материал" sub="Рабочий цикл: идея → промпт → генерация → доработка руками → готовый файл." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Погружение', 'Изучаю отрасль и боль аудитории: чем живёт агроном, что решает в поле.', <IconTarget key="i" />],
            ['Смысл', 'Собираю структуру: проблема → механика → доказательства → следующий шаг.', <IconSpark key="i" />],
            ['Визуал', 'Рисую иллюстрации и иконки под тему — векторно, без стоковых картинок.', <IconLeaf key="i" />],
            ['Доводка', 'Проверяю верстку, контраст и тексты. На выходе — файл, готовый к показу.', <IconChart key="i" />],
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
              {['Погружение в отрасль, а не шаблон', 'Свои иллюстрации под тему', 'Готовые файлы: PPTX, PDF, веб'].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><span className="mt-0.5 text-accent"><IconLeaf size={18} /></span>{t}</li>
              ))}
            </ul>
            <div className="mt-7 flex items-center gap-2 text-[0.9rem] text-panel-soft"><IconMail size={18} /> Или напишите напрямую — форма ниже дублируется на почту.</div>
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

      {/* тост отправки */}
      <div role="status" className={`fixed bottom-7 left-1/2 z-[90] -translate-x-1/2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white shadow-lg transition-all ${sent ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
        Заявка отправлена — спасибо!
      </div>

      {/* лайтбокс слайда */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[95] grid place-items-center bg-black/80 p-6 backdrop-blur-sm">
          <img src={`${BASE}previews/${lightbox}.png`} alt="Слайд презентации" className="max-h-[86vh] w-auto max-w-full rounded-xl shadow-2xl" />
          <button onClick={() => setLightbox(null)} aria-label="Закрыть" className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-xl border border-white/25 text-white hover:bg-white/10">✕</button>
        </div>
      )}
    </div>
  )
}
