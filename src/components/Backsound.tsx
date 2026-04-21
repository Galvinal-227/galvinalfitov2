import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, Music } from 'lucide-react';
import backgroundMusic from './assets/bekson.mpeg';

interface BacksoundProps {
  onComplete: () => void;
}

const Backsound: React.FC<BacksoundProps> = ({ onComplete }) => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
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

  const handleEnableMusic = async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setMusicEnabled(true);
        setHasInteracted(true);
      }
    } catch (error) {
      console.log('Autoplay blocked, need user interaction');
      setMusicEnabled(false);
      setHasInteracted(true);
    }
  };

  const handleDisableMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setMusicEnabled(false);
    setHasInteracted(true);
  };

  const handleContinue = () => {
    setShowPrompt(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const toggleMusic = async () => {
    if (musicEnabled) {
      audioRef.current?.pause();
      setMusicEnabled(false);
    } else {
      try {
        await audioRef.current?.play();
        setMusicEnabled(true);
      } catch (error) {
        console.log('Failed to play music');
      }
    }
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="fixed left-0 top-0 z-[99999999] flex h-screen w-full flex-col items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative z-10 max-w-md px-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Icon */}
            <motion.div
              className="mb-6 flex justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
                <div className="relative h-32 w-32 rounded-full bg-primary/5 flex items-center justify-center border border-primary/20">
                  {musicEnabled ? (
                    <Volume2 className="h-16 w-16 text-primary" />
                  ) : (
                    <Music className="h-16 w-16 text-primary" />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-3 font-spartan text-3xl font-light text-primary"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Pengalaman Lebih Baik
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-8 font-spartan text-base font-light text-primary/70"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Izinkan background music untuk pengalaman menjelajahi portfolio yang lebih immersive 🎵
            </motion.p>

            {/* Music Permission Buttons */}
            {!hasInteracted ? (
              <motion.div
                className="flex flex-col gap-3 sm:flex-row sm:justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={handleEnableMusic}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-spartan text-sm font-light text-white transition-all hover:bg-primary/80 hover:scale-105"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>Ya, Izinkan</span>
                </button>
                <button
                  onClick={handleDisableMusic}
                  className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-transparent px-6 py-3 font-spartan text-sm font-light text-primary transition-all hover:bg-primary/5"
                >
                  <VolumeX className="h-4 w-4" />
                  <span>Tidak, Lanjut</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Music Status */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 border border-primary/10">
                    {musicEnabled ? (
                      <>
                        <div className="flex gap-1">
                          <motion.div
                            className="h-4 w-1 rounded-full bg-primary"
                            animate={{ height: [4, 16, 4] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className="h-4 w-1 rounded-full bg-primary"
                            animate={{ height: [16, 4, 16] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="h-4 w-1 rounded-full bg-primary"
                            animate={{ height: [4, 16, 4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="font-spartan text-sm font-light text-primary">Music Playing</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-4 w-4 text-primary/40" />
                        <span className="font-spartan text-sm font-light text-primary/40">Music Off</span>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={toggleMusic}
                    className="rounded-full bg-primary/5 p-2 transition-all hover:bg-primary/10 border border-primary/20"
                    title={musicEnabled ? "Matikan Music" : "Nyalakan Music"}
                  >
                    {musicEnabled ? (
                      <Volume2 className="h-4 w-4 text-primary" />
                    ) : (
                      <VolumeX className="h-4 w-4 text-primary" />
                    )}
                  </button>
                </div>

                {/* Continue Button */}
                <motion.button
                  onClick={handleContinue}
                  className="group relative mx-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-spartan text-sm font-light text-white transition-all hover:bg-primary/80 hover:scale-105"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Lanjutkan ke Portfolio</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>
            )}

            {/* Footer Note */}
            <motion.p
              className="mt-8 font-spartan text-xs font-light text-primary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Kamu bisa mengubah pengaturan ini kapan saja
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Backsound;
