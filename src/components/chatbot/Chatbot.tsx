import React, { useState, useRef, useEffect } from 'react';
import IconAi from 'assets/animation/Chatbot.json'
import UserIcon from 'assets/animation/Global Network.json'
import { 
  Trash, Send, X, 
  Smile, Mic, MicOff,
  Loader2, User, 
  ChevronUp, ChevronDown, Maximize, Minimize,
  Cpu, Wifi, WifiOff, Info, Code, Briefcase, GraduationCap, Mail, Github, Linkedin, Instagram
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

const Chatbot = ({ isOpen: externalIsOpen, onClose }) => {
  
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Halo! 👋 Saya **Alf AI**, asisten virtual dari **Galvin Alfito Dinova**. Ada yang bisa saya bantu tentang portfolio, project, atau skill saya?",
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
  const [apiStatus, setApiStatus] = useState('idle');
  const [selectedModel, setSelectedModel] = useState('gpt-5-nano');
  
  // Refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Available models
  const availableModels = [
    { id: 'gpt-5-nano', name: 'GPT-5 Nano', desc: 'Cepat & Ringan' },
    { id: 'gpt-4', name: 'GPT-4', desc: 'Powerful' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'Seimbang' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Cepat & Akurat' },
    { id: 'deepseek-v3.2', name: 'DeepSeek v3.2', desc: 'Cepat & Akurat' },
    { id: 'claude-sonnet-4.5', name: 'Claude Sonnet 4.5', desc: 'Cerdas & Logis' }
  ];

  // Sync external isOpen
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setIsOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  // System prompt untuk Portfolio
  const getSystemPrompt = () => {
    return `Kamu adalah **Alf AI**, asisten virtual dari **Galvin Alfito Dinova**.

INFORMASI UTAMA:
Kamu berfungsi sebagai:
1. Asisten portfolio Galvin
2. Asisten umum yang bisa menjawab berbagai pertanyaan

TENTANG GALVIN:
- Nama: Galvin Alfito Dinova
- Status: Pelajar SMKN 2 Nganjuk (Kelas 11 - PPLG)
- Fokus: Web Development, Game Development, UI/UX

SKILL:
- Frontend: React, JS, Tailwind
- Backend: Node.js (dasar)
- Tools: GitHub, Figma, Unity, Construct 3

PROJECT:
- Portfolio Website
- Cowboy Shooter Game
- Website Top Up Game
- UI/UX Design

ATURAN UTAMA:
1. Gunakan Bahasa Indonesia santai tapi profesional.
2. Awali dengan "Halo!".
3. Gunakan emoji secukupnya 💻🚀✨
4. Jawaban harus jelas, rapi, dan membantu.

PERILAKU AI:
- Jika ditanya tentang Galvin → jawab detail & profesional
- Jika ditanya umum (coding, game, dll) → jawab seperti asisten pintar
- Jika ditanya di luar kemampuan → arahkan dengan sopan
- Jangan membatasi jawaban hanya tentang Galvin

GAYA JAWAB:
- Gunakan paragraf pendek
- Gunakan bullet point jika perlu
- Mudah dipahami

Jadilah asisten yang cerdas, fleksibel, dan membantu 🚀`;
};

  // Load Puter.ai script
  useEffect(() => {
    loadPuterScript();
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'id-ID';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
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
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
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

  // Load Puter.ai script
  const loadPuterScript = () => {
    return new Promise((resolve) => {
      if (window.puter) {
        setApiStatus('ready');
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://js.puter.com/v2/';
      script.async = true;
      
      script.onload = () => {
        setApiStatus('ready');
        resolve();
      };
      
      script.onerror = () => {
        setApiStatus('error');
        resolve();
      };
      
      document.head.appendChild(script);
    });
  };

  const simulateTyping = async (text, callback) => {
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

  const addSystemNotification = (text) => {
    const notificationId = messageId;
    setMessageId(prev => prev + 1);
    
    const notificationMessage = {
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

  const sendToAI = async (message) => {
    if (!window.puter) {
      await loadPuterScript();
      if (!window.puter) {
        return getMockResponse(message);
      }
    }
    
    try {
      setApiStatus('loading');
      const fullPrompt = `${getSystemPrompt()}\n\nPertanyaan: ${message}\n\nJawab dalam Bahasa Indonesia yang ramah dan profesional:`;
      
      const response = await window.puter.ai.chat(fullPrompt, {
        model: selectedModel,
        stream: false  
      });
      
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
      
      return aiText;
      
    } catch (error) {
      console.error('Error:', error);
      setApiStatus('error');
      return getMockResponse(message);
    }
  };

  // Mock response untuk portfolio
  const getMockResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hello')) {
      return `Halo! 👋 Senang bertemu dengan Anda!\n\nSaya **Alf AI**, asisten virtual dari **Galvin Alfito Dinova**. Saya bisa bantu Anda mengetahui tentang:\n\n• 📝 **Skill & Keahlian** Galvin\n• 💻 **Project** yang sudah dibuat\n• 💼 **Pengalaman** kerja\n• 🎓 **Pendidikan**\n• 📞 **Kontak**\n\nAda yang ingin ditanyakan? 😊`;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('keahlian') || lowerMessage.includes('bisa apa')) {
      return `Halo! 👋\n\nBerikut **skill dan keahlian** Galvin Alfito Dinova:\n\n**Frontend** 🎨\n• React.js / Next.js\n• TypeScript / JavaScript\n• Tailwind CSS / Bootstrap\n• HTML5 / CSS3\n• Framer Motion\n\n**Backend** ⚙️\n• Node.js / Express\n• Python / Django\n• RESTful API / GraphQL\n• Database (MySQL, PostgreSQL, MongoDB)\n\n**Tools & Lainnya** 🛠️\n• Git & GitHub\n• Figma (UI/UX)\n• Docker\n• AWS\n\nLihat halaman portfolio untuk demo project! 🚀`;
    }
    
    if (lowerMessage.includes('project')) {
      return `Halo! 👋\n\nBerikut **project unggulan** Galvin Alfito Dinova:\n\n**1. Portfolio Website** ✨\nWebsite portfolio interaktif dengan animasi modern\nTech: React, Framer Motion, Tailwind CSS\n\n**2. E-commerce App** 🛒\nPlatform belanja online dengan payment gateway\nTech: Next.js, Node.js, MongoDB\n\n**3. AI Chatbot** 🤖\nAsisten pintar dengan multiple AI models\nTech: React, Puter.ai, Web Speech API\n\n**4. Task Management App** 📋\nAplikasi manajemen task real-time\nTech: React, Firebase, Material-UI\n\n**5. Weather App** 🌤️\nAplikasi cuaca dengan API integration\nTech: Vanilla JS, OpenWeather API\n\nDetail lengkap bisa lihat di halaman Projects! 💻`;
    }
    
    if (lowerMessage.includes('pendidikan') || lowerMessage.includes('kuliah') || lowerMessage.includes('sekolah')) {
      return `Halo! 👋\n\n**Pendidikan** Galvin Alfito Dinova:\n\n**S1 Informatika** - Universitas Brawijaya (2020 - 2024) 🎓\n• IPK: 3.85/4.00\n• Focus: Web Development & Artificial Intelligence\n• Thesis: "Pengembangan Chatbot AI untuk Portfolio Interaktif"\n• Aktif di UKM Programming Club\n\n**Bootcamp Full Stack** - Dibimbing.id (2023) 📚\n• Graduated with Honors\n• Belajar: React, Node.js, Database, Deployment\n\n**Sertifikasi** 📜\n• AWS Certified Cloud Practitioner\n• Meta Frontend Developer Professional Certificate\n• Google UX Design Certificate`;
    }
    
    if (lowerMessage.includes('kontak') || lowerMessage.includes('hubungi') || lowerMessage.includes('email')) {
      return `Halo! 👋\n\nBerikut **kontak** Galvin Alfito Dinova:\n\n**Email** 📧: galvin.alfito@example.com\n**LinkedIn** 🔗: /in/galvin-alfito-dinova\n**GitHub** 🐙: github.com/galvinalfito\n**Instagram** 📸: @galvin.alfito\n**WhatsApp** 💬: +62 812-3456-7890\n\nAtau bisa langsung kirim pesan melalui form kontak di website! Saya akan merespon dalam 1x24 jam. 📨`;
    }
    
    if (lowerMessage.includes('terima kasih') || lowerMessage.includes('makasih')) {
      return `Sama-sama! 😊 Senang bisa membantu Anda.\n\nJika ada pertanyaan lain tentang Galvin atau portfolio-nya, jangan ragu untuk bertanya ya! 🚀\n\nHave a great day! ✨`;
    }
    
    // Default response
    return `Halo! 👋\n\nTerima kasih atas pertanyaannya. Saya **Alf AI**, asisten virtual Galvin Alfito Dinova.\n\n**Yang bisa saya bantu:**\n• 📝 **Skill & Keahlian** - Teknologi yang dikuasai\n• 💻 **Project Portfolio** - Karya yang sudah dibuat\n• 💼 **Pengalaman Kerja** - Riwayat profesional\n• 🎓 **Pendidikan** - Latar belakang akademik\n• 📞 **Kontak** - Cara menghubungi Galvin\n\nSilakan tanyakan hal yang ingin diketahui tentang portfolio Galvin. Saya siap membantu! 😊\n\nAtau bisa langsung lihat halaman website untuk informasi lebih lengkap. ✨`;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setShowEmojiPicker(false);
    
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    const userMessageObj = {
      id: messageId,
      text: userMessage,
      sender: 'user', 
      timestamp: new Date(),
      username: 'Pengunjung'
    };
    
    setMessageId(prev => prev + 1);
    setMessages(prev => [...prev, userMessageObj]);
    setIsLoading(true);

    try {
      const aiResponse = await sendToAI(userMessage);
      
      const aiMessageObj = {
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
      
      const errorMessage = "**Maaf, terjadi kesalahan!** 🙏\n\nSistem AI sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat.\n\n**Alternatif:**\n• Refresh halaman\n• Cek koneksi internet\n• Hubungi langsung via kontak di footer\n\nAtau bisa langsung lihat halaman portfolio untuk informasi lebih lanjut.";
      
      const errorMessageObj = {
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
    if (window.confirm("Yakin mau memulai percakapan baru?")) {
      setMessages([{
        id: 1,
        text: "Halo! 👋 Saya **Alf AI**, asisten virtual dari **Galvin Alfito Dinova**. Ada yang bisa saya bantu tentang portfolio, project, atau skill saya?",
        sender: 'ai',
        timestamp: new Date(),
        username: 'Alf AI'
      }]);
      setMessageId(2);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      addSystemNotification("Browser tidak mendukung voice recognition. Gunakan Chrome atau Edge terbaru.");
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
          addSystemNotification("Izin mikrofon diperlukan untuk voice input.");
        });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setIsMinimized(false);
    }
  };

  const changeModel = (modelId) => {
    const newModel = availableModels.find(m => m.id === modelId);
    setSelectedModel(modelId);
    addSystemNotification(`**Model AI diubah** ke ${newModel?.name || modelId}`);
  };

  const onEmojiClick = (emojiData) => {
    setInputMessage(prev => prev + emojiData.emoji);
    inputRef.current?.focus();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessageContent = (message) => {
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

  const renderTextWithMarkdown = (text) => {
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
          if (match.index > lastIndex) {
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
          
          lastIndex = match.index + match[0].length;
        });
        
        if (lastIndex < line.length) {
          elements.push(
            <span key={`${lineIndex}-after`}>
              {line.substring(lastIndex)}
            </span>
          );
        }
        
        return <p key={lineIndex} className="mb-2 text-gray-300">{elements}</p>;
      }
      
      if (line.startsWith('- ') || line.startsWith('• ') || line.startsWith('* ')) {
        return (
          <div key={lineIndex} className="flex items-start mb-1 ml-2">
            <span className="mr-2 mt-1 text-gray-500">•</span>
            <span className="text-gray-300">{line.substring(2)}</span>
          </div>
        );
      }
      
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={lineIndex} className="flex items-start mb-1 ml-2">
            <span className="mr-2 font-medium text-gray-400">{line.match(/^\d+/)[0]}.</span>
            <span className="text-gray-300">{line.substring(line.indexOf('. ') + 2)}</span>
          </div>
        );
      }
      
      return <p key={lineIndex} className="mb-2 text-gray-300">{line}</p>;
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
      height: '650px',
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
          <div className="p-4 rounded-t-xl flex justify-between items-center border-b border-gray-700/30" style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(20px)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <Lottie 
                  animationData={IconAi} 
                  loop={true} 
                  autoplay={true} 
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <h3 className="font-bold text-white">Alf AI - Portfolio Assistant</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Cpu className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {availableModels.find(m => m.id === selectedModel)?.name || 'GPT-5 Nano'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
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
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: 'transparent' }}>
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
                          className={`max-w-[85%] rounded-xl p-4 backdrop-blur-md ${
                            msg.sender === 'user' ? 
                            'bg-gray-800/60 text-white border border-gray-600/30' : 
                            'bg-gray-900/60 text-gray-100 border border-gray-700/30'
                          }`}
                        >
                          {/* Sender Icon and Name */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center overflow-hidden ${
                              msg.sender === 'user' ? 
                              'bg-gradient-to-r from-gray-600 to-gray-700' : 
                              ''
                            }`}>
                              {msg.sender === 'user' ? 
                                <Lottie 
                                  animationData={IconAi} 
                                  loop={true} 
                                  autoplay={true} 
                                  style={{ width: '100%', height: '100%' }}
                                /> : 
                                <Lottie 
                                  animationData={IconAi} 
                                  loop={true} 
                                  autoplay={true} 
                                  style={{ width: '100%', height: '100%' }}
                                />
                              }
                            </div>
                            <span className="text-xs font-medium text-gray-300">
                              {msg.sender === 'user' ? 'Pengunjung' : 'Alf AI'}
                            </span>
                          </div>
                          
                          {/* Message Content */}
                          <div className="whitespace-pre-wrap break-words">
                            {renderMessageContent(msg)}
                          </div>
                          
                          {/* Message Footer */}
                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-700/30">
                            <div className="text-xs text-gray-500">
                              {formatTime(msg.timestamp)}
                            </div>
                            <div className="text-xs text-gray-600">
                              {msg.sender === 'ai' ? 'AI Assistant' : 'Anda'}
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
                    <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-4 border border-gray-700/30 max-w-[85%]">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <div className="text-sm text-gray-400">
                          {apiStatus === 'loading' ? 'Menghubungkan...' : 'Mengetik...'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-800/30 p-4" style={{ backgroundColor: 'rgba(17, 24, 39, 0.7)', backdropFilter: 'blur(20px)' }}>
                {showEmojiPicker && (
                  <div ref={emojiPickerRef} className="absolute bottom-20 right-4 z-50">
                    <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
                  </div>
                )}
                
                {/* Model Selector */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">AI Model:</span>
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 ${apiStatus === 'ready' ? 'text-green-500' : apiStatus === 'error' ? 'text-red-500' : 'text-yellow-500'}`}>
                        {apiStatus === 'ready' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        <span className="text-xs">
                          {apiStatus === 'ready' ? 'Connected' : 
                           apiStatus === 'loading' ? 'Connecting...' : 
                           apiStatus === 'error' ? 'Disconnected' : 'Idle'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {availableModels.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => changeModel(model.id)}
                        className={`px-2 py-1 rounded text-xs transition backdrop-blur-sm ${
                          selectedModel === model.id ? 
                          'bg-gray-700/70 text-white' : 
                          'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                        }`}
                        title={model.desc}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <form onSubmit={sendMessage} className="flex flex-col gap-3">
                  <div className="flex gap-2 w-full">
                    {/* Emoji Button */}
                    <button 
                      type="button" 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
                      className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-all"
                      title="Emoji"
                    >
                      <Smile className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    {/* Voice Input Button */}
                    <button 
                      type="button" 
                      onClick={toggleListening} 
                      className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg transition-all backdrop-blur-sm ${
                        isListening ? 
                        'bg-red-600/70 text-white animate-pulse' : 
                        'bg-gray-800/50 border border-gray-700/30 text-gray-400 hover:bg-gray-700/50'
                      }`}
                      title="Voice Input"
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    
                    {/* Input Field */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={isListening ? "Bicaralah..." : "Tanya tentang portfolio Galvin..."}
                      className="flex-1 min-w-0 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-lg px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-transparent"
                      disabled={isLoading}
                    />
                    
                    {/* Send Button */}
                    <motion.button 
                      type="submit" 
                      className="flex-shrink-0 bg-gray-700/70 backdrop-blur-sm text-white w-12 h-12 flex items-center justify-center rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isLoading || !inputMessage.trim()}
                      title="Kirim"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </motion.button>
                  </div>
                
                  {/* Voice Status Indicator */}
                  {isListening && (
                    <div className="mt-1 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                        <span className="text-xs text-red-400 font-medium">
                          Mendengarkan... Klik mikrofon untuk berhenti.
                        </span>
                      </div>
                    </div>
                  )}
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