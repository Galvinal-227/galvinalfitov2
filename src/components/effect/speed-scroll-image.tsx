import { HTMLMotionProps, motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'

export interface SpeedScrollImageProps extends HTMLMotionProps<'img'> {
  containerSpeed?: number
  imageSpeed?: number
}

const SpeedScrollImage = ({ containerSpeed = -400, imageSpeed = 70, style, ...props }: SpeedScrollImageProps) => {
  const { ref, scrollYProgress } = useSpeedScrollElement()
  const yContainer = useTransform(scrollYProgress, (prev) => prev * containerSpeed)
  const yImage = useTransform(scrollYProgress, (prev) => prev * imageSpeed)

  return (
    <motion.span ref={ref} className="block overflow-hidden" style={{ y: yContainer }}>
      <motion.img style={{ y: yImage, ...style }} {...props} />
    </motion.span>
  )
}

export default SpeedScrollImage
