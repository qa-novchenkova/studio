import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE } from '../data'
import { ArtWeeds, ArtDisease, ArtPest, ArtNutrition, GrowthMeter } from '../components/QuizArt'
import { IconDownload, IconLeaf } from '../components/Icons'

type Kind = 'weeds' | 'disease' | 'pest' | 'nutrition'

const questions: { q: string; options: { t: string; k: Kind }[] }[] = [
  {
    q: 'Как выглядит поле в фазу кущения?',
    options: [
      { t: 'Между рядами активно лезет посторонняя зелень', k: 'weeds' },
      { t: 'На нижних листьях появились пятна и налёт', k: 'disease' },
      { t: 'На листьях следы объедания и повреждения', k: 'pest' },
      { t: 'Посев бледный, светлее нормы', k: 'nutrition' },
    ],
  },
  {
    q: 'Что чаще всего приходится делать внепланово?',
    options: [
      { t: 'Добавлять обработку против нежелательной растительности', k: 'weeds' },
      { t: 'Срочно закрывать поле фунгицидом', k: 'disease' },
      { t: 'Выезжать после сигнала о повреждениях посева', k: 'pest' },
      { t: 'Догонять питание внекорневой подкормкой', k: 'nutrition' },
    ],
  },
  {
    q: 'Где на поле результат заметно хуже?',
    options: [
      { t: 'По краям и вдоль дорог', k: 'weeds' },
      { t: 'В низинах и загущённых участках', k: 'disease' },
      { t: 'Ближе к лесополосе', k: 'pest' },
      { t: 'На возвышенностях и лёгких почвах', k: 'nutrition' },
    ],
  },
  {
    q: 'Что показывает осмотр перед уборкой?',
    options: [
      { t: 'В валке много посторонней массы и семян', k: 'weeds' },
      { t: 'Колос щуплый, есть потемнения', k: 'disease' },
      { t: 'Часть зёрен повреждена', k: 'pest' },
      { t: 'Колос короткий, зерно мелкое', k: 'nutrition' },
    ],
  },
  {
    q: 'На чём обычно экономите в сезон?',
    options: [
      { t: 'На второй обработке против сорной растительности', k: 'weeds' },
      { t: 'На профилактике — лечим по факту', k: 'disease' },
      { t: 'На мониторинге вредных насекомых', k: 'pest' },
      { t: 'На подкормках и анализе почвы', k: 'nutrition' },
    ],
  },
  {
    q: 'Что скажете про прошлый сезон?',
    options: [
      { t: 'Поле быстро зарастало после дождей', k: 'weeds' },
      { t: 'Погода была влажной, болезнь пошла рано', k: 'disease' },
      { t: 'Был массовый лёт вредителя', k: 'pest' },
      { t: 'Удобрения вносили по остаточному принципу', k: 'nutrition' },
    ],
  },
]

const results: Record<Kind, { name: string; lead: string; why: string; fix: string[]; Art: () => React.ReactElement; color: string }> = {
  weeds: {
    name: 'Конкуренция сорной растительности',
    lead: 'Поле делит воду, свет и питание с непрошеными соседями.',
    why: 'Сорная растительность забирает до 12% урожая: культура тратит ресурсы на конкуренцию вместо налива зерна.',
    fix: ['Гербицидная обработка строго в фазу, а не «когда получится»', 'Осмотр краёв поля и разворотных полос', 'Чередование действующих веществ против устойчивости'],
    Art: ArtWeeds,
    color: '#C4562F',
  },
  disease: {
    name: 'Болезни листа и колоса',
    lead: 'Флаг-лист теряет площадь — а именно он кормит зерно.',
    why: 'Болезни съедают до 15% урожая. Во влажную погоду очаг расходится по полю за считанные дни.',
    fix: ['Профилактический фунгицид по флаг-листу', 'Контроль загущённых участков и низин', 'Протравливание семян как старт без инфекции'],
    Art: ArtDisease,
    color: '#B4472C',
  },
  pest: {
    name: 'Вредные насекомые',
    lead: 'Часть колоса уходит не в бункер, а на корм вредителю.',
    why: 'Потери до 9%, причём качество зерна падает сильнее, чем масса: повреждённое зерно снижает класс.',
    fix: ['Мониторинг по порогу вредоносности, а не по календарю', 'Обработка краевых полос при массовом лёте', 'Осмотр посева в фазу колошения'],
    Art: ArtPest,
    color: '#7A5230',
  },
  nutrition: {
    name: 'Дефицит питания',
    lead: 'Растению не хватает элементов в самый нужный момент.',
    why: 'До 11% урожая теряется из-за нехватки азота и микроэлементов в фазы кущения и выхода в трубку.',
    fix: ['Анализ почвы и расчёт нормы под зону поля', 'Подкормка в кущение — на густоту стеблестоя', 'Листовая диагностика в ключевые фазы'],
    Art: ArtNutrition,
    color: '#B98A16',
  },
}

export default function AgroQuiz() {
  const [step, setStep] = useState(-1)
  const [score, setScore] = useState<Record<Kind, number>>({ weeds: 0, disease: 0, pest: 0, nutrition: 0 })
  const total = questions.length

  const pick = (k: Kind) => { setScore((s) => ({ ...s, [k]: s[k] + 1 })); setStep((v) => v + 1) }
  const restart = () => { setScore({ weeds: 0, disease: 0, pest: 0, nutrition: 0 }); setStep(-1) }

  const winner = (Object.keys(score) as Kind[]).reduce((a, b) => (score[b] > score[a] ? b : a), 'weeds')
  const r = results[winner]

  return (
    <main className="mx-auto max-w-[900px] px-6 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-ink-soft hover:text-accent">
        <IconLeaf size={18} /> Студия — на главную
      </Link>

      {/* ИНТРО */}
      {step === -1 && (
        <div className="mt-6 grid items-center gap-8 rounded-[26px] border border-line bg-surface p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Тест · 6 вопросов · 2 минуты
            </span>
            <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.02em]">
              Где поле теряет урожай
            </h1>
            <p className="mt-4 max-w-[46ch] text-[1.06rem] text-ink-soft">
              Ответьте на шесть вопросов о своём поле — определим, какой фактор забирает у вас центнеры
              в первую очередь, и что с этим делать.
            </p>
            <button onClick={() => setStep(0)} className="mt-7 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-hov">
              Пройти тест →
            </button>
          </div>
          <ArtWeeds />
        </div>
      )}

      {/* ВОПРОСЫ */}
      {step >= 0 && step < total && (
        <div className="mt-6">
          <div className="flex items-start gap-6 rounded-[26px] border border-line bg-surface p-7 sm:p-9">
            <div className="hidden shrink-0 sm:block"><GrowthMeter step={step} total={total} /></div>
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                  <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(step / total) * 100}%` }} />
                </div>
                <span className="shrink-0 font-mono text-[0.8rem] text-ink-mute">{step + 1} / {total}</span>
              </div>
              <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold leading-[1.1] text-balance">{questions[step].q}</h2>
              <div className="mt-6 flex flex-col gap-3">
                {questions[step].options.map((o) => (
                  <button key={o.t} onClick={() => pick(o.k)}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-bg px-5 py-4 text-left text-[1rem] transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_28px_-14px_rgba(46,125,79,0.5)]">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong text-[0.8rem] text-ink-mute transition-colors group-hover:border-accent group-hover:text-accent">→</span>
                    {o.t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* РЕЗУЛЬТАТ */}
      {step >= total && (
        <div className="mt-6">
          <div className="overflow-hidden rounded-[26px] border border-line bg-surface">
            <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
              <r.Art />
              <div>
                <span className="text-[0.78rem] font-semibold uppercase tracking-[0.16em]" style={{ color: r.color }}>Главный источник потерь</span>
                <h1 className="mt-2.5 font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold leading-[1.05]">{r.name}</h1>
                <p className="mt-3 text-[1.08rem] text-ink-soft">{r.lead}</p>
                <p className="mt-4 rounded-2xl bg-accent-soft p-4 text-[0.98rem] text-ink">{r.why}</p>
                <div className="mt-5">
                  <div className="text-[0.85rem] font-semibold text-ink-mute">Что делать в первую очередь</div>
                  <ul className="mt-2.5 flex flex-col gap-2">
                    {r.fix.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[0.96rem]">
                        <span className="mt-0.5 shrink-0 text-accent"><IconLeaf size={17} /></span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-line bg-bg px-7 py-5 sm:px-10">
              <a href={`${BASE}leadmagnets/agro-checklist.pdf`} download
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-hov">
                <IconDownload size={18} /> Забрать чек-лист осмотра поля
              </a>
              <a href={`${BASE}decks/agro.pptx`} download
                className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent">
                Презентация «Поле недобирает»
              </a>
              <button onClick={restart} className="ml-auto text-[0.94rem] font-medium text-ink-soft underline decoration-line-strong underline-offset-4 hover:text-ink">
                Пройти заново
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-[0.82rem] text-ink-mute">
            Демо-материал портфолио. Тест показывает механику вовлечения, а не заменяет обследование поля.
          </p>
        </div>
      )}
    </main>
  )
}
