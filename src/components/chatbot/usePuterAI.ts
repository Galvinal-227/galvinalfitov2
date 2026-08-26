import { useState, useRef, useEffect, useCallback } from 'react';
import { getSystemPrompt } from './portfolioData';
import type { Message } from './chatbot.types';

const getPuter = (): PuterGlobal | null => {
  if (typeof window !== 'undefined' && (window as any).puter) {
    return (window as any).puter as PuterGlobal;
  }
  return null;
};

export function usePuterAI(selectedModel: string, messages: Message[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterReady, setIsPuterReady] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let checkCount = 0;
    const maxChecks = 20;

    const checkPuter = () => {
      const puter = getPuter();
      if (puter && typeof puter.ai?.chat === 'function') {
        console.log('[Puter] ✅ Ready');
        setIsPuterReady(true);
        return true;
      }
      return false;
    };

    if (checkPuter()) return;

    const interval = setInterval(() => {
      checkCount++;
      if (checkPuter() || checkCount >= maxChecks) {
        clearInterval(interval);
        if (checkCount >= maxChecks) {
          console.warn('[Puter] ⚠️ Script not loaded');
          setIsPuterReady(true);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const buildContext = useCallback(() => {
    // Ambil 10 pesan terakhir untuk konteks
    const recentMessages = messages
      .filter((m) => m.sender !== 'system')
      .slice(-10);

    const history = recentMessages
      .map((m) => `${m.sender === 'ai' ? 'Alf AI' : 'User'}: ${m.text}`)
      .join('\n\n');

    return `${getSystemPrompt()}\n\nPERCAKAPAN:\n${history}\n\nAlf AI:`;
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string, onComplete: (response: string) => void) => {
      setIsLoading(true);

      try {
        const puter = getPuter();

        if (puter && typeof puter.ai?.chat === 'function') {
          const fullPrompt = buildContext();
          console.log(`[Puter] Sending to ${selectedModel}...`);

          const response = await puter.ai.chat(fullPrompt, {
            model: selectedModel,
            temperature: 0.8,
          });

          console.log('[Puter] Raw response:', response);

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
            onComplete(resultText.trim());
            return;
          }
        }

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
    return 'Halo! Ada yang bisa saya bantu?';
  }
  if (lower.includes('makan')) {
    return 'Wah, kalau lapar coba nasi goreng atau mie ayam, enak tuh!';
  }
  return 'Maaf, AI sedang tidak tersedia. Coba lagi nanti ya.';
}
