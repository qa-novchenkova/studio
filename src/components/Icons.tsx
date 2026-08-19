type P = { className?: string; size?: number }
const base = (size = 22) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const })

export const IconLeaf = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M20 4C10 4 4 9 4 16v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M20 4c0 9-5 13-11 13H6c0-7 6-11 14-13z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconWheat = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M12 8c-3 0-4-2-4-4 3 0 4 2 4 4zM12 8c3 0 4-2 4-4-3 0-4 2-4 4zM12 13c-3 0-4-2-4-4 3 0 4 2 4 4zM12 13c3 0 4-2 4-4-3 0-4 2-4 4zM12 18c-3 0-4-2-4-4 3 0 4 2 4 4zM12 18c3 0 4-2 4-4-3 0-4 2-4 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
)
export const IconDrop = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3s6 6.5 6 10.5A6 6 0 016 13.5C6 9.5 12 3 12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconChart = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconDoc = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M6 3h9l3 3v15H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconDownload = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const IconSpark = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12 4.5 10 10 8.5z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" /></svg>
)
export const IconPlay = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" /><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" /></svg>
)
export const IconMail = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconLayout = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 9h18M9 20V9" stroke="currentColor" strokeWidth="2" /></svg>
)
export const IconImage = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" /><circle cx="8.5" cy="10" r="1.6" fill="currentColor" /><path d="M4 17l4.5-4.5 3.5 3 3-2.5L20 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconPen = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 20l4-1 10-10-3-3L5 16l-1 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M14 6l3 3" stroke="currentColor" strokeWidth="2" /></svg>
)
export const IconMotion = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 12h5l2-5 3 10 2-5h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const IconTarget = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="2" /></svg>
)

/* ---- иконки под ниши ---- */
export const IconPlate = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" /></svg>
)
export const IconStar = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 3.5l2.6 5.6 6 .7-4.5 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.4 9.8l6-.7z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" /></svg>
)
export const IconRepeat = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 9a8 8 0 0113-3l3 3M20 15a8 8 0 01-13 3l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M20 4v5h-5M4 20v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
export const IconCalendar = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconPaw = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><ellipse cx="12" cy="16" rx="5" ry="4" stroke="currentColor" strokeWidth="2" /><circle cx="6.5" cy="10.5" r="2" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="10.5" r="2" stroke="currentColor" strokeWidth="2" /><circle cx="9.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="2" /><circle cx="14.5" cy="6.5" r="2" stroke="currentColor" strokeWidth="2" /></svg>
)
export const IconBowl = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 11h18a9 9 0 01-18 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M7 8c0-1.5 2-2 2-3.5M12 7.5c0-1.5 2-2 2-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconHeart = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M12 20s-8-5-8-10a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 5-8 10-8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconBox = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 8l9-4 9 4v8l-9 4-9-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M3 8l9 4 9-4M12 12v8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconChat = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M8 9h8M8 12.5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconCar = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 15l1.4-5A2 2 0 017.3 8.5h9.4a2 2 0 011.9 1.5L20 15v3H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><circle cx="7.5" cy="18" r="1.6" fill="currentColor" /><circle cx="16.5" cy="18" r="1.6" fill="currentColor" /></svg>
)
export const IconWrench = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M20 5.5a5 5 0 01-6.6 6.2L6 19.1 4.9 18l7.4-7.4A5 5 0 0118.5 4l-2.6 2.6 1.5 1.5L20 5.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconClock = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" /><path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconFunnel = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 5h16l-6 7v6l-4 2v-8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconHome = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 11l8-6 8 6v9H4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconPlan = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3.5" y="4.5" width="17" height="15" rx="1.5" stroke="currentColor" strokeWidth="2" /><path d="M12 4.5v8M3.5 12.5h17M12 12.5v7" stroke="currentColor" strokeWidth="2" /></svg>
)
export const IconRoute = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="2" /><circle cx="18" cy="18" r="2.5" stroke="currentColor" strokeWidth="2" /><path d="M8.5 6H14a3 3 0 010 6h-4a3 3 0 000 6h5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
)
export const IconFolder = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 6h6l2 2.5h10V19H3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
)
export const IconDevice = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="6" y="3" width="12" height="18" rx="2.5" stroke="currentColor" strokeWidth="2" /><path d="M10 5.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="12" cy="18" r="1.2" fill="currentColor" /></svg>
)
export const IconCompare = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><rect x="3" y="6" width="7" height="13" rx="1.5" stroke="currentColor" strokeWidth="2" /><rect x="14" y="3" width="7" height="16" rx="1.5" stroke="currentColor" strokeWidth="2" /></svg>
)
export const IconCart = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 5h2.5l2 10h10l2-7H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="19" r="1.5" fill="currentColor" /><circle cx="17" cy="19" r="1.5" fill="currentColor" /></svg>
)
