import Hero from '../components/Hero'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Services from '../components/Services'
import SocialProof from '../components/SocialProof'
import Contact from '../components/Contact'
import FinalScene from '../components/FinalScene'
import CombTeethTransition from '../components/motion/CombTeethTransition'

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About compact />
      <CombTeethTransition count={28} />
      <Gallery />
      <CombTeethTransition count={20} />
      <Services compact />
      <SocialProof />
      <Contact compact />
      <FinalScene />
    </div>
  )
}
