import { useFrame } from '@react-three/fiber'
import { useScroll, Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useStore } from '../store'
import * as THREE from 'three'

// --- TIME ENGINE ---
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

export default function SceneContent() {
  const scroll = useScroll() 
  const { aqi, time, xRayMode } = useStore()
  
  // Refs
  const shellRef = useRef()
  const bioRef = useRef()
  const filterRef = useRef()
  const groupRef = useRef()
  const controlsRef = useRef() // Ref for OrbitControls

  // State to track if we are at the top
  const [atTop, setAtTop] = useState(true)

  useFrame((state, delta) => {
    const scrollOffset = scroll.offset
    
    // Check if we are at the top (Simulation Mode)
    const isAtTop = scrollOffset < 0.05
    if (atTop !== isAtTop) setAtTop(isAtTop)

    // --- PHASE 1: SIMULATION MODE (Top of Page) ---
    if (isAtTop) {
      // Fan Spin Physics
      const targetSpeed = aqi > 150 ? 3.5 : 0.5
      if (groupRef.current) groupRef.current.rotation.y += delta * targetSpeed
      
      // Snap parts back together
      if (shellRef.current) shellRef.current.position.y = THREE.MathUtils.lerp(shellRef.current.position.y, 0, 0.1)
      if (bioRef.current) bioRef.current.position.y = THREE.MathUtils.lerp(bioRef.current.position.y, 0.5, 0.1)
      if (filterRef.current) filterRef.current.position.y = THREE.MathUtils.lerp(filterRef.current.position.y, -0.8, 0.1)
    
    // --- PHASE 2: SCROLL EXPLOSION ---
    } else {
      // Stop spinning, rotate to front
      if (groupRef.current) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.05)
      }

      // Explode Parts
      if (shellRef.current) shellRef.current.position.y = THREE.MathUtils.lerp(0, 2.5, scrollOffset * 2) 
      if (bioRef.current) bioRef.current.position.y = THREE.MathUtils.lerp(0.5, 1.0, scrollOffset * 2)
      if (filterRef.current) filterRef.current.position.y = THREE.MathUtils.lerp(-0.8, -2.5, scrollOffset * 2)
    }
  })

  // Lighting Logic
  const dayIntensity = Math.max(0.05, 1 - Math.abs(time - 12) / 6)
  const isNight = time < 6 || time > 18
  const isPolluted = aqi > 150
  const emissionColor = isPolluted ? new THREE.Color("#ef4444") : new THREE.Color("#10b981")

  return (
    <>
      <TimeController />

      {/* LIGHTING */}
      <ambientLight intensity={dayIntensity * 0.3} />
      <spotLight position={[10, 10, 10]} intensity={dayIntensity * 6} castShadow color={isNight ? "#60a5fa" : "white"} />
      <pointLight position={[-10, 0, -10]} intensity={2} color="#3b82f6" />
      <Environment preset="studio" environmentIntensity={dayIntensity} />

      {/* MODEL GROUP */}
      <Float speed={atTop ? 2 : 0} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef} position={[0, 0, 0]}>
          
          {/* SHELL */}
          <mesh ref={shellRef} position={[0, xRayMode ? 0.5 : 0, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 2.8, 1.5]} />
            <meshPhysicalMaterial 
              color={xRayMode ? "#ffffff" : "#1c1c1e"} 
              roughness={0.15} metalness={0.9} 
              clearcoat={1} clearcoatRoughness={0.1}
              transparent={true} opacity={xRayMode ? 0.15 : 1} 
              wireframe={xRayMode}
              emissive={emissionColor} emissiveIntensity={isPolluted ? 0.8 : 0}
            />
          </mesh>
          
          {/* BIO REACTOR */}
          <mesh ref={bioRef} position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
            <meshBasicMaterial color="#10b981" wireframe={true} opacity={0.8} transparent />
          </mesh>

          {/* HEPA FILTER */}
          <mesh ref={filterRef} position={[0, -0.8, 0]}>
            <boxGeometry args={[1.2, 0.4, 1.2]} />
            <meshBasicMaterial color="#3b82f6" wireframe={true} opacity={0.8} transparent />
          </mesh>

        </group>
      </Float>

      <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
      
      {/* 
          CAMERA CONTROLS 
          - enabled: Only true when atTop is true
          - maxPolarAngle: Prevents looking under the floor
      */}
      <OrbitControls 
        ref={controlsRef}
        enabled={atTop} 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.5} 
      />
    </>
  )
}