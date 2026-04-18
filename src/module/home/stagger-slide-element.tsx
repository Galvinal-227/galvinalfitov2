import StaggerElement, { StaggerElementProps } from 'components/effect/stagger-element'
import { stagger, useAnimate, useInView } from 'framer-motion'
import { easeDefault, mergeRefs } from 'lib/utils'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

interface StaggerSlideElementHomeProps extends StaggerElementProps {
  startDelay?: number
  triger?: boolean
  staggerDuration?: number
  asPreview?: boolean
  once?: boolean
}

export default function StaggerSlideElementHome({
  startDelay = 0,
  triger,
  staggerDuration = 0.04,
  asPreview,
  once = true,
  ...props
}: StaggerSlideElementHomeProps) {
  const ref = useRef(null)
  const [scope, animate] = useAnimate()
  const isInView = useInView(ref, { amount: 'all', once })
  const { i18n } = useTranslation()
  
  // Simpan children ke state agar update saat bahasa berubah
  const children = props.children

  useEffect(() => {
    if (isInView || asPreview) {
      animate(
        '.stagger-item',
        { y: triger && !asPreview ? '130%' : 0 },
        { duration: 0.85, delay: stagger(staggerDuration, { startDelay }), ease: easeDefault as any }
      )
    }
  }, [isInView, triger, asPreview, animate, staggerDuration, startDelay])

  // Re-animate saat bahasa berubah
  useEffect(() => {
    if (!asPreview && (isInView || triger)) {
      animate(
        '.stagger-item',
        { y: triger ? '130%' : 0 },
        { duration: 0.85, delay: stagger(staggerDuration, { startDelay }), ease: easeDefault as any }
      )
    }
  }, [i18n.language]) // <- trigger re-animate saat bahasa ganti

  return <StaggerElement {...props} ref={mergeRefs(scope, ref)} motionProps={{ initial: { y: '130%' } }} />
}