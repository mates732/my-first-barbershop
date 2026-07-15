import PageHeader from '../components/PageHeader'
import Contact from '../components/Contact'
import Booking from '../components/Booking'
import { siteConfig } from '../config/site'

export default function ContactPage() {
 return (
 <>
 <PageHeader
 eyebrow="Kontakt"
 title="Najdi nás"
 subtitle={`Sídlíme v centru ${siteConfig.business.city}. Přijď si sednout do křesla nebo nám zavolaj.`}
 />
 <Contact />
 <Booking />
 </>
 )
}
