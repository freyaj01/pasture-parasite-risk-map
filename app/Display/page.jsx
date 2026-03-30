"use client";
import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
import { getParasiteCals } from "../data/calculations";

const MapPage = dynamic(() => import("../Map/page"), { ssr: false });

function LoadingDots() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return dots;
}

export default function Display() {
  const [showModal, setShowModal] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // State to store weather data passed up from the map component
  const [weatherData, setWeatherData] = useState(null);
  // State to track whether weather data is currently being fetched
  const [weatherLoading, setWeatherLoading] = useState(false);

  // State to control whether the 24-hour forecast is expanded or collapsed
  const [showForecast, setShowForecast] = useState(false);

  // State for postcode search
  const [postcodeInput, setPostcodeInput] = useState("");
  const [postcodeError, setPostcodeError] = useState("");
  const [postcodeLoading, setPostcodeLoading] = useState(false);
  const mapRef = useRef(null);

  // Helper function to format timestamp into a readable date and time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  async function handlePostcodeLookup(e) {
    e.preventDefault();
    setPostcodeError("");
    setPostcodeLoading(true);
    try {
      const res = await fetch(
        `/postcodeAPI?postcode=${encodeURIComponent(postcodeInput.trim())}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lookup failed");
      mapRef.current?.flyTo(data.latitude, data.longitude);
    } catch (err) {
      setPostcodeError(err.message);
    } finally {
      setPostcodeLoading(false);
    }
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex flex-col lg:flex-row flex-1 relative">
          {/* Left Panel shows weather data when a location is clicked on*/}
          <aside className="w-full lg:w-[320px] bg-white border-b lg:border-b-0 lg:border-r p-4 sm:p-6 overflow-y-auto">
            {/* Show a little message before locations are clicked */}
            {!weatherData && !weatherLoading && (
              <div className="text-sm text-gray-500">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Location Info
                </h2>
                <p>
                  Click anywhere on the map to view weather and parasite risk
                  information for that area.
                </p>
              </div>
            )}

            {/* Show loading message in left panel while weather data is being fetched */}
            {weatherLoading && (
              <div className="text-sm text-gray-500">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Loading weather data
                  <LoadingDots />
                </h2>
              </div>
            )}

            {/* Show weather data wen its been retrieved from the API */}
            {weatherData && weatherData.periods.length > 0 && (
              <div>
                {/* Display the city and country name */}
                <div className="flex items-center justify-between mb-4 gap-2">
                  <h2 className="font-bold text-gray-900">
                    {weatherData.city}, {weatherData.country}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {/*  {weatherData.lat}, {weatherData.lng}   */}
                  </p>

                  <button
                    onClick={() => setWeatherData(null)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Clear selection
                  </button>
                </div>

                <h4 className="font-semibold text-sm text-gray-700 mb-2">
                  Parasite Risk
                </h4>

                {/* Parasite Risk Section */}
                {weatherData.parasiteRisk && (
                  <div className="mb-4 p-4 bg-gradient-to-b from-blue-50 to-white-50 rounded-lg border border-blue-200">
                    <div
                      className={`inline-block px-2 py-1 rounded-full text-sm font-semibold mb-3 ${
                        weatherData.parasiteRisk.riskLevel === "Very High"
                          ? "bg-red-100 text-red-700"
                          : weatherData.parasiteRisk.riskLevel === "High"
                            ? "bg-orange-100 text-orange-700"
                            : weatherData.parasiteRisk.riskLevel === "Moderate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {weatherData.parasiteRisk.riskLevel} Risk
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between pt-2 border-t gap-3">
                        <span className="text-gray-600">
                          Recent Rainfall (14d):
                        </span>
                        <span className="font-bold text-gray-900 whitespace-nowrap">
                          {weatherData.parasiteRisk.weather.recentRainfall}mm
                        </span>
                      </div>

                      <div className="pt-3 border-t mt-2">
                        <button
                          onClick={() => setShowAdditionalInfo((prev) => !prev)}
                          className="w-full flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#1877F2] font-bold py-2 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-center h-4 w-4 rounded-full bg-[#1877F2] text-white text-[10px]">
                            {showAdditionalInfo ? "-" : "+"}
                          </div>
                          {showAdditionalInfo
                            ? "Hide Additional Info"
                            : "Show Additional Info"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current weather section */}
                <div className="mb-4 dark:text-black">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Current Weather
                  </h4>

                  <div className="flex items-center justify-between py-2 bg-blue-50 rounded-lg px-3 dark:text-black gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={weatherData.periods[0].icon}
                        alt={weatherData.periods[0].description}
                        className="w-14 h-14"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium break-words">
                          {weatherData.periods[0].description}
                        </p>

                        <p className="text-xs text-gray-600">
                          Humidity: {weatherData.periods[0].humidity}%
                        </p>

                        <p className="text-xs text-gray-600">
                          Wind: {weatherData.periods[0].windSpeed} m/s
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-2xl sm:text-3xl font-bold text-[#1877F2]">
                        {weatherData.periods[0].temp}°C
                      </p>
                    </div>
                  </div>
                </div>

                {/* Button- toggle 24-hour forecast */}
                <button
                  onClick={() => setShowForecast(!showForecast)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-[#1877F2] text-xs font-bold py-2 transition-colors cursor-pointer"
                >
                  {showForecast
                    ? "Hide 24-Hour Forecast"
                    : "Show 24-Hour Forecast"}
                </button>

                {/* 24-hour forecast, only shown when showForecast is true */}
                {showForecast && (
                  <div className="mt-4 space-y-2 max-h-[40vh] overflow-y-auto dark:text-black">
                    <h4 className="font-semibold text-sm text-gray-700 border-b pb-1 sticky top-0 bg-white">
                      Next 24 Hours
                    </h4>

                    {weatherData.periods.slice(1).map((period, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <img
                            src={period.icon}
                            alt={period.description}
                            className="w-10 h-10"
                          />

                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500">
                              {formatTime(period.timestamp)}
                            </p>

                            <p className="text-sm font-medium break-words">
                              {period.description}
                            </p>

                            <p className="text-xs text-gray-600 break-words">
                              Humidity: {period.humidity}% | Wind:{" "}
                              {period.windSpeed} m/s
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="text-lg sm:text-xl font-bold text-[#1877F2]">
                            {period.temp}°C
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </aside>

          {showAdditionalInfo && weatherData?.parasiteRisk && (
            <div className="w-full lg:w-[320px] bg-white border-b lg:border-b-0 lg:border-r p-4 sm:p-6 overflow-y-auto lg:max-h-screen">
              <h3 className="text-lg font-bold mb-4 text-gray-800 space-y-1">
                Additional Information
              </h3>

              <div className="text-sm text-gray-700 space-y-1 mb-6 border-t pt-4">
                <p>{weatherData.parasiteRisk.regionData.riskExplained}</p>
              </div>

              {/* Recommended Actions */}
              <div className="mb-6 border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Recommended Actions
                </h4>

                {weatherData.parasiteRisk.totalRisk >= 75 && (
                  <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                    <li>Consider fecal egg count testing</li>
                    <li>Monitor animals for weight loss</li>
                    <li>Avoid grazing wet, overstocked pasture</li>
                    <li>Speak to your vet about treatment timing</li>
                  </ul>
                )}

                {weatherData.parasiteRisk.totalRisk >= 50 &&
                  weatherData.parasiteRisk.totalRisk < 75 && (
                    <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                      <li>Monitor animals closely</li>
                      <li>Plan testing if wet weather continues</li>
                      <li>Rotate pasture where possible</li>
                    </ul>
                  )}

                {weatherData.parasiteRisk.totalRisk < 25 && 
                 weatherData.parasiteRisk.totalRisk < 50 && (
                  <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                    <li>Continue normal monitoring</li>
                    <li>No immediate action needed</li>
                  </ul>
                )}
                {/* Low */}
                {weatherData.parasiteRisk.totalRisk < 25 && (
                 <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                 <li>No immediate action needed</li>
                <li>Continue routine farm management</li>
              </ul>
              )}  
              </div>

              {/* Why risk is at this level */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">
                  Why risk is at this level
                </h4>

                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    Annual Rainfall:{" "}
                    {weatherData.parasiteRisk.regionData.rainfallMm} mm
                    <div className="text-xs text-gray-500 mt-1">
                      Wet conditions allow parasite larvae to survive on
                      pasture.
                    </div>
                  </div>

                  <p>
                    Annual Temperature:{" "}
                    {weatherData.parasiteRisk.regionData.temperatureC}°C
                  </p>

                  <p>
                    Annual Humidity:{" "}
                    {weatherData.parasiteRisk.regionData.humidityPercent}%
                  </p>

                  <p>Risk Level: {weatherData.parasiteRisk.riskLevel}</p>
                </div>

                {/* Most Likely Parasites */}
                <div className="border-t pt-4 mt-6 dark:text-black">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Parasites most likely to appear in these conditions
                  </h4>

                  {(() => {
                   const temp = weatherData.parasiteRisk.weather.temp;
                   const humidity   = weatherData.parasiteRisk.weather.humidity;
                   const recentRain = weatherData.parasiteRisk.weather.recentRainfall;
                    const parasites = getParasiteCals(
                      temp,
                      recentRain,
                      humidity,
                    );

                    const order = {
                      "Very High": 4,
                      High: 3,
                      Moderate: 2,
                      Low: 1,
                    };
                    const sorted = parasites
                      .sort((a, b) => order[b.level] - order[a.level])
                      .slice(0, 4);

                    return sorted.map((p, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-semibold text-sm">
                          {index + 1}. {p.name}
                        </p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold mb-1 inline-block ${
                            p.level === "Very High"
                              ? "bg-red-100 text-red-700"
                              : p.level === "High"
                                ? "bg-orange-100 text-orange-700"
                                : p.level === "Moderate"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                          }`}
                        >
                          {p.level} Potential
                        </span>
                        <p className="text-xs text-gray-600 mt-1">{p.reason}</p>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Map Area */}
          <div className="flex-1 relative h-screen z-10">
            {/* Postcode Search Bar */}
            <div className="absolute bottom-6 left-6 z-500 bg-white shadow rounded p-3 flex gap-2 items-center text-black">
              <h4 className="text-sm font-semibold">Enter Your Postcode:</h4>
              <form
                onSubmit={handlePostcodeLookup}
                className="flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={postcodeInput}
                  onChange={(e) => setPostcodeInput(e.target.value)}
                  placeholder="e.g. SW1A 1AA"
                  className="border rounded px-3 py-2 text-sm w-36 outline-none focus:border-blue-900"
                />
                <button
                  type="submit"
                  disabled={postcodeLoading || !postcodeInput}
                  className="bg-[#1877F2] text-white px-3 py-2 rounded text-sm font-medium hover:bg-[#1857F2] disabled:opacity-50 transition cursor-pointer"
                >
                  {postcodeLoading ? "..." : "Go"}
                </button>
              </form>
              {postcodeError && (
                <p className="text-red-500 text-xs">{postcodeError}</p>
              )}
            </div>

            <div className="flex-1 relative min-h-[60vh] h-[60vh] sm:h-[70vh] lg:h-screen z-10">
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
                <MapPage
                  ref={mapRef}
                  onWeatherDataChange={setWeatherData}
                  onLoadingChange={setWeatherLoading}
                  className="w-full h-full"
                />
              </div>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white shadow rounded p-3 sm:p-4 z-500 dark:text-black max-w-[150px] sm:max-w-none">
                <h3 className="text-xs sm:text-sm font-bold mb-3">
                  Risk Level ↑
                </h3>
                <div className="space-y-1 text-xs sm:text-sm p-2 sm:p-3 rounded">
                  <div className="text-red-600 mt-1 font-semibold">
                    Very High
                  </div>
                  <div className="text-orange-600 mt-1 font-semibold">High</div>
                  <div className="text-orange-300 mt-1 font-semibold">
                    Moderate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-t dark:text-black" id="additional-info">
          <details className="p-4 border-b">
            <summary className="cursor-pointer font-medium">
              About the data & limitations
            </summary>
            <div className="p-4 sm:p-6 bg-gray-50 rounded mt-4 space-y-5">
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Population Representation
                </div>
                <p className="text-gray-700 mt-1">
                  When you click on this map it does not represent all farms
                  within the region. It is based off cities. Risk estimates are
                  based on environmental conditions at these locations and may
                  not reflect local variation within individual pastures.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Environmental Estimates/Proxies
                </div>
                <p className="text-gray-700 mt-1">
                  Parasite risk shown on this map is estimated using
                  environmental factors such as rainfall, temperature, and
                  humidity. These factors influence parasite survival and
                  development but do not confirm the presence of parasites in
                  animals.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Data Sources & Quality
                </div>
                <p className="text-gray-700 mt-1">
                  Weather data is sourced from a publicly available API and
                  represents estimates. Data gaps may exist, particularly for
                  rural or remote areas.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">Seasonality</div>
                <p className="text-gray-700 mt-1">
                  Parasite risk is influenced by seasonal patterns. The data
                  displayed represents conditions over a recent time window and
                  may not reflect risk at other times of the year.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">Risk Scoring</div>
                <p className="text-gray-700 mt-1">
                  Risk scores are calculated using a rule-based model, which has
                  been created based off scientific research, you can find more
                  information about this in the "additional info" section. The
                  thresholds used are calculated using factors and are intended
                  to support discussion rather than provide guidance.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Interpretation Guidance
                </div>
                <p className="text-gray-700 mt-1">
                  This tool is designed to support discussion and
                  decision-making between farmers and vets. It should not be
                  used as a sole basis for treatment or decisions.
                </p>
              </div>
            </div>
          </details>
        </div>

        {/* First modal - About this map */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-500 dark:text-black px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <i
                  className="fa-notdog fa-solid fa-sun"
                  style={{ color: "rgba(255, 208, 40, 1.00)" }}
                />
                About this map
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This map shows an estimated parasite risk level based on
                environmental conditions.
                <br />
                <br />
                It is meant to be used as a guide to help you understand
                potential parasite risk in your area, but should not be used as
                the sole source of information for making decisions.
                <br />
                <br />
                Always consult with your veterinarian for specific advice about
                parasite control on your farm.
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-[#2171b8] text-white hover:bg-[#02253e] font-semibold cursor-pointer transition duration-300"
                  onClick={() => {
                    setShowModal(false);

                    setTimeout(() => {
                      const section =
                        document.getElementById("additional-info");
                      const details = section?.querySelector("details");

                      section?.scrollIntoView({ behavior: "smooth" });

                      if (details) {
                        details.open = true;
                      }
                    }, 200);
                  }}
                >
                  More info
                </button>

                <button
                  onClick={() => {
                    setShowModal(false);
                    {
                      /*  setShowModal2(true);*/
                    }
                  }}
                  className="px-4 py-2 rounded bg-[#2171b8] text-white hover:bg-[#02253e] font-semibold cursor-pointer transition duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
