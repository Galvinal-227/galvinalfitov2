import Cursor from 'components/common/cursor'
import WithCursorElement from 'components/common/with-cursor-element'
import CursorProvider from 'context/cursor'
import { StateContext } from 'context/state'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import StaggerElementFooter from 'module/footer/stagger-element'
import React from 'react'

export type ExperienceRowProps = {
  text1?: string | React.ReactElement
  text2?: string | React.ReactElement
  text3?: string | React.ReactElement
  color?: string
  image?: any
  link?: any
  liveUrl?: string
}

const HoverEffect = ({ children, link }: { children: any } & ExperienceRowProps) => {
  const openLink = () => {
    if (link) {
      window.open(link, '_blank')
    }
  }

  return (
    <CursorProvider>
      <Cursor />
      <WithCursorElement
        state={{
          element: {
            element: (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.3, ease: easeDefault }}
                className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-primary cursor-pointer"
                onClick={openLink}
              >
                <p className="m-0 font-pixel font-medium text-white text-sm">View</p>
              </motion.div>
            ),
            key: 'previewExperience',
            type: 'hover'
          } as any
        }}
        fallbackState={{ element: { element: null, type: 'hover', key: new Date().getTime() } }}
      >
        {children}
      </WithCursorElement>
    </CursorProvider>
  )
}

const ExperienceRow = ({ text1, text2, text3, color, image, link, liveUrl }: ExperienceRowProps) => {
  const { state } = React.useContext(StateContext)
  const [hover, setHover] = React.useState(false)

  const onHoverActive = () => {
    if (state?.isSmallDevice) return
    setHover(true)
  }
  const onHoverInactive = () => {
    if (state?.isSmallDevice) return
    setHover(false)
  }

  const openLink = () => {
    if (link) {
      window.open(link, '_blank')
    }
  }

  const content = React.useMemo(
    () => (
      <motion.button
        onHoverStart={onHoverActive}
        onHoverEnd={onHoverInactive}
        onFocus={onHoverActive}
        onBlur={onHoverInactive}
        className={`CHILD-STAGGER ${
          link ? 'cursor-pointer' : 'cursor-not-allowed'
        } flex w-full items-center py-5 transition-opacity duration-200 hover:opacity-30 active:opacity-30 lg:p-20`}
        style={{ borderTop: '1px solid white', opacity: hover ? 0.3 : 1 }}
        onClick={openLink}
      >
        <div className="relative">
          <h2
            style={{ opacity: state?.isSmallDevice ? 1 : 0 }}
            className="font-pixel text-xl font-medium text-white md:text-4xl lg:text-7xl 2xl:text-8xl "
          >
            {text1}
          </h2>
          {!state?.isSmallDevice && text1 && typeof text1 === 'string' && (
            <>
              <StaggerElementFooter
                aria-hidden
                triger={hover}
                to="0"
                from="-130%"
                perLetter
                tag="h2"
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-pixel text-xl font-medium leading-[1.3] text-white md:text-4xl lg:text-7xl 2xl:text-8xl"
              >
                {text1}
              </StaggerElementFooter>
              <StaggerElementFooter
                aria-hidden
                to="130%"
                from="0"
                triger={hover}
                perLetter
                tag="h2"
                className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-pixel text-xl font-medium leading-[1.3] text-white md:text-4xl lg:text-7xl 2xl:text-8xl"
              >
                {text1}
              </StaggerElementFooter>
            </>
          )}
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="m-0 font-pixel text-sm text-white md:text-xl lg:text-2xl">{text2}</div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="m-0 font-pixel text-sm text-white md:text-xl lg:text-2xl">{text3}</div>
        </div>
      </motion.button>
    ),
    [hover, state?.isSmallDevice, text1, text2, text3, link]
  )

  if (state?.isSmallDevice) return content

  return (
    <HoverEffect link={link || liveUrl}>
      {content}
    </HoverEffect>
  )
}

export default React.memo(ExperienceRow)
