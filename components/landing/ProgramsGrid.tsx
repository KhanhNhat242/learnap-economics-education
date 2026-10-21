'use client'

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { Modal } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import type { Dictionary } from '@/dictionaries'
import type { Locale } from '@/lib/i18n-config'
import { courses, type Course } from '@/data/courses'
import { selectCourse } from '@/lib/events'
import { buttonClass } from '@/components/ui/Button'

interface ProgramsGridProps {
  text: Dictionary['programs']
  lang: Locale
}

/**
 * Lưới 5 thẻ: lg 3 thẻ trên + 2 thẻ căn giữa dưới (flex-wrap + justify-center), md 2 cột, mobile 1 cột.
 * "Xem chi tiết" mở modal tổng quan; nút trong modal chọn sẵn khóa học ở form tư vấn rồi cuộn tới #consult.
 */
export default function ProgramsGrid({ text, lang }: ProgramsGridProps) {
  const [active, setActive] = useState<Course | null>(null)

  const consultCourse = (course: Course) => {
    setActive(null)
    selectCourse(course.id)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('consult')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-6 lg:gap-8">
        {courses.map((course, index) => (
          <li
            key={course.id}
            data-reveal="up"
            style={{ '--reveal-delay': `${(index % 3) * 120}ms` } as CSSProperties}
            className="w-full md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]"
          >
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-line transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-card-hover motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <div className="relative aspect-[16/9] overflow-hidden bg-navy-800">
                <Image
                  src={course.image}
                  alt={course.imageAlt[lang]}
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-900/40 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-navy-900/85 px-3 py-1 text-xs font-semibold tracking-wide text-gold-300 backdrop-blur-sm">
                  {course.tag[lang]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="font-serif text-xl leading-snug font-semibold text-navy-900">{course.title[lang]}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-navy-600">{course.summary[lang]}</p>
                <button
                  type="button"
                  onClick={() => setActive(course)}
                  aria-haspopup="dialog"
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600 focus-visible:outline-navy-900"
                >
                  {text.detailCta}
                  <span className="sr-only">: {course.title[lang]}</span>
                  <ArrowRightOutlined
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>

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
