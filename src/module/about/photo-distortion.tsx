import React from 'react'
import { motion } from 'framer-motion'
import hoverEffect from 'hover-effect'
import { easeDefault } from 'lib/utils'
import { Power4 } from 'gsap'
import Magnet from 'components/effect/magnet'

const PhotoDistortion = () => {
  const imageContainerRef = React.useRef<HTMLDivElement>(null)
  const imageContainerRef2 = React.useRef<HTMLDivElement>(null)
  const imageContainerRef3 = React.useRef<HTMLDivElement>(null)

  const image1Instance = React.useRef<any>()
  const image2Instance = React.useRef<any>()
  const image3Instance = React.useRef<any>()

  React.useEffect(() => {
    const image1 = new hoverEffect({
      parent: imageContainerRef.current,
      intensity: 0.3,
      speedIn: 2,
      easing: Power4,
      speedOut: 1.6,
      image1: '/me.png',
      image2: '/Lake.jpg',
      displacementImage: '/noise-transparent.png',
      imagesRatio: 1.4
    })
    const image2 = new hoverEffect({
      parent: imageContainerRef2.current,
      intensity: 0.3,
      speedIn: 1.8,
      easing: Power4,
      speedOut: 1.4,
      image1: '/me.png',
      image2: '/Lake.jpg',
      displacementImage: '/noise-transparent.png',
      imagesRatio: 1.4
    })
    const image3 = new hoverEffect({
      parent: imageContainerRef3.current,
      intensity: 0.3,
      image1: '/me.png',
      image2: '/Lake.jpg',
      displacementImage: '/noise-transparent.png',
      imagesRatio: 1.4
    })

    image1Instance.current = image1
    image2Instance.current = image2
    image3Instance.current = image3
  }, [])

  const onHoverStart = () => {
    image1Instance.current?.next()
    image2Instance.current?.next()
    image3Instance.current?.next()
  }

  const onHoverEnd = () => {
    image1Instance.current?.previous()
    image2Instance.current?.previous()
    image3Instance.current?.previous()
  }

  return (
    <Magnet className="" layers="magnet-layer">
      <motion.div
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        initial={{ height: '0.1px', y: '200px', opacity: 0 }}
        animate={{ height: '100%', y: 0, opacity: 1 }}
        transition={{ ease: easeDefault, duration: 1, delay: 2, opacity: { duration: 0.01 } }}
        className="relative flex w-fit items-center justify-center overflow-hidden "
      >
        <div className="magnet-layer absolute z-20">
          <div ref={imageContainerRef3} className="pointer-events-none flex h-[70vh] w-[30vw] justify-center object-cover"></div>
        </div>
        <div className="magnet-layer absolute z-10">
          <div ref={imageContainerRef2} className="pointer-events-none flex h-[80vh] w-[35vw] justify-center object-cover"></div>
        </div>
        <div className="magnet-layer">
          <div ref={imageContainerRef} className="pointer-events-none flex h-[90vh] w-[40vw] justify-center object-cover"></div>
        </div>
      </motion.div>
    </Magnet>
  )
}

export default React.memo(PhotoDistortion)
