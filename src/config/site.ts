export interface SiteConfig {
  business: {
    name: string
    shortName: string
    nameParts: [string, string]
    tagline: string
    description: string
    city: string
    cityShort: string
    address: string
    postalCode: string
  }
  contact: {
    phone: string
    email?: string
    instagram: string
    mapQuery: string
    mapCoordinates: { lat: number; lng: number }
  }
  booking: {
    url: string
    label: string
    system: string
  }
  social: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
  branding: {
    logo: string
    logoAlt: string
    favicon: string
  }
  seo: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage?: string
    lang: string
  }
}

export const siteConfig: SiteConfig = {
  business: {
    name: 'Zlatý Hřeben',
    shortName: 'Zlatý Hřeben',
    nameParts: ['ZLATÝ', 'HŘEBEN'],
    tagline: 'Preciznost, kterou cítíš.',
    description:
      'Zlatý Hřeben je místo, kde se potkává poctivé řemeslo s moderním přístupem.',
    city: 'Brno',
    cityShort: 'CZ',
    address: 'Masarykova 42',
    postalCode:  '602 00 Brno',
  },

  contact: {
    phone: '+420 555 123 456',
    instagram: '@zlaty.hreben',
    mapQuery: 'Masarykova 42, Brno, Czech Republic',
    mapCoordinates: { lat: 49.1951, lng: 16.6068 },
  },

  booking: {
    url: 'javascript:void(0)',
    label: 'Rezervovat termín',
    system: 'MyFox',
  },

  social: {
    instagram: 'https://www.instagram.com/zlaty.hreben/',
  },

  branding: {
    logo: '',
    logoAlt: 'Zlatý Hřeben',
    favicon: '',
  },

  seo: {
    title: 'Zlatý Hřeben',
    description:
      'Zlatý Hřeben – exkluzivní pánské holičství v Brně. Prémiové střihy, úprava vousů a tradiční holení. Rezervuj svůj termín.',
    ogTitle: 'Zlatý Hřeben',
    ogDescription:
      'Exkluzivní pánské holičství v Brně. Prémiové střihy, úprava vousů a tradiční holení.',
    lang: 'cs',
  },
}
