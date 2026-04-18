import { HTMLMotionProps, motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'

export interface SpeedScrollElementProps extends HTMLMotionProps<'div'> {
  speed?: number
  options?: any
}

const SpeedScrollElement = ({ speed = 0, style, options, ...props }: SpeedScrollElementProps) => {
  const { ref, scrollYProgress } = useSpeedScrollElement({ ...options })
  const ySpeed = useTransform(scrollYProgress, (prev) => prev * speed)

  return <motion.div ref={ref} style={{ y: ySpeed, ...style }} {...props} />
}

export default SpeedScrollElement
