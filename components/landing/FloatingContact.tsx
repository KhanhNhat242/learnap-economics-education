import type { SectionProps } from '@/dictionaries'
import FloatingContactClient from './FloatingContactClient'

/**
 * Nút liên hệ nổi góc phải dưới: chat Messenger / Zalo / gọi hotline (docs/REQUIREMENTS.md mục 12.5 #10).
 * Server wrapper: chỉ truyền chuỗi `floating` xuống client component.
 */
export default function FloatingContact({ dict }: SectionProps) {
  return <FloatingContactClient text={dict.floating} />
}
