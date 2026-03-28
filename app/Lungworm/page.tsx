"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const parasites = [
  {
    name: "Dictyocaulus viviparus",
    latin: "Strongylida: Dictyocaulidae",
    what: "A parasitic worm that infects the lungs and airways of cattle. Adult worms live in the trachea and bronchi, causing significant respiratory disease.",
    how: "Animals become infected by eating larvae from contaminated grass while grazing. Larvae migrate through the gut wall and travel to the lungs via the bloodstream.",
    symptoms: [
      "Coughing, often severe and persistent",
      "Difficulty breathing",
      "Reduced appetite and weight loss",
      "Poor growth, particularly in young cattle",
    ],
    whyItMatters:
      "Can cause serious lung damage and, in severe cases, can be life-threatening if untreated. Outbreaks are common in young cattle during their first grazing season.",
    prevention: [
      "Regular deworming with appropriate anthelmintics",
      "Good pasture management — avoid overgrazing and rotating pastures",
      "Vaccination is available and recommended for calves",
      "Monitor animals closely during the grazing season",
    ],
  },
];

export function LungTrachea() {
  const p = parasites[0];

  return (
    <main>
      <Header />

      <section className="bg-[#0072ce] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Lung and Trachea
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            Parasites that affect the respiratory system, primarily the lungs
            and airways. Infection typically occurs through grazing on
            contaminated pasture.
          </p>
        </div>
      </section>

      <div className="mx-auto px-4 sm:px-6 py-12 bg-white">
        <section className="mb-12">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#0072ce] px-6 py-5 text-white">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-blue-200 text-sm italic mt-0.5">{p.latin}</p>
            </div>

            <div className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    What
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {p.what}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    How Infection Happens
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {p.how}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    Why It Matters
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {p.whyItMatters}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    Symptoms
                  </h4>
                  <ul className="space-y-1">
                    {p.symptoms.map((s) => (
                      <li
                        key={s}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-[#2171b8] mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                    Prevention
                  </h4>
                  <ul className="space-y-1">
                    {p.prevention.map((s) => (
                      <li
                        key={s}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-[#2171b8] mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default LungTrachea;
