import { motion } from 'framer-motion'

export default function CssSnake({ offsetDistance, pathLength, opacity }: any) {
  const path = 'M16 66.4548C15.999 15.9548 72.6 2.61857 99 29.8186C132 63.8186 107.5 125.454 144.5 155.819C164.989 172.633 211 173.819 234 164.819'
  return (
    <div id="containerPath" className="absolute right-[-50%] top-[-10%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          opacity
        }}
      >
        CSS
      </motion.p>
      <svg className="h-full w-full" width="250" height="186" viewBox="0 0 250 186" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#FFD1DA"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
