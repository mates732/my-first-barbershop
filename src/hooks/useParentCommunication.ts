import { useEffect, useRef } from 'react'

export default function useParentCommunication() {
  const hasSentBottomRef = useRef(false)
  const hasSentTopRef = useRef(false)
  const touchStartYRef = useRef(0)

  useEffect(() => {
    window.parent.postMessage({ type: 'zlaty-hreben-ready' }, '*')

    function handleScroll() {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5

      if (atBottom && !hasSentBottomRef.current) {
        hasSentBottomRef.current = true
        window.parent.postMessage({ type: 'zlaty-hreben-scroll-end' }, '*')
      }

      if (!atBottom) {
        hasSentBottomRef.current = false
      }

      if (window.scrollY > 0) {
        hasSentTopRef.current = false
      }
    }

    function handleWheel(e: WheelEvent) {
      if (window.scrollY <= 0 && e.deltaY < 0 && !hasSentTopRef.current) {
        hasSentTopRef.current = true
        window.parent.postMessage({ type: 'zlaty-hreben-scroll-start' }, '*')
      }
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0].clientY
    }

    function handleTouchMove(e: TouchEvent) {
      if (window.scrollY <= 0 && !hasSentTopRef.current) {
        if (e.touches[0].clientY > touchStartYRef.current) {
          hasSentTopRef.current = true
          window.parent.postMessage({ type: 'zlaty-hreben-scroll-start' }, '*')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
}
