import { motion, type Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface CombTeethTransitionProps {
  count?: number
  className?: string
}

const toothVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.03,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function CombTeethTransition({
  count = 24,
  className = '',
}: CombTeethTransitionProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className={`relative flex items-center justify-center gap-[2px] overflow-hidden py-2 ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[1.5px] bg-gold-500/30 origin-bottom"
          style={{
            height: `${12 + Math.sin(i * 0.5) * 6}px`,
          }}
          custom={i}
          variants={toothVariants}
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        />
      ))}
    </div>
  )
}
