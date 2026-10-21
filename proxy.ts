import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, hasLocale, type Locale } from '@/lib/i18n-config'

/** Ưu tiên ngôn ngữ đầu tiên trong Accept-Language mà site hỗ trợ; mặc định tiếng Việt. */
function getLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language') ?? ''
  for (const part of header.split(',')) {
    const code = part.split(';')[0].trim().slice(0, 2).toLowerCase()
    if (hasLocale(code)) return code
  }
  return defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const firstSegment = pathname.split('/')[1] ?? ''
  if (hasLocale(firstSegment)) return

  request.nextUrl.pathname = `/${getLocale(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Bỏ qua file nội bộ của Next.js và mọi file tĩnh có phần mở rộng (ảnh, favicon…)
  matcher: ['/((?!_next|.*\\..*).*)'],
}
