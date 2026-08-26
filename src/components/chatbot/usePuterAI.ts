import { useState, useRef, useEffect, useCallback } from 'react';
import * as puter from '@heyputer/puter.js';
import { getSystemPrompt } from './portfolioData';
import type { Message } from './chatbot.types';

export function usePuterAI(selectedModel: string, messages: Message[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterReady, setIsPuterReady] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Inisialisasi Puter.js dari NPM package
  useEffect(() => {
    const initPuter = async () => {
      try {
        console.log('[Puter] Checking NPM package...');
        console.log('[Puter] puter object:', puter);
        console.log('[Puter] puter.ai:', puter?.ai);
        console.log('[Puter] puter.ai.chat:', puter?.ai?.chat);

        if (puter && typeof puter.ai?.chat === 'function') {
          console.log('[Puter] ✅ Ready from NPM');
          setIsPuterReady(true);
        } else {
          console.warn('[Puter] ⚠️ puter.ai.chat not found in NPM package');
          setIsPuterReady(false);
        }
      } catch (error) {
        console.error('[Puter] Init error:', error);
        setIsPuterReady(false);
      }
    };

    initPuter();
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
        if (puter && typeof puter.ai?.chat === 'function') {
          const fullPrompt = buildContext();
          console.log(`[Puter] Sending to ${selectedModel}...`);

          const response = await puter.ai.chat(fullPrompt, {
            model: selectedModel,
            temperature: 0.7,
          });

          console.log('[Puter] Response type:', typeof response);
          console.log('[Puter] Response:', response);

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
            const str = response.toString();
            if (str !== '[object Object]') {
              resultText = str;
            }
          }

          if (resultText.trim()) {
            console.log('[Puter] ✅ Success');
            onComplete(resultText.trim());
            return;
          }
        }

        console.warn('[Puter] ❌ Fallback');
        onComplete(getFallbackResponse(text));
      } catch (err: any) {
        console.error('[Puter] Error:', err);
        onComplete(getFallbackResponse(text));
      } finally {
        setIsLoading(false);
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
