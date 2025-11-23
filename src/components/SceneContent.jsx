import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useStore } from '../store'
import * as THREE from 'three'

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

function SeriesXTower({ scrollOffset }) {
  const { aqi, xRayMode } = useStore()
  
  const groupRef = useRef()
  const casingRef = useRef(); const bioCoreRef = useRef(); const hepaRef = useRef(); const baseRef = useRef();

  useFrame((state, delta) => {
    // 1. INTERNAL FAN PHYSICS (Always spins, this gives it life)
    const targetSpeed = aqi > 150 ? 2.0 : 0.5
    if (bioCoreRef.current) bioCoreRef.current.rotation.y += delta * targetSpeed * 0.5

    // 2. SCROLL ANIMATION (Explosion)
    const explodeFactor = Math.min(1, scrollOffset * 2)

    if (casingRef.current) casingRef.current.position.y = THREE.MathUtils.lerp(0, 2.5, explodeFactor)
    if (bioCoreRef.current) bioCoreRef.current.position.y = THREE.MathUtils.lerp(0.5, 0.8, explodeFactor)
    if (hepaRef.current) hepaRef.current.position.y = THREE.MathUtils.lerp(-0.8, -2.0, explodeFactor)
    if (baseRef.current) baseRef.current.position.y = THREE.MathUtils.lerp(-1.4, -3.0, explodeFactor)
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

export default function SceneContent() {
  // GRAB THE MODE FROM STORE
  const { aqi, time, interactionMode } = useStore()
  
  const controlsRef = useRef()
  const [scrollOffset, setScrollOffset] = useState(0)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollY / viewportHeight))
      setScrollOffset(progress)
      setAtTop(scrollY < 50) 
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dayIntensity = Math.max(0.1, 1 - Math.abs(time - 12) / 6)
  const isNight = time < 6 || time > 18
  const cleanColor = isNight ? new THREE.Color('#000000') : new THREE.Color('#050505')
  const pollutedColor = new THREE.Color('#2a1510')
  const pollutionFactor = Math.min(1, aqi / 500)
  const bgHex = cleanColor.lerp(pollutedColor, pollutionFactor)

  return (
    <>
      <color attach="background" args={[bgHex]} />
      <fog attach="fog" args={[bgHex, 5, 25]} /> 
      <TimeController />
      
      <hemisphereLight intensity={0.5} groundColor="#000000" />
      <directionalLight position={[2, 5, 5]} intensity={1.5} color="white" />
      <spotLight position={[5, 5, 5]} intensity={dayIntensity * 10} castShadow angle={0.5} penumbra={1} color="white" />
      <spotLight position={[-5, 5, -5]} intensity={dayIntensity * 5} color="#00aaff" />
      <pointLight position={[0, 0, -5]} intensity={5 + pollutionFactor * 10} color={aqi > 300 ? "#ff4400" : "#00ff88"} distance={10} />

      <Environment preset="city" environmentIntensity={dayIntensity * 0.5} />

      {/* FLOAT: Speed is 0 to prevent any fighting */}
      <Float speed={atTop ? 2 : 0} rotationIntensity={0} floatIntensity={0.5}>
        <SeriesXTower scrollOffset={scrollOffset} />
      </Float>

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />
      
      {/* 
          --- THE FIX --- 
          autoRotate={interactionMode === 'orbit'}
          This is the built-in Three.js camera spinner. It works perfectly.
      */}
      <OrbitControls 
        ref={controlsRef}
        enabled={atTop} 
        enableZoom={false} 
        enablePan={false} 
        minPolarAngle={Math.PI / 2.5} 
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={interactionMode === 'orbit'} 
        autoRotateSpeed={2.0}
      />
    </>
  )
}