"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { parasites, environmentFactors } from "../data/parasites";
import { references } from "../data/references";

const resources = [
  {
    name: "NADIS Parasite Forecast",
    desc: "Monthly UK parasite risk forecasts from vets.",
    url: "https://nadis.org.uk/parasite-forecast",
  },
  {
    name: "SCOPS Historic Data",
    desc: "Resistance and control guidance for sheep parasites.",
    url: "https://www.scops.org.uk/forecasts/historic-data/2025-data/",
  },
  {
    name: "ESCCAP Parasite Map",
    desc: "Interactive parasite infection maps for Great Britain.",
    url: "https://www.esccap.org/parasite-infection-map/#&mapregion=GB&province=GB-",
  },
  {
    name: "Pet Disease Alerts",
    desc: "30 day parasite forecast maps across the UK.",
    url: "https://petdiseasealerts.org/forecast-map/",
  },
  {
    name: "Elanco Lungworm Map",
    desc: "UK lungworm risk map and guidance from Elanco.",
    url: "https://mypetandi.elanco.com/en_gb/lungworm-map",
  },
  {
    name: "MSD Veterinary Manual",
    desc: "Clinical overview of GI parasites in ruminants.",
    url: "https://www.msdvetmanual.com/digestive-system/gastrointestinal-parasites-of-ruminants/overview-of-gastrointestinal-parasites-of-ruminants",
  },
  {
    name: "WormWize Nowcast",
    desc: "European helminth risk tool based on current weather.",
    url: "https://wormwize.eu/nowcast/",
  },
  {
    name: "Met Office UK Climate Data",
    desc: "UK and regional rainfall and temperature records.",
    url: "https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-and-regional-series",
  },
  {
    name: "Eldorado Weather",
    desc: "Your source for world weather",
    url: "https://eldoradoweather.com/climate/uk/regional-climates",
  },
];

function RefBadges({ refs }: { refs: string[] }) {
  return (
    <div className="flex flex-wrap gap-1 mt-4">
      {refs.map((r: string) => (
        <span
          key={r}
          className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
        >
          [{r}]
        </span>
      ))}
    </div>
  );
}

export default function Info() {
  const [activeParasite, setActiveParasite] = useState(0);

  const parasite = parasites[activeParasite];

  return (
    <main>
      <Header />

      <section className="bg-[#0072ce] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-blue-200 mb-1 font-semibold">
            Research & Evidence
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Understanding Parasite Risk
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            The environmental and veterinary science behind the risk scores on
            the info panel. All data is based on our own research.
          </p>
        </div>
      </section>

      <div className="mx-auto px-4 sm:px-6 py-12 bg-white">
        {/* Environmental Factors */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Environmental Risk Factors
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            How weather conditions affect parasite survival in the UK.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {environmentFactors.map((fact) => (
              <div
                key={fact.factor}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {fact.factor}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {fact.summary}
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-[#2171b8] font-semibold leading-snug mb-4">
                  {fact.stat}
                </div>
                <RefBadges refs={fact.refs.map(String)} />
              </div>
            ))}
          </div>
        </section>

        {/* Parasites */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Parasites</h2>
          <p className="text-gray-500 text-sm mb-6">
            Select a parasite to view its thresholds, risk factors and vet
            guidance.
          </p>

          <div className="flex flex-wrap gap-2 mb-6 ">
            {parasites.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActiveParasite(i)}
                className={`text-sm px-3 py-1.5 rounded-full border transition  ${
                  activeParasite === i
                    ? "bg-[#0072ce] text-white border-[#0072ce]"
                    : "bg-white text-gray-700 border-gray-300 cursor-pointer hover:border-[#0072ce]"
                }`}
              >
                {p.name.split("(")[0].trim()}
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#0072ce] px-6 py-5 text-white">
              <h3 className="text-xl font-bold">{parasite.name}</h3>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  Description
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {parasite.description}
                </p>

                <h4 className="font-semibold text-gray-800 mt-5 mb-2 text-sm">
                  Risk Factors
                </h4>
                <ul className="space-y-1">
                  {parasite.riskFactors.map((r) => (
                    <li
                      key={r}
                      className="text-sm text-gray-600 flex items-start gap-2"
                    >
                      <span className="text-[#2171b8] mt-0.5">•</span> {r}
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-gray-800 mt-5 mb-2 text-sm">
                  Veterinary Guidance
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {parasite.vetNote}
                </p>
                <RefBadges refs={parasite.refs.map(String)} />
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                  Optimal Conditions for Development
                </h4>
                <div className="bg-blue-50 rounded-lg px-4 py-3 border border-blue-200 flex flex-col gap-2">
                  {[
                    { label: "Temperature", value: parasite.tempRange },
                    { label: "Humidity", value: parasite.humidityRange },
                    { label: "Rainfall", value: parasite.rainfallRange },
                  ].map(({ label, value }, i, arr) => (
                    <div
                      key={label}
                      className={`flex justify-between text-sm ${i < arr.length - 1 ? "border-b border-blue-200 pb-2" : ""}`}
                    >
                      <span className="text-gray-600">{label}</span>
                      <span className="font-bold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Resources to take a look at
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Veterinary and research tools for parasite monitoring in the UK.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {resources.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-[#2171b8] hover:shadow-sm transition group"
              >
                <span className="text-[#2171b8] text-lg mt-0.5 font-bold">
                  ^
                </span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm group-hover:text-[#2171b8] transition">
                    {link.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* References */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">References</h2>
          <p className="text-gray-500 text-sm mb-4">
            All the sources used to formulate the risk estimations and info.
          </p>
          <div className="bg-white border-t dark:text-black">
            {references.map((ref) => (
              <div
                key={ref.id}
                className="border-b w-full text-left px-5 py-3 flex items-center justify-between"
              >
                <span className="text-sm text-gray-700">
                  <span className="text-[#2171b8] font-bold mr-2">
                    [{ref.id}]
                  </span>
                  {ref.authors}
                  {ref.year ? ` (${ref.year})` : ""} — {ref.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
