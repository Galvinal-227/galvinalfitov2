import AestetikImg from 'assets/images/calmness.gif'
import SatisfiedImg from 'assets/images/victory.gif'
import FunctionalImg from 'assets/images/iq.gif'
import WithCursorElement from 'components/common/with-cursor-element'
import { motion } from 'framer-motion'
import { useTranslation } from 'lib/translations'

const functionalityCursor = {
  element: (
    <motion.img
      animate={{ opacity: 0.7, scale: 1 }}
      initial={{ opacity: 0, scale: 0.2 }}
      exit={{ opacity: 0, scale: 0.2 }}
      src={FunctionalImg}
      className="w-[200px] object-cover"
    />
  ),
  key: 'functionality',
  type: 'hover'
}
const aetheticsCursor = {
  element: (
    <motion.img
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.2 }}
      exit={{ opacity: 0, scale: 0.2 }}
      src={AestetikImg}
      className="w-[200px] object-cover"
    />
  ),
  key: 'aesthetics',
  type: 'hover'
}
const satisfiedCursor = {
  element: (
    <motion.img
      animate={{ opacity: 0.7, scale: 1 }}
      initial={{ opacity: 0, scale: 0.2 }}
      exit={{ opacity: 0, scale: 0.2 }}
      src={SatisfiedImg}
      className="w-[200px] object-cover"
    />
  ),
  key: 'satisfied',
  type: 'hover'
}

export default function SectionFrontendDev() {
  const { t } = useTranslation()
  return (
    <section className="relative z-[1000] min-h-[100vh] w-full bg-secondary pt-10">
      <div className="CONTAINER flex h-screen items-center ">
        <p className="MENU-CHANGE-Y-200 font-pixel text-6xl font-light xl:text-8xl 2xl:text-8xl 2xl:leading-loose">
          <WithCursorElement state={{ element: functionalityCursor as any }}>{t('home_functionality')}</WithCursorElement> +{' '}
          <WithCursorElement state={{ element: aetheticsCursor as any }}>{t('home_aesthetics')}</WithCursorElement> =
          <WithCursorElement state={{ element: satisfiedCursor as any }}>{t('home_satisfaction')}</WithCursorElement>
        </p>
      </div>
    </section>
  )
}
