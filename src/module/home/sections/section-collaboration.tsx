// module/home/sections/section-collaboration.tsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaRocket, 
  FaUsers, 
  FaStar, 
  FaArrowRight,
  FaExternalLinkAlt,
  FaCode,
  FaGlobe
} from 'react-icons/fa';
import { 
  SiReact, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiVercel,
  SiTypescript 
} from 'react-icons/si';
import { 
  IoPlayCircleOutline,
  IoLogoWebComponent
} from 'react-icons/io5';
import { 
  MdOutlineVerified,
  MdOutlineSchool,
  MdOutlineLightbulb
} from 'react-icons/md';

interface TechStackItem {
  name: string;
  icon: React.ReactNode;
}

interface Student {
  initial: string;
  color: string;
}

const CollaborationSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const techStack: TechStackItem[] = [
    { name: 'React', icon: <SiReact className="text-white/60" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-white/60" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="text-white/60" /> },
    { name: 'Vercel', icon: <SiVercel className="text-white/40" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-white/60" /> }
  ];

  const stats = [
    { value: '3+', label: 'Students', icon: <MdOutlineSchool className="text-white/40" /> },
    { value: '100+', label: 'Resources', icon: <MdOutlineLightbulb className="text-white/40" /> },
    { value: '4.9', label: 'Rating', icon: <FaStar className="text-white/40" /> }
  ];

  const students: Student[] = [
    { 
      initial: 'AS',
      color: 'from-blue-400/30 to-blue-600/10'
    },
    { 
      initial: 'DN',
      color: 'from-purple-400/30 to-purple-600/10'
    },
    { 
      initial: 'SR',
      color: 'from-pink-400/30 to-pink-600/10'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-[60px] px-5 md:py-[120px] md:px-10 flex items-center bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-[80px] items-center">
        
        {/* LEFT SIDE - Preview */}
        <div className="relative order-1 lg:order-none">
          {/* Collaboration Badge - Mobile friendly */}
          <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 z-10 bg-white/10 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-semibold shadow-2xl flex items-center gap-2 border border-white/10 whitespace-nowrap">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-white"></span>
            </span>
            <FaRocket className="w-3 h-3 md:w-4 md:h-4 text-white/60" />
            <span className="text-white/80 text-[10px] md:text-sm">Official Collaboration</span>
          </div>

          <div 
            ref={containerRef}
            className="w-full h-[400px] md:h-[550px] lg:h-[750px] rounded-[20px] md:rounded-[30px] overflow-hidden bg-[#111] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative group"
          >
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#111]">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] md:text-xs text-white/40">Loading</span>
                  </div>
                </div>
                <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/30 animate-pulse">
                  Preparing learning platform...
                </p>
                <div className="mt-2 w-32 md:w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white/20 rounded-full transition-all duration-300"
                    style={{ width: `${(Date.now() % 10000) / 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent z-10" />
            
            <iframe 
              src="https://learncoding-one.vercel.app"
              title="Learn By GWD"
              className="w-full h-full border-none relative z-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-modals"
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb"
            />

            {/* Live Indicator */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 flex items-center gap-2 md:gap-3 bg-black/60 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10">
              <IoPlayCircleOutline className="w-4 h-4 md:w-5 md:h-5 text-white/60 animate-pulse" />
              <span className="text-xs md:text-sm text-white/60">
                {isLoading ? 'Loading...' : 'Live Demo'}
              </span>
            </div>
          </div>

          {/* Partner Logos - Mobile friendly */}
          <div className="flex flex-wrap items-center gap-3 md:gap-6 mt-4 md:mt-6 pl-2 md:pl-4">
            <span className="text-xs md:text-sm text-white/30">Collaboration with</span>
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm flex items-center gap-2">
                <FaCode className="text-white/40 text-sm md:text-base" />
                <span className="text-xs md:text-sm font-semibold text-white/80 whitespace-nowrap">
                  Learn By GWD
                </span>
              </div>
              <span className="text-white/20 text-sm">+</span>
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm flex items-center gap-2">
                <FaGlobe className="text-white/40 text-sm md:text-base" />
                <span className="text-xs md:text-sm font-semibold text-white/60 whitespace-nowrap">
                  Galvin Alfito
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Info */}
        <div className="space-y-6 md:space-y-8 order-2 lg:order-none">
          {/* Badge */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm font-medium text-white/60 flex items-center gap-2">
              <IoLogoWebComponent className="w-3 h-3 md:w-4 md:h-4" />
              <span className="whitespace-nowrap">Collaboration Project</span>
            </span>
            <span className="text-sm text-white/20">|</span>
            <span className="text-xs md:text-sm text-white/30">2026</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-[1.1] md:leading-[1.05]">
              <span className="text-white">
                Learn By GWD
              </span>
              <br />
              <span className="text-white/60 text-[20px] md:text-[32px] lg:text-[40px] flex flex-wrap items-center gap-2 md:gap-3">
                <MdOutlineVerified className="text-white/40 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                <span>× Collaboration</span>
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/50 text-sm md:text-base lg:text-lg leading-[1.6] md:leading-[1.8] max-w-full lg:max-w-[500px]">
            A collaborative learning platform created to help developers
            understand web development through structured and interactive
            learning resources.
          </p>

          {/* Stats - Mobile responsive grid */}
          <div className="grid grid-cols-3 gap-3 md:flex md:gap-8 py-3 md:py-4 border-y border-white/5">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-1.5 md:gap-2">
                <span className="text-sm md:text-base">{stat.icon}</span>
                <div>
                  <div className="text-lg md:text-2xl font-bold text-white/80">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-sm text-white/30 whitespace-nowrap">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-xs md:text-sm text-white/30 mb-2 md:mb-3 flex items-center gap-2">
              <IoLogoWebComponent className="w-3 h-3 md:w-4 md:h-4" />
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 text-xs md:text-sm text-white/60 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-1.5 md:gap-2"
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
            <a 
              href="https://learncoding-one.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white text-[#0a0a0a] font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-1 text-sm md:text-base"
            >
              <span>Visit Website</span>
              <FaExternalLinkAlt className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#"
              className="inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/10 text-white/60 font-semibold transition-all duration-300 hover:bg-white/5 hover:border-white/30 hover:-translate-y-1 text-sm md:text-base"
            >
              <span>Learn More</span>
              <FaArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </a>
          </div>

          {/* Social Proof - Student Avatars */}
          <div className="flex items-center gap-3 md:gap-4 pt-2 md:pt-4">
            <div className="flex -space-x-2">
              {students.map((student, index) => (
                <div 
                  key={index} 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${student.color} border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] md:text-xs font-bold text-white/70`}
                  title={student.initial}
                >
                  {student.initial}
                </div>
              ))}
            </div>
            <div className="text-xs md:text-sm text-white/30 flex items-center gap-1.5 md:gap-2">
              <FaUsers className="w-3 h-3 md:w-4 md:h-4 text-white/40" />
              <span className="text-white/60 font-semibold">3</span> 
              <span className="hidden xs:inline">active students</span>
              <span className="xs:hidden">students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
