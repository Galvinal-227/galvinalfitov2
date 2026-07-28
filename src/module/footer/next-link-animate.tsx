import StaggerElementFooter, { StaggerElementFooterProps } from './stagger-element'

const NextLinkAnimate = ({ isHover, text, ...props }: { isHover: boolean; text: string } & StaggerElementFooterProps) => {
  return (
    <>
      <StaggerElementFooter {...props} triger={isHover} to="0" from="-130%" perLetter>
        {text}
      </StaggerElementFooter>
      <StaggerElementFooter {...props} to="130%" from="0" triger={isHover} perLetter>
        {text}
      </StaggerElementFooter>
    </>
  )
}

export default NextLinkAnimate
