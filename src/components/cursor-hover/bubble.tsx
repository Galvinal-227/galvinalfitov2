import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'

const Bubble = ({ children }: { children?: any }) => {
  return (
    <motion.div
      key="Bubblehover"
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      transition={{ duration: 0.6, ease: easeDefault }}
      className="relative flex h-[300px] w-[300px] items-center justify-center overflow-hidden rounded-full border border-solid border-white"
    >
      {children}
    </motion.div>
  )
}

Bubble.key = 'Bubblehover'
Bubble.type = 'hover'

export default Bubble
