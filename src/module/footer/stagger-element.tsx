import StaggerElement, { StaggerElementProps } from 'components/effect/stagger-element'
import { stagger, useAnimate } from 'framer-motion'
import { easeDefault, mergeRefs } from 'lib/utils'
import { useEffect, useRef } from 'react'

export interface StaggerElementFooterProps extends StaggerElementProps {
  startDelay?: number
  triger?: boolean
  staggerDuration?: number
  to?: any
  from?: any
}

export default function StaggerElementFooter({ startDelay = 0, triger, staggerDuration = 0.04, to, from, ...props }: StaggerElementFooterProps) {
  const ref = useRef(null)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate('.stagger-item', { y: triger ? to : from }, { duration: 0.85, delay: stagger(staggerDuration, { startDelay }), ease: easeDefault as any })
  }, [triger])

  return <StaggerElement {...props} ref={mergeRefs(scope, ref)} />
}
