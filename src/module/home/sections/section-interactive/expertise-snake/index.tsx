import { MotionValue, useTransform } from 'framer-motion'
import CssSnake from './css'
import HTMLSnake from './html'
import JavascriptSnake from './javascript'
import ReactSnake from './react'
import NextSnake from './next'
import TypecriptSnake from './typescript'
import PWASnake from './pwa'
import ReduxSnake from './redux'
import FirebaseSnake from './firebase'
import KeepLearningSnake from './keep-learning'
import React from 'react'

export default function ExpertiseSnake({ scrollY }: { scrollY: MotionValue<number> }) {
  const pathLength = useTransform(scrollY, [0, 0.3, 0.8], [0, 0, 1])
  const offsetDistance = useTransform(scrollY, [0, 0.3, 0.8], ['0%', '0%', '100%'])
  const opacity = useTransform(scrollY, [0, 0.3, 0.35], [0, 0, 1])

  return (
    <>
      <CssSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <HTMLSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <JavascriptSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <ReactSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <NextSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <TypecriptSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <PWASnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <ReduxSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <FirebaseSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
      <KeepLearningSnake offsetDistance={offsetDistance} pathLength={pathLength} opacity={opacity} />
    </>
  )
}
