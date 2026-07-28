import { createContext, useCallback, useContext, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export type Lang = 'en' | 'id'

export interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const LanguageContext = createContext<LanguageContextType>({ lang: 'en', setLang: () => {} })

const isLang = (value: string | null): value is Lang => value === 'en' || value === 'id'

const LanguageProvider = ({ children }: any) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramLang = searchParams.get('lang')
  const lang: Lang = isLang(paramLang) ? paramLang : 'en'

  const setLang = useCallback(
    (nextLang: Lang) => {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev)
          params.set('lang', nextLang)
          return params
        },
        { replace: true }
      )
    },
    [setSearchParams]
  )

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)

export default LanguageProvider
