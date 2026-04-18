import StaggerElement, { StaggerElementProps } from 'components/effect/stagger-element'
import { stagger, useAnimate } from 'framer-motion'
import { easeDefault, mergeRefs } from 'lib/utils'
import { useEffect, useRef } from 'react'

interface MarqueeStaggerProps extends StaggerElementProps {
  startDelay?: number
  triger?: boolean
  staggerDuration?: number
  asPreview?: boolean
}

export default function MarqueeStagger({ startDelay = 0, triger, staggerDuration = 0.04, asPreview, ...props }: MarqueeStaggerProps) {
  const ref = useRef(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate(
      '.stagger-item',
      { y: triger && !asPreview ? '130%' : 0 },
      { duration: 0.85, delay: stagger(staggerDuration, { startDelay: triger ? 0 : startDelay }), ease: easeDefault as any }
    )
  }, [triger, asPreview])

  return <StaggerElement {...props} ref={mergeRefs(scope, ref)} motionProps={{ initial: { y: '130%' } }} />
}
