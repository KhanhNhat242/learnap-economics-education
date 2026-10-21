export const locales = ['vi', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'vi'

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

/** Đường dẫn của trang hiện tại ở locale khác: /vi/abc → /en/abc */
export const switchLocalePath = (pathname: string, target: Locale) => {
  const segments = pathname.split('/')
  if (hasLocale(segments[1] ?? '')) segments[1] = target
  else segments.splice(1, 0, target)
  return segments.join('/') || `/${target}`
}
