"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const tapeworm = [
  {
    name: "Cestodes",
    latin: "Cestoda (Tapeworms)",
    what: "Tapeworms are flat, segmented parasites that live in the intestines of animals. They attach to the gut wall and can grow to considerable lengths.",
    how: "Animals become infected by eating contaminated food, water, or intermediate hosts such as insects, mites, or small mammals that carry tapeworm larvae.",
    symptoms: [
      "Weight loss and poor condition",
      "Poor growth",
      "Digestive issues in some cases",
      "Infections can be mild and difficult to detect",
    ],
    whyItMatters:
      "Tapeworms absorb nutrients directly from the host's gut, which can reduce animal health and productivity over time. Heavy burdens can cause more significant digestive disruption.",
    prevention: [
      "Maintain good hygiene in living and grazing areas",
      "Control intermediate hosts such as insects and mites",
      "Regular deworming treatments with appropriate anthelmintics",
      "Avoid grazing on heavily contaminated pasture",
    ],
  },
];
export function Tapeworm() {
  const p = tapeworm[0];

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

export default Tapeworm;
