import Logo from './Logo'
import { Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 px-6 relative z-30">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-white">EKOSPAXES</span>
            </div>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm">
              Developing the next generation of bio-hybrid infrastructure for the "Vikasit Bharath" initiative.
              <br/><br/>
              Platinum Jubilee High School, Warangal.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Project</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer">Research Paper</li>
              <li className="hover:text-white transition-colors cursor-pointer">Simulation Logic</li>
              <li className="hover:text-white transition-colors cursor-pointer">Hardware Specs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4 text-white/40">
              <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-mono">
          <p>© 2025 Ekospaxes Project. All rights reserved.</p>
          <p>53rd RSBVP | Theme: STEM for Atmanirbhar Bharath</p>
        </div>

      </div>
    </footer>
  )
}