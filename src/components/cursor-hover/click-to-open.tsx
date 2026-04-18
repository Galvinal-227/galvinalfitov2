import RoundedText from 'components/effect/rounded-text'
import { motion } from 'framer-motion'

const ClickToOpen = () => {
  return (
    <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0.3, opacity: 0 }} exit={{ scale: 0.3, opacity: 0 }}>
      <RoundedText
        key="clicktoopenhover"
        text="click to open"
        textClassName="font-display !text-yellow-400 font-semibold capitalize"
        size={60}
        space={20}
      />
    </motion.div>
  )
}

ClickToOpen.key = 'clicktoopenhover'
ClickToOpen.type = 'hover'

export default ClickToOpen
