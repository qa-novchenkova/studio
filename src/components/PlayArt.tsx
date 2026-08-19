/* Мини-превью интерактивов: каждое в палитре своей ниши, а не в общей зелёной */

const box = 'w-full h-auto'

/* Тест для агронома — зелень + золото + коралл */
export function ArtQuiz() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#EAF3E4" />
      <circle cx="286" cy="26" r="20" fill="#E0A020" opacity=".85" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="112" y={22 + i * 38} width="172" height="28" rx="9" fill="#FFFFFF" stroke="#CFE0C6" />
          <rect x="124" y={32 + i * 38} width={104 - i * 22} height="8" rx="4" fill={['#8FD16A', '#C4562F', '#BFD8B4'][i]} />
          {i === 1 && <circle cx="266" cy={36 + i * 38} r="7" fill="#C4562F" />}
        </g>
      ))}
      <path d="M56 128V76" stroke="#1B5E3A" strokeWidth="6" strokeLinecap="round" />
      <path d="M56 100q-24-8-32 12 22 8 32-12z" fill="#4FA167" />
      <path d="M56 82q24-10 33 8-22 10-33-8z" fill="#8FD16A" />
      <ellipse cx="56" cy="132" rx="26" ry="5" fill="#6B4A2F" opacity=".3" />
    </svg>
  )
}

/* Калькулятор для ресторатора — сливовый + красный + золото */
export function ArtCalc() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#FFF6E8" />
      <rect x="24" y="34" width="150" height="8" rx="4" fill="#E8D6C0" />
      <circle cx="116" cy="38" r="12" fill="#D5283A" />
      <rect x="24" y="74" width="150" height="8" rx="4" fill="#E8D6C0" />
      <circle cx="70" cy="78" r="12" fill="#E0A100" />
      <rect x="204" y="86" width="34" height="40" rx="6" fill="#C9A88F" />
      <rect x="252" y="42" width="34" height="84" rx="6" fill="#D5283A" />
      <path d="M204 126h96" stroke="#2A1620" strokeWidth="3" opacity=".5" />
      <path d="M236 30l10-10 10 10" fill="none" stroke="#E0A100" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Игра «Собери миску» — тёплая зоо-палитра */
export function ArtPetGame() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#FFF4EC" />
      <circle cx="96" cy="34" r="13" fill="#C0664A" />
      <path d="M186 22c8 0 12 6 10 12-2 5-8 8-14 6-6-2-8-8-5-13z" fill="#FF8C42" />
      <rect x="236" y="26" width="30" height="16" rx="8" fill="#FFC24B" />
      <circle cx="150" cy="70" r="11" fill="#6BB7C4" />
      <circle cx="252" cy="74" r="9" fill="#2BA6A0" />
      <path d="M96 106h128a64 64 0 01-128 0z" fill="#FF6B4A" />
      <ellipse cx="160" cy="106" rx="64" ry="10" fill="#C08A5E" />
    </svg>
  )
}

/* Игра «Успей принять машину» — графит + синий + оранжевый */
export function ArtAutoGame() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#1B222C" />
      {[107, 213].map((x) => <path key={x} d={`M${x} 8V142`} stroke="#ffffff" strokeOpacity=".18" strokeWidth="3" strokeDasharray="10 10" />)}
      {[[54, 20, '#2F6BFF'], [160, 44, '#FF7A1A'], [266, 14, '#2F6BFF']].map(([x, y, c], i) => (
        <g key={i}>
          <rect x={(x as number) - 20} y={y as number} width="40" height="62" rx="12" fill={c as string} />
          <rect x={(x as number) - 12} y={(y as number) + 12} width="24" height="16" rx="5" fill="#EAF1FF" opacity=".9" />
        </g>
      ))}
      <rect x="120" y="116" width="80" height="12" rx="6" fill="#8D9AAB" />
      <rect x="132" y="98" width="56" height="14" rx="7" fill="#2F6BFF" />
    </svg>
  )
}

/* Игра «Подбери объект» — бумага + изумруд + латунь */
export function ArtRealtyGame() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#F7F5F1" />
      <rect x="20" y="18" width="120" height="24" rx="6" fill="#152420" />
      <rect x="30" y="27" width="76" height="6" rx="3" fill="#E0B25C" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 100} y="58" width="84" height="72" rx="8"
            fill="#FFFFFF" stroke={i === 1 ? '#157A6E' : '#D9D5CC'} strokeWidth={i === 1 ? 3 : 1.5} />
          <rect x={30 + i * 100} y="68" width="64" height="34" fill="none" stroke={i === 1 ? '#157A6E' : '#8C948F'} strokeWidth="2" />
          <path d={`M${62 + i * 100} 68v34M${30 + i * 100} 88h64`} stroke={i === 1 ? '#157A6E' : '#8C948F'} strokeWidth="1.6" />
          <rect x={30 + i * 100} y="110" width="40" height="6" rx="3" fill={i === 1 ? '#C08A2E' : '#D9D5CC'} />
        </g>
      ))}
    </svg>
  )
}

/* Виральный тест — коралл + мятный */
export function ArtPulseQuiz() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#EEF2F6" />
      <circle cx="160" cy="54" r="28" fill="#FF4B57" opacity=".18" />
      <path d="M147 55l9 10 18-21" stroke="#0FA36B" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="86" y="96" width="148" height="10" rx="5" fill="#FF4B57" opacity=".55" />
      <rect x="112" y="116" width="96" height="10" rx="5" fill="#2C93FF" opacity=".5" />
      <circle cx="60" cy="34" r="9" fill="#7C6BFF" opacity=".6" />
      <circle cx="264" cy="120" r="7" fill="#E0A020" opacity=".7" />
    </svg>
  )
}

/* Аркада «Успей обработать лиды» — тёмный фон Пульса */
export function ArtPulseGame() {
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#0F1319" />
      {[[60, 40], [160, 74], [252, 34]].map(([x, y], i) => (
        <g key={i}>
          <rect x={(x as number) - 26} y={y as number} width="52" height="52" rx="14" fill="#171C24" stroke={i === 1 ? '#FF4B57' : '#2C3440'} strokeWidth="2" />
          <rect x={(x as number) - 16} y={(y as number) + 38} width="32" height="5" rx="2.5" fill={i === 1 ? '#FF4B57' : '#0FA36B'} />
        </g>
      ))}
      <circle cx="30" cy="126" r="6" fill="#E0A020" opacity=".8" />
    </svg>
  )
}

export const PLAY_ART = {
  quiz: ArtQuiz, calc: ArtCalc, petgame: ArtPetGame,
  autogame: ArtAutoGame, realtygame: ArtRealtyGame,
  pulsequiz: ArtPulseQuiz, pulsegame: ArtPulseGame,
}
