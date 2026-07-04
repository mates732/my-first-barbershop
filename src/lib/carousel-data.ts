import { GALLERY } from './gallery'
import type { CarouselImage } from '../components/CircularCarousel'

const modules = import.meta.glob('/src/assets/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const instagramByFilename: Record<string, string> = {}
const altByFilename: Record<string, string> = {}
for (const entry of GALLERY) {
  const key = entry.image.normalize()
  if (entry.instagram) {
    instagramByFilename[key] = entry.instagram
  }
  if (entry.alt) {
    altByFilename[key] = entry.alt
  }
}

const sortedEntries: CarouselImage[] = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b))
  .map((key) => {
    const filename = (key.split('/').pop() ?? '').normalize()
    return {
      src: modules[key] as string,
      alt: altByFilename[filename] || filename.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' '),
      instagram: instagramByFilename[filename] || undefined,
    }
  })

export default sortedEntries
