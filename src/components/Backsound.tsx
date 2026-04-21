import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowRight, Music, Headphones } from 'lucide-react';
import Lottie from 'lottie-react';
import MusicAnimation from 'assets/animation/music.json'; // Kamu bisa ganti dengan animasi lain

interface BacksoundProps {
  onComplete: () => void;
}

const Backsound: React.FC<BacksoundProps> = ({ onComplete }) => {
  const [showPrompt, setShowPrompt] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Ganti dengan path music kamu
    audioRef.current = new Audio('/assets/bekson.mpeg');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Volume 30%

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
          className="fixed left-0 top-0 z-[99999999] flex h-screen w-full flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-purple-300 opacity-20 blur-3xl animate-pulse" />
            <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-blue-300 opacity-20 blur-3xl animate-pulse" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300 opacity-10 blur-3xl animate-spin-slow" />
          </div>

          <motion.div
            className="relative z-10 max-w-md px-6 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Icon/Animation */}
            <motion.div
              className="mb-6 flex justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-xl" />
                <div className="relative h-32 w-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  {musicEnabled ? (
                    <Volume2 className="h-16 w-16 text-white" />
                  ) : (
                    <Music className="h-16 w-16 text-white" />
                  )}
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className="mb-3 font-spartan text-3xl font-bold text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Pengalaman Lebih Baik
            </motion.h2>

            {/* Description */}
            <motion.p
              className="mb-8 font-spartan text-lg text-white/90"
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
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-6 py-3 font-spartan text-white transition-all hover:bg-white/30 hover:scale-105 border border-white/30"
                >
                  <Volume2 className="h-5 w-5" />
                  <span>Ya, Izinkan</span>
                </button>
                <button
                  onClick={handleDisableMusic}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/10 backdrop-blur-sm px-6 py-3 font-spartan text-white/80 transition-all hover:bg-white/20 border border-white/20"
                >
                  <VolumeX className="h-5 w-5" />
                  <span>Tidak, Lanjut</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {/* Music Status */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2">
                    {musicEnabled ? (
                      <>
                        <div className="flex gap-1">
                          <motion.div
                            className="h-4 w-1 rounded-full bg-green-400"
                            animate={{ height: [4, 16, 4] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                          <motion.div
                            className="h-4 w-1 rounded-full bg-green-400"
                            animate={{ height: [16, 4, 16] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="h-4 w-1 rounded-full bg-green-400"
                            animate={{ height: [4, 16, 4] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="font-spartan text-white">Music Playing</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-4 w-4 text-white/60" />
                        <span className="font-spartan text-white/60">Music Off</span>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={toggleMusic}
                    className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
                    title={musicEnabled ? "Matikan Music" : "Nyalakan Music"}
                  >
                    {musicEnabled ? (
                      <Volume2 className="h-5 w-5 text-white" />
                    ) : (
                      <VolumeX className="h-5 w-5 text-white" />
                    )}
                  </button>
                </div>

                {/* Continue Button */}
                <motion.button
                  onClick={handleContinue}
                  className="group relative mx-auto flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 font-spartan text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Lanjutkan ke Portfolio</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.button>
              </motion.div>
            )}

            {/* Footer Note */}
            <motion.p
              className="mt-6 font-spartan text-sm text-white/50"
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
