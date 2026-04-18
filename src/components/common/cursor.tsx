import { CursorContext } from 'context/cursor'
import { AnimatePresence } from 'framer-motion'
import { useContext, useEffect, useRef } from 'react'
import clsx from 'clsx'
import { StateContext } from 'context/state'

interface Props {
  speed?: number
  context?: typeof CursorContext
}

const Cursor = ({ speed = 0.1, context }: Props) => {
  const { state } = useContext(context || CursorContext)
  const { state: stateContext } = useContext(StateContext)

  const cursorRef = useRef<any>()
  const cursorCoordinateRef = useRef({
    mouseX: -100,
    mouseY: -100,
    ballX: -100,
    ballY: -100
  })

  useEffect(() => {
    if (!cursorRef.current || stateContext?.isSmallDevice) return

    let mouseX = cursorCoordinateRef.current.mouseX
    let mouseY = cursorCoordinateRef.current.mouseY

    let ballX = cursorCoordinateRef.current.ballX
    let ballY = cursorCoordinateRef.current.ballY

    function animate() {
      const distX = mouseX - ballX
      const distY = mouseY - ballY

      ballX = ballX + distX * (state?.speedCursor ? state?.speedCursor : speed)
      ballY = ballY + distY * (state?.speedCursor ? state?.speedCursor : speed)

      cursorCoordinateRef.current.ballX = ballX + distX * (state?.speedCursor ? state?.speedCursor : speed)
      cursorCoordinateRef.current.ballY = ballY + distY * (state?.speedCursor ? state?.speedCursor : speed)

      if (cursorRef.current?.style) {
        cursorRef.current!.style.left = ballX + 'px'
        cursorRef.current!.style.top = ballY + 'px'
      }

      requestAnimationFrame(animate)
    }
    animate()

    const eventListener = (event: any) => {
      mouseX = event.clientX
      mouseY = event.clientY

      cursorCoordinateRef.current.mouseX = event.clientX
      cursorCoordinateRef.current.mouseY = event.clientY

      cursorRef.current?.classList.add('opacity-1')
      cursorRef.current?.classList.remove('opacity-0')
    }

    window.addEventListener('mousemove', eventListener)
    window.addEventListener('mouseout', () => {
      cursorRef.current?.classList.add('opacity-0')
      cursorRef.current?.classList.remove('opacity-1')
    })
    window.addEventListener('mouseover', () => {
      cursorRef.current?.classList.add('opacity-1')
      cursorRef.current?.classList.remove('opacity-0')
    })

    return () => {
      window.removeEventListener('mousemove', eventListener)
    }
  }, [state?.speedCursor, stateContext?.isSmallDevice])

  const classes = clsx(state?.className, state?.bgColor, 'opacity-0')

  if (stateContext?.isSmallDevice) return null

  return (
    <div className={classes} ref={cursorRef}>
      <AnimatePresence mode="sync">{state?.element?.element}</AnimatePresence>
    </div>
  )
}

export default Cursor
