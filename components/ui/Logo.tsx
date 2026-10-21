import Image from 'next/image'
import { site } from '@/data/site'
import type { Dictionary } from '@/dictionaries'

interface LogoProps {
  common: Dictionary['common']
  /** 'light' = chữ trắng (trên nền navy), 'dark' = chữ navy (trên nền sáng) */
  theme?: 'light' | 'dark'
  className?: string
}

/** Biểu tượng AP (cắt từ logo thật) + wordmark "LearnAP / ECONOMICS" theo đúng nhận diện logo */
export function Logo({ common, theme = 'dark', className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={site.logoMark}
        alt={common.logoAlt}
        width={44}
        height={44}
        priority
        className="size-10 rounded-xl shadow-md ring-1 ring-white/10 sm:size-11"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-sans text-lg font-bold tracking-tight transition-colors duration-300 sm:text-xl ${
            theme === 'light' ? 'text-white' : 'text-navy-900'
          }`}
        >
          {common.brandName.replace('AP', '')}
          <span className="text-gold-500">AP</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] transition-colors duration-300 ${
            theme === 'light' ? 'text-brand-teal' : 'text-brand-teal-dark'
          }`}
        >
          {common.brandSuffix}
        </span>
      </span>
    </span>
  )
}
