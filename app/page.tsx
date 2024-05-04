import Featured from './Featured'
import Hero from './Hero'
import InfoBoxes from './InfoBoxes'
import Recommended from './Recommended'

export default function HomePage() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Featured />
      <Recommended />
    </>
  )
}
