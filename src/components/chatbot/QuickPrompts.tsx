import { QUICK_PROMPTS } from './portfolioData';

interface QuickPromptsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const QuickPrompts = ({ onSelect, disabled }: QuickPromptsProps) => {
  return (
    <div className="flex flex-wrap gap-2 px-1">
      {QUICK_PROMPTS.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          disabled={disabled}
          className="rounded-full border border-zinc-700/50 bg-zinc-900/40 px-3 py-1 text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-zinc-200 disabled:opacity-50"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default QuickPrompts;
