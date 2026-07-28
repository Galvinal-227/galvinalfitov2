import Magnet from 'components/effect/magnet'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import ExperienceRow, { ExperienceRowProps } from 'module/about/experience-row'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function SectionProjects() {
  const { t } = useTranslation()

  const projects: ExperienceRowProps[] = [
    {
      text1: 'E-Commerce Websit',
      text2: '2026',
      text3: 'Fullstack - React, Node.js, MongoDB',
      color: '#0091F8',
      link: 'https://github.com/galvinal-227'
    },
    {
      text1: 'Game Dashboard',
      text2: '2025',
      text3: 'Frontend - React, Express, Chart.js',
      color: '#F1592A',
      link: 'https://github.com/galvinal-227'
    },
    {
      text1: 'Portfolio Website',
      text2: '2025',
      text3: 'Fullstack - React, Tailwind, MongoDB',
      color: '#2E9E6C',
      link: 'https://github.com/galvinal-227'
    },
    {
      text1: 'Task Management App',
      text2: '2025',
      text3: 'Frontend - React, Firebase, Tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227'
    }
  ]

  return (
    <section id="section-projects" className="CONTAINER">
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

      <div className="MENU-CHANGE-Y-100-STAGGER">
        {projects.map((project, i) => (
          <ExperienceRow {...project} key={i} />
        ))}
      </div>
    </section>
  )
}