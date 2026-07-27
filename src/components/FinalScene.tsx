import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useCallback } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import CombTeethTransition from './motion/CombTeethTransition'

export default function FinalScene() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const handleBooking = useCallback(() => navigate('/kontakt'), [navigate])
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [120, 0])
  const y2 = useTransform(scrollYProgress, [0, 1], [160, 0])
  const y3 = useTransform(scrollYProgress, [0, 1], [200, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden"
    >
      <CombTeethTransition count={32} className="absolute top-0 left-0 right-0" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.div style={{ y: reduced ? undefined : y1, opacity: reduced ? undefined : opacity }}>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[7rem] font-700 uppercase leading-[0.88] tracking-[0.02em] text-white">
            TVŮJ DALŠÍ
          </h2>
        </motion.div>

        <motion.div style={{ y: reduced ? undefined : y2, opacity: reduced ? undefined : opacity }}>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[7rem] font-700 uppercase leading-[0.88] tracking-[0.02em] text-gold-400">
            STŘIH ZAČÍNÁ
          </h2>
        </motion.div>

        <motion.div style={{ y: reduced ? undefined : y3, opacity: reduced ? undefined : opacity }}>
          <h2 className="font-display text-5xl sm:text-7xl lg:text-[7rem] font-700 uppercase leading-[0.88] tracking-[0.02em] text-white">
            TADY.
          </h2>
        </motion.div>

        <div className="mx-auto mt-8 h-px w-12 bg-gold-500/40" />

        <motion.p
          className="mx-auto mt-8 max-w-sm text-caption"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Rezervuj si svůj termín online.
        </motion.p>

        <motion.button
          onClick={handleBooking}
          data-cursor="cta"
          className="group relative mt-12 inline-flex items-center gap-3 border border-gold-500/50 bg-gold-500 px-12 py-5 text-cta overflow-hidden cursor-pointer"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="relative z-10">Rezervovat termín</span>
          <ArrowRight className="relative z-10 h-4 w-4" />
          <span className="absolute inset-0 bg-gold-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      </div>

      <CombTeethTransition count={32} className="absolute bottom-0 left-0 right-0" />
    </section>
  )
}
