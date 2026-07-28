import MakeFirstMoveImg from 'assets/images/make-firt-move.jpg'
import WithCursorElement from 'components/common/with-cursor-element'
import { motion } from 'framer-motion'
import { useTranslation } from 'lib/translations'

export default function SectionText() {
  const { t } = useTranslation()
  return (
    <div className="CONTAINER flex min-h-screen flex-col items-start justify-center">
      <p className="MENU-CHANGE-Y-200 font-pixel text-2xl text-white">{t('about_dont_be_shy')}</p>
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
        <a href="mailto:galvinalfito@gmail.com" aria-label="Email me">
          <h2 className="MENU-CHANGE-Y-100 font-pixel text-9xl text-white">{t('about_make_first_move')}</h2>
        </a>
      </WithCursorElement>
    </div>
  )
}
