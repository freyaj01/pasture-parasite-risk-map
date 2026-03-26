"use client";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
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

const MapComponent = forwardRef<any, MapComponentProps>(
  ({ onWeatherDataChange, onLoadingChange }, ref) => {

    const mapInstance = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const leafletRef = useRef<any>(null);

    // Function to determine which region based on coordinates
    const getRegionFromCoordinates = (lat: number, lng: number): string => {
      if (lat > 53.5 && lng > -2) return "NorthEast";
      if (lat > 53 && lng < -2) return "NorthWest";
      if (lat >= 53 && lat <= 54.5 && lng >= -2 && lng <= 0) return "Yorkshire";
      if (lat < 52 && lng < -2) return "SouthWest";
      if (lat >= 52 && lat < 53.5 && lng > 0.5) return "EastAnglia";
      if (lat < 52 && lng >= -1) return "SouthEast";
      if (lat >= 52 && lat < 53 && lng >= -3 && lng < -1.3) return "WestMidlands";
      if (lat >= 52 && lat < 53.5 && lng >= -1.3 && lng <= 0.5) return "EastMidlands";
      return "EastMidlands";
    };

    // this function handles both click + postcode selection
    const handleLocationSelect = async (lat: number, lng: number) => {
      const map = mapInstance.current;
      const L = leafletRef.current;
      if (!map || !L) return;

      // Remove the previous marker if one exists (so u only see one marker at a time)
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Add a new marker at the clicked location
      markerRef.current = L.marker([lat, lng]).addTo(map);

      // Tell the parent Display component that loading has started
      if (onLoadingChange) onLoadingChange(true);

      try {
        // Make a request to our Python Flask backend API with the clicked coordinates
        const weatherResponse = await fetch(
          `http://127.0.0.1:8000/api/weather?lat=${lat}&lon=${lng}`
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
          `http://127.0.0.1:8000/api/parasite-risk?lat=${lat}&lon=${lng}&region=${region}`
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

    // expose function to parent (postcode search uses this)
    useImperativeHandle(ref, () => ({
      flyTo(lat: number, lng: number) {
        if (mapInstance.current) {
          mapInstance.current.flyTo([lat, lng], 13);
        }

        // 🔥 automatically fetch data (no click needed)
        handleLocationSelect(lat, lng);
      }
    }));

    // useEffect runs once when component loads to initialise map
    useEffect(() => {
      // import Leaflet library only on client side (not during server-side rendering)
      import("leaflet").then((L) => {

        leafletRef.current = L;

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

        mapInstance.current = map;

        // Add the base map tiles from CartoDB
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        ).addTo(map);

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

        // this function is the one that runs when the user clicks anywhere on the map
        map.on("click", (e: any) => {
          const { lat, lng } = e.latlng;
          handleLocationSelect(lat, lng);
        });

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
);

// Export component with server-side rendering disabled (need this for Leaflet)
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});