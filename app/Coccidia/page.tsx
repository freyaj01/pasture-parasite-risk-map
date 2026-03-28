"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const coccodia = [
  {
    name: "Protozoa",
    latin: "Protozoa (e.g. Cryptosporidium, Eimeria, Giardia)",
    what: "Protozoa are microscopic single-celled parasites that live inside the intestines of animals. Common examples include Cryptosporidium and Eimeria (coccidiosis).",
    how: "Animals become infected by ingesting contaminated food or water containing protozoan oocysts or cysts. Spread is rapid in overcrowded or unsanitary conditions.",
    symptoms: [
      "Diarrhoea, often profuse and watery",
      "Dehydration",
      "Weight loss and poor growth",
      "Lethargy, particularly in young animals",
    ],
    whyItMatters:
      "Protozoa can spread very quickly through groups, especially in young animals, and can cause serious illness or death if untreated. Some species are also zoonotic.",
    prevention: [
      "Provide clean, uncontaminated water at all times",
      "Maintain good hygiene and proper sanitation",
      "Avoid overcrowding in housing and on pasture",
      "Treat affected animals promptly to prevent spread",
    ],
  },
];
export function Coccodia() {
  const p = coccodia[0];

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

export default Coccodia;
