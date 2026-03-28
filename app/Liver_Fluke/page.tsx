"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const parasites = [
  {
    name: "Liver Fluke",
    latin: "Fasciola hepatica",
    what: "A flat parasitic worm that infects the liver and bile ducts of animals, particularly cattle and sheep. It is one of the most economically significant parasites affecting livestock in the UK.",
    how: "Animals become infected by eating contaminated grass or drinking water that contains larvae. The larvae are released from mud snails in wet or marshy areas, making low-lying, waterlogged pasture a key risk factor.",
    symptoms: [
      "Weight loss and poor body condition",
      "Weakness and lethargy",
      "Reduced appetite and milk production",
      "Liver damage and, in severe cases, sudden death",
    ],
    whyItMatters:
      "Liver fluke can seriously affect animal health and reduce productivity. Heavy infections can be fatal, and chronic infection causes lasting damage to the liver and bile ducts even after treatment.",
    prevention: [
      "Avoid grazing animals on wet or marshy pasture where possible",
      "Regular treatment with appropriate flukicides",
      "Control mud snail populations through drainage or fencing off wet areas",
      "Monitor animals and test for fluke burden, especially in autumn and winter",
    ],
  },
];

export function Liver() {
  const p = parasites[0];

  return (
    <main>
      <Header />

      <section className="bg-[#0072ce] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Liver
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            Parasites that affect the liver and bile ducts. Liver fluke is one
            of the most significant parasites affecting livestock in the UK,
            particularly in wet regions.
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
                <div></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default Liver;
