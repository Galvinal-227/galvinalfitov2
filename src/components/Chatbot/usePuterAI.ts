// usePuterAI.ts
import { useState, useRef, useEffect, useCallback } from 'react';
import { getSystemPrompt } from './portfolioData';
import type { Message } from './chatbot.types';

// Coba dapatkan referensi puter dari window atau dari package
const getPuter = () => {
  if (typeof window !== 'undefined' && (window as any).puter) {
    return (window as any).puter;
  }
  // Fallback ke import package jika window.puter tidak ada
  try {
    const puter = require('@heyputer/puter.js');
    return puter;
  } catch {
    return null;
  }
};

export function usePuterAI(selectedModel: string, messages: Message[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterReady, setIsPuterReady] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Cek ketersediaan
    const puter = getPuter();
    if (puter && typeof puter.ai?.chat === 'function') {
      console.log('[Puter] ✅ Ready');
      setIsPuterReady(true);
    } else {
      console.warn('[Puter] ❌ Not available, using fallback');
      setIsPuterReady(true); // tetap aktif
    }
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
      abortControllerRef.current = new AbortController();

      try {
        const puter = getPuter();
        if (puter && typeof puter.ai?.chat === 'function') {
          const fullPrompt = buildContext();
          console.log(`[Puter] Chatting with model: ${selectedModel}`);
          // Hapus parameter signal karena tidak didukung
          const response = await puter.ai.chat(fullPrompt, {
            model: selectedModel,
            max_tokens: 300,
            temperature: 0.7,
          });

          if (abortControllerRef.current?.signal.aborted) {
            onComplete('⏹️ Stopped.');
            return;
          }

          let resultText = '';
          if (typeof response === 'string') {
            resultText = response;
          } else if (response?.message?.content) {
            resultText = response.message.content;
          } else if (response?.content) {
            resultText = response.content;
          } else if (response?.text) {
            resultText = response.text;
          } else if (response?.toString) {
            resultText = response.toString();
          }

          if (resultText.trim()) {
            onComplete(resultText.trim());
            return;
          }
        }

        // Fallback
        console.warn('[Puter] No response, using fallback');
        onComplete(getFallbackResponse(text));
      } catch (err: any) {
        if (err?.name === 'AbortError' || abortControllerRef.current?.signal.aborted) {
          onComplete('⏹️ Stopped.');
        } else {
          console.error('[Puter] Error:', err);
          onComplete(getFallbackResponse(text));
        }
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
  if (lower.includes('jam') || lower.includes('waktu') || lower.includes('time')) {
    return `Sekarang jam ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}.`;
  }
  return `Maaf, saya belum bisa menjawab pertanyaan "${input}". Coba tanyakan tentang Galvin atau portofolionya.`;
}