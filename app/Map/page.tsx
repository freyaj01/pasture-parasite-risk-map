"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// define the structure for a single weather period (for example- weather at 3pm, 6pm, ....)
interface WeatherPeriod {
  timestamp: string;
  temp: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

interface ParasiteRiskData {
  region: string;
  baseRisk: number;
  weatherRisk: number;
  totalRisk: number;
  riskLevel: string;
  weather: {
    temp: number;
    humidity: number;
    recentRainfall: number;
  };
}

// this defines structure for complete weather data returned from the API
interface WeatherData {
  city: string;
  country: string;
  lat?: string;
  lng?: string;
  periods: WeatherPeriod[];
  parasiteRisk?: ParasiteRiskData;
}

// defines the props that this component accepts from the parent Display component
interface MapComponentProps {
  onWeatherDataChange?: (data: WeatherData | null) => void;
  onLoadingChange?: (loading: boolean) => void;
}

function MapComponent({ onWeatherDataChange, onLoadingChange }: MapComponentProps) {

  // useEffect runs once when component loads to initialise map
  useEffect(() => {
    // import Leaflet library only on client side (not during server-side rendering)
    import("leaflet").then((L) => {
      // checkss if map container is already initialised and remove it if so
      const container = L.DomUtil.get("map");
      if (container) {
        (container as any)._leaflet_id = null;
      }

      // initialise map and set default view to be UK
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

      // Function to determine which region based on coordinates
const getRegionFromCoordinates = (lat: number, lng: number): string => {
  // North East (Newcastle, Durham, Sunderland, Middlesbrough)
  if (lat > 53.5 && lng > -2) {
    return "NorthEast";
  }
  
  // North West (Cumbria, Lancashire, Manchester, Liverpool)
  if (lat > 53 && lng < -2) {
    return "NorthWest";
  }
  
  // Yorkshire (Leeds, Sheffield, York)
  if (lat >= 53 && lat <= 54.5 && lng >= -2 && lng <= 0) {
    return "Yorkshire";
  }
  
  // South West (Devon, Cornwall, Somerset, Bristol)
  if (lat < 52 && lng < -2) {
    return "SouthWest";
  }
  
  // East Anglia (Norfolk, Suffolk, Cambridge)
  if (lat >= 52 && lat < 53.5 && lng > 0.5) {
    return "EastAnglia";
  }
  
  // South East (London, Kent, Sussex, Surrey, Hampshire)
  if (lat < 52 && lng >= -1) {
    return "SouthEast";
  }
  
  // West Midlands (Birmingham, Shropshire, Staffordshire, Worcestershire)
  if (lat >= 52 && lat < 53 && lng >= -3 && lng < -1.3) {
    return "WestMidlands";
  }
  
  // East Midlands (Nottingham, Leicester, Derby, Lincoln)
  if (lat >= 52 && lat < 53.5 && lng >= -1.3 && lng <= 0.5) {
    return "EastMidlands";
  }
  
  // Default fallback for any gaps
  return "EastMidlands";
};

      // this function is the one that runs when the user clicks anywhere on the map
      const handleMapClick = async (e: L.LeafletMouseEvent) => {
        // extract the latitude and longitude from the click event
        const { lat, lng } = e.latlng;

        // Remove the previous marker if one exists (so u only see one marker at a time)
        if (currentMarker) {
          map.removeLayer(currentMarker);
        }

        // Add a new marker at the clicked location
        currentMarker = L.marker([lat, lng]).addTo(map);

        // Tell the parent Display component that loading has started
        if (onLoadingChange) onLoadingChange(true);
        
        try {
          // Make a request to our Python Flask backend API with the clicked coordinates
          const weatherResponse = await fetch(
            `https://parasite-risk-api.onrender.com/api/weather?lat=${lat}&lon=${lng}`
          );

          // Check if the response was successful
          if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather data");
          }
          
          // Parse the JSON response from the Python backend
          const forecast: WeatherData = await weatherResponse.json();
          
          // Add the coordinates to the forecast data for display
          forecast.lat = lat.toFixed(4);
          forecast.lng = lng.toFixed(4);
          
          // Determine which region based on the clicked coordinates
          const region = getRegionFromCoordinates(lat, lng);
          
          const riskResponse = await fetch(
            `https://parasite-risk-api.onrender.com/api/parasite-risk?lat=${lat}&lon=${lng}&region=${region}`
              );
          
          if (riskResponse.ok) {
            const riskData = await riskResponse.json();
            forecast.parasiteRisk = riskData;
          }
          
          // Send weather data up to the parent Display component to show in the sidebar
          if (onWeatherDataChange) onWeatherDataChange(forecast);
        } catch (err) {
          // If there's an error log it and clear the weather data in the parent
          console.error("Error fetching weather:", err);
          if (onWeatherDataChange) onWeatherDataChange(null);
        } finally {
          //tells the parent Display component that loading has finished
          if (onLoadingChange) onLoadingChange(false);
        }
      };

      // Attach click handler to map
      map.on("click", handleMapClick);

      // Cleanup function- runs when component unmounts
      return () => {
        map.remove();
      };
    });
  }, [onWeatherDataChange, onLoadingChange]);

  return (
    <div className="relative w-full h-full">
      <div id="map" className="w-full h-full z-10" />
    </div>
  );
}

// Export component with server-side rendering disabled (need this for Leaflet)
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});