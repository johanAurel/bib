import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { colors } from '../../styles/tokens'

gsap.registerPlugin(ScrollTrigger)

export default function NetworkMap() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imageRef = useRef(null)
  const animationFrameRef = useRef(null)
  const scrollStateRef = useRef({ progress: 0, velocity: 0 })

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const image = new Image()

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    // Load the network map image
    image.onload = () => {
      imageRef.current = image

      // Create gradient overlay for blue/gold blend
      const createOverlayCanvas = () => {
        const overlayCanvas = document.createElement('canvas')
        overlayCanvas.width = image.width
        overlayCanvas.height = image.height
        const overlayCtx = overlayCanvas.getContext('2d')

        // Draw the image
        overlayCtx.drawImage(image, 0, 0)

        // Apply blue/gold color overlay with blend modes
        overlayCtx.fillStyle = colors.blue
        overlayCtx.globalAlpha = 0.15
        overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height)

        overlayCtx.fillStyle = colors.gold
        overlayCtx.globalAlpha = 0.1
        overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height)

        // Add subtle glow effect
        overlayCtx.strokeStyle = colors.blueLight
        overlayCtx.globalAlpha = 0.05
        overlayCtx.lineWidth = 2
        overlayCtx.strokeRect(0, 0, overlayCanvas.width, overlayCanvas.height)

        return overlayCanvas
      }

      const overlayCanvas = createOverlayCanvas()

      // Animation state
      let animationState = {
        scale: 1,
        opacity: 1,
        offsetY: 0,
        glowIntensity: 0,
      }

      // Setup scroll trigger for parallax effect
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            scrollStateRef.current.progress = self.progress
            scrollStateRef.current.velocity = self.getVelocity()
          },
        },
      })

      scrollTimeline
        .to(
          animationState,
          {
            scale: 1.5,
            opacity: 0,
            offsetY: -200,
            duration: 1,
          },
          0
        )

      // Animation loop
      const animate = () => {
        animationFrameRef.current = requestAnimationFrame(animate)

        // Clear canvas
        ctx.fillStyle = colors.black
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        if (imageRef.current) {
          // Save context state
          ctx.save()

          // Apply transforms for parallax effect
          ctx.translate(canvas.width / 2, canvas.height / 2)

          // Scale and position based on scroll
          ctx.scale(animationState.scale, animationState.scale)
          ctx.globalAlpha = animationState.opacity

          // Apply offset
          ctx.translate(
            -image.width / 2,
            -image.height / 2 + animationState.offsetY
          )

          // Draw the overlay canvas (with blue/gold blend)
          ctx.drawImage(overlayCanvas, 0, 0)

          // Add animated glow effect
          ctx.globalCompositeOperation = 'screen'
          ctx.globalAlpha = Math.sin(Date.now() * 0.001) * 0.1 + 0.05
          ctx.fillStyle = colors.blueLight
          ctx.fillRect(0, 0, image.width, image.height)

          // Restore context
          ctx.globalCompositeOperation = 'source-over'
          ctx.restore()
        }
      }

      animate()

      // Handle window resize
      const handleResize = () => {
        resizeCanvas()
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }

    image.src = '/network-map.webp'
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
