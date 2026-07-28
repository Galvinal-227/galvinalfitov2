// module/home/sections/section-collaboration.tsx
import React from 'react';
import { 
  FaRocket, 
  FaUsers, 
  FaStar, 
  FaArrowRight,
  FaExternalLinkAlt,
  FaGithub,
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

const CollaborationSection: React.FC = () => {
  const techStack: TechStackItem[] = [
    { name: 'React', icon: <SiReact className="text-white/60" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-white/60" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="text-white/60" /> },
    { name: 'Vercel', icon: <SiVercel className="text-white/40" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-white/60" /> }
  ];

  const stats = [
    { value: '10K+', label: 'Students', icon: <MdOutlineSchool className="text-white/40" /> },
    { value: '50+', label: 'Resources', icon: <MdOutlineLightbulb className="text-white/40" /> },
    { value: '4.9', label: 'Rating', icon: <FaStar className="text-white/40" /> }
  ];

  const avatars = [
    { letter: 'A', color: 'from-white/20 to-white/5' },
    { letter: 'B', color: 'from-white/20 to-white/5' },
    { letter: 'C', color: 'from-white/20 to-white/5' },
    { letter: 'D', color: 'from-white/20 to-white/5' }
  ];

  return (
    <section className="relative py-[120px] px-10 flex items-center bg-[#0a0a0a] text-white font-sans overflow-hidden md:py-[60px] md:px-5">
      {/* Background Effects - Warm White */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-[1500px] mx-auto grid grid-cols-[1.2fr_1fr] gap-[80px] items-center lg:grid-cols-1 lg:gap-12">
        
        {/* LEFT SIDE - Preview */}
        <div className="relative">
          {/* Collaboration Badge */}
          <div className="absolute -top-6 -left-6 z-10 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold shadow-2xl flex items-center gap-2 border border-white/10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            <FaRocket className="w-4 h-4 text-white/60" />
            <span className="text-white/80">Official Collaboration</span>
          </div>

          <div className="w-full h-[750px] rounded-[30px] overflow-hidden bg-[#111] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative group md:h-[550px]">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent z-10" />
            
            <iframe 
              src="https://learnbygwd.vercel.app"
              title="Learn By GWD"
              className="w-full h-full border-none relative z-0"
              loading="lazy"
            />

            {/* Live Indicator */}
            <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <IoPlayCircleOutline className="w-5 h-5 text-white/60 animate-pulse" />
              <span className="text-sm text-white/60">Live Demo</span>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="flex items-center gap-6 mt-6 pl-4">
            <span className="text-sm text-white/30">Collaboration with</span>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm flex items-center gap-2">
                <FaCode className="text-white/40" />
                <span className="text-sm font-semibold text-white/80">
                  Learn By GWD
                </span>
              </div>
              <span className="text-white/20">+</span>
              <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm flex items-center gap-2">
                <FaGlobe className="text-white/40" />
                <span className="text-sm font-semibold text-white/60">
                  Galvin Alfito
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Info */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="flex items-center gap-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/60 flex items-center gap-2">
              <IoLogoWebComponent className="w-4 h-4" />
              Collaboration Project
            </span>
            <span className="text-sm text-white/20">|</span>
            <span className="text-sm text-white/30">2024</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-[64px] font-bold leading-[1.05] md:text-[42px]">
              <span className="text-white">
                Learn By GWD
              </span>
              <br />
              <span className="text-white/60 text-[40px] md:text-[28px] flex items-center gap-3">
                <MdOutlineVerified className="text-white/40 w-10 h-10" />
                × Collaboration
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-white/50 text-lg leading-[1.8] max-w-[500px]">
            A collaborative learning platform created to help developers
            understand web development through structured and interactive
            learning resources.
          </p>

          {/* Stats */}
          <div className="flex gap-8 py-4 border-y border-white/5">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                {stat.icon}
                <div>
                  <div className="text-2xl font-bold text-white/80">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/30">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-sm text-white/30 mb-3 flex items-center gap-2">
              <IoLogoWebComponent className="w-4 h-4" />
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 hover:border-white/30 transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-2"
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="https://learnbygwd.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#0a0a0a] font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:-translate-y-1"
            >
              <span>Visit Website</span>
              <FaExternalLinkAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a 
              href="#"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/10 text-white/60 font-semibold transition-all duration-300 hover:bg-white/5 hover:border-white/30 hover:-translate-y-1"
            >
              <span>Learn More</span>
              <FaArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <div 
                  key={index} 
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.color} border-2 border-[#0a0a0a] flex items-center justify-center text-xs font-bold text-white/60`}
                >
                  {avatar.letter}
                </div>
              ))}
            </div>
            <div className="text-sm text-white/30 flex items-center gap-2">
              <FaUsers className="w-4 h-4 text-white/40" />
              <span className="text-white/60 font-semibold">200+</span> developers joined
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;