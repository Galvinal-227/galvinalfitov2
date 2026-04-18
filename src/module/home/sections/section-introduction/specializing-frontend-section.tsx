import { useLenis } from '@studio-freight/react-lenis'
import Meme from 'assets/images/Meme.jpg'
import WithCursorElement from 'components/common/with-cursor-element'
import Bubble from 'components/cursor-hover/bubble'
import { motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import { SLIGHT_MOVE } from 'lib/utils'
import Meanderer from 'lib/meanderer'
import React from 'react'
import { BsArrowDown } from 'react-icons/bs'
import SkullPath from './skull-path'

const bubleArrowBottomCursor = {
  element: (
    <Bubble>
      <motion.div whileInView={{ y: 0, x: 0 }} initial={{ y: '-200%', x: 0, position: 'absolute' }} transition={{ duration: 0.4, delay: 0.5 }}>
        <BsArrowDown className={`text-8xl text-white ${SLIGHT_MOVE}`} data-slight-move="4" />
      </motion.div>
      <motion.div whileInView={{ y: '200%', x: 0, scale: 0.5 }} initial={{ y: 0, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <BsArrowDown className={`text-8xl text-white ${SLIGHT_MOVE}`} data-slight-move="4" />
      </motion.div>
    </Bubble>
  ),
  key: Bubble.key,
  type: Bubble.type
}

const yesGoodHover = {
  element: (
    <motion.img
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-[300px] opacity-40"
      transition={{ duration: 0.3 }}
      src={Meme}
      alt="yessgood"
    />
  ),
  key: 'yessgood',
  type: 'hover'
}

function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

const skullPathMotion =
  'M1 386C426.709 99.7116 885.636 -2.89186 963.316 1.11229C1041 5.11645 1104.02 3.78499 1149.34 64.6764C1210.05 146.236 1073.7 277.891 1087.5 315.929C1098.54 346.36 1113.91 357.972 1120.21 359.974'
const widthSvg = 1116
const heightSvg = 387

const responsiveSkullMotion = new Meanderer({
  path: skullPathMotion,
  width: widthSvg,
  height: heightSvg
})
const SpecializingFrontendSection = () => {
  const [pathMotion, setPathMotion] = React.useState('')
  const lenis = useLenis()

  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start start', 'end start'] })
  const tOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const tScale = useTransform(scrollYProgress, [0, 0.5], [0.2, 1])
  const pathFrontend = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
  const skullPath = useTransform(scrollYProgress, [0, 0.5, 0.65, 0.7], [0, 1, 1, 0])
  const blurThird = useTransform(scrollYProgress, [0, 0.3, 0.4], ['blur(0px)', 'blur(10px)', 'blur(0px)'])
  const skullMotion = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])
  const skullScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 1.2])
  const skullColor = useTransform(scrollYProgress, [0, 0.5, 0.55, 0.6, 0.65], ['#1B1B1B', '#1B1B1B', '#fff', '#fff', '#00000000'])

  const clickToHello = (time: number) => {
    return () => {
      lenis.scrollTo('#section-fa', {
        duration: time,
        easing: easeInOutQuart
      })
    }
  }

  React.useEffect(() => {
    const SizeObserver = new ResizeObserver(() => {
      const widthWithPadding = window.innerWidth - (10 * window.innerWidth) / 100
      const heightWithPadding = window.innerHeight - (10 * window.innerHeight) / 100
      const scaledSkullPathMotion = responsiveSkullMotion.generatePath(widthWithPadding, heightWithPadding)
      setPathMotion(scaledSkullPathMotion)
    })
    SizeObserver.observe(document.body)

    return () => {
      SizeObserver.unobserve(document.body)
    }
  }, [])

  return (
    <WithCursorElement state={{ element: bubleArrowBottomCursor as any }} className="">
      <div onClick={clickToHello(2)} ref={ref} className="z-10 mt-[-100vh] h-[300vh] cursor-pointer">
        <div className="pointer-events-none sticky left-0 top-0">
          <div className="absolute left-0 top-0">
            <div className="MENU-CHANGE-SCALE-125 relative flex h-screen w-screen items-center justify-center">
              <motion.div
                animate={{ y: [-10, 10] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse', delay: 0.3 }}
                className="absolute left-0 top-0 h-[50vh]"
                style={{ offsetDistance: skullMotion, offsetPath: `path("${pathMotion}")`, offsetRotate: '0deg', scale: skullScale }}
              >
                <SkullPath pathStyle={{ pathLength: skullPath, fill: skullColor }} />
              </motion.div>
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path d={pathMotion} />
              </svg>
            </div>
          </div>
        </div>
        <div className="MENU-CHANGE-Y-200 sticky top-0 flex h-screen w-full items-center justify-center">
          <motion.h1
            style={{ opacity: tOpacity, scale: tScale, filter: blurThird }}
            className="text-center font-spartan text-6xl font-semibold text-secondary xl:text-8xl 2xl:text-9xl"
          >
            Specializing In Web{' '}
            <WithCursorElement
              className="z-[99] cursor-default"
              state={{ element: yesGoodHover as any }}
              fallbackState={{ element: bubleArrowBottomCursor as any }}
            >
              <div className="relative ml-2 mr-10 inline-block">
                <span className="pointer-events-none opacity-0">Fullstack</span>
                <motion.span
                  aria-hidden
                  transition={{ duration: 0.4 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  Fullstack
                </motion.span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="629"
                  height="193"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
                >
                  <motion.path
                    transform="rotate(4.78823 339.624 90.5166)"
                    d="m128.5,7.5c33.5,2 287,-15.5 367.5,16c80.5,31.5 82.5,56 76.5,75.5c-6,19.5 -45,57 -130,73.5c-85,16.5 -251.5,5 -320.5,-3c-69,-8 -94.5,-30 -106.5,-43c-12,-13 -22,-36.5 5.5,-64c27.5,-27.5 70,-34 113.5,-38.5c43.5,-4.5 133,-11.5 208.5,-8.5c75.5,3 126,7.5 158,19c32,11.5 107.5,48.5 70,87.5c-37.5,39 -48.5,40.5 -104,55c-55.5,14.5 -353,21.5 -408,-13c-55,-34.5 -53.5,-78.5 -43,-89.5c10.5,-11 59.5,-55.5 209,-54.5c149.5,1 239.5,10.5 297,32c57.5,21.5 91.5,42.5 102,47.5"
                    opacity="undefined"
                    strokeWidth="6"
                    stroke="#fff"
                    fill="none"
                    strokeLinecap="round"
                    style={{ pathLength: pathFrontend }}
                  />
                </svg>
              </div>
            </WithCursorElement>
            Development
          </motion.h1>
        </div>
      </div>
    </WithCursorElement>
  )
}

export default SpecializingFrontendSection
