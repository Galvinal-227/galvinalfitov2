import withTransition, { PageProps } from 'components/common/with-transition'
import { routes } from 'lib/utils'
import { useTranslation } from 'lib/translations'
import Description from 'module/summary/sections/description'
import React from 'react'

import Footer from 'module/footer'
import Experiences from 'module/summary/sections/experiences'
import OrnamenPath from 'module/summary/sections/ornamen-path'
import useMenuChange from 'hooks/use-menu-change'

const Summary = ({ asPreview }: PageProps) => {
  const scopeComponentWhenMenuChange = useMenuChange({ asPreview })
  const { t } = useTranslation()

  return (
    <div ref={scopeComponentWhenMenuChange} className="w-screen bg-primary">
      <div className="h-[10vh]"></div>
      <Description />
      {!asPreview && (
        <>
          <Experiences />
          <OrnamenPath />
          <Footer linkTitle={t('nav_home')} linkTo={routes.index} title={t('footer_title_summary')} />
        </>
      )}
    </div>
  )
}

export default React.memo(Summary)
export const SummaryTransition = React.memo(withTransition(Summary))
