import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface EditorialRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p'
}

const lineVariants: Variants = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const wrapperVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export default function EditorialReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: EditorialRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.div
      className="overflow-hidden"
      variants={wrapperVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      style={{ delay } as React.CSSProperties}
    >
      <motion.div variants={lineVariants}>
        <Tag className={className}>{children}</Tag>
      </motion.div>
    </motion.div>
  )
}
