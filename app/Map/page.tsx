"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Define the structure for a single weather period (e.g., weather at 3pm, 6pm, etc.)
interface WeatherPeriod {
  timestamp: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

// Define the structure for the complete weather data returned from the API
interface WeatherData {
  city: string;
  country: string;
  lat?: string;
  lng?: string;
  periods: WeatherPeriod[];
}

function MapComponent() {
  // State to store the weather data retrieved from the Python backend
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  // State to track whether we're currently fetching weather data
  const [loading, setLoading] = useState<boolean>(false);
  
  // State to store any error messages if the API call fails
  const [error, setError] = useState<string | null>(null);
  
  // State to control whether the 24-hour forecast is expanded or collapsed
  const [showForecast, setShowForecast] = useState<boolean>(false);

  // useEffect runs once when the component loads to initialize the map
  useEffect(() => {
    // Dynamically import Leaflet library only on the client side (not during server-side rendering)
    import("leaflet").then((L) => {
      // Initialize the map and set the default view to the UK
      const map = L.map("map", { scrollWheelZoom: false }).setView(
        [55.3781, -3.436],
        6
      );

      // Add the base map tiles from CartoDB
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      // Fix for the default marker icon not displaying properly in production
      const DefaultIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Variable to keep track of the currently placed marker on the map
      let currentMarker: L.Marker | null = null;

      // Function that runs when the user clicks anywhere on the map
      const handleMapClick = async (e: L.LeafletMouseEvent) => {
        // Extract the latitude and longitude from the click event
        const { lat, lng } = e.latlng;

        // Remove the previous marker if one exists (so we only have one marker at a time)
        if (currentMarker) {
          map.removeLayer(currentMarker);
        }

        // Add a new marker at the clicked location
        currentMarker = L.marker([lat, lng]).addTo(map);

        // Start the loading state and clear any previous errors
        setLoading(true);
        setError(null);
        setShowForecast(false); // Collapse the forecast when fetching new data
        
        try {
          // Make a request to our Python Flask backend API with the clicked coordinates
          const response = await fetch(
            `http://127.0.0.1:5000/api/weather?lat=${lat}&lon=${lng}`
          );
          
          // Check if the response was successful
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          
          // Parse the JSON response from the Python backend
          const forecast: WeatherData = await response.json();
          
          // Add the coordinates to the forecast data for display
          forecast.lat = lat.toFixed(4);
          forecast.lng = lng.toFixed(4);
          
          // Update the state with the new weather data
          setWeatherData(forecast);
        } catch (err) {
          // If there's an error, log it and show an error message to the user
          console.error("Error fetching weather:", err);
          setError("Failed to load weather data. Make sure Python backend is running.");
          setWeatherData(null);
        } finally {
          // Stop the loading state regardless of success or failure
          setLoading(false);
        }
      };

      // Attach the click handler to the map
      map.on("click", handleMapClick);

      // Cleanup function that runs when the component unmounts
      return () => {
        map.remove();
      };
    });
  }, []); // Empty dependency array means this only runs once on component mount

  // Helper function to format the timestamp into a readable date and time
  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Build the current weather display element
  const currentWeatherDisplay = weatherData && weatherData.periods.length > 0 && (
    <div className="mb-3">
      <h4 className="font-semibold text-sm text-gray-700 mb-2">
        Current Weather
      </h4>
      
      <div className="flex items-center justify-between py-2 bg-blue-50 rounded-lg px-3">
        <div className="flex items-center gap-3 flex-1">
          <img 
            src={weatherData.periods[0].icon} 
            alt={weatherData.periods[0].description}
            className="w-14 h-14"
          />
          
          <div className="flex-1">
            <p className="text-sm font-medium">
              {weatherData.periods[0].description}
            </p>
            
            <p className="text-xs text-gray-600">
              Humidity: {weatherData.periods[0].humidity}% | Wind: {weatherData.periods[0].windSpeed} m/s
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600">
            {weatherData.periods[0].temp}°C
          </p>
        </div>
      </div>
    </div>
  );

  // Build the 24-hour forecast elements (all periods except the first one)
  const forecastItems = weatherData && showForecast && weatherData.periods.slice(1).map((period, index) => (
    <div 
      key={index} 
      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center gap-3 flex-1">
        <img 
          src={period.icon} 
          alt={period.description}
          className="w-10 h-10"
        />
        
        <div className="flex-1">
          <p className="text-xs text-gray-500">
            {formatTime(period.timestamp)}
          </p>
          
          <p className="text-sm font-medium">
            {period.description}
          </p>
          
          <p className="text-xs text-gray-600">
            Humidity: {period.humidity}% | Wind: {period.windSpeed} m/s
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <p className="text-xl font-bold text-blue-600">
          {period.temp}°C
        </p>
      </div>
    </div>
  ));

  return (
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-full z-10" />
      
      {weatherData && weatherData.periods.length > 0 && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-20 max-w-md">
          <h3 className="font-bold text-lg mb-1">
            {weatherData.city}, {weatherData.country}
          </h3>
          
          <p className="text-xs text-gray-500 mb-3">
            {weatherData.lat}, {weatherData.lng}
          </p>
          
          {currentWeatherDisplay}

          <button
            onClick={() => setShowForecast(!showForecast)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            {showForecast ? "Hide 24-Hour Forecast" : "Show 24-Hour Forecast"}
          </button>

          {showForecast && (
            <div className="mt-4 space-y-2 max-h-[50vh] overflow-y-auto">
              <h4 className="font-semibold text-sm text-gray-700 border-b pb-1 sticky top-0 bg-white">
                Next 24 Hours
              </h4>
              
              {forecastItems}
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-20">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

// Export the component with server-side rendering disabled (required for Leaflet)
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});