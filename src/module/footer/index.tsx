/* eslint-disable react/no-unescaped-entities */
import Cursor from 'components/common/cursor'
import WithCursorElement from 'components/common/with-cursor-element'
import Magnet from 'components/effect/magnet'
import StaggerSlideElementMenu from 'components/navigation/menu/stagger-slide-element-menu'
import CursorProvider from 'context/cursor'
import { StateContext } from 'context/state'
import { motion, useAnimate, useInView, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import { easeDefault } from 'lib/utils'
import React, { useEffect } from 'react'
import { GrGithub, GrLinkedin } from 'react-icons/gr'
import { HiOutlineArrowRight } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import NextLinkAnimate from './next-link-animate'

const linkCursor = {
  element: (
    <motion.div
      animate={{ scale: 2, rotate: '-45deg' }}
      exit={{ scale: 0, rotate: '0deg' }}
      initial={{ scale: 0 }}
      transition={{ duration: 0.6, ease: easeDefault }}
    >
      <HiOutlineArrowRight className="text-5xl invert" />
    </motion.div>
  ),
  key: 'link',
  type: 'hover'
}

type FooterProps = { title: string; linkTo: string; linkTitle: string; colorMode?: 'light' | 'dark' }

const dark = '#1B1B1B'
const light = '#EAE5DF'

export default function Footer({ title, linkTitle, linkTo, colorMode }: FooterProps) {
  const { state } = React.useContext(StateContext)
  const [isHover, setIsHover] = React.useState(false)
  const hoverRef = React.useRef<HTMLDivElement>(null)
  const elementHoverRef = React.useRef<HTMLDivElement>(null)
  const isMove = React.useRef(false)
  const bubbleRef = React.useRef<HTMLDivElement>(null)

  const isInView = useInView(bubbleRef, { amount: 'all' })

  const [bubbleScope, bubbleAnimate] = useAnimate()

  const [triggerBubble, setTriggerBubble] = React.useState(false)
  useEffect(() => {
    if (state?.isSmallDevice && isInView) {
      setTriggerBubble(true)
      return
    }
    if (!state?.isSmallDevice && isHover) {
      setTriggerBubble(true)
      return
    }
    setTriggerBubble(false)
  }, [isInView, isHover, state?.isSmallDevice])

  useEffect(() => {
    if (!hoverRef.current || !elementHoverRef.current) return

    hoverRef.current.addEventListener('mouseleave', () => {
      isMove.current = false
      elementHoverRef.current!.style.top = '0px'
      elementHoverRef.current!.style.left = '0px'
      bubbleScope.current!.style.top = '0px'
      bubbleScope.current!.style.left = '0px'
    })
    hoverRef.current.addEventListener('mousemove', (ev: any) => {
      const rect = ev.target.getBoundingClientRect()
      const x = ev.clientX - rect.left
      const y = ev.clientY - rect.top

      if (!isMove.current) {
        elementHoverRef.current!.style.top = y + 'px'
        elementHoverRef.current!.style.left = x + 'px'
        bubbleAnimate(bubbleScope.current, { top: '50%', left: '50%' }, { duration: 0.3, delay: 0.1 })
        isMove.current = true
      }
    })
  }, [])

  const lights = [light, light, dark]
  const darks = [dark, dark, light]

  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start end', 'end end'] })
  const bgColor = useTransform(scrollYProgress, [0, 0.9, 1], colorMode === 'light' ? lights : darks)
  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0.9])
  const borderRadius = useTransform(scrollYProgress, [0, 0.9, 1], [0, 0, 20])

  return (
    <CursorProvider>
      <Cursor />
      <motion.footer
        ref={ref}
        style={{ backgroundColor: bgColor }}
        className={`${!state?.isSmallDevice ? 'MENU-CHANGE-SCALE-125' : ''} h-[110vh] w-screen overflow-hidden pt-[10vh]`}
      >
        <motion.div style={{ scale, borderRadius, backgroundColor: colorMode === 'light' ? light : dark }} layout>
          <div
            className={`CONTAINER ${!state?.isSmallDevice ? 'MENU-CHANGE-SCALE-125' : ''} flex min-h-screen flex-col justify-between py-5 md:py-10`}
          >
            <div className=""></div>
            <div className="flex w-full flex-col items-center justify-center gap-10 md:flex-row">
              <p
                style={{ color: colorMode !== 'light' ? light : dark }}
                className={`MENU-CHANGE-Y-100 font-poppins text-5xl font-semibold capitalize md:text-6xl lg:text-8xl`}
              >
                {title}
              </p>
              <Magnet className="MENU-CHANGE-SCALE-80 MENU-CHANGE-OPACITY-0">
                <Link to={linkTo} aria-label={linkTitle} tabIndex={0}>
                  <WithCursorElement
                    state={{ element: linkCursor as any }}
                    fallbackState={{ element: { element: null, type: 'hover', key: new Date().getTime() } }}
                    aria-hidden
                  >
                    <div ref={bubbleRef} className="relative cursor-none rounded-full">
                      <motion.div
                        ref={hoverRef}
                        onMouseOver={() => setIsHover(true)}
                        onMouseOut={() => setIsHover(false)}
                        style={{ borderColor: colorMode !== 'light' ? light : dark }}
                        className={`${
                          colorMode !== 'light' ? 'hover:bg-secondary' : 'hover:bg-primary'
                        } group relative flex h-[80vw] w-[80vw] items-center justify-center overflow-hidden rounded-full border border-solid duration-500 hover:scale-95 md:h-[50vw] md:w-[50vw] lg:h-[60vh] lg:w-[60vh]`}
                      >
                        <motion.div animate={{ opacity: triggerBubble ? 0.2 : 0 }} className="relative scale-[3]">
                          <NextLinkAnimate
                            className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-display text-4xl font-semibold ${
                              colorMode === 'light' ? 'text-primary group-hover:text-white' : 'text-secondary group-hover:text-primary'
                            } transition-colors duration-500 md:text-6xl`}
                            text={linkTitle}
                            isHover={triggerBubble}
                          />
                        </motion.div>
                        <NextLinkAnimate
                          className={`absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-display text-4xl font-semibold ${
                            colorMode === 'light' ? 'text-primary group-hover:text-white' : 'text-secondary group-hover:text-primary'
                          } transition-colors duration-500 md:text-6xl`}
                          text={linkTitle}
                          isHover={triggerBubble}
                        />
                      </motion.div>
                    </div>
                  </WithCursorElement>
                </Link>
              </Magnet>
            </div>
            <div className="flex flex-col items-start justify-between md:flex-row md:items-end">
              <div className="mb-10 flex flex-col gap-2 md:hidden">
                <Link to="https://www.linkedin.com/in/galvin-alfito-506494390/" target="_blank" className="flex items-end gap-2">
                  <GrLinkedin className="mt-1 text-xl" style={{ color: colorMode !== 'light' ? light : dark }} />
                  <span style={{ color: colorMode !== 'light' ? light : dark }} className="font-poppins font-light underline">
                    Linkedin
                  </span>
                </Link>
                <Link to="https://github.com/galvinal-227" target="_blank" className="flex items-end gap-2">
                  <GrGithub className="text-xl " style={{ color: colorMode !== 'light' ? light : dark }} />
                  <span style={{ color: colorMode !== 'light' ? light : dark }} className="font-poppins font-light underline">
                    Github
                  </span>
                </Link>
                <Link to="mailto:galvinalfito@gmail.com" className="flex items-end gap-2">
                  <MdEmail className="text-xl " style={{ color: colorMode !== 'light' ? light : dark }} />
                  <span style={{ color: colorMode !== 'light' ? light : dark }} className="font-poppins font-light underline">
                    galvinalfito@gmail.com
                  </span>
                </Link>
              </div>
              <StaggerSlideElementMenu
                startDelay={1.2}
                style={{ backgroundColor: colorMode !== 'light' ? light : dark }}
                className="hidden w-fit origin-bottom items-baseline gap-x-10 px-3 pb-2 pt-3 md:flex"
                tag="div"
              >
                <Link to="https://www.linkedin.com/in/galvin-alfito-506494390/" target="_blank" className="flex items-baseline">
                  <GrLinkedin className="mt-1 text-xl" style={{ color: colorMode === 'light' ? light : dark }} />
                </Link>
                <Link to="https://github.com/galvinal-227" target="_blank" className="flex items-baseline">
                  <GrGithub className="text-xl " style={{ color: colorMode === 'light' ? light : dark }} />
                </Link>
                <Link to="mailto:galvinalfito@gmail.com" className="flex items-baseline">
                  <MdEmail className="text-xl " style={{ color: colorMode === 'light' ? light : dark }} />
                </Link>
              </StaggerSlideElementMenu>
              <span className="font-poppins " style={{ color: colorMode !== 'light' ? light : dark }}>
                ©️{new Date().getFullYear()}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.footer>
    </CursorProvider>
  )
}
