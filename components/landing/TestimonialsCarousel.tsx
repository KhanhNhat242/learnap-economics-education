'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { LeftOutlined, RightOutlined, TrophyOutlined } from '@ant-design/icons'

interface TestimonialItem {
  name: string
  role: string
  score: string
  quote: string
}

interface TestimonialsCarouselProps {
  items: readonly TestimonialItem[]
  /** Tên nhóm cho trình đọc màn hình */
  label: string
  prevLabel: string
  nextLabel: string
}

const AUTOPLAY_MS = 6000
const SWIPE_THRESHOLD = 48

/** Chữ cái đầu của từ đầu và từ cuối ("Học viên A." → "HA"). Không dùng ảnh người thật (AGENTS.md mục 2). */
function initialsOf(name: string) {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
  if (words.length === 0) return ''
  const first = Array.from(words[0])[0] ?? ''
  const last = words.length > 1 ? (Array.from(words[words.length - 1])[0] ?? '') : ''
  return (first + last).toLocaleUpperCase()
}

/**
 * Slider nhẹ, tự viết thay cho antd Carousel (react-slick): các slide xếp chồng trong cùng một ô grid
 * nên luôn cao bằng nhau, không lệch layout khi SSR. Tự chạy 6s, dừng khi hover/focus,
 * tắt tự chạy khi prefers-reduced-motion, hỗ trợ vuốt (pointer events) và phím ←/→.
 */
export default function TestimonialsCarousel({ items, label, prevLabel, nextLabel }: TestimonialsCarouselProps) {
  const count = items.length
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const autoplay = count > 1 && !hovered && !focused && !reducedMotion

  // Hẹn giờ theo từng slide: chuyển tay sẽ đặt lại bộ đếm
  useEffect(() => {
    if (!autoplay) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [autoplay, index, count])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current
    pointerStart.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    go(dx < 0 ? index + 1 : index - 1)
  }

  const navButton =
    'inline-flex size-12 items-center justify-center rounded-full bg-white text-navy-900 shadow-card ring-1 ring-line transition-colors duration-300 hover:bg-navy-900 hover:text-white hover:ring-navy-900'

  return (
    <div
      role="group"
      aria-label={label}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') go(index - 1)
        if (event.key === 'ArrowRight') go(index + 1)
      }}
    >
      {/* Quầng sáng trang trí phía sau thẻ */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-8 -right-6 hidden size-48 rounded-full bg-gold-300/25 blur-3xl sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-8 hidden size-56 rounded-full bg-brand-teal/10 blur-3xl sm:block"
      />

      <div
        aria-live={autoplay ? 'off' : 'polite'}
        className="relative grid touch-pan-y select-none sm:select-auto"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerStart.current = null
        }}
      >
        {items.map((item, i) => {
          const active = i === index
          return (
            <figure
              key={item.name}
              role="group"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={`col-start-1 row-start-1 flex h-full flex-col rounded-3xl bg-white p-7 shadow-card ring-1 ring-line transition-all duration-700 ease-out motion-reduce:transition-none sm:p-10 ${
                active ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-4 opacity-0'
              }`}
            >
              <span aria-hidden className="block h-12 font-serif text-7xl leading-none text-gold-500/30 select-none">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 font-serif text-lg leading-relaxed text-pretty text-navy-800 italic sm:text-xl">
                <p>{item.quote}</p>
              </blockquote>

              <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    aria-hidden
                    className="inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-xl text-gold-400 ring-4 ring-gold-50"
                  >
                    {initialsOf(item.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-navy-900">{item.name}</span>
                    <span className="block text-sm text-navy-600">{item.role}</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-3 py-1.5 text-xs font-semibold text-white">
                  <TrophyOutlined aria-hidden className="text-gold-400" />
                  {item.score}
                </span>
              </figcaption>
            </figure>
          )
        })}
      </div>

      {count > 1 && (
        <div className="relative mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            {items.map((item, i) => {
              const active = i === index
              return (
                <button
                  key={item.name}
                  type="button"
                  aria-label={item.name}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => go(i)}
                  className="group inline-flex h-8 items-center rounded-full px-1.5"
                >
                  <span
                    aria-hidden
                    className={`block h-2.5 rounded-full transition-all duration-500 motion-reduce:transition-none ${
                      active ? 'w-8 bg-gold-500' : 'w-2.5 bg-navy-900/25 group-hover:bg-navy-900/60'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <button type="button" aria-label={prevLabel} onClick={() => go(index - 1)} className={navButton}>
              <LeftOutlined aria-hidden />
            </button>
            <button type="button" aria-label={nextLabel} onClick={() => go(index + 1)} className={navButton}>
              <RightOutlined aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
