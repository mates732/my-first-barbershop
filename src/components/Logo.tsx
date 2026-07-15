interface LogoProps {
  className?: string
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 80 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Spine */}
      <rect x="0" y="0" width="80" height="4" rx="2" fill="#D4B46A" />
      {/* 7 teeth with varied lengths */}
      <rect x="4"   y="6" width="2.5" height="12" rx="1" fill="#D4B46A" />
      <rect x="15"  y="6" width="2.5" height="16" rx="1" fill="#D4B46A" />
      <rect x="26"  y="6" width="2.5" height="10" rx="1" fill="#D4B46A" />
      <rect x="37"  y="6" width="2.5" height="18" rx="1" fill="#D4B46A" />
      <rect x="48"  y="6" width="2.5" height="13" rx="1" fill="#D4B46A" />
      <rect x="59"  y="6" width="2.5" height="15" rx="1" fill="#D4B46A" />
      <rect x="70"  y="6" width="2.5" height="11" rx="1" fill="#D4B46A" />
    </svg>
  )
}
