// components/chatbot/AlfLogo.tsx
interface AlfLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AlfLogo = ({ size = 'md', className = '' }: AlfLogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-[10px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-14 w-14 text-sm',
  }[size];

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 font-bold tracking-tight text-zinc-900 shadow-lg ${sizeClasses} ${className}`}
      aria-label="Alf AI"
    >
      ALF
    </div>
  );
};

export default AlfLogo;
