import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import { motion, useSpring, useTransform, useVelocity } from 'framer-motion'
import { StateContext } from 'context/state'
import React from 'react'

const OrnamenPath = () => {
  const { state } = React.useContext(StateContext)
  const { ref, scrollYProgress } = useSpeedScrollElement({ offset: ['start start', 'end center'] })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1])
  const smooth = useSpring(scrollYProgress, { damping: 50, stiffness: 400 })
  const smoothVelocity = useVelocity(smooth)
  const strokeWidth = useTransform(smoothVelocity, [-1, 0, 1], [40, 5, 40])

  const opacityText = useTransform(scrollYProgress, [0, 0.99, 1], [0.2, 0.2, 1])

  if (state?.isSmallDevice) {
    return (
      <div className="CONTAINER flex h-screen items-center">
        <h2 className="MENU-CHANGE-Y-100 font-display text-7xl font-semibold capitalize text-white md:text-8xl">damn you really want to know me</h2>
      </div>
    )
  }

  return (
    <div ref={ref} className="CONTAINER h-[650vh]">
      <div className="sticky left-0 top-[10%]">
        <div className="flex w-full justify-center">
          <div className="MENU-CHANGE-SCALE-150 relative lg:w-[40vw] 2xl:w-[50vw]">
            <svg width="1123" height="3091" viewBox="0 0 1123 3091" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <motion.path
                style={{ pathLength, opacity, strokeWidth }}
                d="M532.982 4C527.149 131.167 569.482 383.4 785.482 375C1055.48 364.5 1097.98 328.5 1101.48 286C1104.98 243.5 1066.48 200 1005.48 199C944.483 198 828.982 197 532.982 389C236.983 581 52.7781 509.911 26.4825 490.5C16.9999 483.5 -19.5175 436 26.4825 381C72.4825 326 238.5 325.869 346.482 375C430 413 882.482 663 1019.98 647C1157.48 631 1117.48 544.5 1101.48 534C1085.48 523.5 1029.48 474 889.982 504C750.482 534 668.982 572.5 532.982 647C396.982 721.5 146.982 780.5 128.482 708C109.982 635.5 161.982 598 243.982 594.5C325.982 591 462.482 619 631.482 708C800.482 797 953.482 886.5 1001.48 816.5C1049.48 746.5 946.5 708 907 708C888.017 708 807.482 698.5 584.982 831.5C362.482 964.5 289.982 932 272.482 906.5C254.982 881 265.982 811 353.982 816.5C441.982 822 532.982 854.5 532.982 956C532.982 1037.2 532.982 1505.83 532.982 1730C531.982 1776.17 518.682 1873 473.482 1891C416.982 1913.5 230 1850 122.982 1963C58.2351 2031.37 214.045 2102 255.482 2123C473.482 2233.5 731.168 2299.58 792.982 2355C812.5 2372.5 949.982 2507.5 651.482 2587C412.682 2650.6 433.316 2947.17 473.482 3087.5"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
            </svg>
            <svg
              width="1123"
              height="3091"
              viewBox="0 0 1123 3091"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-0 h-full w-full"
            >
              <path
                d="M532.982 4C527.149 131.167 569.482 383.4 785.482 375C1055.48 364.5 1097.98 328.5 1101.48 286C1104.98 243.5 1066.48 200 1005.48 199C944.483 198 828.982 197 532.982 389C236.983 581 52.7781 509.911 26.4825 490.5C16.9999 483.5 -19.5175 436 26.4825 381C72.4825 326 238.5 325.869 346.482 375C430 413 882.482 663 1019.98 647C1157.48 631 1117.48 544.5 1101.48 534C1085.48 523.5 1029.48 474 889.982 504C750.482 534 668.982 572.5 532.982 647C396.982 721.5 146.982 780.5 128.482 708C109.982 635.5 161.982 598 243.982 594.5C325.982 591 462.482 619 631.482 708C800.482 797 953.482 886.5 1001.48 816.5C1049.48 746.5 946.5 708 907 708C888.017 708 807.482 698.5 584.982 831.5C362.482 964.5 289.982 932 272.482 906.5C254.982 881 265.982 811 353.982 816.5C441.982 822 532.982 854.5 532.982 956C532.982 1037.2 532.982 1505.83 532.982 1730C531.982 1776.17 518.682 1873 473.482 1891C416.982 1913.5 230 1850 122.982 1963C58.2351 2031.37 214.045 2102 255.482 2123C473.482 2233.5 731.168 2299.58 792.982 2355C812.5 2372.5 949.982 2507.5 651.482 2587C412.682 2650.6 433.316 2947.17 473.482 3087.5"
                stroke="white"
                strokeWidth="4"
                strokeOpacity="0.1"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <motion.h2 style={{ opacity: opacityText }} className="MENU-CHANGE-Y-100 font-display text-9xl font-semibold capitalize text-white">
          damn you really want to know me
        </motion.h2>
      </div>
    </div>
  )
}

export default OrnamenPath
