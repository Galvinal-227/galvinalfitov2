import withTransition, { PageProps } from 'components/common/with-transition'
import { routes } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import React from 'react'

import SectionHead from 'module/about/sections/section-head'

import SectionExperiences from 'module/about/sections/section-experiences'
import SectionStory from 'module/about/sections/section-story'
import SectionText from 'module/about/sections/section-text'
import Footer from 'module/footer'
import useMenuChange from 'hooks/use-menu-change'

const About = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })
  const { t } = useTranslation()

  return (
    <div ref={scopeComponentWhenMenuChange} className="w-screen bg-primary">
      <SectionHead asPreview={asPreview} />
      {!asPreview && (
        <>
          <SectionExperiences />
          <SectionStory />
          <SectionText />
          <Footer linkTitle={t('nav_summary')} linkTo={routes.summary} title={t('footer_title_about')} />
        </>
      )}
    </div>
  )
}

export default React.memo(About)
export const AboutTransition = React.memo(withTransition(About))
