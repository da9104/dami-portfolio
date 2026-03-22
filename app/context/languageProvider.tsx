'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'ko'

const LanguageContext = createContext<{
  lang: Language
  toggle: () => void
}>({ lang: 'en', toggle: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  const toggle = () => setLang(l => (l === 'en' ? 'ko' : 'en'))

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
