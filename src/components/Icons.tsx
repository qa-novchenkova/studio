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
