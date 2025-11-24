/**
 * HoloShader - Lightweight procedural texture generator
 * Returns CSS background styles for organic/spectral effects.
 */

const NOISE_BASE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E")`;

export const getHoloGradient = (intensity = 1) => {
  return {
    backgroundImage: `
      ${NOISE_BASE},
      linear-gradient(125deg, 
        rgba(255,255,255,0.02) 0%, 
        rgba(255,255,255,0.05) 25%, 
        rgba(255,255,255,0.0) 50%, 
        rgba(255,255,255,0.02) 75%, 
        rgba(255,255,255,0.08) 100%
      ),
      radial-gradient(circle at 50% 0%, 
        rgba(16, 185, 129, ${0.1 * intensity}) 0%, 
        transparent 60%
      )
    `,
    backgroundSize: "200px 200px, 200% 200%, 100% 100%",
  };
};

export const getSpectralEdge = () => ({
  background: `
    linear-gradient(
      90deg, 
      transparent 0%, 
      rgba(16, 185, 129, 0.4) 25%, 
      rgba(59, 130, 246, 0.4) 50%, 
      rgba(16, 185, 129, 0.4) 75%, 
      transparent 100%
    )
  `,
  backgroundSize: "200% 100%",
});