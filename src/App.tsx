import { useState } from 'react'
import { useTheme } from './lib/useTheme'
import { BASE, decks, magnets, banners } from './data'

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const link = 'text-[0.92rem] font-medium text-ink-soft transition-colors hover:text-ink cursor-pointer'
  const go = (id: string) => { setOpen(false); scrollTo(id) }
  return (
    <nav className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--color-bg)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <button onClick={() => go('top')} className="font-display text-[1.35rem] font-bold tracking-[-0.01em]">
          Студия<span className="text-accent">.</span>
        </button>
        <div className="hidden items-center gap-7 md:flex">
          <button className={link} onClick={() => go('decks')}>Презентации</button>
          <button className={link} onClick={() => go('magnets')}>Лид-магниты</button>
          <button className={link} onClick={() => go('banners')}>Баннеры</button>
          <button className={link} onClick={() => go('play')}>Интерактив</button>
          <button onClick={toggle} aria-label="Тема" className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-ink-soft hover:text-ink">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
        <div className="flex items-center gap-2.5 md:hidden">
          <button onClick={toggle} aria-label="Тема" className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-ink-soft">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Меню" className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col px-6 py-3">
            {[['decks', 'Презентации'], ['magnets', 'Лид-магниты'], ['banners', 'Баннеры'], ['play', 'Интерактив']].map(([id, t]) => (
              <button key={id} className="py-2.5 text-left text-[1rem] font-medium text-ink-soft" onClick={() => go(id)}>{t}</button>
            ))}
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
  return (
    <div id="top">
      <Nav />

      {/* HERO */}
      <header className="mx-auto max-w-[1200px] px-6 pb-10 pt-14 sm:pt-20">
        <Kicker>Портфолио маркетинг-контента</Kicker>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,7.5vw,5.4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          Контент, который продаёт.<br />
          <span className="text-accent">Под любую нишу.</span>
        </h1>
        <p className="mt-6 max-w-[52ch] text-[1.15rem] text-ink-soft">
          Презентации, лид-магниты, баннеры и интерактив — от агрофермы до новостройки.
          Собрано через ИИ-инструменты с ручной доработкой.
        </p>

        {/* инфографика: счётчики */}
        <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">
          {[
            ['6', 'ниш и рынков'],
            ['20+', 'форматов контента'],
            ['PPTX · PDF · PNG', 'готовые файлы'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-none text-accent">{n}</div>
              <div className="mt-1.5 text-[0.9rem] text-ink-soft">{l}</div>
            </div>
          ))}
        </div>

        {/* мозаика ниш — заполняет первый экран цветом */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 md:grid-cols-3">
          {decks.map((d) => (
            <button
              key={d.id}
              onClick={() => scrollTo('decks')}
              className={`group relative flex aspect-[16/11] flex-col justify-between overflow-hidden rounded-[20px] p-5 text-left text-white transition-transform hover:-translate-y-1 g-${d.id}`}
            >
              <span className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-white/80">{d.topic}</span>
              <span className="pointer-events-none absolute right-4 top-4 text-white/70 opacity-0 transition group-hover:opacity-100">↗</span>
              <div>
                <div className="font-display text-[clamp(1.15rem,2vw,1.5rem)] font-bold leading-[1.05]">{d.title}</div>
                <div className="mt-1 text-[0.78rem] text-white/80">Презентация · PPTX</div>
              </div>
            </button>
          ))}
        </div>
      </header>

      {/* PRESENTATIONS */}
      <section id="decks" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="01" kicker="Презентации · 6 ниш" title="Питч-деки на любой рынок" sub="Каждую можно скачать в PPTX. Единый уровень оформления, разные отрасли и палитры." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((d) => (
            <article key={d.id} className="group flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-transform hover:-translate-y-1">
              <div className={`relative aspect-[16/10] g-${d.id}`}>
                <img
                  src={`${BASE}previews/${d.id}.png`}
                  alt={`Превью: ${d.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-wider text-white backdrop-blur-sm">
                  {d.topic}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-mute">{d.slides} слайдов · PPTX</div>
                <h3 className="mt-2 font-display text-[1.35rem] font-bold leading-tight tracking-[-0.01em]">{d.title}</h3>
                <p className="mt-1.5 flex-1 text-[0.95rem] text-ink-soft">{d.tagline}</p>
                {d.ready ? (
                  <a href={`${BASE}decks/${d.id}.pptx`} download className="mt-4 inline-flex w-max items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-[0.92rem] font-semibold text-white transition-opacity hover:opacity-90">
                    Скачать PPTX ↓
                  </a>
                ) : (
                  <span className="mt-4 inline-flex w-max items-center rounded-xl border border-line px-4 py-2.5 text-[0.92rem] font-medium text-ink-mute">Готовится</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LEAD MAGNETS */}
      <section id="magnets" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="02" kicker="Лид-магниты" title="Бесплатная польза в обмен на контакт" sub="Чек-листы, гайды и шаблоны, которые превращают посетителя в заявку." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {magnets.map((m) => (
            <article key={m.id} className="flex flex-col rounded-[18px] border border-line bg-surface p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </div>
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-ink-mute">{m.format}</div>
              <h3 className="mt-1.5 font-display text-[1.2rem] font-bold leading-tight">{m.title}</h3>
              <p className="mt-1.5 flex-1 text-[0.92rem] text-ink-soft">{m.desc}</p>
              {m.ready ? (
                <a href={`${BASE}leadmagnets/${m.id}.pdf`} download className="mt-4 inline-flex w-max rounded-xl bg-accent px-4 py-2.5 text-[0.9rem] font-semibold text-white hover:opacity-90">Скачать PDF ↓</a>
              ) : (
                <span className="mt-4 inline-flex w-max rounded-xl border border-line px-4 py-2.5 text-[0.9rem] font-medium text-ink-mute">Готовится</span>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* BANNERS */}
      <section id="banners" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="03" kicker="Баннеры" title="Рекламная графика в разных форматах" sub="Посты, веб-баннеры и сторис — под разные площадки и задачи." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {banners.map((b) => (
            <article key={b.id} className="overflow-hidden rounded-[18px] border border-line bg-surface">
              <div className="grid aspect-[4/3] place-items-center bg-[repeating-linear-gradient(45deg,var(--color-line),var(--color-line)_10px,transparent_10px,transparent_20px)]">
                <span className="rounded-full bg-surface px-3 py-1 font-mono text-[0.7rem] text-ink-mute">Готовится</span>
              </div>
              <div className="p-4">
                <div className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-mute">{b.size}</div>
                <h3 className="mt-1 font-display text-[1.05rem] font-bold leading-tight">{b.title}</h3>
                <p className="mt-0.5 text-[0.85rem] text-ink-soft">{b.topic}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INTERACTIVE */}
      <section id="play" className="mx-auto max-w-[1200px] px-6 py-16">
        <SectionHead index="04" kicker="Интерактив" title="Не только статичный контент" sub="Живые форматы вовлекают лучше баннеров. Примеры — из кампании «Пульс»." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            ['Виральный тест', '«Кто ты в хаосе рабочего дня» — 4 архетипа и шаринг.', 'https://qa-novchenkova.github.io/puls/#/quiz'],
            ['Мини-игра', '«Успей обработать лиды» — аркада на реакцию с рекордом.', 'https://qa-novchenkova.github.io/puls/#/game'],
          ].map(([t, d, href]) => (
            <a key={t} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 rounded-[18px] border border-line bg-surface p-6 transition-colors hover:border-accent">
              <div>
                <h3 className="font-display text-[1.3rem] font-bold">{t}</h3>
                <p className="mt-1 text-[0.95rem] text-ink-soft">{d}</p>
              </div>
              <span className="text-2xl text-accent transition-transform group-hover:translate-x-1">↗</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-8 border-t border-line py-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 text-[0.88rem] text-ink-mute">
          <span>© 2026 Студия — портфолио маркетинг-контента. Демо-проект.</span>
          <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.72rem]">vibe-coded · React + Vite + Tailwind</span>
        </div>
      </footer>
    </div>
  )
}
