import PageHeader from '../components/PageHeader'
import BentoGallery from '../components/ui/bento-gallery'
import carouselImages from '../lib/carousel-data'

const order = [0, 2, 3, 4, 5, 6, 10, 7, 8, 9, 1, 11, 12]

const gridImages = order.map((i) => carouselImages[i])

const imageItems = gridImages.map((img, i) => ({
  id: i + 1,
  src: img.src,
  alt: img.alt,
  span: i === 0
    ? 'lg:col-span-2'
    : i === 10
      ? 'lg:row-span-2'
      : '',
  aspect: i === 0
    ? 'aspect-[16/9]'
    : i === 10
      ? 'aspect-[3/4]'
      : 'aspect-[4/5]',
}))

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
          <BentoGallery images={imageItems} />
        </div>
      </section>
    </>
  )
}
