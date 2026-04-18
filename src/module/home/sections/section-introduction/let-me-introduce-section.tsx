import StarrynightImg from '/Starrynight.webp'
import YourselfImg from 'assets/images/yourself.png'
import { StateContext } from 'context/state'
import { motion, useTransform } from 'framer-motion'
import useSpeedScrollElement from 'hooks/use-speed-scroll-element'
import StaggerSlideElementHome from 'module/home/stagger-slide-element'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LetMeIntroduceSection = ({ asPreview }: { asPreview: any }) => {
  const { state } = React.useContext(StateContext)
  const { t, i18n } = useTranslation()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)

  // Update waktu
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Update ketika bahasa berubah
  useEffect(() => {
    setCurrentTime(new Date()) // trigger re-render
  }, [i18n.language]) // ← lebih simpel

  // Dapatkan informasi baterai
  useEffect(() => {
    if ('getBattery' in navigator) {
      // @ts-ignore
      navigator.getBattery().then((battery) => {
        setBatteryLevel(Math.floor(battery.level * 100))
        
        const updateBattery = () => {
          setBatteryLevel(Math.floor(battery.level * 100))
        }
        
        battery.addEventListener('levelchange', updateBattery)
        return () => battery.removeEventListener('levelchange', updateBattery)
      })
    }
  }, [])

  const { ref: firstRef, scrollYProgress: fScrollY } = useSpeedScrollElement({ offset: ['start start', 'end end'] })
  const letMeIntroX = useTransform(fScrollY, [0, 1], ['0', '-100%'])
  const meSelfX = useTransform(fScrollY, [0, 1], ['0', '100%'])
  const asDevX = useTransform(fScrollY, [0, 1], ['0', '-70%'])
  const opacity1 = useTransform(fScrollY, [0, 1], [1, 0])
  const blurFirst = useTransform(fScrollY, [0.2, 0.3, 0.7], ['blur(0px)', 'blur(10px)', 'blur(2px)'])

  // Format waktu
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  
  // Format hari dan tanggal (dengan bahasa)
  const days = {
    id: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  }
  const months = {
    id: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
  
  const currentLang = i18n.language === 'id' ? 'id' : 'en'
  const dayName = days[currentLang][currentTime.getDay()]
  const date = currentTime.getDate()
  const month = months[currentLang][currentTime.getMonth()]
  
  const formattedDate = `${dayName}, ${date} ${month}`

  return (
    <div ref={firstRef} className="h-[200vh]">
      <motion.div style={{ opacity: opacity1, filter: blurFirst }} className="sticky top-0 flex h-screen flex-col justify-center ">
        <motion.div style={{ x: letMeIntroX }}>
          <StaggerSlideElementHome
            asPreview={asPreview}
            triger={state?.menuShow}
            className="text-center font-display text-6xl text-secondary md:text-8xl xl:text-8xl 2xl:text-[10rem]"
            perLetter={false}
            tag="h1"
          >
            {t('wasteYourTime')} 
          </StaggerSlideElementHome>
        </motion.div>
        <motion.div style={{ x: meSelfX }}>
          <StaggerSlideElementHome
            asPreview={asPreview}
            triger={state?.menuShow}
            tag="div"
            staggerDuration={0.3}
            className="text-center font-display text-6xl text-secondary md:text-8xl xl:text-8xl 2xl:text-[10rem]"
            perLetter={false}
          >
            {t('andTheWorld')} 
            <div className="hidden md:block relative group mt-4">
              <div className="backdrop-blur-sm inline-block">
                <div className="text-xs text-gray-400 font-mono text-left mb-1">
                  {formattedDate}
                </div>
                <div className="font-mono text-3xl text-white tracking-wider">
                  {formattedTime}
                </div>
                {batteryLevel !== null && (
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <div className="relative h-3 w-5 border border-gray-500 rounded-sm overflow-hidden">
                      <motion.div 
                        className="absolute left-0 top-0 h-full bg-green-500"
                        initial={{ width: '0%' }}
                        animate={{ width: `${batteryLevel}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="w-0.5 h-1.5 bg-gray-500 rounded-r-sm -ml-0.5" />
                    <span className="text-[10px] text-gray-400 font-mono">
                      {batteryLevel}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </StaggerSlideElementHome>
        </motion.div>
        <motion.div style={{ x: asDevX }}>
          <StaggerSlideElementHome
            asPreview={asPreview}
            triger={state?.menuShow}
            tag="div"
            staggerDuration={0.1}
            className="text-center font-display text-6xl text-secondary md:text-8xl xl:text-8xl 2xl:text-[10rem]"
            perLetter={false}
          >
            <div className="hidden h-[150px] w-[150px] overflow-hidden md:block">
            </div>
            {t('willWasteYou')}
          </StaggerSlideElementHome>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LetMeIntroduceSection