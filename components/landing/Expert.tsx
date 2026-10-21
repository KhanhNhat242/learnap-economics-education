import Image from 'next/image'
import {
  AimOutlined,
  ArrowRightOutlined,
  ReadOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ButtonLink } from '@/components/ui/Button'

/** Icon cho 3 ý USP — đúng thứ tự dict.expert.points: Học vị · Cá nhân hóa · Đồng hành */
const pointIcons = [ReadOutlined, AimOutlined, TeamOutlined]

/** Section 4 — Về Chuyên gia & USP (docs/REQUIREMENTS.md mục 12.5, anchor #expert, nền trắng) */
export default function Expert({ dict }: SectionProps) {
  const t = dict.expert

  return (
    <Section id="expert" tone="white" labelledBy="expert-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ===== Trái: ảnh giảng dạy trực tuyến + thẻ nổi ===== */}
        <div data-reveal="left" className="relative pb-8 sm:pb-6">
          {/* Lưới chấm trang trí */}
          <div
            aria-hidden
            className="absolute -left-6 -top-6 hidden size-28 bg-[radial-gradient(var(--color-navy-900)_1.5px,transparent_1.5px)] bg-[length:14px_14px] opacity-20 sm:block"
          />

          <div className="relative mr-3 sm:mr-5">
            {/* Khối vàng lệch phía sau ảnh */}
            <div
              aria-hidden
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-gold-500/15 sm:translate-x-5 sm:translate-y-5"
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card-hover">
              <Image
                src="/images/online-lecture-chalkboard.avif"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/35 via-transparent to-transparent" />
            </div>

            {/* Chip học vị — góc trên phải */}
            <div className="absolute -top-5 right-3 sm:-right-6">
              <div className="glass-light flex animate-float-slow items-center gap-3 rounded-2xl px-4 py-3">
                <span
                  aria-hidden
                  className="grid size-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-lg text-gold-400"
                >
                  <SafetyCertificateOutlined />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-navy-900">{t.credentialTitle}</span>
                  <span className="mt-0.5 text-xs font-medium text-navy-700">{t.credentialText}</span>
                </span>
              </div>
            </div>

            {/* Thẻ số năm kinh nghiệm — góc dưới trái */}
            <div className="absolute -bottom-8 left-3 sm:-bottom-6 sm:-left-6">
              <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card-hover ring-1 ring-line sm:p-5">
                <span className="font-serif text-4xl font-semibold leading-none text-gold-600 sm:text-5xl">
                  {t.experienceValue}
                </span>
                <span className="max-w-[9rem] text-sm font-medium leading-snug text-navy-600">
                  {t.experienceLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Phải: tiêu đề + 3 ý USP + CTA ===== */}
        <div data-reveal="right">
          <SectionHeading
            id="expert-title"
            eyebrow={t.eyebrow}
            title={t.title}
            align="left"
            className="mb-6! lg:mb-8!"
          />

          <p className="text-base leading-relaxed text-pretty text-navy-600 sm:text-lg">{t.intro}</p>

          <ul className="mt-8 space-y-6">
            {t.points.map((point, index) => {
              const Icon = pointIcons[index % pointIcons.length]
              return (
                <li key={point.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-lg text-gold-400 shadow-card"
                  >
                    <Icon />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-navy-900 sm:text-lg">{point.title}</h3>
                    <p className="mt-1 leading-relaxed text-navy-600">{point.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <ButtonLink href="#consult" variant="navy" size="md" className="mt-10">
            {t.cta}
            <ArrowRightOutlined aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </Section>
  )
}
