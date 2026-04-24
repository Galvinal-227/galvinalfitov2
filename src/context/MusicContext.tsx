import React, { createContext, useContext, useRef, useEffect, useState } from 'react';
import backgroundMusic from '/intro.mp3';

interface MusicContextType {
  isPlaying: boolean;
  isEnabled: boolean;
  toggleMusic: () => void;
  enableMusic: () => Promise<void>;
  disableMusic: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) throw new Error('useMusic must be used within MusicProvider');
  return context;
};

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inisialisasi audio sekali aja
    audioRef.current = new Audio(backgroundMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const enableMusic = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsEnabled(true);
      }
    } catch (error) {
      console.log('Autoplay blocked');
      setIsEnabled(false);
    }
  };

  const disableMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsEnabled(true);
    }
  };

  const toggleMusic = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Failed to play');
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isEnabled,
        toggleMusic,
        enableMusic,
        disableMusic
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
