import { useEffect, useRef } from 'react'

export default function useParentCommunication() {
  const hasSentRef = useRef(false)

  useEffect(() => {
    window.parent.postMessage({ type: 'zlaty-hreben-ready' }, '*')

    function handleScroll() {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5

      if (atBottom && !hasSentRef.current) {
        hasSentRef.current = true
        window.parent.postMessage({ type: 'zlaty-hreben-scroll-end' }, '*')
      }

      if (!atBottom) {
        hasSentRef.current = false
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}
