/* Мини-превью интерактивов: показывают, что внутри, до перехода */

const box = 'w-full h-auto'

export function ArtQuiz() {   // тест: растущее растение + варианты
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="var(--color-accent-soft)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="112" y={22 + i * 38} width="180" height="28" rx="9" fill="var(--color-surface)" stroke="var(--color-line)" />
          <rect x="124" y={32 + i * 38} width={110 - i * 22} height="8" rx="4" fill="var(--color-line-strong)" />
          {i === 1 && <circle cx="276" cy={36 + i * 38} r="7" fill="var(--color-accent)" />}
        </g>
      ))}
      <path d="M56 128V78" stroke="var(--color-accent)" strokeWidth="6" strokeLinecap="round" />
      <path d="M56 100q-24-8-32 12 22 8 32-12z" fill="var(--color-accent)" opacity=".75" />
      <path d="M56 84q24-10 33 8-22 10-33-8z" fill="var(--color-accent)" opacity=".5" />
      <ellipse cx="56" cy="132" rx="26" ry="5" fill="var(--color-line-strong)" opacity=".6" />
    </svg>
  )
}

export function ArtCalc() {   // калькулятор: ползунок + столбцы
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="var(--color-accent-soft)" />
      <rect x="24" y="34" width="150" height="8" rx="4" fill="var(--color-line-strong)" />
      <circle cx="116" cy="38" r="12" fill="var(--color-accent)" />
      <rect x="24" y="74" width="150" height="8" rx="4" fill="var(--color-line-strong)" />
      <circle cx="70" cy="78" r="12" fill="var(--color-accent)" />
      <rect x="204" y="86" width="34" height="40" rx="6" fill="var(--color-line-strong)" />
      <rect x="252" y="42" width="34" height="84" rx="6" fill="var(--color-accent)" />
      <path d="M204 126h96" stroke="var(--color-line-strong)" strokeWidth="3" />
    </svg>
  )
}

export function ArtPetGame() {  // игра: падающие ингредиенты в миску
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="var(--color-accent-soft)" />
      <circle cx="96" cy="34" r="13" fill="#C0664A" />
      <path d="M186 22c8 0 12 6 10 12-2 5-8 8-14 6-6-2-8-8-5-13z" fill="#FF8C42" />
      <rect x="236" y="26" width="30" height="16" rx="8" fill="#FFC24B" />
      <circle cx="150" cy="70" r="11" fill="#6BB7C4" />
      <path d="M96 106h128a64 64 0 01-128 0z" fill="var(--color-accent)" />
      <ellipse cx="160" cy="106" rx="64" ry="10" fill="#C08A5E" />
    </svg>
  )
}

export function ArtAutoGame() {  // игра: полосы и машины
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

export function ArtRealtyGame() {  // игра: три карточки-плана, одна выбрана
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="var(--color-accent-soft)" />
      <rect x="20" y="20" width="86" height="24" rx="8" fill="var(--color-surface)" stroke="var(--color-line)" />
      <rect x="30" y="29" width="60" height="6" rx="3" fill="var(--color-line-strong)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20 + i * 100} y="58" width="84" height="72" rx="10"
            fill="var(--color-surface)" stroke={i === 1 ? 'var(--color-accent)' : 'var(--color-line)'} strokeWidth={i === 1 ? 3 : 1.5} />
          <rect x={30 + i * 100} y="68" width="64" height="34" rx="4" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
          <path d={`M${62 + i * 100} 68v34M${30 + i * 100} 88h64`} stroke="var(--color-accent)" strokeWidth="1.6" />
          <rect x={30 + i * 100} y="110" width="40" height="6" rx="3" fill="var(--color-line-strong)" />
        </g>
      ))}
    </svg>
  )
}

export function ArtPulseQuiz() {  // виральный тест: карточка результата
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="var(--color-accent-soft)" />
      <circle cx="160" cy="56" r="26" fill="var(--color-accent)" opacity=".2" />
      <path d="M148 56l8 9 16-19" stroke="var(--color-accent)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="86" y="96" width="148" height="10" rx="5" fill="var(--color-line-strong)" />
      <rect x="112" y="116" width="96" height="10" rx="5" fill="var(--color-line-strong)" opacity=".6" />
    </svg>
  )
}

export function ArtPulseGame() {  // аркада: заявки с таймерами
  return (
    <svg viewBox="0 0 320 150" className={box} aria-hidden="true">
      <rect width="320" height="150" rx="14" fill="#0F1319" />
      {[[60, 40], [160, 74], [252, 34]].map(([x, y], i) => (
        <g key={i}>
          <rect x={(x as number) - 26} y={y as number} width="52" height="52" rx="14" fill="#171C24" stroke={i === 1 ? '#FF4B57' : '#2C3440'} strokeWidth="2" />
          <rect x={(x as number) - 16} y={(y as number) + 38} width="32" height="5" rx="2.5" fill={i === 1 ? '#FF4B57' : '#0FA36B'} />
        </g>
      ))}
    </svg>
  )
}

export const PLAY_ART = {
  quiz: ArtQuiz, calc: ArtCalc, petgame: ArtPetGame,
  autogame: ArtAutoGame, realtygame: ArtRealtyGame,
  pulsequiz: ArtPulseQuiz, pulsegame: ArtPulseGame,
}
