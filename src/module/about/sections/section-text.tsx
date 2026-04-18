import MakeFirstMoveImg from 'assets/images/make-firt-move.jpg'
import WithCursorElement from 'components/common/with-cursor-element'
import { motion } from 'framer-motion'

export default function SectionText() {
  return (
    <div className="CONTAINER flex min-h-screen flex-col items-start justify-center">
      <p className="MENU-CHANGE-Y-200 font-poppins text-2xl text-white">Dont Be Shy,</p>
      <WithCursorElement
        state={{
          element: {
            element: (
              <motion.img
                src={MakeFirstMoveImg}
                alt="make first move"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-[300px]"
              />
            ),
            key: 'makefirstmove',
            type: 'hover'
          }
        }}
      >
        <h2 className="MENU-CHANGE-Y-100 font-display text-9xl text-white">Make The First Move.</h2>
      </WithCursorElement>
    </div>
  )
}
