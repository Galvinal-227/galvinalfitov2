import { motion } from 'framer-motion'

const GalvinAlfitoFollower = () => {
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.1, opacity: 0 }}
      initial={{ scale: 0.1, opacity: 0 }}
      key="GalvinAlfitofollower"
      className="absolute flex items-center justify-center rounded-full p-4 backdrop-invert"
    >
      <motion.p
        animate={{ rotate: 360 }}
        transition={{ rotate: { repeat: Infinity, duration: 5, ease: 'linear' } }}
        className="font-pixel m-0 text-2xl font-semibold backdrop-invert-0"
      >
        G.A
      </motion.p>
    </motion.div>
  )
}

GalvinAlfitoFollower.key = 'galvinalfitofollower'
GalvinAlfitoFollower.type = 'cursor' as any

export default GalvinAlfitoFollower
