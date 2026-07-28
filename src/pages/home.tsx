import withTransition, { PageProps } from 'components/common/with-transition'
import { routes } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import React from 'react'
import useMenuChange from 'hooks/use-menu-change'
import Footer from 'module/footer'
import SectionFA from 'module/home/sections/section-ga'
import SectionFrontendDev from 'module/home/sections/section-frontend'
import SectionInteractive from 'module/home/sections/section-interactive'
import SectionIntroduction from 'module/home/sections/section-introduction'
import SectionProjects from 'module/home/sections/section-projects'
import SectionStats from 'module/home/sections/section-stats'
import SectionTechStack from 'module/home/sections/section-tech-stack'
// Import Collaboration Section
import CollaborationSection from 'module/home/sections/section-collaboration' // Atau path sesuai struktur Anda

const Home = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })
  const { t } = useTranslation()

  return (
    <div ref={scopeComponentWhenMenuChange} className="z-10 bg-secondary">
      <SectionIntroduction asPreview={asPreview} />
      {!asPreview && (
        <>
          <SectionFA />
          <SectionInteractive />
          <SectionStats />
          <SectionProjects />
          
          {/* Tambahkan Collaboration Section di sini */}
          <CollaborationSection />
          
          <SectionTechStack />
          <SectionFrontendDev />
          <div className="relative z-50">
            <Footer linkTitle={t('nav_about')} linkTo={routes.about} title={t('footer_title_home')} colorMode="light" />
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo(Home)
export const HomeTransition = React.memo(withTransition(Home))