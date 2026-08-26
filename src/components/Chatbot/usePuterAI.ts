import { useState, useRef, useCallback } from 'react';
import { getSystemPrompt } from './portfolioData';
import type { Message } from './chatbot.types';
import { loadPuter } from './loadPuter';

export function usePuterAI(selectedModel: string, messages: Message[]) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPuterReady] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const buildContext = useCallback(() => {
    const history = messages
      .filter((m) => m.sender !== 'system')
      .slice(-6)
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
        const puter = await loadPuter();

        if (puter && typeof puter.ai?.chat === 'function') {
          const fullPrompt = buildContext();
          const response = await puter.ai.chat(fullPrompt, {
            model: selectedModel,
            max_tokens: 150, // lebih kecil = lebih cepat & ringan
            temperature: 0.7,
          });

          if (abortControllerRef.current?.signal.aborted) {
            onComplete('⏹️ Stopped.');
            return;
          }

          let resultText = '';
          if (typeof response === 'string') resultText = response;
          else if (response?.message?.content) resultText = response.message.content;
          else if (response?.content) resultText = response.content;
          else if (response?.text) resultText = response.text;

          onComplete(resultText.trim() || 'Maaf, saya tidak mengerti.');
          return;
        }

        onComplete('Maaf, layanan AI tidak tersedia.');
      } catch (err: any) {
        if (err?.name === 'AbortError' || abortControllerRef.current?.signal.aborted) {
          onComplete('⏹️ Stopped.');
        } else {
          onComplete('Maaf, terjadi kesalahan. Silakan coba lagi.');
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [selectedModel, buildContext]
  );

  const stopGeneration = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
  }, []);

  return { isPuterReady, isLoading, sendMessage, stopGeneration };
}
