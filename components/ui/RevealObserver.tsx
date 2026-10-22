'use client'

import { useEffect } from 'react'

const SELECTOR = '[data-reveal]'
/** Tỉ lệ diện tích lọt vào vùng nhìn để bắt đầu hiện */
const SHOW_RATIO = 0.12

/**
 * Gắn class .is-revealed cho phần tử [data-reveal] mỗi khi cuộn tới, và gỡ ra khi phần tử đã ra khỏi hẳn màn hình
 * → animation chạy lại mỗi lần cuộn qua (cả cuộn xuống lẫn cuộn lên).
 * Chỉ gỡ khi tỉ lệ hiển thị = 0 nên phần tử đang nằm ở mép màn hình không bị nhấp nháy.
 * Độ trễ từng phần tử đặt qua style={{ '--reveal-delay': '120ms' }}.
 * Phần tử [data-reveal] được render thêm sau đó (client component) cũng tự được theo dõi qua MutationObserver.
 */
export default function RevealObserver() {
  useEffect(() => {
    const initial = document.querySelectorAll<HTMLElement>(SELECTOR)
    if (!('IntersectionObserver' in window)) {
      initial.forEach((el) => el.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= SHOW_RATIO) {
            entry.target.classList.add('is-revealed')
          } else if (!entry.isIntersecting) {
            entry.target.classList.remove('is-revealed')
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: [0, SHOW_RATIO] },
    )

    initial.forEach((el) => observer.observe(el))

    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          if (node.matches(SELECTOR)) observer.observe(node)
          node.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => observer.observe(el))
        }),
      )
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
