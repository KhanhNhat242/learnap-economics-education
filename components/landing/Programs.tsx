import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import ProgramsGrid from './ProgramsGrid'

/**
 * Section 5 — 5 Khóa học (#programs, nền #F8FAFC), docs/REQUIREMENTS.md mục 4 & 12.5.
 * Dữ liệu khóa học ở data/courses.ts (đúng 5 khóa, đúng thứ tự). Học phí: chưa có (Q5) → "Liên hệ".
 */
export default function Programs({ dict, lang }: SectionProps) {
  const t = dict.programs

  return (
    <Section id="programs" tone="muted" labelledBy="programs-title">
      <SectionHeading id="programs-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <ProgramsGrid text={t} lang={lang} />
    </Section>
  )
}
