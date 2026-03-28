"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const flies = [
  {
    name: "Flies",
    latin: "Diptera (multiple species)",
    what: "Flies are ectoparasites that feed on an animal's blood, skin, or secretions. Some species lay eggs on or near the animal, which can develop into maggots.",
    how: "Flies are attracted to animals by waste, wounds, or moisture and can spread easily in dirty or warm environments.",
    symptoms: [
      "Irritation and biting",
      "Restlessness and stress",
      "Wounds or skin damage",
      "Maggot infestation in severe cases (bowfly strike)",
    ],
    whyItMatters:
      "Flies can spread diseases, cause significant stress to animals, and reduce growth or productivity. Bowfly strike in particular can be life-threatening if not treated quickly.",
    prevention: [
      "Maintain good hygiene and remove waste regularly",
      "Use fly control products such as repellents or insecticides",
      "Keep living areas clean and well-ventilated",
      "Check animals frequently, especially during warm weather",
    ],
  },
];

export function Flies() {
  const p = flies[0];

  return (
    <main>
      <Header />

      <section className="bg-[#0072ce] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Flies
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            Flies feed on an animal's blood, skin, or secretions and can spread
            diseases, cause stress, and reduce productivity. They thrive in
            warm, dirty environments.
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

export default Flies;
