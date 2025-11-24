import { useFrame } from '@react-three/fiber'
import { ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useStore } from '../store'
import * as THREE from 'three'

// --- 3D MODEL COMPONENT ---
function SeriesXTower({ scrollOffset, mode }) {
  const { aqi, xRayMode } = useStore()
  const groupRef = useRef()
  const casingRef = useRef(); const bioCoreRef = useRef(); const hepaRef = useRef(); const baseRef = useRef();

  useFrame((state, delta) => {
    // --- BEHAVIOR 1: INTERACTIVE MODE (Simulation Page) ---
    if (mode === 'interactive') {
        // Always Spin Fan
        const targetSpeed = aqi > 150 ? 2.0 : 0.5
        if (bioCoreRef.current) bioCoreRef.current.rotation.y += delta * targetSpeed * 0.5
        
        // Reset positions (No Explosion)
        if (casingRef.current) casingRef.current.position.y = THREE.MathUtils.lerp(casingRef.current.position.y, 0, 0.1)
        // Allow X-Ray logic from Store to handle visibility if you have it, or just keep it solid
    } 
    
    // --- BEHAVIOR 2: PRESENTATION MODE (Home Page) ---
    else {
        // Gentle Idle Spin
        if (groupRef.current) groupRef.current.rotation.y += delta * 0.1

        // SCROLL EXPLOSION logic
        const explodeFactor = Math.min(1, scrollOffset * 2)
        if (casingRef.current) casingRef.current.position.y = THREE.MathUtils.lerp(0, 2.5, explodeFactor)
        if (bioCoreRef.current) bioCoreRef.current.position.y = THREE.MathUtils.lerp(0.5, 0.8, explodeFactor)
        if (hepaRef.current) hepaRef.current.position.y = THREE.MathUtils.lerp(-0.8, -2.0, explodeFactor)
        if (baseRef.current) baseRef.current.position.y = THREE.MathUtils.lerp(-1.4, -3.0, explodeFactor)
    }
  })

  // Materials
  const metalMaterial = new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.2, metalness: 0.8 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({ color: "#ffffff", transmission: 0.95, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.1 })
  const stressFactor = Math.min(1, aqi / 500)
  const healthyColor = new THREE.Color("#00ff88")
  const stressedColor = new THREE.Color("#ffaa00")
  const currentColor = healthyColor.lerp(stressedColor, stressFactor)
  const algaeMaterial = new THREE.MeshPhysicalMaterial({ color: currentColor, metalness: 0.2, roughness: 0.2, transmission: 0.4, opacity: 0.8, transparent: true, emissive: currentColor, emissiveIntensity: 1.5 })
  const hepaMaterial = new THREE.MeshStandardMaterial({ color: "#3b82f6", roughness: 0.8, wireframe: true })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh ref={baseRef} position={[0, -1.4, 0]} receiveShadow><cylinderGeometry args={[0.8, 0.9, 0.4, 64]} /><primitive object={metalMaterial} /></mesh>
      <mesh ref={hepaRef} position={[0, -0.8, 0]}><cylinderGeometry args={[0.7, 0.7, 0.6, 32]} /><primitive object={hepaMaterial} /></mesh>
      <mesh ref={bioCoreRef} position={[0, 0.5, 0]}><cylinderGeometry args={[0.6, 0.6, 1.8, 32]} /><primitive object={algaeMaterial} /></mesh>
      <group ref={casingRef}>
        <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.9, 0.9, 0.1, 64]} /><primitive object={metalMaterial} /></mesh>
        <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.9, 0.9, 2.6, 64]} /><primitive object={glassMaterial} /></mesh>
        <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.92, 0.92, 2.5, 8]} /><meshStandardMaterial color="#222" wireframe /></mesh>
      </group>
    </group>
  )
}

export default function SceneContent({ mode }) {
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    if (mode === 'presentation') {
      const handleScroll = () => {
        const scrollY = window.scrollY
        const viewportHeight = window.innerHeight
        const progress = Math.min(1, Math.max(0, scrollY / viewportHeight))
        setScrollOffset(progress)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [mode])

  return (
    <>
      <Float speed={mode === 'interactive' ? 0 : 2} rotationIntensity={0} floatIntensity={0.5}>
        <SeriesXTower scrollOffset={scrollOffset} mode={mode} />
      </Float>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />
      
      {/* ORBIT CONTROLS: Only active in SIMULATION mode */}
      <OrbitControls 
        enabled={mode === 'interactive'} 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}