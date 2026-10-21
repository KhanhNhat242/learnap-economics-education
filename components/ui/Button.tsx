import type { AnchorHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'gold' | 'outline-light' | 'outline-dark' | 'navy'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantClass: Record<ButtonVariant, string> = {
  // Chữ navy trên nền vàng: tương phản ≈ 9:1 (WCAG AA)
  gold: 'bg-gold-500 text-navy-900 shadow-gold hover:bg-gold-400 hover:-translate-y-0.5',
  'outline-light': 'border border-white/30 text-white hover:border-white/60 hover:bg-white/10',
  'outline-dark': 'border border-navy-900/15 text-navy-900 hover:border-navy-900/40 hover:bg-navy-900/5',
  navy: 'bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-0.5',
}

const sizeClass: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

export function buttonClass(variant: ButtonVariant = 'gold', size: ButtonSize = 'md', className = '') {
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 active:translate-y-0 ${variantClass[variant]} ${sizeClass[size]} ${className}`
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: ReactNode
}

/** Nút dạng liên kết (neo trong trang hoặc link ngoài) */
export function ButtonLink({ variant = 'gold', size = 'md', className = '', children, ...props }: ButtonLinkProps) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
    </a>
  )
}
