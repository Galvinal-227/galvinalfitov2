import { motion } from 'framer-motion'

const GalvinalfitoFollower = () => {
  return (
    <motion.div
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.1, opacity: 0 }}
      initial={{ scale: 0.1, opacity: 0 }}
      key="Galvinalfitofollower"
      className="absolute flex items-center justify-center rounded-full p-4 backdrop-invert"
    >
      <motion.p
        animate={{ rotate: 360 }}
        transition={{ rotate: { repeat: Infinity, duration: 5, ease: 'linear' } }}
        className="font-display m-0 text-2xl font-semibold backdrop-invert-0"
      >
        G.A
      </motion.p>
    </motion.div>
  )
}

GalvinalfitoFollower.key = 'Galvinalfitofollower'
GalvinalfitoFollower.type = 'cursor' as any

export default GalvinalfitoFollower
