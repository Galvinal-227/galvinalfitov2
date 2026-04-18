/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion'
import StaggerElementFooter from 'module/footer/stagger-element'
import React from 'react'

const Description = () => {
  const [hover, setHover] = React.useState(false)

  return (
    <div className="CONTAINER min-h-screen">
      <h1 className="MENU-CHANGE-SCALE-125 font-display text-6xl font-semibold text-secondary underline lg:text-8xl">Summary</h1>
      <div className="h-[20vh]"></div>
      <div className="flex flex-col">
        <h2 className="MENU-CHANGE-Y-100 font-poppins text-6xl font-semibold text-white lg:text-9xl">Galvin Alfito D</h2>
        <p className="MENU-CHANGE-Y-100 mt-4 font-poppins text-2xl text-secondary lg:text-3xl">
          - Want To MASTER Frontend | And Backend Development More -
        </p>
        
        <p className="MENU-CHANGE-Y-200 mt-10 text-justify font-poppins text-lg text-secondary lg:text-left lg:text-xl">
          <span className="font-semibold text-white">Hi there!</span> Nice to meet you! My name is{' '}
          <span className="font-semibold text-yellow-300">Galvin Alfito D</span>, a{' '}
          <span className="text-yellow-300">Web & Game Developer enthusiast</span> from East Java.
          <br />
          <br />
          I am currently a <span className="text-yellow-300">student in Software Engineering (PPLG)</span> who is passionate about building
          <span className="text-yellow-300"> modern web applications and simple games</span>.
          <br />
          <br />
          <span className="font-semibold text-white">What I Do</span>
          <br />
          I build projects using{' '}
          <span className="text-yellow-300">React, TailwindCSS, JavaScript, and TypeScript</span>, and explore backend development with{' '}
          <span className="text-yellow-300">Node.js</span>.
          <br />
          <br />
          <span className="font-semibold text-white">Projects</span>
          <br />
          Some of my projects include{' '}
          <span className="text-yellow-300">a game called "Cowboy Shooter"</span> and{' '}
          <span className="text-yellow-300">a game top-up website with chatbot features</span>.
          <br />
          <br />
          <span className="font-semibold text-white">Learning Journey</span>
          <br />
          I am continuously learning and improving my skills in{' '}
          <span className="text-yellow-300">frontend development, backend basics, and UI design</span>.
          <br />
          <br />
          <span className="text-yellow-300 text-xl font-semibold block text-center mt-4">
            I believe consistency and passion will turn me into a professional developer.
          </span>
        </p>

        {/* CODEFORCES BADGE SECTION */}
        <div className="MENU-CHANGE-Y-200 mt-10 flex flex-col items-center justify-center gap-6 md:flex-row">
          {/* Codewars Badge */}
          <a 
            href="https://www.codewars.com/users/Galvinal-227" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:scale-105"
          >
            <img 
              src="https://www.codewars.com/users/Galvinal-227/badges/large" 
              alt="Galvinal-227's Codewars Badge" 
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </a>
        </div>

        {/* DOWNLOAD CV BUTTON */}
        <a href="/galvin_alfito_cv.pdf" target="_blank" download title="download cv" className="MENU-CHANGE-Y-200 mt-10 w-fit" rel="noreferrer">
          <motion.div
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            className="relative rounded border border-white px-5 py-2 font-poppins capitalize text-white"
          >
            <span className="text-xl opacity-0">Download cv</span>
            <StaggerElementFooter
              aria-hidden
              to="0"
              triger={hover}
              from="-130%"
              perLetter
              tag="h2"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-xl font-medium leading-[1.3] text-white"
            >
              Download CV
            </StaggerElementFooter>
            <StaggerElementFooter
              aria-hidden
              to="130%"
              from="0"
              triger={hover}
              perLetter
              tag="h2"
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-xl font-medium leading-[1.3] text-white"
            >
              Download CV
            </StaggerElementFooter>
          </motion.div>
        </a>
      </div>
    </div>
  )
}

export default React.memo(Description)