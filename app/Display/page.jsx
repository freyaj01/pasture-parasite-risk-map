"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapPage from "../Map/page";

export default function Display() {
  const [showModal, setShowModal] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [AdditionalInfo, setShowAdditionalInfo] = useState(false);
  
  // State to store weather data passed up from the map component
  const [weatherData, setWeatherData] = useState(null);
  // State to track whether weather data is currently being fetched
  const [weatherLoading, setWeatherLoading] = useState(false);

  // State to control whether the 24-hour forecast is expanded or collapsed
  const [showForecast, setShowForecast] = useState(false);

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

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="flex flex-1 relative">
          {/* Left Panel shows weather data when a location is clicked on*/}
          <aside className="w-[320px] bg-white border-r p-6 overflow-y-auto">
            {/* Show a little message before locations are clicked */}
            {!weatherData && !weatherLoading && (
              <div className="text-sm text-gray-500">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Location Info
                </h2>
                <p>
                  Click anywhere on the map to view weather and risk information
                  for that area.
                </p>
              </div>
            )}

            {/* Show loading message in left panel while weather data is being fetched */}
            {weatherLoading && (
              <div className="text-sm text-gray-500">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Loading...
                </h2>
                <p>Fetching weather data for this location.</p>
              </div>
            )}

            {/* Show weather data wen its been retrieved from the API */}
            {weatherData && weatherData.periods.length > 0 && (
              <div>
                {/* Display the city and country name */}
                <h2 className="font-bold text-gray-900">
                  {weatherData.city}, {weatherData.country}
                </h2>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs text-gray-500">
                    {weatherData.lat}, {weatherData.lng}
                  </p>
                  <button
                    onClick={() => setWeatherData(null)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear selection
                  </button>
                </div>

                {/* Parasite Risk Section */}
                {weatherData.parasiteRisk && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-sm text-gray-700 mb-3">
                      Parasite Risk Assessment
                    </h4>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">
                        Total Risk Score
                      </span>
                      <span
                        className={`text-2xl font-bold ${
                          weatherData.parasiteRisk.riskLevel === "Very High"
                            ? "text-red-600"
                            : weatherData.parasiteRisk.riskLevel === "High"
                              ? "text-orange-500"
                              : weatherData.parasiteRisk.riskLevel ===
                                  "Moderate"
                                ? "text-yellow-500"
                                : "text-green-500"
                        }`}
                      >
                        {weatherData.parasiteRisk.totalRisk}/100
                      </span>
                    </div>

                    <div
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Base Risk (Region):
                        </span>
                        <span className="font-bold text-gray-900">
                          {weatherData.parasiteRisk.baseRisk}/60
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Weather Risk (Current):
                        </span>
                        <span className="font-bold text-gray-900">
                          {weatherData.parasiteRisk.weatherRisk}/40
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-gray-600">
                          Recent Rainfall (14d):
                        </span>
                        <span className="font-bold text-gray-900">
                          {weatherData.parasiteRisk.weather.recentRainfall}mm
                        </span>
                      </div>
                      <div className="pt-3 border-t mt-2">
                        <button
                          onClick={() => setShowAdditionalInfo((prev) => !prev)}
                          className="w-full flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium py-2 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 text-white text-[10px]">
                            +
                          </div>
                          View Additional Information
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Current weather section */}
                <div className="mb-4">
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
                          Humidity: {weatherData.periods[0].humidity}%
                        </p>

                        <p className="text-xs text-gray-600">
                          Wind: {weatherData.periods[0].windSpeed} m/s
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

                {/* Button- toggle 24-hour forecast */}
                <button
                  onClick={() => setShowForecast(!showForecast)}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {showForecast
                    ? "Hide 24-Hour Forecast"
                    : "Show 24-Hour Forecast"}
                </button>

                {/* 24-hour forecast - only shown when showForecast is true */}
                {showForecast && (
                  <div className="mt-4 space-y-2 max-h-[40vh] overflow-y-auto">
                    <h4 className="font-semibold text-sm text-gray-700 border-b pb-1 sticky top-0 bg-white">
                      Next 24 Hours
                    </h4>

                    {weatherData.periods.slice(1).map((period, index) => (
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
                              Humidity: {period.humidity}% | Wind:{" "}
                              {period.windSpeed} m/s
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">
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
{AdditionalInfo && weatherData?.parasiteRisk && (
  <div className="w-[320px] bg-white border-r p-6 overflow-y-auto ">
    <h3 className="text-lg font-bold mb-4 text-gray-800 space-y-1 ">
      Additional Information
    </h3>
    <div className="text-sm text-gray-700  space-y-1 mb-6 border-t pt-4">
      <p>
        
        {weatherData.parasiteRisk.regionData.riskExplained}
        </p>
      </div>

    {/* Recommended Actions */}
    <div className="mb-6 border-t pt-4">
      <h4 className="font-semibold text-gray-800 mb-2">Recommended Actions</h4>

      {weatherData.parasiteRisk.totalRisk >= 7 && (
        <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Consider fecal egg count testing</li>
          <li>Monitor animals for weight loss or scouring</li>
          <li>Avoid grazing wet, overstocked pasture</li>
          <li>Speak to your vet about treatment timing</li>
        </ul>
      )}

      {weatherData.parasiteRisk.totalRisk >= 4 &&
        weatherData.parasiteRisk.totalRisk < 7 && (
          <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
            <li>Monitor animals closely</li>
            <li>Plan testing if wet weather continues</li>
            <li>Rotate pasture where possible</li>
          </ul>
        )}

      {weatherData.parasiteRisk.totalRisk < 4 && (
        <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
          <li>Continue normal monitoring</li>
          <li>No immediate action needed</li>
        </ul>
      )}
    </div>

    {/* Why risk is at this level */}
    <div className="border-t pt-4">
      <h4 className="font-semibold text-gray-800 mb-3">Why risk is at this level</h4>

      <div className="space-y-3 text-sm text-gray-700">
        <p>
          Annual Rainfall: {weatherData.parasiteRisk.regionData.rainfallMm} mm
        
          <div className="text-xs text-gray-500 mt-1">
          Wet conditions allow parasite larvae to survive on pasture.
          </div>
        </p>

        <p>
         Annual Temperature: {weatherData.parasiteRisk.regionData.temperatureC}°C
        </p>

        <p>
         Annual Humidity: {weatherData.parasiteRisk.regionData.humidityPercent}%
        </p>

        <p>
          Risk Level: {weatherData.parasiteRisk.riskLevel}
        </p>
      </div>

      {/* Most Likely Parasites */}
      <div className="border-t pt-4 mt-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          Most Likely Parasites (Biology-Based Model)
        </h4>

        {(() => {
          const region = weatherData.parasiteRisk.regionData;
          const temp = region.temperatureC;
          const recentRain = region.rainfallMm;
          const humidity = region.humidityPercent;
          const density = region.livestockDensity;

          const parasites = [
            {
              name: "Nematodes (Roundworm)",
              level:
                temp >= 8 && recentRain >= 20 && humidity >= 70
                  ? "High"
                  : temp >= 5 && recentRain >= 10
                    ? "Moderate"
                    : "Low",
              reason:
                temp >= 8 && recentRain >= 20 && humidity >= 70
                  ? "Warm, wet, and humid conditions allow eggs to hatch and larvae to survive on pasture."
                  : "Conditions are less favorable for egg hatching and larvae survival.",
            },
            {
              name: "Fasciola hepatica (Liver Fluke)",
              level:
                temp >= 10 && recentRain >= 30 && humidity >= 75
                  ? "High"
                  : recentRain >= 20
                    ? "Moderate"
                    : "Low",
              reason:
                temp >= 10 && recentRain >= 30 && humidity >= 75
                  ? "Sustained rainfall and warm temperatures support mud snails, increasing fluke risk."
                  : "Lower rainfall limits snail habitat, reducing liver fluke risk.",
            },
            {
              name: "Dictyocaulus viviparus (Lungworm)",
              level:
                temp >= 10 && recentRain >= 20 && density > 100
                  ? "High"
                  : recentRain >= 15
                    ? "Moderate"
                    : "Low",
              reason:
                temp >= 10 && recentRain >= 20
                  ? "Moist, warm pastures allow larvae to survive; high stocking density increases infection risk."
                  : "Less favorable conditions reduce lungworm survival.",
            },
            {
              name: "Blowfly Strike",
              level:
                temp >= 12 && humidity >= 70
                  ? "High"
                  : temp >= 10
                    ? "Moderate"
                    : "Low",
              reason:
                temp >= 12 && humidity >= 70
                  ? "Warm, humid weather keeps fleece moist, attracting blowflies."
                  : "Cooler or drier conditions reduce blowfly activity.",
            },
            {
              name: "Coccidia",
              level:
                density > 150
                  ? "High"
                  : density > 80
                    ? "Moderate"
                    : "Low",
              reason:
                density > 150
                  ? "High stocking density increases transmission between youngstock."
                  : "Lower stocking density reduces risk.",
            },
          ];

          const order = { High: 3, Moderate: 2, Low: 1 };
          const sorted = parasites.sort((a, b) => order[b.level] - order[a.level]);

          return sorted.map((p, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold text-sm">{index + 1}. {p.name}</p>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold mb-1 inline-block ${
                  p.level === "High"
                    ? "bg-red-100 text-red-700"
                    : p.level === "Moderate"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {p.level}
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
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="w-full h-full">
                <MapPage
                  onWeatherDataChange={setWeatherData}
                  onLoadingChange={setWeatherLoading}
                />
              </div>
            </div>

            <div className="absolute top-6 right-6 bg-white shadow rounded p-4 z-500">
              <h3 className="text-sm font-bold mb-3">Risk Level ↑</h3>
              <div className="space-y-1 text-sm">
                <div className="text-red-600 mt-1 font-semibold">High</div>
                <div className="text-orange-400 mt-1 font-semibold">Medium</div>
                <div className="text-yellow-400 mt-1 font-semibold">Low</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-t">
          <details className="p-4 border-b">
            <summary className="cursor-pointer font-medium">
              About the data & limitations
            </summary>
            <div className="p-6 bg-gray-50 rounded mt-4 space-y-5">
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Population Representation
                </div>
                <p className="text-gray-700 mt-1">
                  The locations shown on this map are reference grazing areas
                  used as proxies for nearby farmland. They do not represent all
                  farms or animals within the region. Risk estimates are based
                  on environmental conditions at these locations and may not
                  reflect local variation within individual fields.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Environmental Proxies
                </div>
                <p className="text-gray-700 mt-1">
                  Parasite risk shown on this map is estimated using
                  environmental factors such as rainfall, temperature, and
                  humidity. These factors influence parasite survival and
                  development but do not confirm the presence of parasites in
                  animals.
                </p>
              </div>
              <div className="border-l-4 border[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Sampling & Data Coverage
                </div>
                <p className="text-gray-700 mt-1">
                  Weather data is sourced from publicly available APIs and
                  represents modelled or station-based estimates. Data gaps or
                  approximations may exist, particularly for rural or remote
                  areas.
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
                <div className="font-semibold text-[#2171b8]">
                  Rule-Based Risk Scoring
                </div>
                <p className="text-gray-700 mt-1">
                  Risk scores are calculated using a simple, transparent
                  rule-based model. The thresholds used are illustrative and are
                  intended to support discussion rather than provide definitive
                  guidance.
                </p>
              </div>
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8]">
                  Interpretation Guidance
                </div>
                <p className="text-gray-700 mt-1">
                  This tool is designed to support discussion and
                  decision-making between farmers, vets, and advisors. It should
                  not be used as a sole basis for treatment decisions.
                </p>
              </div>
            </div>
          </details>
          <details className="p-4">
            <summary className="cursor-pointer font-medium">
              Feedback? What could we improve on
            </summary>
            <div className="p-6 bg-gray-100 rounded mt-4">
              <p className="mb-5 text-gray-txt">
                Have questions, suggestions, or just want to say hello? We'd
                love to hear from you! Drop us a message and we'll get back to
                you as soon as possible.
              </p>
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-dark onclick-blue"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-txt text-base outline-none text-gray-txt py-1 px-3 leading-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-dark"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-txt text-base outline-none text-gray-txt py-1 px-3 leading-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-dark"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-txt text-base outline-none text-gray-txt py-1 px-3 leading-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>
              <button className="text-white bg-[#2171b8] cursor-pointer transition duration-300 hover:bg-blue-500 border-0 py-3 px-4 focus:outline-none rounded text-lg">
                Submit
              </button>
            </div>
          </details>
        </div>

        {/* First modal - About this map */}
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-500">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <i
                  className="fa-notdog fa-solid fa-sun"
                  style={{ color: "rgba(255, 208, 40, 1.00)" }}
                />
                About this map
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                This map shows an estimated parasite risk level based on
                environmental conditions. It is meant to be used as a guide to
                help you understand potential parasite risk in your area, but
                should not be used as the sole source of information for making
                decisions about parasite management.
                <br />
                <br />
                Always consult with your veterinarian for specific advice about
                parasite control on your farm.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-100 font-semibold hover:bg-gray-200 transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  More info
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowModal2(true);
                  }}
                  className="px-4 py-2 rounded bg-[#2171b8] text-white hover:bg-[#02253e] font-semibold cursor-pointer transition duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Second modal - How to use this map */}
        {showModal2 && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-500">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <i
                  className="fa-notdog fa-solid fa-sun"
                  style={{ color: "rgba(255, 208, 40, 1.00)" }}
                />
                How to use this map
              </h3>
              <ul className="space-y-4 text-sm text-gray-700 mb-4">
                <li>• Zoomed out – shows approximate regional parasite risk</li>
                <li>• Zoomed in – shows individual reference grazing areas</li>
                <li>
                  • Click a location to see what environmental factors are
                  driving the risk.
                </li>
              </ul>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal2(false)}
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
