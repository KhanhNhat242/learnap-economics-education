'use client'

import { useCallback, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'
import Image from 'next/image'
import { Modal } from 'antd'
import { ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import type { Dictionary } from '@/dictionaries'
import type { Locale } from '@/lib/i18n-config'
import { courses, type Course } from '@/data/courses'
import { selectCourse } from '@/lib/events'
import { buttonClass } from '@/components/ui/Button'

interface ProgramsGridProps {
  text: Dictionary['programs']
  lang: Locale
}

const SIDE_SCALE = 0.88
const SWIPE_THRESHOLD = 40
/** Mép ngoài thẻ bên tính từ tâm = side-x + nửa thẻ đã thu nhỏ = card-w × EDGE_FACTOR + 1.25rem */
const EDGE_FACTOR = (1 + SIDE_SCALE) / 2 + SIDE_SCALE / 2

/**
 * Hình học carousel, tính bằng CSS theo container query (cqw = chiều rộng vùng carousel):
 * - --card-w: rộng sao cho nửa vùng chứa đủ [thẻ giữa/2 + thẻ bên + khe 1.25rem + nút 3rem + khe 1.25rem];
 *   chặn trong [15rem, 23.75rem] — mobile chạm mức tối thiểu nên thẻ bên ló ra mép và nằm dưới nút.
 * - --side-x: khoảng từ tâm thẻ giữa tới tâm thẻ bên.  --edge: mép ngoài thẻ bên.
 */
const geometryStyle = {
  '--card-w': `clamp(15rem, (50cqw - 6.75rem) / ${EDGE_FACTOR}, 23.75rem)`,
  '--side-x': `calc(var(--card-w) * ${(1 + SIDE_SCALE) / 2} + 1.25rem)`,
  '--edge': `calc(var(--card-w) * ${EDGE_FACTOR} + 1.25rem)`,
} as CSSProperties

/** Nút ‹ ›: cách mép thẻ bên 1.25rem; nếu vùng chứa hẹp (mobile/tablet) thì dừng ở sát mép vùng chứa */
const navOffset = 'min(calc(50% + var(--edge) + 1.25rem), calc(100% - var(--btn)))'

const navButtonClass =
  'absolute top-1/2 z-40 inline-flex size-(--btn) -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-card ring-1 ring-line backdrop-blur-md transition-colors duration-300 hover:bg-navy-900 hover:text-white hover:ring-navy-900 focus-visible:outline-navy-900'

/**
 * Carousel coverflow cho 5 khóa học (docs/REQUIREMENTS.md mục 12.5 #5): thẻ giữa nổi bật, mỗi bên 1 thẻ thu nhỏ & mờ,
 * các thẻ còn lại ẩn phía sau. Bấm thẻ bên / nút / chấm / vuốt / phím ←→ để chuyển.
 *
 * Vị trí tính hoàn toàn bằng CSS (container query `cqw`) thay vì đo bằng ResizeObserver,
 * nên HTML server render đã đúng bố cục, không bị nhảy khi hydrate:
 *   --card-w: rộng thẻ  ·  --side-x: khoảng cách tâm thẻ bên tới tâm thẻ giữa  ·  --o: vị trí tương đối (-1, 0, 1).
 *
 * "Xem chi tiết" mở modal tổng quan; nút trong modal chọn sẵn khóa học ở form tư vấn rồi cuộn tới #consult.
 */
export default function ProgramsGrid({ text, lang }: ProgramsGridProps) {
  const [current, setCurrent] = useState(0)
  const [active, setActive] = useState<Course | null>(null)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const total = courses.length

  const go = useCallback((next: number) => setCurrent(((next % total) + total) % total), [total])

  /** Vị trí so với thẻ đang chọn, xoay vòng trong [-floor(total/2) … floor(total/2)] */
  const offsetOf = (index: number) => {
    let offset = (index - current) % total
    if (offset > Math.floor(total / 2)) offset -= total
    if (offset < -Math.floor(total / 2)) offset += total
    return offset
  }

  const consultCourse = (course: Course) => {
    setActive(null)
    selectCourse(course.id)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('consult')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return
    const dx = event.clientX - start.x
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(event.clientY - start.y)) return
    go(dx < 0 ? current + 1 : current - 1)
  }

  return (
    <>
      <div
        data-reveal="up"
        role="region"
        aria-roledescription="carousel"
        aria-label={text.carousel.label}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') go(current - 1)
          if (event.key === 'ArrowRight') go(current + 1)
        }}
        style={geometryStyle}
        className="@container relative [--btn:2.5rem] sm:[--btn:3rem]"
      >
        <div className="relative">
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            pointerStart.current = null
          }}
          className="relative h-[29rem] touch-pan-y overflow-hidden sm:h-[30rem]"
        >
          {courses.map((course, index) => {
            const offset = offsetOf(index)
            const abs = Math.abs(offset)
            const isCenter = offset === 0
            const isSide = abs === 1

            return (
              <article
                key={course.id}
                aria-hidden={!isCenter}
                aria-label={`${index + 1} / ${total}`}
                onClick={isSide ? () => go(index) : undefined}
                style={
                  {
                    '--o': isSide ? offset : 0,
                    zIndex: isCenter ? 30 : isSide ? 20 : 0,
                    transform: `translateX(calc(-50% + var(--o) * var(--side-x))) scale(${isCenter ? 1 : isSide ? SIDE_SCALE : 0.7})`,
                  } as CSSProperties
                }
                className={`absolute top-3 bottom-3 left-1/2 flex w-(--card-w) flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition-[transform,opacity,filter,box-shadow] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none ${
                  isCenter
                    ? 'opacity-100 shadow-card-hover'
                    : isSide
                      ? 'cursor-pointer opacity-55 shadow-card blur-[1.5px] hover:opacity-75'
                      : 'pointer-events-none opacity-0'
                }`}
              >
                <div className={`flex h-full flex-col ${isCenter ? '' : 'pointer-events-none'}`}>
                  <div className="relative min-h-0 flex-1 overflow-hidden bg-navy-800">
                    <Image
                      src={course.image}
                      alt={course.imageAlt[lang]}
                      fill
                      sizes="380px"
                      className="object-cover"
                    />
                    <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/40 to-transparent" />
                    <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] truncate rounded-full bg-navy-900/85 px-3 py-1 text-xs font-semibold tracking-wide text-gold-300 backdrop-blur-sm">
                      {course.tag[lang]}
                    </span>
                  </div>

                  <div className="shrink-0 p-5 sm:p-6">
                    <h3 className="line-clamp-2 min-h-[2.75em] font-serif text-lg leading-snug font-semibold text-navy-900 sm:text-xl">
                      {course.title[lang]}
                    </h3>
                    <p className="mt-2 line-clamp-2 min-h-[3.25em] text-sm leading-relaxed text-navy-600 sm:text-[15px]">
                      {course.summary[lang]}
                    </p>
                    <button
                      type="button"
                      tabIndex={isCenter ? 0 : -1}
                      onClick={() => setActive(course)}
                      aria-haspopup="dialog"
                      className="group/cta mt-4 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600 focus-visible:outline-navy-900"
                    >
                      {text.detailCta}
                      <span className="sr-only">: {course.title[lang]}</span>
                      <ArrowRightOutlined
                        aria-hidden
                        className="transition-transform duration-300 group-hover/cta:translate-x-1 motion-reduce:transition-none"
                      />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Nút ‹ › nằm ngoài track overflow-hidden để có thể đặt sát mép ngoài vùng carousel */}
        <button
          type="button"
          onClick={() => go(current - 1)}
          aria-label={text.carousel.prev}
          style={{ right: navOffset }}
          className={navButtonClass}
        >
          <LeftOutlined aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(current + 1)}
          aria-label={text.carousel.next}
          style={{ left: navOffset }}
          className={navButtonClass}
        >
          <RightOutlined aria-hidden />
        </button>
        </div>

        {/* Chấm phân trang */}
        <div className="mt-6 flex items-center justify-center gap-1">
          {courses.map((course, index) => {
            const isCurrent = index === current
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => go(index)}
                aria-label={course.title[lang]}
                aria-current={isCurrent ? 'true' : undefined}
                className="group inline-flex h-8 items-center rounded-full px-1.5"
              >
                <span
                  aria-hidden
                  className={`block h-2.5 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    isCurrent ? 'w-8 bg-gold-500' : 'w-2.5 bg-navy-900/25 group-hover:bg-navy-900/60'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      <Modal
        open={active !== null}
        onCancel={() => setActive(null)}
        footer={null}
        centered
        width={640}
        destroyOnHidden
        closable={{ 'aria-label': text.modal.close }}
        title={active?.title[lang]}
      >
        {active && (
          <div>
            <div className="relative mt-2 aspect-[16/8] overflow-hidden rounded-2xl bg-navy-800">
              <Image
                src={active.image}
                alt={active.imageAlt[lang]}
                fill
                sizes="(min-width: 640px) 592px, 100vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 rounded-full bg-navy-900/85 px-3 py-1 text-xs font-semibold text-gold-300">
                {active.tag[lang]}
              </span>
            </div>

            <p className="mt-6 text-xs font-bold tracking-widest text-gold-600 uppercase">{text.modal.overviewLabel}</p>
            <p className="mt-2 text-base leading-relaxed text-navy-700">{active.description[lang]}</p>

            <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-surface p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-navy-600">{text.modal.tuitionLabel}</p>
                <p className="font-semibold text-navy-900">{text.modal.tuitionValue}</p>
              </div>
              <button type="button" onClick={() => consultCourse(active)} className={buttonClass('gold', 'md')}>
                {text.modal.consultCta}
                <ArrowRightOutlined aria-hidden />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
