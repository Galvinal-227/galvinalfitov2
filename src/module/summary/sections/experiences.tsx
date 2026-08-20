/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import TitleSummaries from '../title-summaries'
import PattrickImg from 'assets/images/pattrick.gif'
import { motion } from 'framer-motion'
import Experience from '../experience'
import WithCursorElement from 'components/common/with-cursor-element'

const TechStack = () => {
  const techCategories = [
    {
      name: "Frontend",
      technologies: ["React", "Next.js", "TailwindCSS", "Vite", "HTML"]
    },
    {
      name: "Backend",
      technologies: ["Node.js"]
    },
    {
      name: "Database & Tools",
      technologies: ["Git", "GitHub", "VS Code", "MongoDb", "PostgreSQL", "Docker", "GraphQL"]
    },
    {
      name: "Languages",
      technologies: ["TypeScript", "JavaScript", "Python"]
    }
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {techCategories.map((category, idx) => (
          <div
            key={category.name}
            className="rounded-lg border p-4 bg-transparent"
          >
            <h3 className="mb-4 font-pixel text-xl font-semibold text-yellow-300">
              {category.name}
            </h3>

            <div className="flex flex-wrap gap-3">
              {category.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-md border border-white/20 px-3 py-1 text-sm text-white transition hover:border-yellow-300 hover:text-yellow-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Experiences = () => {
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

  return (
    <div className="relative mt-[10vh] grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div id="education">
        <TitleSummaries text="Education" observeId="education" />
        <ul className="list-disc marker:text-white">
          <Experience
            notAllowed
            title="SMKN 2 Nganjuk - PPLG (Pengembangan Perangkat Lunak dan Gim)"
            sentences={['Nganjuk', `2023 - ${new Date().getFullYear()}`]}
            link="/"
          />
        </ul>
      </div>

      <div id="experiences">
        <TitleSummaries text="Experiences" observeId="experiences" />
        <ul className="list-disc marker:text-white">
          <Experience 
            title="Freelance / Personal Project" 
            sentences={['Frontend & Backend', '2025 - Sekarang']} 
            link="/" 
          />
        </ul>
      </div>

      <div id="selected-project">
        <TitleSummaries text="Selected Projects" observeId="selected-project" />
        <ul className="list-disc marker:text-white">
          {projects.slice(0, 3).map((project, index) => (
            <Experience 
              key={index}
              notAllowed 
              title={project.text1}
              sentences={[project.text3, project.text2]}
              link={project.link}
              className={index > 0 ? "mt-5" : ""}
            />
          ))}
        </ul>
      </div>  

      <div id="selected-activities">
        <TitleSummaries text="Selected Activities" observeId="selected-activities" />
        <ul className="list-disc marker:text-white">
          <Experience 
            notAllowed 
            title="Self Learning Programming" 
            sentences={['Belajar React, TypeScript, dan JavaScript secara mandiri', '2024 - Sekarang']} 
            link="/"
          />

          <Experience 
            notAllowed 
            title="Game Development Practice" 
            sentences={['Membuat game menggunakan Construct 3', 'Project: Cowboy Shooter']} 
            className="mt-5" 
            link="/"
          />

          <Experience 
            notAllowed 
            title="Web Development Exploration" 
            sentences={['Membangun website dengan React + Tailwind', 'Membuat UI modern & responsive']} 
            className="mt-5" 
            link="/"
          />

          <Experience 
            notAllowed 
            title="Version Control Learning" 
            sentences={['Menggunakan Git & GitHub untuk manage project', 'Collaborative workflow']} 
            className="mt-5" 
            link="/"
          />
        </ul>
      </div>

      <div id="selected-certificate">
        <TitleSummaries text="Selected Certificate" observeId="selected-certificate" />
        <div className="flex flex-wrap gap-6">
          <img
            src="/Latika-1.png"
            alt="Certificate React"
            className="w-[300px] rounded-lg shadow-lg hover:scale-105 transition"
          />
        </div>
      </div>
      
      <div className="lg:col-span-2" id="tech">
        <TitleSummaries text="Tech Stack" observeId="tech" />
        <TechStack />
        <div className="mt-6 text-center">
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
            <span className="font-pixel inline-flex items-center gap-2 text-xl text-yellow-200 lg:text-2xl">
              And Keep Learning... 
            </span>
          </WithCursorElement>
        </div>
      </div>
      
      <div id="contact">
        <TitleSummaries text="Contact" observeId="contact" />
        <ul className="list-disc marker:text-white">
          <Experience title="Email" sentences={['galvinalfito@gmail.com']} link="mailto:galvinalfito@gmail.com" />
          <Experience title="Linkedin" sentences={['Galvin Alfito D']} link="https://www.linkedin.com/in/galvin-alfito-506494390/" className="mt-5" />
        </ul>
      </div>
    </div>
  )
}

export default Experiences
