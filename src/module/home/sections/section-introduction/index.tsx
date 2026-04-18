import React from 'react'
import { useAnimate, motion, useTransform } from 'framer-motion'
import { useLenis } from '@studio-freight/react-lenis'
import MouseSvg from 'assets/animation/mouse.json'

import Lottie from 'react-lottie'
import LetMeIntroduceSection from './let-me-introduce-section'
import CreativeDeveloperSection from './creative-developer-section'
import SpecializingFrontendSection from './specializing-frontend-section'
import { StateContext } from 'context/state'
import SectionIntroductionMobile from 'module/mobile/home/section-introduction'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: MouseSvg,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

const Default = ({ asPreview }: { asPreview: any }) => {
  return (
    <>
      <LetMeIntroduceSection asPreview={asPreview} />
      <CreativeDeveloperSection />
      <SpecializingFrontendSection />
    </>
  )
}

const SectionIntroduction = ({ asPreview }: { asPreview: any }) => {
  const { state } = React.useContext(StateContext)

  const whenScrollRef = React.useRef(false)
  const [scope, animate] = useAnimate()

  useLenis(({ velocity }: any) => {
    if (velocity === 0) {
      whenScrollRef.current = false
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5 })
    } else {
      if (!whenScrollRef.current) {
        animate(scope.current, { opacity: 0, y: 50 }, { duration: 0.5 })
        whenScrollRef.current = true
      }
    }
  })

  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start center', 'end center'] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="section-introduction" className="w-full bg-primary">
      {state?.isSmallDevice ? <SectionIntroductionMobile /> : <Default asPreview={asPreview} />}
      <div className="relative w-full">
        <div ref={ref} className="absolute left-1/2 top-[-35vh] z-50 h-[70vh] -translate-x-1/2">
          <svg width="353" height="726" viewBox="0 0 353 726" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full">
            <motion.path
              style={{ pathLength }}
              d="M17.3707 3C99.8707 34 277.571 119.4 328.371 213C391.871 330 304.371 279 210.371 242.5C116.371 206 22.3707 176 10.3707 192.5C-1.62932 209 -7.62932 221 63.3707 268C134.371 315 291.871 396 333.371 480C374.871 564 316.871 541 297.871 532.5C278.871 524 142.871 451.5 81.3706 458.5C19.8706 465.5 68.8706 510 93.8706 523.5C118.871 537 166.371 554 176.371 572C184.371 586.4 181.704 669.667 179.371 709.5C174.037 718.167 163.071 731.5 161.871 715.5C160.371 695.5 185.371 687.5 191.871 698.5C197.071 707.3 195.037 717.167 193.371 721"
              stroke="white"
              strokeWidth="6"
              strokeOpacity={0.6}
            />
          </svg>
        </div>
      </div>
      <motion.div ref={scope} initial={{ opacity: 0 }} className="MENU-CHANGE-Y-100 sticky bottom-5 flex justify-center">
        <div className="flex items-center text-xl capitalize text-white">
          scroll
          <Lottie options={lottieOptions} height={50} width={50} isClickToPauseDisabled />
          down
        </div>
      </motion.div>
    </section>
  )
}

export default React.memo(SectionIntroduction)
