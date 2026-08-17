// Иллюстрации результатов теста «Где поле теряет урожай».
// Каждая — своя сцена с анимацией: сорняки, болезнь, вредитель, дефицит питания.

const wrap = 'w-full h-auto'

/* 1. Сорняки душат посев */
export function ArtWeeds() {
  return (
    <svg viewBox="0 0 520 360" className={wrap} role="img" aria-label="Сорняки заглушают культуру">
      <defs>
        <linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDF0E4" /><stop offset="1" stopColor="#F5F9F0" />
        </linearGradient>
      </defs>
      <rect width="520" height="360" rx="22" fill="url(#wSky)" />
      <rect x="0" y="286" width="520" height="74" fill="#6B4A2F" opacity=".2" />
      <path d="M0 286 H520" stroke="#8B5E3C" strokeWidth="3" opacity=".45" />
      {/* культурные ростки — зажаты */}
      {[190, 260, 330].map((x, i) => (
        <g key={x} className="sc-grow" style={{ animationDelay: `${i * 0.2}s` }}>
          <path d={`M${x} 286 L${x} ${210 - i * 6}`} stroke="#1B5E3A" strokeWidth="5" strokeLinecap="round" />
          <path d={`M${x} 240 Q ${x - 30} 214, ${x - 44} 244 Q ${x - 22} 256, ${x} 240 Z`} fill="#4FA167" />
          <path d={`M${x} 224 Q ${x + 28} 198, ${x + 42} 228 Q ${x + 20} 240, ${x} 224 Z`} fill="#8FD16A" />
        </g>
      ))}
      {/* агрессивные сорняки */}
      {[[96, 1.15], [140, 0.9], [396, 1.05], [446, 0.85], [300, 0.7]].map(([x, s], i) => (
        <g key={i} className="sc-sway" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x}px 286px` }}>
          <path d={`M${x} 286 C ${Number(x) - 14} 230, ${Number(x) + 16} 200, ${x} ${286 - 150 * Number(s)}`} stroke="#C4562F" strokeWidth={4.5} fill="none" strokeLinecap="round" />
          {[0.35, 0.6, 0.85].map((t, k) => {
            const y = 286 - 150 * Number(s) * t
            const dir = k % 2 ? 1 : -1
            return <path key={k} d={`M${x} ${y} Q ${Number(x) + dir * 34} ${y - 26}, ${Number(x) + dir * 50} ${y + 4} Q ${Number(x) + dir * 26} ${y + 14}, ${x} ${y} Z`} fill={k === 1 ? '#E07A4A' : '#C4562F'} opacity=".92" />
          })}
          <circle cx={x} cy={286 - 150 * Number(s)} r="7" fill="#F2C14E" />
        </g>
      ))}
    </svg>
  )
}

/* 2. Болезнь на листе */
export function ArtDisease() {
  return (
    <svg viewBox="0 0 520 360" className={wrap} role="img" aria-label="Пятна болезни на листе">
      <rect width="520" height="360" rx="22" fill="#EAF3E4" />
      {/* крупный лист */}
      <g className="sc-sway" style={{ transformOrigin: '260px 330px' }}>
        <path d="M260 330 C 120 268, 128 118, 260 60 C 392 118, 400 268, 260 330 Z" fill="#3E9160" />
        <path d="M260 330 L260 62" stroke="#1B5E3A" strokeWidth="5" />
        {[100, 140, 180, 220, 260].map((y, i) => (
          <g key={y}>
            <path d={`M260 ${y} Q ${200 - i * 4} ${y - 22}, ${168 - i * 6} ${y + 6}`} stroke="#2E7D4F" strokeWidth="3" fill="none" />
            <path d={`M260 ${y} Q ${320 + i * 4} ${y - 22}, ${352 + i * 6} ${y + 6}`} stroke="#2E7D4F" strokeWidth="3" fill="none" />
          </g>
        ))}
        {/* пятна поражения — пульсируют */}
        {[[206, 150, 22], [300, 120, 16], [232, 232, 19], [318, 214, 14], [268, 176, 12]].map(([cx, cy, r], i) => (
          <g key={i} className="sc-pulse" style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${cx}px ${cy}px` }}>
            <circle cx={cx} cy={cy} r={Number(r) + 9} fill="#E0A020" opacity=".35" />
            <circle cx={cx} cy={cy} r={r} fill="#C4562F" />
            <circle cx={Number(cx) - 4} cy={Number(cy) - 4} r={Number(r) * 0.38} fill="#8C3B20" opacity=".7" />
          </g>
        ))}
      </g>
      {/* споры */}
      {[[120, 90], [400, 110], [150, 250], [420, 240]].map(([x, y], i) => (
        <circle key={i} className="sc-mote" cx={x} cy={y} r="5" fill="#C4562F" opacity=".55" style={{ animationDelay: `${i * 1.7}s` }} />
      ))}
    </svg>
  )
}

/* 3. Вредитель на колосе */
export function ArtPest() {
  const grains = []
  for (let i = 0; i < 7; i++) {
    const y = 120 + i * 26
    grains.push(<ellipse key={`l${i}`} cx="242" cy={y} rx="16" ry="11" fill="#E0A020" transform={`rotate(-25 242 ${y})`} />)
    grains.push(<ellipse key={`r${i}`} cx="278" cy={y} rx="16" ry="11" fill="#D89A1E" transform={`rotate(25 278 ${y})`} />)
  }
  return (
    <svg viewBox="0 0 520 360" className={wrap} role="img" aria-label="Вредитель повреждает колос">
      <rect width="520" height="360" rx="22" fill="#F7F2E0" />
      <circle cx="430" cy="80" r="46" fill="#F2C14E" opacity=".55" />
      {/* колос */}
      <g className="sc-sway" style={{ transformOrigin: '260px 330px' }}>
        <path d="M260 330 L260 110" stroke="#1B5E3A" strokeWidth="7" strokeLinecap="round" />
        {grains}
        <path d="M260 250 Q 200 226, 172 254 Q 214 268, 260 250 Z" fill="#4FA167" />
      </g>
      {/* жук — ползёт */}
      <g className="sc-crawl">
        <ellipse cx="330" cy="206" rx="34" ry="42" fill="#4A3220" />
        <path d="M330 168 L330 246" stroke="#F4F7F0" strokeWidth="3" opacity=".6" />
        <circle cx="330" cy="156" r="18" fill="#6B4A2F" />
        {[-1, 1].map((d) => (
          <g key={d}>
            <path d={`M${330 + d * 10} 142 q ${d * 14} -18 ${d * 26} -22`} stroke="#4A3220" strokeWidth="4" fill="none" strokeLinecap="round" />
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${330 + d * 30} ${182 + k * 24} l ${d * 26} ${k === 0 ? -12 : 10}`} stroke="#4A3220" strokeWidth="5" strokeLinecap="round" />
            ))}
          </g>
        ))}
        {[[-12, 190], [10, 212], [-6, 232]].map(([dx, cy], i) => (
          <circle key={i} cx={330 + dx} cy={cy} r="6" fill="#E0A020" />
        ))}
      </g>
      {/* погрызы */}
      {[[236, 146], [284, 198], [246, 250]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} a8 8 0 1 0 0.1 0`} fill="#F7F2E0" />
      ))}
    </svg>
  )
}

/* 4. Дефицит питания */
export function ArtNutrition() {
  return (
    <svg viewBox="0 0 520 360" className={wrap} role="img" aria-label="Растению не хватает питания">
      <rect width="520" height="360" rx="22" fill="#FBF6E6" />
      <rect x="0" y="268" width="520" height="92" fill="#6B4A2F" opacity=".22" />
      {/* здоровое растение слева */}
      <g className="sc-sway" style={{ transformOrigin: '140px 268px' }}>
        <path d="M140 268 L140 128" stroke="#1B5E3A" strokeWidth="6" strokeLinecap="round" />
        <path d="M140 190 Q 92 160, 68 194 Q 106 212, 140 190 Z" fill="#2E7D4F" />
        <path d="M140 162 Q 188 132, 212 166 Q 174 184, 140 162 Z" fill="#4FA167" />
        <path d="M140 218 Q 96 196, 78 226 Q 112 240, 140 218 Z" fill="#8FD16A" />
      </g>
      {/* бледное растение справа */}
      <g className="sc-sway2" style={{ transformOrigin: '360px 268px' }}>
        <path d="M360 268 L360 168" stroke="#B8A44E" strokeWidth="5" strokeLinecap="round" />
        <path d="M360 214 Q 318 190, 300 220 Q 332 234, 360 214 Z" fill="#E7D07A" />
        <path d="M360 190 Q 402 166, 420 196 Q 388 210, 360 190 Z" fill="#F0DFA0" />
      </g>
      {/* элементы питания «летят» к бледному */}
      {[['N', 462, 120], ['P', 470, 190], ['K', 452, 252]].map(([t, x, y], i) => (
        <g key={t as string} className="sc-float" style={{ animationDelay: `${i * 0.6}s` }}>
          <circle cx={x as number} cy={y as number} r="24" fill="#2E7D4F" />
          <text x={x as number} y={(y as number) + 8} textAnchor="middle" fontFamily="Georgia, serif" fontSize="22" fontWeight="bold" fill="#FBF6E6">{t}</text>
        </g>
      ))}
      {/* стрелка «здоровое → бледное» */}
      <path d="M196 96 Q 260 66, 330 100" stroke="#2E7D4F" strokeWidth="3" fill="none" strokeDasharray="7 8" />
      <path d="M312 84 L336 102 L308 112" fill="none" stroke="#2E7D4F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Индикатор прогресса: растение растёт по мере ответов */
export function GrowthMeter({ step, total }: { step: number; total: number }) {
  const t = Math.min(1, step / total)
  const h = 26 + t * 78
  const leaves = Math.round(t * 3)
  return (
    <svg viewBox="0 0 120 140" className="h-[110px] w-[92px]" aria-hidden="true">
      <ellipse cx="60" cy="126" rx="42" ry="9" fill="#6B4A2F" opacity=".25" />
      <path d={`M60 126 L60 ${126 - h}`} stroke="#1B5E3A" strokeWidth="6" strokeLinecap="round" style={{ transition: 'all .5s ease' }} />
      {leaves >= 1 && <path d={`M60 ${126 - h * 0.45} Q 26 ${112 - h * 0.5}, 14 ${132 - h * 0.5} Q 40 ${140 - h * 0.5}, 60 ${126 - h * 0.45} Z`} fill="#4FA167" />}
      {leaves >= 2 && <path d={`M60 ${126 - h * 0.7} Q 94 ${112 - h * 0.72}, 106 ${132 - h * 0.72} Q 80 ${140 - h * 0.72}, 60 ${126 - h * 0.7} Z`} fill="#8FD16A" />}
      {leaves >= 3 && (
        <g>
          {[0, 1, 2, 3].map((i) => {
            const y = 126 - h + i * 11
            return (
              <g key={i}>
                <ellipse cx="52" cy={y} rx="9" ry="6" fill="#E0A020" transform={`rotate(-25 52 ${y})`} />
                <ellipse cx="68" cy={y} rx="9" ry="6" fill="#D89A1E" transform={`rotate(25 68 ${y})`} />
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}
