import { motion } from 'framer-motion';

const ThinkingIndicator = () => (
  <div className="flex items-center gap-1 px-1 py-1">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        className="h-1.5 w-1.5 rounded-full bg-zinc-500"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
      />
    ))}
  </div>
);

export default ThinkingIndicator;