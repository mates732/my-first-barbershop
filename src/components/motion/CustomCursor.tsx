import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinePointer } from '../../hooks/useFinePointer'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type CursorState = 'default' | 'gallery' | 'service' | 'cta'

interface CursorLabel {
  state: CursorState
  label: string
}

const labels: CursorLabel[] = [
  { state: 'gallery', label: 'VIEW' },
  { state: 'service', label: 'DETAIL' },
  { state: 'cta', label: 'BOOK' },
]

export default function CustomCursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [visible, setVisible] = useState(false)
  const [state, setState] = useState<CursorState>('default')
  const raf = useRef(0)
  const target = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (!fine || reduced) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.15
      current.current.y += (target.current.y - current.current.y) * 0.15
      setPos({ x: current.current.x, y: current.current.y })
      raf.current = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    raf.current = requestAnimationFrame(tick)

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('[data-cursor="gallery"]')) setState('gallery')
      else if (el.closest('[data-cursor="service"]')) setState('service')
      else if (el.closest('[data-cursor="cta"]')) setState('cta')
      else setState('default')
    }
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [fine, reduced, visible])

  if (!fine || reduced) return null

  const activeLabel = labels.find((l) => l.state === state)

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      <motion.div
        className="absolute rounded-full border"
        animate={{
          x: pos.x - 10,
          y: pos.y - 10,
          opacity: visible ? 1 : 0,
          scale: state === 'default' ? 1 : 1.6,
          borderColor: state === 'cta' ? '#D4B46A' : 'rgba(255,255,255,0.4)',
        }}
        transition={{ scale: { duration: 0.2 }, borderColor: { duration: 0.2 } }}
        style={{ width: 20, height: 20, pointerEvents: 'none' }}
      />
      <AnimatePresence>
        {activeLabel && visible && (
          <motion.span
            key={activeLabel.state}
            className="absolute font-display text-[9px] font-600 uppercase tracking-[0.2em] text-gold-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, x: pos.x - 16, y: pos.y + 14 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            style={{ pointerEvents: 'none' }}
          >
            {activeLabel.label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
