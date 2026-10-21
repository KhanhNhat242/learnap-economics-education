import type { CSSProperties } from 'react'
import Image from 'next/image'
import { InfoCircleOutlined } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import TestimonialsCarousel from './TestimonialsCarousel'

/**
 * Section 8 — Cảm nhận học viên & phụ huynh (docs/REQUIREMENTS.md mục 12.5).
 * Nội dung là MINH HỌA: nhãn sampleNotice là bắt buộc (AGENTS.md mục 2) — không được gỡ bỏ.
 */
export default function Testimonials({ dict }: SectionProps) {
  const t = dict.testimonials

  return (
    <Section id="testimonials" tone="muted" labelledBy="testimonials-title">
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="max-w-xl lg:col-span-5 lg:max-w-none">
          <SectionHeading
            id="testimonials-title"
            align="left"
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
            className="mb-8"
          />

          <div data-reveal="up" style={{ '--reveal-delay': '120ms' } as CSSProperties}>
            <div className="relative aspect-[16/8] overflow-hidden rounded-3xl shadow-card ring-1 ring-line">
              <Image
                src="/images/students-group-tablets.avif"
                alt={t.communityAlt}
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 576px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/25 to-transparent" />
            </div>

            <p className="mt-5 inline-flex items-start gap-2.5 rounded-2xl bg-gold-50 px-4 py-2.5 text-sm leading-snug font-medium text-navy-700 ring-1 ring-gold-300 sm:rounded-full">
              <InfoCircleOutlined aria-hidden className="mt-0.5 shrink-0 text-base text-gold-600" />
              <span>{t.sampleNotice}</span>
            </p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7" data-reveal="right" style={{ '--reveal-delay': '160ms' } as CSSProperties}>
          <TestimonialsCarousel items={t.items} label={t.title} prevLabel={t.prev} nextLabel={t.next} />
        </div>
      </div>
    </Section>
  )
}
