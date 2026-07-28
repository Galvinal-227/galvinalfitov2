import React from 'react'

const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const timeoutRef = React.useRef<any>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const debouncedCallback = (...args: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }

  return debouncedCallback
}

export default useDebounce
