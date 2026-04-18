import withTransition, { PageProps } from 'components/common/with-transition'
import { routes } from 'lib/utils'
import React from 'react'
import useMenuChange from 'hooks/use-menu-change'
import Footer from 'module/footer'
import SectionGA from 'module/home/sections/section-ga'
import SectionFrontendDev from 'module/home/sections/section-frontend'
import SectionInteractive from 'module/home/sections/section-interactive'
import SectionIntroduction from 'module/home/sections/section-introduction'

const Home = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })

  return (
    <div ref={scopeComponentWhenMenuChange} className="z-10 bg-secondary">
      <SectionIntroduction asPreview={asPreview} />
      {!asPreview && (
        <>
          <SectionGA />
          <SectionInteractive />
          <SectionFrontendDev />
          <div className="relative z-50">
            <Footer linkTitle="ABOUT" linkTo={routes.about} title="What's next?" colorMode="light" />
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(Home)
export const HomeTransition = React.memo(withTransition(Home))
