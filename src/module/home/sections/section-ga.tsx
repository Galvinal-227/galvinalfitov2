import { useTransform, motion, HTMLMotionProps } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'

const GA = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div {...props}>
      <svg width="764" height="386" viewBox="0 0 764 386" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <path d="M54.6 385.8V331.8H1.43051e-06V54.6H54.6V1.14441e-05H223.8V54.6H279V168.6H217.8V60.6H60.6V325.8H217.8V277.2H163.8V222.6H108.6V163.2H169.8V216.6H279V331.8H223.8V385.8H54.6ZM351.563 378.6V318H412.163V378.6H351.563ZM484.57 385.8V108.6H539.17V54.6H593.17V1.14441e-05H654.37V54.6H708.37V108.6H763.57V385.8H702.37V277.2H545.17V385.8H484.57ZM545.17 216.6H702.37V114.6H648.37V60.6H599.17V114.6H545.17V216.6Z" fill="white"/>
      </svg>
    </motion.div>
  )
}

export default function SectionGA() {
  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start start', 'end end'] })

  const yTopCurtain = useTransform(scrollYProgress, [0.2, 0.8, 1], ['0%', '-10%', '-110%'])
  const yBottomCurtain = useTransform(scrollYProgress, [0.2, 0.8, 1], ['0%', '10%', '110%'])
  const bottomFA = useTransform(scrollYProgress, [0.2, 0.8, 1], ['0%', '0%', '-100%'])
  const topFA = useTransform(scrollYProgress, [0.2, 0.8, 1], ['100%', '100%', '200%'])

  return (
    <section id="section-ga" ref={ref} className="pointer-events-none relative z-20 h-[200vh] w-screen">
      <div className="MENU-CHANGE-SCALE-125 sticky left-0 top-0 flex h-screen w-screen flex-col justify-between overflow-hidden">
        <motion.div style={{ height: '50vh', y: yTopCurtain }} className="relative flex w-screen justify-center overflow-hidden bg-primary">
          <GA className="absolute w-[85%] md:w-[70%] xl:w-[50%] 2xl:w-[40%] -translate-y-1/2" style={{ top: topFA }} />
        </motion.div>
        <motion.div style={{ height: '50vh', y: yBottomCurtain }} className="relative flex w-screen justify-center overflow-hidden bg-primary">
          <GA className="absolute w-[85%] md:w-[70%] xl:w-[50%] 2xl:w-[40%] -translate-y-1/2" style={{ top: bottomFA }} />
        </motion.div>
      </div>
    </section>
  )
}