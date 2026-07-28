import { CursorContext, State as CursorState } from 'context/cursor'
import { StateContext } from 'context/state'
import { cleanObject } from 'lib/utils'
import { useContext } from 'react'

type Props = React.HTMLProps<HTMLDivElement> & {
  children?: any
  fallbackState?: CursorState
  state?: CursorState
  interupFallback?: boolean
  context?: typeof CursorContext
  speedCursor?: number
}

const WithCursorElement = ({ context, children, fallbackState, state, interupFallback, className, ...props }: Props) => {
  const { setState } = useContext(context || CursorContext)
  const { state: stateContext } = useContext(StateContext)

  const mouseEnter = () => {
    const st = cleanObject(state)
    if (setState)
      setState((prev) => ({
        ...prev,
        ...st
      }))
  }

  const mouseLeave = () => {
    if (interupFallback) {
      if (setState) setState((prev) => ({ ...prev, element: null }))
      return
    }
    const fallback = cleanObject(fallbackState)
    if (setState) setState((prev) => ({ ...prev, element: fallbackState?.element || null, ...fallback }))
  }

  return (
    <span
      onMouseEnter={!stateContext?.isSmallDevice ? mouseEnter : () => {}}
      onMouseLeave={!stateContext?.isSmallDevice ? mouseLeave : () => {}}
      className={`z-[92] inline w-fit ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default WithCursorElement
