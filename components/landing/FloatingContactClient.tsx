'use client'

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { ArrowUpOutlined, CloseOutlined, MessageOutlined, PhoneOutlined, WechatOutlined } from '@ant-design/icons'
import type { Dictionary } from '@/dictionaries'
import { site } from '@/data/site'

const PANEL_ID = 'floating-contact-panel'
const BACK_TO_TOP_THRESHOLD = 600

function subscribeScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}
const getShowBackToTop = () => window.scrollY > BACK_TO_TOP_THRESHOLD
const getServerShowBackToTop = () => false

interface FloatingContactClientProps {
  text: Dictionary['floating']
}

export default function FloatingContactClient({ text }: FloatingContactClientProps) {
  const [open, setOpen] = useState(false)
  const showBackToTop = useSyncExternalStore(subscribeScroll, getShowBackToTop, getServerShowBackToTop)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Escape đóng panel và trả focus về nút mở
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {/* Panel kênh liên hệ */}
      <div
        id={PANEL_ID}
        role="dialog"
        aria-label={text.title}
        inert={!open}
        className={`w-[min(20rem,calc(100vw-2rem))] origin-bottom-right rounded-3xl border border-line bg-white p-5 shadow-card-hover transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
          open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <p className="font-serif text-lg font-semibold text-navy-900">{text.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-navy-600">{text.text}</p>
        <ul className="mt-4 flex flex-col gap-2">
          <ContactLink href={site.messengerHref} external icon={<MessageOutlined aria-hidden="true" />}>
            {text.messenger}
          </ContactLink>
          <ContactLink href={site.zaloHref} external icon={<WechatOutlined aria-hidden="true" />}>
            {text.zalo}
          </ContactLink>
          <ContactLink href={site.phone.href} icon={<PhoneOutlined aria-hidden="true" />}>
            {text.call}
            <span className="block text-xs font-medium text-navy-500">{site.phone.display}</span>
          </ContactLink>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={text.backToTop}
          onClick={scrollToTop}
          inert={!showBackToTop}
          className={`inline-flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy-900 shadow-card transition-[opacity,transform] duration-300 hover:bg-surface focus-visible:outline-navy-900 motion-reduce:transition-none ${
            showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
          }`}
        >
          <ArrowUpOutlined aria-hidden="true" />
        </button>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={PANEL_ID}
          aria-label={open ? text.close : text.open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-14 items-center justify-center rounded-full bg-gold-500 text-2xl text-navy-900 shadow-gold transition-colors duration-300 hover:bg-gold-600 focus-visible:outline-navy-900"
        >
          {open ? <CloseOutlined aria-hidden="true" /> : <MessageOutlined aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}

interface ContactLinkProps {
  href: string
  icon: ReactNode
  external?: boolean
  children: ReactNode
}

function ContactLink({ href, icon, external = false, children }: ContactLinkProps) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-surface focus-visible:outline-navy-900"
      >
        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-lg text-brand-teal">
          {icon}
        </span>
        <span>{children}</span>
      </a>
    </li>
  )
}
