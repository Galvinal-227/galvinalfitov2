/* eslint-disable react/no-unescaped-entities */
import React, { useMemo, useCallback } from 'react'
import TitleSummaries from '../title-summaries'
import PattrickImg from 'assets/images/pattrick.gif'
import { motion } from 'framer-motion'
import Experience from '../experience'
import WithCursorElement from 'components/common/with-cursor-element'
import ReactIcon from 'assets/icons/React.png'
import NextJSIcon from 'assets/icons/Next.js.png'
import TailwindIcon from 'assets/icons/Tailwindcss6.png'
import HtmlIcon from 'assets/icons/HTML.png'
import ViteIcon from 'assets/icons/Vite.png'
import NodeJSIcon from 'assets/icons/Node.js.png'
import PythonIcon from 'assets/icons/Python.png'
import DockerIcon from 'assets/icons/DockerLogo.png'
import TypescriptIcon from 'assets/icons/TypeScript.png'
import VscIcon from 'assets/icons/VisualStudioLogoShadow.png'
import FigmaIcon from 'assets/icons/Figma.png'
import GithubIcon from 'assets/icons/Github.png'

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
      technologies: ["Git", "GitHub", "VS Code"]
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
            <h3 className="mb-4 font-poppins text-xl font-semibold text-yellow-300">
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
  return (
    <div className="relative mt-[10vh] grid grid-cols-1 gap-16 lg:grid-cols-2">
      <div id="education">
  <TitleSummaries text="Education" observeId="education" />
  <ul className="list-disc marker:text-white">
    <Experience
      notAllowed
      title="SMKN 2 Nganjuk - PPLG (Pengembangan Perangkat Lunak dan Gim)"
      sentences={['Nganjuk', `2023 - ${new Date().getFullYear()}`]}
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
    <Experience 
      notAllowed 
      title="Website Portfolio" 
      sentences={['Frontend Developer', 'React + Tailwind', '2026']} 
      link="/" 
    />
    <Experience
      notAllowed
      title="School Website"
      sentences={['Fullstack Developer', 'Website Pendidikan + Chatbot AI', '2026']}
      link="/"
      className="mt-5"
    />
    <Experience
      notAllowed
      title="Al Quran Digital"
      sentences={['Frontend Developer', 'React + TypeScript ', '2026']}
      link="/"
      className="mt-5"
    />
  </ul>
</div>  

<div id="selected-activities">
  <TitleSummaries text="Selected Activities" observeId="selected-activities" />
  <ul className="list-disc marker:text-white">
    
    <Experience 
      notAllowed 
      title="Self Learning Programming" 
      sentences={['Belajar React, TypeScript, dan JavaScript secara mandiri', '2024 - Sekarang']} 
    />

    <Experience 
      notAllowed 
      title="Game Development Practice" 
      sentences={['Membuat game menggunakan Construct 3', 'Project: Cowboy Shooter']} 
      className="mt-5" 
    />

    <Experience 
      notAllowed 
      title="Web Development Exploration" 
      sentences={['Membangun website dengan React + Tailwind', 'Membuat UI modern & responsive']} 
      className="mt-5" 
    />

    <Experience 
      notAllowed 
      title="Version Control Learning" 
      sentences={['Menggunakan Git & GitHub untuk manage project', 'Collaborative workflow']} 
      className="mt-5" 
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
            <span className="inline-flex items-center gap-2 text-xl text-yellow-200 lg:text-2xl">
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