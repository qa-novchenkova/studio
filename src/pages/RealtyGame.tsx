import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from '../data'
import { IconDownload, IconLeaf, IconDoc } from '../components/Icons'

type Flat = { rooms: number; price: number; floor: number; metro: number; id: number }
type Req = { text: string; test: (f: Flat) => boolean }

const DURATION = 50
const ROUND_MS = 9000

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1))

function makeFlat(id: number): Flat {
  return { id, rooms: rnd(1, 4), price: rnd(45, 145) / 10, floor: rnd(1, 16), metro: rnd(3, 25) }
}

/* мини-план квартиры — в стиле чертежа */
function PlanIcon({ rooms }: { rooms: number }) {
  return (
    <svg viewBox="0 0 120 80" className="w-full" aria-hidden="true">
      <rect x="4" y="4" width="112" height="72" fill="var(--color-surface)" stroke="currentColor" strokeWidth="3" />
      <line x1="60" y1="4" x2="60" y2="44" stroke="currentColor" strokeWidth="2.5" />
      <line x1="4" y1="44" x2="116" y2="44" stroke="currentColor" strokeWidth="2.5" />
      {rooms >= 3 && <line x1="34" y1="44" x2="34" y2="76" stroke="currentColor" strokeWidth="2.5" />}
      {rooms >= 4 && <line x1="88" y1="44" x2="88" y2="76" stroke="currentColor" strokeWidth="2.5" />}
      <rect x="20" y="1" width="26" height="6" fill="currentColor" opacity=".55" />
      <rect x="76" y="1" width="26" height="6" fill="currentColor" opacity=".55" />
    </svg>
  )
}

function makeRound(seq: number) {
  const flats = [makeFlat(seq * 3), makeFlat(seq * 3 + 1), makeFlat(seq * 3 + 2)]
  const target = flats[rnd(0, 2)]
  const variants: Req[] = [
    { text: `Нужна ${target.rooms}-комнатная`, test: (f) => f.rooms === target.rooms },
    { text: `Бюджет до ${Math.ceil(target.price)} млн`, test: (f) => f.price <= Math.ceil(target.price) },
    { text: `Не первый и не последний этаж`, test: (f) => f.floor > 1 && f.floor < 16 },
    { text: `До метро не больше ${target.metro} минут`, test: (f) => f.metro <= target.metro },
  ]
  // подбираем требование, которому отвечает ровно один вариант
  const shuffled = variants.sort(() => Math.random() - 0.5)
  for (const v of shuffled) {
    const matches = flats.filter(v.test)
    if (matches.length === 1) return { flats, req: v, answer: matches[0].id }
  }
  // запасной вариант: самая дешёвая
  const cheapest = flats.reduce((a, b) => (b.price < a.price ? b : a))
  return { flats, req: { text: 'Нужен самый доступный вариант', test: () => true }, answer: cheapest.id }
}

export default function RealtyGame() {
  const [status, setStatus] = useState<'idle' | 'play' | 'over'>('idle')
  const [round, setRound] = useState(() => makeRound(1))
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [left, setLeft] = useState(DURATION)
  const [roundLeft, setRoundLeft] = useState(100)
  const [flash, setFlash] = useState<{ id: number; ok: boolean } | null>(null)
  const [best, setBest] = useState(() => Number(localStorage.getItem('studio-realty-best') || 0))
  const g = useRef({ score: 0, lives: 3, seq: 1, t0: 0, roundT0: 0, answered: false, done: 0, right: 0 })

  const start = () => {
    const now = performance.now()
    g.current = { score: 0, lives: 3, seq: 1, t0: now, roundT0: now, answered: false, done: 0, right: 0 }
    setScore(0); setLives(3); setLeft(DURATION); setRoundLeft(100)
    setRound(makeRound(1)); setFlash(null); setStatus('play')
  }

  const nextRound = () => {
    const s = g.current
    s.seq += 1
    s.answered = false
    s.roundT0 = performance.now()
    setRound(makeRound(s.seq))
    setRoundLeft(100)
    setFlash(null)
  }

  const pick = (id: number) => {
    const s = g.current
    if (status !== 'play' || s.answered) return
    s.answered = true
    s.done += 1
    const ok = id === round.answer
    if (ok) { s.score += 10; s.right += 1; setScore(s.score) }
    else { s.lives -= 1; setLives(s.lives) }
    setFlash({ id, ok })
    setTimeout(() => { if (s.lives > 0) nextRound() }, 700)
  }

  useEffect(() => {
    if (status !== 'play') return
    const iv = setInterval(() => {
      const s = g.current
      const now = performance.now()
      const elapsed = (now - s.t0) / 1000
      const rl = Math.max(0, 100 - ((now - s.roundT0) / ROUND_MS) * 100)
      setRoundLeft(rl)
      if (rl <= 0 && !s.answered) {   // не успел — теряем клиента
        s.answered = true
        s.done += 1
        s.lives -= 1
        setLives(s.lives)
        setFlash({ id: -1, ok: false })
        setTimeout(() => { if (s.lives > 0) nextRound() }, 600)
      }
      const l = Math.max(0, DURATION - Math.floor(elapsed))
      setLeft(l)
      if (s.lives <= 0 || l <= 0) {
        clearInterval(iv)
        setBest((b) => {
          const nb = Math.max(b, s.score)
          localStorage.setItem('studio-realty-best', String(nb))
          return nb
        })
        setStatus('over')
      }
    }, 60)
    return () => clearInterval(iv)
  }, [status])

  const acc = g.current.done ? Math.round((g.current.right / g.current.done) * 100) : 0
  const verdict = acc >= 85 ? 'Вы слышите покупателя' : acc >= 60 ? 'Половина показов — мимо' : 'Покупатель уходит к другому агенту'

  return (
    <main className="mx-auto max-w-[900px] px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-soft hover:text-accent">
        <IconLeaf size={18} /> Студия — на главную
      </Link>

      <div className="mt-6 rounded-[26px] border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 font-mono text-[0.78rem] font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Мини-игра · недвижимость
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.8rem,4.4vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              Подбери объект под запрос
            </h1>
          </div>
          {status === 'play' && (
            <div className="flex items-center gap-6">
              {[['Очки', score], ['Осталось', `${left} с`]].map(([l, v]) => (
                <div key={l as string} className="text-right">
                  <div className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-mute">{l as string}</div>
                  <div className="font-display text-[1.7rem] font-bold tabular-nums">{v as string}</div>
                </div>
              ))}
              <div className="text-right">
                <div className="font-mono text-[0.68rem] uppercase tracking-wider text-ink-mute">Клиенты</div>
                <div className="text-[1.3rem] leading-none">
                  {'●'.repeat(Math.max(0, lives))}<span className="opacity-25">{'●'.repeat(3 - Math.max(0, lives))}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {status === 'idle' && (
          <div className="mt-6 rounded-[22px] border border-line bg-bg p-8 text-center">
            <p className="mx-auto max-w-[48ch] text-[1.05rem] text-ink-soft">
              Клиент называет требование — выберите единственный подходящий объект из трёх.
              На каждый запрос 9 секунд: покупатель не ждёт. Три ошибки — и клиент уходит.
            </p>
            <button onClick={start} className="mt-6 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hov">
              Начать приём →
            </button>
            {best > 0 && <div className="mt-3 font-mono text-[0.82rem] text-ink-mute">рекорд: {best}</div>}
          </div>
        )}

        {status === 'play' && (
          <div className="mt-6">
            {/* запрос клиента */}
            <div className="rounded-[18px] border border-line bg-bg p-5">
              <div className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-mute">Запрос клиента</div>
              <div className="mt-1.5 font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-bold">{round.req.text}</div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-accent transition-[width] duration-100" style={{ width: `${roundLeft}%` }} />
              </div>
            </div>

            {/* варианты */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {round.flats.map((f) => {
                const st = flash && flash.id === f.id ? (flash.ok ? 'ok' : 'bad') : flash && flash.id === -1 && f.id === round.answer ? 'miss' : null
                return (
                  <button key={f.id} onClick={() => pick(f.id)}
                    className={`rounded-[18px] border-2 bg-surface p-4 text-left transition-all hover:-translate-y-1 ${
                      st === 'ok' ? 'border-accent bg-accent-soft' : st === 'bad' ? 'border-[#C4562F]' : st === 'miss' ? 'border-dashed border-accent' : 'border-line hover:border-accent'
                    }`}>
                    <div className="text-accent"><PlanIcon rooms={f.rooms} /></div>
                    <div className="mt-3 font-display text-[1.15rem] font-bold">{f.rooms}-комнатная</div>
                    <dl className="mt-2 flex flex-col gap-1 font-mono text-[0.84rem] text-ink-soft">
                      <div className="flex justify-between"><dt>цена</dt><dd className="text-ink">{f.price.toFixed(1).replace('.', ',')} млн</dd></div>
                      <div className="flex justify-between"><dt>этаж</dt><dd className="text-ink">{f.floor} из 16</dd></div>
                      <div className="flex justify-between"><dt>метро</dt><dd className="text-ink">{f.metro} мин</dd></div>
                    </dl>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {status === 'over' && (
          <div className="mt-6 rounded-[22px] border border-line bg-bg p-8 text-center">
            <div className="font-display text-[2.1rem] font-bold">{verdict}</div>
            <p className="mt-2 text-[1.05rem] text-ink-soft">
              Точность подбора <b className="text-ink">{acc}%</b> · {score} очков · рекорд {Math.max(best, score)}
            </p>
            <p className="mx-auto mt-3 max-w-[48ch] text-[0.95rem] text-ink-mute">
              В реальной продаже так же: выигрывает не тот, у кого больше объектов, а тот, кто быстро понял запрос
              и прислал ровно то, что нужно.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={start} className="rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">Ещё раз</button>
              <a href={`${BASE}leadmagnets/realty-checklist.pdf`} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink hover:border-accent hover:text-accent">
                <IconDoc size={18} /> Чек-лист упаковки объекта
              </a>
            </div>
          </div>
        )}

        <div className="mt-5 border-t border-line pt-5">
          <a href={`${BASE}decks/realty.pptx`} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
            <IconDownload size={18} /> Презентация «Ключи находят хозяина»
          </a>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.82rem] text-ink-mute">
        Демо-материал портфолио. Игра показывает механику вовлечения, а не реальные объекты.
      </p>
    </main>
  )
}
