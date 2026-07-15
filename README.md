# Zlatý Hřeben — Premium Website Template

Premium single-page website template for service businesses (barbershops, hair salons, beauty studios, tattoo studios).

Built with React, TypeScript, Vite, Tailwind CSS v4, Framer Motion.

## Using as a Client Template

All business identity is centralized in one file:

```
src/config/site.ts
```

Edit this file to configure the template for a new client.

### 1. Business Name

```ts
business.name: 'Zlatý Hřeben'             // full display name
business.shortName: 'Zlatý Hřeben'        // short/header name
business.nameParts: ['ZLATÝ', 'HŘEBEN']   // split hero heading (2 parts)
```

### 2. Phone & Email

```ts
contact.phone: '+420 773 719 399'
contact.email: '...'                         // optional
```

### 3. Booking URL

```ts
booking.url: 'https://...'                   // booking system URL
booking.label: 'Rezervovat termín'           // button text
booking.system: 'MyFox'                      // booking system name
```

### 4. Social Links

```ts
social.instagram: 'https://www.instagram.com/...'
social.facebook: 'https://facebook.com/...'  // optional
social.tiktok: 'https://tiktok.com/...'      // optional
```

### 5. Logo & Branding

Replace the logo file:
```
public/fotky/logo.png         → main logo (used in animated header logo)
public/images/logo2.png       → favicon & apple-touch-icon
```

Update paths in `src/config/site.ts`:
```ts
branding.logo: '/fotky/logo.png'
branding.favicon: '/images/logo2.png'
```

### 6. Hero Background Image

Replace: `public/images/pozadi.jpg`

Referenced in:
- `src/App.tsx` (line ~112)
- `src/components/MenuOverlay.tsx` (line ~77)
- `index.html` (preload)

### 7. Gallery Images

Replace images in: `src/assets/gallery/`

Update alt texts in: `src/lib/gallery.ts`

The carousel auto-loads all `.jpg` files from `src/assets/gallery/` via `import.meta.glob`.

### 8. Services & Pricing

Edit in: `src/lib/data.ts`

```ts
export const mainServices: Service[] = [
  { id: 'unique-id', name: 'Service Name', duration: '30 min', price: '490 Kč' },
  // ...
]

export const additionalServices: Service[] = [
  // ...
]
```

### 9. SEO Metadata

Configured in `src/config/site.ts` and injected into `index.html` via Vite plugin:

```ts
seo.title: 'Business Name'
seo.description: 'Description for search engines...'
seo.ogTitle: 'Open Graph Title'
seo.ogDescription: 'Open Graph Description'
seo.lang: 'cs'                               // HTML lang attribute
```

### 10. Opening Hours

Edit in: `src/lib/data.ts`

```ts
export const openingHours = [
  { day: 'Pondělí', hours: '9:00 – 18:00' },
  // ...
]
```

## Running Locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

## Available Routes

| Path | Page |
|------|------|
| `/` | Homepage |
| `/nabidka` | Services & pricing |
| `/o-nas` | About us |
| `/galerie` | Photo gallery |
| `/kontakt` | Contact & map |

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- React Router v7
- Lucide React icons

## Project Structure

```
src/
├── config/site.ts          ← Business identity (edit this first)
├── lib/data.ts             ← Services, reviews, hours, nav links
├── lib/gallery.ts          ← Gallery metadata & alt texts
├── components/             ← Reusable UI components
├── pages/                  ← Route page components
├── foundation/             ← Design tokens & providers
└── assets/gallery/         ← Gallery images
public/
├── fotky/logo.png          ← Main logo
├── images/logo2.png        ← Favicon
└── images/pozadi.jpg       ← Background texture
```
