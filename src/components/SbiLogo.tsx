import sbiLogo from '../assets/nyx/sbi-logo.svg'

type SbiLogoProps = {
  className?: string
  size?: number
}

export default function SbiLogo({ className = '', size = 32 }: SbiLogoProps) {
  return (
    <img
      src={sbiLogo}
      alt=""
      width={size}
      height={size}
      className={className}
      decoding="async"
      draggable={false}
    />
  )
}
