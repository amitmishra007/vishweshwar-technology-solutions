"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

type Location = {
  lat: number;
  lng: number;
  name?: string;
  accuracy?: number;
  confidence?: string;
};

/* Hook: for map control on selection */
function MapController({ location }: { location: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 14, { duration: 1 });
  }, [location, map]);
  return null;
}

/* Handle clicks to move marker */
function LocationEvents({
  onMove,
}: {
  onMove: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMove(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function SmartLocator() {
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const reverseTimeout = useRef<NodeJS.Timeout | null>(null);

  /* Restore from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      try {
        setLocation(JSON.parse(saved));
      } catch {}
    }
  }, []);

  /* Save to localStorage */
  useEffect(() => {
    if (location)
      localStorage.setItem("userLocation", JSON.stringify(location));
  }, [location]);

  /* Reverse geocode */
  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      const data = await res.json();
      return (
        data.city ||
        data.locality ||
        data.principalSubdivision ||
        "Unknown location"
      );
    } catch {
      return "Unknown location";
    }
  };

  /* Autocomplete via Photon API */
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${value}&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.features || []);
    } catch (err) {
      console.error("Autocomplete error", err);
    }
  };

  const handleSelectSuggestion = async (item: any) => {
    const [lon, lat] = item.geometry.coordinates;
    const name =
      item.properties.name ||
      item.properties.city ||
      item.properties.country ||
      "Unknown place";
    setLocation({ lat, lng: lon, name, accuracy: 50, confidence: "manual" });
    setSuggestions([]);
    setSearch(name);
  };

  /* Primary GPS-based locate */
  const handleLocate = async () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        // If browser returns very poor accuracy, fallback to Mozilla
        if (accuracy > 10000) {
          const mlsData = await fetchMozillaLocation();
          if (mlsData) {
            const name = await reverseGeocode(mlsData.lat, mlsData.lng);
            setLocation({
              lat: mlsData.lat,
              lng: mlsData.lng,
              name,
              accuracy: mlsData.accuracy,
              confidence: "Mozilla Fallback",
            });
            setLoading(false);
            return;
          }
        }

        const name = await reverseGeocode(latitude, longitude);
        setLocation({
          lat: latitude,
          lng: longitude,
          name,
          accuracy,
          confidence: accuracy > 1000 ? "Low (IP-based)" : "High (GPS)",
        });
        setLoading(false);
      },
      async (err) => {
        console.warn("GPS failed, falling back:", err);
        const mlsData = await fetchMozillaLocation();
        if (mlsData) {
          const name = await reverseGeocode(mlsData.lat, mlsData.lng);
          setLocation({
            lat: mlsData.lat,
            lng: mlsData.lng,
            name,
            accuracy: mlsData.accuracy,
            confidence: "Mozilla Fallback",
          });
        } else setError("Unable to determine location.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  /* Mozilla Location Service Fallback */
  const fetchMozillaLocation = async () => {
    try {
      const res = await fetch(
        "https://location.services.mozilla.com/v1/geolocate?key=test"
      );
      const data = await res.json();
      return {
        lat: data.location.lat,
        lng: data.location.lng,
        accuracy: data.accuracy,
      };
    } catch (err) {
      console.error("Mozilla fallback failed", err);
      return null;
    }
  };

  /* When user drags/clicks */
  const handleMove = async (lat: number, lng: number) => {
    setLocation((prev) => ({ ...prev, lat, lng } as Location));
    if (reverseTimeout.current) clearTimeout(reverseTimeout.current);
    reverseTimeout.current = setTimeout(async () => {
      const name = await reverseGeocode(lat, lng);
      setLocation(
        (prev) => ({ ...prev, name, confidence: "manual" } as Location)
      );
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-gray-100">
      <h1 className="text-2xl font-semibold mb-4">
        🌍 Smart & Accurate Locator
      </h1>

      <div className="relative w-full max-w-lg mb-3">
        <input
          type="text"
          placeholder="Search city or place..."
          value={search}
          onChange={handleSearchChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full rounded-lg mt-1 shadow">
            {suggestions.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelectSuggestion(s)}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {s.properties.name || s.properties.city || s.properties.country}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleLocate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-3 disabled:opacity-50"
      >
        {loading ? "Detecting..." : "📡 Use My GPS"}
      </button>

      {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

      {location && (
        <div className="bg-white rounded-lg shadow p-4 w-full max-w-lg text-gray-800 mb-3 border border-gray-200">
          <p>
            <strong>Place:</strong> {location.name}
          </p>
          <p className="text-sm text-gray-600">
            Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
          </p>
          {location.accuracy && (
            <p className="text-xs text-gray-500">
              Accuracy: ±{Math.round(location.accuracy)} m (
              {location.confidence})
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-lg h-96 rounded-lg overflow-hidden shadow-md border border-gray-200">
        <MapContainer
          center={location ? [location.lat, location.lng] : [20.5937, 78.9629]}
          zoom={location ? 13 : 5}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && (
            <>
              <Marker
                position={[location.lat, location.lng]}
                draggable
                eventHandlers={{
                  dragend: (e) => {
                    const { lat, lng } = e.target.getLatLng();
                    handleMove(lat, lng);
                  },
                }}
              >
                <Popup>{location.name}</Popup>
              </Marker>
              {location.accuracy && (
                <Circle
                  center={[location.lat, location.lng]}
                  radius={location.accuracy}
                  pathOptions={{
                    color: "#2563eb",
                    fillColor: "#60a5fa",
                    fillOpacity: 0.25,
                  }}
                />
              )}
            </>
          )}
          <LocationEvents onMove={handleMove} />
          <MapController location={location} />
        </MapContainer>
      </div>

      {location?.confidence?.includes("Low") && (
        <p className="text-xs text-yellow-700 mt-2">
          ⚠️ Low accuracy (may be IP-based). Drag the marker to correct.
        </p>
      )}
    </div>
  );
}
