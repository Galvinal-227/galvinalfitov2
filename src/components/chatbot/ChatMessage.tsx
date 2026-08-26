import { motion } from 'framer-motion';
import type { Message } from './chatbot.types';
import TypingMessage from './TypingMessage';

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};

const ChatMessage = ({ message }: { message: Message }) => {
  const isAI = message.sender === 'ai';
  const isUser = message.sender === 'user';

  if (message.type === 'notification') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-[11px] text-zinc-500"
      >
        {message.text}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-3`}
    >
      <span className="mb-1 px-1 text-[10px] font-medium text-zinc-500">
        {isAI ? 'Alf AI' : 'You'}
      </span>
      
      {isUser ? (
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-zinc-200 px-4 py-2 text-[14px] leading-relaxed text-zinc-900 shadow-sm">
          {message.text}
        </div>
      ) : (
        <TypingMessage text={message.text} speed={12} />
      )}
      
      <span className="mt-0.5 px-1 text-[9px] text-zinc-600">{formatTime(message.timestamp)}</span>
    </motion.div>
  );
};

export default ChatMessage;
