import type { CSSProperties } from 'react'
import {
  AimOutlined,
  BankOutlined,
  FieldTimeOutlined,
  LaptopOutlined,
  SafetyCertificateOutlined,
  TranslationOutlined,
} from '@/components/ui/icons'
import type { Dictionary } from '@/dictionaries'

/** Icon theo id trong dict.trust.items */
const trustIcons = {
  phd: SafetyCertificateOutlined,
  rmit: BankOutlined,
  years: FieldTimeOutlined,
  roadmap: AimOutlined,
  bilingual: TranslationOutlined,
  lms: LaptopOutlined,
} as const

/** Thời gian mỗi thẻ trôi qua (giây) */
const SECONDS_PER_ITEM = 6

type TrustItem = Dictionary['trust']['items'][number]

interface TrustCarouselProps {
  text: Dictionary['trust']
  className?: string
}

/**
 * Băng chuyền uy tín (Trust Bar, docs/REQUIREMENTS.md mục 12.5) — đặt ở cuối section Về Chuyên gia (nền trắng).
 * Chạy liên tục từ phải sang trái, thuần CSS (không cần JS):
 * - Độ rộng thẻ theo container query → hiển thị 4 thẻ (≥56rem) / 2 thẻ (≥36rem) / 1 thẻ.
 * - Track gồm 2 bản sao danh sách, keyframe `marquee` dịch -50% nên vòng lặp liền mạch.
 * - Dừng khi hover/focus. prefers-reduced-motion: không chạy, chuyển sang cuộn ngang bằng tay.
 */
export default function TrustCarousel({ text, className = '' }: TrustCarouselProps) {
  return (
    <div
      role="group"
      aria-label={text.label}
      data-reveal="up"
      className={`group @container relative overflow-hidden motion-reduce:snap-x motion-reduce:snap-mandatory motion-reduce:overflow-x-auto ${className}`}
    >
      {/* Mờ dần ở hai mép (cùng màu nền trắng của section) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-white to-transparent sm:w-10 motion-reduce:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-white to-transparent sm:w-10 motion-reduce:hidden"
      />

      <div
        style={{ '--marquee-duration': `${text.items.length * SECONDS_PER_ITEM}s` } as CSSProperties}
        className="flex w-max animate-marquee py-3 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      >
        <TrustList items={text.items} />
        {/* Bản sao chỉ để nối vòng lặp — ẩn với trình đọc màn hình */}
        <TrustList items={text.items} duplicate />
      </div>
    </div>
  )
}

function TrustList({ items, duplicate = false }: { items: readonly TrustItem[]; duplicate?: boolean }) {
  return (
    <ul aria-hidden={duplicate || undefined} inert={duplicate} className={`flex ${duplicate ? 'motion-reduce:hidden' : ''}`}>
      {items.map((item) => {
        const Icon = trustIcons[item.id as keyof typeof trustIcons] ?? SafetyCertificateOutlined
        return (
          <li
            key={item.id}
            className="mr-5 w-[100cqw] shrink-0 snap-start @xl:w-[calc((100cqw_-_1.25rem)/2)] @4xl:w-[calc((100cqw_-_3.75rem)/4)]"
          >
            <div className="group/card flex h-full items-start gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-line transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-50 text-xl text-gold-600 transition-colors duration-300 group-hover/card:bg-navy-900 group-hover/card:text-gold-400"
              >
                <Icon />
              </span>
              <div className="min-w-0">
                <p className="font-serif text-lg leading-snug font-semibold text-navy-900">{item.title}</p>
                <p className="mt-1 text-sm leading-snug text-navy-600">{item.text}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
