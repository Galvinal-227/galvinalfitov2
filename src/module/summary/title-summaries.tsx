import StaggerElementFooter from 'module/footer/stagger-element'
import React from 'react'

const TitleSummaries = ({ text, observeId }: { text: string; observeId: string }) => {
  const [hover, setHover] = React.useState(false)
  React.useEffect(() => {
    if (!observeId) return

    const hoverHandler = () => setHover(true)
    const hoverOutHandler = () => setHover(false)

    document.querySelector(`#${observeId}`)?.addEventListener('mouseover', hoverHandler)
    document.querySelector(`#${observeId}`)?.addEventListener('mouseout', hoverOutHandler)

    return () => {
      document.querySelector(`#${observeId}`)?.removeEventListener('mouseover', hoverHandler)
      document.querySelector(`#${observeId}`)?.removeEventListener('mouseout', hoverOutHandler)
    }
  }, [observeId])
  return (
    <div className="relative mb-[5vh] w-fit" style={{ borderBottom: '2px solid white' }}>
      <h2 className="font-display text-4xl font-semibold underline opacity-0">{text}</h2>
      <StaggerElementFooter
        aria-hidden
        to="0"
        triger={hover}
        from="-130%"
        perLetter
        tag="h2"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-4xl font-medium leading-[1.3] text-white"
      >
        {text}
      </StaggerElementFooter>
      <StaggerElementFooter
        aria-hidden
        to="130%"
        from="0"
        triger={hover}
        perLetter
        tag="h2"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 m-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-4xl font-medium leading-[1.3] text-white"
      >
        {text}
      </StaggerElementFooter>
    </div>
  )
}

export default React.memo(TitleSummaries)
