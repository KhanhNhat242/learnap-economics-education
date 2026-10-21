import { FacebookFilled, MessageOutlined, PhoneOutlined } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Container } from '@/components/ui/Section'
import { Logo } from '@/components/ui/Logo'
import { courses } from '@/data/courses'
import { site } from '@/data/site'

/**
 * Section 10 — Footer (nền Navy đậm), docs/REQUIREMENTS.md mục 12.5.
 * Địa chỉ/bản đồ: chưa hiển thị cho tới khi có Tỉnh/TP & Google Maps (mục 9, Q8).
 * Điều khoản học vụ / Chính sách bảo mật: chưa có trang riêng trong phạm vi → hiển thị tên, chưa gắn link.
 */
export default function Footer({ dict, lang }: SectionProps) {
  const t = dict.footer

  const linkClass = 'text-white/70 transition-colors hover:text-gold-300'
  const headingClass = 'text-xs font-bold tracking-[0.2em] text-gold-400 uppercase'

  return (
    <footer className="bg-navy-950 text-white">
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#top" aria-label={dict.nav.homeLabel} className="inline-block rounded-xl">
              <Logo common={dict.common} theme="light" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">{t.about}</p>
          </div>

          <nav aria-labelledby="footer-courses">
            <p id="footer-courses" className={headingClass}>
              {t.coursesHeading}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {courses.map((course) => (
                <li key={course.id}>
                  <a href="#programs" className={linkClass}>
                    {course.title[lang]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-explore">
            <p id="footer-explore" className={headingClass}>
              {t.exploreHeading}
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {dict.nav.items.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#consult" className={linkClass}>
                  {dict.nav.cta}
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className={headingClass}>{t.contactHeading}</p>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={site.phone.href} className={`group flex items-center gap-3 ${linkClass}`}>
                  <FooterIcon>
                    <PhoneOutlined />
                  </FooterIcon>
                  <span>
                    <span className="block text-xs text-white/50">{t.hotlineLabel}</span>
                    <span className="font-semibold text-white group-hover:text-gold-300">{site.phone.display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <FooterIcon>
                    <FacebookFilled />
                  </FooterIcon>
                  {t.facebookLabel}
                </a>
              </li>
              <li>
                <a
                  href={site.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 ${linkClass}`}
                >
                  <FooterIcon>
                    <MessageOutlined />
                  </FooterIcon>
                  {dict.floating.zalo}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.copyright}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>{t.terms}</li>
            <li>{t.privacy}</li>
          </ul>
        </Container>
      </div>
    </footer>
  )
}

function FooterIcon({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-base text-brand-teal">
      {children}
    </span>
  )
}
