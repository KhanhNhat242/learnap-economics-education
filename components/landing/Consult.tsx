import Image from 'next/image'
import { CheckCircleFilled } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { courses } from '@/data/courses'
import ConsultForm from './ConsultForm'

/**
 * Section 9 — Form tư vấn / CTA cuối (#consult), docs/REQUIREMENTS.md mục 12.5.
 * Nền Navy + ảnh thư viện mờ; form nổi 4 trường. Demo: chỉ validate + báo thành công (mục 7.3).
 */
export default function Consult({ dict, lang }: SectionProps) {
  const t = dict.consult
  const courseOptions = courses.map((course) => ({ value: course.id, label: course.title[lang] }))

  return (
    <Section
      id="consult"
      tone="navy"
      labelledBy="consult-title"
      background={
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Image
            src="/images/library-bright-hall.avif"
            alt={t.backgroundAlt}
            fill
            sizes="100vw"
            className="scale-105 object-cover opacity-35 blur-[2px]"
          />
          <div aria-hidden className="absolute inset-0 bg-linear-to-br from-navy-950/95 via-navy-900/85 to-navy-900/70" />
          <div aria-hidden className="absolute -bottom-40 -left-32 size-[30rem] rounded-full bg-gold-500/10 blur-3xl" />
        </div>
      }
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16">
        <div>
          <SectionHeading
            id="consult-title"
            align="left"
            theme="dark"
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.message}
            className="mb-8!"
          />
          <ul data-reveal="up" className="space-y-3">
            {t.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3 text-base font-medium text-white/85">
                <CheckCircleFilled aria-hidden className="text-lg text-gold-400" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="up" style={{ '--reveal-delay': '150ms' } as React.CSSProperties}>
          <ConsultForm text={t.form} courseOptions={courseOptions} />
        </div>
      </div>
    </Section>
  )
}
