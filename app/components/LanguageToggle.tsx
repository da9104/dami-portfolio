'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '../context/languageProvider'

export default function LanguageToggle() {
  const { lang, toggle } = useLanguage()
  return (
    <button onClick={toggle} className="flex items-center gap-2">
      <Globe /> {lang === 'en' ? 'EN' : 'KR'}
    </button>
  )
}
