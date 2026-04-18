import { motion } from 'framer-motion'

export default function KeepLearningSnake({ offsetDistance, pathLength, opacity }: any) {
  const path =
    'M289.004 393C259.504 342 111.512 348.421 88.5038 292C69.6094 245.667 106.649 206.403 140.504 195.5C207.508 173.921 243.166 263 282.166 269C357.5 280.59 392.166 283.5 399.666 250C407.166 216.5 344.841 174 308 174C216.5 174 88.0023 298.5 35.0023 241.5C-9.01879 194.157 57.2248 137.544 175.165 121.079C297.5 104 415.166 149.579 396.666 79.5789C381.866 23.5789 247.499 17.9123 182.165 22.0789'
  return (
    <div id="containerPath" className="absolute right-[-10%] top-[-80%]">
      <motion.p
        className="absolute left-0 top-0 px-10 font-poppins font-bold text-white"
        style={{
          offsetDistance,
          offsetRotate: '0deg',
          offsetPath: `path("${path}")`,
          opacity
        }}
      >
        Keep Learning
      </motion.p>
      <svg className="h-full w-full" width="422" height="414" viewBox="0 0 422 414" fill="none">
        <motion.path
          className="drop-shadow-lg"
          id="idea1"
          d={path}
          stroke="#C7F2A4"
          strokeWidth="31"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  )
}
