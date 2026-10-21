import type { ComponentType } from 'react'
import Image from 'next/image'
import { FileTextOutlined, MessageOutlined, PlayCircleFilled, PlayCircleOutlined } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Icon theo id tính năng trong dict.platform.features */
const featureIcons: Record<string, ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  anytime: PlayCircleOutlined,
  bilingual: FileTextOutlined,
  chat: MessageOutlined,
}

/** Tiến độ mẫu trong mockup LMS (minh họa giao diện, không phải số liệu) */
const MOCK_PROGRESS = 68

/**
 * Section 6 — Nền tảng LMS (#platform), docs/REQUIREMENTS.md mục 12.5.
 * Nền "kính mờ": gradient sáng + 3 đốm màu mờ để thẻ glass khúc xạ rõ.
 * Chữ bên trái, ảnh bên phải (xen kẽ với section Chuyên gia).
 */
export default function Platform({ dict }: SectionProps) {
  const t = dict.platform

  return (
    <Section
      id="platform"
      tone="none"
      labelledBy="platform-title"
      background={
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-white via-surface to-white" />
          <div className="absolute -left-24 -top-24 size-80 rounded-full bg-gold-300/30 blur-3xl sm:size-96" />
          <div className="absolute -right-32 top-1/4 size-96 rounded-full bg-brand-teal/20 blur-3xl lg:size-[28rem]" />
          <div className="absolute -bottom-40 left-1/4 size-96 rounded-full bg-navy-900/10 blur-3xl lg:size-[32rem]" />
        </div>
      }
    >
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Cột trái: tiêu đề + 3 thẻ tính năng kính mờ */}
        <div>
          <SectionHeading
            id="platform-title"
            align="left"
            eyebrow={t.eyebrow}
            title={t.title}
            description={t.description}
            className="mb-8 lg:mb-10"
          />

          <ul className="space-y-4">
            {t.features.map((feature, index) => {
              const Icon = featureIcons[feature.id] ?? PlayCircleOutlined
              return (
                <li
                  key={feature.id}
                  data-reveal="up"
                  style={{ '--reveal-delay': `${index * 120}ms` } as React.CSSProperties}
                >
                  <div className="glass-light flex gap-4 rounded-2xl p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-xl text-gold-400">
                      <Icon aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-navy-900">{feature.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-navy-600">{feature.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Cột phải: ảnh học viên + mockup LMS + bong bóng chat */}
        <div data-reveal="right" className="mb-6 lg:mb-0">
          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 hidden translate-x-4 translate-y-4 rounded-[2rem] border border-gold-300/70 sm:block"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-navy-800 shadow-card-hover">
              <Image
                src="/images/student-headphones-portrait.avif"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 640px) 448px, calc(100vw - 32px)"
                className="object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/25 via-transparent to-transparent" />
            </div>

            {/* (b) Bong bóng chat hỗ trợ — góc trên phải */}
            <div className="absolute -top-5 right-3 flex max-w-[15rem] animate-float-slow gap-3 rounded-2xl rounded-tr-sm bg-white p-3.5 shadow-card-hover sm:-right-8 lg:-right-10">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-teal text-sm text-navy-900">
                <MessageOutlined aria-hidden />
              </span>
              <p className="text-sm leading-snug text-navy-800">{t.mockup.chatMessage}</p>
            </div>

            {/* (a) Thẻ mockup LMS kính mờ — chồng lên mép dưới trái của ảnh */}
            <div className="glass-light absolute -bottom-6 left-3 right-3 rounded-2xl p-4 sm:-left-8 sm:right-auto sm:w-72 lg:-left-12">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-lg text-gold-400">
                  <PlayCircleFilled aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy-900">{t.mockup.course}</p>
                  <p className="truncate text-sm text-navy-700">{t.mockup.lesson}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                <span className="text-navy-700">{t.mockup.progressLabel}</span>
                <span className="text-navy-900">{MOCK_PROGRESS}%</span>
              </div>
              <div aria-hidden className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                <div className="h-full rounded-full bg-gold-500" style={{ width: `${MOCK_PROGRESS}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
