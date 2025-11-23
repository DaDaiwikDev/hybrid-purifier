import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10 px-6 z-30 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        <div className="flex items-center gap-3">
          <div className="scale-75"><Logo /></div>
          <div>
            <h3 className="text-white font-bold tracking-tight">EKOSPAXES</h3>
            <p className="text-xs text-white/40">Designed for Vikasit Bharath</p>
          </div>
        </div>

        <div className="flex gap-8 text-sm text-white/60">
          <a href="#" className="hover:text-white transition-colors">Simulation</a>
          <a href="#" className="hover:text-white transition-colors">Research PDF</a>
          <a href="#" className="hover:text-white transition-colors">Contact Team</a>
        </div>

        <p className="text-xs text-white/30">
          © 2025 3K5S SUBSIDARY EKOCHEZH . <br/> STEM Project ID: 53rd-RSBVP
        </p>
      </div>
    </footer>
  )
}