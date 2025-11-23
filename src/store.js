import { create } from 'zustand'

// OPTIONAL: API Key
const API_KEY = ""; 

export const useStore = create((set) => ({
  // STATE
  city: "Ready to Scan...",
  aqi: 150,
  pm25: 45, pm10: 80, nox: 0.05, sox: 0.02,
  
  time: 12,
  xRayMode: false,
  isPlaying: false,
  simSpeed: 1,
  loading: false,
  
  // *** CRITICAL: This allows the buttons to work ***
  interactionMode: 'orbit', 
  
  // ACTIONS
  setAqi: (value) => set({ aqi: value }),
  setTime: (value) => set({ time: value }),
  toggleXRay: () => set((state) => ({ xRayMode: !state.xRayMode })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ simSpeed: speed, isPlaying: true }),
  
  // *** CRITICAL: The Toggle Function ***
  setInteractionMode: (mode) => set({ interactionMode: mode }),

  // Data Fetcher
  fetchLiveAir: async (cityName) => {
    set({ loading: true, isPlaying: false });
    if (API_KEY) {
      try {
        const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
        const geoData = await geoRes.json();
        if (geoData.length > 0) {
          const { lat, lon, name } = geoData[0];
          const airRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
          const airData = await airRes.json();
          const raw = airData.list[0].components;
          set({
            city: name,
            aqi: Math.min(500, Math.round(raw.pm2_5 * 3)),
            pm25: raw.pm2_5, pm10: raw.pm10, nox: raw.no2, sox: raw.so2,
            loading: false
          });
          return;
        }
      } catch (err) { console.warn("API Failed"); }
    }
    setTimeout(() => {
      const isPolluted = ["delhi", "mumbai", "warangal", "beijing"].includes(cityName.toLowerCase());
      let simAqi = isPolluted ? Math.floor(Math.random() * 200 + 200) : Math.floor(Math.random() * 50 + 20);
      set({
        city: cityName.toUpperCase() + " (SIMULATED)",
        aqi: simAqi,
        pm25: Math.round(simAqi * 0.6), pm10: Math.round(simAqi * 1.1),
        nox: (simAqi * 0.04).toFixed(2), sox: (simAqi * 0.015).toFixed(2),
        loading: false
      });
    }, 1000);
  }
}))