import { useFrame } from '@react-three/fiber'
import { useScroll, Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import { useStore } from '../store'
import * as THREE from 'three'

// --- TIME CONTROLLER ---
function TimeController() {
  const { time, setTime, isPlaying, simSpeed } = useStore()
  useFrame((state, delta) => {
    if (isPlaying) {
      const timeShift = delta * simSpeed * 0.5 
      let newTime = time + timeShift
      if (newTime >= 24) newTime = 0
      if (newTime < 0) newTime = 24
      setTime(newTime)
    }
  })
  return null
}

// --- HIGH FIDELITY PROCEDURAL MODEL ---
function SeriesXTower() {
  const { aqi, xRayMode } = useStore()
  const groupRef = useRef()
  
  // Refs for Scrollytelling Parts
  const casingRef = useRef()
  const bioCoreRef = useRef()
  const hepaRef = useRef()
  const baseRef = useRef()

  // Fan Physics
  useFrame((state, delta) => {
    const targetSpeed = aqi > 150 ? 2.0 : 0.5
    // Rotate the internal bio-core to simulate water movement/fan
    if (bioCoreRef.current) bioCoreRef.current.rotation.y += delta * targetSpeed * 0.5
  })

  // Materials
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: "#111", roughness: 0.2, metalness: 0.8,
  })
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: "#ffffff", transmission: 0.9, opacity: 1, metalness: 0, roughness: 0, ior: 1.5, thickness: 0.1,
  })

  const algaeMaterial = new THREE.MeshPhysicalMaterial({
    color: "#00ff88", metalness: 0.2, roughness: 0.2,
    transmission: 0.4, opacity: 0.8, transparent: true,
    emissive: "#004422", emissiveIntensity: 2
  })

  const hepaMaterial = new THREE.MeshStandardMaterial({
    color: "#3b82f6", roughness: 0.8, wireframe: true
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      
      {/* 1. THE BASE (Electronics Housing) */}
      <mesh ref={baseRef} position={[0, -1.4, 0]} receiveShadow>
        <cylinderGeometry args={[0.8, 0.9, 0.4, 64]} />
        <primitive object={metalMaterial} />
      </mesh>

      {/* 2. THE HEPA FILTER (Internal) */}
      <mesh ref={hepaRef} position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.6, 32]} />
        <primitive object={hepaMaterial} />
      </mesh>

      {/* 3. THE BIO-REACTOR CORE (The Glowing Green Soul) */}
      <mesh ref={bioCoreRef} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 1.8, 32]} />
        <primitive object={algaeMaterial} />
      </mesh>

      {/* 4. THE OUTER CASING (Glass/Metal Hybrid) */}
      <group ref={casingRef}>
        {/* Top Cap */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 64]} />
          <primitive object={metalMaterial} />
        </mesh>
        
        {/* Main Glass Shell */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 2.6, 64]} />
          <primitive object={glassMaterial} />
        </mesh>

        {/* Structural Ribs (The Industrial Look) */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 2.5, 8]} />
          <meshStandardMaterial color="#222" wireframe />
        </mesh>
      </group>

    </group>
  )
}

export default function SceneContent() {
  const scroll = useScroll() 
  const { time } = useStore()
  
  const modelGroup = useRef()
  const [atTop, setAtTop] = useState(true)

  useFrame((state, delta) => {
    const scrollOffset = scroll.offset
    const isAtTop = scrollOffset < 0.05
    if (atTop !== isAtTop) setAtTop(isAtTop)

    // SCROLL ANIMATION: Break the tower apart
    if (modelGroup.current) {
      // Get children (This assumes the specific order in SeriesXTower)
      const base = modelGroup.current.children[0].children[0]
      const hepa = modelGroup.current.children[0].children[1]
      const bio = modelGroup.current.children[0].children[2]
      const casing = modelGroup.current.children[0].children[3]

      if (!isAtTop) {
        // Explode!
        casing.position.y = THREE.MathUtils.lerp(0, 2.5, scrollOffset * 2)
        bio.position.y = THREE.MathUtils.lerp(0.5, 0.8, scrollOffset * 2)
        hepa.position.y = THREE.MathUtils.lerp(-0.8, -2.0, scrollOffset * 2)
        base.position.y = THREE.MathUtils.lerp(-1.4, -3.0, scrollOffset * 2)
        
        // Rotate to show profile
        modelGroup.current.rotation.y = THREE.MathUtils.lerp(modelGroup.current.rotation.y, 0.5, 0.05)
      } else {
        // Reset
        casing.position.y = THREE.MathUtils.lerp(casing.position.y, 0, 0.1)
        bio.position.y = THREE.MathUtils.lerp(bio.position.y, 0.5, 0.1)
        hepa.position.y = THREE.MathUtils.lerp(hepa.position.y, -0.8, 0.1)
        base.position.y = THREE.MathUtils.lerp(base.position.y, -1.4, 0.1)
      }
    }
  })

  // Cinematic Lighting
  const dayIntensity = Math.max(0.1, 1 - Math.abs(time - 12) / 6)
  const isNight = time < 6 || time > 18

  return (
    <>
      <TimeController />
      
      {/* STUDIO LIGHTING RIG */}
      <ambientLight intensity={dayIntensity * 0.2} />
      <spotLight position={[5, 5, 5]} intensity={dayIntensity * 10} castShadow angle={0.5} penumbra={1} color="white" />
      <spotLight position={[-5, 5, -5]} intensity={dayIntensity * 5} color="#00aaff" />
      {/* Rim Light for that "Apple" Edge */}
      <pointLight position={[0, 0, -5]} intensity={5} color="#00ff88" />

      <Environment preset="city" environmentIntensity={dayIntensity * 0.5} />

      <Float speed={atTop ? 1 : 0} rotationIntensity={0.2} floatIntensity={0.2}>
        <group ref={modelGroup}>
          <SeriesXTower />
        </group>
      </Float>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />
      
      <OrbitControls enabled={atTop} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
    </>
  )
}