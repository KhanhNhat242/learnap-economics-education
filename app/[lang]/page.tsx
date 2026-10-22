import { notFound } from 'next/navigation'
import { getDictionary } from '@/dictionaries'
import { hasLocale } from '@/lib/i18n-config'
import SiteHeader from '@/components/landing/SiteHeader'
import Hero from '@/components/landing/Hero'
import Expert from '@/components/landing/Expert'
import Programs from '@/components/landing/Programs'
import Platform from '@/components/landing/Platform'
import Journey from '@/components/landing/Journey'
import Testimonials from '@/components/landing/Testimonials'
import Consult from '@/components/landing/Consult'
import Footer from '@/components/landing/Footer'
import FloatingContact from '@/components/landing/FloatingContact'
import RevealObserver from '@/components/ui/RevealObserver'

/** Landing page — 10 section theo docs/REQUIREMENTS.md mục 12.5 (thứ tự cố định) */
export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-900"
      >
        {dict.common.skipToContent}
      </a>
      {/* Hero nền Navy nằm ngay dưới header → header trong suốt, chữ trắng khi ở đầu trang */}
      <SiteHeader dict={dict} lang={lang} overlay />
      <main id="main">
        <Hero dict={dict} lang={lang} />
        <Expert dict={dict} lang={lang} />
        <Programs dict={dict} lang={lang} />
        <Journey dict={dict} lang={lang} />
        <Consult dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} lang={lang} />
      <FloatingContact dict={dict} lang={lang} />
      <RevealObserver />
    </>
  )
}
