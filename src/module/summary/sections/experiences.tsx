/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import TitleSummaries from '../title-summaries'
import PattrickImg from 'assets/images/pattrick.gif'
import { motion } from 'framer-motion'
import WithCursorElement from 'components/common/with-cursor-element'

interface TechCategory {
  name: string
  technologies: string[]
}

interface Activity {
  title: string
  description: string
  meta: string
}

interface ContactItem {
  label: string
  value: string
  href: string
  external?: boolean
}

const techCategories: TechCategory[] = [
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
    technologies: ['Git', 'GitHub', 'VS Code', 'MongoDB', 'PostgreSQL', 'Docker', 'GraphQL']
  },
  {
    name: 'Languages',
    technologies: ['TypeScript', 'JavaScript', 'Python']
  }
]

const activities: Activity[] = [
  {
    title: 'Self Learning Programming',
    description: 'Belajar React, TypeScript, dan JavaScript secara mandiri',
    meta: '2024 - Sekarang'
  },
  {
    title: 'Game Development Practice',
    description: 'Membuat game menggunakan Construct 3',
    meta: 'Project: Cowboy Shooter'
  },
  {
    title: 'Web Development Exploration',
    description: 'Membangun website dengan React + Tailwind',
    meta: 'Membuat UI modern & responsive'
  },
  {
    title: 'Version Control Learning',
    description: 'Menggunakan Git & GitHub untuk manage project',
    meta: 'Collaborative workflow'
  }
]

const contacts: ContactItem[] = [
  {
    label: 'Email',
    value: 'galvinalfito@gmail.com',
    href: 'mailto:galvinalfito@gmail.com'
  },
  {
    label: 'LinkedIn',
    value: 'Galvin Alfito D',
    href: 'https://www.linkedin.com/in/galvin-alfito-506494390/',
    external: true
  }
]

const TechStack = () => {
  return (
    <div className="w-full max-w-2xl border-t border-white/10">
      {techCategories.map((category, idx) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
          className="grid grid-cols-1 gap-1 border-b border-white/10 py-4 sm:grid-cols-[130px_1fr] sm:gap-6"
        >
          <h3 className="font-pixel text-sm tracking-wide text-yellow-300">
            {category.name}
          </h3>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {category.technologies.map((tech, i) => (
              <React.Fragment key={tech}>
                {i > 0 && (
                  <span className="select-none text-white/20" aria-hidden="true">
                    /
                  </span>
                )}
                <span className="text-sm text-white/70 transition-colors duration-200 hover:text-white">
                  {tech}
                </span>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const Experiences = () => {
  return (
    <div className="relative mx-auto mt-[10vh] max-w-5xl space-y-16 px-4 sm:px-6">
      {/* Education & Experience */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <section id="education">
          <TitleSummaries text="Education" observeId="education" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="group mt-6 border-l border-white/15 pl-5 transition-colors duration-300 hover:border-yellow-300/60"
          >
            <h3 className="font-pixel text-lg leading-snug text-white transition-colors duration-300 group-hover:text-yellow-300">
              SMKN 2 Nganjuk
            </h3>
            <p className="mt-1 text-sm text-white/70">
              PPLG (Pengembangan Perangkat Lunak dan Gim)
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/35">
              Nganjuk &nbsp;·&nbsp; 2023 - {new Date().getFullYear()}
            </p>
          </motion.div>
        </section>

        <section id="experiences">
          <TitleSummaries text="Experiences" observeId="experiences" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="group mt-6 border-l border-white/15 pl-5 transition-colors duration-300 hover:border-yellow-300/60"
          >
            <h3 className="font-pixel text-lg leading-snug text-white transition-colors duration-300 group-hover:text-yellow-300">
              Freelance / Personal Project
            </h3>
            <p className="mt-1 text-sm text-white/70">Frontend &amp; Backend</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-white/35">
              2025 - Sekarang
            </p>
          </motion.div>
        </section>
      </div>

      {/* Selected Activities */}
      <section id="selected-activities">
        <TitleSummaries text="Selected Activities" observeId="selected-activities" />

        <ul className="mt-6 border-t border-white/10">
          {activities.map((activity, index) => (
            <motion.li
              key={activity.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group border-b border-white/10"
            >
              <div className="grid grid-cols-[30px_1fr] gap-4 py-5 transition-transform duration-300 ease-out group-hover:translate-x-1 sm:gap-6">
                <span className="font-pixel text-xs text-white/25 transition-colors duration-300 group-hover:text-yellow-300/70 pt-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3 className="font-pixel text-base text-white transition-colors duration-300 group-hover:text-yellow-300">
                    {activity.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/60">{activity.description}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/35">
                    {activity.meta}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Certificate & Tech Stack */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[360px_1fr] lg:items-start">
        <section id="selected-certificate">
          <TitleSummaries text="Selected Certificate" observeId="selected-certificate" />

          <motion.a
            href="/Latika-1.png"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative mt-6 block overflow-hidden rounded-lg border border-white/15 bg-white/[0.02] p-1.5"
          >
            <img
              src="/Latika-1.png"
              alt="Certificate React"
              className="w-full rounded-md object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />

            <div className="pointer-events-none absolute inset-0 flex items-end bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="p-4 font-pixel text-xs text-yellow-300">
                View Certificate
              </span>
            </div>
          </motion.a>
        </section>

        <section id="tech" className="w-full">
          <TitleSummaries text="Tech Stack" observeId="tech" />
          
          <div className="mt-6">
            <TechStack />
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <WithCursorElement
              state={{
                element: {
                  element: (
                    <motion.img
                      src={PattrickImg}
                      alt="getting dizzy"
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 0.7 }}
                      exit={{ y: 100, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-[300px]"
                    />
                  ),
                  key: 'dizzy',
                  type: 'hover'
                }
              }}
            >
              <span className="font-pixel inline-flex items-center gap-2 text-lg text-yellow-200 lg:text-xl">
                And Keep Learning...
              </span>
            </WithCursorElement>
          </div>
        </section>
      </div>

      {/* Contact */}
      <section id="contact">
        <TitleSummaries text="Contact" observeId="contact" />

        <ul className="mt-6 border-t border-white/10">
          {contacts.map((contact, index) => (
            <motion.li
              key={contact.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="border-b border-white/10"
            >
              <a
                href={contact.href}
                {...(contact.external
                  ? { target: '_blank', rel: 'noreferrer' }
                  : {})}
                className="group flex flex-col gap-1 py-5 transition-transform duration-300 ease-out hover:translate-x-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="font-pixel text-sm text-white/40 transition-colors duration-300 group-hover:text-yellow-300">
                  {contact.label}
                </span>
                <span className="text-sm text-white transition-colors duration-300 group-hover:text-yellow-300 sm:text-base">
                  {contact.value}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Experiences
