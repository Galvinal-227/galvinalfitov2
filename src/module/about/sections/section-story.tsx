/* eslint-disable react/no-unescaped-entities */
import Magnet from 'components/effect/magnet'
import { useTranslation } from 'lib/translations'
import LetterSpacingTitle from 'module/about/letter-spacing-title'
import { motion } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import { AiOutlineArrowDown } from 'react-icons/ai'

export default function SectionStory() {
  const { t, lang } = useTranslation()

  return (
    <section id="section-story-about" className="CONTAINER">
      <div className="h-[10vh] md:h-[15vh] lg:h-[30vh]"></div>
      <Magnet strength={10} className="z-[-10] mt-4 w-fit">
        <motion.div
          animate={{ width: '100px' }}
          initial={{ width: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          transition={{ duration: 1, ease: easeDefault }}
          className="MENU-CHANGE-OPACITY-0 flex h-[100px] items-center justify-center bg-yellow-300"
        >
          <Magnet>
            <AiOutlineArrowDown className="text-8xl" />
          </Magnet>
        </motion.div>
      </Magnet>
      <LetterSpacingTitle>{t('about_story_title')}</LetterSpacingTitle>
      <div className="MENU-CHANGE-Y-200-STAGGER flex max-w-3xl flex-col gap-6 pb-[10vh]">
        {lang === 'id' ? (
            <>
              <p className="CHILD-STAGGER font-pixel text-lg text-secondary lg:text-2xl">
                Saya adalah siswa SMK jurusan Pengembangan Perangkat Lunak dan Gim (PPLG)
                yang memiliki ketertarikan besar di dunia Full Stack Web Development.
                Sebagian besar kemampuan saya tidak datang dari kelas, tetapi dari
                mencoba, gagal, lalu membangun project nyata satu per satu.
              </p>

              <p className="CHILD-STAGGER font-pixel text-lg text-secondary lg:text-2xl">
                Perjalanan saya dimulai dari frontend menggunakan HTML, CSS, JavaScript,
                lalu berkembang ke React, Next.js, Tailwind CSS, hingga backend dengan
                Node.js, Express, Laravel, dan database seperti MySQL maupun MongoDB.
                Saya senang memahami bagaimana sebuah aplikasi bekerja dari tampilan
                hingga server.
              </p>

              <p className="CHILD-STAGGER font-pixel text-lg text-secondary lg:text-2xl">
                Bagi saya, belajar bukan sekadar menghafal teori, tetapi terus mencoba
                teknologi baru dan menyelesaikan tantangan melalui project. Website ini
                menjadi tempat saya mendokumentasikan perjalanan, eksperimen, dan hal-hal
                baru yang saya pelajari setiap harinya.
              </p>
            </>
          ) : (
            <>
              <p className="CHILD-STAGGER font-pixel text-lg text-secondary lg:text-2xl">
                I'm a vocational high school student majoring in Software and Game
                Development with a strong passion for Full Stack Web Development. Most of
                what I know didn't come from textbooks—it came from building projects,
                making mistakes, and learning by doing.
              </p>

              <p className="CHILD-STAGGER font-pixel text-lg text-secondary lg:text-2xl">
                My journey started with frontend development using HTML, CSS, and
                JavaScript, then expanded into React, Next.js, Tailwind CSS, backend
                development with Node.js, Express, Laravel, and databases such as MySQL
                and MongoDB. I enjoy understanding how an application works from the user
                interface all the way to the server.
              </p>

              <p className="CHILD-STAGGER font-pixel text-lg text-secondary lg:text-2xl">
                For me, learning is about building, experimenting, and improving every
                single day. This website is where I document my journey, showcase what
                I've learned, and share the projects that help me grow as a developer.
              </p>
            </>
          )}
      </div>
    </section>
  )
}
