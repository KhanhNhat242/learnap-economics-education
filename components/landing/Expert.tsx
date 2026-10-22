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
import TrustCarousel from './TrustCarousel'

/** Icon cho 3 ý USP — đúng thứ tự dict.expert.points: Học vị · Cá nhân hóa · Đồng hành */
const pointIcons = [ReadOutlined, AimOutlined, TeamOutlined]

/**
 * Section Về Chuyên gia & USP (docs/REQUIREMENTS.md mục 12.5, anchor #expert, nền trắng).
 * Gộp Trust Bar: trên là nội dung chuyên gia, dưới là băng chuyền uy tín tự chạy ngang.
 */
export default function Expert({ dict }: SectionProps) {
  const t = dict.expert

  return (
    <Section id="expert" tone="white" labelledBy="expert-title" decor="academic">
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

            <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-card-hover">
              <Image
                src="/images/online-lecture-chalkboard.avif"
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/35 via-transparent to-transparent" />
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
        </div>
      </div>

      {/* ===== Dưới: băng chuyền uy tín (Trust Bar) ===== */}
      <TrustCarousel text={dict.trust} className="mt-14 lg:mt-20" />
    </Section>
  )
}
