import type { SectionProps } from '@/dictionaries'
import SiteHeaderClient from './SiteHeaderClient'

/**
 * Header sticky (docs/REQUIREMENTS.md mục 12.5 #1).
 * Server wrapper: chỉ truyền phần dictionary cần thiết xuống client component để giảm payload.
 * `overlay`: header trong suốt, chữ trắng khi ở đầu trang — chỉ bật khi ngay dưới header là Hero nền Navy.
 */
export default function SiteHeader({ dict, lang, overlay = false }: SectionProps & { overlay?: boolean }) {
  return <SiteHeaderClient nav={dict.nav} common={dict.common} lang={lang} overlay={overlay} />
}
