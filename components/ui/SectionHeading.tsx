interface SectionHeadingProps {
  id?: string
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
  /** 'dark' khi đặt trên nền navy */
  theme?: 'light' | 'dark'
  className?: string
}

/** Tiêu đề section chuẩn: eyebrow + H2 serif + mô tả. Khoảng cách tới nội dung: mb-10 / lg:mb-12. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'
  const dark = theme === 'dark'

  return (
    <div
      data-reveal="up"
      className={`mb-10 lg:mb-12 ${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'} ${className}`}
    >
      <Eyebrow theme={theme} centered={centered}>
        {eyebrow}
      </Eyebrow>
      <h2
        id={id}
        className={`mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${dark ? 'text-white/70' : 'text-navy-600'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function Eyebrow({
  children,
  theme = 'light',
  centered = false,
}: {
  children: string
  theme?: 'light' | 'dark'
  centered?: boolean
}) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${
        theme === 'dark' ? 'text-gold-400' : 'text-gold-600'
      } ${centered ? 'justify-center' : ''}`}
    >
      <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      {children}
      {centered && <span aria-hidden className="h-px w-8 bg-current opacity-70" />}
    </p>
  )
}
