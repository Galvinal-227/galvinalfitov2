import { useTranslation } from 'lib/translations'

export default function SectionIntroductionMobile() {
  const { t } = useTranslation()

  return (
    <div className="CONTAINER snap-y snap-mandatory">
      <div className="flex h-screen w-full snap-center flex-col items-center justify-center">
        <h1 className="MENU-CHANGE-Y-200 text-center font-pixel text-6xl leading-[1.3] text-secondary md:text-8xl xl:text-9xl 2xl:text-[10rem]">
          {t('home_mobile_intro_1')}
        </h1>
      </div>
      <div className="flex h-screen w-full snap-center flex-col items-center justify-center">
        <h1 className="MENU-CHANGE-Y-200 text-center  font-pixel text-6xl leading-[1.3] text-secondary md:text-8xl xl:text-9xl 2xl:text-[10rem]">
          {t('home_mobile_intro_2')}
        </h1>
      </div>
      <div className="flex h-screen w-full snap-center flex-col items-center justify-center">
        <h1 className="MENU-CHANGE-Y-200 text-center  font-pixel text-6xl leading-[1.3] text-secondary md:text-8xl xl:text-9xl 2xl:text-[10rem]">
          {t('home_mobile_intro_3')}
        </h1>
      </div>
    </div>
  )
}
