import { motion } from 'framer-motion'
import { TfiClose } from 'react-icons/tfi'

const Close = () => {
  return (
    <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0.3, opacity: 0 }} exit={{ scale: 0.3, opacity: 0 }}>
      <TfiClose className="text-5xl text-primary" />
    </motion.div>
  )
}

Close.key = 'closehover'
Close.type = 'hover'

export default Close
