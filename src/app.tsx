// App.tsx
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
import Chatbot from 'components/chatbot/Chatbot'
import AlfLogo from 'components/chatbot/AlfLogo' // ✅ import baru

const Page: React.FC = () => {
  // ... sama seperti sebelumnya
}

const ChatbotLauncher: React.FC = () => {
  const { state } = useContext(StateContext)
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false)

  if (!state || state.isSplashShow || state.menuShow || state.isSmallDevice === undefined) {
    return null
  }

  return (
    <>
      {!isChatbotOpen && (
        <motion.button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-[99998]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label="Open Alf AI"
        >
          <AlfLogo size="lg" />
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
