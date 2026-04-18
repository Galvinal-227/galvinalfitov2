import { ReactLenis } from '@studio-freight/react-lenis'
import { StateContext } from 'context/state'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import React, { useContext } from 'react'

export interface PageProps {
  asPreview?: boolean
}

const withTransition = (Component: React.ComponentType<PageProps>) => {
  const NewComp = (props: PageProps) => {
    const { state } = useContext(StateContext)
    return (
      <ReactLenis root options={state?.lenisOptions}>
        <Component {...props} />
        <motion.div
          className="slide-out z-[90] flex items-center justify-center bg-white"
          initial={{ top: '0%' }}
          animate={{ top: '-150%' }}
          exit={{ top: '-100%' }}
          transition={{ duration: 1, ease: easeDefault }}
        >
          <h1 className="font-display text-3xl text-primary md:text-6xl">Galvin Alfito D</h1>
        </motion.div>
        <motion.div
          className="slide-in z-[89] flex  items-center justify-center bg-white"
          initial={{ top: '100%' }}
          animate={{ top: '150%' }}
          exit={{ top: '0%' }}
          transition={{ duration: 1, ease: easeDefault }}
        >
          <h1 className="font-display text-3xl text-primary md:text-6xl">Galvin Alfito D</h1>
        </motion.div>
      </ReactLenis>
    )
  }
  return NewComp
}

export default withTransition
