export interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user' | 'system';
  timestamp: Date;
  type?: 'notification';
}

export interface ChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
}