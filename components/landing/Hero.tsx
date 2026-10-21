import type { CSSProperties } from 'react'
import Image from 'next/image'
import {
  ArrowRightOutlined,
  CheckCircleFilled,
  DownOutlined,
  PlayCircleFilled,
  SafetyCertificateOutlined,
  TrophyOutlined,
  ReadOutlined,
} from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Container } from '@/components/ui/Section'
import { ButtonLink } from '@/components/ui/Button'

/**
 * Section 2 — Hero (#top, nền Navy), docs/REQUIREMENTS.md mục 12.5.
 * Vừa 1 màn hình: min-h-svh, chừa chỗ cho header cố định (h-20).
 * Không dùng data-reveal ở đây: Hero là nội dung LCP, phải hiện ngay khi tải trang.
 */
export default function Hero({ dict }: SectionProps) {
  const t = dict.hero

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy-900 pt-28 pb-16 text-white lg:pt-24 lg:pb-12"
    >
      {/* Nền: ảnh thư viện cổ điển + lớp phủ navy + lưới chấm */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/library-classic-students.avif"
          alt={t.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-900/95 to-navy-900/70" />
        <div aria-hidden className="absolute inset-0 bg-dot-grid" />
        <div aria-hidden className="absolute -right-32 -bottom-40 size-[32rem] rounded-full bg-gold-500/10 blur-3xl" />
        <div aria-hidden className="absolute -top-32 -left-32 size-96 rounded-full bg-brand-teal/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-12 xl:gap-20">
          {/* ===== Trái: chữ + CTA ===== */}
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-gold-300 sm:text-sm">
              <span aria-hidden className="size-1.5 rounded-full bg-brand-teal" />
              {t.tagline}
            </p>

            <h1
              id="hero-title"
              className="mt-6 font-serif text-[2.5rem] leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl lg:text-[3.5rem] xl:text-6xl"
            >
              {t.headlineBefore} <span className="text-gold-400">{t.headlineHighlight}</span> {t.headlineAfter}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-white/75 sm:text-lg">
              {t.subheadline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <ButtonLink href="#consult" variant="gold" size="lg">
                {t.primaryCta}
                <ArrowRightOutlined aria-hidden />
              </ButtonLink>
              <ButtonLink href="#programs" variant="outline-light" size="lg">
                {t.secondaryCta}
              </ButtonLink>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-white/80">
              {t.highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckCircleFilled aria-hidden className="text-brand-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Phải: mockup laptop video bài giảng + 3 badge nổi ===== */}
          <div className="relative mx-auto w-full max-w-xl px-2 pt-8 pb-12 sm:px-8 lg:max-w-none">
            {/* Màn hình laptop */}
            <div className="relative rounded-t-2xl border border-white/10 bg-navy-800 p-2 shadow-2xl shadow-black/40 sm:p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-navy-950">
                <Image
                  src="/images/teacher-chalkboard-economics.avif"
                  alt={t.videoImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 520px, 100vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-transparent" />

                <span
                  aria-hidden
                  className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-500 text-2xl text-navy-900 shadow-gold sm:size-16 sm:text-3xl"
                >
                  <PlayCircleFilled />
                </span>

                {/* Thanh thông tin video */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="text-[10px] font-bold tracking-widest text-gold-300 uppercase sm:text-xs">{t.video.label}</p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-white sm:text-base">{t.video.title}</p>
                  <div aria-hidden className="mt-2 h-1 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-2/5 rounded-full bg-gold-500" />
                  </div>
                </div>
              </div>
            </div>
            {/* Đế laptop */}
            <div aria-hidden className="relative -mx-2 h-3 rounded-b-xl bg-linear-to-b from-navy-700 to-navy-800 sm:-mx-6 sm:h-4">
              <div className="absolute top-0 left-1/2 h-1.5 w-20 -translate-x-1/2 rounded-b-md bg-navy-950/60" />
            </div>

            {/* Badge nổi */}
            <HeroBadge
              icon={<SafetyCertificateOutlined />}
              label={t.badges.phd}
              className="top-0 -left-1 animate-float-slow sm:left-0"
            />
            <HeroBadge
              icon={<TrophyOutlined />}
              label={t.badges.target}
              className="top-1/3 -right-1 animate-float-slower sm:-right-2"
              style={{ animationDelay: '1.2s' }}
            />
            <HeroBadge
              icon={<ReadOutlined />}
              label={t.badges.standard}
              className="bottom-0 left-4 animate-float-slow sm:left-10"
              style={{ animationDelay: '2.4s' }}
            />
          </div>
        </div>
      </Container>

      {/* Gợi ý cuộn — chỉ desktop, khi màn hình đủ cao */}
      <a
        href="#expert"
        aria-label={t.scrollHint}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs font-medium text-white/60 transition-colors hover:text-white [@media(min-height:760px)]:lg:flex"
      >
        <span aria-hidden>{t.scrollHint}</span>
        <DownOutlined aria-hidden className="animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  )
}

interface HeroBadgeProps {
  icon: React.ReactNode
  label: string
  className?: string
  style?: CSSProperties
}

function HeroBadge({ icon, label, className = '', style }: HeroBadgeProps) {
  return (
    <div
      style={style}
      className={`glass-dark absolute z-10 flex items-center gap-2.5 rounded-2xl py-2 pr-4 pl-2 text-xs font-semibold whitespace-nowrap text-white sm:text-sm ${className}`}
    >
      <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-xl bg-gold-500 text-base text-navy-900 sm:size-9">
        {icon}
      </span>
      {label}
    </div>
  )
}
