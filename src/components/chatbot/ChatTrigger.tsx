import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import ChatbotAnimation from 'assets/animation/Chatbot.json';

interface ChatTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatTrigger = ({ onClick, isOpen }: ChatTriggerProps) => {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="fixed bottom-5 right-5 z-[99998] flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900/90 shadow-xl border border-zinc-700/40 backdrop-blur-md"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      style={{
        boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      <div className="h-9 w-9">
        <Lottie
          animationData={ChatbotAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice',
            progressiveLoad: false,
          }}
        />
      </div>
    </motion.button>
  );
};

export default ChatTrigger;
