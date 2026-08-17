import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from '../data'
import { IconDownload, IconLeaf, IconDoc } from '../components/Icons'

type Car = { id: number; lane: number; y: number; v: number; urgent: boolean }
const LANES = 3
const DURATION = 45

/* машина сверху — своя SVG */
function CarSprite({ urgent, w = 78 }: { urgent: boolean; w?: number }) {
  const body = urgent ? '#FF7A1A' : '#2F6BFF'
  return (
    <svg width={w} height={w * 1.6} viewBox="0 0 80 128" aria-hidden="true">
      <rect x="12" y="10" width="56" height="108" rx="18" fill={body} />
      <path d="M20 34h40l-6 22H26z" fill="#EAF1FF" opacity=".92" />
      <path d="M22 92h36l-5-18H27z" fill="#EAF1FF" opacity=".8" />
      <rect x="16" y="52" width="8" height="20" rx="4" fill="#0B0E13" opacity=".35" />
      <rect x="56" y="52" width="8" height="20" rx="4" fill="#0B0E13" opacity=".35" />
      <circle cx="26" cy="18" r="4" fill="#FFF3D6" />
      <circle cx="54" cy="18" r="4" fill="#FFF3D6" />
      {urgent && <circle cx="40" cy="64" r="9" fill="#fff" opacity=".9" />}
      {urgent && <text x="40" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill={body}>!</text>}
    </svg>
  )
}

export default function AutoGame() {
  const [status, setStatus] = useState<'idle' | 'play' | 'over'>('idle')
  const [snap, setSnap] = useState({ cars: [] as Car[], score: 0, lives: 3, left: DURATION, taken: 0, lost: 0 })
  const [lane, setLane] = useState(1)
  const [best, setBest] = useState(() => Number(localStorage.getItem('studio-auto-best') || 0))
  const g = useRef({ cars: [] as Car[], score: 0, lives: 3, seq: 0, t0: 0, last: 0, spawn: 0, lane: 1, taken: 0, lost: 0 })

  const start = () => {
    const now = performance.now()
    g.current = { cars: [], score: 0, lives: 3, seq: 0, t0: now, last: now, spawn: 0, lane: 1, taken: 0, lost: 0 }
    setLane(1)
    setSnap({ cars: [], score: 0, lives: 3, left: DURATION, taken: 0, lost: 0 })
    setStatus('play')
  }

  const setL = (l: number) => { const v = Math.max(0, Math.min(LANES - 1, l)); g.current.lane = v; setLane(v) }

  useEffect(() => {
    if (status !== 'play') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { setL(g.current.lane - 1); e.preventDefault() }
      if (e.key === 'ArrowRight') { setL(g.current.lane + 1); e.preventDefault() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [status])

  useEffect(() => {
    if (status !== 'play') return
    const iv = setInterval(() => {
      const s = g.current
      const t = performance.now()
      const elapsed = (t - s.t0) / 1000
      const dt = Math.min(200, t - s.last)   // реальное время: устойчиво к троттлингу вкладки
      s.last = t
      s.spawn += dt

      const every = Math.max(520, 1150 - elapsed * 11)
      if (s.spawn >= every) {
        s.spawn = 0
        s.cars.push({
          id: ++s.seq,
          lane: Math.floor(Math.random() * LANES),
          y: -18,
          v: 0.75 + Math.random() * 0.35 + elapsed * 0.011,
          urgent: Math.random() < 0.22,
        })
      }

      const alive: Car[] = []
      for (const c of s.cars) {
        const y = c.y + c.v * (dt / 33)
        if (y >= 74 && y <= 90 && c.lane === s.lane) {
          s.score += c.urgent ? 25 : 10
          s.taken += 1
          continue
        }
        if (y > 104) { s.lives -= 1; s.lost += 1; continue }
        alive.push({ ...c, y })
      }
      s.cars = alive

      const left = Math.max(0, DURATION - Math.floor(elapsed))
      setSnap({ cars: s.cars.slice(), score: s.score, lives: s.lives, left, taken: s.taken, lost: s.lost })

      if (s.lives <= 0 || left <= 0) {
        clearInterval(iv)
        setBest((b) => {
          const nb = Math.max(b, s.score)
          localStorage.setItem('studio-auto-best', String(nb))
          return nb
        })
        setStatus('over')
      }
    }, 33)
    return () => clearInterval(iv)
  }, [status])

  const total = snap.taken + snap.lost
  const rate = total ? Math.round((snap.taken / total) * 100) : 0
  const verdict = rate >= 85 ? 'Сервис работает как часы' : rate >= 60 ? 'Половина машин ждёт слишком долго' : 'Заявки уезжают к конкурентам'

  return (
    <main className="mx-auto max-w-[900px] px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-soft hover:text-accent">
        <IconLeaf size={18} /> Студия — на главную
      </Link>

      <div className="mt-6 rounded-[26px] border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Мини-игра · автосервис
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.8rem,4.4vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              Успей принять машину
            </h1>
          </div>
          {status === 'play' && (
            <div className="flex items-center gap-6">
              {[['Очки', snap.score], ['Осталось', `${snap.left} с`]].map(([l, v]) => (
                <div key={l as string} className="text-right">
                  <div className="text-[0.7rem] uppercase tracking-wider text-ink-mute">{l as string}</div>
                  <div className="font-display text-[1.7rem] font-bold tabular-nums">{v as string}</div>
                </div>
              ))}
              <div className="text-right">
                <div className="text-[0.7rem] uppercase tracking-wider text-ink-mute">Жизни</div>
                <div className="text-[1.3rem] leading-none">
                  {'●'.repeat(Math.max(0, snap.lives))}<span className="opacity-25">{'●'.repeat(3 - Math.max(0, snap.lives))}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* дорога */}
        <div className="relative mt-6 overflow-hidden rounded-[22px] border border-line"
          style={{ height: 'min(62vh, 480px)', background: 'linear-gradient(180deg, #1B222C, #12161D)' }}>
          {/* разметка полос */}
          {[1, 2].map((i) => (
            <div key={i} className="absolute top-0 h-full border-l-2 border-dashed border-white/15" style={{ left: `${(i / LANES) * 100}%` }} />
          ))}

          {status === 'play' && snap.cars.map((c) => (
            <div key={c.id} className="absolute -translate-x-1/2 transition-none"
              style={{ left: `${((c.lane + 0.5) / LANES) * 100}%`, top: `${c.y}%` }}>
              <CarSprite urgent={c.urgent} />
            </div>
          ))}

          {/* пост приёмки */}
          {status === 'play' && (
            <div className="absolute bottom-3 -translate-x-1/2" style={{ left: `${((lane + 0.5) / LANES) * 100}%` }}>
              <svg width="150" height="76" viewBox="0 0 150 76" aria-hidden="true">
                <rect x="5" y="30" width="140" height="16" rx="8" fill="#8D9AAB" />
                <rect x="22" y="46" width="16" height="26" rx="6" fill="#5C6B7E" />
                <rect x="112" y="46" width="16" height="26" rx="6" fill="#5C6B7E" />
                <rect x="30" y="6" width="90" height="20" rx="10" fill="#2F6BFF" />
                <text x="75" y="21" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">ПРИЁМКА</text>
              </svg>
            </div>
          )}

          {/* кнопки для мобильных */}
          {status === 'play' && (
            <div className="absolute inset-x-0 bottom-0 flex justify-between p-3 sm:hidden">
              <button onClick={() => setL(lane - 1)} aria-label="Влево" className="h-14 w-20 rounded-2xl bg-white/15 text-2xl text-white backdrop-blur">‹</button>
              <button onClick={() => setL(lane + 1)} aria-label="Вправо" className="h-14 w-20 rounded-2xl bg-white/15 text-2xl text-white backdrop-blur">›</button>
            </div>
          )}

          {status === 'idle' && (
            <div className="absolute inset-0 grid place-items-center p-8 text-center">
              <div>
                <div className="mb-4 flex justify-center gap-6">
                  <CarSprite urgent={false} w={62} />
                  <CarSprite urgent w={62} />
                </div>
                <p className="mx-auto max-w-[46ch] text-[1.05rem] text-white/80">
                  Машины подъезжают по трём полосам. Ставьте приёмку на нужную полосу и принимайте их,
                  пока не уехали. Оранжевые — срочные, дают больше очков.
                </p>
                <p className="mt-2 text-[0.9rem] text-white/55">Управление: стрелки ← → или кнопки внизу</p>
                <button onClick={start} className="mt-6 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hov">
                  Открыть смену →
                </button>
                {best > 0 && <div className="mt-3 text-[0.85rem] text-white/50">рекорд: {best}</div>}
              </div>
            </div>
          )}

          {status === 'over' && (
            <div className="absolute inset-0 grid place-items-center bg-[rgba(9,12,17,0.86)] p-8 text-center">
              <div>
                <div className="font-display text-[2.1rem] font-bold text-white">{verdict}</div>
                <p className="mt-2 text-[1.05rem] text-white/80">
                  Принято <b className="text-white">{snap.taken}</b> из {total} машин — это {rate}% обращений
                </p>
                <p className="mx-auto mt-3 max-w-[46ch] text-[0.95rem] text-white/65">
                  В реальном сервисе всё то же самое: клиент ждёт минуты, а не часы. Скорость первого ответа решает,
                  чья это будет машина.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={start} className="rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">Ещё смена</button>
                  <a href={`${BASE}leadmagnets/auto-audit.pdf`} download className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10">
                    <IconDoc size={18} /> Чек-лист аудита записи
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-[0.88rem] text-ink-soft">
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#2F6BFF]" /> обычная заявка +10</span>
          <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#FF7A1A]" /> срочная +25</span>
          <span className="text-ink-mute">пропустил машину — минус жизнь</span>
        </div>

        <div className="mt-5">
          <a href={`${BASE}decks/auto.pptx`} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
            <IconDownload size={18} /> Презентация «Запись без хаоса»
          </a>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.82rem] text-ink-mute">
        Демо-материал портфолио. Игра показывает механику вовлечения, а не реальные показатели сервиса.
      </p>
    </main>
  )
}
