import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei'
import { useStore } from '../store'
import { useRef } from 'react'
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

// --- HYBRID MODEL ---
function HybridModel() {
  const meshRef = useRef()
  const { aqi, xRayMode } = useStore()
  
  useFrame((state, delta) => {
    // Fan Speed: 0.5 (Clean) -> 4.0 (Dirty)
    const targetSpeed = aqi > 150 ? 4.0 : 0.5
    meshRef.current.rotation.y += delta * targetSpeed
  })

  const isPolluted = aqi > 150
  const emissionColor = isPolluted ? new THREE.Color("#ef4444") : new THREE.Color("#10b981")

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group position={[0, 0, 0]}>
        {/* SHELL */}
        <mesh ref={meshRef} position={[0, xRayMode ? 0.5 : 0, 0]} castShadow receiveShadow>
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
        
        {/* INTERNALS */}
        {xRayMode && (
          <group>
            {/* Bio Reactor */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.5, 0.5, 1.5, 32]} />
              <meshBasicMaterial color="#10b981" wireframe opacity={0.6} transparent />
            </mesh>
            {/* HEPA */}
            <mesh position={[0, -0.8, 0]}>
              <boxGeometry args={[1.2, 0.4, 1.2]} />
              <meshBasicMaterial color="#3b82f6" wireframe opacity={0.6} transparent />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  )
}

// --- MAIN SCENE ---
export default function Scene() {
  const { aqi, time } = useStore()

  // Lighting Logic
  const dayIntensity = Math.max(0.05, 1 - Math.abs(time - 12) / 6)
  const isNight = time < 6 || time > 18
  const bgHex = isNight ? '#000000' : (aqi > 200 ? '#1a0505' : '#050505')

  return (
    <Canvas shadows camera={{ position: [0, 0, 7], fov: 35 }} gl={{ antialias: true }}>
      <color attach="background" args={[bgHex]} />
      <fog attach="fog" args={[bgHex, 5, 25]} />

      <ambientLight intensity={dayIntensity * 0.3} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={dayIntensity * 6} castShadow color={isNight ? "#60a5fa" : "white"} />
      <pointLight position={[-10, 0, -10]} intensity={2} color="#3b82f6" />

      <TimeController />
      <HybridModel />

      <ContactShadows resolution={1024} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
      <Environment preset="studio" environmentIntensity={dayIntensity} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
    </Canvas>
  )
}