import { animate, useInView, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { easeDefault } from 'lib/utils'

type Props = {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function CountUp({ target, prefix = '', suffix = '', duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(motionValue, target, {
      duration,
      ease: easeDefault as any,
      onUpdate: (value) => setDisplay(Math.round(value))
    })
    return () => controls.stop()
  }, [isInView, target, motionValue, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
