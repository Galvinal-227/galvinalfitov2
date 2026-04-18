import { PageProps } from 'components/common/with-transition'
import ParallaxMarquee from 'components/effect/parallax-marquee'
import SpeedScrollElement from 'components/effect/speed-scroll-element'
import { StateContext } from 'context/state'
import MarqueeStagger from 'module/about/marquee-stagger'
import StaggerSlideElementAbout from 'module/about/stagger-slide-about'
import SectionHeadMobile, { StackedImage } from 'module/mobile/about/section-head'
import React from 'react'

const PhotoDistortion = React.lazy(() => import('../photo-distortion'))

const Default = ({ asPreview }: PageProps) => {
  const { state } = React.useContext(StateContext)

  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <MarqueeStagger
          tag="div"
          asPreview={asPreview}
          triger={state?.menuShow}
          startDelay={0.5}
          className="font-display text-9xl font-semibold text-secondary"
        >
          <ParallaxMarquee baseVelocity={-1}>ABOUT ME - </ParallaxMarquee>
        </MarqueeStagger>
        <MarqueeStagger
          tag="div"
          asPreview={asPreview}
          triger={state?.menuShow}
          startDelay={1}
          className="font-display text-9xl font-semibold text-secondary"
        >
          <ParallaxMarquee baseVelocity={-2}>ABOUT ME - </ParallaxMarquee>
        </MarqueeStagger>
        <MarqueeStagger
          tag="div"
          asPreview={asPreview}
          triger={state?.menuShow}
          startDelay={1.5}
          className="font-display text-9xl font-semibold text-secondary"
        >
          <ParallaxMarquee baseVelocity={-3}>ABOUT ME - </ParallaxMarquee>
        </MarqueeStagger>
      </div>
      <div className="CONTAINER mt-20 min-h-[150vh]">
        <SpeedScrollElement speed={-300} options={{ offset: ['start center', 'end start'] }}>
          <div className="MENU-CHANGE-Y-100 flex min-h-[60vh] justify-center">
            {asPreview ? (
              <StackedImage />
            ) : (
              <React.Suspense>
                <PhotoDistortion />
              </React.Suspense>
            )}
          </div>
          <SpeedScrollElement speed={-500} className=" pointer-events-none z-[90]">
            <StaggerSlideElementAbout className=" MENU-CHANGE-Y-200 pointer-events-none font-display text-[10rem] font-semibold leading-[1] text-white">
              Galvin Alfito D
            </StaggerSlideElementAbout>
          </SpeedScrollElement>
        </SpeedScrollElement>
      </div>
    </>
  )
}

export default function SectionHead({ asPreview }: PageProps) {
  const { state } = React.useContext(StateContext)
  return (
    <section id="section-head-about">
      <div className="h-[10vh] w-full"></div>
      {state?.isSmallDevice ? <SectionHeadMobile /> : <Default asPreview={asPreview} />}
    </section>
  )
}
