import withTransition, { PageProps } from 'components/common/with-transition'
import { routes } from 'lib/utils'
import React from 'react'

import SectionHead from 'module/about/sections/section-head'

import SectionExperiences from 'module/about/sections/section-experiences'
import SectionText from 'module/about/sections/section-text'
import Footer from 'module/footer'
import useMenuChange from 'hooks/use-menu-change'

const About = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })

  return (
    <div ref={scopeComponentWhenMenuChange} className="w-screen bg-primary">
      <SectionHead asPreview={asPreview} />
      {!asPreview && (
        <>
          <SectionExperiences />
          <SectionText />
          <Footer linkTitle="SUMMARY" linkTo={routes.summary} title="Still curious?" />
        </>
      )}
    </div>
  )
}

export default React.memo(About)
export const AboutTransition = React.memo(withTransition(About))
