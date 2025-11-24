import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float, OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useStore } from '../store'
import * as THREE from 'three'
import SceneContent from './SceneContent' // We need to pass the mode prop to this!

// --- MAIN SCENE WRAPPER ---
export default function Scene({ mode = "presentation" }) {
  const { aqi, time } = useStore()

  // Atmosphere Logic
  const dayIntensity = Math.max(0.1, 1 - Math.abs(time - 12) / 6)
  const isNight = time < 6 || time > 18
  const cleanColor = isNight ? new THREE.Color('#000000') : new THREE.Color('#050505')
  const pollutedColor = new THREE.Color('#2a1510')
  const pollutionFactor = Math.min(1, aqi / 500)
  const bgHex = cleanColor.lerp(pollutedColor, pollutionFactor)

  return (
    <Canvas shadows camera={{ position: [0, 0, 7], fov: 35 }} gl={{ antialias: true }}>
      <color attach="background" args={[bgHex]} />
      <fog attach="fog" args={[bgHex, 5, 25]} /> 
      
      {/* LIGHTING */}
      <hemisphereLight intensity={0.5} groundColor="#000000" />
      <directionalLight position={[2, 5, 5]} intensity={1.5} color="white" />
      <spotLight position={[5, 5, 5]} intensity={dayIntensity * 10} castShadow angle={0.5} penumbra={1} color="white" />
      <spotLight position={[-5, 5, -5]} intensity={dayIntensity * 5} color="#00aaff" />
      <pointLight position={[0, 0, -5]} intensity={5 + pollutionFactor * 10} color={aqi > 300 ? "#ff4400" : "#00ff88"} distance={10} />

      <Environment preset="city" environmentIntensity={dayIntensity * 0.5} />

      {/* CONTENT */}
      <SceneContent mode={mode} />

    </Canvas>
  )
}