import { motion } from 'framer-motion'

export default function TypecriptSnake({ offsetDistance, pathLength, opacity }: any) {
  const path =
    'M395.5 411.5C466 335.333 595.5 164.9 549.5 92.5001C492 2.00005 350 -24.4999 274 101.5C198 227.5 222.5 296.5 123.5 295C44.3 293.8 18.1667 282.833 15 277.5'
  return (
    <div id="containerPath" className="absolute left-[-80%] top-[-80%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetPath: `path("${path}")`,
          rotate: '180deg',
          opacity
        }}
      >
        TS
      </motion.p>
      <svg className="h-full w-full" width="575" height="427" viewBox="0 0 575 427" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#30A2FF"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
