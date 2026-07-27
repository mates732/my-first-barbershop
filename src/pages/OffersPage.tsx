import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, ArrowRight, Scissors } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Booking from '../components/Booking'
import { mainServices, additionalServices } from '../lib/data'

type Tab = 'main' | 'additional'

const tabs: { key: Tab; label: string }[] = [
  { key: 'main', label: 'Hlavní služby' },
  { key: 'additional', label: 'Doplňkové služby' },
]

function ServiceRow({ name, duration, price, index }: { name: string; duration: string; price: string; index: number }) {
  return (
  <Link
  to="/kontakt"
  className="group flex items-center justify-between gap-4 border-b border-gold-500/8 px-6 py-6 sm:px-8 hover:bg-ink-800/10 transition-colors duration-200"
  >
  <div className="flex items-center gap-4 sm:gap-6">
  <span className="font-serif text-2xl italic text-gold-500/50 sm:text-3xl group-hover:text-gold-400 transition-colors duration-200">
  0{index + 1}
  </span>
  <h3 className="text-heading-card group-hover:text-gold-300 transition-colors duration-200">{name}</h3>
  </div>
  <div className="flex flex-none flex-col items-end gap-1">
  {price && (
  <span className="font-display text-2xl font-700 text-gold-400 sm:text-3xl">{price}</span>
  )}
  <span className="flex items-center gap-1 text-decorative uppercase tracking-wider">
  <Clock className="h-3 w-3" />
  {duration}
  </span>
  </div>
  </Link>
  )
}

export default function OffersPage() {
  const [activeTab, setActiveTab] = useState<Tab>('main')
  const services = activeTab === 'main' ? mainServices : additionalServices

  return (
  <>
  <PageHeader
  eyebrow="Nabídka"
  title="Služby & ceník"
  subtitle="Každá služba začíná konzultací. Ceny jsou konečné, bez skrytých poplatků. Termín se potvrzuje do 24 hodin."
  />

  <section className="py-24 sm:py-36">
  <div className="mx-auto max-w-5xl px-5 sm:px-8">
  {/* Tab switcher */}
  <div className="flex justify-center gap-12 mb-14">
  {tabs.map((tab) => (
  <button
  key={tab.key}
  onClick={() => setActiveTab(tab.key)}
  className={`relative pb-1 font-display text-sm uppercase tracking-[0.15em] transition-colors duration-200 cursor-pointer ${
  activeTab === tab.key
  ? 'text-gold-400 font-600'
  : 'text-white/80 font-500 hover:text-white'
  }`}
  >
  {tab.label}
  {activeTab === tab.key && (
  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-10 bg-gold-400" />
  )}
  </button>
  ))}
  </div>

  {/* Active service list */}
  <div key={activeTab} className="overflow-hidden border border-gold-500/12 si-fade">
  {services.map((s, i) => (
  <ServiceRow key={s.id} name={s.name} duration={s.duration} price={s.price} index={i} />
  ))}
  </div>

  {/* Info note */}
  <div className="mt-10 flex flex-col items-start gap-4 border border-gold-500/12 bg-ink-900/40 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
  <div className="flex items-center gap-4">
  <Scissors className="h-8 w-8 flex-none text-gold-400" />
  <div>
  <h4 className="text-heading-card">
  Nevíš, co si vybrat?
  </h4>
  <p className="mt-1 text-body">
  Zavolaj nám a poradíme ti s výběrem podle tvého stylu.
  </p>
  </div>
  </div>
  <Link
  to="/kontakt"
  className="inline-flex flex-none items-center gap-2 border border-gold-500/30 px-6 py-3 font-display text-sm font-600 uppercase tracking-wider text-gold-200"
  >
  Kontakt
  <ArrowRight className="h-4 w-4" />
  </Link>
  </div>
  </div>
  </section>

  <Booking />
  </>
  )
}
