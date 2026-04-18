import { useLenis } from '@studio-freight/react-lenis'
import Jd from 'assets/images/Jd.jpg'
import WithCursorElement from 'components/common/with-cursor-element'
import Bubble from 'components/cursor-hover/bubble'
import { StateContext } from 'context/state'
import { motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import { SLIGHT_MOVE } from 'lib/utils'
import Meanderer from 'lib/meanderer'
import React from 'react'
import { BsArrowDown } from 'react-icons/bs'
import HeartPath from './heart-path'

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

const indonesiaHover = {
  element: (
    <motion.img
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-[300px] opacity-40"
      transition={{ duration: 0.3 }}
      src={Jd}
      alt="indonesia"
    />
  ),
  key: 'indonesiacoy',
  type: 'hover'
}

function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

const heartPathMotion =
  'M1 1C268 87.5 829.5 129.97 895.5 145C946 156.5 987.5 177 1007.5 221C1027.5 265 997 306.5 982.5 321.5C967.736 336.773 908 403 626.5 397.5C345 392 292.5 380 252.5 386C220.5 390.8 211.833 395.667 211.5 397.5'
const widthSvg = 1015
const heightSvg = 399

const responsiveHeartPathMotion = new Meanderer({
  path: heartPathMotion,
  width: widthSvg,
  height: heightSvg
})

const CreativeDeveloperSection = () => {
  const [pathMotion, setPathMotion] = React.useState('')
  const { state } = React.useContext(StateContext)
  const lenis = useLenis()

  const clickToHello = (time: number) => {
    return () => {
      lenis.scrollTo('#section-fa', {
        duration: time,
        easing: easeInOutQuart
      })
    }
  }

  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start start', 'end start'] })
  const opacityText = useTransform(scrollYProgress, [0, 0.5, 0.7], [0, 1, 0])
  const scaleText = useTransform(scrollYProgress, [0, 0.4], [0.2, 1])
  const indonesiaPath = useTransform(scrollYProgress, [0.4, 0.55], [0, 1])
  const blurText = useTransform(scrollYProgress, [0, 0.3, 0.4], ['blur(0px)', 'blur(10px)', 'blur(0px)'])
  const heartPathColor = useTransform(scrollYProgress, [0, 0.5, 0.55, 0.6, 0.65], ['#1B1B1B', '#1B1B1B', '#fff', '#fff', '#00000000'])
  const heartLittleMotion = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%'])
  const heartPath = useTransform(scrollYProgress, [0, 0.5, 0.65, 0.7], [0, 1, 1, 0])
  const heartScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 1.2])

  React.useEffect(() => {
    const SizeObserver = new ResizeObserver(() => {
      const scaledHeartPathMotion = responsiveHeartPathMotion.generatePath(window.innerWidth, window.innerHeight)
      setPathMotion(scaledHeartPathMotion)
    })
    SizeObserver.observe(document.body)

    return () => {
      SizeObserver.unobserve(document.body)
    }
  }, [])

  return (
    <WithCursorElement state={{ element: bubleArrowBottomCursor as any }} className="">
      <div onClick={clickToHello(5)} ref={ref} className="relative z-20 mt-[-100vh] h-[300vh] cursor-pointer">
        <div className="pointer-events-none sticky left-0 top-0">
          <div className="absolute left-0 top-0">
            <div className="MENU-CHANGE-SCALE-125 relative h-screen w-screen">
              <motion.div
                animate={{ y: [-10, 10] }}
                transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse', delay: 0.3 }}
                className=" absolute left-0 top-0 h-[50vh]"
                style={{ offsetDistance: heartLittleMotion, offsetPath: `path("${pathMotion}")`, offsetRotate: '0deg', scale: heartScale }}
              >
                <HeartPath pathStyle={{ pathLength: heartPath, fill: heartPathColor }} />
              </motion.div>
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                <path d={pathMotion} />
              </svg>
            </div>
          </div>
        </div>
        <div className="MENU-CHANGE-Y-200 sticky top-0 flex h-screen w-full items-center justify-center">
          <motion.h1
            style={{ opacity: opacityText, scale: scaleText, filter: blurText }}
            className=" font-spartan text-7xl font-semibold text-secondary first-line:text-center md:text-7xl xl:text-8xl 2xl:text-9xl"
          >
            Creative Developer Based In
            {state?.isSmallDevice ? (
              ' Indonesia'
            ) : (
              <WithCursorElement
                className="z-[99] cursor-default sm:ml-[50%] sm:block sm:translate-x-[-50%]"
                state={{ element: indonesiaHover as any }}
                fallbackState={{ element: bubleArrowBottomCursor as any }}
              >
                <div className="relative inline-block w-fit ">
                  <motion.span transition={{ duration: 0.4 }} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    Indonesia
                  </motion.span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="688" height="170" className="relative">
                    <motion.path
                      transform="rotate(4.78823 339.624 90.5166)"
                      d="m3.56598,93.78743c65.00006,-53.12112 411.90923,-132.96959 543.18177,-63.72724c131.27254,69.24236 20.27276,90.18182 -25.45442,102.03029c-45.72718,11.84847 -364.394,56.51523 -432.03046,44.57576c-67.63647,-11.93947 -80.84825,-63.90917 -28.30289,-89.09094c52.54536,-25.18177 291.78777,-72.51512 341.78777,-79.51512c50,-7 120,-7 153,-3c33,4 106.14666,32.8576 119.93449,70.25148"
                      opacity="undefined"
                      strokeWidth="6"
                      stroke="#fff"
                      fill="none"
                      strokeLinecap="round"
                      style={{ pathLength: indonesiaPath }}
                    />
                  </svg>
                </div>
              </WithCursorElement>
            )}
          </motion.h1>
        </div>
      </div>
    </WithCursorElement>
  )
}

export default CreativeDeveloperSection
