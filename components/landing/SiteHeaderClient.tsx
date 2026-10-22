'use client'

import { Fragment, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CloseOutlined, MenuOutlined, RightOutlined } from '@ant-design/icons'
import type { Dictionary } from '@/dictionaries'
import { locales, switchLocalePath, type Locale } from '@/lib/i18n-config'
import { buttonClass } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

const SCROLL_THRESHOLD = 16
const MENU_ID = 'site-mobile-menu'

function subscribeScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true })
  return () => window.removeEventListener('scroll', callback)
}
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD
const getServerScrolled = () => false

/** Scroll-spy: id của section đang nằm ở dải giữa màn hình (null khi ở Hero/Consult…) */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join('|')

  useEffect(() => {
    const elements = key
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const visible = new Map<string, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        const current = elements.find((el) => visible.get(el.id))
        setActive(current ? current.id : null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}

interface SiteHeaderClientProps {
  nav: Dictionary['nav']
  common: Dictionary['common']
  lang: Locale
  /** Có Hero nền tối phía sau → trong suốt + chữ trắng khi chưa cuộn */
  overlay: boolean
}

export default function SiteHeaderClient({ nav, common, lang, overlay }: SiteHeaderClientProps) {
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled)
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const active = useActiveSection(nav.items.map((item) => item.id))

  /** Nền trắng (chữ navy) khi đã cuộn, khi panel mobile đang mở, hoặc khi không có Hero tối phía sau */
  const solid = scrolled || open || !overlay
  const focusClass = solid ? 'focus-visible:outline-navy-900' : ''

  // Escape đóng menu và trả focus về nút hamburger
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Lên desktop (lg) thì tự đóng panel mobile
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const closeMenu = () => setOpen(false)

  const barClass = open
    ? 'border-line bg-white shadow-card'
    : solid
      ? 'border-line bg-white/85 shadow-card backdrop-blur-xl'
      : 'border-transparent bg-transparent'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Lớp phủ mờ phía sau panel mobile — bấm để đóng */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 -z-10 bg-navy-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div className={`border-b transition-[background-color,border-color,box-shadow] duration-300 ${barClass}`}>
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-8 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <a
            href="#top"
            aria-label={nav.homeLabel}
            onClick={closeMenu}
            className={`shrink-0 justify-self-start rounded-xl ${focusClass}`}
          >
            <Logo common={common} theme={solid ? 'dark' : 'light'} />
          </a>

          {/* Menu neo — desktop */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {nav.items.map((item) => {
                const isActive = active === item.id
                const color = solid
                  ? isActive
                    ? 'text-navy-900'
                    : 'text-navy-600 hover:text-navy-900'
                  : isActive
                    ? 'text-white'
                    : 'text-white/75 hover:text-white'
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`group relative block rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${color} ${focusClass}`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-gold-500 transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 justify-self-end sm:gap-3">
            <LanguageSwitch lang={lang} common={common} solid={solid} focusClass={focusClass} />
            {/* CTA chỉ hiện từ lg; trên mobile nằm trong panel menu.
                Ẩn/hiện ở thẻ bọc ngoài vì buttonClass() có sẵn `inline-flex` — đặt chung với `hidden` thì inline-flex thắng. */}
            <div className="hidden lg:block">
              <a href="#consult" className={`${buttonClass('gold', 'sm')} ${focusClass}`}>
                {nav.cta}
              </a>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? nav.closeMenu : nav.openMenu}
              onClick={() => setOpen((value) => !value)}
              className={`inline-flex size-11 items-center justify-center rounded-full border text-lg transition-colors duration-300 lg:hidden ${
                solid
                  ? 'border-line bg-surface text-navy-900 hover:bg-line'
                  : 'border-white/20 bg-white/5 text-white hover:bg-white/15'
              } ${focusClass}`}
            >
              {open ? <CloseOutlined aria-hidden="true" /> : <MenuOutlined aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Panel trượt xuống — mobile/tablet */}
      <div
        id={MENU_ID}
        inert={!open}
        className={`absolute inset-x-0 top-full grid rounded-b-3xl bg-white shadow-card-hover transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'pointer-events-none grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <nav className="mx-auto w-full max-w-7xl px-4 pt-3 pb-6 sm:px-6">
            <ul className="flex flex-col gap-1">
              {nav.items.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={closeMenu}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:bg-surface focus-visible:outline-navy-900 ${
                        isActive ? 'bg-surface' : ''
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`size-1.5 rounded-full transition-colors ${isActive ? 'bg-gold-500' : 'bg-line'}`}
                        />
                        {item.label}
                      </span>
                      <RightOutlined aria-hidden="true" className="text-xs text-navy-500" />
                    </a>
                  </li>
                )
              })}
            </ul>
            <a
              href="#consult"
              onClick={closeMenu}
              className={buttonClass('gold', 'lg', 'mt-4 w-full focus-visible:outline-navy-900')}
            >
              {nav.cta}
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

interface LanguageSwitchProps {
  lang: Locale
  common: Dictionary['common']
  solid: boolean
  focusClass: string
}

/** Pill "VI | EN": giữ nguyên trang và vị trí cuộn, chỉ đổi locale */
function LanguageSwitch({ lang, common, solid, focusClass }: LanguageSwitchProps) {
  const pathname = usePathname()

  return (
    <div
      role="group"
      aria-label={common.languageLabel}
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-bold tracking-wide transition-colors duration-300 ${
        solid ? 'border-line bg-surface' : 'border-white/20 bg-white/5'
      }`}
    >
      {locales.map((locale, index) => {
        const isActive = locale === lang
        const color = isActive
          ? solid
            ? 'bg-navy-900 text-white'
            : 'bg-white text-navy-900'
          : solid
            ? 'text-navy-600 hover:text-navy-900'
            : 'text-white/75 hover:text-white'
        return (
          <Fragment key={locale}>
            {index > 0 && (
              <span
                aria-hidden="true"
                className={`mx-0.5 h-3 w-px ${solid ? 'bg-navy-900/15' : 'bg-white/25'}`}
              />
            )}
            <Link
              href={switchLocalePath(pathname, locale)}
              scroll={false}
              hrefLang={locale}
              lang={locale}
              aria-label={`${common.languageLabel}: ${common.languages[locale]}`}
              aria-current={isActive ? 'true' : undefined}
              className={`inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 transition-colors duration-300 ${color} ${focusClass}`}
            >
              {locale.toUpperCase()}
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
}
