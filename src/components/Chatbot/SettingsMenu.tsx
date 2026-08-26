import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoreHorizontal, FiTrash2, FiCheck, FiCpu } from 'react-icons/fi';
import { AVAILABLE_MODELS } from './portfolioData';

interface SettingsMenuProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onClearChat: () => void;
}

const SettingsMenu = ({ selectedModel, onSelectModel, onClearChat }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
        aria-label="Settings"
      >
        <FiMoreHorizontal className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-56 rounded-xl border border-zinc-700/50 bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-1 px-2 pt-1 text-xs font-medium text-zinc-400">AI Model</div>
            {AVAILABLE_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onSelectModel(model.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs ${
                  selectedModel === model.id ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:bg-zinc-800/50'
                }`}
              >
                <span>{model.name}</span>
                {selectedModel === model.id && <FiCheck className="h-3 w-3 text-yellow-400" />}
              </button>
            ))}
            <div className="mt-2 border-t border-zinc-800 pt-1">
              <button
                onClick={() => {
                  onClearChat();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800/50 hover:text-red-400"
              >
                <FiTrash2 className="h-3 w-3" />
                Clear conversation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu;