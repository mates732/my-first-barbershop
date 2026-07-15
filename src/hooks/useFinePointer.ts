import { useEffect, useState } from 'react'

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(pointer: fine)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const handler = (e: MediaQueryListEvent) => setFine(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return fine
}
