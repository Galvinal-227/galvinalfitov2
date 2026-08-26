import { motion } from 'framer-motion';

const ThinkingIndicator = () => (
  <div className="flex items-center gap-1.5 px-2 py-2" role="status" aria-label="Alf AI is thinking">
    {[0, 1, 2].map((dot, index) => (
      <motion.span
        key={dot}
        className="relative h-2 w-2 rounded-full bg-gradient-to-br from-zinc-400 via-zinc-500 to-zinc-600"
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [0.7, 1, 0.7],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          delay: index * 0.18,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          boxShadow: '0 0 8px rgba(161, 161, 170, 0.3), 0 0 16px rgba(161, 161, 170, 0.1)',
        }}
      />
    ))}
  </div>
);

export default ThinkingIndicator;
