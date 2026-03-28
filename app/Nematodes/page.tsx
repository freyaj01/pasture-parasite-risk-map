"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const nematodes = [
  {
    name: "Roundworms",
    latin: "Nematoda (multiple species)",
    what: "Roundworms are parasites that live in the intestines of animals. They are one of the most common internal parasites affecting livestock and companion animals.",
    how: "Animals become infected by swallowing worm eggs or larvae from contaminated grass, soil, or water while grazing or foraging.",
    symptoms: [
      "Weight loss and poor condition",
      "Diarrhoea",
      "Poor growth and reduced appetite",
      "Pot-bellied appearance in young animals",
    ],
    whyItMatters:
      "They can damage the lining of the digestive system and significantly reduce animal health and productivity, particularly in young or heavily infected animals.",
    prevention: [
      "Regular deworming with appropriate anthelmintics",
      "Clean grazing areas and rotate pastures",
      "Avoid overgrazing and maintain good hygiene",
      "Monitor with faecal egg counts to guide treatment timing",
    ],
  },
];
export function Nematodes() {
  const p = nematodes[0];

  return (
    <main>
      <Header />

      <section className="bg-[#0072ce] text-white py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Gastrointestinal
          </h1>
          <p className="text-blue-100 max-w-2xl text-sm leading-relaxed">
            Parasites that affect the digestive system, including roundworms,
            tapeworms, and microscopic protozoa. Infection typically occurs
            through contaminated food, water, or pasture.
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

export default Nematodes;
