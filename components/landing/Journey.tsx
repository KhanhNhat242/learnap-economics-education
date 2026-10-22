import type { CSSProperties } from 'react'
import { EditOutlined, FileSearchOutlined, NodeIndexOutlined, TrophyOutlined } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/** Icon theo thứ tự dict.journey.steps: Đánh giá · Lộ trình · Luyện đề · Chinh phục */
const stepIcons = [FileSearchOutlined, NodeIndexOutlined, EditOutlined, TrophyOutlined]

/** Màu xen kẽ vàng / teal. Số thứ tự là chữ lớn (≥24px đậm) nên đạt AA với tương phản ≥3:1 */
const stepTones = [
  { node: 'bg-gold-500 text-navy-900', number: 'text-gold-600' },
  { node: 'bg-brand-teal text-navy-900', number: 'text-brand-teal-dark' },
]

/**
 * Điểm đặt 4 trạm trên con đường (đơn vị viewBox 1000×200). x = tâm của 4 cột (12.5% · 37.5% · 62.5% · 87.5%).
 * Đường uốn lượn: trạm 1 & 3 nằm cao, trạm 2 & 4 nằm thấp — nhãn của trạm thấp đặt bên dưới, trạm cao đặt bên trên.
 */
const STOPS = [
  { x: 125, y: 60 },
  { x: 375, y: 136 },
  { x: 625, y: 54 },
  { x: 875, y: 148 },
]

/** Bezier với tiếp tuyến nằm ngang tại mỗi trạm; đường đi vào từ mép trái-trên, đi ra ở mép phải-dưới */
const ROAD_PATH = (() => {
  const points = [{ x: -20, y: 10 }, ...STOPS, { x: 1020, y: 188 }]
  return points.reduce((d, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`
    const prev = points[i - 1]
    const mid = (point.x - prev.x) / 2
    return `${d} C ${prev.x + mid} ${prev.y}, ${point.x - mid} ${point.y}, ${point.x} ${point.y}`
  }, '')
})()

/**
 * Section 7 — Lộ trình 4 bước (#journey), docs/REQUIREMENTS.md mục 12.5. Bố cục "roadmap infographic":
 * - Desktop (lg): con đường SVG uốn lượn chạy ngang, 4 trạm tròn, nhãn xen kẽ trên/dưới (1 & 3 trên, 2 & 4 dưới).
 *   SVG kéo giãn theo bề rộng (preserveAspectRatio="none") + vector-effect="non-scaling-stroke"
 *   nên bề rộng mặt đường & vạch kẻ giữ nguyên ở mọi kích thước màn hình.
 * - Mobile/tablet: con đường thẳng đứng bên trái, trạm tròn, nội dung bên phải.
 */
export default function Journey({ dict }: SectionProps) {
  const t = dict.journey

  return (
    <Section id="journey" tone="white" labelledBy="journey-title" decor="roadmap">
      <SectionHeading id="journey-title" eyebrow={t.eyebrow} title={t.title} description={t.description} />

      {/* ===== Desktop: roadmap ngang ===== */}
      <div role="list" className="relative hidden grid-cols-4 grid-rows-[auto_13rem_auto] lg:grid">
        <svg
          aria-hidden
          viewBox="0 0 1000 200"
          preserveAspectRatio="none"
          className="pointer-events-none col-span-4 col-start-1 row-start-2 h-full w-full overflow-visible"
        >
          {/* Bóng đổ mặt đường */}
          <path
            d={ROAD_PATH}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-navy-900/10"
            strokeWidth={52}
            strokeLinecap="round"
            transform="translate(0 6)"
          />
          {/* Mặt đường */}
          <path
            d={ROAD_PATH}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-navy-900"
            strokeWidth={40}
            strokeLinecap="round"
          />
          {/* Vạch kẻ giữa đường */}
          <path
            d={ROAD_PATH}
            fill="none"
            vectorEffect="non-scaling-stroke"
            className="stroke-white/80"
            strokeWidth={2}
            strokeDasharray="12 12"
          />
        </svg>

        {t.steps.map((step, index) => {
          const stop = STOPS[index % STOPS.length]
          const labelBelow = index % 2 === 1
          const Icon = stepIcons[index % stepIcons.length]
          const tone = stepTones[index % stepTones.length]
          const number = String(index + 1).padStart(2, '0')

          const label = (
            <div
              data-reveal="up"
              style={{ '--reveal-delay': `${index * 150}ms` } as CSSProperties}
              className={`mx-auto max-w-[17rem] px-3 text-center ${labelBelow ? 'pt-6' : 'pb-6'}`}
            >
              <p className={`font-serif text-3xl font-semibold ${tone.number}`}>{number}.</p>
              <h3 className="mt-1 text-lg font-bold text-balance text-navy-900">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-pretty text-navy-600">{step.text}</p>
            </div>
          )

          return (
            <div
              key={number}
              role="listitem"
              aria-label={`${t.stepLabel} ${number}`}
              style={{ gridColumnStart: index + 1 }}
              className="group row-span-3 row-start-1 grid grid-rows-subgrid"
            >
              <div className="self-end">{!labelBelow && label}</div>

              {/* Trạm trên con đường — vị trí dọc theo y của trạm */}
              <div className="relative">
                <span
                  aria-hidden
                  style={{ top: `${(stop.y / 200) * 100}%` }}
                  className={`absolute left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-2xl shadow-card-hover ring-8 ring-white transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${tone.node}`}
                >
                  <Icon />
                </span>
              </div>

              <div className="self-start">{labelBelow && label}</div>
            </div>
          )
        })}
      </div>

      {/* ===== Mobile / tablet: con đường dọc ===== */}
      <ol className="mx-auto max-w-xl lg:hidden">
        {t.steps.map((step, index) => {
          const Icon = stepIcons[index % stepIcons.length]
          const tone = stepTones[index % stepTones.length]
          const number = String(index + 1).padStart(2, '0')
          const first = index === 0
          const last = index === t.steps.length - 1

          return (
            <li
              key={number}
              data-reveal="up"
              style={{ '--reveal-delay': `${index * 120}ms` } as CSSProperties}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              {/* Đoạn đường của bước này (nối liền giữa các bước) */}
              <span
                aria-hidden
                className={`absolute left-7 w-9 -translate-x-1/2 bg-navy-900 ${first ? 'top-7 rounded-t-full' : 'top-0'} ${
                  last ? 'h-7' : 'bottom-0'
                }`}
              >
                <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-white/80" />
              </span>

              <span
                aria-hidden
                className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full text-xl shadow-card ring-4 ring-white ${tone.node}`}
              >
                <Icon />
              </span>

              <div className="min-w-0 flex-1 pt-1">
                <p className={`font-serif text-2xl font-semibold ${tone.number}`}>
                  <span className="sr-only">{t.stepLabel} </span>
                  {number}.
                </p>
                <h3 className="mt-1 text-lg font-bold text-balance text-navy-900">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-pretty text-navy-600">{step.text}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
