import Magnet from 'components/effect/magnet'
import ParallaxMarquee from 'components/effect/parallax-marquee'
import { useTranslation } from 'lib/translations'
import { IconType } from 'react-icons'
import {
  SiDocker,
  SiGo,
  SiGraphql,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiPython
} from 'react-icons/si'

type Tech = { label: string; Icon: IconType }

const rowOne: Tech[] = [
  { label: 'React', Icon: SiReact },
  { label: 'Next.js', Icon: SiNextdotjs },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'TailwindCSS', Icon: SiTailwindcss },
  { label: 'Python', Icon: SiPython }

]

const rowTwo: Tech[] = [
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'MongoDB', Icon: SiMongodb },
  { label: 'GraphQL', Icon: SiGraphql },
  { label: 'Docker', Icon: SiDocker }
]

const Pill = ({ label, Icon }: Tech) => (
  <Magnet strength={20} className="mx-3 inline-block w-fit">
    <div className="flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-pixel text-lg text-secondary">
      <Icon className="text-xl" />
      {label}
    </div>
  </Magnet>
)

export default function SectionTechStack() {
  const { t } = useTranslation()

  return (
    <section className="relative z-10 w-full overflow-hidden bg-secondary py-20">
      <h2 className="CONTAINER MENU-CHANGE-Y-100 mb-10 font-pixel text-4xl font-medium text-primary md:text-6xl lg:text-7xl">
        {t('home_tech_stack_title')}
      </h2>
      <div className="flex flex-col gap-y-6">
        <ParallaxMarquee baseVelocity={-1.5}>
          <div className="flex items-center">
            {rowOne.map((tech) => (
              <Pill key={tech.label} {...tech} />
            ))}
          </div>
        </ParallaxMarquee>
        <ParallaxMarquee baseVelocity={1.5}>
          <div className="flex items-center">
            {rowTwo.map((tech) => (
              <Pill key={tech.label} {...tech} />
            ))}
          </div>
        </ParallaxMarquee>
      </div>
    </section>
  )
}
