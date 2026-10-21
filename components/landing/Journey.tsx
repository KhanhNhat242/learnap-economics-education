import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/**
 * Section 7 — Lộ trình 4 bước (#journey), docs/REQUIREMENTS.md mục 12.5.
 * Desktop (lg): stepper ngang, đường nối chạy qua tâm các vòng tròn.
 * Mobile/tablet: timeline dọc, vòng tròn bên trái, nội dung bên phải.
 */
export default function Journey({ dict }: SectionProps) {
  const t = dict.journey
  const lastIndex = t.steps.length - 1

  return (
    <Section id="journey" tone="white" labelledBy="journey-title">
      <SectionHeading id="journey-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="relative">
        {/* Đường nối ngang: từ tâm vòng tròn đầu tới tâm vòng tròn cuối (grid 4 cột, gap-8) */}
        <span
          aria-hidden
          className="absolute left-[calc(12.5%-12px)] right-[calc(12.5%-12px)] top-8 hidden h-px bg-linear-to-r from-gold-500 via-gold-300 to-brand-teal lg:block"
        />

        <ol className="relative grid lg:grid-cols-4 lg:gap-8">
          {t.steps.map((step, index) => {
            const number = String(index + 1).padStart(2, '0')
            return (
              <li
                key={number}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
                className="group relative flex gap-5 pb-10 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0"
              >
                {/* Đường nối dọc tới bước kế tiếp (chỉ mobile/tablet) */}
                {index < lastIndex && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-6 top-12 w-px -translate-x-1/2 bg-linear-to-b from-gold-500 to-gold-300 lg:hidden"
                  />
                )}

                <span
                  aria-hidden
                  className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-lg font-semibold text-gold-400 shadow-card ring-4 ring-white transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-900 lg:size-16 lg:text-xl lg:ring-8"
                >
                  {number}
                </span>

                <div className="min-w-0 flex-1 pt-1 lg:mt-6 lg:w-full lg:rounded-2xl lg:bg-surface lg:p-6 lg:text-center lg:transition-[translate,box-shadow,background-color] lg:duration-300 lg:group-hover:-translate-y-1 lg:group-hover:bg-white lg:group-hover:shadow-card-hover">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-600">
                    {t.stepLabel} {number}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-navy-600">{step.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
