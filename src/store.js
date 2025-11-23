import { create } from 'zustand'

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
  
  // ACTIONS
  setAqi: (value) => set({ aqi: value }),
  setTime: (value) => set({ time: value }),
  toggleXRay: () => set((state) => ({ xRayMode: !state.xRayMode })),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ simSpeed: speed, isPlaying: true }),

  // --- NEW DATA FETCHER (Calls YOUR API) ---
  fetchLiveAir: async (cityName) => {
    set({ loading: true, isPlaying: false });

    try {
      // Call our own Vercel Backend
      const res = await fetch(`/api/aqi?city=${cityName}`);
      const data = await res.json();

      set({
        city: data.city,
        aqi: data.aqi,
        pm25: data.pm25,
        pm10: data.pm10,
        // WAQI gives values in different scales, we normalize for visual impact
        nox: data.nox || (data.aqi * 0.05).toFixed(2), 
        sox: data.sox || (data.aqi * 0.02).toFixed(2),
        loading: false
      });

    } catch (err) {
      console.error("Fetch Failed", err);
      // Emergency Fallback (Client Side)
      set({ 
        city: "Connection Lost", 
        aqi: 0, 
        loading: false 
      });
    }
  }
}))