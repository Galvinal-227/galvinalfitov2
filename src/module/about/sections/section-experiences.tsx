import Magnet from 'components/effect/magnet'
import { motion, AnimatePresence } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import ExperienceRow, { ExperienceRowProps } from 'module/about/experience-row'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useState } from 'react'

export default function SectionProjects() {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const projects: (ExperienceRowProps & { liveUrl?: string })[] = [
    {
      text1: 'Learn Coding',
      text2: '2026',
      text3: 'Frontend - React, Tailwind, Vite, locomotive-scroll, framer-motion',
      color: '#0091F8',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://learncoding-one.vercel.app'
    },
    {
      text1: 'Gallery With You',
      text2: '2026',  
      text3: 'Frontend - React, Tailwind, Vite, framer-motion',
      color: '#F1592A',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://youandme-six.vercel.app'
    },
    {
      text1: 'Portfolio Website',
      text2: '2025',
      text3: 'Fullstack - React, Tailwind, MongoDB',
      color: '#2E9E6C',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://galvin-portfolio.vercel.app'
    },
    {
      text1: 'Library Css Gradient',
      text2: '2026',
      text3: 'Frontend - React, Tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gcssgradient.vercel.app'
    },
    {
      text1: 'Library Nova UI',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://novaui-six.vercel.app'
    },
    {
      text1: 'GWD Studio',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gwd-studio.vercel.app'
    },
    {
      text1: 'Old Portfolio',
      text2: '2025',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://galvin-portfolio.vercel.app'
    },
    {
      text1: 'Al Quran Digital',
      text2: '2025',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://al-q-app.vercel.app'
    },
    {
      text1: 'GWD Code Editor',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gcodeeditor.vercel.app'
    },
    {
      text1: 'GWD Color Generator',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gwd-code-generator.vercel.app'
    },
    {
      text1: 'Velora Shop',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://veloraid-pi.vercel.app'
    },
    {
      text1: 'Retro OS',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://retro-os-blush.vercel.app'
    }
  ]

  return (
    <section id="section-projects" className="CONTAINER relative">
      <Magnet strength={10} className="z-[-10] mt-4 w-fit">
        <motion.div
          animate={{ width: '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="MENU-CHANGE-OPACITY-0 flex h-[100px] items-center justify-center bg-yellow-300"
        >
          <Magnet>
            <AiOutlineArrowDown className="text-8xl" />
          </Magnet>
        </motion.div>
      </Magnet>

      <LetterSpacingTitle>{t('about_projects')}</LetterSpacingTitle>

      <div className="MENU-CHANGE-Y-100-STAGGER relative">
        {projects.map((project, i) => (
          <div 
            key={i}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ExperienceRow {...project} />
            
            {/* Preview Tooltip - Muncul di samping kanan */}
            <AnimatePresence>
              {hoveredIndex === i && project.liveUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, x: -15 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.92, x: -15 }}
                  transition={{ 
                    duration: 0.25,
                    ease: easeDefault
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+20px)] z-30 w-[380px] h-[240px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/80"
                >
                  {/* Mini Browser Chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50/95 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400 hover:bg-green-500 transition-colors" />
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="bg-white rounded-md px-2 py-0.5 text-[10px] text-gray-500 text-center truncate border border-gray-200">
                        {project.liveUrl.replace(/^https?:\/\//, '')}
                      </div>
                    </div>
                    <button
                      onClick={() => setHoveredIndex(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors text-xs hover:bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                  
                  {/* Website Preview */}
                  <div className="w-full h-[calc(100%-38px)] bg-white">
                    <iframe
                      src={project.liveUrl}
                      className="w-full h-full"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms"
                      title={`Preview ${project.text1}`}
                    />
                  </div>
                  
                  {/* Hover Info Badge - Minimalis */}
                  <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full flex items-center gap-2">
                    <span className="truncate max-w-[100px]">{project.text1}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40" />
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:text-blue-200 transition-colors"
                    >
                      ↗
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
