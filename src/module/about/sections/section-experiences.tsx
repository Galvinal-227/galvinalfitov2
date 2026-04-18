import GalcalbuImg from 'assets/projects/Galcalbu.png'
import TaskImg from 'assets/projects/TaskManager.png'
import WeatherImg from 'assets/projects/Weather-Dashboard.png'
import OldPorto from 'assets/projects/Oldportofolio.png'
import alImg from 'assets/projects/al-q.png'
import Magnet from 'components/effect/magnet'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import ExperienceRow, { ExperienceRowProps } from 'module/about/experience-row'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function SectionExperiences() {
  const experiences: ExperienceRowProps[] = [
    {text1: 'Al-Quran Indonesia', text2: '2026', text3: 'Fullstack Developer', color: 'rgba(158,107,184,0.996078)', image: alImg, link: 'https://al-q-app.vercel.app/'},
    { text1: 'Galcalbu', text2: '2025', text3: 'Backend Logic', color: '#0091F8', image: GalcalbuImg, link:'https://drive.google.com/drive/folders/146BLVi5szX4DuyTiGl_qABXrhjOkgB8Q?usp=sharing'},
    { text1: 'Task Manager', text2: '2025', text3: 'Backend Logic', color: '#F1592A', image: TaskImg, link:'https://drive.google.com/drive/folders/1Pq4pWeQ5ZXhayNPfTauEHTLzAiSPhPWv?usp=sharing'},
    { text1: 'Weather App', text2: '2025', text3: 'Frontend Developer', color: '#F1922C', image: WeatherImg, link:'https://galvinal-227.github.io/WeatherDashboard/'},
    { text1: 'Old Portfolio', text2: '2025', text3: 'Frontend Developer', color: '#F1926C', image: OldPorto, link:'https://galvinal-227.github.io/GAD-Port/'}
  ]

  return (
    <section id="section-experiences-about" className="CONTAINER">
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
      <LetterSpacingTitle>My Projects</LetterSpacingTitle>
      <div className="MENU-CHANGE-Y-100-STAGGER">
        {experiences.map((exp, i) => (
          <ExperienceRow {...exp} key={i} />
        ))}
      </div>
    </section>
  )
}
