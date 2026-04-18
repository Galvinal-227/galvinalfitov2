import Cursor from 'components/common/cursor'
import WithCursorElement from 'components/common/with-cursor-element'
import ClickToOpen from 'components/cursor-hover/click-to-open'
import EnglishHover from 'components/cursor-hover/english'
import GalvinAlfitoHover from 'components/cursor-hover/galvinalfito'
import IndonesiaHover from 'components/cursor-hover/indonesia'
import Magnet from 'components/effect/magnet'
import CursorProvider from 'context/cursor'
import { StateContext } from 'context/state'
import { motion, useAnimate } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsGithub, BsLinkedin } from 'react-icons/bs'

const TopNav = () => {
  const { setState, state } = useContext(StateContext)
  const [scope, animate] = useAnimate()
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'EN'
  })
  const linkClass = 'font-spartan text-[#9EB384] text-lg md:text-xl lg:text-2xl'

  useEffect(() => {
    ;(async () => {
      if (state?.menuShow) {
        await animate(scope.current, { y: 100, opacity: 0 }, { duration: 1, ease: [0.79, 0.14, 0.15, 0.86] })
        animate(scope.current, { y: 0, opacity: 1 })
      }
    })()
  }, [state?.menuShow])

  const nameCursor = {
    in: {
      key: GalvinAlfitoHover.key,
      type: GalvinAlfitoHover.type,
      element: <GalvinAlfitoHover />
    }
  }

  const langInCursor = {
    in: {
      key: IndonesiaHover.key,
      type: IndonesiaHover.type,
      element: <IndonesiaHover />
    }
  }

  const langEnCursor = {
    in: {
      key: EnglishHover.key,
      type: EnglishHover.type,
      element: <EnglishHover />
    }
  }

  const menuCursor = {
    in: {
      key: ClickToOpen.key,
      type: ClickToOpen.type,
      element: <ClickToOpen />
    }
  }

  const menuClick = () => {
    if (setState) {
      setState((prev) => ({ ...prev, menuShow: true }))
    }
  }

  const switchLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem('preferredLanguage', lang)
    
    // Update state global
    if (setState) {
      setState((prev) => ({ ...prev, language: lang }))
    }
    
    // Trigger event untuk component lain
    window.dispatchEvent(new Event('languageChanged'))
  }

  if (state?.isSplashShow) return null

  return (
    <motion.header
      ref={scope}
      exit={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: easeDefault }}
      className="sticky left-0 top-0 z-[80] h-0 w-screen"
    >
      <nav className="flex w-full items-center justify-between px-4 py-6 md:px-14">
        <CursorProvider>
          <Cursor />
          <WithCursorElement fallbackState={{ element: null }} state={{ element: nameCursor.in as any }}>
            <Link to="/">
              <Magnet>
                <span className={linkClass}>GA - {new Date().getFullYear()} ©️</span>
              </Magnet>
            </Link>
          </WithCursorElement>
        </CursorProvider>

        <div className="hidden items-center gap-4 lg:flex">
          {/* Tombol Indonesia - Link ke GitHub */}
          <CursorProvider>
            <Cursor />
            <WithCursorElement
              fallbackState={{ element: null }}
              state={{ element: langInCursor.in as any }}
            >
              <a
                href="https://github.com/galvinal-227"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} transition-all duration-300 ${
                  language === 'IN'
                    ? 'font-bold text-[#435334] border-b-2 border-[#435334]'
                    : 'hover:text-[#435334] cursor-pointer'
                }`}
              >
                <BsGithub size={20} />
              </a>
            </WithCursorElement>
          </CursorProvider>

          {/* Tombol English - Link ke LinkedIn */}
          <CursorProvider>
            <Cursor />
            <WithCursorElement
              fallbackState={{ element: null }}
              state={{ element: langEnCursor.in as any }}
            >
              <a
                href="https://www.linkedin.com/in/galvin-alfito-506494390/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} transition-all duration-300 ${
                  language === 'EN'
                    ? 'font-bold text-[#435334] border-b-2 border-[#435334]'
                    : 'hover:text-[#435334] cursor-pointer'
                }`}
              >
                <BsLinkedin size={20} />
              </a>
            </WithCursorElement>
          </CursorProvider>
        </div>

        <CursorProvider>
          <Cursor />
          <WithCursorElement
            interupFallback={state?.menuShow}
            fallbackState={{ element: null }}
            state={{ element: menuCursor.in as any }}
          >
            <Magnet>
              <button onClick={menuClick} className={linkClass + ' cursor-pointer hover:text-[#435334] transition-all duration-300'}>
                MENU
              </button>
            </Magnet>
          </WithCursorElement>
        </CursorProvider>
      </nav>
    </motion.header>
  )
}

export default TopNav