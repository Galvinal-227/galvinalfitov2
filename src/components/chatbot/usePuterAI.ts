import { useState, useRef, useEffect, useCallback } from 'react';
import { getSystemPrompt } from './portfolioData';
import type { Message } from './chatbot.types';

// Cek window.puter dulu, baru fallback ke module
const getPuter = () => {
  if (typeof window !== 'undefined' && (window as any).puter) {
    return (window as any).puter;
  }
  return null;
};

// Fungsi untuk mengekstrak teks dari berbagai format response
const extractTextFromResponse = (response: any): string => {
  // 1. String langsung
  if (typeof response === 'string') {
    return response;
  }

  // 2. Object dengan properti message.content
  if (response?.message?.content) {
    const content = response.message.content;
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content
        .map((part: any) => {
          if (typeof part === 'string') return part;
          if (part?.text) return part.text;
          if (part?.content) return part.content;
          return '';
        })
        .join('');
    }
    return JSON.stringify(content);
  }

  // 3. Object dengan properti content
  if (response?.content) {
    if (typeof response.content === 'string') return response.content;
    if (Array.isArray(response.content)) {
      return response.content
        .map((part: any) => {
          if (typeof part === 'string') return part;
          if (part?.text) return part.text;
          return '';
        })
        .join('');
    }
    return JSON.stringify(response.content);
  }

  // 4. Object dengan properti text
  if (response?.text) {
    return typeof response.text === 'string' ? response.text : JSON.stringify(response.text);
  }

  // 5. OpenAI format (choices array)
  if (response?.choices && Array.isArray(response.choices) && response.choices.length > 0) {
    const choice = response.choices[0];
    if (choice?.message?.content) {
      return typeof choice.message.content === 'string' 
        ? choice.message.content 
        : JSON.stringify(choice.message.content);
    }
    if (choice?.text) {
      return choice.text;
    }
  }

  // 6. Response adalah object dengan toString yang berguna
  if (typeof response?.toString === 'function') {
    const str = response.toString();
    if (str !== '[object Object]') {
      return str;
    }
  }

  // 7. Response adalah array
  if (Array.isArray(response)) {
    return response
      .map((item: any) => {
        if (typeof item === 'string') return item;
        if (item?.text) return item.text;
        if (item?.content) return item.content;
        return '';
      })
      .join('');
  }

  return '';
};

export function usePuterAI(selectedModel: string, messages: Message[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterReady, setIsPuterReady] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Inisialisasi: tunggu window.puter siap
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const checkPuter = () => {
      const puter = getPuter();
      if (puter && typeof puter.ai?.chat === 'function') {
        console.log('[Puter] ✅ Ready');
        setIsPuterReady(true);
        clearInterval(interval);
      } else {
        console.log('[Puter] ⏳ Waiting for script to load...');
      }
    };

    // Cek langsung
    checkPuter();

    // Jika belum siap, cek setiap 500ms (maksimal 10 detik)
    interval = setInterval(checkPuter, 500);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!getPuter()) {
        console.error('[Puter] ❌ Failed to load after 10s');
        setIsPuterReady(true); // tetap aktif agar fallback bisa dipakai
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const buildContext = useCallback(() => {
    const history = messages
      .filter((m) => m.sender !== 'system')
      .slice(-8)
      .map((m) => `${m.sender === 'ai' ? 'Alf AI' : 'User'}: ${m.text}`)
      .join('\n');
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user')?.text || '';
    return `${getSystemPrompt()}\n\n${history}\nUser: ${lastUserMessage}\nAlf AI:`;
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string, onComplete: (response: string) => void) => {
      setIsLoading(true);

      try {
        const puter = getPuter();
        if (puter && typeof puter.ai?.chat === 'function') {
          const fullPrompt = buildContext();
          console.log(`[Puter] Sending prompt to ${selectedModel}...`);
          console.log('[Puter] Full prompt:', fullPrompt);

          const response = await puter.ai.chat(fullPrompt, {
            model: selectedModel,
            temperature: 0.7,
            max_tokens: 500,
          });

          // Debug: lihat struktur response lengkap
          console.log('[Puter] Response type:', typeof response);
          console.log('[Puter] Response is array:', Array.isArray(response));
          console.log('[Puter] Raw response:', response);
          console.log('[Puter] JSON:', JSON.stringify(response, null, 2));

          const resultText = extractTextFromResponse(response);

          if (resultText.trim()) {
            console.log('[Puter] ✅ Extracted text:', resultText);
            onComplete(resultText.trim());
            return;
          } else {
            console.warn('[Puter] ⚠️ Empty text extracted');
          }
        } else {
          console.warn('[Puter] ⚠️ Puter not available');
        }

        console.warn('[Puter] ❌ Using fallback');
        onComplete(getFallbackResponse(text));
      } catch (err: any) {
        console.error('[Puter] Error:', err);
        console.error('[Puter] Error message:', err?.message);
        console.error('[Puter] Error stack:', err?.stack);
        onComplete(getFallbackResponse(text));
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [selectedModel, buildContext]
  );

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
  }, []);

  return { isPuterReady, isLoading, sendMessage, stopGeneration };
}

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('halo') || lower.includes('hai') || lower.includes('hello')) {
    return 'Halo! Saya Alf AI, asisten virtual untuk portofolio Galvin. Silakan tanya tentang keahlian atau proyeknya.';
  }
  if (lower.includes('skill') || lower.includes('tech') || lower.includes('teknologi')) {
    return 'Galvin menguasai React, TypeScript, Tailwind CSS, Node.js, dan UI/UX design.';
  }
  if (lower.includes('proyek') || lower.includes('project')) {
    return 'Beberapa proyek Galvin antara lain: Portfolio Website, Game Shooter, dan Web Top-Up.';
  }
  if (lower.includes('tentang') || lower.includes('about') || lower.includes('siapa')) {
    return 'Galvin adalah Frontend Developer & UI/UX Designer yang fokus pada pengalaman web modern dan interaktif.';
  }
  return `Maaf, saya belum bisa menjawab pertanyaan "${input}". Coba tanyakan tentang Galvin atau portofolionya.`;
}
