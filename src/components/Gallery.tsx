import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import carouselImages from '../lib/carousel-data'
import { useReducedMotion } from '../hooks/useReducedMotion'

const galleryMeta = [
  { idx: '01', title: 'PRECISION CUT', location: 'BRNO' },
  { idx: '02', title: 'DETAIL', location: 'ZLATÝ HŘEBEN' },
  { idx: '03', title: 'CRAFT', location: 'EST. 2026' },
  { idx: '04', title: 'TEXTURE', location: 'BRNO' },
  { idx: '05', title: 'LINE WORK', location: 'ZLATÝ HŘEBEN' },
  { idx: '06', title: 'FADE', location: 'BRNO' },
  { idx: '07', title: 'ATMOSPHERE', location: 'ZLATÝ HŘEBEN' },
  { idx: '08', title: 'STYLING', location: 'BRNO' },
  { idx: '09', title: 'FINISH', location: 'ZLATÝ HŘEBEN' },
  { idx: '10', title: 'VISION', location: 'BRNO' },
  { idx: '11', title: 'TOOLS', location: 'ZLATÝ HŘEBEN' },
  { idx: '12', title: 'FORM', location: 'BRNO' },
  { idx: '13', title: 'CUT', location: 'ZLATÝ HŘEBEN' },
]

function GalleryItem({
  img,
  meta,
  index,
}: {
  img: { src: string; alt: string }
  meta: (typeof galleryMeta)[number]
  index: number
}) {
  return (
    <div
      data-cursor="gallery"
      className="relative flex-shrink-0 w-[70vw] sm:w-[55vw] lg:w-[42vw] h-[50vh] sm:h-[60vh] lg:h-[70vh] group"
    >
      <div className="relative w-full h-full overflow-hidden bg-ink-900">
        <img
          src={img.src}
          alt={img.alt}
          loading={index < 3 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Editorial metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <div>
          <span className="block font-display text-[10px] font-600 uppercase tracking-[0.3em] text-gold-400/70">
            {meta.idx}
          </span>
          <span className="block font-display text-sm font-600 uppercase tracking-[0.12em] text-white mt-1">
            {meta.title}
          </span>
        </div>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink-400">
          {meta.location}
        </span>
      </div>
    </div>
  )
}

export default function Gallery() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['5%', '-55%'])

  const images = carouselImages.slice(0, 13)

  return (
    <section ref={trackRef} className="relative h-[250vh] sm:h-[200vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section label */}
        <div className="px-5 sm:px-8 mb-6 sm:mb-10">
          <span className="font-serif text-sm italic tracking-wide text-gold-300/60">
            Galerie
          </span>
        </div>

        {/* Horizontal track */}
        <motion.div
          className="flex gap-6 sm:gap-8 px-5 sm:px-8"
          style={{ x: reduced ? undefined : x }}
        >
          {images.map((img, i) => (
            <GalleryItem
              key={i}
              img={img}
              meta={galleryMeta[i] || galleryMeta[0]}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
