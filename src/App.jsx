import { ReactLenis } from 'lenis/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Simulation from './pages/Simulation'
import Technical from './pages/Technical' // Import new page

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/specs" element={<Technical />} /> {/* New Route */}
      </Routes>
    </Router>
  )
}