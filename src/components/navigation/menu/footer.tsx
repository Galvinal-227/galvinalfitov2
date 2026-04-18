// import WithCursorElement from 'components/common/with-cursor-element'
import Magnet from 'components/effect/magnet'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { GrGithub, GrLinkedin } from 'react-icons/gr'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { BLUR_HOVER_LINK } from '.'
import StaggerSlideElementMenu from './stagger-slide-element-menu'

export default function MenuFooter() {
  return (
    <div className={`relative w-full ${BLUR_HOVER_LINK}`}>
      <motion.div
        whileInView={{ width: '100%' }}
        initial={{ width: 0 }}
        transition={{ delay: 0.6, ease: easeDefault, duration: 1 }}
        viewport={{ amount: 'all' }}
        className="h-[3px] bg-primary md:h-[6px]"
      />
      <StaggerSlideElementMenu
        startDelay={1}
        className="mb-10 font-display text-3xl font-semibold leading-[1.2] md:mb-0 md:text-5xl lg:text-7xl"
        tag="h2"
      >
        Galvin Alfito D
      </StaggerSlideElementMenu>
      <div className="mb-10 flex flex-col gap-2 md:hidden">
        <Link to="https://www.linkedin.com/in/galvin-alfito-506494390/" target="_blank" className="flex items-end gap-2">
          <GrLinkedin className="mt-1 text-xl text-primary" />
          <span className="font-poppins font-light underline">Linkedin</span>
        </Link>
        <Link to="https://github.com/galvinal-227" target="_blank" className="flex items-end gap-2">
          <GrGithub className="text-xl !text-primary" />
          <span className="font-poppins font-light underline">Github</span>
        </Link>
        <Link to="mailto:galvinalfito@gmail.com" className="flex items-end gap-2">
          <MdEmail className="text-xl !text-primary" />
          <span className="font-poppins font-light underline">galvinalfito@gmail.com</span>
        </Link>
      </div>
      <StaggerSlideElementMenu
        startDelay={1.2}
        className="hidden w-fit origin-bottom items-baseline gap-x-10 bg-primary px-3 pb-2 pt-3 md:flex"
        tag="div"
      >
        <Link to="https://www.linkedin.com/in/galvin-alfito-506494390/" target="_blank" className="flex items-baseline">
          <GrLinkedin className="mt-1 text-xl text-white" />
        </Link>
        <Link to="https://github.com/galvinal-227" target="_blank" className="flex items-baseline">
          <GrGithub className="text-xl !text-white" />
        </Link>
        <Link to="mailto:galvinalfito@gmail.com" className="flex items-baseline">
          <MdEmail className="text-xl !text-white" />
        </Link>
      </StaggerSlideElementMenu>
      <Magnet className="absolute bottom-0 right-0 hidden md:block" strength={10}>
        <motion.div
          whileInView={{ width: '100px' }}
          viewport={{ amount: 'all' }}
          initial={{ width: 0 }}
          transition={{ duration: 1, ease: easeDefault }}
          className="flex h-[100px] items-center justify-center bg-secondary"
        >
          <Magnet>
            <AiOutlineArrowRight className="text-9xl text-primary" />
          </Magnet>
        </motion.div>
      </Magnet>
    </div>
  )
}
