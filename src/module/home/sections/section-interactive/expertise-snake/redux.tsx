import { motion } from 'framer-motion'

export default function ReduxSnake({ offsetDistance, pathLength, opacity }: any) {
  const path = 'M35.0001 350.5C6.66675 210.833 -11.5999 -48.7 142 30.5C295.6 109.7 362.667 204.5 377 242'
  return (
    <div id="containerPath" className="absolute right-[-80%] top-[-80%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          opacity
        }}
      >
        Redux
      </motion.p>
      <svg className="h-full w-full" width="392" height="366" viewBox="0 0 392 366" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#73A9AD"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
