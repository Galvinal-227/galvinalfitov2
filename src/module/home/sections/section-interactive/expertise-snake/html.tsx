import { motion } from 'framer-motion'

export default function HTMLSnake({ offsetDistance, pathLength, opacity }: any) {
  const path = 'M97 69C96.6646 47.1998 88.3472 6.2155 57.7607 16.6796C19.5276 29.7597 26.5706 51.8954 15 69'
  return (
    <div id="containerPath" className="absolute left-[0%] top-[-10%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          rotate: '180deg',
          opacity
        }}
      >
        HTML
      </motion.p>
      <svg className="h-full w-full" width="112" height="84" viewBox="0 0 112 84" fill="none">
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
