import { ArrowLeft, ArrowRight, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BOOKING_URL } from '../lib/data'
import { siteConfig } from '../config/site'

const hasBookingUrl = /^https?:\/\//.test(BOOKING_URL)

export default function BookingRedirectPage() {
  return (
    <main className="relative flex min-h-[100svh] items-center justify-center px-5 py-28 sm:px-8">
      <div className="w-full max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-gold-500/20 bg-gold-500/5">
          <CalendarCheck className="h-7 w-7 text-gold-400" />
        </div>

        <p className="mt-8 text-kicker">Rezervace</p>
        <h1 className="mt-4 font-display text-5xl font-600 uppercase leading-[0.9] tracking-[0.08em] text-white sm:text-7xl">
          Vyber si
          <br />
          <span className="text-gold-400">svůj termín</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-body">
          Rezervace probíhá přes systém {siteConfig.booking.system}. Pokračuj do rezervačního systému,
          nebo se vrať zpět na web.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {hasBookingUrl ? (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 border border-gold-500/50 bg-gold-500 px-8 py-4 text-cta"
            >
              Pokračovat
              <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-3 border border-gold-500/50 bg-gold-500 px-8 py-4 text-cta"
            >
              Kontaktovat salon
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 font-display text-sm font-600 uppercase tracking-[0.18em] text-gold-200/80 transition-colors hover:text-gold-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Zpět domů
          </Link>
        </div>
      </div>
    </main>
  )
}
