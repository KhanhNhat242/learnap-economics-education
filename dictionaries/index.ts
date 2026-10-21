import type { Locale } from '@/lib/i18n-config'
import type viDictionary from './vi'

export type Dictionary = typeof viDictionary

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () => import('./vi').then((module) => module.default),
  en: () => import('./en').then((module) => module.default),
}

export const getDictionary = (locale: Locale) => dictionaries[locale]()

/** Props chung cho mọi section của landing page */
export interface SectionProps {
  dict: Dictionary
  lang: Locale
}
