import React, { useState, useRef, useEffect } from 'react';
import puter from '@heyputer/puter.js';
import IconAi from 'assets/animation/Chatbot.json';
import UserIcon from 'assets/animation/Global Network.json';
import { 
  Trash, Send, X, 
  Smile, Mic, MicOff,
  Loader2, 
  ChevronUp, ChevronDown, Maximize, Minimize,
  Cpu, Info, Square
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user' | 'system';
  timestamp: Date;
  username?: string;
  type?: string;
}

interface ChatbotProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Chatbot = ({ isOpen: externalIsOpen, onClose }: ChatbotProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! 👋 Saya Alf AI, asisten virtual Galvin. Ada yang bisa saya bantu?",
      sender: 'ai',
      timestamp: new Date(),
      username: 'Alf AI'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messageId, setMessageId] = useState(2);
  const [apiStatus, setApiStatus] = useState('loading');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [puterReady, setPuterReady] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const availableModels = [
    { id: 'gpt-4', name: 'GPT-4', desc: 'Powerful & Akurat' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'Cepat & Seimbang' },
    { id: 'claude-3-haiku', name: 'Claude Haiku', desc: 'Cepat & Ringan' },
    { id: 'claude-3-sonnet', name: 'Claude Sonnet', desc: 'Cerdas & Teliti' },
    { id: 'llama-3-70b', name: 'Llama 3', desc: 'Open Source' }
  ];

  useEffect(() => {
    const initPuter = async () => {
      try {
        if (puter && typeof puter.ai === 'function') {
          setPuterReady(true);
          setApiStatus('ready');
        } else {
          throw new Error('Puter.ai not available');
        }
      } catch (error) {
        console.error('Failed to initialize Puter.js:', error);
        setApiStatus('error');
        setPuterReady(false);
      }
    };
    initPuter();
  }, []);

  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const getSystemPrompt = () => {
    return `Kamu adalah Alf AI, asisten virtual Galvin (SMKN 2 Nganjuk - PPLG).

INFO SINGKAT:
- Skill: React, JS, Tailwind, Node.js dasar, Figma, Unity
- Project: Portfolio web, game shooter, web top up, UI/UX design

ATURAN WAJIB:
1. JAWAB MAKSIMAL 2 KALIMAT SAJA
2. LANGSUNG TO THE POINT
3. JANGAN PAKAI BULLET POINT

CONTOH:
User: "Halo" → "Halo! Ada yang bisa dibantu?"
User: "Skill apa?" → "React, JS, Tailwind, Node.js dasar."
User: "Project apa?" → "Portfolio web, game shooter, web top up."`;
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'id-ID';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        setInputMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    addSystemNotification("⏹️ AI dihentikan.");
  };

  const addSystemNotification = (text: string) => {
    const notificationId = messageId;
    setMessageId(prev => prev + 1);
    
    const notificationMessage: Message = {
      id: notificationId,
      text: text,
      sender: 'system',
      timestamp: new Date(),
      type: 'notification'
    };
    
    setMessages(prev => [...prev, notificationMessage]);
    
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== notificationId));
    }, 3000);
  };

  const chatWithPuter = async (message: string, signal?: AbortSignal): Promise<string> => {
    if (!puterReady || !puter.ai) {
      setApiStatus('error');
      return getMockResponse(message);
    }

    try {
      setApiStatus('loading');
      
      const fullPrompt = `${getSystemPrompt()}\n\nUser: ${message}\n\nAlf AI:`;
      
      const response: any = await puter.ai.chat(fullPrompt, { 
        model: selectedModel,
        max_tokens: 150,
        temperature: 0.7
      });
      
      if (signal?.aborted) {
        return "[DIBERHENTIKAN]";
      }
      
      setApiStatus('ready');
      
      let aiText = '';
      
      if (typeof response === 'string') {
        aiText = response;
      } else if (response && typeof response === 'object') {
        if (response.message && typeof response.message === 'object') {
          if (typeof response.message.content === 'string') aiText = response.message.content;
          else if (typeof response.message.text === 'string') aiText = response.message.text;
        }
        if (!aiText && typeof response.content === 'string') aiText = response.content;
        if (!aiText && typeof response.text === 'string') aiText = response.text;
        if (!aiText && typeof response.response === 'string') aiText = response.response;
      }
      
      if (!aiText) {
        aiText = getMockResponse(message);
      }
      
      let cleanText = aiText.replace(/\n\n/g, ' ').trim();
      const sentences = cleanText.split(/[.!?]/);
      const shortResponse = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
      
      return shortResponse || "Maaf, coba tanya lagi ya.";
      
    } catch (error: any) {
      if (error?.name === 'AbortError' || signal?.aborted) {
        return "[DIBERHENTIKAN]";
      }
      console.error('Puter.ai Error:', error);
      setApiStatus('error');
      return getMockResponse(message);
    }
  };

  const getMockResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('halo') || lowerMessage.includes('hai')) {
      return "Halo! 👋 Ada yang bisa saya bantu?";
    }
    if (lowerMessage.includes('skill')) {
      return "React, JS, Tailwind, Node.js dasar.";
    }
    if (lowerMessage.includes('project')) {
      return "Portfolio web, game shooter, web top up, UI/UX.";
    }
    if (lowerMessage.includes('sekolah')) {
      return "SMKN 2 Nganjuk, kelas 11 PPLG.";
    }
    if (lowerMessage.includes('kontak')) {
      return "Email: galvin.alfito@example.com";
    }
    if (lowerMessage.includes('terima kasih')) {
      return "Sama-sama! 😊";
    }
    return "Bisa tanya soal skill, project, atau kontak saya.";
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setShowEmojiPicker(false);
    
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    const userMessageObj: Message = {
      id: messageId,
      text: userMessage,
      sender: 'user', 
      timestamp: new Date(),
      username: 'Kamu'
    };
    
    setMessageId(prev => prev + 1);
    setMessages(prev => [...prev, userMessageObj]);
    setIsLoading(true);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const aiResponse = await chatWithPuter(userMessage, signal);
      
      if (signal.aborted) {
        const aiMessageObj: Message = {
          id: messageId + 1,
          text: "⏹️ Diberhentikan.",
          sender: 'ai',
          timestamp: new Date(),
          username: 'Alf AI'
        };
        setMessageId(prev => prev + 2);
        setMessages(prev => [...prev, aiMessageObj]);
        setIsLoading(false);
        abortControllerRef.current = null;
        return;
      }
      
      const aiMessageObj: Message = {
        id: messageId + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        username: 'Alf AI'
      };
      
      setMessageId(prev => prev + 2);
      setMessages(prev => [...prev, aiMessageObj]);

    } catch (error: any) {
      if (error?.name === 'AbortError' || signal.aborted) {
        const aiMessageObj: Message = {
          id: messageId + 1,
          text: "⏹️ Diberhentikan.",
          sender: 'ai',
          timestamp: new Date(),
          username: 'Alf AI'
        };
        setMessageId(prev => prev + 2);
        setMessages(prev => [...prev, aiMessageObj]);
      } else {
        console.error('Error:', error);
        const errorMessageObj: Message = {
          id: messageId + 1,
          text: "Maaf, ada error. Coba lagi ya.",
          sender: 'ai',
          timestamp: new Date(),
          username: 'Alf AI'
        };
        setMessageId(prev => prev + 2);
        setMessages(prev => [...prev, errorMessageObj]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const clearChat = () => {
    stopGenerating();
    if (window.confirm("Yakin mau mulai percakapan baru?")) {
      setMessages([{
        id: 1,
        text: "Halo! 👋 Saya Alf AI, asisten virtual Galvin. Ada yang bisa saya bantu?",
        sender: 'ai',
        timestamp: new Date(),
        username: 'Alf AI'
      }]);
      setMessageId(2);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      addSystemNotification("Browser tidak support voice recognition.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          recognitionRef.current.start();
          setIsListening(true);
        })
        .catch(() => {
          addSystemNotification("Izin mikrofon diperlukan.");
        });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setIsMinimized(false);
    }
  };

  const changeModel = (modelId: string) => {
    const newModel = availableModels.find(m => m.id === modelId);
    setSelectedModel(modelId);
    addSystemNotification(`Model: ${newModel?.name || modelId}`);
  };

  const onEmojiClick = (emojiData: any) => {
    setInputMessage(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === 'notification') {
      return (
        <div className="bg-transparent backdrop-blur-sm border border-gray-600/50 rounded-lg p-2">
          <div className="flex items-start gap-2">
            <Info className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-gray-300">{message.text}</div>
          </div>
        </div>
      );
    }
    return <div className="whitespace-pre-wrap break-words text-sm text-gray-300">{message.text}</div>;
  };

  const getWindowDimensions = () => {
    if (isFullscreen) {
      return {
        width: 'calc(100vw - 40px)',
        height: 'calc(100vh - 40px)',
        left: '20px',
        top: '20px'
      };
    }
    if (isMinimized) {
      return {
        width: '320px',
        height: 'auto',
        left: `${window.innerWidth - 340}px`,
        top: '20px'
      };
    }
    return {
      width: '450px',
      height: '600px',
      left: `${window.innerWidth - 470}px`,
      top: '20px'
    };
  };

  const windowDimensions = getWindowDimensions();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={chatWindowRef}
          className="fixed z-[99999] rounded-xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            width: windowDimensions.width,
            height: windowDimensions.height,
            left: windowDimensions.left,
            top: windowDimensions.top,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(75, 85, 99, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
        >
          <div className="p-3 rounded-t-xl flex justify-between items-center border-b border-gray-700/30" style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Lottie animationData={IconAi} loop={true} style={{ width: '100%', height: '100%' }} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Alf AI</h3>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${apiStatus === 'ready' ? 'bg-green-500' : apiStatus === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-gray-400">
                    {apiStatus === 'ready' ? 'Online' : apiStatus === 'loading' ? 'Thinking...' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={toggleFullscreen} className="p-2 hover:bg-gray-700/50 rounded-lg transition">
                {isFullscreen ? <Minimize className="w-4 h-4 text-white" /> : <Maximize className="w-4 h-4 text-white" />}
              </button>
              {!isFullscreen && (
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-gray-700/50 rounded-lg transition">
                  {isMinimized ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
                </button>
              )}
              <button onClick={clearChat} className="p-2 hover:bg-gray-700/50 rounded-lg transition">
                <Trash className="w-4 h-4 text-white" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-red-500/20 rounded-lg transition">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {!puterReady && (
                  <motion.div className="flex justify-center">
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-gray-700/30">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-sm text-gray-300">Menghubungkan ke AI...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      className={`flex ${msg.sender === 'system' ? 'justify-center' : msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {msg.sender === 'system' ? (
                        <div className="w-full max-w-[85%]">{renderMessageContent(msg)}</div>
                      ) : (
                        <div className={`max-w-[85%] rounded-xl p-3 ${msg.sender === 'user' ? 'bg-blue-600/80 text-white' : 'bg-gray-800/80 text-white'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden">
                              <Lottie animationData={msg.sender === 'user' ? UserIcon : IconAi} loop={true} style={{ width: '100%', height: '100%' }} />
                            </div>
                            <span className="text-xs font-medium text-gray-300">{msg.sender === 'user' ? 'Kamu' : 'Alf AI'}</span>
                          </div>
                          <div className="whitespace-pre-wrap break-words text-sm">{renderMessageContent(msg)}</div>
                          <div className="flex items-center justify-end mt-1 pt-1 border-t border-gray-700/30">
                            <div className="text-xs text-gray-500">{formatTime(msg.timestamp)}</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div className="flex justify-start">
                    <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-3 border border-gray-700/30">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-xs text-gray-400">AI sedang berpikir...</span>
                        <button onClick={stopGenerating} className="ml-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition flex items-center gap-1">
                          <Square className="w-3 h-3 text-red-400" />
                          <span className="text-xs text-red-400">Stop</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-gray-800/30 p-3" style={{ backgroundColor: 'rgba(17, 24, 39, 0.8)' }}>
                {showEmojiPicker && (
                  <div ref={emojiPickerRef} className="absolute bottom-14 right-3 z-50">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">Model:</span>
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {availableModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => changeModel(model.id)}
                        className={`px-2 py-0.5 rounded text-xs transition ${selectedModel === model.id ? 'bg-blue-600/70 text-white' : 'bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'}`}
                      >
                        {model.name.split('-')[0]}
                      </button>
                    ))}
                  </div>
                </div>
                
                <form onSubmit={sendMessage} className="flex gap-2">
                  <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg hover:bg-gray-700/50 transition">
                    <Smile className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  <button type="button" onClick={toggleListening} className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg transition ${isListening ? 'bg-red-600/70 text-white' : 'bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:bg-gray-700/50'}`}>
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isListening ? "Bicara..." : puterReady ? "Tanya sesuatu..." : "Menghubungkan..."}
                    className="flex-1 h-9 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600/50 text-sm"
                    disabled={isLoading || !puterReady}
                  />
                  
                  <motion.button 
                    type="submit" 
                    className="flex-shrink-0 bg-blue-600/80 text-white w-9 h-9 flex items-center justify-center rounded-lg font-medium disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading || !inputMessage.trim() || !puterReady}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </motion.button>
                </form>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
