import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from '../data'
import { IconDownload, IconLeaf, IconDoc } from '../components/Icons'

const money = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 0 }) + ' ₽'

function Slider({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-[0.95rem] font-medium text-ink">{label}</span>
        <span className="font-display text-[1.15rem] font-bold text-accent">{value.toLocaleString('ru-RU')} {unit}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-accent)]" />
    </label>
  )
}

export default function MenuCalc() {
  const [guests, setGuests] = useState(90)
  const [check, setCheck] = useState(850)
  const [uplift, setUplift] = useState(15)
  const [weekdayFill, setWeekdayFill] = useState(20)

  const res = useMemo(() => {
    const days = 30
    const now = guests * check * days
    // рост чека + подтягивание будней (будни ≈ 2/3 месяца)
    const guestsAfter = guests * (1 + (weekdayFill / 100) * 0.66)
    const after = guestsAfter * check * (1 + uplift / 100) * days
    return { now, after, diff: after - now, year: (after - now) * 12 }
  }, [guests, check, uplift, weekdayFill])

  const maxV = Math.max(res.now, res.after)
  const hNow = Math.round((res.now / maxV) * 100)
  const hAfter = Math.round((res.after / maxV) * 100)

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-soft hover:text-accent">
        <IconLeaf size={18} /> Студия — на главную
      </Link>

      <div className="mt-6 rounded-[26px] border border-line bg-surface p-7 sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Калькулятор · кафе и рестораны
        </span>
        <h1 className="mt-4 font-display text-[clamp(1.9rem,4.6vw,3rem)] font-bold leading-[1.03] tracking-[-0.02em]">
          Сколько приносит работа с меню
        </h1>
        <p className="mt-3 max-w-[52ch] text-[1.05rem] text-ink-soft">
          Подвигайте ползунки под своё заведение — посчитаем, во что превращается рост среднего чека
          и загрузки будней за месяц и за год.
        </p>

        <div className="mt-8 grid gap-9 lg:grid-cols-[1fr_1fr]">
          {/* вводные */}
          <div className="flex flex-col gap-6">
            <Slider label="Гостей в день" value={guests} min={20} max={400} step={5} unit="чел." onChange={setGuests} />
            <Slider label="Средний чек сейчас" value={check} min={300} max={4000} step={50} unit="₽" onChange={setCheck} />
            <div className="rounded-2xl border border-line bg-bg p-5">
              <div className="text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-ink-mute">Что даёт работа с меню</div>
              <div className="mt-4 flex flex-col gap-5">
                <Slider label="Рост среднего чека" value={uplift} min={0} max={35} step={1} unit="%" onChange={setUplift} />
                <Slider label="Прирост гостей в будни" value={weekdayFill} min={0} max={60} step={5} unit="%" onChange={setWeekdayFill} />
              </div>
            </div>
          </div>

          {/* результат */}
          <div className="flex flex-col">
            <div className="rounded-2xl border border-line bg-bg p-6">
              <div className="flex items-end justify-center gap-10" style={{ height: 220 }}>
                {[['Сейчас', hNow, res.now, 'var(--color-line-strong)'], ['После', hAfter, res.after, 'var(--color-accent)']].map(([l, h, v, c]) => (
                  <div key={l as string} className="flex h-full flex-col items-center justify-end">
                    <span className="mb-2 font-display text-[1.05rem] font-bold" style={{ color: c as string }}>{money(v as number)}</span>
                    <div className="w-[74px] rounded-t-xl transition-[height] duration-500"
                      style={{ height: `${h}%`, background: c as string }} />
                    <span className="mt-2 text-[0.88rem] text-ink-soft">{l as string}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-accent-soft p-5">
                <div className="text-[0.82rem] text-ink-soft">Прибавка в месяц</div>
                <div className="mt-1 font-display text-[1.6rem] font-bold text-accent">{money(res.diff)}</div>
              </div>
              <div className="rounded-2xl border border-line p-5">
                <div className="text-[0.82rem] text-ink-soft">За год</div>
                <div className="mt-1 font-display text-[1.6rem] font-bold text-ink">{money(res.year)}</div>
              </div>
            </div>

            <p className="mt-4 text-[0.85rem] text-ink-mute">
              Расчёт ориентировочный: 30 дней в месяце, прирост гостей учитывается для будних дней.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <a href={`${BASE}leadmagnets/horeca-menu-audit.pdf`} download
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">
            <IconDoc size={18} /> Чек-лист аудита меню
          </a>
          <a href={`${BASE}decks/horeca.pptx`} download
            className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
            <IconDownload size={18} /> Презентация «Меню, которое продаёт»
          </a>
        </div>
      </div>

      <p className="mt-4 text-center text-[0.82rem] text-ink-mute">
        Демо-материал портфолио. Калькулятор показывает механику вовлечения, а не финансовый прогноз.
      </p>
    </main>
  )
}
