import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import carouselImages from '../lib/carousel-data'

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Galerie"
        subtitle="Nahlédni do našeho světa. Každá fotka vypráví příběh precizní práce a stylu."
      />
      <section className="py-24 sm:py-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {carouselImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
