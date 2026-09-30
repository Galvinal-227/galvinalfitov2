/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import TitleSummaries from '../title-summaries'
import PattrickImg from 'assets/images/pattrick.gif'
import { motion } from 'framer-motion'
import WithCursorElement from 'components/common/with-cursor-element'

const EASE = [0.22, 1, 0.36, 1]

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay, ease: EASE }}
  >
    {children}
  </motion.div>
)

const MetaLabel = ({ children, className = '' }) => (
  <span className={`font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 ${className}`}>
    {children}
  </span>
)

const Section = ({ id, label, children }) => (
  <section id={id} className="border-t border-neutral-900/10 pt-10 sm:pt-14">
    <TitleSummaries text={label} observeId={id} />
    <div className="mt-8 sm:mt-10">{children}</div>
  </section>
)

const EntryRow = ({ period, title, subtitle, location, delay = 0 }) => (
  <Reveal delay={delay}>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:gap-8">
      <div className="sm:col-span-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">{period}</span>
      </div>
      <div className="sm:col-span-9">
        <h3 className="text-2xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-3xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">{subtitle}</p>
        )}
        {location && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
            {location}
          </p>
        )}
      </div>
    </div>
  </Reveal>
)

const ProjectLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500 transition-colors duration-200 hover:text-neutral-900"
  >
    <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover:border-neutral-900">
      {label}
    </span>
    <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
      ↗
    </span>
  </a>
)

const ProjectRow = ({ project, index, isDimmed, onEnter, onLeave }) => {
  const parts = project.text3.split(' - ')
  const category = parts[0]
  const tech = (parts[1] || project.text3).replace(/,\s*/g, ' · ')
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.04, ease: EASE }}
    >
      <div
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`border-t border-neutral-900/10 py-6 transition-opacity duration-300 sm:py-7 ${
          isDimmed ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-12 sm:items-baseline">
          <div className="sm:col-span-1">
            <MetaLabel>{number}</MetaLabel>
          </div>

          <div className="sm:col-span-6">
            <h3 className="text-xl font-medium leading-snug tracking-tight text-neutral-900 transition-transform duration-300 ease-out group-hover:translate-x-1 sm:text-2xl">
              {project.text1}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">{tech}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="font-mono text-xs text-neutral-500">{project.text2}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400">
              {category}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 sm:col-span-3 sm:justify-end">
            <ProjectLink href={project.link} label="GitHub" />
            {project.liveUrl && <ProjectLink href={project.liveUrl} label="Live" />}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

const ActivityRow = ({ title, detail, index }) => (
  <Reveal delay={index * 0.05}>
    <div className="group grid grid-cols-1 gap-2 border-t border-neutral-900/10 py-5 transition-colors duration-300 hover:border-neutral-900/30 sm:grid-cols-12 sm:items-baseline sm:gap-8">
      <h3 className="text-[13px] font-medium uppercase tracking-[0.18em] text-neutral-900 transition-transform duration-300 ease-out group-hover:translate-x-1 sm:col-span-4">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-neutral-500 sm:col-span-8">{detail}</p>
    </div>
  </Reveal>
)

const TechGroup = ({ name, technologies, index }) => (
  <Reveal delay={index * 0.05}>
    <div className="grid grid-cols-1 gap-3 border-t border-neutral-900/10 py-6 sm:grid-cols-12 sm:gap-8">
      <div className="sm:col-span-3">
        <MetaLabel>{name}</MetaLabel>
      </div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:col-span-9">
        {technologies.map((tech, i) => (
          <React.Fragment key={tech}>
            {i > 0 && <span className="select-none text-neutral-300">·</span>}
            <span className="inline-block cursor-default text-lg tracking-tight text-neutral-700 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-neutral-900 sm:text-xl">
              {tech}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </Reveal>
)

const TechStack = () => {
  const techCategories = [
    {
      name: 'Frontend',
      technologies: ['React', 'Next.js', 'TailwindCSS', 'Vite', 'HTML']
    },
    {
      name: 'Backend',
      technologies: ['Node.js']
    },
    {
      name: 'Database & Tools',
      technologies: ['Git', 'GitHub', 'VS Code', 'MongoDb', 'PostgreSQL', 'Docker', 'GraphQL']
    },
    {
      name: 'Languages',
      technologies: ['TypeScript', 'JavaScript', 'Python']
    }
  ]

  return (
    <div>
      {techCategories.map((category, index) => (
        <TechGroup
          key={category.name}
          name={category.name}
          technologies={category.technologies}
          index={index}
        />
      ))}
    </div>
  )
}

const Experiences = () => {
  const [activeProject, setActiveProject] = useState(null)

  const projects = [
    {
      text1: 'Learn Coding',
      text2: '2026',
      text3: 'Frontend - React, Tailwind, Vite, locomotive-scroll, framer-motion',
      color: '#0091F8',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://learncoding-one.vercel.app'
    },
    {
      text1: 'Gallery With You',
      text2: '2026',
      text3: 'Frontend - React, Tailwind, Vite, framer-motion',
      color: '#F1592A',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://youandme-six.vercel.app'
    },
    {
      text1: 'Portfolio Website',
      text2: '2025',
      text3: 'Fullstack - React, Tailwind, MongoDB',
      color: '#2E9E6C',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://galvin-portfolio.vercel.app'
    },
    {
      text1: 'Library Css Gradient',
      text2: '2026',
      text3: 'Frontend - React, Tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gcssgradient.vercel.app'
    },
    {
      text1: 'Library Nova UI',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://novaui-six.vercel.app'
    },
    {
      text1: 'GWD Studio',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gwd-studio.vercel.app'
    },
    {
      text1: 'Old Portfolio',
      text2: '2025',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://galvin-portfolio.vercel.app'
    },
    {
      text1: 'Al Quran Digital',
      text2: '2025',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://al-q-app.vercel.app'
    },
    {
      text1: 'GWD Code Editor',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gcodeeditor.vercel.app'
    },
    {
      text1: 'GWD Color Generator',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://gwd-code-generator.vercel.app'
    },
    {
      text1: 'Velora Shop',
      text2: '2026',
      text3: 'Frontend - React, tailwind',
      color: '#A3195B',
      link: 'https://github.com/galvinal-227',
      liveUrl: 'https://veloraid-pi.vercel.app/'
    }
  ]

  const activities = [
    {
      title: 'Self Learning',
      detail: 'React · JavaScript · TypeScript'
    },
    {
      title: 'Game Development',
      detail: 'Construct 3 · Cowboy Shooter'
    },
    {
      title: 'Web Development',
      detail: 'React · Tailwind · UI Development'
    },
    {
      title: 'Version Control',
      detail: 'Git · GitHub · Collaboration'
    }
  ]

  return (
    <div className="bg-[#FAF9F6] text-neutral-900">
      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-6 sm:px-8 lg:px-12">
        <div className="space-y-16 sm:space-y-20">
          <Section id="education" label="Education">
            <EntryRow
              period="2023 — Present"
              title="SMKN 2 Nganjuk"
              subtitle="Pengembangan Perangkat Lunak dan Gim"
              location="Nganjuk, Indonesia"
            />
          </Section>

          <Section id="experiences" label="Experiences">
            <EntryRow
              period="2025 — Present"
              title="Freelance / Personal Project"
              subtitle="Frontend & Backend Development — membangun antarmuka dan logika aplikasi web secara mandiri, dari eksplorasi ide hingga deploy."
              location="Remote"
            />
          </Section>

          <Section id="selected-project" label="Selected Projects">
            <div
              onMouseLeave={() => setActiveProject(null)}
              className="border-b border-neutral-900/10"
            >
              {projects.map((project, index) => (
                <ProjectRow
                  key={project.text1 + index}
                  project={project}
                  index={index}
                  isDimmed={activeProject !== null && activeProject !== index}
                  onEnter={() => setActiveProject(index)}
                  onLeave={() => setActiveProject(null)}
                />
              ))}
            </div>
          </Section>

          <Section id="selected-activities" label="Selected Activities">
            <div className="border-b border-neutral-900/10">
              {activities.map((activity, index) => (
                <ActivityRow
                  key={activity.title}
                  title={activity.title}
                  detail={activity.detail}
                  index={index}
                />
              ))}
            </div>
          </Section>

          <Section id="selected-certificate" label="Selected Certificate">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-12 sm:items-end sm:gap-10">
              <div className="sm:col-span-5">
                <MetaLabel>2026</MetaLabel>
                <h3 className="mt-3 text-2xl font-medium leading-tight tracking-tight text-neutral-900 sm:text-3xl">
                  React Development
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
                  Sertifikat penyelesaian program pengembangan aplikasi web berbasis React.
                </p>
              </div>

              <div className="sm:col-span-7">
                <a
                  href="/Latika-1.png"
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden border border-neutral-900/10 bg-white"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src="/Latika-1.png"
                      alt="Certificate React Development"
                      className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 flex items-end justify-between bg-neutral-900/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-neutral-900/40 group-hover:opacity-100">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white">
                        Open certificate
                      </span>
                      <span className="inline-block text-white transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Section>

          <Section id="tech" label="Tech Stack">
            <TechStack />

            <div className="mt-10 flex items-center">
              <WithCursorElement
                state={{
                  element: {
                    element: (
                      <motion.img
                        src={PattrickImg}
                        alt="getting dizzy"
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 0.7 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-[180px] sm:w-[220px]"
                      />
                    ),
                    key: 'dizzy',
                    type: 'hover'
                  }
                }}
              >
                <span className="font-pixel inline-flex items-center gap-2 text-sm tracking-wide text-neutral-400 transition-colors duration-300 hover:text-neutral-900 sm:text-base">
                  And keep learning...
                </span>
              </WithCursorElement>
            </div>
          </Section>

          <Section id="contact" label="Contact">
            <p className="max-w-md text-sm leading-relaxed text-neutral-500">
              Let&apos;s build something. Terbuka untuk kolaborasi, proyek freelance, maupun
              kesempatan belajar baru.
            </p>

            <div className="mt-10 space-y-10">
              <div>
                <MetaLabel>Email</MetaLabel>
                <a
                  href="mailto:galvinalfito@gmail.com"
                  className="mt-3 block break-words text-2xl font-medium tracking-tight text-neutral-900 underline decoration-neutral-300 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-neutral-900 sm:text-4xl lg:text-5xl"
                >
                  galvinalfito@gmail.com
                </a>
              </div>

              <div>
                <MetaLabel>LinkedIn</MetaLabel>
                <a
                  href="https://www.linkedin.com/in/galvin-alfito-506494390/"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-3 inline-flex items-baseline gap-2 text-xl font-medium tracking-tight text-neutral-900 transition-colors duration-200 hover:text-neutral-500 sm:text-2xl"
                >
                  <span className="border-b border-transparent pb-0.5 transition-colors duration-200 group-hover:border-neutral-900">
                    Galvin Alfito D
                  </span>
                  <span className="inline-block text-base transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

export default Experiences
