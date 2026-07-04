import { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info } from 'lucide-react'

interface ImageItem {
  id: number
  src: string
  alt: string
  span: string
  aspect: string
}

interface BentoGalleryProps {
  images: ImageItem[]
}

export default function BentoGallery({ images }: BentoGalleryProps) {
  const [selected, setSelected] = useState<ImageItem | null>(null)
  const [captionOpen, setCaptionOpen] = useState(false)

  const close = useCallback(() => setSelected(null), [])

  const openImage = useCallback((img: ImageItem) => {
    setCaptionOpen(false)
    setSelected(img)
  }, [])

  useEffect(() => {
    if (!selected) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [selected, close])

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 grid-flow-dense">
        {images.map((img) => (
          <motion.div
            key={img.id}
            layout
            className={`${img.span} ${img.aspect} relative overflow-hidden rounded-lg group cursor-pointer`}
            onClick={() => openImage(img)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-ink-950/0 group-hover:bg-ink-950/40 transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            >
              <motion.div
                className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selected.src}
                  alt={selected.alt}
                  className="w-full h-full object-contain rounded-lg max-h-[90vh]"
                />
                <button
                  onClick={close}
                  className="absolute top-3 right-3 z-10 p-3 rounded-full bg-ink-950/60 text-gold-300 hover:text-gold-100 hover:bg-ink-950/80 transition-colors"
                  aria-label="Zavřít galerii"
                >
                  <X size={24} />
                </button>
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 sm:px-8 sm:pb-8">
                {selected.alt && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCaptionOpen((v) => !v) }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink-950/60 text-gold-300 hover:bg-ink-950/80 hover:text-gold-100 transition-colors font-display text-xs font-600 uppercase tracking-wider"
                      aria-expanded={captionOpen}
                      aria-controls="lightbox-caption"
                    >
                      <Info size={16} />
                      Popis
                    </button>
                    <AnimatePresence>
                      {captionOpen && (
                        <motion.div
                          id="lightbox-caption"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                          <div className="mt-2 inline-block bg-ink-950/70 backdrop-blur-[2px] px-4 py-2.5 rounded-lg border border-white/5 max-w-lg">
                            <p className="text-sm text-ink-200 leading-snug">{selected.alt}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
