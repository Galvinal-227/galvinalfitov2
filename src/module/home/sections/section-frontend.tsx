import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AestetikImg from 'assets/images/aestetik.png'
import SatisfiedImg from 'assets/images/satisfied-thumbs-up.gif'
import FunctionalImg from 'assets/images/start-stop-engine.png'

export default function SectionFrontendDev() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const images = {
    functionality: FunctionalImg,
    aesthetics: AestetikImg,
    satisfaction: SatisfiedImg
  };

  return (
    <section 
      className="relative z-[1000] min-h-[100vh] w-full bg-secondary pt-10 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-[9999]"
            style={{ 
              left: mousePos.x + 20, 
              top: mousePos.y + 20,
              position: 'fixed',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.img 
              src={hoveredItem} 
              alt={hoveredItem}
              className="w-[200px] object-cover"
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="CONTAINER flex h-screen items-center justify-center">
        <p className="font-spartan text-6xl font-light xl:text-8xl 2xl:text-8xl 2xl:leading-loose text-center">
          <motion.span 
            className="inline-block cursor-pointer"
            whileHover={{ scale: 1.1, color: "#your-primary-color" }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredItem(images.functionality as any)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Functionality
          </motion.span>
          
          <span className="mx-4 inline-block"> + </span>
          
          <motion.span 
            className="inline-block cursor-pointer"
            whileHover={{ scale: 1.1, color: "#your-primary-color" }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredItem(images.aesthetics as any)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Aesthetics
          </motion.span>
          
          <span className="mx-4 inline-block"> = </span>
          
          <motion.span 
            className="inline-block cursor-pointer"
            whileHover={{ scale: 1.1, color: "#your-primary-color" }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoveredItem(images.satisfaction as any)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Satisfaction
          </motion.span>
        </p>
      </div>
    </section>
  )
}