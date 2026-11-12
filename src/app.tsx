import Cursor from 'components/common/cursor'
import Introduction from 'components/common/introduction'
import Menu from 'components/navigation/menu'
import TopNav from 'components/navigation/top-nav'
import CursorProvider from 'context/cursor'
import StateProvider, { StateContext } from 'context/state'
import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault, routes } from 'lib/utils'
import { AboutTransition } from 'pages/about'
import { HomeTransition } from 'pages/home'
import { SummaryTransition } from 'pages/summary'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lottie from 'lottie-react'
import ChatbotAnimation from '../src/assets/animation/Chatbot.json'
import Chatbot from 'components/chatbot/Chatbot'

// IMPORT BARU UNTUK SEO
import { useTranslation } from 'lib/translations'
import { useSeo } from 'hooks/use-seo'

const Page: React.FC = () => {
  const location = useLocation()
  const { state } = useContext(StateContext)
  const containerPageRef = useRef<HTMLDivElement>(null)
  
  // AMBIL BAHASA AKTIF UNTUK SEO
  const { lang } = useTranslation()

  // LOGIKA SEO DINAMIS BERDASARKAN URL (PATH)
  let seoTitle = 'Software Developer'
  let seoDesc = 'Portfolio of Galvin Alfito, a Software Developer from Indonesia building web and mobile apps, developer tools, and digital experiences.'
  
  if (location.pathname === routes.about) {
    seoTitle = 'About Me'
    seoDesc = 'Learn more about Galvin Alfito, a Software Developer specializing in web and mobile applications.'
  } else if (location.pathname === routes.summary) {
    seoTitle = 'Summary & Resume'
    seoDesc = 'Professional summary and experience of Galvin Alfito, Software Developer.'
  }

  // PANGGIL HOOK SEO DI PALING ATAS (SEBELUM EARLY RETURN)
  useSeo({
    title: seoTitle,
    description: seoDesc,
    path: location.pathname,
    lang: (lang || 'id') as 'id' | 'en'
  })

  const removeStyleContainer = () => {
    setTimeout(() => {
      if (containerPageRef.current) {
        containerPageRef.current.style.transform = 'inherit'
      }
    }, 500)
  }

  // PINDAHKAN USEEFFECT KE SINI AGAR TIDAK MELANGGAR RULES OF HOOKS
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [location.pathname])

  useEffect(() => {
    removeStyleContainer()
  }, [state?.isSplashShow, state?.menuShow, location.pathname])

  // EARLY RETURNS DILAKUKAN SETELAH SEMUA HOOKS DIPANGGIL
  if (!state) {
    return <div className="h-screen w-screen bg-primary"></div>
  }

  if (state.isSmallDevice === undefined) {
    return <div className="h-screen w-screen bg-primary"></div>
  }

  return (
    <>
      <AnimatePresence mode="sync">
        {state.isSplashShow && (
          <motion.div
            layout
            key="introduction"
            exit={{ y: '-100vh', borderRadius: '100px' }}
            transition={{ duration: 1, ease: easeDefault }}
            className="self-center"
          >
            <Introduction />
          </motion.div>
        )}
      </AnimatePresence>
      {!state.isSplashShow && (
        <AnimatePresence mode="wait">
          <React.Fragment key={location.pathname}>
            <TopNav />
            <Routes location={location} key={location.pathname}>
              <Route index element={<HomeTransition />} />
              <Route path={routes.about} element={<AboutTransition />} />
              <Route path={routes.summary} element={<SummaryTransition />} />
            </Routes>
          </React.Fragment>
        </AnimatePresence>
      )}
    </>
  )
}

// ✅ Komponen ini hanya dirender ketika kondisi halaman sudah siap
const ChatbotLauncher: React.FC = () => {
  const { state } = useContext(StateContext)
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false)

  // Jangan render apapun saat loading, splash, atau menu terbuka
  if (!state || state.isSplashShow || state.menuShow || state.isSmallDevice === undefined) {
    return null
  }

  return (
    <>
      {!isChatbotOpen && (
        <motion.button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-[99998] w-16 h-16 bg-yellow-500 rounded-full shadow-2xl hover:shadow-gray-500/30 transition-all flex items-center justify-center border border-gray-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Lottie 
            animationData={ChatbotAnimation} 
            loop={true}
            style={{ width: 80, height: 80 }}
          />
        </motion.button>
      )}
      
      <Chatbot 
        isOpen={isChatbotOpen} 
        onClose={() => setIsChatbotOpen(false)} 
      />
    </>
  )
}

const App: React.FC = () => {
  return (
    <StateProvider>
      <CursorProvider>
        <Cursor />
        <Menu />
        <Page />
        <ChatbotLauncher />
      </CursorProvider>
    </StateProvider>
  )
}

export default App
