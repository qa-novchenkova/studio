import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from '../data'
import { IconDownload, IconLeaf, IconDoc } from '../components/Icons'

type Kind = 'meat' | 'veg' | 'fish' | 'vitamin' | 'candy' | 'chips'
type Item = { id: number; x: number; y: number; v: number; kind: Kind }

const GOOD: Kind[] = ['meat', 'veg', 'fish', 'vitamin']
const BAD: Kind[] = ['candy', 'chips']
const LABEL: Record<Kind, string> = {
  meat: 'мясо', veg: 'овощи', fish: 'рыба', vitamin: 'витамины', candy: 'сладости', chips: 'пустые калории',
}
const DURATION = 40

/* иконки ингредиентов — свои SVG */
function Ing({ kind, size = 46 }: { kind: Kind; size?: number }) {
  const c = { meat: '#C0664A', veg: '#FF8C42', fish: '#6BB7C4', vitamin: '#FFC24B', candy: '#E9569C', chips: '#9AAAB4' }[kind]
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      {kind === 'meat' && (
        <>
          <path d="M10 28c0-9 7-16 16-16s14 6 12 14c-2 7-9 10-16 10-7 0-12-3-12-8z" fill={c} />
          <ellipse cx="20" cy="24" rx="7" ry="5" fill="#8B4A34" />
          <circle cx="34" cy="34" r="6" fill="#F3E3D6" />
        </>
      )}
      {kind === 'veg' && (
        <>
          <path d="M24 42c-5-8-8-14-8-19a8 8 0 0116 0c0 5-3 11-8 19z" fill={c} />
          <path d="M20 14c-2-5 1-9 4-10 2 4 1 8-1 10z" fill="#4FA167" />
          <path d="M24 26h0M22 32h4" stroke="#D9752F" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {kind === 'fish' && (
        <>
          <path d="M6 24c6-9 16-12 26-8 4 2 8 5 10 8-2 3-6 6-10 8-10 4-20 1-26-8z" fill={c} />
          <path d="M6 24l-4-7v14z" fill="#4E97A6" />
          <circle cx="32" cy="21" r="2.4" fill="#123" />
        </>
      )}
      {kind === 'vitamin' && (
        <>
          <rect x="10" y="16" width="28" height="16" rx="8" fill={c} />
          <path d="M24 16v16" stroke="#fff" strokeWidth="2" opacity=".7" />
          <circle cx="17" cy="24" r="2.4" fill="#fff" opacity=".85" />
        </>
      )}
      {kind === 'candy' && (
        <>
          <circle cx="24" cy="24" r="11" fill={c} />
          <path d="M13 24l-9-6v12zM35 24l9-6v12z" fill="#F6A8CB" />
          <path d="M20 20l8 8M28 20l-8 8" stroke="#fff" strokeWidth="2" opacity=".8" />
        </>
      )}
      {kind === 'chips' && (
        <>
          <path d="M12 12h24l-4 26H16z" fill={c} />
          <path d="M16 18h16M16 24h16" stroke="#fff" strokeWidth="2" opacity=".65" />
          <circle cx="24" cy="33" r="3" fill="#fff" opacity=".7" />
        </>
      )}
    </svg>
  )
}

export default function PetGame() {
  const [status, setStatus] = useState<'idle' | 'play' | 'over'>('idle')
  const [snap, setSnap] = useState({ items: [] as Item[], score: 0, lives: 3, left: DURATION })
  const [bowlX, setBowlX] = useState(50)
  const [best, setBest] = useState(() => Number(localStorage.getItem('studio-pet-best') || 0))
  const field = useRef<HTMLDivElement>(null)
  const g = useRef({ items: [] as Item[], score: 0, lives: 3, seq: 0, t0: 0, spawn: 0, bowl: 50 })

  const start = () => {
    g.current = { items: [], score: 0, lives: 3, seq: 0, t0: performance.now(), spawn: 0, bowl: 50 }
    setSnap({ items: [], score: 0, lives: 3, left: DURATION })
    setStatus('play')
  }

  // управление: мышь, тач, стрелки
  useEffect(() => {
    if (status !== 'play') return
    const move = (clientX: number) => {
      const el = field.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const pct = Math.max(6, Math.min(94, ((clientX - r.left) / r.width) * 100))
      g.current.bowl = pct
      setBowlX(pct)
    }
    const onMouse = (e: MouseEvent) => move(e.clientX)
    const onTouch = (e: TouchEvent) => e.touches[0] && move(e.touches[0].clientX)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { g.current.bowl = Math.max(6, g.current.bowl - 7); setBowlX(g.current.bowl) }
      if (e.key === 'ArrowRight') { g.current.bowl = Math.min(94, g.current.bowl + 7); setBowlX(g.current.bowl) }
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('keydown', onKey)
    }
  }, [status])

  // игровой цикл
  useEffect(() => {
    if (status !== 'play') return
    const iv = setInterval(() => {
      const s = g.current
      const now = performance.now()
      const elapsed = (now - s.t0) / 1000
      s.spawn += 33

      const every = Math.max(420, 900 - elapsed * 8)
      if (s.spawn >= every) {
        s.spawn = 0
        const bad = Math.random() < 0.3
        const pool = bad ? BAD : GOOD
        s.items.push({
          id: ++s.seq,
          x: 8 + Math.random() * 84,
          y: -8,
          v: 0.85 + Math.random() * 0.5 + elapsed * 0.012,
          kind: pool[Math.floor(Math.random() * pool.length)],
        })
      }

      const alive: Item[] = []
      for (const it of s.items) {
        const y = it.y + it.v
        const caught = y >= 82 && y <= 95 && Math.abs(it.x - s.bowl) < 9
        if (caught) {
          if (GOOD.includes(it.kind)) s.score += 10
          else { s.score = Math.max(0, s.score - 5); s.lives -= 1 }
          continue
        }
        if (y > 100) {
          if (GOOD.includes(it.kind)) s.lives -= 1
          continue
        }
        alive.push({ ...it, y })
      }
      s.items = alive

      const left = Math.max(0, DURATION - Math.floor(elapsed))
      setSnap({ items: s.items.slice(), score: s.score, lives: s.lives, left })

      if (s.lives <= 0 || left <= 0) {
        clearInterval(iv)
        setBest((b) => {
          const nb = Math.max(b, s.score)
          localStorage.setItem('studio-pet-best', String(nb))
          return nb
        })
        setStatus('over')
      }
    }, 33)
    return () => clearInterval(iv)
  }, [status])

  const verdict = snap.score >= 260 ? 'Идеальный рацион' : snap.score >= 140 ? 'Хороший состав' : 'Миска недосыпана'

  return (
    <main className="mx-auto max-w-[900px] px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-soft hover:text-accent">
        <IconLeaf size={18} /> Студия — на главную
      </Link>

      <div className="mt-6 rounded-[26px] border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Мини-игра · корма для животных
            </span>
            <h1 className="mt-3 font-display text-[clamp(1.8rem,4.4vw,2.8rem)] font-bold leading-[1.04] tracking-[-0.02em]">
              Собери правильную миску
            </h1>
          </div>
          {status === 'play' && (
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[0.7rem] uppercase tracking-wider text-ink-mute">Очки</div>
                <div className="font-display text-[1.7rem] font-bold tabular-nums">{snap.score}</div>
              </div>
              <div className="text-right">
                <div className="text-[0.7rem] uppercase tracking-wider text-ink-mute">Осталось</div>
                <div className="font-display text-[1.7rem] font-bold tabular-nums">{snap.left} с</div>
              </div>
              <div className="text-right">
                <div className="text-[0.7rem] uppercase tracking-wider text-ink-mute">Жизни</div>
                <div className="text-[1.3rem] leading-none">
                  {'♥'.repeat(Math.max(0, snap.lives))}<span className="opacity-25">{'♥'.repeat(3 - Math.max(0, snap.lives))}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* поле */}
        <div ref={field} className="relative mt-6 overflow-hidden rounded-[22px] border border-line"
          style={{ height: 'min(60vh, 460px)', background: 'linear-gradient(180deg, var(--color-accent-soft), var(--color-surface))' }}>
          {status === 'idle' && (
            <div className="absolute inset-0 grid place-items-center p-8 text-center">
              <div>
                <div className="mb-4 flex justify-center gap-3">
                  {(['meat', 'veg', 'fish', 'vitamin'] as Kind[]).map((k) => <Ing key={k} kind={k} size={44} />)}
                </div>
                <p className="mx-auto max-w-[44ch] text-[1.05rem] text-ink-soft">
                  Ловите миской полезные ингредиенты и пропускайте пустые калории.
                  Управление — мышью, пальцем или стрелками. У вас {DURATION} секунд.
                </p>
                <button onClick={start} className="mt-6 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hov">
                  Играть →
                </button>
                {best > 0 && <div className="mt-3 text-[0.85rem] text-ink-mute">рекорд: {best}</div>}
              </div>
            </div>
          )}

          {status === 'play' && snap.items.map((it) => (
            <div key={it.id} className="absolute -translate-x-1/2" style={{ left: `${it.x}%`, top: `${it.y}%` }}>
              <Ing kind={it.kind} />
            </div>
          ))}

          {/* миска */}
          {status === 'play' && (
            <div className="absolute bottom-2 -translate-x-1/2" style={{ left: `${bowlX}%` }}>
              <svg width="128" height="74" viewBox="0 0 128 74" aria-hidden="true">
                <ellipse cx="64" cy="20" rx="56" ry="15" fill="#C08A5E" />
                <path d="M8 20q56 62 112 0l-12 34q-44 22-88 0z" fill="var(--color-accent)" />
                <ellipse cx="64" cy="20" rx="42" ry="10" fill="#8B5E3C" opacity=".55" />
              </svg>
            </div>
          )}

          {status === 'over' && (
            <div className="absolute inset-0 grid place-items-center bg-[rgba(20,29,22,0.82)] p-8 text-center">
              <div>
                <div className="font-display text-[2.2rem] font-bold text-white">{verdict}</div>
                <p className="mt-2 text-[1.05rem] text-white/80">
                  Набрано <b className="text-white">{snap.score}</b> очков · рекорд {Math.max(best, snap.score)}
                </p>
                <p className="mx-auto mt-3 max-w-[46ch] text-[0.95rem] text-white/70">
                  В реальной миске работает тот же принцип: важен не объём, а состав — и то, что владелец его понимает.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button onClick={start} className="rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">Ещё раз</button>
                  <a href={`${BASE}leadmagnets/petfood-guide.pdf`} download className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10">
                    <IconDoc size={18} /> Гид по выбору корма
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* легенда */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
          <span className="text-[0.85rem] font-semibold text-ink-mute">Ловим:</span>
          {GOOD.map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-[0.88rem] text-ink-soft"><Ing kind={k} size={22} /> {LABEL[k]}</span>
          ))}
          <span className="ml-2 text-[0.85rem] font-semibold text-ink-mute">Пропускаем:</span>
          {BAD.map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-[0.88rem] text-ink-soft"><Ing kind={k} size={22} /> {LABEL[k]}</span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`${BASE}decks/petfood.pptx`} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
            <IconDownload size={18} /> Презентация «Миска, к которой возвращаются»
          </a>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.82rem] text-ink-mute">
        Демо-материал портфолио. Игра показывает механику вовлечения бренда, а не рекомендации по кормлению.
      </p>
    </main>
  )
}
