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

    // ─────────────────────────────────────────────────────────────
    // REGION DETECTION — Full UK coverage
    // Maps lat/lon coordinates to a region key that matches
    // the ukRegionData.json file.
    // Regions checked in order from most specific to least,
    // with a safe fallback at the bottom.
    // Source for boundaries: standard UK administrative geography
    // ─────────────────────────────────────────────────────────────

    const getRegionFromCoordinates = (lat: number, lng: number): string => {

      // ── NORTHERN IRELAND ──────────────────────────────────────
      // NI sits between lat 54.0–55.3, lng -8.2 to -5.4
      if (lat >= 54.0 && lat <= 55.3 && lng >= -8.2 && lng <= -5.4) {
        // West (Fermanagh, Tyrone, Derry) — more rainfall
        if (lng < -6.5) return "NorthernIrelandWest";
        // East (Belfast, Antrim, Armagh, Down)
        return "NorthernIrelandEast";
      }

      // ── SCOTLAND ──────────────────────────────────────────────
      if (lat >= 55.0) {
        // Scotland West — west coast, Highlands west of Great Glen
        // Glasgow, Argyll, Ayrshire, Dumfries & Galloway west
        if (lng < -4.0 && lat < 57.5) return "ScotlandWest";

        // Scotland North — Highlands, Caithness, Sutherland, Orkney, Shetland
        if (lat >= 57.5) return "ScotlandNorth";

        // Scotland Borders — south of Edinburgh, north of England
        if (lat < 55.9 && lng >= -3.5) return "ScotlandBorders";

        // Scotland East — Edinburgh, Dundee, Aberdeen, Fife, Angus
        if (lng >= -4.0) return "ScotlandEast";

        // Fallback for any remaining Scotland coords
        return "ScotlandWest";
      }

      // ── WALES ─────────────────────────────────────────────────
      // Wales sits roughly lat 51.3–53.5, lng -5.35 to -2.65
      if (lng < -2.65 && lat >= 51.3 && lat <= 53.5) {

        // North Wales — Gwynedd, Anglesey, Conwy, Denbighshire
        if (lat >= 52.8) return "NorthWales";

        // East Wales — Wrexham, Flintshire, Powys east, Monmouthshire
        if (lng >= -3.5) return "EastWales";

        // Mid Wales — Ceredigion, Powys, inland areas
        if (lat >= 52.0) return "MidWales";

        // South Wales — Cardiff, Swansea, Newport, Pembrokeshire
        return "SouthWales";
      }

      // ── ENGLAND ───────────────────────────────────────────────

      // North East — Newcastle, Durham, Sunderland, Middlesbrough, Tees Valley
      if (lat > 54.5 && lng > -2.5) return "NorthEast";

      // North West — Cumbria, Lancashire, Manchester, Liverpool, Cheshire
      if (lat > 53.0 && lng < -2.0) return "NorthWest";

      // Yorkshire — Leeds, Sheffield, York, Hull, East Riding
      if (lat >= 53.0 && lat <= 54.5 && lng >= -2.5 && lng <= 0.0) return "Yorkshire";

      // East Anglia — Norfolk, Suffolk, Cambridgeshire, Essex north
      if (lat >= 51.5 && lat < 53.5 && lng > 0.5) return "EastAnglia";

      // South West — Devon, Cornwall, Somerset, Dorset, Wiltshire, Gloucestershire
      if (lat < 51.5 && lng < -2.0) return "SouthWest";

      // South East — London, Kent, Sussex, Surrey, Hampshire, Berkshire, Essex south
      if (lat < 51.8 && lng >= -1.8) return "SouthEast";

      // West Midlands — Birmingham, Shropshire, Staffordshire, Worcestershire, Herefordshire
      if (lat >= 51.8 && lat < 53.0 && lng >= -3.2 && lng < -1.3) return "WestMidlands";

      // East Midlands — Nottingham, Leicester, Derby, Lincoln, Northampton, Rutland
      if (lat >= 52.0 && lat < 53.5 && lng >= -1.3 && lng <= 0.5) return "EastMidlands";

      // ── FALLBACK ──────────────────────────────────────────────
      // Catches any gaps — defaults to East Midlands as central England
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

      // Add a new marker at the clicked location with draggable enabled
      markerRef.current = L.marker([lat, lng], { draggable: true, autoPan: true }).addTo(map);
      markerRef.current.on('dragend', (event: any) => {
        const position = event.target.getLatLng();
        handleLocationSelect(position.lat, position.lng);
      });

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

    // expose flyTo function to parent (postcode search uses this)
    useImperativeHandle(ref, () => ({
      flyTo(lat: number, lng: number) {
        if (mapInstance.current) {
          mapInstance.current.flyTo([lat, lng], 13);
        }
        // automatically fetch weather + risk data for the postcode location
        handleLocationSelect(lat, lng);
      },
    }));

    // useEffect runs once when component loads to initialise map
    useEffect(() => {
      if (mapInstance.current) return;
      // import Leaflet library only on client side (not during server-side rendering)
      import("leaflet").then((L) => {
        leafletRef.current = L;

        // checks if map container is already initialised and remove it if so
        const container = L.DomUtil.get("map");
        if (container) {
          (container as any)._leaflet_id = null;
        }

        // initialise map and set default view to be UK
        const map = L.map("map", { scrollWheelZoom: true, dragging: true }).setView(
          [55.3781, -3.436],
          6,
        );

        mapInstance.current = map;

        // ensure dragging is enabled
        map.dragging.enable();

        // manual drag handler to fix Safari/Mac trackpad drag issues
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
          let isDragging = false;
          let lastX = 0;
          let lastY = 0;

          mapDiv.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
          });

          document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
            map.panBy([-dx, -dy], { animate: false });
          });

          document.addEventListener('mouseup', () => {
            isDragging = false;
          });
        }

        // Add the base map tiles from CartoDB
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          },
        ).addTo(map);

        // Fix for the default marker icon not displaying properly in production
        const DefaultIcon = L.icon({
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
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
          mapInstance.current = null;
        };
      });
    }, [onWeatherDataChange, onLoadingChange]);

    return (
      <div className="relative w-full h-full">
        <div id="map" className="w-full h-full z-10 cursor-grab active:cursor-grabbing" />
      </div>
    );
  },
);

// Export component with server-side rendering disabled (need this for Leaflet)
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
});