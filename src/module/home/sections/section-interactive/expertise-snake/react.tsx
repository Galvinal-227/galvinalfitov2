import { motion } from 'framer-motion'

export default function ReactSnake({ offsetDistance, pathLength, opacity }: any) {
  const path =
    'M114.667 224.73C83.3339 205.897 19.5673 150.73 15.1673 80.7303C9.66725 -6.76971 141.167 -2.76971 210.167 68.2303C279.167 139.23 284.667 202.23 338.167 224.73C380.967 242.73 414.334 227.897 425.667 218.23'
  return (
    <div id="containerPath" className="absolute right-[-75%] top-[-50%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          opacity
        }}
      >
        ReactJs
      </motion.p>
      <svg className="h-full w-full" width="441" height="249" viewBox="0 0 441 249" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#FD8D14"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
