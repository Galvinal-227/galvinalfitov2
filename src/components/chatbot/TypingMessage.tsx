import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypingMessageProps {
  text: string;
  onComplete?: () => void;
  speed?: number; // milidetik per huruf
}

const TypingMessage = ({ text, onComplete, speed = 15 }: TypingMessageProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.substring(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className="relative pl-1 text-[14px] leading-relaxed text-zinc-200">
      {displayedText}
      {isTyping && (
        <motion.span
          className="ml-0.5 inline-block h-4 w-[2px] bg-zinc-400"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </div>
  );
};

export default TypingMessage;
