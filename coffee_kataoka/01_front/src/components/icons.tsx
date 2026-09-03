interface IconProps {
  className?: string
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
    </svg>
  )
}

export function LineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path
        d="M12 4C6.48 4 2 7.58 2 12c0 3.86 3.5 7.09 8.24 7.82-.36 1.36-.36 1.36-.36 1.36-.06.24.06.42.3.3l2.8-1.66c.3.02.6.04.92.04 5.52 0 10-3.58 10-8s-4.48-8-10-8Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-4 4-6 7-6s5.5 2 7 6" strokeLinecap="round" />
    </svg>
  )
}

export function CartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M4 4h2l1.2 12.4a2 2 0 0 0 2 1.8h7.6a2 2 0 0 0 2-1.7L20 8H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20.5" r="1.2" />
      <circle cx="17" cy="20.5" r="1.2" />
    </svg>
  )
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}
