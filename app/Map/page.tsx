"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  useEffect(() => {
    const map = L.map("map", {scrollWheelZoom: false}).setView([55.3781, -3.4360],6); // Controls where the map is centred upon load

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="w-full h-full scroll z-100" />;
}