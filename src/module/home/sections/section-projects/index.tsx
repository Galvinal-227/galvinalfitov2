import Magnet from 'components/effect/magnet'
import { motion, AnimatePresence } from 'framer-motion'
import { easeDefault, routes } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import ExperienceRow, { ExperienceRowProps } from 'module/about/experience-row'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { AiOutlineArrowDown, AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type Project = ExperienceRowProps & { liveUrl?: string }

const projectCategories: { title: string; key: string; projects: Project[] }[] = [
  {
    title: 'Fullstack Applications',
    key: 'fullstack',
    projects: [
      {
        text1: 'Learn Coding',
        text2: '2026',
        text3: 'Fullstack - React, Node.js, MongoDB',
        color: '#0091F8',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://learncoding-one.vercel.app'
      },
    ]
  },
  {
    title: 'Frontend Websites',
    key: 'frontend',
    projects: [
      {
        text1: 'Gallery With You',
        text2: '2025',
        text3: 'Frontend - React, Express, Chart.js',
        color: '#F1592A',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://youandme-six.vercel.app'
      },
      {
        text1: 'Velora Shop',
        text2: '2026',
        text3: 'Frontend - React, tailwind',
        color: '#A3195B',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://veloraid-pi.vercel.app/'
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
        text1: 'WHY I AM HERE?',
        text2: '2026',
        text3: 'Frontend - React, tailwind',
        color: '#A3195B',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://whyamihere-xi.vercel.app/'
      },
      {
        text1: 'GWD Studio',
        text2: '2026',
        text3: 'Frontend - React, tailwind',
        color: '#A3195B',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://gwd-studio.vercel.app'
      },
    ]
  },
  {
    title: 'UI Libraries',
    key: 'ui-libraries',
    projects: [
      {
        text1: 'Library Css Gradient',
        text2: '2026',
        text3: 'Frontend - React, tailwind',
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
    ]
  },
  {
    title: 'Developer Tools',
    key: 'dev-tools',
    projects: [
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
        liveUrl: 'https://color-generator-kappa-three.vercel.app'
      },
      {
        text1: 'GWD Playground Api',
        text2: '2026',
        text3: 'Frontend - React, tailwind, Firebase',
        color: '#A3195B',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://gwd-api-playground.vercel.app'
      },
    ]
  },
  {
    title: 'Portfolio Websites',
    key: 'portfolio',
    projects: [
      {
        text1: 'Old Portfolio Website',
        text2: '2025',
        text3: 'Frontend - React, Tailwind',
        color: '#2E9E6C',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://galvin-portfolio.vercel.app'
      },
      {
        text1: 'Old Portfolio',
        text2: '2025',
        text3: 'Frontend - React, tailwind',
        color: '#A3195B',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://galvin-portfolio.vercel.app'
      },
    ]
  },
  {
    title: 'Android Apps',
    key: 'apps',
    projects: [
      {
        text1: 'Pocket Dev',
        text2: '2026',
        text3: 'Flutter - Dart',
        color: '#2E9E6C',
        link: 'https://github.com/galvinal-227',
        liveUrl: 'https://pocket-dev-two.vercel.app'
      },
  ]
},
export default function SectionProjects() {
  const { t } = useTranslation()
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null)

  return (
    <section id="section-projects" className="relative z-10 w-full bg-primary py-10">
      <div className="CONTAINER">
        <Magnet strength={10} className="z-[-10] mt-4 w-fit">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100px' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1, ease: easeDefault as any }}
            className="flex h-[100px] items-center justify-center bg-yellow-300"
          >
            <Magnet>
              <AiOutlineArrowDown className="text-8xl" />
            </Magnet>
          </motion.div>
        </Magnet>
        <LetterSpacingTitle>{t('about_projects')}</LetterSpacingTitle>
        <p className="mb-10 mt-[-10vh] max-w-xl font-pixel text-base text-secondary opacity-70 md:text-xl">
          Some projects I built and shipped.
        </p>
      </div>

      {projectCategories.map((category) => (
        <div key={category.key} className="mb-16">
          {/* Category Header */}
          <div className="CONTAINER mb-4">
            <h3 className="font-pixel text-xl text-secondary opacity-80 md:text-2xl">
              {category.title}
            </h3>
            <div className="mt-2 h-[2px] w-16 bg-yellow-400" />
          </div>

          {/* Category Projects */}
          <div className="MENU-CHANGE-Y-100-STAGGER relative">
            {category.projects.map((project, i) => {
              const uniqueKey = `${category.key}-${i}`
              return (
                <div
                  key={uniqueKey}
                  className="relative group"
                  onMouseEnter={() => setHoveredIndex(uniqueKey)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <ExperienceRow {...project} />

                  {/* Preview Tooltip */}
                  <AnimatePresence>
                    {hoveredIndex === uniqueKey && project.liveUrl && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, x: -15 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.92, x: -15 }}
                        transition={{ duration: 0.25, ease: easeDefault }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+20px)] z-30 w-[380px] h-[240px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/80"
                      >
                        {/* Mini Browser Chrome */}
                        <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50/95 border-b border-gray-200">
                          <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          </div>
                          <div className="flex-1 mx-2">
                            <div className="bg-white rounded-md px-2 py-0.5 text-[10px] text-gray-500 text-center truncate border border-gray-200">
                              {project.liveUrl.replace(/^https?:\/\//, '')}
                            </div>
                          </div>
                          <button
                            onClick={() => setHoveredIndex(null)}
                            className="text-gray-400 hover:text-gray-600 transition-colors text-xs"
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

                        {/* Hover Info Badge */}
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
              )
            })}
          </div>
        </div>
      ))}

      <div className="CONTAINER flex justify-center pt-14 md:justify-end">
        <Magnet strength={15}>
          <Link
            to={routes.about}
            className="group flex items-center gap-3 font-pixel text-lg text-secondary opacity-80 transition-opacity hover:opacity-100"
          >
            More on GitHub
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-solid border-secondary transition-colors group-hover:bg-yellow-400 group-hover:text-primary">
              <AiOutlineArrowRight className="-rotate-45" />
            </span>
          </Link>
        </Magnet>
      </div>
    </section>
  )
}
