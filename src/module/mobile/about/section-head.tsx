import SpeedScrollElement from 'components/effect/speed-scroll-element'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import StaggerSlideElementAbout from 'module/about/stagger-slide-about'

export const StackedImage = () => {
  return (
    <motion.div
      initial={{ height: '0.1px', y: '200px', opacity: 0 }}
      animate={{ height: '100%', y: 0, opacity: 1 }}
      transition={{ ease: easeDefault, duration: 1, delay: 2, opacity: { duration: 0.01 } }}
      className="relative flex items-center justify-center overflow-hidden"
    >
      <motion.img src="/me.png" alt="galvin alfito d" className="w-[80%] object-cover" />
      <motion.img src="/me.png" alt="galvin alfito d" className="absolute w-[70%] object-cover" />
      <motion.img src="/me.png" alt="galvin alfito d" className="absolute w-[60%] object-cover" />
    </motion.div>
  )
}

export default function SectionHeadMobile() {
  return (
    <div className="MENU-CHANGE-Y-100-STAGGER w-screen overflow-x-hidden">
      <motion.h1 style={{ x: -100 }} className="CHILD-STAGGER mt-2 whitespace-nowrap font-display text-6xl font-semibold text-secondary">
        ABOUT ME - ABOUT ME - ABOUT ME
      </motion.h1>
      <motion.h1 style={{ x: -200 }} className="CHILD-STAGGER mt-2 whitespace-nowrap font-display text-6xl font-semibold text-secondary">
        ABOUT ME - ABOUT ME - ABOUT ME
      </motion.h1>
      <motion.h1 style={{ x: -300 }} className="CHILD-STAGGER mt-2 whitespace-nowrap font-display text-6xl font-semibold text-secondary">
        ABOUT ME - ABOUT ME - ABOUT ME
      </motion.h1>
      <div className="h-[10vh]"></div>
      <div className="CONTAINER">
        <div className="flex min-h-[100vh] flex-col items-center justify-center">
          <StackedImage />
          <SpeedScrollElement speed={-500} className="pointer-events-none z-[90]">
            <StaggerSlideElementAbout className=" MENU-CHANGE-Y-200 pointer-events-none font-display text-5xl font-semibold leading-[1] text-white md:text-8xl">
              Galvin Alfito D
            </StaggerSlideElementAbout>
          </SpeedScrollElement>
        </div>
      </div>
    </div>
  )
}
