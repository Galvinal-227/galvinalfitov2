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

          const response = await puter.ai.chat(fullPrompt, {
            model: selectedModel,
            max_tokens: 500,
            temperature: 0.7,
          });

          let resultText = '';
          if (typeof response === 'string') {
            resultText = response;
          } else if (response?.message?.content) {
            resultText = response.message.content;
          } else if (response?.content) {
            resultText = response.content;
          } else if (response?.text) {
            resultText = response.text;
          }

          if (resultText.trim()) {
            console.log('[Puter] ✅ Response received');
            onComplete(resultText.trim());
            return;
          }
        }

        console.warn('[Puter] ❌ No valid response, using fallback');
        onComplete(getFallbackResponse(text));
      } catch (err: any) {
        console.error('[Puter] Error:', err);
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
