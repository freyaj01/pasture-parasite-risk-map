"use client";

import { useState} from 'react';
import Header from './components/Header';
import Rotation from './components/Rotation';
import Footer from './components/Footer';

export default function Home() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const countrySummaries = {
    country1: {
      name: 'Country 1',
      summary: 'blah blah blah blah blah',
    }
    // Add more countries and their summaries here

  }

  const country = hoveredCountry && countrySummaries[hoveredCountry as keyof typeof countrySummaries];


  return (
    <main className="relativemin-h-screen">
<Header />

<div className= "flex justify-center gap-8 p-10">
  <div 
  onMouseEnter={() => setHoveredCountry('country1')}
  onMouseLeave={() => setHoveredCountry(null)}
  className="px-6 py-4 bg-blue-600 text-white rounded-lg cursor-pointer"
  >
    Country 1
</div>
</div>
<Rotation/>

{country && (
  <div className ="absolute top-24 right-10 w-80 bg-white shadow-x1 rounded-lg p-4">
    <h2 className="text-xl font-bold mb-2">{country.name}</h2>
    <p className="text-sm text-gray-700">{country.summary}</p>
  </div>
)}

<Footer />
    </main>
    
  );
}