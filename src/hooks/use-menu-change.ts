import { StateContext } from 'context/state'
import { useAnimate, stagger } from 'framer-motion'
import { easeDefault } from 'lib/utils'
import React from 'react'

const animateMenuChange = [
  ['.MENU-CHANGE-Y-100', { y: 100 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-Y-100-STAGGER .CHILD-STAGGER', { y: 100 }, { ease: easeDefault as any, duration: 1, at: '<', delay: stagger(0.05) }],
  ['.MENU-CHANGE-Y-200', { y: 200 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-Y-200-STAGGER .CHILD-STAGGER', { y: 200 }, { ease: easeDefault as any, duration: 1, at: '<', delay: stagger(0.05) }],
  ['.MENU-CHANGE-SCALE-150', { scale: 1.5 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-SCALE-125', { scale: 1.25 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-SCALE-80', { scale: 0.9 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-OPACITY-0', { opacity: 0 }, { ease: easeDefault as any, duration: 1, at: '<' }]
]

const animateMenuChangeCancel = [
  ['.MENU-CHANGE-Y-100', { y: 0 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-Y-200', { y: 0 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-Y-100-STAGGER .CHILD-STAGGER', { y: 0 }, { ease: easeDefault as any, duration: 1, at: '<', delay: stagger(0.05) }],
  ['.MENU-CHANGE-Y-200-STAGGER .CHILD-STAGGER', { y: 0 }, { ease: easeDefault as any, duration: 1, at: '<', delay: stagger(0.05) }],
  ['.MENU-CHANGE-SCALE-125', { scale: 1 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-SCALE-80', { scale: 1 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-SCALE-150', { scale: 1 }, { ease: easeDefault as any, duration: 1, at: '<' }],
  ['.MENU-CHANGE-OPACITY-0', { opacity: 1 }, { ease: easeDefault as any, duration: 1, at: '<' }]
]

const useMenuChange = ({ asPreview }: { asPreview?: boolean }) => {
  const { state } = React.useContext(StateContext)
  const [scopeComponentWhenMenuChange, animateComponentWhenMenuChange] = useAnimate()

  React.useEffect(() => {
    if (asPreview) return
    if (state?.menuShow) {
      animateComponentWhenMenuChange(animateMenuChange as any)
      return
    }
    animateComponentWhenMenuChange(animateMenuChangeCancel as any)
  }, [state?.menuShow, asPreview])

  return scopeComponentWhenMenuChange
}

export default useMenuChange
