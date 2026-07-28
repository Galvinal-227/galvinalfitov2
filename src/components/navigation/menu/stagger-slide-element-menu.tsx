import StaggerElement, { StaggerElementProps } from 'components/effect/stagger-element'
import { stagger, useAnimate, useInView } from 'framer-motion'
import { easeDefault, mergeRefs } from 'lib/utils'
import { useEffect, useRef } from 'react'

interface StaggerSlideElementMenuProps extends StaggerElementProps {
  startDelay?: number
}

export default function StaggerSlideElementMenu({ startDelay = 0, ...props }: StaggerSlideElementMenuProps) {
  const ref = useRef(null)
  const [scope, animate] = useAnimate()
  const isInView = useInView(ref, { amount: 'all' })

  useEffect(() => {
    if (isInView) {
      animate('.stagger-item', { y: 0 }, { duration: 0.85, delay: stagger(0.04, { startDelay }), ease: easeDefault as any })
    }
  }, [isInView])

  return <StaggerElement {...props} ref={mergeRefs(scope, ref)} motionProps={{ initial: { y: '130%' } }} />
}
