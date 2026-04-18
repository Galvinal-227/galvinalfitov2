import { motion } from 'framer-motion'

export default function FirebaseSnake({ offsetDistance, pathLength, opacity }: any) {
  const path = 'M341 397C352 370.5 365.1 302.1 329.5 240.5C285 163.5 133.48 120.103 102.5 104.5C34 70 21.5 38 15 15'
  return (
    <div id="containerPath" className="absolute left-[-30%] top-[-90%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          rotate: '180deg',
          opacity
        }}
      >
        Firebase
      </motion.p>
      <svg className="h-full w-full" width="368" height="412" viewBox="0 0 368 412" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#C07F00"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
