import { Link } from 'react-router-dom'
import { CalendarCheck, ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionTransition from './SectionTransition'
import SectionHeading from './SectionHeading'
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'

export default function Booking() {
 return (
 <SectionTransition id="rezervace" className={`relative overflow-hidden ${SECTION_PADDING_Y}`}>
 <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
 <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
 {/* Left: info */}
 <div>
  <Reveal>
  <SectionHeading label="Rezervace" />
  </Reveal>
 <Reveal delay={0.1}>
 <h2 className="text-display">
 Rezervuj si
 <br />
 <span className="text-display-accent">svůj termín</span>
 </h2>
 </Reveal>
  <Reveal delay={0.2}>
   <p className="mt-6 max-w-md text-body">
   Vyplň rezervační formulář a my se ti ozveme s potvrzením
   termínu do 24 hodin.
   </p>
  </Reveal>
 </div>

 {/* Right: premium booking card */}
 <Reveal delay={0.25} className="h-full">
  <div className="flex h-full flex-col border border-gold-500/12 bg-ink-900/50 p-8 sm:p-10">
 <div className="flex h-12 w-12 items-center justify-center border border-gold-500/20 bg-gold-500/5">
 <CalendarCheck className="h-6 w-6 text-gold-400" />
 </div>

  <h3 className="mt-6 font-display text-2xl font-600 uppercase leading-tight tracking-wide text-white">
  Rezervace<br />
   <span className="text-gold-400">online</span>
  </h3>

  <p className="mt-4 flex-1 text-body">
  Vyplň rezervační formulář na stránce kontaktu. Zvol si službu
  a preferovaný termín – ozveme se ti do 24 hodin.
  </p>

  <Link
  to="/kontakt"
   className="flex w-full items-center justify-center gap-3 border border-gold-500/50 bg-gold-500 px-8 py-5 text-cta"
  >
  Rezervovat termín
   <ArrowRight className="h-4 w-4" />
   </Link>
 </div>
 </Reveal>
 </div>
 </div>
 </SectionTransition>
 )
}
