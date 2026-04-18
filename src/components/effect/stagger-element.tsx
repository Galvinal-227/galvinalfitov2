import { HTMLMotionProps, motion } from 'framer-motion'
import { Children, forwardRef } from 'react'

const tagMap = {
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  div: 'div'
}

export interface StaggerElementProps extends React.HTMLProps<HTMLParagraphElement> {
  perLetter?: boolean
  tag?: keyof typeof tagMap
  motionProps?: HTMLMotionProps<'p'>
}

const renderItem = (items: string[] | any[], motionProps?: HTMLMotionProps<'p'>) => {
  return items?.map((element: any, index: number) => {
    return (
      <span key={index} className="inline-block overflow-hidden">
        <motion.span className="stagger-item inline-block" {...motionProps}>
          {element}
        </motion.span>
      </span>
    )
  })
}

const StaggerElement = forwardRef(({ perLetter = true, tag = 'p', motionProps, ...props }: StaggerElementProps, ref) => {
  const splitChildren: any[] = []
  const sequence: any[] = []

  Children?.map(props?.children, (child) => {
    if (typeof child === 'string') {
      splitChildren.push(...child.split(' '))
      return
    }
    splitChildren.push(child)
  })

  splitChildren.forEach((child) => {
    const items = typeof child === 'string' ? (perLetter ? child.split('') : [child]) : child
    if (Array.isArray(items)) {
      items.push('\u00a0')
    }
    sequence.push(items)
  })

  const Tag = tagMap[tag] as any
  return (
    <Tag ref={ref} {...props}>
      {sequence.map((word, index) => {
        return (
          <span key={index} className="whitespace-nowrap">
            {renderItem(Array.isArray(sequence[index]) ? sequence[index].flat() : [sequence[index]], motionProps)}
          </span>
        )
      })}
    </Tag>
  )
})

StaggerElement.displayName = 'StaggerElement'

export default StaggerElement
