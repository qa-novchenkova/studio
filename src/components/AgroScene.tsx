// Живая агро-сцена для первого экрана: солнце с лучами, поле, растущие ростки,
// качающиеся колосья и парящая пыльца. Всё — чистый SVG + CSS-анимации.
export default function AgroScene() {
  const ear = (x: number, base: number, h: number, stem: string, grain: string, cls: string, delay = 0) => {
    const parts: React.ReactElement[] = []
    parts.push(<path key="s" d={`M${x} ${base} C ${x + 4} ${base - h * 0.55}, ${x - 2} ${base - h * 0.8}, ${x} ${base - h}`} stroke={stem} strokeWidth={3} fill="none" strokeLinecap="round" />)
    for (let i = 0; i < 6; i++) {
      const t = i / 5
      const cy = base - h + t * h * 0.4
      const gw = 9 - i * 0.6
      parts.push(<ellipse key={`l${i}`} cx={x - gw * 0.6} cy={cy} rx={gw * 0.6} ry={5.4} fill={grain} transform={`rotate(-28 ${x - gw * 0.6} ${cy})`} />)
      parts.push(<ellipse key={`r${i}`} cx={x + gw * 0.6} cy={cy} rx={gw * 0.6} ry={5.4} fill={grain} transform={`rotate(28 ${x + gw * 0.6} ${cy})`} />)
    }
    return (
      <g className={cls} style={{ animationDelay: `${delay}s` }}>
        {parts}
      </g>
    )
  }

  const sprout = (x: number, base: number, h: number, c1: string, c2: string, delay: number) => (
    <g className="sc-grow" style={{ animationDelay: `${delay}s` }}>
      <path d={`M${x} ${base} L${x} ${base - h}`} stroke={c1} strokeWidth={3.4} strokeLinecap="round" />
      <path d={`M${x} ${base - h * 0.55} Q ${x - h * 0.42} ${base - h * 0.9}, ${x - h * 0.62} ${base - h * 0.5} Q ${x - h * 0.34} ${base - h * 0.34}, ${x} ${base - h * 0.55} Z`} fill={c2} />
      <path d={`M${x} ${base - h * 0.78} Q ${x + h * 0.4} ${base - h * 1.08}, ${x + h * 0.56} ${base - h * 0.7} Q ${x + h * 0.3} ${base - h * 0.56}, ${x} ${base - h * 0.78} Z`} fill={c1} />
    </g>
  )

  return (
    <svg viewBox="0 0 600 520" className="h-auto w-full" role="img" aria-label="Иллюстрация: поле, ростки и солнце">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-accent-soft)" />
          <stop offset="1" stopColor="var(--color-surface)" />
        </linearGradient>
        <linearGradient id="fld" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4FA167" />
          <stop offset="1" stopColor="#1B5E3A" />
        </linearGradient>
        <clipPath id="frame"><rect x="0" y="0" width="600" height="520" rx="28" /></clipPath>
      </defs>

      <g clipPath="url(#frame)">
        <rect width="600" height="520" fill="url(#sky)" />

        {/* солнце с медленно вращающимися лучами */}
        <g className="sc-rays">
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2
            const x1 = 470 + Math.cos(a) * 68, y1 = 118 + Math.sin(a) * 68
            const x2 = 470 + Math.cos(a) * 92, y2 = 118 + Math.sin(a) * 92
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-gold)" strokeWidth={5} strokeLinecap="round" opacity={0.35} />
          })}
        </g>
        <circle cx="470" cy="118" r="52" fill="var(--color-gold)" opacity="0.95" />
        <circle cx="470" cy="118" r="76" fill="var(--color-gold)" opacity="0.14" />

        {/* холмы */}
        <path d="M0 250 Q 150 206, 300 236 T 600 214 L600 300 L0 300 Z" fill="#4FA167" opacity="0.35" />
        <path d="M0 268 Q 180 236, 360 264 T 600 246 L600 320 L0 320 Z" fill="#2E7D4F" opacity="0.5" />

        {/* поле с бороздами */}
        <rect x="0" y="284" width="600" height="236" fill="url(#fld)" />
        <g className="sc-rows" opacity="0.34">
          {Array.from({ length: 16 }).map((_, i) => {
            const t = i / 16
            const xh = 300 - 60 + t * 120
            const xb = 300 - 1200 + t * 2400
            return <path key={i} d={`M${xh} 284 L${xb} 520`} stroke="#0E3B24" strokeWidth={i % 2 ? 8 : 4} />
          })}
        </g>
        <rect x="0" y="284" width="600" height="12" fill="var(--color-gold)" opacity="0.3" />

        {/* растущие ростки */}
        {sprout(96, 470, 58, '#0E3B24', '#8FD16A', 0.1)}
        {sprout(180, 500, 74, '#0E3B24', '#BFE39B', 0.45)}
        {sprout(300, 486, 64, '#0E3B24', '#8FD16A', 0.8)}
        {sprout(392, 508, 82, '#0E3B24', '#BFE39B', 1.1)}

        {/* колосья на переднем плане, покачиваются */}
        {ear(58, 520, 150, '#0E3B24', 'var(--color-gold)', 'sc-sway')}
        {ear(524, 520, 168, '#0E3B24', '#D8A93B', 'sc-sway2')}
        {ear(560, 520, 128, '#0E3B24', 'var(--color-gold)', 'sc-sway')}

        {/* пыльца */}
        {[[140, 430, 0], [340, 460, 2.4], [470, 420, 4.1], [230, 480, 6.2]].map(([x, y, d], i) => (
          <circle key={i} className="sc-mote" cx={x} cy={y} r={3.4} fill="#F2C14E" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>
      <rect x="0.5" y="0.5" width="599" height="519" rx="28" fill="none" stroke="var(--color-line)" />
    </svg>
  )
}
