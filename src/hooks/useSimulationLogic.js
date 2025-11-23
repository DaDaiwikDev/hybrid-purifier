import { useStore } from '../store'

export function useSimulationLogic() {
  const { aqi, time } = useStore()

  // 1. LOAD (30W to 280W)
  const loadWatts = Math.round(30 + (aqi / 600) * 250)

  // 2. SOLAR
  const sunIntensity = Math.max(0, 1 - Math.abs(time - 12) / 6.5)
  const solarWatts = Math.round(sunIntensity * 480)

  // 3. BATTERY
  let batteryPct = 0
  const isDay = time >= 6 && time <= 18
  if (isDay) {
    batteryPct = Math.round(20 + ((time - 6) / 12) * 80)
  } else {
    const nightHours = time > 18 ? time - 18 : time + 6
    batteryPct = Math.max(0, Math.round(100 - (nightHours / 12) * 80))
  }

  // 4. STATUS
  const netPower = solarWatts - loadWatts
  let status = "IDLE"
  let gridDraw = 0
  
  if (isDay && batteryPct < 99) {
    status = "CHARGING"
  } else if (netPower >= 0) {
    status = "MAINTAINING"
  } else {
    if (batteryPct > 5) status = "DISCHARGING"
    else {
      status = "GRID BACKUP"
      gridDraw = Math.abs(netPower)
    }
  }

  // Time String
  const hours = Math.floor(time)
  const minutes = Math.floor((time % 1) * 60)
  const timeString = `${hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours)}:${minutes.toString().padStart(2, '0')} ${hours >= 12 && hours < 24 ? 'PM' : 'AM'}`

  return {
    loadWatts, solarWatts, batteryPct, status, gridDraw, timeString,
    isCharging: status === "CHARGING" || status === "MAINTAINING"
  }
}