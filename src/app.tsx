// App.tsx
import Cursor from 'components/common/cursor'
import Introduction from 'components/common/introduction'
import Menu from 'components/navigation/menu'
import TopNav from 'components/navigation/top-nav'
import CursorProvider from 'context/cursor'
import StateProvider, { StateContext } from 'context/state'
// Removed: import { MusicProvider } from 'context/MusicContext'
import { AnimatePresence, motion } from 'framer-motion'
import { easeDefault, routes } from 'lib/utils'
import { AboutTransition } from 'pages/about'
import { HomeTransition } from 'pages/home'
import { SummaryTransition } from 'pages/summary'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Lottie from 'lottie-react'
import ChatbotAnimation from '../src/assets/animation/Chat bot animation.json'
import Chatbot from 'components/chatbot/Chatbot'
import './i18n';

const Page = () => {
  const location = useLocation()
  const { state } = useContext(StateContext)
  const containerPageRef = useRef<any>()

  const removeStyleContainer = () => {
    setTimeout(() => {
      if (containerPageRef.current) {
        containerPageRef.current.style.transform = 'inherit'
      }
    }, 500)
  }

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [location.pathname])

  useEffect(() => {
    removeStyleContainer()
  }, [state?.isSplashShow, state?.menuShow, location.pathname])

  if (state?.isSmallDevice === undefined) {
    return <div className="h-screen w-screen bg-primary"></div>
  }

  return (
    <>
      <AnimatePresence mode="sync">
        {state?.isSplashShow && (
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
      {!state?.isSplashShow && (
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

const App = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  return (
    <>
      {/* Removed MusicProvider wrapper */}
      <StateProvider>
        <CursorProvider>
          <Cursor />
          <Menu />
          <Page />
          <motion.button
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
            className="fixed bottom-6 right-6 z-[99999] w-16 h-16 bg-yellow-500 rounded-full shadow-2xl hover:shadow-gray-500/30 transition-all flex items-center justify-center border border-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Lottie 
              animationData={ChatbotAnimation} 
              loop={true}
              style={{ width: 40, height: 40 }}
            />
          </motion.button>
          
          {/* ChatBot Component - muncul ketika isChatbotOpen true */}
          <Chatbot 
            isOpen={isChatbotOpen} 
            onClose={() => setIsChatbotOpen(false)} 
          />
        </CursorProvider>
      </StateProvider>
    </>
  )
}

export default App
