import React, { useState, useRef, useEffect } from 'react';
import IconAi from 'assets/animation/Chatbot.json'
import UserIcon from 'assets/animation/Global Network.json'
import { 
  Trash, Send, X, 
  Smile, Mic, MicOff,
  Loader2, 
  ChevronUp, ChevronDown, Maximize, Minimize,
  Cpu, Wifi, WifiOff, Info, Square
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

// Type definitions
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

// Declare window.puter
declare global {
  interface Window {
    puter: any;
  }
}

const Chatbot = ({ isOpen: externalIsOpen, onClose }: ChatbotProps) => {
  
  // State
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
  const [selectedModel, setSelectedModel] = useState('gpt-5-nano');
  const [puterLoaded, setPuterLoaded] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Available models
  const availableModels = [
    { id: 'gpt-5-nano', name: 'GPT-5 Nano', desc: 'Cepat & Ringan' },
    { id: 'gpt-4', name: 'GPT-4', desc: 'Powerful' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'Seimbang' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Cepat & Akurat' },
    { id: 'deepseek-v3.2', name: 'DeepSeek v3.2', desc: 'Cepat & Akurat' },
    { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', desc: 'Cerdas & Logis' }
  ];

  // Load Puter.js script
  useEffect(() => {
    const loadPuterScript = () => {
      if (window.puter) {
        setPuterLoaded(true);
        setApiStatus('ready');
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      
      script.onload = () => {
        setPuterLoaded(true);
        setApiStatus('ready');
        console.log('✅ Puter.js loaded');
      };
      
      script.onerror = () => {
        setApiStatus('error');
        console.error('❌ Failed to load Puter.js');
      };
      
      document.head.appendChild(script);
    };

    loadPuterScript();
  }, []);

  // Sync external isOpen
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  const getSystemPrompt = () => {
  return `Kamu adalah AI assistant.

Jawab dengan gaya natural, santai, dan mudah dipahami.
Utamakan jawaban yang jelas dan langsung ke inti.
Boleh singkat, tapi tetap fleksibel mengikuti konteks.
Kalau perlu jelasin, cukup secukupnya saja, jangan bertele-tele.`;
};

  // Initialize Speech Recognition
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

  // Handle click outside emoji picker
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fungsi untuk stop generating
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

  // Fungsi untuk chat menggunakan Puter.js
  const chatWithPuter = async (message: string, signal?: AbortSignal): Promise<string> => {
    if (!window.puter) {
      setApiStatus('error');
      addSystemNotification("⚠️ AI belum siap. Tunggu sebentar...");
      return getMockResponse(message);
    }

    try {
      setApiStatus('loading');
      
      const fullPrompt = `${getSystemPrompt()}\n\nPertanyaan: ${message}\n\nJawab singkat (maksimal 2 kalimat):`;
      
      const response = await window.puter.ai.chat(fullPrompt, { 
        model: selectedModel,
        max_tokens: 100
      });
      
      if (signal?.aborted) {
        return "[DIBERHENTIKAN]";
      }
      
      setApiStatus('ready');
      
      let aiText = '';
      if (typeof response === 'string') {
        aiText = response;
      } else if (response && response.message?.content) {
        aiText = response.message.content;
      } else if (response && response.content) {
        aiText = response.content;
      } else {
        aiText = getMockResponse(message);
      }
      
      // Potong paksa jadi 2 kalimat
      const sentences = aiText.split(/[.!?]/);
      const shortResponse = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
      
      return shortResponse;
      
    } catch (error: any) {
      if (error?.name === 'AbortError' || signal?.aborted) {
        return "[DIBERHENTIKAN]";
      }
      
      console.error('Puter.ai Error:', error);
      setApiStatus('error');
      addSystemNotification("⚠️ Gagal terhubung ke AI.");
      return getMockResponse(message);
    }
  };

  // Mock response - VERSI SINGKAT
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
    
    return "Bisa tanya soal skill, project, atau kontak.";
  };

  // PERBAIKAN UTAMA: LANGSUNG TAMPILIN RESPONSE TANPA ANIMASI TYPING
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

    // Buat AbortController baru
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      // Panggil Puter.js AI
      const aiResponse = await chatWithPuter(userMessage, signal);
      
      // Check if aborted
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
      
      // LANGSUNG TAMPILIN RESPONSE (tanpa animasi typing)
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
        
        const errorMessage = "Maaf, ada error. Coba lagi ya.";
        
        const errorMessageObj: Message = {
          id: messageId + 1,
          text: errorMessage,
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
    // Stop any ongoing generation
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
            <div className="text-xs text-gray-300">
              {renderTextWithMarkdown(message.text)}
            </div>
          </div>
        </div>
      );
    }
    
    return renderTextWithMarkdown(message.text);
  };

  const renderTextWithMarkdown = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (line.trim() === '') {
        return <br key={lineIndex} />;
      }
      
      const boldRegex = /\*\*(.*?)\*\*/g;
      const boldMatches = [...line.matchAll(boldRegex)];
      
      if (boldMatches.length > 0) {
        let elements = [];
        let lastIndex = 0;
        
        boldMatches.forEach((match, matchIndex) => {
          if (match.index && match.index > lastIndex) {
            elements.push(
              <span key={`${lineIndex}-${matchIndex}-before`}>
                {line.substring(lastIndex, match.index)}
              </span>
            );
          }
          
          elements.push(
            <strong key={`${lineIndex}-${matchIndex}-bold`} className="font-bold text-gray-200">
              {match[1]}
            </strong>
          );
          
          lastIndex = (match.index || 0) + match[0].length;
        });
        
        if (lastIndex < line.length) {
          elements.push(
            <span key={`${lineIndex}-after`}>
              {line.substring(lastIndex)}
            </span>
          );
        }
        
        return <p key={lineIndex} className="mb-1 text-gray-300">{elements}</p>;
      }
      
      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        return (
          <div key={lineIndex} className="flex items-start mb-0.5 ml-2">
            <span className="mr-2 text-gray-500">•</span>
            <span className="text-gray-300">{line.substring(2)}</span>
          </div>
        );
      }
      
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={lineIndex} className="flex items-start mb-0.5 ml-2">
            <span className="mr-2 font-medium text-gray-400">{line.match(/^\d+/)?.[0]}.</span>
            <span className="text-gray-300">{line.substring(line.indexOf('. ') + 2)}</span>
          </div>
        );
      }
      
      return <p key={lineIndex} className="mb-1 text-gray-300">{line}</p>;
    });
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
            backgroundColor: 'transparent',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(75, 85, 99, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 25
            }
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
        >
          {/* Header */}
          <div className="p-3 rounded-t-xl flex justify-between items-center border-b border-gray-700/30" style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <Lottie 
                  animationData={IconAi} 
                  loop={true} 
                  style={{ width: '100%', height: '100%' }}
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: false
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Alf AI</h3>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${apiStatus === 'ready' ? 'bg-green-500' : apiStatus === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-gray-400">
                    {apiStatus === 'ready' ? 'Online' : apiStatus === 'loading' ? 'Connecting...' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4 text-white" /> : <Maximize className="w-4 h-4 text-white" />}
              </button>
              {!isFullscreen && (
                <button 
                  onClick={() => setIsMinimized(!isMinimized)} 
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
                </button>
              )}
              <button 
                onClick={clearChat} 
                className="p-2 hover:bg-gray-700/50 rounded-lg transition"
                title="Bersihkan chat"
              >
                <Trash className="w-4 h-4 text-white" />
              </button>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-red-500/20 rounded-lg transition"
                title="Tutup"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ backgroundColor: 'transparent' }}>
                {/* Loading indicator */}
                {!puterLoaded && (
                  <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
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
                      className={`flex ${msg.sender === 'system' ? 'justify-center' : 
                                msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }} // Lebih cepat
                    >
                      {msg.sender === 'system' ? (
                        <div className="w-full max-w-[85%]">
                          {renderMessageContent(msg)}
                        </div>
                      ) : (
                        <div 
                          className={`max-w-[85%] rounded-xl p-3 backdrop-blur-md ${
                            msg.sender === 'user' ? 
                            'bg-gray-800/60 text-white border border-gray-600/30' : 
                            'bg-gray-900/60 text-gray-100 border border-gray-700/30'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden">
                              <Lottie 
                                animationData={IconAi} 
                                loop={true} 
                                style={{ width: '100%', height: '100%' }}
                                rendererSettings={{
                                  preserveAspectRatio: 'xMidYMid slice',
                                  progressiveLoad: false
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-300">
                              {msg.sender === 'user' ? 'Kamu' : 'Alf AI'}
                            </span>
                          </div>
                          
                          <div className="whitespace-pre-wrap break-words text-sm">
                            {renderMessageContent(msg)}
                          </div>
                          
                          <div className="flex items-center justify-end mt-1 pt-1 border-t border-gray-700/30">
                            <div className="text-xs text-gray-500">
                              {formatTime(msg.timestamp)}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Loading Indicator Sederhana (tanpa animasi typing) */}
                {isLoading && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-3 border border-gray-700/30">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                        <span className="text-xs text-gray-400">AI sedang berpikir...</span>
                        
                        {/* STOP BUTTON */}
                        <button
                          onClick={stopGenerating}
                          className="ml-2 p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition flex items-center gap-1"
                          title="Hentikan"
                        >
                          <Square className="w-3 h-3 text-red-400" />
                          <span className="text-xs text-red-400">Stop</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-800/30 p-3" style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(20px)' }}>
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
                  <div className="flex gap-1">
                    {availableModels.slice(0, 4).map((model) => (
                      <button
                        key={model.id}
                        onClick={() => changeModel(model.id)}
                        className={`px-2 py-0.5 rounded text-xs transition ${
                          selectedModel === model.id ? 
                          'bg-gray-700/70 text-white' : 
                          'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                        }`}
                      >
                        {model.name.replace('GPT-', '').replace('Gemini ', '').replace('DeepSeek ', '').replace('Claude ', '')}
                      </button>
                    ))}
                  </div>
                </div>
                
                <form onSubmit={sendMessage} className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                    className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg hover:bg-gray-700/50 transition"
                  >
                    <Smile className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={toggleListening} 
                    className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg transition ${
                      isListening ? 
                      'bg-red-600/70 text-white' : 
                      'bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:bg-gray-700/50'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isListening ? "Bicara..." : puterLoaded ? "Tanya sesuatu..." : "Menghubungkan..."}
                    className="flex-1 h-9 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg px-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-600/50 text-sm"
                    disabled={isLoading || !puterLoaded}
                  />
                  
                  <motion.button 
                    type="submit" 
                    className="flex-shrink-0 bg-gray-700/70 text-white w-9 h-9 flex items-center justify-center rounded-lg font-medium disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading || !inputMessage.trim() || !puterLoaded}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
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
