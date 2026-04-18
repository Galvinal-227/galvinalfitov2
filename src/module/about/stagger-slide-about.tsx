import StaggerElement, { StaggerElementProps } from 'components/effect/stagger-element'
import { stagger, useAnimate, useInView } from 'framer-motion'
import { easeDefault, mergeRefs } from 'lib/utils'
import { useEffect, useRef } from 'react'

interface StaggerSlideElementAboutProps extends StaggerElementProps {
  startDelay?: number
  triger?: boolean
  staggerDuration?: number
  asPreview?: boolean
  once?: boolean
}

export default function StaggerSlideElementAbout({
  startDelay = 0,
  triger,
  staggerDuration = 0.04,
  asPreview,
  once = true,
  ...props
}: StaggerSlideElementAboutProps) {
  const ref = useRef(null)
  const [scope, animate] = useAnimate()
  const isInView = useInView(ref, { amount: 'all', once })

  useEffect(() => {
    if (isInView || asPreview) {
      animate(
        '.stagger-item',
        { y: triger && !asPreview ? '130%' : 0 },
        { duration: 0.85, delay: stagger(staggerDuration, { startDelay }), ease: easeDefault as any }
      )
    }
  }, [isInView, triger, asPreview])

  return <StaggerElement {...props} ref={mergeRefs(scope, ref)} motionProps={{ initial: { y: '130%' } }} />
}
