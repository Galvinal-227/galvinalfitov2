import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Lottie from 'lottie-react';
import IconAi from 'assets/animation/Chatbot.json';
import type { Message, ChatbotProps } from './chatbot.types';
import { usePuterAI } from './usePuterAI';
import ChatTrigger from './ChatTrigger';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ThinkingIndicator from './ThinkingIndicator';
import QuickPrompts from './QuickPrompts';
import SettingsMenu from './SettingsMenu';
import { PORTFOLIO_DATA } from './portfolioData';

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: `Hi, I'm Alf AI — ${PORTFOLIO_DATA.name}'s assistant. Ask me about his work, skills, or experience.`,
  sender: 'ai',
  timestamp: new Date(),
};

const Chatbot = ({ isOpen: externalIsOpen, onClose }: ChatbotProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [messageId, setMessageId] = useState(2);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalOpen;

  const { isPuterReady, isLoading, sendMessage, stopGeneration } = usePuterAI(selectedModel, messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [messages, isLoading, reducedMotion]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isControlled) onClose?.();
    else setInternalOpen(false);
  }, [isControlled, onClose]);

  const handleOpen = useCallback(() => {
    if (!isControlled) setInternalOpen(true);
  }, [isControlled]);

  const handleSend = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: messageId,
        text,
        sender: 'user',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setMessageId((prev) => prev + 1);

      await sendMessage(text, (response) => {
        const aiMessage: Message = {
          id: messageId + 1,
          text: response,
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setMessageId((prev) => prev + 2);
      });
    },
    [messageId, sendMessage]
  );

  const handleClearChat = useCallback(() => {
    stopGeneration();
    setMessages([INITIAL_MESSAGE]);
    setMessageId(2);
  }, [stopGeneration]);

  const hasUserInteracted = messages.some((msg) => msg.sender === 'user');

  return (
    <>
      {!isControlled && <ChatTrigger onClick={isOpen ? handleClose : handleOpen} isOpen={isOpen} />}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={reducedMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed bottom-0 right-0 z-[99999] flex flex-col overflow-hidden border border-zinc-700/40 bg-zinc-950/95 backdrop-blur-2xl
                        w-full h-[100dvh] max-h-[100dvh]
                        sm:bottom-24 sm:right-6 sm:w-[420px] sm:h-[600px] sm:max-h-[600px] sm:rounded-2xl"
            style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
            role="dialog"
            aria-label="Alf AI assistant"
           >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/60 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 ring-1 ring-zinc-700/40">
                  <Lottie
                    animationData={IconAi}
                    loop={true}
                    autoplay={true}
                    style={{ width: '140%', height: '140%' }}
                    rendererSettings={{ preserveAspectRatio: 'xMidYMid slice', progressiveLoad: false }}
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">Alf AI</div>
                  <div className="text-[10px] text-zinc-500">Galvin's assistant</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <SettingsMenu
                  selectedModel={selectedModel}
                  onSelectModel={setSelectedModel}
                  onClearChat={handleClearChat}
                />
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                  aria-label="Close chat"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ overscrollBehavior: 'contain' }}>
              {!isPuterReady && (
                <div className="mb-4 text-center text-xs text-zinc-500">Connecting to AI...</div>
              )}
              <div className="space-y-4">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 pl-1">
                    <span className="text-[10px] font-medium text-zinc-500">Alf AI</span>
                    <ThinkingIndicator />
                  </div>
                )}
              </div>
              {!hasUserInteracted && !isLoading && (
                <div className="mt-4">
                  <QuickPrompts onSelect={handleSend} disabled={!isPuterReady} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput
              onSend={handleSend}
              onStop={stopGeneration}
              isLoading={isLoading}
              isPuterReady={isPuterReady}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;