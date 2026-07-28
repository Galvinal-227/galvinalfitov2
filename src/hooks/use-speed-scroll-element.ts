import { useScroll } from 'framer-motion'
import { useRef } from 'react'

export default function useSpeedScrollElement(scrollOptions?: any) {
  const ref = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    ...scrollOptions
  })

  return { ref, scrollYProgress }
}
