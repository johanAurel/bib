import { useEffect, useRef, useState } from 'react'
import { colors } from '../../styles/tokens'

export default function CustomCursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [state, setState] = useState('default')

  useEffect(() => {
    const checkTouchDevice = () => {
      if (window.matchMedia('(hover: none)').matches) {
        setIsVisible(false)
        return
      }
      setIsVisible(true)
    }

    checkTouchDevice()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseenter', () => setIsVisible(true))
    window.addEventListener('mouseleave', () => setIsVisible(false))

    const links = document.querySelectorAll('a, button')
    links.forEach((el) => {
      el.addEventListener('mouseenter', () => setState('hover'))
      el.addEventListener('mouseleave', () => setState('default'))
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', () => setState('hover'))
        el.removeEventListener('mouseleave', () => setState('default'))
      })
    }
  }, [])

  const posX = useRef(0)
  const posY = useRef(0)
  const outerX = useRef(0)
  const outerY = useRef(0)

  const handleMouseMove = (e) => {
    posX.current = e.clientX
    posY.current = e.clientY

    if (innerRef.current) {
      innerRef.current.style.left = posX.current + 'px'
      innerRef.current.style.top = posY.current + 'px'
    }

    outerX.current += (posX.current - outerX.current) * 0.12
    outerY.current += (posY.current - outerY.current) * 0.12

    if (outerRef.current) {
      outerRef.current.style.left = outerX.current + 'px'
      outerRef.current.style.top = outerY.current + 'px'
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          backgroundColor: colors.gold,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease',
        }}
      />
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: state === 'hover' ? 40 : 12,
          height: state === 'hover' ? 40 : 12,
          border: `2px solid ${colors.gold}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease',
          opacity: 0.7,
        }}
      />
    </>
  )
}
