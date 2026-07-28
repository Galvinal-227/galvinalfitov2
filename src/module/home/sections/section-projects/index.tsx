import Magnet from 'components/effect/magnet'
import { motion } from 'framer-motion'
import { easeDefault, routes } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import ExperienceRow, { ExperienceRowProps } from 'module/about/experience-row'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { AiOutlineArrowDown, AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function SectionProjects() {
  const { t } = useTranslation()

  const projects: ExperienceRowProps[] = [
    {
      text1: 'E-Commerce Website',
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
      <div className="MENU-CHANGE-Y-100-STAGGER">
        {projects.map((project, i) => (
          <ExperienceRow {...project} key={i} />
        ))}
      </div>
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