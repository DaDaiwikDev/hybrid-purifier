export default async function handler(req, res) {
  // 1. Get the city from the URL request (e.g., ?city=Delhi)
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City name is required" });
  }

  // 2. YOUR WAQI TOKEN (Paste it here)
  const TOKEN = "c7ca5c732d3b1a6c460f313712e5fac33eb46e7a"; 

  try {
    // 3. Fetch from the World Air Quality Index Authority
    const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${TOKEN}`);
    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("City not found or API error");
    }

    // 4. Extract & Normalize Data
    // WAQI returns data in a specific "iaqi" format. We clean it up for our app.
    const stats = data.data.iaqi;
    
    const payload = {
      city: data.data.city.name,
      aqi: data.data.aqi,
      // Access individual pollutants (if available in that city's station)
      pm25: stats.pm25 ? stats.pm25.v : 0,
      pm10: stats.pm10 ? stats.pm10.v : 0,
      nox: stats.no2 ? stats.no2.v : 0, // Nitrogen Dioxide
      sox: stats.so2 ? stats.so2.v : 0, // Sulfur Dioxide
      o3: stats.o3 ? stats.o3.v : 0,    // Ozone
      source: "Ekospaxes Global Network (via WAQI)",
      timestamp: new Date().toISOString()
    };

    // 5. Serve the API Response (This makes YOU the API provider)
    res.status(200).json(payload);

  } catch (error) {
    // Fallback to Simulation if city not found (Keeps the demo alive)
    console.error("API Error:", error);
    
    // Generate realistic mock data so your site never breaks during demo
    const simAqi = Math.floor(Math.random() * 100 + 50);
    res.status(200).json({
      city: city,
      aqi: simAqi,
      pm25: Math.round(simAqi * 0.6),
      pm10: Math.round(simAqi * 1.2),
      nox: 12,
      sox: 5,
      source: "Ekospaxes Simulation Node",
      isSimulated: true
    });
  }
}