import Image from 'next/image'
import { ArrowRightOutlined, CheckCircleFilled } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading, Eyebrow } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/data/site'
import ProgramsGrid from './ProgramsGrid'

/**
 * Section 5 — 5 Khóa học (#programs, nền #F8FAFC), docs/REQUIREMENTS.md mục 4 & 12.5.
 * Dữ liệu khóa học ở data/courses.ts (đúng 5 khóa, đúng thứ tự). Học phí: chưa có (Q5) → "Liên hệ".
 * Cuối section: khối giới thiệu website khóa học — link đặt tập trung ở data/site.ts (courseSiteHref).
 */
export default function Programs({ dict, lang }: SectionProps) {
  const t = dict.programs
  const cs = t.courseSite

  return (
    <Section id="programs" tone="muted" labelledBy="programs-title" decor="economics">
      <SectionHeading id="programs-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <ProgramsGrid text={t} lang={lang} />

      {/* Giới thiệu website khóa học */}
      <div
        data-reveal="up"
        className="relative isolate mt-14 overflow-hidden rounded-3xl bg-navy-900 text-white shadow-card-hover lg:mt-16"
      >
        <div aria-hidden className="absolute inset-0 -z-10 bg-dot-grid" />
        <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-gold-500/15 blur-3xl" />

        <div className="grid items-center lg:grid-cols-[1.2fr_1fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <h3 className="mt-4 font-serif text-2xl leading-tight font-semibold text-balance sm:text-3xl">{cs.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-pretty text-white/75">{cs.text}</p>
            <ButtonLink
              href={site.courseSiteHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              size="md"
              className="mt-8"
            >
              {cs.cta}
              <span className="sr-only"> {cs.newTab}</span>
              <ArrowRightOutlined aria-hidden />
            </ButtonLink>
          </div>

          <div className="relative hidden h-full min-h-72 lg:block">
            <Image
              src="/images/student-laptop-night.avif"
              alt=""
              fill
              sizes="(min-width: 1024px) 520px, 0px"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-r from-navy-900 via-navy-900/30 to-transparent" />
          </div>
        </div>
      </div>
    </Section>
  )
}
