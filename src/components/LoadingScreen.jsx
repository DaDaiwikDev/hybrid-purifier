import { useProgress } from '@react-three/drei'

export default function LoadingScreen() {
  const { progress } = useProgress()
  
  // Hide loader when done
  if (progress === 100) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white font-mono">
      <div className="text-4xl font-bold mb-4 tracking-tighter">EKOSPAXES</div>
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-200" 
          style={{ width: `${progress}%` }} 
        />
      </div>
      <div className="mt-2 text-xs opacity-50">INITIALIZING TWIN... {Math.round(progress)}%</div>
    </div>
  )
}