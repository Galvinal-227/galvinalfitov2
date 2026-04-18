import { motion } from 'framer-motion'

export default function NextSnake({ offsetDistance, pathLength, opacity }: any) {
  const path =
    'M143.465 466.699C206.298 371.699 315.965 164.199 251.965 94.1992C171.965 6.69922 92.4649 -3.8004 42.4639 40.6997C-12.2321 89.3782 29.4645 158.2 42.4639 177.7C56.5866 198.884 192.964 258.2 378.964 177.7C527.764 113.3 568.964 79.533 570.964 70.6997'
  return (
    <div id="containerPath" className="absolute right-[-75%] top-[-100%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          opacity
        }}
      >
        NextJs
      </motion.p>
      <svg className="h-full w-full" width="586" height="482" viewBox="0 0 586 482" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#DD58D6"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
