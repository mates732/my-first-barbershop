import { useState } from 'react'
import { mainServices, additionalServices, BOOKING_URL } from '../lib/data'
import type { Service } from '../lib/data'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { motion } from 'framer-motion'

const tabs = [
  { key: 'main', label: 'Základní služby' },
  { key: 'additional', label: 'Přídavné služby' },
] as const

type TabKey = (typeof tabs)[number]['key']

function ServiceRow({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: Service
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <a
      href={BOOKING_URL}
      data-cursor="service"
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault()
        onToggle()
      }}
      className="group relative block border-b border-gold-500/8 overflow-hidden"
    >
      <div className="flex items-baseline justify-between gap-4 px-5 sm:px-8 py-5 sm:py-7">
        {/* Index */}
        <span className="hidden sm:block font-serif text-sm italic text-gold-500/30 w-12 flex-none tabular-nums">
          0{index + 1}
        </span>

        {/* Service name - oversized */}
        <h3 className="flex-1 font-display text-2xl sm:text-4xl lg:text-5xl font-600 uppercase tracking-[0.04em] text-white/70 group-hover:text-white transition-colors duration-300">
          {service.name}
        </h3>

        {/* Price - reveals on hover */}
        <div className="flex items-baseline gap-3 flex-none">
          {service.duration && (
            <span className="hidden sm:inline text-[10px] font-sans uppercase tracking-[0.2em] text-ink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {service.duration}
            </span>
          )}
          {service.price && (
            <span className="font-display text-xl sm:text-2xl font-700 text-gold-400 tabular-nums">
              {service.price}
            </span>
          )}
        </div>
      </div>

      {/* Gold line reveal on hover */}
      <span className="absolute bottom-0 left-0 h-px bg-gold-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
    </a>
  )
}

export default function Services({ compact }: { compact?: boolean }) {
  const reduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState<TabKey>('main')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const services = activeTab === 'main' ? mainServices : additionalServices

  if (compact) {
    return (
      <section id="sluzby" className="relative py-[60px]">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-serif text-sm italic tracking-wide text-gold-300/60">
              Menu
            </span>
            <h2 className="mt-4 text-display">
              Služby & <span className="text-display-accent">ceny</span>
            </h2>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl px-5 sm:px-8">
          <div className="overflow-hidden border border-gold-500/12">
            {mainServices.slice(0, 3).map((s, i) => (
              <ServiceRow
                key={s.id}
                service={s}
                index={i}
                isExpanded={expandedId === s.id}
                onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
              />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-md text-center">
          <a
            href="/nabidka"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-gold-400 hover:text-gold-300 transition-colors"
          >
            Zobrazit všechny služby
            <span className="text-base leading-none">→</span>
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="sluzby" className="relative py-[60px]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-serif text-sm italic tracking-wide text-gold-300/60">
            Menu
          </span>
          <h2 className="mt-4 text-display">
            Služby & <span className="text-display-accent">ceny</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md">
            <span className="relative inline-block">
              <span className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-b from-black/18 to-transparent pointer-events-none" />
              <span className="text-caption" style={{ color: '#ece8e0', textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}>
                Každá služba začíná konzultací. Každý detail má svůj čas.
              </span>
            </span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-16 mb-10 max-w-4xl px-5 sm:px-8">
        <div className="flex justify-center gap-12">
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
                <motion.span
                  layoutId="service-underline"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-10 bg-gold-400"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Service rows */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div key={activeTab} className="overflow-hidden border border-gold-500/12">
          {services.map((s, i) => (
            <ServiceRow
              key={s.id}
              service={s}
              index={i}
              isExpanded={expandedId === s.id}
              onToggle={() => setExpandedId(expandedId === s.id ? null : s.id)}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-md text-center">
        <div className="mx-auto h-px w-8 bg-gold-500/30" />
        <p className="mt-4 text-decorative uppercase tracking-[0.2em]">
          Všechny ceny jsou konečné.
        </p>
      </div>
    </section>
  )
}
