import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionReveal({ children, delay = 0 }) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    gsap.set(element, { opacity: 0, y: 50 })

    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) trigger.kill()
      })
    }
  }, [delay])

  return <div ref={elementRef}>{children}</div>
}
