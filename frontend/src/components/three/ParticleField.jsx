import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { colors } from '../../styles/tokens'

export default function ParticleField() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 100
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x080808, 1)
    containerRef.current.appendChild(renderer.domElement)

    // Particle geometry
    const particleCount = 1800
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 300
      positions[i + 1] = (Math.random() - 0.5) * 300
      positions[i + 2] = (Math.random() - 0.5) * 300
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.5,
      color: colors.gold,
      opacity: 0.4,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Animation
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate particles
      particles.rotation.x += 0.0001
      particles.rotation.y += 0.0002

      // Drift effect
      const positionAttribute = geometry.getAttribute('position')
      const posArray = positionAttribute.array

      for (let i = 0; i < posArray.length; i += 3) {
        posArray[i] += Math.sin(Date.now() * 0.0001 + i) * 0.02
        posArray[i + 1] += Math.cos(Date.now() * 0.00008 + i) * 0.02
      }
      positionAttribute.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // Mouse move effect
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      containerRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
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
      }}
    />
  )
}
