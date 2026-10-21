import type { ReactNode } from 'react'

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
  children: ReactNode
  labelledBy?: string
}

/**
 * Khung chuẩn cho mọi section: padding dọc mobile 56px / tablet 80px / desktop 96px
 * (docs/REQUIREMENTS.md mục 12.3) và container max-w-7xl với gutter 16/24/32px.
 */
export function Section({ id, tone = 'white', className = '', background, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate py-14 md:py-20 lg:py-24 ${toneClass[tone]} ${className}`}
    >
      {background}
      <Container>{children}</Container>
    </section>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}
