import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import { stats } from 'lib/stats'
import CountUp from 'components/effect/count-up'

const Squiggle = () => (
  <svg width="70" height="10" viewBox="0 0 70 10" fill="none" className="mt-2">
    <motion.path
      d="M1 7.5C8 2.5 14 2.5 20 6C26 9.5 32 9.5 38 5C44 0.5 50 0.5 56 4C60 6 63 6.5 69 3"
      stroke="#FACC15"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, ease: easeDefault as any, delay: 0.4 }}
    />
  </svg>
)

export default function SectionStats() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 w-full bg-secondary py-20 md:py-28">
      <div className="CONTAINER grid grid-cols-2 gap-y-14 md:grid-cols-4 md:gap-y-0">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.labelKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: easeDefault as any, delay: i * 0.1 }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <p className="font-pixel text-5xl font-semibold text-primary md:text-6xl lg:text-7xl">
              <CountUp target={stat.target} suffix={stat.suffix} />
            </p>
            <Squiggle />
            <p className="mt-2 font-pixel text-sm text-gray-600 md:text-base">{t(stat.labelKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
