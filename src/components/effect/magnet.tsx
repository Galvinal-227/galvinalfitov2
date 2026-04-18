import { StateContext } from 'context/state'
import { Power4, TweenMax } from 'gsap'
import { moveMagnet } from 'lib/utils'
import { useContext, useEffect, useRef } from 'react'

type Props = React.HTMLProps<HTMLDivElement> & {
  children: any
  strength?: number
  layers?: string
}

const Magnet = ({ children, strength = 50, layers, ...props }: Props) => {
  const { state } = useContext(StateContext)
  const currentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (layers) {
      const layerElements = currentRef.current?.querySelectorAll(`.${layers}`)

      if (layerElements?.length) {
        layerElements.forEach((layer, i) => {
          layer.addEventListener('mousemove', (layerEvent) => {
            moveMagnet(layerEvent, strength - (i + 30))
          })
        })
      }

      if (layerElements?.length) {
        layerElements.forEach((layer) => {
          layer.addEventListener('mouseout', (layerEvent) => {
            TweenMax.to(layerEvent?.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut })
          })
        })
      }
    }

    currentRef.current?.addEventListener('mousemove', (e) => {
      moveMagnet(e, strength)
    })
    currentRef.current?.addEventListener('mouseout', (event) => {
      TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut })
    })
  }, [])

  if (state?.isSmallDevice) {
    return <div {...props}>{children}</div>
  }

  return (
    <div {...props}>
      <div ref={currentRef}>{children}</div>
    </div>
  )
}

export default Magnet
