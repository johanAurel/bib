import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { colors } from '../../styles/tokens'

export default function GeometricShapes() {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const sceneRef = useRef(null)
  const shapesRef = useRef([])
  const mainShapeRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 60
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x0a0e27, 1)
    renderer.shadowMap.enabled = true
    containerRef.current.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const blueLight = new THREE.PointLight(0x0066FF, 1.5)
    blueLight.position.set(-20, 20, 30)
    blueLight.castShadow = true
    scene.add(blueLight)

    const goldLight = new THREE.PointLight(0xC9A84C, 1.2)
    goldLight.position.set(20, -20, 30)
    goldLight.castShadow = true
    scene.add(goldLight)

    // Create main geometric structure (hexagon center)
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)
    mainShapeRef.current = mainGroup

    // Main hexagon
    const hexGeometry = new THREE.ConeGeometry(15, 2, 6)
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0xC9A84C,
      emissive: 0xC9A84C,
      emissiveIntensity: 0.6,
      metalness: 0.3,
      roughness: 0.4,
    })
    const mainHexagon = new THREE.Mesh(hexGeometry, mainMaterial)
    mainHexagon.castShadow = true
    mainHexagon.receiveShadow = true
    mainGroup.add(mainHexagon)

    // Add inner details to main hexagon
    const innerRingGeometry = new THREE.TorusGeometry(10, 2, 32, 6)
    const innerRingMaterial = new THREE.MeshStandardMaterial({
      color: 0x0066FF,
      emissive: 0x0066FF,
      emissiveIntensity: 0.8,
      metalness: 0.4,
      roughness: 0.3,
    })
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial)
    innerRing.rotation.x = Math.PI / 2.5
    innerRing.castShadow = true
    mainGroup.add(innerRing)

    // Mini shapes that glow on hover
    const miniShapes = []

    // Create triangle shapes
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 6
      const x = Math.cos(angle) * 35
      const z = Math.sin(angle) * 35

      const triGeometry = new THREE.TetrahedronGeometry(4)
      const triMaterial = new THREE.MeshStandardMaterial({
        color: 0x0066FF,
        emissive: 0x0066FF,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.2,
      })
      const triangle = new THREE.Mesh(triGeometry, triMaterial)
      triangle.position.set(x, 5, z)
      triangle.castShadow = true
      triangle.receiveShadow = true
      scene.add(triangle)

      miniShapes.push({
        mesh: triangle,
        baseEmissiveIntensity: 0.3,
        maxEmissiveIntensity: 1.2,
        rotationSpeed: 0.005 + i * 0.002,
      })
    }

    // Create circle shapes
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2
      const x = Math.cos(angle) * 35
      const z = Math.sin(angle) * 35

      const sphereGeometry = new THREE.IcosahedronGeometry(3.5, 4)
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xC9A84C,
        emissive: 0xC9A84C,
        emissiveIntensity: 0.3,
        metalness: 0.4,
        roughness: 0.3,
      })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(x, -5, z)
      sphere.castShadow = true
      sphere.receiveShadow = true
      scene.add(sphere)

      miniShapes.push({
        mesh: sphere,
        baseEmissiveIntensity: 0.3,
        maxEmissiveIntensity: 1.3,
        rotationSpeed: -0.004 + i * 0.001,
      })
    }

    // Create octahedron shapes
    for (let i = 0; i < 2; i++) {
      const angle = (i / 2) * Math.PI + Math.PI / 4
      const x = Math.cos(angle) * 45
      const z = Math.sin(angle) * 45

      const octaGeometry = new THREE.OctahedronGeometry(4)
      const octaMaterial = new THREE.MeshStandardMaterial({
        color: 0x3385FF,
        emissive: 0x3385FF,
        emissiveIntensity: 0.3,
        metalness: 0.6,
        roughness: 0.2,
      })
      const octahedron = new THREE.Mesh(octaGeometry, octaMaterial)
      octahedron.position.set(x, 0, z)
      octahedron.castShadow = true
      octahedron.receiveShadow = true
      scene.add(octahedron)

      miniShapes.push({
        mesh: octahedron,
        baseEmissiveIntensity: 0.3,
        maxEmissiveIntensity: 1.4,
        rotationSpeed: 0.006,
      })
    }

    shapesRef.current = miniShapes

    // Raycaster for mouse picking
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

      mouse.x = mouseRef.current.x
      mouse.y = mouseRef.current.y

      // Check intersections with mini shapes
      const intersects = raycaster.intersectObjects(
        miniShapes.map((s) => s.mesh)
      )

      miniShapes.forEach((shape) => {
        shape.isHovered = false
      })

      intersects.forEach((intersection) => {
        const shape = miniShapes.find((s) => s.mesh === intersection.object)
        if (shape) {
          shape.isHovered = true
        }
      })

      raycaster.setFromCamera(mouse, camera)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      // Rotate main shape
      if (mainShapeRef.current) {
        mainShapeRef.current.rotation.x += 0.0005
        mainShapeRef.current.rotation.y += 0.0008
        mainShapeRef.current.rotation.z += 0.0002
      }

      // Animate mini shapes
      miniShapes.forEach((shape, index) => {
        shape.mesh.rotation.x += shape.rotationSpeed
        shape.mesh.rotation.y += shape.rotationSpeed * 1.2
        shape.mesh.rotation.z += shape.rotationSpeed * 0.8

        // Hover glow animation
        const targetIntensity = shape.isHovered
          ? shape.maxEmissiveIntensity
          : shape.baseEmissiveIntensity
        shape.mesh.material.emissiveIntensity +=
          (targetIntensity - shape.mesh.material.emissiveIntensity) * 0.1

        // Subtle float animation
        const floatOffset = Math.sin(Date.now() * 0.0003 + index) * 0.5
        shape.mesh.position.y += (floatOffset - shape.mesh.userData.lastFloatY || 0) * 0.1
        shape.mesh.userData.lastFloatY = floatOffset

        // Pulse when hovered
        if (shape.isHovered) {
          const pulse = 1 + Math.sin(Date.now() * 0.005 + index) * 0.15
          shape.mesh.scale.set(pulse, pulse, pulse)
        } else {
          shape.mesh.scale.lerp(
            new THREE.Vector3(1, 1, 1),
            0.1
          )
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)

      // Cleanup
      miniShapes.forEach((shape) => {
        shape.mesh.geometry.dispose()
        shape.mesh.material.dispose()
      })
      hexGeometry.dispose()
      mainMaterial.dispose()
      innerRingGeometry.dispose()
      innerRingMaterial.dispose()
      renderer.dispose()

      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
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
        pointerEvents: 'auto',
      }}
    />
  )
}
