import { motion } from 'framer-motion'

export default function PWASnake({ offsetDistance, pathLength, opacity }: any) {
  const path = 'M268.5 215C308.5 121 343.7 -45.9001 164.5 38.4999C-14.6999 122.9 4.83344 250.667 37.0001 304'
  return (
    <div id="containerPath" className="absolute left-[-30%] top-[-50%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          rotate: '180deg',
          opacity
        }}
      >
        PWA
      </motion.p>
      <svg className="h-full w-full" width="316" height="319" viewBox="0 0 316 319" fill="none">
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
