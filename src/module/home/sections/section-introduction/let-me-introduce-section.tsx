import { StateContext } from 'context/state'
import { motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import StaggerSlideElementHome from 'module/home/stagger-slide-element'
import React from 'react'
import { useTranslation } from 'lib/translations'

const LetMeIntroduceSection = ({ asPreview }: { asPreview: any }) => {
  const { state } = React.useContext(StateContext)
  const { t, lang } = useTranslation()

  const { ref: firstRef, scrollYProgress: fScrollY } = useSpeedScrollElement({ offset: ['start start', 'end end'] })
  const letMeIntroX = useTransform(fScrollY, [0, 1], ['0', '-100%'])
  const meSelfX = useTransform(fScrollY, [0, 1], ['0', '100%'])
  const asDevX = useTransform(fScrollY, [0, 1], ['0', '-70%'])
  const opacity1 = useTransform(fScrollY, [0, 1], [1, 0])
  const blurFirst = useTransform(fScrollY, [0.2, 0.3, 0.7], ['blur(0px)', 'blur(10px)', 'blur(2px)'])

  return (
    <div ref={firstRef} className="h-[200vh]">
      <motion.div style={{ opacity: opacity1, filter: blurFirst }} className="sticky top-0 flex h-screen flex-col justify-center ">
        <motion.div style={{ x: letMeIntroX }}>
          <StaggerSlideElementHome
            asPreview={asPreview}
            triger={state?.menuShow}
            className="text-center font-pixel text-6xl text-secondary md:text-8xl xl:text-8xl 2xl:text-[10rem]"
            perLetter={false}
            tag="h1"
          >
            {t('home_waste_your_time')}
          </StaggerSlideElementHome>
        </motion.div>
        <motion.div style={{ x: meSelfX }}>
          <StaggerSlideElementHome
            asPreview={asPreview}
            triger={state?.menuShow}
            tag="div"
            staggerDuration={0.3}
            className="text-center font-pixel text-6xl text-secondary md:text-8xl xl:text-8xl 2xl:text-[10rem]"
            perLetter={false}
          >
            {t('home_and_the_world')}
          </StaggerSlideElementHome>
        </motion.div>
        <motion.div style={{ x: asDevX }}>
          <StaggerSlideElementHome
            asPreview={asPreview}
            triger={state?.menuShow}
            tag="div"
            staggerDuration={0.1}
            className="text-center font-pixel text-6xl text-secondary md:text-8xl xl:text-8xl 2xl:text-[10rem]"
            perLetter={false}
          >
            <div className="hidden h-[150px] w-[150px] overflow-hidden md:block" />
            {t('home_will_waste_you')}
          </StaggerSlideElementHome>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LetMeIntroduceSection
