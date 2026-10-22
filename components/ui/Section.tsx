import type { ReactNode } from 'react'
import { EdgeDecor, type DecorVariant } from './EdgeDecor'

export type SectionTone = 'white' | 'muted' | 'navy' | 'none'

const toneClass: Record<SectionTone, string> = {
  white: 'bg-white text-navy-900',
  muted: 'bg-surface text-navy-900',
  navy: 'bg-navy-900 text-white',
  none: '',
}

interface SectionProps {
  id?: string
  tone?: SectionTone
  className?: string
  /** Lớp trang trí tuyệt đối phía sau nội dung (ảnh nền, gradient…) */
  background?: ReactNode
  /** Họa tiết sát hai mép màn hình theo chủ đề section (components/ui/EdgeDecor.tsx) */
  decor?: DecorVariant
  children: ReactNode
  labelledBy?: string
}

/**
 * Khung chuẩn cho mọi section: padding dọc mobile 56px / tablet 80px / desktop 96px
 * (docs/REQUIREMENTS.md mục 12.3) và container max-w-7xl với gutter 16/24/32px.
 */
export function Section({ id, tone = 'white', className = '', background, decor, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate py-8 md:py-12 lg:py-15 ${toneClass[tone]} ${className}`}
    >
      {background}
      {decor && <EdgeDecor variant={decor} theme={tone === 'navy' ? 'dark' : 'light'} />}
      <Container>{children}</Container>
    </section>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
