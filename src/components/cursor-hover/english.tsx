import RoundedText from 'components/effect/rounded-text'
import { motion } from 'framer-motion'

const EnglishHover = () => {
  return (
    <motion.div animate={{ scale: 1, opacity: 1 }} initial={{ scale: 0.3, opacity: 0 }} exit={{ scale: 0.3, opacity: 0 }}>
      <RoundedText
        text="LinkedIn LinkedIn"
        className="border-2 border-solid border-white"
        textClassName="font-display !text-white font-semibold capitalize"
        size={60}
        space={20}
      >
        <div className="boder-solid h-[55%] w-[55%] rounded-full border-2 border-white backdrop-invert" />
      </RoundedText>
    </motion.div>
  )
}

EnglishHover.key = 'englishhover'
EnglishHover.type = 'hover'

export default EnglishHover
