import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const references = [
  {
    id: 1,
    authors: "Shearer, C. L. & Ezenwa, V. O.",
    year: 2020,
    title: "Rainfall as a Driver of Seasonality in Parasitism",
    journal: "International Journal for Parasitology: Parasites and Wildlife",
    vol: "vol. 12, pp. 8–12",
    url: "https://doi.org/10.1016/j.ijppaw.2020.04.004",
  },
  {
    id: 2,
    authors: "MSD Veterinary Manual",
    year: null,
    title: "Overview of Gastrointestinal Parasites of Ruminants",
    journal: "MSD Veterinary Manual",
    vol: null,
    url: "https://www.msdvetmanual.com/digestive-system/gastrointestinal-parasites-of-ruminants/overview-of-gastrointestinal-parasites-of-ruminants",
  },
  {
    id: 3,
    authors: "NADIS Animal Health Skills",
    year: null,
    title: "Parasite Forecast",
    journal: "NADIS",
    vol: null,
    url: "https://nadis.org.uk/parasite-forecast",
  },
  {
    id: 4,
    authors: "SCOPS",
    year: 2025,
    title: "2025 Historic Data",
    journal: "SCOPS",
    vol: null,
    url: "https://www.scops.org.uk/forecasts/historic-data/2025-data/",
  },
  {
    id: 5,
    authors: "ESCCAP",
    year: null,
    title: "Parasite Infection Maps",
    journal: "ESCCAP",
    vol: null,
    url: "https://www.esccap.org/parasite-infection-map/#&mapregion=GB&province=GB-",
  },
  {
    id: 6,
    authors: "Texas A&M AgriLife Extension Service - Faries, F. C.",
    year: 2005,
    title: "Common Cattle Parasites",
    journal: "Texas A&M AgriLife Extension",
    vol: null,
    url: "https://agrilifeextension.tamu.edu/wp-content/uploads/2025/05/common-cattle-parasites.pdf",
  },
  {
    id: 7,
    authors: "Nature / Scientific Reports",
    year: 2023,
    title: "Climatic drivers of helminth parasite distributions",
    journal: "Scientific Reports",
    vol: null,
    url: "https://www.nature.com/articles/s41598-023-32890-0",
  },
  {
    id: 8,
    authors: "Met Office",
    year: null,
    title: "UK and Regional Climate Series",
    journal: "Met Office",
    vol: null,
    url: "https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-and-regional-series",
  },
  {
    id: 9,
    authors: "Pet Disease Alerts",
    year: null,
    title: "30 Day Pet Parasite Forecast Maps",
    journal: "Pet Disease Alerts",
    vol: null,
    url: "https://petdiseasealerts.org/forecast-map/",
  },
  {
    id: 10,
    authors: "Elanco / My Pet and I",
    year: null,
    title: "Lungworm Map",
    journal: "My Pet and I – Elanco",
    vol: null,
    url: "https://mypetandi.elanco.com/en_gb/lungworm-map",
  },
];

const envFactors = [
  {
    factor: "Rainfall",
    summary:
      "Rainfall is one of the main factors that drives parasite risk. Wet conditions allow larvae to survive on pasture and support populations such as mud snails. Shearer & Ezenwa (2020) found rainfall to be a key predictor of parasite burden across multiple parasite systems. In the UK, the wetter western regions like the North West, South West and Wales consistently show higher fluke and nematode pressure than drier eastern regions.",
    stat: "Liver fluke risk increases significantly when rainfall exceeds 30 mm in a month in autumn.",
    refs: [1, 3, 8],
  },
  {
    factor: "Temperature",
    summary:
      "Temperature has a lrage impact on the rate of larval development. Most parasites require temperatures above 8–10°C to develop. In the UK, this creates a spring/autumn risk window. Mild winters are increasingly extending this period year round. If temperatures go below 5°C it temporarily suppresses the egg development but does not kill larvae that is already present.",
    stat: "Nematode larvae develop fastest at 18-20°C. Development stalls below 5°C and above 35°C.",
    refs: [2, 6, 7],
  },
  {
    factor: "Humidity",
    summary:
      "High humidity helps prevent larvae from drying out, as many species are sensitive to dehydration and require moist conditions for healthy growth. Without adequate moisture, larvae die quite quickly. Warm temperatures and high humidity creates peak conditions. The UK's cold climate means high humidity is common from September through April.",
    stat: "Larval survival on pasture drops sharply when relative humidity falls below 60%.",
    refs: [1, 4],
  },
];

const parasites = [
  {
    name: "Nematodes (Roundworm)",
    tempRange: "8–25°C",
    humidityRange: "=> 70%",
    rainfallRange: "=> 20 mm / month",
    description:
      "Nematode larvae (including Ostertagia, Cooperia, and Haemonchus species) develop optimally in warm, moist conditions. Eggs hatch when temperatures exceed 8°C and humidity is high. If there are a lot of animals in the pasture it can help accelerate transmission between animals. Larvae can survive on pasture for months during cool, wet weather, making autumn and spring the highest risk periods in the UK, leaving young animals the most vulnerable.",
    riskFactors: [
      "Warm, wet summers and autumns",
      "High animal density",
      "Overgrazed or contaminated pasture",
      "Young animals",
      "Preventment options",
    ],
    vetNote:
      "SCOPS and NADIS recommend strategic use of faecal egg counts (FECs) which is measuring the number of parasite eggs in an animal's manure to try slow development. Targeted selective treatment which is selectively treating only certain animals in a flock, which can slow down the development of medication resistance,  (TST) is now best practice for sheep nematodes.",
    refs: [2, 4, 6],
    severity: "High",
  },
  {
    name: "Fasciola hepatica (Liver Fluke)",
    tempRange: "10–25°C",
    humidityRange: "=> 75%",
    rainfallRange: "=> 30 mm / month",
    description:
      "Liver fluke requires the mud snail (Galba truncatula) as a host. Snail populations thrive in warm, waterlogged ground, particularly along ditches, and poorly drained areas. A lot of rainfall and mild temperatures creates the ideal snail habitat. UK autumn and winter are the peak transmission period for fluke disease. The Met Office reports the highest fluke risk in the North West, Wales, and South West due to their wetter climates.",
    riskFactors: [
      "Wet, boggy, or poorly drained ground",
      "Mild autumn temperatures (above 10°C)",
      "Grazing near water sources or field margins",
      "High summer rainfall increaing snail habitat",
      "Cattle and sheep grazed on same pasture",
    ],
    vetNote:
      "NADIS Parasite Forecast provides monthly liver fluke risk maps for the UK. Treatment timing is critical, triclabendazole targets early immature flukes while other flukicides only work on adults. Always consult with vet and test before treating.",
    refs: [1, 3, 4, 8],
    severity: "High",
  },
  {
    name: "Dictyocaulus viviparus (Lungworm)",
    tempRange: "=> 10°C",
    humidityRange: "=> 65%",
    rainfallRange: "=> 15 mm / month",
    description:
      "Lungworm larvae are spread via coughing and can exist on moist pastures. Outbreaks often occur in late summer and autumn when large numbers of infective larvae are present after a period of larval accumulation. First season grazing animals are most at risk as they lack acquired immunity. Larvae can be spread by the fungus Pilobolus, allowing rapid spreading across fields.",
    riskFactors: [
      "Late summer and autumn grazing",
      "Newborn animals",
      "Moist pastures after rain",
      "Warm nights above 10°C",
    ],
    vetNote:
      "Elanco's lungworm map tracks UK lungworm cases based on vet reports. Vaccination with an oral larvated vaccine is available for cattle and is recommended before the grazing season.",
    refs: [2, 9, 10],
    severity: "Moderate",
  },
  {
    name: "Blowfly Strike",
    tempRange: "=> 12°C",
    humidityRange: "=> 70%",
    rainfallRange: "Any rainfall",
    description:
      "Blowfly strike (myiasis) occurs when blowflies lay eggs in, open wounds, or natural body openings. Larvae hatch within hours and begin feeding on skin tissue. Warm, humid weather dramatically accelerates egg development and larval activity. Sheep are most at risk during warm, damp conditions from April through October. Untreated strike can be fatal within days.",
    riskFactors: [
      "Warm, humid weather above 12°C",
      "Wet, or manure stained wool",
      "Skin wounds, footrot, or wool/hide damage",
      "Dense sheep populations in humid areas",
      "Delayed shearing",
    ],
    vetNote:
      "Preventative treatment like licensed insect growth regulators (like dicyclanil or cyromazine) applied before peak fly season is recommended by SCOPS. Check animals daily during high-risk periods. Prompt treatment of affected animals is essential.",
    refs: [4, 6],
    severity: "Moderate",
  },
  {
    name: "Coccidia",
    tempRange: "5–37°C",
    humidityRange: "Any",
    rainfallRange: "Any",
    description:
      "Coccidia are highly resilient and can persist in the environment for many months. Transmission is primarily oral and is driven more by stocking density and hygiene than by weather conditions. Young animamls, particularly lambs and calves in their first weeks of life, are most vulnerable. Stress, poor nutrition, sudden dietary changes, and overcrowding all significantly increase risk of disease.",
    riskFactors: [
      "High stocking density indoors or at pasture",
      "Poor pen hygiene or contaminated water sources",
      "Youngstock under 6 months of age",
      "Nutritional stress or sudden dietary change",
    ],
    vetNote:
      "Diagnosis is by faecal oocyst count and species identification. Treatment with toltrazuril or diclazuril is effective when given at the right time. Preventative metaphylaxis in high-risk groups is a common practice.",
    refs: [2, 7],
    severity: "Low",
  },
];

export default function Info() {
  const [activeParasite, setActiveParasite] = useState(0);
  const [expandedRef, setExpandedRef] = useState<number | null>(null);

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
            This page explains the environmental and veterinary sciences behind the risk scores shown on 
            the info panel. All data presented on the info is based on our own research.
          </p>
        </div>
      </section>

      <div className=" mx-auto px-4 sm:px-6 py-12 bg-white">

        {/* Environmental Factors */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Environmental Risk Factors</h2>
          <p className="text-gray-500 text-sm mb-6">
            How weather conditions impact parasite survival in the UK.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {envFactors.map((fact) => (
              <div
                key={fact.factor}
                className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow mb-6"
              >
                <div className="text-3xl mb-3"></div>
                <h3 className="font-bold text-gray-900 text-base mb-2">{fact.factor}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{fact.summary}</p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-[#2171b8] font-semibold leading-snug mb-4">
                    {fact.stat}
                </div>
                <div className="flex flex-wrap gap-1">
                  {fact.refs.map((r) => (
                    <span key={r} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      [{r}]
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Parasites */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1 ">Parasites</h2>
          <p className="text-gray-500 text-sm mb-6">
            You can choose a parasite and view its environmental thresholds, risk factors, and veterinary context.
          </p>

          {/* Buttons*/}
          <div className="flex flex-wrap gap-2 mb-6">
            {parasites.map((parasite, i) => (
              <button
                key={parasite.name}
                onClick={() => setActiveParasite(i)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer border ${
                  activeParasite === i ? "bg-[#2171b8] text-white border-[#2171b8]" : "bg-blue-50 text-[#1877F2] border-blue-200 hover:bg-blue-100"
                }`}
              >
                 {parasite.name.split("(")[0].trim()}
              </button>
            ))}
          </div>

          {/* Active card */}
          {(() => {
            const parasite = parasites[activeParasite];
            return (
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="bg-[#0072ce] px-6 py-5 text-white flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-2xl mb-1"></p>
                    <h3 className="text-xl font-bold">{parasite.name}</h3>
                  </div>
                
                </div>

                <div className="p-6 grid sm:grid-cols-2 gap-6  ">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 text-sm">Description</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{parasite.description}</p>

                    <h4 className="font-semibold text-gray-800 mt-5 mb-2 text-sm">Risk Factors</h4>
                    <ul className="space-y-1">
                      {parasite.riskFactors.map((r) => (
                        <li key={r} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-[#2171b8] mt-0.5">•</span> {r}
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-semibold text-gray-800 mt-5 mb-2 text-sm ">Veterinary Guidance</h4>
                    <p className="text-sm text-gray-600 leading-relaxed italic ">{parasite.vetNote}</p>

                    <div className="flex flex-wrap gap-1 mt-4 ">
                      {parasite.refs.map((r) => (
                        <span key={r} className=" text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          [{r}]
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm  ">
                        Optimal Conditions for Development
                      </h4>
                      <div className="flex items-center justify-between py-2 bg-blue-50 rounded-lg px-4 border border-blue-200 gap-3 flex-col">
                        <div className="flex justify-between w-full border-b border-blue-200 pb-2 text-sm">
                          <span className="text-gray-600">Temperature</span>
                          <span className="font-bold text-gray-900">{parasite.tempRange}</span>
                        </div>
                        <div className="flex justify-between w-full border-b border-blue-200 pb-2 text-sm">
                          <span className="text-gray-600">Humidity</span>
                          <span className="font-bold text-gray-900">{parasite.humidityRange}</span>
                        </div>
                        <div className="flex justify-between w-full text-sm">
                          <span className="text-gray-600">Rainfall</span>
                          <span className="font-bold text-gray-900">{parasite.rainfallRange}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* Useful Resources */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1  ">Useful Resources</h2>
          <p className="text-gray-500 text-sm mb-6">
            Trusted veterinary and research tools for parasite monitoring in the UK.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              {
                name: "NADIS Parasite Forecast",
                desc: "UK-wide monthly parasite risk forecasts written by veterinary professionals.",
                url: "https://nadis.org.uk/parasite-forecast",
              },
              {
                name: "SCOPS Historic Data",
                desc: "Sustainable Control of Parasites in Sheep — resistance and control guidance.",
                url: "https://www.scops.org.uk/forecasts/historic-data/2025-data/",
              },
              {
                name: "ESCCAP Parasite Map",
                desc: "Interactive parasite infection maps for Great Britain.",
                url: "https://www.esccap.org/parasite-infection-map/#&mapregion=GB&province=GB-",
              },
              {
                name: "Pet Disease Alerts",
                desc: "30-day parasite forecast maps updated regularly across the UK.",
                url: "https://petdiseasealerts.org/forecast-map/",
              },
              {
                name: "Elanco Lungworm Map",
                desc: "Near real-time UK lungworm risk map and clinical guidance from Elanco.",
                url: "https://mypetandi.elanco.com/en_gb/lungworm-map",
              },
              {
                name: "MSD Veterinary Manual",
                desc: "Clinical overview of gastrointestinal parasites in ruminants.",
                url: "https://www.msdvetmanual.com/digestive-system/gastrointestinal-parasites-of-ruminants/overview-of-gastrointestinal-parasites-of-ruminants",
              },
              {
                name: "WormWize Nowcast",
                desc: "European helminth risk nowcasting tool based on current weather data.",
                url: "https://wormwize.eu/nowcast/",
              },
              {
                name: "Met Office UK Climate Data",
                desc: "UK and regional climate series — rainfall and temperature records.",
                url: "https://www.metoffice.gov.uk/research/climate/maps-and-data/uk-and-regional-series",
              },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4 hover:border-[#2171b8] hover:shadow-sm transition group"
              >
                <span className="text-[#2171b8] text-lg mt-0.5 font-bold">^</span>
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
            All sources used to inform the risk model and content is here.
          </p>
          <div className="bg-white border-t dark:text-black">
            {references.map((ref) => (
              <details key={ref.id} className="border-b">
                <summary
                  className="font-medium px-5 py-3 transition list-none flex items-center justify-between"
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedRef(expandedRef === ref.id ? null : ref.id);
                  }}
                >
                  <span className="text-sm text-gray-700">
                    <span className="text-[#2171b8] font-bold mr-2">[{ref.id}]</span>
                    {ref.authors}{ref.year ? ` (${ref.year})` : ""} — {ref.title}
                  </span>
                 
                </summary>
                {expandedRef === ref.id && (
                  <div className="px-5 pb-4 text-sm text-gray-600 border-t bg-gray-50">
                    <p className="mt-2">
                      <span className="font-medium">Source:</span> {ref.journal}
                      {ref.vol ? `, ${ref.vol}` : ""}
                    </p>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#2171b8] underline text-xs mt-1 block break-all hover:text-[#02253e] transition"
                    >
                      {ref.url}
                    </a>
                  </div>
                )}
              </details>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </main>
  );
}