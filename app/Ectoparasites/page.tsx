"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const parasites = [
  {
    name: "Ticks",
    latin: "Acari: Ixodidae / Argasidae",
    what: "Ectoparasites that live on the outside of an animal's body, feeding on blood by attaching to the skin.",
    how: "Spread through direct contact with infested animals or from contaminated environments such as grassland, woodland, and scrub where off-host stages wait on vegetation.",
    symptoms: [
      "Itching and irritation at the attachment site",
      "Hair loss around affected areas",
      "Skin damage and swelling",
      "Blood loss or weakness in heavy infestations",
    ],
    whyItMatters:
      "Ticks can cause significant discomfort, spread serious diseases such as Lyme borreliosis, and lead to blood loss or weakness — particularly in young or debilitated animals.",
    prevention: [
      "Apply parasite control products such as spot-ons, collars, or oral treatments regularly",
      "Check animals thoroughly after outdoor activity",
      "Remove attached ticks promptly using fine-tipped forceps",
      "Maintain good hygiene in bedding and living areas",
    ],
  },
  {
    name: "Mites",
    latin: "Acari: Sarcoptidae, Demodicidae, Psoroptidae & others",
    what: "Microscopic ectoparasites that live on or within the skin of animals, causing a range of skin conditions depending on the species involved.",
    how: "Spread through direct contact with infested animals. Some species can survive in contaminated environments such as bedding, brushes, and shared equipment.",
    symptoms: [
      "Intense itching and irritation",
      "Hair loss, particularly around the face and limbs",
      "Skin damage, scaling, or crusting",
      "Waxy discharge in the ear canal (ear mites)",
    ],
    whyItMatters:
      "Mites cause significant discomfort and skin damage. Some species can spread between animals rapidly, and certain types pose a zoonotic risk to humans.",
    prevention: [
      "Use licensed parasite control products regularly",
      "Treat all in-contact animals at the same time",
      "Clean and treat bedding and grooming equipment",
      "Check animals frequently for early signs of infestation",
    ],
  },
  {
    name: "Lice",
    latin: "Insecta: Anoplura (sucking) & Mallophaga (chewing)",
    what: "Wingless insects that live permanently on the host. Sucking lice feed on blood while chewing lice feed on skin debris and hair.",
    how: "Spread through direct contact with infested animals or from contaminated environments such as shared bedding or grooming equipment like brushes and combs.",
    symptoms: [
      "Itching and restlessness",
      "Rough or dull coat with visible nits on hair shafts",
      "Hair loss and skin damage from scratching",
      "Blood loss or weakness in severe infestations",
    ],
    whyItMatters:
      "Lice cause discomfort and can lead to significant blood loss in severe cases, particularly in young or weakened animals. Infestations can spread quickly through groups.",
    prevention: [
      "Apply insecticidal treatments to all affected animals",
      "Repeat treatment to break the life cycle",
      "Clean and disinfect bedding, brushes, and shared equipment",
      "Isolate infested animals and check others frequently",
    ],
  },
];

export function Ectoparasites() {
  const [activeParasite, setActiveParasite] = useState(0);
  const p = parasites[activeParasite];

  return (
    <main>
      <Header />
      <section className="bg-[#0072ce] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Ectoparasites
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            Parasites that live on the outside of an animal's body, such as on
            the skin or hair. They spread through direct contact with other
            animals or from contaminated environments like bedding or grass.
          </p>
        </div>
      </section>

      <div className="mx-auto px-4 sm:px-6 py-12 bg-white ">
        {/* Parasite selector */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Parasites</h2>
          <p className="text-gray-500 text-sm mb-6">
            Select a parasite to view how infection occurs, symptoms, and
            prevention guidance.
          </p>

          {/* buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {parasites.map((parasite, i) => (
              <button
                key={parasite.name}
                onClick={() => setActiveParasite(i)}
                className={`text-sm px-3 py-1.5 rounded-full border transition ${
                  activeParasite === i
                    ? "bg-[#0072ce] text-white border-[#0072ce]"
                    : "bg-white text-gray-700 border-gray-300 cursor-pointer hover:border-[#0072ce]"
                }`}
              >
                {parasite.name}
              </button>
            ))}
          </div>

          {/* Info card */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-[#0072ce] px-6 py-5 text-white">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-blue-200 text-sm italic mt-0.5">{p.latin}</p>
            </div>

            <div className="p-6 grid sm:grid-cols-2 gap-6">
              {/* Top Section */}
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

              {/* Bottom section */}
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

export default Ectoparasites;
