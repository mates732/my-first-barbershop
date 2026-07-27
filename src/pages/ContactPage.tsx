import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Contact from '../components/Contact'
import Booking from '../components/Booking'
import Reveal from '../components/Reveal'
import { siteConfig } from '../config/site'

const faqItems = [
  {
    q: 'Jak probíhá rezervace?',
    a: 'Stačí vyplnit rezervační formulář na této stránce, zvolit službu a preferovaný termín. My se ti ozveme do 24 hodin s potvrzením.',
  },
  {
    q: 'Mohu přijít bez objednání?',
    a: 'Ano, ale doporučujeme rezervaci předem. Díky tomu si zajistíš preferovaný čas a nemusíš čekat.',
  },
  {
    q: 'Jaké služby nabízíte?',
    a: 'Specializujeme se na pánské střihy, úpravu vousů, tradiční holení břitvou a barvení vousů. Nabízíme také dětské střihy a kompletní balíčky.',
  },
  {
    q: 'Jaká je cenová relace?',
    a: 'Ceny se pohybují od 320 Kč za střih po 790 Kč za kompletní službu. Všechny ceny jsou konečné, bez skrytých poplatků.',
  },
  {
    q: 'Mohu zrušit nebo změnit rezervaci?',
    a: 'Ano, stačí nám zavolat nebo napsat nejpozději 2 hodiny předem. Změnu rádi zařídíme bez zbytečných komplikací.',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt & Rezervace"
        title="Rezervuj si termín"
        subtitle={`Rezervuj si svůj termín online nebo nás kontaktuj. Sídlíme v centru ${siteConfig.business.city}.`}
      />

      {/* Contact info + map */}
      <Contact />

      {/* FAQ */}
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-14 text-center">
            <Reveal>
              <div className="mb-5 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-gold-500/50" />
                <span className="font-serif text-sm italic tracking-wide text-gold-300">
                  FAQ
                </span>
                <span className="h-px w-10 bg-gold-500/50" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-display">
                Časté <span className="text-display-accent">dotazy</span>
              </h2>
            </Reveal>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <FaqItem question={item.q} answer={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Rezervace přes MyFox */}
      <Booking />
    </>
  )
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gold-500/12 bg-ink-900/40">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base font-600 uppercase tracking-wide text-white sm:text-lg">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-none text-gold-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="px-6 pb-5 text-body">
          {answer}
        </p>
      </div>
    </div>
  )
}
