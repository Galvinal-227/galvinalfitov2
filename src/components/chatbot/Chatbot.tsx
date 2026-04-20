import React, { useState, useRef, useEffect } from 'react';
import IconAi from 'assets/animation/Chatbot.json'
import UserIcon from 'assets/animation/Global Network.json'
import { 
  Trash, Send, X, 
  Smile, Mic, MicOff,
  Loader2, 
  ChevronUp, ChevronDown, Maximize, Minimize,
  Cpu, Wifi, WifiOff, Info
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
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messageId, setMessageId] = useState(2);
  const [apiStatus, setApiStatus] = useState('loading'); // loading, ready, error
  const [selectedModel, setSelectedModel] = useState('gpt-5-nano');
  const [puterLoaded, setPuterLoaded] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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
      // Cek apakah script sudah ada
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

  // System prompt untuk Portfolio - VERSI SINGKAT
  const getSystemPrompt = () => {
    return `Kamu adalah Alf AI, asisten virtual Galvin Alfito Dinova (Pelajar SMKN 2 Nganjuk - PPLG).

INFO SINGKAT GALVIN:
- Skill: React, JS, Tailwind, Node.js dasar, GitHub, Figma, Unity
- Project: Portfolio Website, Cowboy Shooter Game, Website Top Up Game, UI/UX Design

ATURAN PENTING:
1. JAWAB SINGKAT & PADAT - jangan bertele-tele
2. Maksimal 2-3 kalimat untuk pertanyaan sederhana
3. Gunakan bullet point hanya jika benar-benar perlu
4. Bahasa Indonesia santai
5. Emoji secukupnya (maksimal 1-2 per pesan)

CONTOH JAWABAN:
- "Halo" → "Halo! Ada yang bisa saya bantu?"
- "Skill apa aja?" → "React, JS, Tailwind, Node.js dasar. Mau tau detailnya?"
- "Project apa?" → "Portfolio web, game shooter, web top up game. Mau lihat yang mana?"

JANGAN:
- Jangan jelaskan panjang lebar kecuali diminta
- Jangan kasih list lengkap kecuali ditanya "detail" atau "semua"

Jika user minta detail/penjelasan lengkap, baru kasih jawaban panjang.`;
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

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateTyping = async (text: string, callback: (typedText: string) => void) => {
    setIsTyping(true);
    let displayedText = "";
    const speed = text.length > 300 ? 10 : 20;
    
    for (let i = 0; i < text.length; i++) {
      displayedText += text[i];
      callback(displayedText);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    setIsTyping(false);
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
    }, 5000);
  };

  // Fungsi untuk chat menggunakan Puter.js
  const chatWithPuter = async (message: string): Promise<string> => {
    if (!window.puter) {
      setApiStatus('error');
      addSystemNotification("⚠️ AI belum siap. Tunggu sebentar...");
      return getMockResponse(message);
    }

    try {
      setApiStatus('loading');
      
      const fullPrompt = `${getSystemPrompt()}\n\nUser: ${message}\n\nJawab SINGKAT:`;
      
      // Gunakan puter.ai.chat sesuai dokumentasi
      const response = await window.puter.ai.chat(fullPrompt, { 
        model: selectedModel,
        max_token: 100,
        temperature: 0.3
      });
      
      setApiStatus('ready');
      
      // Handle berbagai format response
      if (typeof response === 'string') {
        return response;
      } else if (response && response.message?.content) {
        return response.message.content;
      } else if (response && response.content) {
        return response.content;
      } else {
        console.warn('Unknown response format:', response);
        return getMockResponse(message);
      }
      
    } catch (error) {
      console.error('Puter.ai Error:', error);
      setApiStatus('error');
      addSystemNotification("⚠️ Gagal terhubung ke AI. Gunakan mode offline.");
      return getMockResponse(message);
    }
  };

  // Mock response - VERSI SINGKAT (sebagai fallback)
  const getMockResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hello')) {
      return "Halo! 👋 Ada yang bisa saya bantu?";
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('bisa')) {
      if (lowerMessage.includes('detail') || lowerMessage.includes('semua')) {
        return "Skill Galvin:\n• Frontend: React, JS, Tailwind\n• Backend: Node.js dasar\n• Tools: GitHub, Figma, Unity\n\nMau tau lebih detail yang mana?";
      }
      return "React, JavaScript, Tailwind, Node.js dasar. Mau tau detailnya?";
    }
    
    if (lowerMessage.includes('project')) {
      if (lowerMessage.includes('detail') || lowerMessage.includes('semua')) {
        return "Project Galvin:\n1. Portfolio Website (React)\n2. Cowboy Shooter Game (Unity)\n3. Website Top Up Game\n4. UI/UX Design\n\nMau lihat yang mana?";
      }
      return "Portfolio web, game shooter, web top up game. Mau tau lebih detail?";
    }
    
    if (lowerMessage.includes('sekolah') || lowerMessage.includes('kuliah')) {
      return "SMKN 2 Nganjuk, jurusan PPLG kelas 11.";
    }
    
    if (lowerMessage.includes('kontak') || lowerMessage.includes('hubungi')) {
      return "Email: galvin.alfito@example.com | IG: @galvin.alfito";
    }
    
    if (lowerMessage.includes('terima kasih') || lowerMessage.includes('makasih')) {
      return "Sama-sama! 😊";
    }
    
    return "Bisa tanya soal skill, project, atau kontak Galvin. Ada yang mau ditanyakan?";
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

    try {
      // Panggil Puter.js AI
      const aiResponse = await chatWithPuter(userMessage);
      
      const aiMessageObj: Message = {
        id: messageId + 1,
        text: "",
        sender: 'ai',
        timestamp: new Date(),
        username: 'Alf AI'
      };
      
      setMessageId(prev => prev + 2);
      setMessages(prev => [...prev, aiMessageObj]);
      
      await simulateTyping(aiResponse, (typedText) => {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = {
            ...aiMessageObj,
            text: typedText
          };
          return newMessages;
        });
      });

    } catch (error) {
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
      
      await simulateTyping(errorMessage, (typedText) => {
        setMessages(prev => {
          const newMessages = [...prev];
          const lastIndex = newMessages.length - 1;
          newMessages[lastIndex] = {
            ...errorMessageObj,
            text: typedText
          };
          return newMessages;
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
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
        <div className="bg-transparent backdrop-blur-sm border border-gray-600/50 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-300">
              {renderTextWithMarkdown(message.text)}
            </div>
          </div>
          <div className="text-xs text-gray-500 text-right mt-2">
            {formatTime(message.timestamp)}
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
                {/* Loading indicator untuk pertama kali */}
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
                      transition={{ duration: 0.3 }}
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
                          {/* Sender Icon and Name */}
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center overflow-hidden">
                              <Lottie 
                                animationData={IconAi} 
                                loop={true} 
                                style={{ width: '100%', height: '100%' }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-300">
                              {msg.sender === 'user' ? 'Kamu' : 'Alf AI'}
                            </span>
                          </div>
                          
                          {/* Message Content */}
                          <div className="whitespace-pre-wrap break-words text-sm">
                            {renderMessageContent(msg)}
                          </div>
                          
                          {/* Message Footer */}
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
                
                {/* Typing Indicator */}
                {(isLoading || isTyping) && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-3 border border-gray-700/30">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <motion.div 
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-500 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">Mengetik...</span>
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
                
                {/* Model Selector */}
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
                        title={model.desc}
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
