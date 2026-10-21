import type { CSSProperties } from 'react'
import { AuditOutlined, BankOutlined, FieldTimeOutlined, SafetyCertificateOutlined } from '@/components/ui/icons'
import type { SectionProps } from '@/dictionaries'
import { Container } from '@/components/ui/Section'

/** Icon theo id trong dict.trust.items */
const trustIcons = {
  phd: SafetyCertificateOutlined,
  rmit: BankOutlined,
  years: FieldTimeOutlined,
  collegeboard: AuditOutlined,
} as const

/**
 * Section 3 — Trust Bar (nền #F8FAFC), docs/REQUIREMENTS.md mục 12.5.
 * 4 cụm uy tín: mobile 2×2, desktop 4 cột ngăn bằng khoảng trắng (không kẻ thô).
 */
export default function TrustBar({ dict }: SectionProps) {
  const t = dict.trust

  return (
    <section aria-label={t.label} className="bg-surface py-10 md:py-12">
      <Container>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 lg:gap-8">
          {t.items.map((item, index) => {
            const Icon = trustIcons[item.id as keyof typeof trustIcons] ?? SafetyCertificateOutlined
            return (
              <li
                key={item.id}
                data-reveal="up"
                style={{ '--reveal-delay': `${index * 100}ms` } as CSSProperties}
                className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:text-left"
              >
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-xl text-navy-900 shadow-card ring-1 ring-line"
                >
                  <Icon className="text-gold-600" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-lg font-semibold text-navy-900 sm:text-xl">{item.title}</p>
                  <p className="mt-1 text-sm leading-snug text-navy-600">{item.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
