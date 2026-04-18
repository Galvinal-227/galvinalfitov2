import { motion } from 'framer-motion'

export default function JavascriptSnake({ offsetDistance, pathLength, opacity }: any) {
  const path =
    'M319 212C329.5 194.833 351.431 140.294 315 80.4997C269 4.99999 195 13.5001 162 19.4997C136.95 24.054 49.5 43.9997 31.5 147C20.62 209.257 20.3333 234.666 15 239'
  return (
    <div id="containerPath" className="absolute left-[-50%] top-[-50%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          rotate: '180deg',
          opacity
        }}
      >
        JS
      </motion.p>
      <svg className="h-full w-full" width="351" height="254" viewBox="0 0 351 254" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#75C2F6"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
