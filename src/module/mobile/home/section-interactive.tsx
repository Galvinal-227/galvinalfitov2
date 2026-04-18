import { StateContext } from 'context/state'
import { motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import { easeDefault } from 'lib/utils'
import HandPeace from 'module/home/sections/section-interactive/hand-peace'
import HandRock from 'module/home/sections/section-interactive/hand-rock'
import React from 'react'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function SectionInteractiveMobile() {
  const { state } = React.useContext(StateContext)

  const { ref: refHand, scrollYProgress: scrollYHand } = useSpeedScrollElement({ offset: ['start end', 'end start'] })
  const scrollSpeedHand = useTransform(scrollYHand, [0, 1], [0, -400])
  const scrollSpeedDesc = useTransform(scrollYHand, [0, 1], [0, -200])

  return (
    <section className="mt-[-100vh] min-h-screen bg-secondary">
      <div className="CONTAINER">
        <motion.div
          animate={{ width: state?.breakpoint === 'sm' ? '50px' : '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="MENU-CHANGE-Y-200 mt-[30vh] flex h-[50px] items-center justify-center bg-yellow-300 md:h-[100px] "
        >
          <AiOutlineArrowDown className="text-4xl md:text-7xl" />
        </motion.div>
        <div className="h-[50vh]">
          <h2 className="MENU-CHANGE-Y-100 sticky top-[5%] font-poppins text-4xl font-medium text-primary md:text-6xl ">
            Welcome To My Interactive Portfolio
          </h2>
        </div>
        <div ref={refHand} className="flex w-full justify-end ">
          <motion.div style={{ y: scrollSpeedHand }}>
            <HandRock className="scale-50 opacity-50 md:scale-75" />
          </motion.div>
        </div>
        <motion.p style={{ y: scrollSpeedDesc }} className="CONTAINER pointer-events-none mt-20 text-justify text-2xl text-gray-700 ">
          Greetings, I&apos;m <span className="font-semibold text-primary">Galvin Alfito D</span>, a seasoned{' '}
          <span className="font-semibold text-primary">Fullstack Developer</span> with over 4 years of experience. I specialize in crafting web
          experiences that aren&apos;t just static pages but dynamic journeys. Explore my world of interactive web development.
        </motion.p>
        {/* <motion.div
          animate={{ width: state?.breakpoint === 'sm' ? '50px' : '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="flex h-[50px] items-center justify-center bg-yellow-300 md:h-[100px]"
        >
          <AiOutlineArrowDown className="text-4xl md:text-7xl" />
        </motion.div>
        <div className="h-[50vh]">
          <h2 className="sticky top-[5%] mb-[10%] font-poppins text-4xl font-medium text-primary md:text-6xl">Selected Expertise</h2>
        </div>
        <div className="CONTAINER">
          <div className="h-[50vh] w-full bg-black"></div>
        </div> */}
        <motion.div
          animate={{ width: state?.breakpoint === 'sm' ? '50px' : '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="MENU-CHANGE-Y-200 flex h-[50px] items-center justify-center bg-yellow-300 md:h-[100px] "
        >
          <AiOutlineArrowDown className="text-4xl md:text-7xl" />
        </motion.div>
        <div className="h-[50vh]">
          <h2 className="MENU-CHANGE-Y-100 sticky top-[5%] mb-[10%] font-poppins text-4xl font-medium text-primary md:text-6xl ">
            Let&apos;s Collaborate
          </h2>
        </div>
        <HandPeace className=" scale-50 opacity-50" />
        <p className="CONTAINER MENU-CHANGE-Y-100 pointer-events-none mt-20 text-justify text-2xl text-gray-700 ">
          I&apos;m not just a <span className="font-semibold text-primary">developer</span>. I&apos;m a problem solver, a creative thinker, and a
          partner in your digital journey. Let&apos;s bring your <span className="font-semibold text-primary">ideas to life</span> and create
          experiences that resonate with your audience. Ready to embark on this journey together? Reach out, and let&apos;s make the web a more
          exciting place, one interactive project at a time.
        </p>
      </div>
    </section>
  )
}
