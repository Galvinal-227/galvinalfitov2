import { motion, MotionProps } from 'framer-motion'
import classes from '../../styles/rounded-text.module.css'

type Props = MotionProps & {
  text?: string
  space?: number
  size?: number
  textClassName?: string
  className?: string
  children?: any
}

const RoundedText = ({ text, space = 10, textClassName, children, className, size = 100, style, ...props }: Props) => {
  const tText = text
    ?.split('')
    ?.map((char, i) => `<span class="${classes.span}" style="transform:rotate(${i * space}deg);transform-origin: 0 ${size}px">${char}</span>`)
    .join('')

  return (
    <motion.div className={`${classes.circle} ${className}`} style={{ width: size * 2 + 'px', height: size * 2 + 'px', ...style }} {...props}>
      {children}
      <div className={classes.text}>
        <p dangerouslySetInnerHTML={{ __html: tText as string }} className={textClassName} />
      </div>
    </motion.div>
  )
}

export default RoundedText
