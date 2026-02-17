"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPage() {
  useEffect(() => {
    const map = L.map("map", { scrollWheelZoom: false }).setView(
      [55.3781, -3.436],
      6,
    ); // Controls where the map is centred upon load

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      },
    ).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="w-full h-full scroll z-10" />;
}
