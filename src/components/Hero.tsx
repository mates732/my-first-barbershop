import { useCallback, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { BOOKING_URL } from '../lib/data'
import { siteConfig } from '../config/site'
import { useReducedMotion } from '../hooks/useReducedMotion'

function GoldLine() {
  return (
    <motion.div
      className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: '45vw', opacity: 1 }}
      transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 480 }}
    />
  )
}

function CombSilhouette({ className = '' }: { className?: string }) {
  const teeth = 22
  return (
    <svg
      viewBox="0 0 160 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="50" y2="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#E0C27A" />
          <stop offset="0.3" stopColor="#D4B46A" />
          <stop offset="0.7" stopColor="#C9A65A" />
          <stop offset="1" stopColor="#B49A50" />
        </linearGradient>
        <linearGradient id="tg" x1="50" y1="0" x2="150" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#D4B46A" />
          <stop offset="0.5" stopColor="#C9A65A" />
          <stop offset="1" stopColor="#B49A50" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Spine */}
      <path
        d="M12 8 C12 4, 16 0, 22 0 L38 0 C44 0, 48 4, 48 8 L48 420 C48 420, 44 418, 38 418 L22 418 C16 418, 12 420, 12 416 Z"
        fill="url(#cg)"
      />
      {/* Teeth */}
      {Array.from({ length: teeth }).map((_, i) => {
        const y = 12 + i * (400 / teeth)
        const w = 80 + (i % 4) * 12 + Math.sin(i * 0.8) * 10
        return (
          <rect
            key={i}
            x="50"
            y={y}
            width={w}
            height="3.5"
            rx="1.5"
            fill="url(#tg)"
            opacity={0.55 + (i % 3) * 0.15}
          />
        )
      })}
    </svg>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()
  const [introPhase, setIntroPhase] = useState(reduced ? 'complete' : 'idle')
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const combY = useTransform(scrollYProgress, [0, 1], [0, -140])
  const combRotate = useTransform(scrollYProgress, [0, 1], [0, -6])
  const combX = useTransform(scrollYProgress, [0, 1], [0, 50])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.5])

  useEffect(() => {
    if (reduced) return
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setIntroPhase('line'), 200))
    timers.push(setTimeout(() => setIntroPhase('reveal'), 1400))
    timers.push(setTimeout(() => setIntroPhase('complete'), 2800))
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  const handleServicesClick = useCallback(() => {
    const el = document.getElementById('sluzby')
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] snap-start overflow-hidden"
    >
      {/* Gold light line */}
      {introPhase === 'line' && <GoldLine />}

      {/* Main hero content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introPhase === 'complete' || reduced ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 w-full max-w-7xl pt-[calc(200px+6vh)] pb-20 sm:pt-[260px] lg:pt-[320px]">

          {/* Brand mark — minimal comb symbol */}
          <motion.div
            className="relative z-10 mb-5 sm:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: introPhase === 'reveal' || introPhase === 'complete' || reduced ? 1 : 0 }}
            transition={{ duration: 1.2, delay: reduced ? 0 : 0.1 }}
          >
            <svg
              viewBox="0 0 80 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 sm:w-12 h-auto"
              aria-hidden="true"
            >
              {/* Spine */}
              <motion.path
                d="M1 2 L79 2"
                stroke="#D4B46A"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase === 'reveal' || introPhase === 'complete' || reduced ? 1 : 0 }}
                transition={{ duration: 1.4, delay: reduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Teeth — 7 with varied lengths */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const x = 6 + i * 11
                const lengths = [10, 14, 8, 16, 11, 13, 9]
                const len = lengths[i]
                return (
                  <motion.rect
                    key={i}
                    x={x}
                    y={5}
                    width="2.2"
                    height={len}
                    rx="1"
                    fill="#D4B46A"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: introPhase === 'reveal' || introPhase === 'complete' || reduced ? 1 : 0 }}
                    transition={{
                      duration: 0.7,
                      delay: reduced ? 0 : 0.6 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{ transformOrigin: `${x + 1.1}px 5px` }}
                  />
                )
              })}
            </svg>
          </motion.div>

          {/* Title — masked two-line reveal */}
          <div className="relative z-10 overflow-hidden">
            <motion.h1
              id="hero-heading"
              className="font-display uppercase leading-[0.88] text-center"
              style={{ y: titleY }}
            >
              <motion.span
                className="block text-white font-400 tracking-[0.12em] text-[2.65rem] sm:text-[3.5rem] md:text-[4.4rem] lg:text-[5.3rem] xl:text-[7rem]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: reduced ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {siteConfig.business.nameParts[0]}
              </motion.span>
              <motion.span
                className="block text-gold-400 font-400 tracking-[0.12em] text-[2.65rem] sm:text-[3.5rem] md:text-[4.4rem] lg:text-[5.3rem] xl:text-[7rem]"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: reduced ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                {siteConfig.business.nameParts[1]}
              </motion.span>
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="relative z-10 mt-6 sm:mt-8 max-w-xl text-center text-quote px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.6 }}
          >
            {siteConfig.business.tagline}
          </motion.p>

          {/* CTA — editorial text link */}
          <motion.div
            className="relative z-10 mt-8 sm:mt-10 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: reduced ? 0 : 0.8 }}
          >
            <a
              href={BOOKING_URL}
              data-cursor="cta"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-display text-sm sm:text-base font-600 uppercase tracking-[0.18em] text-gold-400 hover:text-gold-300 transition-colors duration-300"
            >
              {siteConfig.booking.label}
              <span className="relative inline-flex overflow-hidden">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gold-500/40 scale-x-100 group-hover:scale-x-100 transition-transform duration-500" />
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gold-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </a>

            <button
              onClick={handleServicesClick}
              className="group relative inline-flex items-center justify-center gap-1.5 mt-4 sm:mt-5 text-white/40 uppercase tracking-[0.15em] hover:text-gold-400 transition-colors duration-250 ease-out cursor-pointer text-xs"
            >
              Zobrazit služby
              <ArrowRight className="h-2.5 w-2.5 transition-all duration-250 ease-out group-hover:translate-x-1.5" />
              <span className="absolute inset-x-0 bottom-0 h-px bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-250 ease-out origin-left" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Golden comb — proper silhouette, metallic, enters from lower-right */}
      <motion.div
        className="absolute -right-10 sm:right-2 lg:right-8 bottom-[-60px] sm:bottom-auto sm:top-[55%] z-[5] pointer-events-none"
        style={{ y: combY, rotate: combRotate, x: combX }}
        initial={{ opacity: 0, x: 240, y: 80, rotate: 18 }}
        animate={{
          opacity: introPhase === 'complete' || reduced ? 0.2 : 0,
          x: 0,
          y: 0,
          rotate: 8,
        }}
        transition={{ duration: 1.8, delay: reduced ? 0 : 1.0, ease: [0.16, 1, 0.3, 1] }}
      >
        <CombSilhouette className="w-[90px] sm:w-[120px] lg:w-[160px] h-auto drop-shadow-[0_4px_24px_rgba(180,154,80,0.15)]" />
      </motion.div>

      {/* Scroll fade overlay */}
      <motion.div
        className="absolute inset-0 bg-ink-950 pointer-events-none z-30"
        style={{ opacity: overlayOpacity }}
      />
    </section>
  )
}
