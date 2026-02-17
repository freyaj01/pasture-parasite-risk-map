"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapPage from "../Map/page";

export default function Display() {
  const [showModal, setShowModal] = useState(true);
  return (
    <main>
      <Header />

      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex flex-col">
        <div className="flex flex-1 relative">
          {/*Info Panel */}
          <aside className="w-[320px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              How to use this map
            </h2>
            <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <li>• Zoomed out – shows approximate regional parasite risk</li>
              <li>• Zoomed in – shows individual reference grazing areas</li>
              <li>
                • Click a location to see what environmental factors are driving
                the risk.
              </li>
            </ul>
          </aside>

          {/* Map Area */}
          <main className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-gray-800">
              <div className="w-full h-full">
                <MapPage />
              </div>
            </div>

            <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 shadow rounded p-4 z-500">
              <h3 className="text-sm font-bold mb-3 text-gray-900 dark:text-gray-100">
                Risk Level ↑
              </h3>
              <div className="space-y-1 text-sm">
                <div className="text-red-600 mt-1 font-semibold">High </div>
                <div className="text-orange-400 mt-1 font-semibold ">Medium </div>
                <div className="text-yellow-400 mt-1 font-semibold ">Low </div>
              </div>
            </div>
          </main>
        </div>

        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <details className="p-4 border-b border-gray-200 dark:border-gray-700">
            <summary className="cursor-pointer font-medium text-gray-900 dark:text-gray-100">
              About the data & limitations
            </summary>
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded mt-4 space-y-5">
              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8] dark:text-blue-400">
                  Population Representation
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  The locations shown on this map are reference grazing areas used as proxies for nearby farmland. They do not represent all farms or animals within the region. Risk estimates are based on environmental conditions at these locations and may not reflect local variation within individual fields.
                </p>
              </div>

              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8] dark:text-blue-400">
                  Environmental Proxies
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Parasite risk shown on this map is estimated using environmental factors such as rainfall, temperature, and humidity. These factors influence parasite survival and development but do not confirm the presence of parasites in animals.
                </p>
              </div>

              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8] dark:text-blue-400">
                  Sampling & Data Coverage
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Weather data is sourced from publicly available APIs and represents modelled or station-based estimates. Data gaps or approximations may exist, particularly for rural or remote areas.
                </p>
              </div>

              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8] dark:text-blue-400">
                  Seasonality
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Parasite risk is influenced by seasonal patterns. The data displayed represents conditions over a recent time window and may not reflect risk at other times of the year.
                </p>
              </div>

              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8] dark:text-blue-400">
                  Rule-Based Risk Scoring
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Risk scores are calculated using a simple, transparent rule-based model. The thresholds used are illustrative and are intended to support discussion rather than provide definitive guidance.
                </p>
              </div>

              <div className="border-l-4 border-[#02253e] pl-4">
                <div className="font-semibold text-[#2171b8] dark:text-blue-400">
                  Interpretation Guidance
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  This tool is designed to support discussion and decision-making between farmers, vets, and advisors. It should not be used as a sole basis for treatment decisions.
                </p>
              </div>
            </div>
          </details>

          <details className="p-4">
            <summary className="cursor-pointer font-medium text-gray-900 dark:text-gray-100">
              Feedback? What could we improve on
            </summary>
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded mt-4">
              <p className="mb-5 text-gray-700 dark:text-gray-300">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you! Drop us a message and we'll get back to you as soon as possible.
              </p>

              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-900 dark:text-gray-100"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-900 dark:text-gray-100"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-900 dark:text-gray-100"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 text-base outline-none text-gray-900 dark:text-gray-100 py-1 px-3 leading-8
               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>

              <button className="text-white bg-[#2171b8] hover:bg-blue-500 border-0 py-3 px-4 focus:outline-none rounded text-lg transition duration-300">
                Submit
              </button>
            </div>
          </details>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-500">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <i
                  className="fa-notdog fa-solid fa-sun"
                  style={{ color: "rgba(255, 208, 40, 1.00)" }}
                />
                About this map
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                This map shows an estimated parasite risk level based on environmental conditions. It is meant to be used as a guide to help you understand potential parasite risk in your area, but should not be used as the sole source of information for making decisions about parasite management.<br /><br />
                Always consult with your veterinarian for specific advice about parasite control on your farm.
              </p>

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
                  onClick={() => setShowModal(false)}
                >
                  More info
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-[#2171b8] hover:bg-[#02253e] text-white font-semibold transition duration-300"
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
