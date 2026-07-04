import Hero from '../components/Hero'
import About from '../components/About'
import CircularCarousel from '../components/CircularCarousel'
import carouselImages from '../lib/carousel-data'
import Services from '../components/Services'
import SocialProof from '../components/SocialProof'
import Contact from '../components/Contact'
import FinalScene from '../components/FinalScene'
import SectionTransition from '../components/SectionTransition'
import SectionHeading from '../components/SectionHeading'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'

export default function HomePage() {
  return (
  <div>
  <Hero />
  <About compact />

  <SectionTransition id="galerie" className={`relative ${SECTION_PADDING_Y}`} snap>
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
  <SectionHeading label="Galerie" className="mb-10" />
  <CircularCarousel
  images={carouselImages}
  showNav={true}
       showDots={false}
  className="w-full"
  />
  <div className="mt-10 text-center">
  <a
  href="/galerie"
  className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-gold-400 hover:text-gold-300 transition-colors"
  >
  Zobrazit celou galerii
  <span className="text-base leading-none">→</span>
  </a>
  </div>
  </div>
  </SectionTransition>

  <Services compact />
  <SocialProof />
  <Contact compact />
  <FinalScene />
  </div>
  )
}
