import type { ReactNode } from 'react'

export type DecorVariant = 'academic' | 'trust' | 'economics' | 'roadmap' | 'cta'

/** Nét chính (navy/trắng mờ) và nét nhấn (vàng) theo nền sáng hoặc nền navy */
const lightTone = { main: 'stroke-navy-900/20', accent: 'stroke-gold-500/70', fill: 'fill-gold-500/70' }
const darkTone = { main: 'stroke-white/20', accent: 'stroke-gold-400/70', fill: 'fill-gold-400/70' }

type Tone = typeof lightTone

const common = { fill: 'none', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Mỗi biến thể = [họa tiết mép trái, họa tiết mép phải], vẽ nét trên viewBox 160×160 */
const motifs: Record<DecorVariant, (tone: Tone) => [ReactNode, ReactNode]> = {
  // Về Chuyên gia: mũ tốt nghiệp · sách mở
  academic: (tone) => [
    <g key="cap" {...common}>
      <path className={tone.main} d="M80 38 150 68 80 98 10 68Z" />
      <path className={tone.main} d="M40 84v26c0 14 80 14 80 0V84" />
      <path className={tone.accent} d="M150 68v34m0 0-5 14h10l-5-14" />
    </g>,
    <g key="book" {...common}>
      <path className={tone.main} d="M80 50C60 38 32 38 16 45v80c16-7 44-7 64 5 20-12 48-12 64-5V45c-16-7-44-7-64 5Zm0 0v80" />
      <path className={tone.accent} d="M30 62c12-4 26-4 38 2M30 80c12-4 26-4 38 2M92 64c12-6 26-6 38-2M92 82c12-6 26-6 38-2" />
    </g>,
  ],
  // Trust Bar: khiên chứng nhận · huy hiệu ngôi sao
  trust: (tone) => [
    <g key="shield" {...common}>
      <path className={tone.main} d="M80 22 130 40v40c0 32-22 52-50 60-28-8-50-28-50-60V40Z" />
      <path className={tone.accent} d="m58 80 16 16 30-32" />
    </g>,
    <g key="badge" {...common}>
      <circle className={tone.main} cx="80" cy="70" r="42" />
      <circle className={tone.main} cx="80" cy="70" r="32" strokeDasharray="4 6" />
      <path className={tone.accent} d="m80 50 6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2Z" />
      <path className={tone.main} d="m56 104-10 36 20-8 10 18 8-32M104 104l10 36-20-8-10 18" />
    </g>,
  ],
  // 5 Khóa học: đồ thị cung – cầu · biểu đồ cột tăng trưởng
  economics: (tone) => [
    <g key="supply-demand" {...common}>
      <path className={tone.main} d="M20 18v122h122" />
      <path className={tone.main} d="M32 36c30 20 60 50 100 88" />
      <path className={tone.accent} d="M32 124c34-30 62-58 100-90" />
      <path className={tone.main} d="M81 79H20M81 79v61" strokeDasharray="4 5" />
      <circle className={tone.fill} cx="81" cy="79" r="4" stroke="none" />
    </g>,
    <g key="bars" {...common}>
      <path className={tone.main} d="M18 140h126" />
      <rect className={tone.main} x="26" y="104" width="18" height="36" rx="3" />
      <rect className={tone.main} x="56" y="86" width="18" height="54" rx="3" />
      <rect className={tone.main} x="86" y="94" width="18" height="46" rx="3" />
      <rect className={tone.main} x="116" y="62" width="18" height="78" rx="3" />
      <path className={tone.accent} d="m24 84 34-22 28 10 46-46m0 0h-16m16 0v16" />
    </g>,
  ],
  // Lộ trình: la bàn · đường đi nét đứt tới cờ đích
  roadmap: (tone) => [
    <g key="compass" {...common}>
      <circle className={tone.main} cx="80" cy="80" r="56" />
      <circle className={tone.main} cx="80" cy="80" r="44" strokeDasharray="2 8" />
      <path className={tone.main} d="M80 18v10M80 132v10M18 80h10M132 80h10" />
      <path className={tone.accent} d="m80 46 12 34-12 34-12-34Z" />
      <circle className={tone.fill} cx="80" cy="80" r="3" stroke="none" />
    </g>,
    <g key="flag" {...common}>
      <path className={tone.main} d="M14 146c30-6 22-40 52-46s34-30 22-50" strokeDasharray="5 7" />
      <path className={tone.main} d="M96 120V22" />
      <path className={tone.accent} d="M96 24h44l-10 16 10 16H96" />
      <circle className={tone.fill} cx="88" cy="50" r="4" stroke="none" />
    </g>,
  ],
  // Form tư vấn (nền navy): vòng đồng tâm · chùm sao lấp lánh
  cta: (tone) => [
    <g key="rings" {...common}>
      <circle className={tone.main} cx="80" cy="80" r="60" />
      <circle className={tone.main} cx="80" cy="80" r="42" strokeDasharray="3 7" />
      <circle className={tone.accent} cx="80" cy="80" r="22" />
    </g>,
    <g key="sparkles" {...common}>
      <path className={tone.accent} d="M80 30c4 22 10 28 32 32-22 4-28 10-32 32-4-22-10-28-32-32 22-4 28-10 32-32Z" />
      <path className={tone.main} d="M124 96c2 10 5 13 15 15-10 2-13 5-15 15-2-10-5-13-15-15 10-2 13-5 15-15ZM40 104c2 8 4 10 12 12-8 2-10 4-12 12-2-8-4-10-12-12 8-2 10-4 12-12Z" />
    </g>,
  ],
}

interface EdgeDecorProps {
  variant: DecorVariant
  /** 'dark' khi section nền navy */
  theme?: 'light' | 'dark'
  /** Vị trí dọc: giữa section, hoặc so le (trái cao – phải thấp) */
  align?: 'center' | 'staggered'
  size?: 'md' | 'sm'
}

/**
 * Họa tiết nét mảnh sát mép trái/phải màn hình, chủ đề theo nội dung từng section (không dùng cho Hero).
 * Thuần trang trí: aria-hidden, không nhận click, nằm sau nội dung (-z-10 — section cần `isolate`).
 * Chỉ hiện từ xl (≥1280px): màn nhỏ hơn không còn lề trống hai bên, họa tiết sẽ đè lên nội dung.
 */
export function EdgeDecor({ variant, theme = 'light', align = 'staggered', size = 'md' }: EdgeDecorProps) {
  const [left, right] = motifs[variant](theme === 'dark' ? darkTone : lightTone)
  const sizeClass = size === 'sm' ? 'w-28 2xl:w-32' : 'w-40 2xl:w-48'
  const leftPos = align === 'center' ? 'top-1/2 -translate-y-1/2' : 'top-[18%]'
  const rightPos = align === 'center' ? 'top-1/2 -translate-y-1/2' : 'bottom-[14%]'

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden xl:block">
      <svg viewBox="0 0 160 160" className={`absolute left-0 -translate-x-[45%] ${leftPos} ${sizeClass}`}>
        {left}
      </svg>
      <svg viewBox="0 0 160 160" className={`absolute right-0 translate-x-[45%] ${rightPos} ${sizeClass}`}>
        {right}
      </svg>
    </div>
  )
}
