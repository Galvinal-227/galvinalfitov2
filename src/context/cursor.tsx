import { Dispatch, SetStateAction, createContext, useState } from 'react'

export interface State {
  element?: {
    element: React.ReactElement | React.ReactNode | JSX.Element | null
    key: any
    type: 'hover' | 'cursor' | null | undefined
  } | null
  className?: string
  bgColor?: string
  speedCursor?: number | null
}

export interface CursorState {
  state?: State
  setState?: Dispatch<SetStateAction<State>>
}

export const CursorContext = createContext<CursorState>({})

const CursorProvider = ({ children }: any) => {
  const [state, setState] = useState<State>({
    className: `fixed transition-opacity transform !bg-transparent -translate-x-1/2 -translate-y-1/2 !pointer-events-none flex items-center justify-center z-[93]`,
    bgColor: 'bg-transparent'
  })

  return <CursorContext.Provider value={{ state, setState }}>{children}</CursorContext.Provider>
}

export default CursorProvider
