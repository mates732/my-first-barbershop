import { BOOKING_URL, contact } from '../lib/data'
import { siteConfig } from '../config/site'

export default function Footer() {
  const { lat, lng } = siteConfig.contact.mapCoordinates
  const encodedName = encodeURIComponent(siteConfig.business.name)
  const addressHref = `https://www.google.com/maps/search/${encodedName}/@${lat},${lng},16z`

  return (
 <footer className="py-16 sm:py-20">
 <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
  {/* Info */}
 <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-supporting">
   <a href={addressHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300" aria-label="Otevřít adresu v mapách">{contact.address}, {contact.city}</a>
 <span className="hidden sm:inline text-decorative">·</span>
  <a href="javascript:void(0)" className="hover:text-gold-300" aria-label={`Zavolat na ${contact.phone}`}>
  {contact.phone}
  </a>
 <span className="hidden sm:inline text-decorative">·</span>
  <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer" className="hover:text-gold-300" aria-label={`Instagram ${contact.instagram}`}>{contact.instagram}</a>
 </div>

 {/* Booking */}
 <div className="mt-8">
 <a
 href={BOOKING_URL}
 target="_blank"
 rel="noopener noreferrer"
  className="inline-flex items-center gap-2 font-display text-xs font-600 uppercase tracking-[0.25em] text-gold-300"
 >
 Rezervovat termín
  <span className="block h-px w-6 bg-gold-500/40" />
 </a>
 </div>

 {/* Portfolio disclosure */}
 <p className="mt-12 text-decorative">
 Koncept webu vytvořený jako ukázkový projekt.
 </p>
 </div>
 </footer>
 )
}
