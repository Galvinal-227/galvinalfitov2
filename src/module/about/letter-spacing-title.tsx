import { StateContext } from 'context/state'
import { useAnimate, motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import { easeDefault, mergeRefs } from 'lib/utils'
import React from 'react'

const LetterSpacingTitle = ({ children }: { children: any }) => {
  const { state } = React.useContext(StateContext)

  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start start', 'end start'] })
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const [scope, animate] = useAnimate()
  letterSpacing.on('change', (val) => {
    if (val === 1) {
      animate('h2', { letterSpacing: state?.isSmallDevice ? '2px' : '20px' }, { ease: easeDefault as any, duration: 0.3 })
      return
    }
    animate('h2', { letterSpacing: '0px' }, { ease: easeDefault as any, duration: 0.3 })
  })

  return (
    <div ref={mergeRefs(ref, scope)} className="MENU-CHANGE-Y-100 h-[20vh] md:h-[30vh] lg:h-[50vh]">
      <motion.h2
        className={`sticky ${
          state?.isSmallDevice ? 'top-[5%]' : 'top-[10%]'
        } mb-[10%] font-display text-4xl font-medium text-secondary md:text-6xl lg:text-8xl`}
      >
        {children}
      </motion.h2>
    </div>
  )
}

export default LetterSpacingTitle
