import { motion } from 'framer-motion'

export default function GoSnake({ offsetDistance, pathLength, opacity }: any) {
  const path = 'M18 165C10 100 45 30 115 18C180 7 222 55 214 108C207 155 155 185 108 178'
  return (
    <div id="containerPath" className="absolute left-[-10%] top-[-100%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-pixel font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          opacity
        }}
      >
        Go
      </motion.p>
      <svg className="h-full w-full" width="235" height="190" viewBox="0 0 235 190" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#00ADD8"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
