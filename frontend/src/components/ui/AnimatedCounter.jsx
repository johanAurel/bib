import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Typography } from '../../styles/tokens'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const counterRef = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!counterRef.current) return

    const numValue = parseInt(value) || 0
    const obj = { count: 0 }

    gsap.to(obj, {
      count: numValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: counterRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
      onUpdate: () => {
        setDisplayValue(Math.round(obj.count))
      },
    })
  }, [value, duration])

  return (
    <div ref={counterRef} style={{ textAlign: 'center' }}>
      <p style={{ ...Typography.h2, fontSize: 48 }}>
        {displayValue}
        {suffix}
      </p>
    </div>
  )
}
