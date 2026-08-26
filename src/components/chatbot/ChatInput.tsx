import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp, FiMic, FiSquare } from 'react-icons/fi';

interface ChatInputProps {
  onSend: (text: string) => void;
  onStop: () => void;
  isLoading: boolean;
  isPuterReady: boolean;
  placeholder?: string;
}

const ChatInput = ({ onSend, onStop, isLoading, isPuterReady, placeholder = 'Ask Alf anything...' }: ChatInputProps) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput('');
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          recognitionRef.current.start();
          setIsListening(true);
        })
        .catch(() => {});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-zinc-800/60 px-4 py-3">
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'Listening...' : placeholder}
          disabled={!isPuterReady || isLoading}
          className="w-full rounded-full border border-zinc-700/50 bg-zinc-900/70 py-2.5 pl-4 pr-10 text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500/60 focus:bg-zinc-900/90 disabled:opacity-50"
        />
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.button
                key="stop"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={onStop}
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-red-400"
                aria-label="Stop"
              >
                <FiSquare className="h-3 w-3 fill-current" />
              </motion.button>
            ) : input.trim() ? (
              <motion.button
                key="send"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="submit"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-200 text-zinc-900 hover:bg-white"
                aria-label="Send"
              >
                <FiArrowUp className="h-3.5 w-3.5" />
              </motion.button>
            ) : (
              <motion.button
                key="mic"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={toggleListening}
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                aria-label="Voice input"
              >
                <FiMic className="h-3.5 w-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
