import { Cursor } from './Cursor'
import { Particles } from './Particles'
import { Vignette } from './Vignette'
import { BiomeIndicator } from './BiomeIndicator'
import { ScrollProgress } from './ScrollProgress'
import { TransitionManager } from './TransitionManager'

export function GlobalUI() {
  return (
    <>
      <TransitionManager />
      <Particles />
      <Vignette />
      <Cursor />
      <BiomeIndicator />
      <ScrollProgress />
    </>
  )
}
